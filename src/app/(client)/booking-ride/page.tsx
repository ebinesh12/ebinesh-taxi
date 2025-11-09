"use client";

import { useState, useEffect, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

// Zod schema for form validation
const formSchema = z
  .object({
    pickup: z.string().min(1, { message: "Pickup location is required." }),
    drop: z.string().min(1, { message: "Drop location is required." }),
    date: z.string().min(1, { message: "Date is required." }),
    time: z.string().min(1, { message: "Time is required." }),
  })
  .refine(
    (data) => {
      const selectedDate = new Date(`${data.date}T${data.time}`);
      const now = new Date();
      // Allow a few minutes of grace period for the time selection
      now.setMinutes(now.getMinutes() - 5);
      return selectedDate >= now;
    },
    {
      message: "Cannot select a past date or time.",
      path: ["time"],
    },
  );

// --- Custom Time Picker Component ---
interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ value, onChange, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? <span>{value}</span> : <span>Pick a time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Input
            ref={ref}
            type="time"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(false); // Close the popover after selection
            }}
            className="border-none" // Remove border to blend with popover
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  },
);
TimePicker.displayName = "TimePicker";

export default function RideFinderForm() {
  const [serviceType, setServiceType] = useState("One-Way");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setMinDate(formatDate(today));
    setMaxDate(formatDate(oneMonthFromNow));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: "",
      drop: "",
      date: "",
      time: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const queryParams = new URLSearchParams({
      ...values,
      serviceType,
    }).toString();

    router.push(`/fare-estimation?${queryParams}`);
    // console.log({ ...values, serviceType });
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Book Your Ride</h1>
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-center mb-4 border-b">
            <Button
              variant={serviceType === "One-Way" ? "ghost" : "ghost"}
              onClick={() => setServiceType("One-Way")}
              className={`px-4 py-2 text-lg font-semibold rounded-none ${
                serviceType === "One-Way"
                  ? "border-b-2 border-yellow-400 text-yellow-400"
                  : "text-gray-500"
              }`}
            >
              One Way
            </Button>
            <Button
              variant={serviceType === "Round-Trip" ? "ghost" : "ghost"}
              onClick={() => setServiceType("Round-Trip")}
              className={`px-4 py-2 text-lg font-semibold rounded-none ${
                serviceType === "Round-Trip"
                  ? "border-b-2 border-yellow-400 text-yellow-400"
                  : "text-gray-500"
              }`}
            >
              Round Trip
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pickup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="drop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drop Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter drop location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          min={minDate}
                          max={maxDate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <TimePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-400 text-white font-bold hover:bg-yellow-500"
              >
                Find My Ride
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
