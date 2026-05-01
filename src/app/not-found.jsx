"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft, MapPinOff, Car, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4">
      {/* 1. Background Map Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle, #e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: "100px 100px, 50px 50px, 50px 50px",
          }}
        />
      </div>

      {/* 2. Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/10 dark:bg-yellow-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* 3. The "Lost" Visual */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <MapPinOff className="w-24 h-24 text-slate-300 dark:text-slate-700 stroke-[1px]" />

            {/* Drifting Taxi */}
            <motion.div
              animate={{
                x: [-20, 20, -20],
                rotate: [-5, 5, -5],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-yellow-400 dark:bg-yellow-500 rounded-2xl shadow-2xl shadow-yellow-500/20"
            >
              <Car className="w-10 h-10 text-slate-950" />
            </motion.div>
          </motion.div>
        </div>

        {/* 4. Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
            Error 404
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Wrong Turn!
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Sorry, pilot. We couldn&apos;t find the destination you&apos;re
            looking for. The street might have been renamed or the route is
            currently unavailable.
          </p>
        </motion.div>

        {/* 5. Navigation Actions (Shadcn-inspired) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors rounded-xl bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 shadow-lg"
          >
            <MoveLeft className="w-4 h-4" />
            Back to Dispatch
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl"
          >
            <Compass className="w-4 h-4" />
            Recalculate Route
          </button>
        </motion.div>

        {/* 6. Subtle help text */}
        <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
          Think this is an error?{" "}
          <button className="underline hover:text-yellow-500">
            Contact Support
          </button>
        </p>
      </div>

      {/* 7. Decorative License Plate (Bottom Corner) */}
      <div className="absolute bottom-10 right-10 hidden lg:block opacity-20 rotate-12">
        <div className="border-2 border-slate-400 p-2 rounded bg-slate-100 font-mono text-xl text-slate-500">
          TAXI-404
        </div>
      </div>
    </div>
  );
}
