"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CarTaxiFront,
  Navigation,
  Satellite,
  Cpu,
  Globe,
  Zap,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Headset,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const fastCallbackSchema = z.object({
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Enter a valid 10-digit phone number" }),
});

type FastCallbackValues = z.infer<typeof fastCallbackSchema>;

/* -------------------------------------------------------------------------- */
/*                            LOADING STAGES DATA                             */
/* -------------------------------------------------------------------------- */

const LOADING_STEPS = [
  {
    step: "01",
    text: "Initializing Executive Telemetry Grid...",
    icon: Globe,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    step: "02",
    text: "Synchronizing Highway Satellite Feeds...",
    icon: Satellite,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    step: "03",
    text: "Calculating Zero-Surge Route AI...",
    icon: Cpu,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    step: "04",
    text: "Locating Sanitized Fleet Units...",
    icon: CarTaxiFront,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    step: "05",
    text: "Finalizing Priority Chauffeur Allocation...",
    icon: Zap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                           LOADING COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function Loading() {
  const [index, setIndex] = useState(0);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCallbackSent, setIsCallbackSent] = useState(false);

  // Progressive Stage Cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  // Display emergency callback option if connection takes > 6 seconds
  useEffect(() => {
    const slowTimer = setTimeout(() => {
      setIsSlowConnection(true);
    }, 6000);
    return () => clearTimeout(slowTimer);
  }, []);

  const CurrentIcon = LOADING_STEPS[index].icon;

  // Pure React Hook Form for Fast Callback (no Shadcn Form component)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FastCallbackValues>({
    resolver: zodResolver(fastCallbackSchema),
    defaultValues: { phone: "" },
  });

  const onCallbackSubmit = async (data: FastCallbackValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Urgent callback requested from Loading screen:", data);
    setIsCallbackSent(true);
    reset();
    setTimeout(() => {
      setIsCallbackSent(false);
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">
      {/* 1. BACKGROUND GLOWS & MESH LINES */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Brand Indicator */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-4">
        <Link href="/" className="flex items-center gap-2 group">
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
          <Sparkles className="w-3 h-3 mr-1.5" /> High-Speed Telemetry
        </Badge>
      </header>

      {/* 2. CORE RADAR PATHFINDING ANIMATION */}
      <main className="relative z-10 flex flex-col items-center justify-center max-w-md w-full text-center my-auto py-8">
        <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
          {/* Outer Dashed Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/30"
          />

          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2.5 rounded-full border border-slate-300/40 dark:border-slate-800"
          />

          {/* Pulsing Core Housing */}
          <div className="absolute inset-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center justify-center backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.3, opacity: 0, rotate: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={LOADING_STEPS[index].color}
              >
                <CurrentIcon className="w-10 h-10 stroke-[2.2]" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orbiting Telemetry Satellite Node */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3.5 h-3.5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/80 border-2 border-white dark:border-slate-950" />
          </motion.div>
        </div>

        {/* Dynamic Status Typography */}
        <div className="space-y-3 mb-8 w-full">
          <div className="h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400"
              >
                Telemetry Phase {LOADING_STEPS[index].step} of 05
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="h-12 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white"
              >
                {LOADING_STEPS[index].text}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* Segmented Stage Progress Strip */}
        <div className="flex gap-2 w-full max-w-xs justify-center mb-8">
          {LOADING_STEPS.map((stepItem, i) => (
            <div
              key={stepItem.step}
              className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
            >
              {i <= index && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-linear-to-r from-amber-500 to-amber-400"
                />
              )}
            </div>
          ))}
        </div>

        {/* 3. SLOW CONNECTION EMPOWERMENT TRIGGER */}
        <AnimatePresence>
          {isSlowConnection && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full space-y-3 pt-2"
            >
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center justify-between">
                <span>Taking longer than expected?</span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Request Fast Callback
                </button>
              </div>

              <div className="flex gap-2">
                <a href="tel:+919876543210" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-800"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    Call Hotline
                  </Button>
                </a>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-11 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-800"
                >
                  <Link href="/booking-ride">
                    Skip to Booking <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. FOOTER SECURITY PROTOCOL STRIP */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 pb-2">
        <div className="flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Continuous GPS Dispatch Network Active</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit SSL Encrypted Route Telemetry</span>
        </div>
      </footer>

      {/* 5. FAST CALLBACK MODAL (RHF + ZOD) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-105 p-0 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden">
          {isCallbackSent ? (
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">
                Chauffeur Assigned
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Our central desk has logged your route. A dispatcher will phone you immediately.
              </DialogDescription>
            </div>
          ) : (
            <div className="flex flex-col">
              <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
                    <Headset className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-base font-black text-slate-900 dark:text-white">
                      Instant Chauffeur Callback
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                      Bypass screen loading with direct telephone dispatch
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onCallbackSubmit)}
                noValidate
                className="p-6 space-y-4"
              >
                <div>
                  <label
                    htmlFor="fast-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                  >
                    Your Mobile Number
                  </label>
                  <input
                    id="fast-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                    className={cn(
                      "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                      errors.phone ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[10px] mt-1 font-semibold">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                      Connecting Dispatch Desk...
                    </>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      Request Immediate Call <Send className="w-3.5 h-3.5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}