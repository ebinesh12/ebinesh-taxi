"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Home,
  Timer,
  ShieldCheck,
  Zap,
  Copy,
  Download,
  Share2,
  Sparkles,
  MapPin,
} from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; // Assuming sonner for modern toasts

const searchParamsSchema = z.object({
  ref: z.string().min(1, "Reference missing"),
});

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const validation = searchParamsSchema.safeParse({
    ref: searchParams.get("ref"),
  });

  const copyRef = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 relative overflow-hidden">
      {/* 1. Background Aurora Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/10 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lime-500/10 blur-[140px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_80px_-20px_rgba(20,184,166,0.15)] overflow-hidden">
          <CardContent className="p-8 md:p-16 text-center">
            {/* 2. Dynamic Success Icon */}
            <div className="flex justify-center mb-10 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="relative z-10 w-24 h-24 bg-gradient-to-br from-teal-400 to-lime-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(45,212,191,0.4)]"
              >
                <CheckCircle2 className="w-12 h-12 text-zinc-950 stroke-[2.5px]" />
              </motion.div>

              {/* Floating Sparkles */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 text-lime-400"
              >
                <Sparkles size={24} />
              </motion.div>
            </div>

            <div className="space-y-4 mb-12">
              <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-1 uppercase tracking-[0.3em] text-[10px] font-bold">
                Transaction Verified
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
                Journey{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 italic">
                  Locked.
                </span>
              </h1>
              <p className="text-slate-400 text-lg font-light max-w-sm mx-auto">
                Payment secured. Your high-performance fleet is being prepared
                for dispatch.
              </p>
            </div>

            {/* 3. Ticket Detail Block */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mb-10 group relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-white/10 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Booking Reference
              </div>

              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-3xl md:text-4xl font-mono font-bold text-white tracking-widest">
                  {validation.success ? validation.data.ref : "ERR-VOID"}
                </span>
                <button
                  onClick={() =>
                    validation.success && copyRef(validation.data.ref)
                  }
                  className="p-3 bg-white/5 hover:bg-teal-500/20 rounded-2xl transition-all text-teal-400"
                >
                  {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            {/* 4. Real-time Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Dispatch Status
                </span>
                <span className="text-sm font-semibold text-white">
                  Live-Tracking
                </span>
              </div>

              <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                <Timer className="text-lime-400" size={18} />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Estimated Arrival
                </span>
                <span className="text-sm font-semibold text-white">
                  09 - 12 Mins
                </span>
              </div>

              <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                <Zap className="text-teal-400" size={18} />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Route Optimizer
                </span>
                <span className="text-sm font-semibold text-white">
                  Active (AI)
                </span>
              </div>
            </div>

            {/* 5. Actions */}
            <div className="flex flex-col gap-4">
              <Button
                asChild
                className="h-16 bg-white text-zinc-950 hover:bg-teal-400 hover:text-zinc-950 rounded-[1.25rem] text-base font-bold transition-all shadow-xl"
              >
                <Link href="/">
                  <Home className="mr-2 w-5 h-5" />
                  Back to Terminal
                </Link>
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 h-14 border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 rounded-[1.25rem] text-xs font-bold uppercase tracking-widest"
                >
                  <Download className="mr-2 w-4 h-4" /> Invoice
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-14 border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 rounded-[1.25rem] text-xs font-bold uppercase tracking-widest"
                >
                  <Share2 className="mr-2 w-4 h-4" /> Share Trip
                </Button>
              </div>
            </div>

            {/* Security Footer */}
            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-8 opacity-40">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
                <ShieldCheck size={14} /> Global Transit Insured
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
                <MapPin size={14} /> 24/7 Monitoring
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#020817] flex items-center justify-center p-6">
    <div className="w-full max-w-lg space-y-4">
      <Skeleton className="h-[500px] w-full bg-white/5 rounded-[3rem]" />
    </div>
  </div>
);

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
