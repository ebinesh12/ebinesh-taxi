// app/booking-verification/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Car,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

  const generateBookingId = () => `TXN${Date.now()}`;

  async function onSubmit(values) {
    if (!tripDetails) {
      setError("Trip details are missing.");
      return;
    }
    setError(null);

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
      setError(`Booking failed: ${err.message}`);
    }
  }

  if (!tripDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          Syncing trip data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mb-4 -ml-2 text-muted-foreground hover:text-amber-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Edit Route
            </Button>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
              Final <span className="text-amber-500">Confirmation</span>
            </h1>
            <p className="text-muted-foreground">
              Almost there! Review your trip and provide contact details.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Secure Checkout
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: The Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50 dark:bg-zinc-800/50">
                <CardTitle className="text-lg font-bold">
                  Passenger Information
                </CardTitle>
                <CardDescription>
                  How should the driver contact you?
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 px-6 md:px-10 pb-10">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-amber-500" />
                              <Input
                                placeholder="John Doe"
                                className="pl-10 h-12 rounded-xl focus-visible:ring-amber-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              Mobile Number
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-amber-500" />
                                <Input
                                  type="tel"
                                  placeholder="+91"
                                  className="pl-10 h-12 rounded-xl focus-visible:ring-amber-500"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-amber-500" />
                                <Input
                                  type="email"
                                  placeholder="john@example.com"
                                  className="pl-10 h-12 rounded-xl focus-visible:ring-amber-500"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {error && (
                      <p className="p-3 text-xs font-bold bg-red-50 dark:bg-red-950/20 text-red-500 rounded-lg border border-red-200 dark:border-red-900">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-slate-900 dark:bg-amber-400 dark:text-slate-950 text-base font-black uppercase tracking-tighter rounded-xl group transition-all"
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Confirm & Pay ₹
                          {Number(tripDetails.estimatedFare).toFixed(0)}
                          <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT COLUMN: Trip Summary Ticket */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5"
          >
            <Card className="border-none shadow-xl bg-zinc-900 dark:bg-zinc-900 text-white overflow-hidden">
              <div className="p-8 space-y-8 relative">
                {/* Decorative Car Icon */}
                <Car className="absolute top-8 right-8 h-12 w-12 text-white/5 -rotate-12" />

                <div className="space-y-1">
                  <Badge className="bg-amber-400 text-slate-950 border-none font-bold uppercase tracking-tighter">
                    Trip Summary
                  </Badge>
                  <h3 className="text-2xl font-bold tracking-tight pt-2">
                    Fare Breakdown
                  </h3>
                </div>

                {/* Route Visualizer */}
                <div className="relative space-y-6 pl-6 border-l-2 border-dashed border-white/20">
                  <div className="relative">
                    <MapPin className="absolute -left-[33px] top-0 h-4 w-4 text-amber-500 bg-zinc-900" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
                      Pickup
                    </p>
                    <p className="text-sm font-semibold leading-tight">
                      {tripDetails.pickup}
                    </p>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute -left-[33px] top-0 h-4 w-4 text-white bg-zinc-900" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
                      Destination
                    </p>
                    <p className="text-sm font-semibold leading-tight">
                      {tripDetails.drop}
                    </p>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Calendar className="h-3 w-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Date
                      </span>
                    </div>
                    <p className="text-sm font-bold">{tripDetails.date}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Time
                      </span>
                    </div>
                    <p className="text-sm font-bold">{tripDetails.time}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <Car className="h-3 w-3" /> {tripDetails.vehicleName}
                    </span>
                    <span className="font-mono">
                      ₹{Number(tripDetails.estimatedFare).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Taxes & Fees</span>
                    <span className="text-green-400 font-bold uppercase text-[10px]">
                      Included
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-lg font-bold">Total Fare</span>
                    <span className="text-3xl font-black text-amber-400 tracking-tighter">
                      ₹{Number(tripDetails.estimatedFare).toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-center text-zinc-500 italic">
                  By confirming, you agree to our Terms of Service &
                  Cancellation Policy.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
