"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Send,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Headset
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* Zod Schema for Instant Callback Form */
const callbackSchema = z.object({
  fullName: z.string().min(2, { message: "Name is required" }),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Enter a valid 10-digit mobile number" }),
  preferredTime: z.enum(["asap", "within_1hr", "evening"]),
});

type CallbackValues = z.infer<typeof callbackSchema>;

export default function GlobalConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pure React Hook Form Setup (no Shadcn Form component)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallbackValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      preferredTime: "asap",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedTime = watch("preferredTime");

  const onCallbackSubmit = async (data: CallbackValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Rapid Chauffeur Callback Queued:", data);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsOpen(false);
      reset();
    }, 2800);
  };

  return (
    <>
      {/* Floating Bottom-Right Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full h-14 px-6 bg-linear-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/30 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
            aria-label="Open 24/7 Concierge Hotline"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950" />
            </span>
            <Headset className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">24/7 Concierge</span>
          </Button>
        </motion.div>
      </div>

      {/* Instant Callback Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-110 p-0 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden">
          {isSuccess ? (
            <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">
                Callback Queued
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-xs">
                Our central dispatch desk will phone you within 3 minutes.
              </DialogDescription>
            </div>
          ) : (
            <div className="flex flex-col">
              <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                    <Headset className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-base font-black text-slate-900 dark:text-white">
                      Priority Chauffeur Hotline
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Request an instant human callback or dial directly
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="p-6 space-y-5">
                {/* Instant Dial Box */}
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Direct Dispatch Line
                      </p>
                      <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-amber-500">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-amber-500 text-slate-950 px-2 py-1 rounded-md">
                    Tap to Call
                  </span>
                </a>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                  <span className="bg-white dark:bg-slate-950 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 absolute">
                    Or Request Quick Callback
                  </span>
                </div>

                {/* Form handled by React Hook Form */}
                <form
                  onSubmit={handleSubmit(onCallbackSubmit)}
                  noValidate
                  className="space-y-3.5"
                >
                  <div>
                    <label
                      htmlFor="cb-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="cb-name"
                      type="text"
                      placeholder="e.g. Vikramaditya"
                      {...register("fullName")}
                      className={cn(
                        "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                        errors.fullName ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cb-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="cb-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className={cn(
                        "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                        errors.phone ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Callback Timing
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: "asap", label: "Immediate (<3m)" },
                        { id: "within_1hr", label: "Within 1 Hr" },
                        { id: "evening", label: "This Evening" },
                      ].map((timing) => (
                        <button
                          key={timing.id}
                          type="button"
                          onClick={() =>
                            setValue("preferredTime", timing.id as CallbackValues["preferredTime"], {
                              shouldValidate: true,
                            })
                          }
                          className={cn(
                            "py-2 px-1 text-[11px] font-bold rounded-xl border text-center transition-all truncate",
                            selectedTime === timing.id
                              ? "bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400"
                              : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-500"
                          )}
                        >
                          {timing.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-amber-500/20 transition-all mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                        Connecting Desk...
                      </>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        Submit Priority Request <Send className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </Button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Zero Telemarketing • Strict Privacy
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}