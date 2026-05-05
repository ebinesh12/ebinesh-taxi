"use client";

import { useState, useEffect, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

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
import { cn } from "@/lib/utils";
import {
  Timer,
  LocateFixed,
  Flag,
  CalendarRange,
  ChevronRight,
  Activity,
  Zap,
} from "lucide-react";
import { rideSchema } from "@/services/schema";

const TimePicker = forwardRef(({ value, onChange, ...props }, ref) => {
  return (
    <div className="relative group">
      <Timer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-500 group-focus-within:text-orange-400 transition-colors" />
      <Input
        ref={ref}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-zinc-900/50 border-white/5 focus:border-orange-500/50 focus:ring-orange-500/20 text-white rounded-xl"
        {...props}
      />
    </div>
  );
});
TimePicker.displayName = "TimePicker";

export default function RideFinderForm() {
  const [serviceType, setServiceType] = useState("One-Way");
  const [minDate, setMinDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(today);
  }, []);

  const form = useForm({
    resolver: zodResolver(rideSchema),
    defaultValues: { pickup: "", drop: "", date: "", time: "" },
  });

  function onSubmit(values) {
    const queryParams = new URLSearchParams({
      ...values,
      serviceType,
    }).toString();
    router.push(`/fare-estimation?${queryParams}`);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#020617] px-4 py-16 overflow-hidden">
      {/* 1. Animated Tech Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83L.83 55.457l-.83-.83L54.627 0zM5.373 0l-.83.83L59.17 55.457l.83-.83L5.373 0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="border-white/10 bg-zinc-950/40 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(249,115,22,0.2)] rounded-[2.5rem] overflow-hidden">
          {/* Header Section */}
          <div className="p-8 md:p-12 pb-0 text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-orange-500 to-rose-600 p-4 rounded-2xl rotate-3 shadow-lg shadow-orange-500/20">
                <Zap className="h-6 w-6 text-white fill-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white italic">
              Swift<span className="text-orange-500">Route</span>
            </h1>
            <p className="text-slate-400 font-light tracking-wide">
              Enter details to unlock real-time fleet availability.
            </p>
          </div>

          <CardContent className="p-8 md:p-12">
            {/* Trip Toggle */}
            <div className="flex p-1.5 bg-zinc-900/80 rounded-2xl mb-10 border border-white/5 relative">
              {["One-Way", "Round-Trip"].map((type) => (
                <button
                  key={type}
                  onClick={() => setServiceType(type)}
                  className={cn(
                    "relative flex-1 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-xl z-10",
                    serviceType === type ? "text-white" : "text-slate-500",
                  )}
                >
                  {type}
                  {serviceType === type && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600 rounded-xl -z-10 shadow-lg shadow-orange-500/20"
                    />
                  )}
                </button>
              ))}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                {/* Routing Visualization */}
                <div className="relative space-y-8">
                  {/* The Techy Route Line */}
                  <div className="absolute left-[21px] top-8 bottom-8 w-[1px] bg-gradient-to-b from-orange-500 via-rose-500 to-transparent dashed" />

                  <FormField
                    control={form.control}
                    name="pickup"
                    render={({ field }) => (
                      <FormItem className="relative pl-12">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500">
                          <LocateFixed size={18} />
                        </div>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-orange-500/70">
                          Pick-up Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Current address or point of interest"
                            className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 h-12 text-white focus-visible:ring-0 focus-visible:border-orange-500 text-lg transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="drop"
                    render={({ field }) => (
                      <FormItem className="relative pl-12">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
                          <Flag size={18} />
                        </div>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-rose-500/70">
                          Final Destination
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Where to?"
                            className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 h-12 text-white focus-visible:ring-0 focus-visible:border-rose-500 text-lg transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Scheduling Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                          Departure Date
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CalendarRange className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                            <Input
                              type="date"
                              {...field}
                              min={minDate}
                              className="pl-10 bg-zinc-900/50 border-white/5 focus:border-orange-500/50 focus:ring-orange-500/20 text-white rounded-xl h-12"
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
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                          Departure Time
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
                  className="group w-full h-16 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white border-none rounded-2xl text-lg font-bold transition-all duration-300 shadow-xl shadow-orange-900/20 overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                    <span>ANALYZE FARE</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  {/* Subtle scanning light effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer Metrics */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { label: "Active Cabs", val: "482", icon: Zap },
            { label: "Avg. Wait", val: "4 min", icon: Activity },
            { label: "Driver Rating", val: "4.95", icon: Zap },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 backdrop-blur-md"
            >
              <item.icon size={14} className="text-orange-500 mb-1" />
              <span className="text-white font-bold text-sm tracking-tight">
                {item.val}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
