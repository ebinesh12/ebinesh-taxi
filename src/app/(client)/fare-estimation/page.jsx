"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Briefcase,
  Info,
  ChevronRight,
  Zap,
  ShieldCheck,
  Timer,
  Route,
  Star,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import { searchParamsSchema } from "@/services/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Mock function for distance calculation
const calculateMockDistance = (pickup, drop) => {
  const combinedLength = (pickup?.length || 0) + (drop?.length || 0);
  return (combinedLength % 80) + 20;
};

function FareEstimationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const validationResult = useMemo(() => {
    return searchParamsSchema.safeParse(
      Object.fromEntries(searchParams.entries()),
    );
  }, [searchParams]);

  const imagePreview = (vehicle_image) => {
    if (!vehicle_image)
      return "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=800";
    try {
      const hex = vehicle_image.substring(2);
      const uint8Array = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)),
      );
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    } catch (e) {
      return "https://images.unsplash.com/photo-1549194388-2469d59ec612?q=80&w=800";
    }
  };

  useEffect(() => {
    if (!validationResult.success) {
      setError("Route parameters missing. Please restart your search.");
      setLoading(false);
      return;
    }

    const { pickup, drop, serviceType } = validationResult.data;

    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const { data, error: dbError } = await supabase
          .from("vehicles")
          .select("*")
          .eq("status", "ACTIVE")
          .eq("service_type", serviceType);

        if (dbError) throw dbError;

        const distance = calculateMockDistance(pickup, drop);
        const vehiclesWithFare = data.map((v) => ({
          ...v,
          estimatedFare: distance * v.rate_per_km + v.base_fare,
          distance,
        }));

        setVehicles(vehiclesWithFare);
      } catch (err) {
        setError("Network error: Unable to retrieve live rates.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [validationResult]);

  const handleBooking = (vehicle) => {
    if (!validationResult.success) return;
    const tripDetails = {
      ...validationResult.data,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      estimatedFare: vehicle.estimatedFare,
    };
    sessionStorage.setItem("tripDetails", JSON.stringify(tripDetails));
    router.push("/booking-verification");
  };

  if (loading) return <VehicleListSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#020617]">
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20">
          <Info className="w-10 h-10 text-rose-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Estimation Failed
        </h3>
        <p className="text-slate-400 mb-8 max-w-sm">{error}</p>
        <Button
          onClick={() => router.back()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 py-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Reset Search
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-24">
      {/* 1. Glass Route Header */}
      <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 h-24 flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-400" />
          </Button>

          <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 overflow-hidden">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                <Route className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="truncate">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Pick-up
                </p>
                <p className="text-sm font-semibold truncate">
                  {validationResult.data?.pickup}
                </p>
              </div>
            </div>

            <ChevronRight className="hidden md:block w-4 h-4 text-slate-700" />

            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-rose-500/10 rounded-lg shrink-0">
                <Zap className="w-4 h-4 text-rose-400" />
              </div>
              <div className="truncate">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Destination
                </p>
                <p className="text-sm font-semibold truncate text-rose-400">
                  {validationResult.data?.drop}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end shrink-0">
            <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3">
              {vehicles[0]?.distance} KM Total
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400 italic">
                Experience.
              </span>
            </h1>
            <p className="text-slate-400 mt-2 text-lg font-light">
              Real-time availability for {validationResult.data?.serviceType}{" "}
              fleet.
            </p>
          </motion.div>
        </header>

        {/* 2. Enhanced Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="bg-slate-900/40 border-white/5 backdrop-blur-sm overflow-hidden rounded-[2.5rem] transition-all hover:border-indigo-500/50 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.3)]">
                {/* Vehicle Image with Gradient Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={imagePreview(vehicle.vehicle_image)}
                    alt={vehicle.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 flex gap-2">
                    <Badge className="bg-white/10 backdrop-blur-md border-white/10 text-white font-bold flex gap-1 items-center">
                      <Star className="w-3 h-3 fill-rose-400 text-rose-400" />{" "}
                      4.9
                    </Badge>
                    <Badge className="bg-indigo-600 border-none text-white font-bold">
                      {vehicle.service_type}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {vehicle.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">
                          <Users size={14} className="text-indigo-400" />{" "}
                          {vehicle.capacity || 4}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">
                          <Briefcase size={14} className="text-rose-400" /> 2
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">
                          <ShieldCheck size={14} className="text-emerald-400" />{" "}
                          Insured
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 mb-8 group-hover:bg-indigo-500/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <Timer className="w-5 h-5 text-indigo-400" />
                      <span className="text-sm font-medium text-slate-300">
                        Fastest Pickup
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white tracking-tighter">
                        ₹{vehicle.estimatedFare?.toFixed(0)}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">
                        Guaranteed Rate
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBooking(vehicle)}
                    className="w-full h-14 bg-white text-slate-950 hover:bg-indigo-500 hover:text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] group/btn transition-all"
                  >
                    Confirm Selection
                    <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VehicleListSkeleton = () => (
  <div className="min-h-screen bg-[#020617] text-white">
    <div className="h-24 bg-slate-900/50 border-b border-white/5 flex items-center px-8">
      <Skeleton className="h-10 w-full max-w-md bg-white/5 rounded-2xl" />
    </div>
    <div className="container mx-auto p-8 pt-16">
      <Skeleton className="h-12 w-64 mb-12 bg-white/5 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[500px] bg-white/5 rounded-[2.5rem] animate-pulse"
          />
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
