"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Users,
  Briefcase,
  ChevronRight,
  Navigation,
  MapPin,
  Loader2,
} from "lucide-react";

import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Distance calculation logic (matching your estimation logic)
const calculateMockDistance = (pickup, drop) => {
  const combinedLength = (pickup?.length || 0) + (drop?.length || 0);
  return (combinedLength % 80) + 20; // Returns a distance between 20 and 100km
};

export default function FleetPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");

  // Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [route, setRoute] = useState({ pickup: "", drop: "" });

  const imagePreview = (vehicle_image) => {
    if (!vehicle_image)
      return "https://images.unsplash.com/photo-1549194388-2469d59ec612?q=80&w=800";
    try {
      const hex = vehicle_image.startsWith("\\x")
        ? vehicle_image.substring(2)
        : vehicle_image;
      const uint8Array = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
      );
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    } catch (e) {
      return "https://images.unsplash.com/photo-1549194388-2469d59ec612?q=80&w=800";
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("status", "ACTIVE");
        if (error) throw error;
        setVehicles(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleBookClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsBookingOpen(true);
  };

  const handleDirectBooking = (e) => {
    e.preventDefault();
    if (!route.pickup || !route.drop || !selectedVehicle) return;

    setIsSubmitting(true);

    // 1. Calculate stats locally
    const distance = calculateMockDistance(route.pickup, route.drop);
    const estimatedFare =
      distance * selectedVehicle.rate_per_km + (selectedVehicle.base_fare || 0);

    // 2. Prepare Trip Details object (matches your app's schema)
    const tripDetails = {
      pickup: route.pickup,
      drop: route.drop,
      serviceType: selectedVehicle.service_type,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      estimatedFare: estimatedFare,
      distance: distance,
    };

    // 3. Save to sessionStorage so /booking-verification can pick it up
    sessionStorage.setItem("tripDetails", JSON.stringify(tripDetails));

    // 4. Navigate directly to verification
    router.push("/booking-verification");
  };

  const filteredFleet =
    filter === "all"
      ? vehicles
      : vehicles.filter(
          (v) => v.service_type?.toLowerCase() === filter.toLowerCase(),
        );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-zinc-900 text-white">
        <div className="container mx-auto px-6 relative z-10">
          <Badge className="bg-amber-400 text-slate-950 font-bold uppercase tracking-tighter">
            Elite Fleet
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mt-4 leading-none">
            Instant <span className="text-amber-500">Dispatch.</span>
          </h1>
          <p className="text-zinc-400 mt-4 max-w-md italic">
            Select your preferred asset and book your journey in seconds.
          </p>
        </div>
      </section>

      {/* 2. FILTER TABS */}
      <section className="container mx-auto px-6 -mt-8 relative z-30">
        <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
          <TabsList className="h-16 w-full max-w-2xl mx-auto grid grid-cols-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl p-2 border border-slate-200 dark:border-zinc-800">
            {["All", "Economy", "Premium", "SUV"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* 3. VEHICLE GRID */}
      <section className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-80 rounded-[2.5rem]" />
              ))
            : filteredFleet.map((car) => (
                <Card
                  key={car.id}
                  className="border-none shadow-xl bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden group"
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto overflow-hidden bg-slate-100 dark:bg-zinc-800">
                      <Image
                        src={imagePreview(car.vehicle_image)}
                        alt={car.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase text-amber-500 mb-1">
                          {car.service_type}
                        </p>
                        <h3 className="text-2xl font-black italic uppercase dark:text-white leading-tight">
                          {car.name}
                        </h3>
                        <div className="flex gap-4 mt-4">
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
                            <Users className="w-3.5 h-3.5 text-amber-500" /> 4
                            Seats
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
                            <Briefcase className="w-3.5 h-3.5 text-amber-500" />{" "}
                            2 Bags
                          </span>
                        </div>
                      </div>
                      <Separator className="my-6 opacity-50" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-400">
                            Rate
                          </p>
                          <p className="text-xl font-black tracking-tighter italic">
                            ₹{car.rate_per_km}
                            <span className="text-xs">/km</span>
                          </p>
                        </div>
                        <Button
                          onClick={() => handleBookClick(car)}
                          className="rounded-xl bg-slate-950 dark:bg-amber-400 dark:text-slate-950 font-black uppercase text-[10px] h-12 px-6 group"
                        >
                          Book Now
                          <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      </section>

      {/* 4. BOOKING DIALOG */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] bg-white dark:bg-zinc-900 border-none shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter leading-none">
              Confirm <span className="text-amber-500">Route</span>
            </DialogTitle>
            <DialogDescription className="font-medium italic pt-2">
              Dispatching{" "}
              <span className="text-slate-950 dark:text-white font-bold underline">
                {selectedVehicle?.name}
              </span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleDirectBooking} className="space-y-4 mt-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-1 text-zinc-500">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  placeholder="Enter pickup address"
                  className="pl-12 h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 border-none font-bold"
                  value={route.pickup}
                  onChange={(e) =>
                    setRoute({ ...route, pickup: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-1 text-zinc-500">
                Drop Location
              </label>
              <div className="relative">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                <Input
                  placeholder="Enter destination"
                  className="pl-12 h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 border-none font-bold"
                  value={route.drop}
                  onChange={(e) => setRoute({ ...route, drop: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-16 bg-slate-950 dark:bg-amber-400 dark:text-slate-950 font-black uppercase tracking-[0.2em] rounded-2xl mt-4 shadow-xl shadow-amber-500/10"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm Dispatch"
              )}
              {!isSubmitting && <ChevronRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
