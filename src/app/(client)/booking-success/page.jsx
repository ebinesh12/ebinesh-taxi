// app/booking-success/page.tsx
"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Car,
  Home,
  Clock,
  ShieldCheck,
  Navigation,
  Copy,
} from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Validation schema
const searchParamsSchema = z.object({
  ref: z.string().min(1, "Booking reference is missing."),
});

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const validation = searchParamsSchema.safeParse({
    ref: searchParams.get("ref"),
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="container mx-auto flex min-h-[90vh] items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="relative overflow-hidden border-none shadow-2xl bg-white dark:bg-zinc-900 text-center">
          {/* 1. Brand Accent Top Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-amber-400" />

          <CardHeader className="pt-12 pb-6 flex flex-col items-center">
            {/* 2. Success Animation */}
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-green-500 rounded-full"
              />
              <div className="relative bg-green-500 rounded-full p-4 shadow-lg shadow-green-500/30">
                <CheckCircle2 className="h-12 w-12 text-white stroke-[3px]" />
              </div>
            </div>

            <Badge
              variant="outline"
              className="mb-4 border-green-500/50 text-green-600 dark:text-green-400 uppercase tracking-widest font-black text-[10px]"
            >
              Payment & Route Confirmed
            </Badge>

            <CardTitle className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
              Ride <span className="text-amber-500">Confirmed!</span>
            </CardTitle>
            <CardDescription className="text-base text-slate-500 dark:text-zinc-400 max-w-xs mx-auto">
              Your driver is being dispatched to your location. Check your SMS
              for real-time updates.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 md:px-10 space-y-8">
            {/* 3. Reference Ticket UI */}
            <div className="relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 border-dashed">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-zinc-900 rounded-full border-r border-slate-200 dark:border-zinc-800" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-zinc-900 rounded-full border-l border-slate-200 dark:border-zinc-800" />

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Transaction Reference
                </p>
                {validation.success ? (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-mono font-black text-slate-900 dark:text-amber-400 tracking-tighter">
                      {validation.data.ref}
                    </span>
                    <button
                      onClick={() => copyToClipboard(validation.data.ref)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-slate-400"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-destructive font-bold uppercase text-xs">
                    Reference Lost
                  </p>
                )}
              </div>
            </div>

            {/* 4. Live Status Indicator */}
            <div className="flex items-center justify-center gap-8 py-4 px-6 rounded-2xl bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-black uppercase tracking-widest italic">
                  Dispatcher Online
                </span>
              </div>
              <div className="h-4 w-[1px] bg-white/20 dark:bg-slate-950/20" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-widest italic">
                  ETA: 12 Mins
                </span>
              </div>
            </div>

            {/* 5. Additional Info Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 dark:border-zinc-800">
                <ShieldCheck className="h-5 w-5 text-blue-500" />
                <span className="text-[10px] font-bold uppercase text-slate-500">
                  Insured Trip
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 dark:border-zinc-800">
                <Navigation className="h-5 w-5 text-amber-500" />
                <span className="text-[10px] font-bold uppercase text-slate-500">
                  GPS Tracked
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pb-12 pt-6">
            <Button
              asChild
              size="lg"
              className="w-full max-w-sm h-14 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 font-black uppercase tracking-tighter rounded-2xl group transition-all"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Dashboard
              </Link>
            </Button>
            <Button
              variant="link"
              className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-amber-500 transition-colors"
            >
              Download Invoice (PDF)
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Background Decorative Element */}
      <div className="fixed bottom-0 right-0 p-10 opacity-10 pointer-events-none select-none">
        <Car className="h-96 w-96 -rotate-12 text-slate-900 dark:text-white" />
      </div>
    </div>
  );
}

const LoadingFallback = () => (
  <div className="container mx-auto flex min-h-[80vh] items-center justify-center p-6">
    <Card className="w-full max-w-lg overflow-hidden border-none shadow-xl">
      <Skeleton className="h-2 w-full bg-slate-200" />
      <CardHeader className="items-center space-y-6 pt-12">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 flex flex-col items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-10">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
      </CardContent>
      <CardFooter className="flex justify-center pb-12">
        <Skeleton className="h-14 w-48 rounded-2xl" />
      </CardFooter>
    </Card>
  </div>
);

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
