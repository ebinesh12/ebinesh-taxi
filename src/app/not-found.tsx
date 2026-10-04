"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  NavigationOff,
  Search,
  MoveLeft,
  Compass,
  PhoneCall,
  CarFront,
  CarTaxiFront,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const routeSearchSchema = z.object({
  destination: z
    .string()
    .min(2, { message: "Enter a destination, landmark, or terminal" }),
});

type RouteSearchValues = z.infer<typeof routeSearchSchema>;

/* -------------------------------------------------------------------------- */
/*                           NOT FOUND COMPONENT                              */
/* -------------------------------------------------------------------------- */

export default function NotFound() {
  const router = useRouter();

  // Pure React Hook Form Setup (no Shadcn Form component)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RouteSearchValues>({
    resolver: zodResolver(routeSearchSchema),
    defaultValues: {
      destination: "",
    },
  });

  const onSearchSubmit = async (data: RouteSearchValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const queryParams = new URLSearchParams({
      drop: data.destination,
      pickup: "Current Location",
    }).toString();

    router.push(`/fare-estimation?${queryParams}`);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">
      {/* 1. BACKGROUND GLOWS & COORDINATE GRID */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Brand Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
            <CarTaxiFront className="w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tight uppercase text-slate-900 dark:text-white">
            Ebin<span className="text-amber-500">Taxi</span>
          </span>
        </Link>

        <Badge
          variant="outline"
          className="border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[10px] font-bold uppercase tracking-wider px-3 py-1"
        >
          <Sparkles className="w-3 h-3 mr-1.5" /> GPS Coordinates Unmapped
        </Badge>
      </header>

      {/* 2. MAIN 404 VIEWPORT */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full my-auto py-8">
        {/* Animated Off-Grid Beacon */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 flex items-center justify-center">
          {/* Pulsing Radar Rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.4, opacity: [0, 0.4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                delay: i * 0.8,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full border border-amber-500/30 pointer-events-none"
            />
          ))}

          {/* Core Central Housing */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="relative"
          >
            <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl text-amber-500 relative">
              <NavigationOff className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.8]" />

              {/* Floating Signal Ping Node */}
              <div className="absolute -top-2 -right-2 p-2 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Messaging Block */}
        <div className="space-y-3 mb-8 max-w-lg mx-auto">
          <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1">
            Status Code: 404 • Lost Trajectory
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Off the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-amber-400 to-red-500">
              Dispatch Grid.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            The route or page you requested isn&apos;t mapped in our fleet registry. 
            Our telemetry system couldn&apos;t locate these coordinates.
          </p>
        </div>

        {/* 3. QUICK ROUTE SEARCH & DISPATCH ASSISTANT (RHF + ZOD) */}
        <Card className="w-full max-w-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl p-5 sm:p-6 mb-8 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Where were you heading?
            </h4>
          </div>

          <form
            onSubmit={handleSubmit(onSearchSubmit)}
            noValidate
            className="space-y-2.5"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Airport, Hotel, OMR IT Park..."
                  {...register("destination")}
                  className={cn(
                    "w-full pl-9 pr-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                    errors.destination
                      ? "border-red-500"
                      : "border-slate-200 dark:border-slate-800"
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-1">
                    Route <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </Button>
            </div>

            {errors.destination && (
              <p className="text-red-500 text-[10px] font-semibold pl-1">
                {errors.destination.message}
              </p>
            )}
          </form>
        </Card>

        {/* 4. PRIMARY NAVIGATION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button
            asChild
            className="flex-1 h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/">
              <MoveLeft className="mr-1.5 w-4 h-4 stroke-[2.5]" />
              Return to Terminal
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 h-12 border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-amber-500/40"
          >
            <Link href="/booking-ride">
              <CarFront className="mr-1.5 w-4 h-4 text-amber-500" />
              Book Ride
            </Link>
          </Button>
        </div>

        {/* 5. QUICK DIRECTORY SHORTCUTS */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {[
            { label: "Our Fleet", href: "/fleet" },
            { label: "Services", href: "/services" },
            { label: "About Us", href: "/about" },
            { label: "Contact Dispatch", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </main>

      {/* 6. BOTTOM TELEMETRY FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Ebin Taxi Central Dispatch Network</span>
        </div>
        <a
          href="tel:+919876543210"
          className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300 hover:text-amber-500"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-500 mr-1" />
          24/7 Helpline: +91 98765 43210
        </a>
      </footer>
    </div>
  );
}