"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, ShieldCheck, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-slate-950">
      <Header />

      <main className="relative flex-1 flex flex-col items-center justify-center p-4 md:p-10 overflow-hidden">
        {/* 1. GPS Grid Background Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* 2. Command Center Glows (Industrial Amber) */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-slate-400 dark:bg-amber-900 rounded-full blur-[150px]"
          />
        </div>

        {/* 3. Layout Content */}
        <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Branding Sidebar (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col space-y-8 pr-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-amber-400 p-3 rounded-2xl w-fit mb-6 shadow-xl shadow-amber-400/20">
                <Navigation className="h-8 w-8 text-slate-950" />
              </div>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white">
                Dispatch <br />
                <span className="text-amber-500 tracking-normal not-italic font-bold">
                  Terminal v2.0
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                Secure access for authorized fleet managers and dispatch pilots
                only.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
                <ShieldCheck className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Encrypted
                </p>
                <p className="text-sm font-semibold">SSL Protection</p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
                <Car className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Fleet Active
                </p>
                <p className="text-sm font-semibold">Live Telemetry</p>
              </div>
            </motion.div>
          </div>

          {/* Children (Auth Card) Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-md">{children}</div>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Decorative Bottom Hazard Line */}
      <div className="h-1 w-full flex">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full flex-1",
              i % 2 === 0 ? "bg-amber-400" : "bg-slate-900",
            )}
          />
        ))}
      </div>
    </div>
  );
}
