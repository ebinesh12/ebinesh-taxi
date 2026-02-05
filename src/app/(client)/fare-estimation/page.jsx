// app/fare-estimation/page.tsx
"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Briefcase,
  Info,
  ChevronRight,
  MapPin,
  Navigation,
  Clock,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import { searchParamsSchema } from "@/services/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
      return "https://images.unsplash.com/photo-1549194388-2469d59ec612?q=80&w=800";
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
      setError("Invalid trip details. Please check your route settings.");
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
          distance, // useful for display
        }));

        setVehicles(vehiclesWithFare);
      } catch (err) {
        setError("Failed to fetch available vehicles.");
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-full mb-4">
          <Info className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-6 max-w-xs">{error}</p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="rounded-xl"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-20">
      {/* 1. Trip Summary Header (Sticky) */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="shrink-0 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="hidden sm:flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 text-sm font-bold truncate">
                <span className="truncate">
                  {validationResult.data?.pickup}
                </span>
                <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                <span className="truncate text-amber-500">
                  {validationResult.data?.drop}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">
                {validationResult.data?.serviceType} &bull; Approx{" "}
                {vehicles[0]?.distance} KM
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-amber-500/50 text-amber-600 dark:text-amber-400 shrink-0"
          >
            Available Now
          </Badge>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-10 mt-4">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic italic">
            Select Your <span className="text-amber-500">Ride</span>
          </h1>
          <p className="text-muted-foreground">
            Premium vehicles selected for your specific route.
          </p>
        </header>

        {/* 2. Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-xl bg-white dark:bg-zinc-900 hover:ring-2 hover:ring-amber-400 transition-all group">
                  <div className="relative h-56 w-full bg-slate-100 dark:bg-zinc-800">
                    <Image
                      src={imagePreview(vehicle.vehicle_image)}
                      alt={vehicle.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-slate-900/80 dark:bg-black/60 backdrop-blur-md border-none text-[10px] uppercase tracking-widest font-black">
                        {vehicle.service_type}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">
                          {vehicle.name}
                        </h3>
                        <div className="flex gap-4 mt-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Users className="w-3.5 h-3.5" /> 4
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Briefcase className="w-3.5 h-3.5" /> 2
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Clock className="w-3.5 h-3.5" /> 15m
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black tracking-tighter">
                          ₹{vehicle.estimatedFare?.toFixed(0)}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                          All Inclusive
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4 opacity-50" />

                    <Button
                      onClick={() => handleBooking(vehicle)}
                      className="w-full h-12 bg-slate-900 dark:bg-amber-400 dark:text-slate-950 font-bold uppercase tracking-widest text-xs rounded-xl group"
                    >
                      Book This Ride
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Navigation className="w-12 h-12 mx-auto text-muted-foreground opacity-20 mb-4" />
              <p className="text-muted-foreground font-medium">
                No vehicles found for this route.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const VehicleListSkeleton = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
    <div className="h-20 bg-white dark:bg-zinc-900 border-b flex items-center px-8">
      <Skeleton className="h-10 w-64 rounded-full" />
    </div>
    <div className="container mx-auto p-8">
      <Skeleton className="h-12 w-48 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-none shadow-lg overflow-hidden">
            <Skeleton className="h-56 w-full" />
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </Card>
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
