"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  pickup: z.string().min(1, { message: "Pickup location is required." }),
  drop: z.string().min(1, { message: "Drop location is required." }),
  date: z.string().min(1, { message: "Date is required." }),
  time: z.string().min(1, { message: "Time is required." }),
});

export default function RideFinderForm() {
  const [serviceType, setServiceType] = useState("One-Way");
  const router = useRouter();
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
                        <Input type="date" {...field} />
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
                        <Input type="time" {...field} />
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
