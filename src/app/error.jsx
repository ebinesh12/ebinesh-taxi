"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Construction,
  HardHat,
  AlertOctagon,
  Headphones,
  CarTaxiFront,
  Activity,
  Terminal,
} from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 overflow-hidden bg-[#050505] text-zinc-100">
      {/* 1. Background: Radar/Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #333 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      <main className="relative z-10 max-w-2xl w-full mx-auto flex flex-col items-center">
        {/* 2. Visual: Glowing Warning Beacon */}
        <div className="relative mb-12">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -inset-8 bg-orange-600/20 rounded-full blur-3xl"
          />
          <div className="relative flex items-center justify-center">
            <div className="p-8 bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl relative">
              <AlertOctagon
                className="h-16 w-16 text-orange-500"
                strokeWidth={1.5}
              />

              {/* Floating Mini Icons */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 p-2 bg-zinc-800 border border-white/10 rounded-xl shadow-lg"
              >
                <HardHat className="h-5 w-5 text-orange-400" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. Messaging: Premium Dispatch Voice */}
        <header className="space-y-6 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">
            <Activity className="w-3 h-3 animate-pulse" />
            Terminal Connection Severed
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white italic">
            Route <span className="text-orange-500">Blocked.</span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-md mx-auto leading-relaxed font-light">
            Our automated dispatch system encountered a critical stall. The
            fleet is currently on standby while we recalibrate.
          </p>
        </header>

        {/* 4. Diagnostic Card: System Scans */}
        <div className="w-full bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 mb-12 shadow-2xl overflow-hidden group">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-4 h-4 text-zinc-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              System Telemetry Data
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-600 uppercase font-bold mb-1">
                  Fault Digest
                </p>
                <code className="text-xs text-orange-200/70 font-mono break-all">
                  {error?.digest || "NO_DIGEST_AVAILABLE"}
                </code>
              </div>
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-600 uppercase font-bold mb-1">
                  Thread Status
                </p>
                <p className="text-xs text-rose-400 font-mono italic">
                  TERMINATED_UNEXPECTEDLY
                </p>
              </div>
            </div>

            <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
              <p className="text-[10px] text-zinc-600 uppercase font-bold mb-1">
                Stack Log
              </p>
              <p className="text-xs text-zinc-400 font-mono">
                {error?.message ||
                  "Navigation thread stalled at index 0x00... [RETRY_REQUIRED]"}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Control Interface */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
          <Button
            onClick={() => reset()}
            className="w-full sm:flex-1 h-16 bg-white text-black hover:bg-orange-500 hover:text-white rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-white/5 group"
          >
            <RefreshCw className="mr-3 h-5 w-5 transition-transform group-hover:rotate-180 duration-700" />
            Reboot Systems
          </Button>

          <Button
            variant="outline"
            className="w-full sm:flex-1 h-16 border-white/10 bg-transparent text-white hover:bg-white/5 rounded-2xl font-bold text-base transition-all"
          >
            <Headphones className="mr-3 h-5 w-5" />
            Contact Dispatch
          </Button>
        </div>

        {/* 6. Professional Finisher */}
        <footer className="mt-20 flex flex-col items-center space-y-8 opacity-20 group">
          <div className="flex items-center gap-6">
            <Construction size={20} />
            <div className="h-[1px] w-24 bg-white/20" />
            <CarTaxiFront size={24} />
            <div className="h-[1px] w-24 bg-white/20" />
            <Activity size={20} />
          </div>
          <p className="text-[9px] uppercase tracking-[0.5em] font-black text-center text-white">
            Premium Mobility Infrastructure • 24/7 Global Response
          </p>
        </footer>
      </main>
    </div>
  );
}
