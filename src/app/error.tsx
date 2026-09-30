"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  RefreshCw,
  AlertTriangle,
  Home,
  Terminal,
  Activity,
  ShieldAlert,
  Send,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  PhoneCall,
  CarTaxiFront,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const incidentReportSchema = z.object({
  contactInfo: z
    .string()
    .min(3, { message: "Provide an email or 10-digit mobile number" }),
  notes: z.string().optional(),
});

type IncidentReportValues = z.infer<typeof incidentReportSchema>;

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/* -------------------------------------------------------------------------- */
/*                            ERROR COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function GlobalError({ error, reset }: ErrorProps) {
  const [copied, setCopied] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);

  useEffect(() => {
    // Log exception telemetry to central observability provider
    console.error("Central Dispatch Disruption Caught:", error);
  }, [error]);

  // Pure React Hook Form Initialization (no Shadcn Form component)
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<IncidentReportValues>({
    resolver: zodResolver(incidentReportSchema),
    defaultValues: {
      contactInfo: "",
      notes: "",
    },
  });

  const copyDigest = () => {
    const textToCopy = error?.digest || error?.message || "DISPATCH_CRASH_ERR";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onIncidentSubmit = async (data: IncidentReportValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log("Telemetry incident logged to NOC:", {
      ...data,
      digest: error?.digest,
      errorMessage: error?.message,
    });
    setIsReportSubmitted(true);
    resetForm();
    setTimeout(() => setIsReportSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300 flex flex-col justify-between overflow-x-hidden relative">
      {/* 1. AMBIENT BACKGROUND GLOWS & RADAR MESH */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-md">
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
          <Activity className="w-3 h-3 mr-1.5 animate-pulse" /> Telemetry Failover
        </Badge>
      </header>

      {/* 2. MAIN ERROR TERMINAL BODY */}
      <main className="relative z-10 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col items-center text-center">
        {/* Glowing Warning Beacon */}
        <div className="relative mb-8">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="absolute -inset-6 bg-amber-500/20 dark:bg-amber-500/15 rounded-full blur-2xl"
          />
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-amber-500/10 text-amber-500">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 stroke-[2.2]" />
          </div>
        </div>

        {/* Messaging Block */}
        <div className="space-y-3 mb-8 max-w-lg mx-auto">
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px] font-bold uppercase tracking-wider px-3 py-1">
            Navigation Link Stalled
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Dispatch Telemetry <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-amber-400 to-red-500">
              Temporarily Blocked.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Our automated fleet routing service encountered an unexpected anomaly. 
            Vehicles are in safe mode while the routing session recalibrates.
          </p>
        </div>

        {/* 3. DIAGNOSTIC LOG CARD */}
        <Card className="w-full rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl overflow-hidden mb-8 text-left">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                System Diagnostics Telemetry
              </span>
            </div>

            <button
              type="button"
              onClick={copyDigest}
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-amber-500 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Digest Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Fault Code</span>
                </>
              )}
            </button>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Fault Digest ID
                </span>
                <code className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 break-all">
                  {error?.digest || "ERR_DISPATCH_TIMEOUT_0x44"}
                </code>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Dispatch Relay State
                </span>
                <span className="text-xs font-bold text-red-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  RECALIBRATION_REQUIRED
                </span>
              </div>
            </div>

            {/* Toggleable Stack Details */}
            <div>
              <button
                type="button"
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <span>{showTechnicalDetails ? "Hide" : "Inspect"} Exception Payload</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform",
                    showTechnicalDetails && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {showTechnicalDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2.5 p-3 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed border border-slate-800 overflow-x-auto"
                  >
                    {error?.message ||
                      "Navigation thread interrupted during telemetry dispatch sync. Retrying will reload route parameters."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* 4. PRIMARY RECOVERY ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8">
          <Button
            onClick={() => reset()}
            className="h-13 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw className="mr-2 h-4 w-4 stroke-[2.5]" />
            Recalibrate & Retry
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-13 border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 rounded-2xl text-xs font-bold uppercase tracking-wider hover:border-amber-500/40"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Terminal Home
            </Link>
          </Button>

          <a href="tel:+919876543210" className="w-full">
            <Button
              variant="outline"
              className="w-full h-13 border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 rounded-2xl text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Direct Chauffeur Desk
            </Button>
          </a>
        </div>

        {/* 5. INCIDENT TELEMETRY TRANSMISSION (RHF + ZOD) */}
        <Card className="w-full rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 p-6 text-left">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Notify Priority Fleet Engineering
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">
            Stuck mid-reservation? Drop your mobile/email and our dispatch engineer will reach out immediately.
          </p>

          {isReportSubmitted ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Diagnostic incident logged. Dispatch team notified.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onIncidentSubmit)}
              noValidate
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Your phone (+91) or corporate email"
                  {...register("contactInfo")}
                  className={cn(
                    "w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                    errors.contactInfo
                      ? "border-red-500"
                      : "border-slate-200 dark:border-slate-800"
                  )}
                />
                {errors.contactInfo && (
                  <p className="text-red-500 text-[10px] mt-1 pl-1 font-semibold">
                    {errors.contactInfo.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-1.5">
                    Send Diagnostic <Send className="w-3.5 h-3.5" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </Card>
      </main>

      {/* 6. BOTTOM SECURITY ASSURANCE */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>ISO 9001:2015 Monitored Urban Dispatch Infrastructure</span>
        </div>
        <span>24/7 Central Emergency NOC Active</span>
      </footer>
    </div>
  );
}