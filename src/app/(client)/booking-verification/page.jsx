"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Clock4,
  CarTaxiFront,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  Fingerprint,
  Wallet,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import { verifySchema } from "@/services/schema";
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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BookingVerificationPage() {
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const detailsString = sessionStorage.getItem("tripDetails");
      if (detailsString) {
        setTripDetails(JSON.parse(detailsString));
      } else {
        router.replace("/");
      }
    } catch (e) {
      router.replace("/");
    }
  }, [router]);

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: { name: "", mobile: "", email: "" },
  });

  const { isSubmitting } = form.formState;

  const generateBookingId = () =>
    `VIP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  async function onSubmit(values) {
    if (!tripDetails) return;
    setError("");

    const bookingData = {
      pickup_location: tripDetails.pickup,
      drop_location: tripDetails.drop,
      trip_date: tripDetails.date,
      trip_time: tripDetails.time,
      vehicle_id: tripDetails.vehicleId,
      customer_name: values.name,
      customer_mobile: values.mobile,
      customer_email: values.email,
      estimated_fare: tripDetails.estimatedFare,
      booking_ref: generateBookingId(),
    };

    try {
      const { data, error: dbError } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select()
        .single();

      if (dbError) throw dbError;

      sessionStorage.removeItem("tripDetails");
      router.push(`/booking-success?ref=${data.booking_ref}`);
    } catch (err) {
      setError(err.message || "Connection timed out. Please try again.");
    }
  }

  if (!tripDetails) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0612]">
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-20 animate-pulse" />
          <Loader2 className="h-10 w-10 animate-spin text-violet-500 relative z-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0612] text-zinc-200 selection:bg-violet-500/30 py-12 px-4">
      {/* Decorative background glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => router.back()}
              className="group flex items-center text-zinc-500 hover:text-violet-400 transition-colors mb-4 text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Adjust Preferences
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Review & <span className="text-violet-500 italic">Verify.</span>
            </h1>
          </motion.div>

          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 flex gap-2">
            <ShieldCheck size={14} />
            Level 3 Encrypted Session
          </Badge>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Passenger Data Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center">
                    <Fingerprint className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Passenger Credentials
                    </h2>
                    <p className="text-sm text-zinc-500">
                      Information for dispatch and tracking
                    </p>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                            Full Identity
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-violet-500 transition-colors" />
                              <Input
                                placeholder="Legal Name"
                                className="pl-8 bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-violet-500 h-12 text-white text-lg placeholder:text-zinc-700"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                              Secure Contact
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Phone className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-violet-500" />
                                <Input
                                  placeholder="+91 Phone"
                                  className="pl-8 bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-violet-500 h-12 text-white"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                              E-Receipt Destination
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-violet-500" />
                                <Input
                                  placeholder="E-mail"
                                  className="pl-8 bg-transparent border-0 border-b border-white/10 rounded-none focus-visible:ring-0 focus-visible:border-violet-500 h-12 text-white"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-medium"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-lg font-bold shadow-xl shadow-violet-900/20 group relative overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <>
                            Verify & Schedule Payment
                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Button>
                  </form>
                </Form>
              </div>
            </Card>
          </motion.div>

          {/* Ticket Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Ticket Notch Effects */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#0a0612] rounded-full z-20" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#0a0612] rounded-full z-20" />

              <div className="bg-zinc-100 dark:bg-zinc-100 text-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-zinc-900 text-white border-none rounded-lg px-3 py-1 font-mono tracking-tighter">
                      PASS NO: {generateBookingId().split("-")[1]}
                    </Badge>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-black text-zinc-400">
                        Status
                      </p>
                      <p className="text-xs font-bold text-emerald-600 uppercase">
                        Awaiting Auth
                      </p>
                    </div>
                  </div>

                  {/* Route Visualizer */}
                  <div className="space-y-6 relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-zinc-200 border-l border-zinc-300 border-dashed" />

                    <div className="relative flex gap-4">
                      <div className="h-4 w-4 rounded-full border-4 border-zinc-900 bg-white z-10" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                          Origin
                        </p>
                        <p className="text-sm font-bold leading-tight line-clamp-1">
                          {tripDetails.pickup}
                        </p>
                      </div>
                    </div>

                    <div className="relative flex gap-4">
                      <div className="h-4 w-4 rounded-full border-4 border-violet-600 bg-white z-10" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                          Destination
                        </p>
                        <p className="text-sm font-bold leading-tight line-clamp-1">
                          {tripDetails.drop}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-zinc-200">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-zinc-400" size={18} />
                      <span className="text-sm font-bold">
                        {tripDetails.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock4 className="text-zinc-400" size={18} />
                      <span className="text-sm font-bold">
                        {tripDetails.time}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                      <div className="flex items-center gap-3">
                        <CarTaxiFront className="text-violet-600" size={20} />
                        <div>
                          <p className="text-xs font-bold">
                            {tripDetails.vehicleName}
                          </p>
                          <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">
                            Business Class
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-bold">
                        ₹{Number(tripDetails.estimatedFare).toFixed(0)}
                      </span>
                    </div>

                    <div className="px-2 space-y-2">
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span>Base Fare & Fuel</span>
                        <span>
                          ₹{Number(tripDetails.estimatedFare * 0.85).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span>Convenience & Tax</span>
                        <span className="text-emerald-600 font-bold uppercase text-[9px] tracking-widest">
                          Included
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 p-8 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
                      Total Valuation
                    </p>
                    <p className="text-3xl font-bold text-white tracking-tighter">
                      ₹{Number(tripDetails.estimatedFare).toFixed(2)}
                    </p>
                  </div>
                  <CheckCircle2 className="text-emerald-500 mb-1" size={32} />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-40">
                <ShieldCheck size={14} className="text-zinc-500" />
                <span className="text-[9px] uppercase tracking-widest font-bold">
                  End-to-End Encryption
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
