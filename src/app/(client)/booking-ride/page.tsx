"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion} from "framer-motion";
import {
  MapPin,
  MapPinned,
  Calendar,
  Clock,
  ChevronRight,
  Users,
  Sparkles,
  Plane,
  RotateCcw,
  Navigation,
  CheckCircle2,
  PhoneCall,
  Loader2,
  ArrowRightLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const rideBookingSchema = z
  .object({
    serviceType: z.enum(["One-Way", "Round-Trip", "Airport-Transfer", "Hourly-Rental"]),
    pickup: z
      .string()
      .min(3, { message: "Pick-up address must be at least 3 characters" }),
    drop: z
      .string()
      .min(3, { message: "Drop-off destination is required" }),
    date: z.string().min(1, { message: "Please choose departure date" }),
    time: z.string().min(1, { message: "Please specify departure time" }),
    returnDate: z.string().optional(),
    passengers: z
      .number({  message: "Required" })
      .min(1, "At least 1 passenger")
      .max(8, "Maximum 8 passengers"),
    vehicleClass: z.enum(["sedan", "executive", "suv", "van"], {
   message: "Select vehicle class"
    }),
    flightNumber: z.string().optional(),
    specialRequests: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.serviceType === "Round-Trip" && !data.returnDate) {
        return false;
      }
      return true;
    },
    {
      message: "Return date is required for round trips",
      path: ["returnDate"],
    }
  );

type RideBookingValues = z.infer<typeof rideBookingSchema>;

/* -------------------------------------------------------------------------- */
/*                               FLEET OPTIONS                                */
/* -------------------------------------------------------------------------- */

const FLEET_CLASSES = [
  {
    id: "sedan",
    name: "Classic Sedan",
    model: "Toyota Dzire / Etios",
    pax: "4 Passengers",
    luggage: "2 Bags",
    baseRate: 450,
    perKm: "₹14/km",
    badge: undefined,
  },
  {
    id: "executive",
    name: "Executive VIP",
    model: "Camry / Skoda Superb",
    pax: "4 Passengers",
    luggage: "3 Bags",
    badge: "Preferred",
    baseRate: 850,
    perKm: "₹24/km",
  },
  {
    id: "suv",
    name: "Prime SUV",
    model: "Innova Crysta / Hycross",
    pax: "7 Passengers",
    luggage: "5 Bags",
    baseRate: 1150,
    perKm: "₹20/km",
    badge: undefined,
  },
  {
    id: "van",
    name: "Luxury Van",
    model: "Toyota Commuter / Force VIP",
    pax: "10 Passengers",
    luggage: "8 Bags",
    baseRate: 1800,
    perKm: "₹32/km",
    badge: undefined,
  },
] as const;

const SERVICE_TABS = [
  { id: "One-Way", label: "One-Way", icon: Navigation },
  { id: "Round-Trip", label: "Round-Trip", icon: ArrowRightLeft },
  { id: "Airport-Transfer", label: "Airport Drop", icon: Plane },
  { id: "Hourly-Rental", label: "Hourly Chauffeur", icon: Clock },
] as const;

/* -------------------------------------------------------------------------- */
/*                            MAIN BOOKING PAGE                               */
/* -------------------------------------------------------------------------- */

export default function BookingRidePage() {
  const router = useRouter();
  const [minDate, setMinDate] = useState("");

  // Lock minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  // Standard React Hook Form (no Shadcn Form component)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RideBookingValues>({
    resolver: zodResolver(rideBookingSchema),
    defaultValues: {
      serviceType: "One-Way",
      pickup: "",
      drop: "",
      date: new Date().toISOString().split("T")[0],
      time: "12:00",
      returnDate: "",
      passengers: 2,
      vehicleClass: "executive",
      flightNumber: "",
      specialRequests: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const serviceType = watch("serviceType");
  const vehicleClass = watch("vehicleClass");
//   const passengers = watch("passengers");
//   const pickup = watch("pickup");
//   const drop = watch("drop");

  // Dynamic Fare Calculation Preview
  const selectedVehicleObj =
    FLEET_CLASSES.find((f) => f.id === vehicleClass) || FLEET_CLASSES[1];
  const tripMultiplier =
    serviceType === "Round-Trip" ? 1.85 : serviceType === "Airport-Transfer" ? 1.2 : 1.0;
  const estimatedTotal = Math.round(selectedVehicleObj.baseRate * tripMultiplier);

  const onBookingSubmit = async (values: RideBookingValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const queryParams = new URLSearchParams({
      pickup: values.pickup,
      drop: values.drop,
      serviceType: values.serviceType,
      vehicleClass: values.vehicleClass,
      date: values.date,
      time: values.time,
      passengers: String(values.passengers),
      fare: String(estimatedTotal),
    }).toString();

    router.push(`/fare-estimation?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">

      <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Header Title */}
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> Direct Dispatch Terminal
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Reserve Your <span className="text-amber-500">Chauffeur</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Real-time vehicle allocation with guaranteed fixed pricing, flight telemetry tracking, and zero surge multiples.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* ========================================================================= */}
            {/* 1. MAIN FORM COLUMN                                                       */}
            {/* ========================================================================= */}
            <div className="lg:col-span-8">
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl overflow-hidden">
                {/* Trip Mode Switcher Tabs */}
                <div className="p-3 bg-slate-100/80 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800/80">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SERVICE_TABS.map((tab) => {
                      const Icon = tab.icon;
                      const isSelected = serviceType === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() =>
                            setValue("serviceType", tab.id as RideBookingValues["serviceType"], {
                              shouldValidate: true,
                            })
                          }
                          className={cn(
                            "flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-bold transition-all",
                            isSelected
                              ? "bg-amber-500 text-slate-950 shadow-md font-extrabold shadow-amber-500/20"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/50"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span className="truncate">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <CardContent className="p-6 sm:p-8 space-y-6">
                  {/* Standard Form Handled via React Hook Form */}
                  <form
                    onSubmit={handleSubmit(onBookingSubmit)}
                    noValidate
                    className="space-y-6"
                  >
                    {/* Pickup and Drop Section with Connecting Visual Line */}
                    <div className="space-y-4 relative">
                      {/* Decorative Routing Graphic Line */}
                      <div className="absolute left-4 top-9 bottom-9 w-0.5 bg-linear-to-b from-emerald-500 via-amber-500 to-amber-600 dashed hidden sm:block pointer-events-none" />

                      {/* Pickup Field */}
                      <div className="sm:pl-10 relative">
                        <div className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 items-center justify-center text-emerald-500">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <label
                          htmlFor="pickup"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Pick-up Address or Terminal
                        </label>
                        <div className="relative">
                          <input
                            id="pickup"
                            type="text"
                            placeholder="e.g. Chennai Domestic Airport (MAA) or Hotel Grand Chola"
                            {...register("pickup")}
                            className={cn(
                              "w-full px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.pickup
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                        </div>
                        {errors.pickup && (
                          <p className="text-red-500 text-[11px] font-semibold mt-1">
                            {errors.pickup.message}
                          </p>
                        )}
                      </div>

                      {/* Drop-off Field */}
                      <div className="sm:pl-10 relative">
                        <div className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 items-center justify-center text-amber-500">
                          <MapPinned className="w-4 h-4" />
                        </div>
                        <label
                          htmlFor="drop"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Final Destination
                        </label>
                        <div className="relative">
                          <input
                            id="drop"
                            type="text"
                            placeholder="e.g. OMR IT Corridor, Sholinganallur"
                            {...register("drop")}
                            className={cn(
                              "w-full px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.drop
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                        </div>
                        {errors.drop && (
                          <p className="text-red-500 text-[11px] font-semibold mt-1">
                            {errors.drop.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Schedule Grid: Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="date"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Departure Date
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="date"
                            type="date"
                            min={minDate}
                            {...register("date")}
                            className={cn(
                              "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                              errors.date ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                        </div>
                        {errors.date && (
                          <p className="text-red-500 text-[11px] mt-1">{errors.date.message}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="time"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Departure Time
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="time"
                            type="time"
                            {...register("time")}
                            className={cn(
                              "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                              errors.time ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                        </div>
                        {errors.time && (
                          <p className="text-red-500 text-[11px] mt-1">{errors.time.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Conditional Return Date for Round Trips */}
                    {serviceType === "Round-Trip" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                          <RotateCcw className="w-4 h-4" /> Round-Trip Return Schedule
                        </div>
                        <div>
                          <input
                            type="date"
                            min={minDate}
                            {...register("returnDate")}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                          {errors.returnDate && (
                            <p className="text-red-500 text-[11px] mt-1">
                              {errors.returnDate.message}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Airport Flight Number (Optional) */}
                    {serviceType === "Airport-Transfer" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        <label
                          htmlFor="flightNumber"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Flight Number (For Automatic Delay Tracking)
                        </label>
                        <div className="relative">
                          <Plane className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="flightNumber"
                            type="text"
                            placeholder="e.g. 6E-241 / AI-542"
                            {...register("flightNumber")}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Vehicle Class Grid Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                        Choose Executive Vehicle Tier
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {FLEET_CLASSES.map((fleet) => {
                          const isSelected = vehicleClass === fleet.id;
                          return (
                            <button
                              key={fleet.id}
                              type="button"
                              onClick={() =>
                                setValue("vehicleClass", fleet.id as RideBookingValues["vehicleClass"], {
                                  shouldValidate: true,
                                })
                              }
                              className={cn(
                                "p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 relative",
                                isSelected
                                  ? "border-amber-500 bg-amber-500/10 shadow-md ring-1 ring-amber-500"
                                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:border-slate-300"
                              )}
                            >
                              {fleet.badge && (
                                <Badge className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider border-none">
                                  {fleet.badge}
                                </Badge>
                              )}
                              <div>
                                <p className="font-extrabold text-sm text-slate-900 dark:text-white">
                                  {fleet.name}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {fleet.model}
                                </p>
                              </div>
                              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                                <span>{fleet.pax}</span>
                                <span className="font-bold text-amber-600 dark:text-amber-400">
                                  {fleet.perKm}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Passenger Count & Luggage Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="passengers"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Passengers Count
                        </label>
                        <div className="relative">
                          <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="passengers"
                            type="number"
                            min={1}
                            max={8}
                            {...register("passengers", { valueAsNumber: true })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        {errors.passengers && (
                          <p className="text-red-500 text-[11px] mt-1">{errors.passengers.message}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="specialRequests"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Special Instructions (Optional)
                        </label>
                        <input
                          id="specialRequests"
                          type="text"
                          placeholder="e.g. Baby seat required, silent ride"
                          {...register("specialRequests")}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Submit Dispatch / Quote Trigger */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Route Telemetry...
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Review Trip Fare Breakdown & Confirm
                          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* ========================================================================= */}
            {/* 2. SUMMARY & TRUST SIDEBAR                                                */}
            {/* ========================================================================= */}
            <div className="lg:col-span-4 space-y-6">
              {/* Upfront Fare Estimate Box */}
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Estimated Upfront Fare
                  </span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px] font-bold uppercase">
                    Guaranteed Rate
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                      ₹{estimatedTotal}
                    </span>
                    <span className="text-xs text-slate-500">estimated base</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Includes GST, vehicle sanitization, commercial permits & toll estimates.
                  </p>
                </div>

                {/* Real-Time Routing Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle Category</span>
                    <span className="font-bold text-slate-900 dark:text-white capitalize">
                      {selectedVehicleObj.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Capacity</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {selectedVehicleObj.pax}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Mode</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {serviceType}
                    </span>
                  </div>
                </div>

                {/* Safety Protocol Per Ride */}
                <div className="space-y-2.5 pt-1">
                  {[
                    "Zero surge pricing guarantee",
                    "Continuous GPS emergency tracking",
                    "Complimentary flight delay buffer (45 mins)",
                    "Chauffeur background verified by authorities",
                  ].map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Priority Hotline */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors text-xs font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4" /> 24/7 Priority Hotline
                    </span>
                    <span>+91 98765 43210</span>
                  </a>
                </div>
              </Card>

              {/* Fleet Metric Strip */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-center">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">3.4 min</p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avg Dispatch Time</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-center">
                  <p className="text-2xl font-black text-emerald-500">4.96 ★</p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Driver Safety Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}