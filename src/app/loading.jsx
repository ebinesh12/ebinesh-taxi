"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CarTaxiFront,
  Navigation,
  Satellite,
  Cpu,
  Globe,
  Zap,
} from "lucide-react";

const loadingSteps = [
  {
    text: "Initializing Global Dispatch...",
    icon: Globe,
    color: "text-blue-400",
  },
  {
    text: "Syncing with Traffic Satellites...",
    icon: Satellite,
    color: "text-indigo-400",
  },
  {
    text: "Optimizing Neural Route AI...",
    icon: Cpu,
    color: "text-violet-400",
  },
  {
    text: "Calibrating Premium Fleet...",
    icon: CarTaxiFront,
    color: "text-cyan-400",
  },
  { text: "Finalizing Rapid Pickup...", icon: Zap, color: "text-emerald-400" },
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = loadingSteps[index].icon;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#020617] text-slate-100">
      {/* 1. Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-indigo-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-violet-600/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 max-w-sm w-full text-center">
        {/* 2. Abstract Pathfinding Loader */}
        <div className="relative w-32 h-32 mb-12">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/10"
          />

          {/* Pulsing Core */}
          <div className="absolute inset-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
                className={loadingSteps[index].color}
              >
                <CurrentIcon size={40} strokeWidth={1.5} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orbiting Node */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </motion.div>
        </div>

        {/* 3. High-End Typography */}
        <div className="space-y-2 mb-10">
          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-400"
              >
                System Status
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-light tracking-tight text-white"
            >
              {loadingSteps[index].text}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* 4. Segmented Progress Bar */}
        <div className="flex gap-1.5 w-full justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden"
            >
              {i <= index && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                />
              )}
            </div>
          ))}
        </div>

        {/* 5. Footer Logic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md"
        >
          <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.25em] font-black text-slate-400">
            Quantum Mobility Dispatch
          </span>
        </motion.div>
      </div>

      {/* Subtle Speed Lines Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%", y: `${i * 20}%` }}
            animate={{ x: "200%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
            className="absolute h-[1px] w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          />
        ))}
      </div>
    </div>
  );
}
