"use client";

import { useState, useEffect, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Clock,
  MapPin,
  Navigation,
  Calendar as CalendarIcon,
  ChevronRight,
  CircleDot,
} from "lucide-react";
import { rideSchema } from "@/services/schema";

/**
 * Refactored TimePicker with better integration
 */
const TimePicker = forwardRef(({ value, onChange, ...props }, ref) => {
  return (
    <div className="relative group">
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-amber-500 transition-colors" />
      <Input
        ref={ref}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 focus-visible:ring-amber-500"
        {...props}
      />
    </div>
  );
});
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

    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(formatDate(today));
    setMaxDate(formatDate(oneMonthFromNow));
  }, []);

  const form = useForm({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      pickup: "",
      drop: "",
      date: "",
      time: "",
    },
  });

  function onSubmit(values) {
    const queryParams = new URLSearchParams({
      ...values,
      serviceType,
    }).toString();
    router.push(`/fare-estimation?${queryParams}`);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4 py-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-400 dark:bg-zinc-800 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl z-10"
      >
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-amber-400 p-3 rounded-2xl w-fit mb-4 shadow-lg shadow-amber-400/20">
              <Navigation className="h-6 w-6 text-slate-950 fill-current" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight uppercase italic dark:text-white">
              Plan Your <span className="text-amber-500">Journey</span>
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-zinc-400">
              Safe, reliable, and premium dispatch services at your fingertips.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-10">
            {/* TRIP TYPE TOGGLE (Modern Segmented Control) */}
            <div className="relative flex p-1 bg-slate-100 dark:bg-zinc-800 rounded-2xl mb-10">
              <motion.div
                layoutId="activeTab"
                className="absolute inset-1 bg-white dark:bg-zinc-700 rounded-xl shadow-sm"
                initial={false}
                animate={{ x: serviceType === "One-Way" ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: "calc(50% - 4px)" }}
              />
              <button
                onClick={() => setServiceType("One-Way")}
                className={cn(
                  "relative z-10 w-1/2 py-3 text-sm font-bold uppercase tracking-wider transition-colors",
                  serviceType === "One-Way"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-500",
                )}
              >
                One Way
              </button>
              <button
                onClick={() => setServiceType("Round-Trip")}
                className={cn(
                  "relative z-10 w-1/2 py-3 text-sm font-bold uppercase tracking-wider transition-colors",
                  serviceType === "Round-Trip"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-500",
                )}
              >
                Round Trip
              </button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* LOCATION FIELDS with visual track line */}
                <div className="relative space-y-6">
                  {/* The Vertical Track Line */}
                  <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-zinc-700" />

                  <FormField
                    control={form.control}
                    name="pickup"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <div className="flex items-center gap-4">
                          <div className="z-10 bg-white dark:bg-zinc-900 rounded-full p-1.5 border-2 border-amber-500">
                            <CircleDot className="h-3 w-3 text-amber-500" />
                          </div>
                          <div className="flex-1">
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-400">
                              Pickup Point
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your current location"
                                className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-amber-500 bg-transparent text-lg font-medium"
                                {...field}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage className="ml-10" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="drop"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <div className="flex items-center gap-4">
                          <div className="z-10 bg-white dark:bg-zinc-900 rounded-full p-1.5 border-2 border-slate-900 dark:border-white">
                            <MapPin className="h-3 w-3 text-slate-900 dark:text-white" />
                          </div>
                          <div className="flex-1">
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-400">
                              Destination
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Where are you going?"
                                className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-amber-500 bg-transparent text-lg font-medium"
                                {...field}
                              />
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage className="ml-10" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* DATE & TIME ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Pickup Date
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-amber-500 transition-colors" />
                            <Input
                              type="date"
                              {...field}
                              min={minDate}
                              max={maxDate}
                              className="pl-10 focus-visible:ring-amber-500"
                            />
                          </div>
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Pickup Time
                        </FormLabel>
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
                  className="w-full h-14 text-lg font-black uppercase tracking-tighter bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-2xl shadow-xl shadow-amber-500/20 group transition-all"
                >
                  Find My Ride
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* TRUST BADGE */}
        <div className="mt-8 flex items-center justify-center gap-6 opacity-50 dark:opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
            Verified Drivers
          </span>
          <div className="h-px w-12 bg-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
            24/7 Support
          </span>
          <div className="h-px w-12 bg-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
            Safe Travels
          </span>
        </div>
      </motion.div>
    </section>
  );
}
