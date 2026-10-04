"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion} from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CheckCircle2,
  Home,
  Timer,
  ShieldCheck,
  Zap,
  Copy,
  Share2,
  Sparkles,
  PhoneCall,
  Send,
  Loader2,
  Printer,
  Check,
  Smartphone,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

const searchParamsSchema = z.object({
  ref: z.string().min(1, "Reference missing").default("VIP-849201"),
});

const smsAlertSchema = z.object({
  alternatePhone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Enter a valid 10-digit mobile number" }),
  notifyViaWhatsApp: z.boolean()
});

type SmsAlertValues = z.infer<typeof smsAlertSchema>;

/* -------------------------------------------------------------------------- */
/*                            SUCCESS CONTENT                                 */
/* -------------------------------------------------------------------------- */

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isAlertSubscribed, setIsAlertSubscribed] = useState(false);

  // Validate Search Query Parameter
  const refParam = searchParams.get("ref") || "VIP-849201";
  const validation = searchParamsSchema.safeParse({ ref: refParam });
  const bookingRef = validation.success ? validation.data.ref : "VIP-849201";

  // Pure React Hook Form for SMS Notification Broadcast (no Shadcn Form component)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SmsAlertValues>({
    resolver: zodResolver(smsAlertSchema),
    defaultValues: {
      alternatePhone: "",
      notifyViaWhatsApp: true,
    },
  });

  const copyRef = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTrip = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Ebin Taxi Executive Trip",
          text: `My chauffeured ride is confirmed with reference ${bookingRef}. Track dispatch live.`,
          url: window.location.href,
        });
      } catch {
        copyRef(window.location.href);
      }
    } else {
      copyRef(window.location.href);
    }
  };

  const onSmsAlertSubmit = async (data: SmsAlertValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log("Telemetry alert registered:", data);
    setIsAlertSubscribed(true);
    reset();
    setTimeout(() => setIsAlertSubscribed(false), 4500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">
      <Header />

      <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex items-center justify-center">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl shadow-2xl overflow-hidden text-center">
              {/* Top Accent Gradient */}
              <div className="h-2 w-full bg-linear-to-r from-amber-500 via-amber-400 to-emerald-500" />

              <CardContent className="p-6 sm:p-12 lg:p-14 space-y-8">
                {/* 1. Dynamic Success Badge Icon */}
                <div className="flex justify-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shadow-xl shadow-emerald-500/10"
                  >
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
                  </motion.div>

                  {/* Micro Sparkle Decoration */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute -top-2 right-1/3 text-amber-500"
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* 2. Heading and Description */}
                <div className="space-y-3 max-w-lg mx-auto">
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                    Reservation Confirmed & Dispatched
                  </Badge>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    Your Chauffeur is <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-amber-400 to-emerald-500">
                      En Route to Position.
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Your itinerary is authorized. Our dispatch desk has allocated your vehicle. SMS with driver contact details has been triggered.
                  </p>
                </div>

                {/* 3. Booking Reference Code Ticket Box */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 relative max-w-md mx-auto">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                    Booking Reference Identifier
                  </span>

                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white tracking-widest">
                      {bookingRef}
                    </span>

                    <button
                      type="button"
                      onClick={() => copyRef(bookingRef)}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-all"
                      title="Copy Reference"
                      aria-label="Copy Reference"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 4. Real-Time Telemetry Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live Tracking
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">GPS Link Active</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-white text-xs font-bold">
                      <Timer className="w-3.5 h-3.5 text-amber-500" />
                      04 - 08 Mins
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Arrival Buffer</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-white text-xs font-bold">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Fixed Price Lock
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Zero Toll Surge</span>
                  </div>
                </div>

                {/* 5. SMS / WhatsApp Passenger Broadcast Form (RHF + Zod) */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 max-w-md mx-auto text-left space-y-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-500" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Send Live Driver Link to Co-Passenger
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Share real-time GPS tracking via instant SMS or WhatsApp
                      </p>
                    </div>
                  </div>

                  {isAlertSubscribed ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Tracking link dispatched to secondary contact!</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSmsAlertSubmit)}
                      noValidate
                      className="space-y-2.5 pt-1"
                    >
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...register("alternatePhone")}
                          className={cn(
                            "flex-1 px-3.5 py-2 rounded-xl border bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500",
                            errors.alternatePhone ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                          )}
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-9 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <span className="flex items-center gap-1">
                              Send <Send className="w-3 h-3" />
                            </span>
                          )}
                        </Button>
                      </div>
                      {errors.alternatePhone && (
                        <p className="text-red-500 text-[10px] font-semibold">{errors.alternatePhone.message}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* 6. Quick Action Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                  <Button
                    asChild
                    className="flex-1 h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                  >
                    <Link href="/">
                      <Home className="mr-1.5 w-4 h-4" /> Return to Home
                    </Link>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (typeof window !== "undefined") window.print();
                    }}
                    className="flex-1 h-12 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    <Printer className="mr-1.5 w-4 h-4" /> Print Itinerary
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleShareTrip}
                    className="flex-1 h-12 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    <Share2 className="mr-1.5 w-4 h-4 text-amber-500" /> Share Trip
                  </Button>
                </div>

                {/* 7. Support Footer Strip */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Fully Insured Passenger Transit
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> 24/7 Dispatch Concierge: +91 98765 43210
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SKELETON LOADER                              */
/* -------------------------------------------------------------------------- */

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-[#030712] flex items-center justify-center p-6">
    <div className="w-full max-w-lg space-y-4">
      <Skeleton className="h-130 w-full rounded-3xl bg-slate-200 dark:bg-slate-900" />
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