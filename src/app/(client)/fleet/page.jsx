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
  MapPinned,
  Loader2,
  Sparkles,
  Route,
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
        console?.error(err);
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-20 transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-32 overflow-hidden bg-slate-950 text-white">
        {/* Modern Background Accents */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/10 blur-[80px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-4 py-1.5 backdrop-blur-md rounded-full text-sm font-semibold flex w-fit gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Executive Fleet
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Select Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              Premium Ride.
            </span>
          </h1>
          <p className="text-slate-400 mt-6 max-w-lg text-lg font-medium leading-relaxed">
            Browse our top-tier selection of vehicles tailored for your ultimate
            comfort. Book your journey in seconds.
          </p>
        </div>
      </section>

      {/* 2. FILTER TABS */}
      <section className="container mx-auto px-6 -mt-10 relative z-30">
        <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
          <TabsList className="h-16 w-full max-w-2xl mx-auto grid grid-cols-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-blue-900/5 p-1.5 border border-slate-200 dark:border-slate-800">
            {["All", "Economy", "Premium", "SUV"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* 3. VEHICLE GRID */}
      <section className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-[400px] md:h-[300px] rounded-[2rem] bg-white dark:bg-slate-900"
                />
              ))
            : filteredFleet.map((car) => (
                <Card
                  key={car.id}
                  className="border border-slate-200 dark:border-slate-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none bg-white dark:bg-slate-900/50 rounded-[2rem] overflow-hidden group hover:border-blue-500/30 transition-colors"
                >
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="relative h-64 md:h-full w-full overflow-hidden bg-slate-100 dark:bg-slate-950 p-6 flex items-center justify-center">
                      {/* Subtle background glow for image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                      <Image
                        src={imagePreview(car.vehicle_image)}
                        alt={car.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <Badge className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 border-none px-3 py-1 mb-4 text-[10px] uppercase font-black tracking-widest rounded-full">
                          {car.service_type}
                        </Badge>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                          {car.name}
                        </h3>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                            <Users className="w-4 h-4 text-blue-500" /> 4 Seats
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                            <Briefcase className="w-4 h-4 text-blue-500" /> 2
                            Bags
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Separator className="mb-6 bg-slate-100 dark:bg-slate-800" />
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">
                              Estimated Rate
                            </p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                              ₹{car.rate_per_km}
                              <span className="text-sm text-slate-500 font-medium tracking-normal">
                                /km
                              </span>
                            </p>
                          </div>
                          <Button
                            onClick={() => handleBookClick(car)}
                            className="rounded-xl bg-slate-900 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-500 font-bold px-6 h-12 shadow-lg shadow-slate-900/10 dark:shadow-blue-600/20 transition-all group-hover:scale-105"
                          >
                            Book Ride
                            <ChevronRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      </section>

      {/* 4. BOOKING DIALOG */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-8 overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />

          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-500/20 p-2.5 rounded-xl">
                <Route className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Dispatch{" "}
                <span className="text-blue-600 dark:text-blue-400">Route</span>
              </DialogTitle>
            </div>
            <DialogDescription className="font-medium text-slate-500 dark:text-slate-400 mt-2">
              Preparing your{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                {selectedVehicle?.name}
              </span>{" "}
              for dispatch. Enter your details below.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleDirectBooking}
            className="space-y-5 mt-6 relative z-10"
          >
            <div className="space-y-2 relative">
              <label className="text-[11px] font-black uppercase tracking-widest ml-1 text-slate-500">
                Pickup Location
              </label>
              <div className="relative group">
                <MapPinned className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 transition-transform group-focus-within:scale-110" />
                <Input
                  placeholder="Enter pickup address"
                  className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-semibold focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:border-blue-500 transition-all text-slate-900 dark:text-white"
                  value={route.pickup}
                  onChange={(e) =>
                    setRoute({ ...route, pickup: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              {/* Connecting line between inputs */}
              <div className="absolute -top-7 left-6 w-[2px] h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />

              <label className="text-[11px] font-black uppercase tracking-widest ml-1 text-slate-500">
                Drop Location
              </label>
              <div className="relative group">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 transition-transform group-focus-within:scale-110" />
                <Input
                  placeholder="Enter destination"
                  className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-semibold focus-visible:ring-emerald-500 focus-visible:ring-offset-0 focus-visible:border-emerald-500 transition-all text-slate-900 dark:text-white"
                  value={route.drop}
                  onChange={(e) => setRoute({ ...route, drop: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mt-4 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center text-base">
                  Confirm Dispatch <ChevronRight className="ml-2 w-5 h-5" />
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
