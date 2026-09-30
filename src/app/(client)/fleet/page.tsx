"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion} from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Users,
  Briefcase,
  ChevronRight,
  Navigation,
  MapPinned,
  Loader2,
  Sparkles,
  Route,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Gauge,
  Star,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const dispatchFormSchema = z.object({
  pickup: z
    .string()
    .min(3, { message: "Pick-up location must be at least 3 characters" }),
  drop: z
    .string()
    .min(3, { message: "Drop-off destination is required" }),
  pickupDate: z.string().min(1, { message: "Please select a date" }),
  pickupTime: z.string().min(1, { message: "Please specify pickup time" }),
});

type DispatchFormValues = z.infer<typeof dispatchFormSchema>;

/* -------------------------------------------------------------------------- */
/*                            TYPES & FALLBACK FLEET                          */
/* -------------------------------------------------------------------------- */

interface Vehicle {
  id: string | number;
  name: string;
  model?: string;
  service_type: string;
  seats: number;
  luggage: number;
  rate_per_km: number;
  base_fare?: number;
  vehicle_image?: string | null;
  features?: string[];
  tag?: string;
}

const FALLBACK_FLEET: Vehicle[] = [
  {
    id: "1",
    name: "Classic Sedan",
    model: "Toyota Dzire / Etios",
    service_type: "Economy",
    seats: 4,
    luggage: 2,
    rate_per_km: 14,
    base_fare: 400,
    vehicle_image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    features: ["Dual Airbags", "AC Climate Control", "Clean Interiors"],
    tag: "Budget Friendly",
  },
  {
    id: "2",
    name: "Executive VIP Sedan",
    model: "Toyota Camry / Skoda Superb",
    service_type: "Premium",
    seats: 4,
    luggage: 3,
    rate_per_km: 24,
    base_fare: 750,
    vehicle_image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800",
    features: ["Leather Recliners", "Wi-Fi & Chilled Water", "Silent Cabin"],
    tag: "Executive Choice",
  },
  {
    id: "3",
    name: "Prime Touring SUV",
    model: "Toyota Innova Crysta / Hycross",
    service_type: "SUV",
    seats: 7,
    luggage: 5,
    rate_per_km: 20,
    base_fare: 900,
    vehicle_image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800",
    features: ["Captain Armrests", "High Luggage Bay", "Interstate Comfort"],
    tag: "Family Favorite",
  },
  {
    id: "4",
    name: "Executive Grand Van",
    model: "Toyota Commuter VIP",
    service_type: "Van",
    seats: 9,
    luggage: 8,
    rate_per_km: 32,
    base_fare: 1500,
    vehicle_image: "https://images.unsplash.com/photo-1549194388-2469d59ec612?q=80&w=800",
    features: ["Luxury Reclining Rows", "Conference Layout", "USB Fast Ports"],
    tag: "Delegation & Events",
  },
];

const calculateMockDistance = (pickup: string, drop: string) => {
  const combinedLength = (pickup?.length || 0) + (drop?.length || 0);
  return (combinedLength % 60) + 25; // 25km - 85km realistic range
};

/* -------------------------------------------------------------------------- */
/*                            FLEET PAGE COMPONENT                            */
/* -------------------------------------------------------------------------- */

export default function FleetPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Safe image helper
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

  // Fetch Supabase Fleet with Fallback Grace
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        if (!supabase) {
          setVehicles(FALLBACK_FLEET);
          return;
        }
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("status", "ACTIVE");

        if (error || !data || data.length === 0) {
          setVehicles(FALLBACK_FLEET);
        } else {
          setVehicles(data);
        }
      } catch (err) {
        console.error("Supabase load error, loading default fleet:", err);
        setVehicles(FALLBACK_FLEET);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // React Hook Form for Quick Dispatch
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DispatchFormValues>({
    resolver: zodResolver(dispatchFormSchema),
    defaultValues: {
      pickup: "",
      drop: "",
      pickupDate: new Date().toISOString().split("T")[0],
      pickupTime: "12:00",
    },
  });

  const watchPickup = watch("pickup");
  const watchDrop = watch("drop");

  const calculatedDistance = calculateMockDistance(watchPickup, watchDrop);
  const liveEstimatedFare = selectedVehicle
    ? Math.round(
        calculatedDistance * selectedVehicle.rate_per_km +
          (selectedVehicle.base_fare || 350)
      )
    : 0;

  const handleBookClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsBookingOpen(true);
  };

  const onDispatchSubmit = async (data: DispatchFormValues) => {
    if (!selectedVehicle) return;

    await new Promise((resolve) => setTimeout(resolve, 800));

    const tripDetails = {
      pickup: data.pickup,
      drop: data.drop,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
      serviceType: selectedVehicle.service_type,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      estimatedFare: liveEstimatedFare,
      distance: calculatedDistance,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("tripDetails", JSON.stringify(tripDetails));
    }

    setIsBookingOpen(false);
    reset();
    router.push("/booking-verification");
  };

  const filteredFleet =
    filter === "all"
      ? vehicles
      : vehicles.filter(
          (v) => v.service_type?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">

      <main className="relative pb-24">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="relative pt-36 pb-28 lg:pt-48 lg:pb-36 overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/85 to-slate-950" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 max-w-2xl"
            >
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Executive Fleet Directory
              </Badge>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
                Select Your <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-300 to-emerald-400">
                  Chauffeured Ride.
                </span>
              </h1>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Discover our meticulously groomed fleet. From swift executive sedans to premium 7-seater touring SUVs, every vehicle is telemetry-equipped and sanitized before dispatch.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FILTER TABS                                                            */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
            <TabsList className="h-14 w-full max-w-2xl mx-auto grid grid-cols-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 p-1.5">
              {[
                { label: "All Vehicles", val: "all" },
                { label: "Economy", val: "economy" },
                { label: "Premium VIP", val: "premium" },
                { label: "SUV / Vans", val: "suv" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.val}
                  value={tab.val}
                  className="rounded-xl font-bold text-xs uppercase tracking-wider transition-all data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>

        {/* ========================================================================= */}
        {/* 3. VEHICLE SHOWCASE GRID                                                  */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-90 rounded-3xl bg-slate-200 dark:bg-slate-900"
                  />
                ))
              : filteredFleet.map((car) => (
                  <Card
                    key={car.id}
                    className="border border-slate-200/80 dark:border-slate-800/80 shadow-lg bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="grid sm:grid-cols-12 h-full">
                      {/* Vehicle Image Viewport */}
                      <div className="sm:col-span-5 relative h-56 sm:h-full w-full bg-slate-100 dark:bg-slate-950/80 p-6 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent" />
                        <Image
                          src={imagePreview(car.vehicle_image)}
                          alt={car.name}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                        />
                        {car.tag && (
                          <Badge className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-800 text-[9px] uppercase font-bold tracking-wider">
                            {car.tag}
                          </Badge>
                        )}
                      </div>

                      {/* Vehicle Spec Content */}
                      <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none px-2.5 py-0.5 text-[10px] uppercase font-black tracking-widest rounded-md">
                              {car.service_type}
                            </Badge>
                            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" /> 4.9 Rating
                            </span>
                          </div>

                          <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                              {car.name}
                            </h3>
                            {car.model && (
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {car.model}
                              </p>
                            )}
                          </div>

                          {/* Quick Spec Pills */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                              <Users className="w-3.5 h-3.5 text-amber-500" /> {car.seats || 4} Seats
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                              <Briefcase className="w-3.5 h-3.5 text-amber-500" /> {car.luggage || 2} Bags
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                              <Gauge className="w-3.5 h-3.5 text-emerald-500" /> AC Enabled
                            </span>
                          </div>

                          {/* Micro Features */}
                          {car.features && (
                            <ul className="space-y-1.5 pt-2">
                              {car.features.slice(0, 2).map((feat, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Card Footer: Pricing & Dispatch Button */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Standard Tariff
                            </p>
                            <p className="text-xl font-black text-slate-900 dark:text-white">
                              ₹{car.rate_per_km}
                              <span className="text-xs text-slate-500 font-normal"> /km</span>
                            </p>
                          </div>

                          <Button
                            onClick={() => handleBookClick(car)}
                            className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 h-11 text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                          >
                            Reserve Ride
                            <ChevronRight className="ml-1 w-3.5 h-3.5 stroke-[2.5]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. QUICK ROUTE DISPATCH DIALOG (RHF + ZOD)                                */}
        {/* ========================================================================= */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-120 p-0 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-3xl pointer-events-none" />

            <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                  <Route className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-black text-slate-900 dark:text-white">
                    Direct Fleet Dispatch
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Assigning <span className="font-bold text-slate-900 dark:text-white">{selectedVehicle?.name}</span> to your route.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onDispatchSubmit)}
              noValidate
              className="p-6 space-y-4"
            >
              {/* Pickup Location */}
              <div>
                <label
                  htmlFor="dispatch-pickup"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                >
                  Pick-up Point
                </label>
                <div className="relative">
                  <MapPinned className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none" />
                  <input
                    id="dispatch-pickup"
                    type="text"
                    placeholder="Enter pickup address or landmark"
                    {...register("pickup")}
                    className={cn(
                      "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                      errors.pickup ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                    )}
                  />
                </div>
                {errors.pickup && (
                  <p className="text-red-500 text-[10px] font-semibold mt-1">
                    {errors.pickup.message}
                  </p>
                )}
              </div>

              {/* Drop Destination */}
              <div>
                <label
                  htmlFor="dispatch-drop"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                >
                  Drop Destination
                </label>
                <div className="relative">
                  <Navigation className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
                  <input
                    id="dispatch-drop"
                    type="text"
                    placeholder="Enter final drop-off location"
                    {...register("drop")}
                    className={cn(
                      "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                      errors.drop ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                    )}
                  />
                </div>
                {errors.drop && (
                  <p className="text-red-500 text-[10px] font-semibold mt-1">
                    {errors.drop.message}
                  </p>
                )}
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="dispatch-date"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="dispatch-date"
                      type="date"
                      {...register("pickupDate")}
                      className="w-full pl-9 pr-2 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dispatch-time"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="dispatch-time"
                      type="time"
                      {...register("pickupTime")}
                      className="w-full pl-9 pr-2 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Route Estimation Box */}
              {watchPickup && watchDrop && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Est. Distance: ~{calculatedDistance} km
                    </span>
                    <p className="text-slate-500 text-[11px]">All-inclusive fixed rate</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      ₹{liveEstimatedFare}
                    </span>
                  </div>
                </div>
              )}

              {/* Confirm Dispatch Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Route Allocation...
                  </>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    Proceed to Verification <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}