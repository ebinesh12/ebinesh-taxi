"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  RefreshCcw,
  TriangleAlert,
  Wrench,
  ShieldAlert,
  PhoneCall,
} from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log error to monitoring service (Sentry, LogRocket, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] px-6 py-12 text-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      {/* 1. Background Pattern: Subtle Taxi Checkers */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `conic-gradient(from 0deg at 50% 50%, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <main className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* 2. Visual Warning: Hazard Light Animation */}
        <div className="relative mb-10">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute -inset-4 bg-yellow-500/20 dark:bg-yellow-500/10 rounded-full blur-2xl"
          />
          <div className="relative p-6 bg-yellow-400 dark:bg-yellow-500 rounded-2xl shadow-2xl shadow-yellow-500/20 transform rotate-3">
            <TriangleAlert className="h-12 w-12 text-slate-950 stroke-[2.5px]" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 bg-slate-900 dark:bg-slate-50 rounded-lg shadow-xl">
            <Wrench className="h-4 w-4 text-slate-50 dark:text-slate-900" />
          </div>
        </div>

        {/* 3. Typography & Messaging */}
        <header className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
            <ShieldAlert className="w-3 h-3" />
            Dispatch System Interrupted
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-50 uppercase italic">
            Engine Trouble.
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto font-medium">
            Our digital dispatch center hit a roadblock. We&apos;re currently
            working on getting the fleet back online.
          </p>
        </header>

        {/* 4. Diagnostic Section (Modern Technical Look) */}
        <div className="w-full mb-10 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-widest">
              Diagnostic Report
            </span>
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <Separator className="mb-3 opacity-50" />
          <code className="block text-left text-xs font-mono text-slate-500 dark:text-slate-300 break-all leading-relaxed">
            <span className="text-yellow-500 font-bold mr-2">ERR_CODE:</span>
            {error?.digest || "INTERNAL_DRIVE_FAILURE"}
            <br />
            <span className="text-yellow-500 font-bold mr-2">LOG:</span>
            {error?.message || "Unexpected stall in main navigation thread."}
          </code>
        </div>

        {/* 5. Action Buttons (Shadcn + Premium Styling) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <Button
            onClick={() => reset()}
            size="lg"
            className="w-full sm:flex-1 rounded-xl h-14 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-base shadow-lg shadow-yellow-500/20 group"
          >
            <RefreshCcw className="mr-2 h-5 w-5 transition-transform group-hover:rotate-180 duration-500" />
            Restart Engine
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:flex-1 rounded-xl h-14 border-slate-200 dark:border-slate-800 dark:bg-slate-950 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
          >
            <PhoneCall className="mr-2 h-4 w-4" />
            Support
          </Button>
        </div>

        {/* 6. Professional Footer */}
        <footer className="mt-16 flex flex-col items-center gap-6 opacity-40">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-slate-400 dark:bg-slate-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
              Taxi Dispatch v2.0
            </span>
            <div className="h-[1px] w-12 bg-slate-400 dark:bg-slate-600" />
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            Safe travels &bull; Reliable Service &bull; 24/7
          </p>
        </footer>
      </main>
    </div>
  );
}
