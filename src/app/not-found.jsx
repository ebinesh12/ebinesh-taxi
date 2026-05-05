"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MoveLeft,
  Map as MapIcon,
  LocateFixed,
  Tractor,
  NavigationOff,
  SearchX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0c0a09] px-6">
      {/* 1. Rich Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-900/10 rounded-full blur-[120px]" />

        {/* Scattered "Lost" Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(circle, black, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* 2. Central Visual: The "Off-Grid" Animation */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
          {/* Pulsing Signal Rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: i,
                ease: "easeOut",
              }}
              className="absolute inset-0 border border-orange-500/30 rounded-full"
            />
          ))}

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative"
          >
            <div className="p-10 bg-zinc-900 border border-white/10 rounded-[3rem] shadow-2xl relative">
              <NavigationOff
                className="w-20 h-20 text-orange-500"
                strokeWidth={1}
              />

              {/* Drifting "Search" Icon */}
              <motion.div
                animate={{
                  x: [40, -40, 40],
                  y: [20, -20, 20],
                  rotate: [0, 360],
                }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute -top-4 -right-4 p-3 bg-rose-600 rounded-2xl shadow-lg shadow-rose-900/40"
              >
                <SearchX className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 3. Typography: High-Contrast Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Signal Lost: Error 404
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic">
            Off the <span className="text-orange-500">Grid.</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
            The coordinates you requested aren&apos;t on our map. Our pilots
            have hit the edge of the known city limits.
          </p>
        </motion.div>

        {/* 4. Action Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button
            asChild
            className="h-16 px-10 bg-white text-black hover:bg-orange-500 hover:text-white rounded-2xl font-bold text-base transition-all group"
          >
            <Link href="/">
              <MoveLeft className="mr-3 w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              Return to Terminal
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="h-16 px-10 border-white/10 bg-transparent text-white hover:bg-white/5 rounded-2xl font-bold text-base transition-all"
          >
            <LocateFixed className="mr-3 w-5 h-5" />
            Ping Dispatch
          </Button>
        </motion.div>

        {/* 5. Modern Link List */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
          {[
            { label: "Book a Ride", icon: MapIcon },
            { label: "Our Fleet", icon: NavigationOff },
            { label: "Corporate", icon: Tractor },
          ].map((item, idx) => (
            <button key={idx} className="flex items-center gap-2 group">
              <item.icon
                size={14}
                className="group-hover:text-orange-500 transition-colors"
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Decorative "Chassis Number" (Bottom) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-none opacity-20">
        <div className="h-[1px] w-12 bg-white/20" />
        <span className="font-mono text-[10px] tracking-[0.5em] text-white">
          VIN: 404-NOT-FOUND-ST-2024
        </span>
        <div className="h-[1px] w-12 bg-white/20" />
      </div>
    </div>
  );
}
