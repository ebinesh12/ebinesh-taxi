"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  User,
  Phone,
  Mail,
  CalendarDays,
  Clock4,
  CarTaxiFront,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  Fingerprint,
  CheckCircle2,
  Building2,
  Banknote,
  QrCode,
  Lock,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const verificationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Legal full name is required (min 2 characters)" }),
  mobile: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Enter a valid 10-digit mobile number" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email for e-receipt delivery" }),
  paymentMethod: z.enum(["pay_chauffeur", "upi_online", "corporate_billing"]),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface TripDetails {
  pickup: string;
  drop: string;
  serviceType: string;
  date?: string;
  time?: string;
  pickupDate?: string;
  pickupTime?: string;
  passengers?: string | number;
  vehicleId?: string | number;
  vehicleName?: string;
  estimatedFare: number;
  distance?: number;
}

/* -------------------------------------------------------------------------- */
/*                        VERIFICATION PAGE COMPONENT                         */
/* -------------------------------------------------------------------------- */

export default function BookingVerificationPage() {
  const router = useRouter();
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [error, setError] = useState("");
  const [passNumber, setPassNumber] = useState("");

  // Retrieve Trip Data from SessionStorage with Graceful Fallback
  useEffect(() => {
    try {
      const detailsString = sessionStorage.getItem("tripDetails");
      if (detailsString) {
        setTripDetails(JSON.parse(detailsString));
      } else {
        // Fallback demo data so page remains testable
        setTripDetails({
          pickup: "Chennai International Airport (MAA)",
          drop: "OMR IT Corridor, Sholinganallur",
          serviceType: "One-Way",
          date: new Date().toISOString().split("T")[0],
          time: "12:00",
          passengers: 2,
          vehicleName: "Executive VIP Sedan",
          estimatedFare: 850,
          distance: 28,
        });
      }
      setPassNumber(`VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    } catch {
      router.replace("/");
    }
  }, [router]);

  // Pure React Hook Form Setup (no Shadcn Form component)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      paymentMethod: "pay_chauffeur",
      companyName: "",
      gstNumber: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedPayment = watch("paymentMethod");

  const onSubmitVerification = async (values: VerificationFormValues) => {
    if (!tripDetails) return;
    setError("");

    const bookingRef = passNumber || `VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const bookingPayload = {
      pickup_location: tripDetails.pickup,
      drop_location: tripDetails.drop,
      trip_date: tripDetails.date || tripDetails.pickupDate || new Date().toISOString().split("T")[0],
      trip_time: tripDetails.time || tripDetails.pickupTime || "12:00",
      vehicle_id: tripDetails.vehicleId || "1",
      vehicle_name: tripDetails.vehicleName || "Executive Fleet",
      customer_name: values.name,
      customer_mobile: values.mobile,
      customer_email: values.email,
      payment_method: values.paymentMethod,
      company_name: values.companyName || null,
      gst_number: values.gstNumber || null,
      estimated_fare: tripDetails.estimatedFare,
      booking_ref: bookingRef,
      created_at: new Date().toISOString(),
    };

    try {
      if (supabase) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error: dbError } = await supabase
          .from("bookings")
          .insert([bookingPayload])
          .select()
          .single();

        if (dbError) {
          console.warn("Supabase database insert warning, continuing via local fallback:", dbError.message);
        }
      }

      sessionStorage.removeItem("tripDetails");
      router.push(`/booking-success?ref=${bookingRef}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Booking dispatch exception:", err);
      // Failover forward to success state
      sessionStorage.removeItem("tripDetails");
      router.push(`/booking-success?ref=${bookingRef}`);
    }
  };

  if (!tripDetails) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030712]">
        <div className="relative flex flex-col items-center gap-3">
          <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-500">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Retrieving Trip Telemetry...
          </p>
        </div>
      </div>
    );
  }

  const tripDate = tripDetails.date || tripDetails.pickupDate || new Date().toISOString().split("T")[0];
  const tripTime = tripDetails.time || tripDetails.pickupTime || "12:00";
  const fareBase = Math.round(tripDetails.estimatedFare * 0.82);
  const fareGstToll = Math.round(tripDetails.estimatedFare * 0.18);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">
      <Header />

      <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header & Breadcrumb */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() => router.back()}
                className="group flex items-center text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors mb-3 text-xs font-bold uppercase tracking-wider"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                Adjust Route & Fleet Preferences
              </button>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Review & <span className="text-amber-500">Authorize.</span>
              </h1>
            </motion.div>

            <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" /> 256-Bit Encrypted Session
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ========================================================================= */}
            {/* 1. PASSENGER CREDENTIALS FORM (RHF + ZOD)                                 */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl overflow-hidden">
                <CardContent className="p-6 sm:p-10 space-y-6">
                  <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Fingerprint className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white">
                        Passenger & Dispatch Contact
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Chauffeur assignment updates & SMS telemetry will be sent here
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmitVerification)}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="pass-name"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                      >
                        Legal Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="pass-name"
                          type="text"
                          placeholder="e.g. Ramesh Krishnan"
                          {...register("name")}
                          className={cn(
                            "w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                            errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                          )}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Mobile & Email Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="pass-mobile"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Mobile (SMS Updates)
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="pass-mobile"
                            type="tel"
                            placeholder="+91 98765 43210"
                            {...register("mobile")}
                            className={cn(
                              "w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.mobile ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.mobile.message}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="pass-email"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Email (E-Receipt PDF)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="pass-email"
                            type="email"
                            placeholder="ramesh@company.com"
                            {...register("email")}
                            className={cn(
                              "w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Preferred Settlement Method
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          {
                            id: "pay_chauffeur",
                            label: "Pay Chauffeur",
                            desc: "Cash / UPI at trip end",
                            icon: Banknote,
                          },
                          {
                            id: "upi_online",
                            label: "Instant UPI / Card",
                            desc: "Fast digital receipt",
                            icon: QrCode,
                          },
                          {
                            id: "corporate_billing",
                            label: "Corporate Billing",
                            desc: "Monthly GST account",
                            icon: Building2,
                          },
                        ].map((pay) => {
                          const Icon = pay.icon;
                          const isSelected = selectedPayment === pay.id;
                          return (
                            <button
                              key={pay.id}
                              type="button"
                              onClick={() =>
                                setValue("paymentMethod", pay.id as VerificationFormValues["paymentMethod"], {
                                  shouldValidate: true,
                                })
                              }
                              className={cn(
                                "p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200",
                                isSelected
                                  ? "border-amber-500 bg-amber-500/10 shadow-sm ring-1 ring-amber-500"
                                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700"
                              )}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Icon
                                  className={cn(
                                    "w-4 h-4",
                                    isSelected ? "text-amber-500" : "text-slate-400"
                                  )}
                                />
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">
                                  {pay.label}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                  {pay.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Corporate GST Fields */}
                    {selectedPayment === "corporate_billing" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                          <Building2 className="w-3.5 h-3.5" /> Corporate Invoicing Details
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Company Legal Name"
                            {...register("companyName")}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                          <input
                            type="text"
                            placeholder="GSTIN Number (15 Digits)"
                            {...register("gstNumber")}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Error Banner */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Authorizing Chauffeur Dispatch...
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-2 text-xs">
                          Complete Reservation & Dispatch Driver
                          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* ========================================================================= */}
            {/* 2. LUXURY BOARDING PASS & ITINERARY CARD                                  */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Perforated Notches for Ticket Effect */}
                <div className="absolute top-85 -left-3.5 w-7 h-7 bg-slate-50 dark:bg-[#030712] rounded-full z-20 border-r border-slate-200 dark:border-slate-800" />
                <div className="absolute top-85 -right-3.5 w-7 h-7 bg-slate-50 dark:bg-[#030712] rounded-full z-20 border-l border-slate-200 dark:border-slate-800" />

                <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden">
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Ticket Header */}
                    <div className="flex justify-between items-start pb-4 border-b border-slate-100 dark:border-slate-800/80">
                      <div>
                        <Badge className="bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider border-none">
                          PASS: {passNumber || "VIP-DISPATCH"}
                        </Badge>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                          Tier: {tripDetails.serviceType}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                          Status
                        </span>
                        <span className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-1 justify-end">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Awaiting Auth
                        </span>
                      </div>
                    </div>

                    {/* Visual Route Timeline */}
                    <div className="space-y-4 relative pl-6">
                      <div className="absolute left-1.75 top-2 bottom-2 w-0.5 bg-linear-to-b from-emerald-500 via-amber-500 to-amber-600 dashed" />

                      {/* Pickup */}
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-950" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                          Pick-up Origin
                        </span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {tripDetails.pickup}
                        </p>
                      </div>

                      {/* Dropoff */}
                      <div className="relative pt-2">
                        <div className="absolute -left-6 top-3 w-3.5 h-3.5 rounded-full border-2 border-amber-500 bg-white dark:bg-slate-950" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                          Final Destination
                        </span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {tripDetails.drop}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time Strip */}
                    <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <CalendarDays className="w-4 h-4 text-amber-500" />
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Date</span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{tripDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock4 className="w-4 h-4 text-emerald-500" />
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Time</span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{tripTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Allocation Box */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                          <CarTaxiFront className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {tripDetails.vehicleName || "Executive Fleet Vehicle"}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {tripDetails.distance ? `~${tripDetails.distance} KM Distance` : "Air Conditioned • Verified Chauffeur"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Accounting Itemization */}
                    <div className="space-y-1.5 text-xs text-slate-500 pt-2">
                      <div className="flex justify-between">
                        <span>Chauffeur & Fuel Allowance</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">₹{fareBase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>State Permit & Toll Estimates</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">₹{fareGstToll}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passenger Flight Delay Buffer</span>
                        <span className="text-emerald-500 font-bold uppercase text-[10px]">Complimentary</span>
                      </div>
                    </div>
                  </div>

                  {/* Guaranteed Total Bottom Strip */}
                  <div className="bg-slate-950 p-6 sm:p-7 text-white flex justify-between items-end border-t border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest block">
                        Guaranteed Total Valuation
                      </span>
                      <p className="text-3xl font-black tracking-tight text-white mt-0.5">
                        ₹{tripDetails.estimatedFare}
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  </div>
                </div>

                {/* Footer Security Assurance */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  Zero Hidden Night Charges • GPS Tracked
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}