"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MapPin } from "lucide-react";

const loadingTexts = [
  "Locating nearby taxis...",
  "Calculating the fastest route...",
  "Checking traffic conditions...",
  "Finding your driver...",
  "Polishing the yellow paint...",
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  // Rotate loading text every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-white dark:bg-slate-950">
      
      {/* 1. City Grid Background (Modern UX) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="h-full w-full" 
             style={{ backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`, 
                      backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        
        {/* 2. Moving Car Animation */}
        <div className="relative w-48 h-20 mb-8 flex items-end justify-center">
          {/* Road Line */}
          <div className="absolute bottom-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-1/2 h-full bg-yellow-400 dark:bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            />
          </div>

          {/* Taxi Icon with 'Bounce' and 'Drive' effect */}
          <motion.div
            animate={{ 
              y: [0, -4, 0],
              x: [-2, 2, -2] 
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 0.4, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            className="flex flex-col items-center"
          >
            <div className="p-3 rounded-xl bg-yellow-400 dark:bg-yellow-500 shadow-lg dark:shadow-yellow-500/20">
              <Car className="w-8 h-8 text-slate-900" />
            </div>
            {/* Animated Shadow */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="w-8 h-1 bg-black/20 dark:bg-white/10 blur-sm rounded-full mt-1"
            />
          </motion.div>
        </div>

        {/* 3. Status Text (Shadcn-style Typography) */}
        <div className="h-8 overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400"
            >
              {loadingTexts[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* 4. Progress Bar (Shadcn Pattern) */}
        <div className="w-64 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 10, ease: "easeInOut" }}
            className="h-full bg-slate-900 dark:bg-slate-100"
          />
        </div>

        {/* 5. Footer Branding */}
        <div className="mt-12 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-600">
                Premium Ride Service
            </span>
        </div>
      </div>
    </div>
  );
}
