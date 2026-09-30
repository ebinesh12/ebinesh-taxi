"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  Users,
  Briefcase,
  Info,
  ChevronRight,
  ShieldCheck,
  Clock,
  Route,
  Star,
  Sparkles,
  MapPin,
  MapPinned,
  SlidersHorizontal,
  Loader2,
  PhoneCall,
  Gauge,
  Check,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

const searchParamsSchema = z.object({
  pickup: z.string().min(1).default("Chennai International Airport (MAA)"),
  drop: z.string().min(1).default("OMR IT Park, Sholinganallur"),
  serviceType: z.string().default("One-Way"),
  vehicleClass: z.string().optional().default("executive"),
  date: z.string().optional().default(new Date().toISOString().split("T")[0]),
  time: z.string().optional().default("12:00"),
  passengers: z.string().optional().default("2"),
});

const routeAdjustmentSchema = z.object({
  pickup: z.string().min(3, { message: "Pick-up location is required" }),
  drop: z.string().min(3, { message: "Destination address is required" }),
  serviceType: z.enum(["One-Way", "Round-Trip", "Airport-Transfer", "Hourly-Rental"]),
});

type RouteAdjustmentValues = z.infer<typeof routeAdjustmentSchema>;

/* -------------------------------------------------------------------------- */
/*                            TYPES & FALLBACK FLEET                          */
/* -------------------------------------------------------------------------- */

interface VehicleEstimation {
  id: string | number;
  name: string;
  model?: string;
  service_type: string;
  capacity?: number;
  luggage?: number;
  rate_per_km: number;
  base_fare: number;
  vehicle_image?: string | null;
  estimatedFare: number;
  distance: number;
  tag?: string;
  features?: string[];
}

const FALLBACK_ESTIMATION_FLEET: Omit<VehicleEstimation, "estimatedFare" | "distance">[] = [
  {
    id: "1",
    name: "Classic Sedan",
    model: "Toyota Dzire / Etios",
    service_type: "Economy",
    capacity: 4,
    luggage: 2,
    rate_per_km: 14,
    base_fare: 400,
    vehicle_image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    tag: "Economy Value",
    features: ["Air Conditioning", "Clean Cloth Interior", "GPS Monitored"],
  },
  {
    id: "2",
    name: "Executive VIP Sedan",
    model: "Toyota Camry / Skoda Superb",
    service_type: "Premium",
    capacity: 4,
    luggage: 3,
    rate_per_km: 24,
    base_fare: 750,
    vehicle_image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800",
    tag: "Chauffeur Preferred",
    features: ["Premium Leather Seating", "Complimentary Wi-Fi", "Bottled Water & Mints"],
  },
  {
    id: "3",
    name: "Prime Touring SUV",
    model: "Toyota Innova Crysta / Hycross",
    service_type: "SUV",
    capacity: 7,
    luggage: 5,
    rate_per_km: 20,
    base_fare: 900,
    vehicle_image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800",
    tag: "Family & Long Trip",
    features: ["Captain Armchair Seating", "Large Luggage Capacity", "Extra Legroom"],
  },
];

const calculateMockDistance = (pickup: string, drop: string) => {
  const combinedLength = (pickup?.length || 0) + (drop?.length || 0);
  return (combinedLength % 50) + 22; // 22km - 72km
};

/* -------------------------------------------------------------------------- */
/*                            MAIN CONTENT WRAPPER                            */
/* -------------------------------------------------------------------------- */

function FareEstimationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [vehicles, setVehicles] = useState<VehicleEstimation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdjustingRoute, setIsAdjustingRoute] = useState(false);

  // Validate Search Query Parameters
  const validationResult = useMemo(() => {
    return searchParamsSchema.safeParse(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  const activeParams = validationResult.success
    ? validationResult.data
    : {
        pickup: "Chennai International Airport (MAA)",
        drop: "OMR IT Park, Sholinganallur",
        serviceType: "One-Way",
        date: new Date().toISOString().split("T")[0],
        time: "12:00",
        passengers: "2",
      };

  // Pure React Hook Form for Inline Route Adjustment
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors: routeErrors, isSubmitting: isSubmittingRoute },
  } = useForm<RouteAdjustmentValues>({
    resolver: zodResolver(routeAdjustmentSchema),
    defaultValues: {
      pickup: activeParams.pickup,
      drop: activeParams.drop,
      serviceType: activeParams.serviceType as RouteAdjustmentValues["serviceType"],
    },
  });

  const selectedServiceType = watch("serviceType");

  const imagePreview = (vehicle_image?: string | null) => {
    if (!vehicle_image)
      return "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800";
    if (vehicle_image.startsWith("http")) return vehicle_image;

    try {
      const hex = vehicle_image.startsWith("\\x")
        ? vehicle_image.substring(2)
        : vehicle_image;
      const uint8Array = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
      );
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    } catch {
      return "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800";
    }
  };

  useEffect(() => {
    const fetchLiveRates = async () => {
      setLoading(true);
      setError("");

      try {
        const distance = calculateMockDistance(activeParams.pickup, activeParams.drop);
        const multiplier =
          activeParams.serviceType === "Round-Trip"
            ? 1.85
            : activeParams.serviceType === "Airport-Transfer"
            ? 1.2
            : 1.0;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let dbVehicles: any[] = [];

        if (supabase) {
          const { data, error: dbError } = await supabase
            .from("vehicles")
            .select("*")
            .eq("status", "ACTIVE");

          if (!dbError && data && data.length > 0) {
            dbVehicles = data;
          }
        }

        const sourceList = dbVehicles.length > 0 ? dbVehicles : FALLBACK_ESTIMATION_FLEET;

        const calculatedVehicles: VehicleEstimation[] = sourceList.map((v) => {
          const baseRate = v.base_fare || 400;
          const perKm = v.rate_per_km || 16;
          const totalFare = Math.round((distance * perKm + baseRate) * multiplier);

          return {
            ...v,
            distance,
            estimatedFare: totalFare,
          };
        });

        setVehicles(calculatedVehicles);
      } catch (err) {
        console.error("Fare calculation error:", err);
        setError("Network error: Unable to retrieve live rates.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveRates();
  }, [activeParams.pickup, activeParams.drop, activeParams.serviceType]);

  const handleBookingConfirm = (vehicle: VehicleEstimation) => {
    const tripDetails = {
      pickup: activeParams.pickup,
      drop: activeParams.drop,
      serviceType: activeParams.serviceType,
      date: activeParams.date,
      time: activeParams.time,
      passengers: activeParams.passengers,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      estimatedFare: vehicle.estimatedFare,
      distance: vehicle.distance,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("tripDetails", JSON.stringify(tripDetails));
    }
    router.push("/booking-verification");
  };

  const onRouteAdjustSubmit = (values: RouteAdjustmentValues) => {
    const queryParams = new URLSearchParams({
      pickup: values.pickup,
      drop: values.drop,
      serviceType: values.serviceType,
      date: activeParams.date,
      time: activeParams.time,
      passengers: activeParams.passengers,
    }).toString();

    setIsAdjustingRoute(false);
    router.push(`/fare-estimation?${queryParams}`);
  };

  if (loading) return <VehicleListSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] flex flex-col justify-between">
        <Header />
        <div className="flex flex-col items-center justify-center text-center px-6 py-32">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-4 border border-red-500/20">
            <Info className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Estimation Service Unavailable
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm text-sm">
            {error}
          </p>
          <Button
            onClick={() => router.push("/booking-ride")}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl px-6 h-12"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Return to Booking Desk
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const computedDistance = vehicles[0]?.distance || 32;
  const estimatedDriveTime = Math.round(computedDistance * 1.8);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">
      <Header />

      <main className="relative pt-28 pb-24 lg:pt-36">
        {/* ========================================================================= */}
        {/* 1. STICKY ROUTE TELEMETRY BAR                                             */}
        {/* ========================================================================= */}
        <nav className="sticky top-20 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-y border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto overflow-hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push("/booking-ride")}
                className="rounded-xl border-slate-200 dark:border-slate-800 shrink-0 h-10 w-10 hover:bg-amber-500/10 hover:text-amber-500"
                aria-label="Back to Booking Desk"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>

              {/* Connected Route Preview */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs overflow-hidden truncate">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {activeParams.pickup}
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />

                <div className="flex items-center gap-1.5 truncate">
                  <MapPinned className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {activeParams.drop}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics & Adjust Route Button */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="hidden sm:flex items-center gap-3 text-xs">
                <Badge variant="outline" className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2.5 py-1">
                  <Route className="w-3.5 h-3.5 mr-1 text-amber-500" /> ~{computedDistance} KM
                </Badge>
                <Badge variant="outline" className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2.5 py-1">
                  <Clock className="w-3.5 h-3.5 mr-1 text-emerald-500" /> ~{estimatedDriveTime} Mins Drive
                </Badge>
              </div>

              <Button
                variant="outline"
                onClick={() => setIsAdjustingRoute(!isAdjustingRoute)}
                className="rounded-xl border-slate-200 dark:border-slate-800 text-xs font-bold h-10 px-4 hover:border-amber-500/40"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                {isAdjustingRoute ? "Hide Panel" : "Adjust Route"}
              </Button>
            </div>
          </div>
        </nav>

        {/* ========================================================================= */}
        {/* 2. INLINE ROUTE ADJUSTMENT DRAWER (RHF + ZOD)                             */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isAdjustingRoute && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 overflow-hidden"
            >
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-xl p-6">
                <form
                  onSubmit={handleSubmit(onRouteAdjustSubmit)}
                  noValidate
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Modify Active Route Telemetry
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAdjustingRoute(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {/* Pickup Field */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Pickup Location
                      </label>
                      <input
                        type="text"
                        {...register("pickup")}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                          routeErrors.pickup ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                        )}
                      />
                      {routeErrors.pickup && (
                        <p className="text-red-500 text-[10px] mt-1">{routeErrors.pickup.message}</p>
                      )}
                    </div>

                    {/* Drop Destination */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Drop Destination
                      </label>
                      <input
                        type="text"
                        {...register("drop")}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                          routeErrors.drop ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                        )}
                      />
                      {routeErrors.drop && (
                        <p className="text-red-500 text-[10px] mt-1">{routeErrors.drop.message}</p>
                      )}
                    </div>

                    {/* Service Type Switcher */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Trip Type
                      </label>
                      <select
                        value={selectedServiceType}
                        onChange={(e) =>
                          setValue("serviceType", e.target.value as RouteAdjustmentValues["serviceType"], {
                            shouldValidate: true,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="One-Way">Point to Point (One-Way)</option>
                        <option value="Round-Trip">Round-Trip Transit</option>
                        <option value="Airport-Transfer">Airport Transfer</option>
                        <option value="Hourly-Rental">Hourly Chauffeur</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmittingRoute}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl h-10 px-6 shadow-md shadow-amber-500/20"
                    >
                      {isSubmittingRoute ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                          Re-calculating...
                        </>
                      ) : (
                        "Update & Re-Estimate Fares"
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 3. VEHICLE ESTIMATION GRID                                                */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Transparent Guarantees
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                Guaranteed Upfront Rates
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                All prices include commercial road taxes, toll estimates, fuel, and chauffeur allowances.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" /> Zero Hidden Surcharges
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full rounded-3xl border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  <div>
                    {/* Vehicle Image Viewport */}
                    <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-950 p-6 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent" />
                      <Image
                        src={imagePreview(vehicle.vehicle_image)}
                        alt={vehicle.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white font-bold text-[10px] flex gap-1 items-center">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.96
                        </Badge>
                        <Badge className="bg-amber-500 text-slate-950 font-black text-[10px] border-none uppercase">
                          {vehicle.service_type}
                        </Badge>
                      </div>
                    </div>

                    {/* Spec Breakdown */}
                    <CardContent className="p-6 space-y-5">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                          {vehicle.name}
                        </h3>
                        {vehicle.model && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {vehicle.model}
                          </p>
                        )}
                      </div>

                      {/* Amenities Row */}
                      <div className="flex items-center gap-2 pt-1 border-y border-slate-100 dark:border-slate-800/80 py-3 text-xs text-slate-600 dark:text-slate-300">
                        <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                          <Users className="w-3.5 h-3.5 text-amber-500" /> {vehicle.capacity || 4} Pax
                        </span>
                        <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                          <Briefcase className="w-3.5 h-3.5 text-amber-500" /> {vehicle.luggage || 2} Bags
                        </span>
                        <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                          <Gauge className="w-3.5 h-3.5 text-emerald-500" /> AC
                        </span>
                      </div>

                      {/* Perks list */}
                      <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Guaranteed upfront fare protection</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>45 mins complimentary airport delay wait</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Direct chauffeur telephone & live tracking</span>
                        </li>
                      </ul>
                    </CardContent>
                  </div>

                  {/* Guaranteed Fare & Selection Action */}
                  <div className="p-6 pt-0 space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                          Fixed Upfront Quote
                        </span>
                        <span className="text-xs text-slate-500">Taxes & Tolls Included</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">
                          ₹{vehicle.estimatedFare}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleBookingConfirm(vehicle)}
                      className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Confirm & Reserve Ride</span>
                      <ChevronRight className="ml-1.5 w-4 h-4 stroke-[2.5]" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* 4. PASSENGER ASSURANCE FOOTNOTE                                           */}
          {/* ========================================================================= */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Ebin Taxi Passenger Price Lock Guarantee
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                The fare quoted above is locked upon reservation. In the event of unexpected highway traffic jams or detours, you will not be charged overtime fees.
              </p>
            </div>

            <a href="tel:+919876543210" className="shrink-0">
              <Button
                variant="outline"
                className="rounded-xl border-slate-200 dark:border-slate-800 text-xs font-bold h-11 px-5"
              >
                <PhoneCall className="w-3.5 h-3.5 mr-2 text-amber-500" /> Speak with Dispatch
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SKELETON LOADER                              */
/* -------------------------------------------------------------------------- */

const VehicleListSkeleton = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white">
    <div className="h-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center px-8">
      <Skeleton className="h-8 w-64 rounded-xl" />
    </div>
    <div className="max-w-7xl mx-auto p-8 pt-12 space-y-8">
      <Skeleton className="h-10 w-96 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-115 rounded-3xl bg-slate-200 dark:bg-slate-900" />
        ))}
      </div>
    </div>
  </div>
);

export default function FareEstimationPage() {
  return (
    <Suspense fallback={<VehicleListSkeleton />}>
      <FareEstimationContent />
    </Suspense>
  );
}