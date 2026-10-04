"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
  Headset,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid corporate or personal email" }),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Valid 10-digit phone number is required" }),
  subject: z
    .string()
    .min(3, { message: "Subject is required (min 3 characters)" }),
  urgency: z.enum(["general", "corporate", "emergency"], {
message: "Select inquiry priority"
  }),
  message: z
    .string()
    .min(10, { message: "Message should contain at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/* -------------------------------------------------------------------------- */
/*                               STATIC DATA                                  */
/* -------------------------------------------------------------------------- */

const REGIONAL_DESKS = [
  {
    city: "Chennai (Central HQ)",
    address: "Anna Salai, Guindy Industrial Hub, Chennai 600032",
    phone: "+91 98765 43210",
    email: "chennai.hub@ebintaxi.com",
    activeCabs: "140+ active cabs",
  },
  {
    city: "Coimbatore",
    address: "Avinashi Road, Peelamedu, Coimbatore 641004",
    phone: "+91 98765 43211",
    email: "coimbatore.hub@ebintaxi.com",
    activeCabs: "75+ active cabs",
  },
  {
    city: "Madurai",
    address: "Ring Road Interchange, Mattuthavani, Madurai 625007",
    phone: "+91 98765 43212",
    email: "madurai.hub@ebintaxi.com",
    activeCabs: "50+ active cabs",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                            CONTACT PAGE COMPONENT                          */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pure React Hook Form Initialization
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      urgency: "general",
      message: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedUrgency = watch("urgency");

  const onSubmitContact = async (data: ContactFormValues) => {
    // Simulated Dispatch Log
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Transmitted Support Payload:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">

      <main className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Radial Glows & Grid Mesh */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ========================================================================= */}
            {/* 1. LEFT COLUMN: STATUS HUD & DISPATCH CONTACTS                            */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
                  <Headset className="w-3.5 h-3.5 text-amber-500" />
                  24/7 Priority Concierge
                </Badge>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                  Get in <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-amber-400 to-emerald-500">
                    Direct Contact.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                  Have a corporate fleet inquiry, airport transfer query, or active trip request?
                  Our 24-hour dispatch control team is standing by.
                </p>
              </div>

              {/* Live Status HUD Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                      Central Dispatch Live
                    </span>
                  </div>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 text-[10px] font-bold">
                    Telemetry Online
                  </Badge>
                </div>

                <div className="space-y-6">
                  {/* Emergency Dispatch */}
                  <a
                    href="tel:+919876543210"
                    className="group flex gap-4 items-start p-3 -mx-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-200">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">
                        Emergency & Instant Dispatch
                      </p>
                      <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        +91 98765 43210
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Average connection time: &lt; 20 seconds
                      </p>
                    </div>
                  </a>

                  {/* Corporate Mail */}
                  <a
                    href="mailto:reservations@ebintaxi.com"
                    className="group flex gap-4 items-start p-3 -mx-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">
                        Corporate Travel Inquiries
                      </p>
                      <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                        reservations@ebintaxi.com
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Official quotation within 2 hours
                      </p>
                    </div>
                  </a>

                  {/* Headquarters Hub */}
                  <div className="flex gap-4 items-start p-3 -mx-3">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">
                        Main Command Terminal
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Guindy Industrial Estate, Chennai, TN
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Open for corporate visits (Mon-Sat, 9AM - 7PM)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Encrypted Logs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    ISO 9001 Certified
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* 2. RIGHT COLUMN: ENTERPRISE MESSAGE ROUTER FORM (RHF + ZOD)               */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <Card className="border border-slate-200/80 dark:border-slate-800/80 shadow-2xl bg-white dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden relative">
                {/* Gold Top Accent Line */}
                <div className="h-1.5 w-full bg-linear-to-r from-amber-500 via-amber-400 to-emerald-500" />

                <CardContent className="p-6 sm:p-10">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                          Route Your Request
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Direct transmission to executive dispatch officers
                        </p>
                      </div>
                    </div>
                  </div>

                  {isSubmitted ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        Message Routed Successfully
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs text-center">
                        Our duty dispatcher has logged your inquiry. You will receive an acknowledgment shortly.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmitContact)}
                      noValidate
                      className="space-y-4"
                    >
                      {/* Priority Switcher */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                          Inquiry Classification
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "general", label: "General Support" },
                            { id: "corporate", label: "Corporate RFP" },
                            { id: "emergency", label: "Active Trip Priority" },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() =>
                                setValue("urgency", tab.id as ContactFormValues["urgency"], {
                                  shouldValidate: true,
                                })
                              }
                              className={cn(
                                "py-2.5 px-2 text-xs font-bold rounded-xl border text-center transition-all",
                                selectedUrgency === tab.id
                                  ? "bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm"
                                  : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                              )}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name & Phone Grid */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                          >
                            Full Name
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            placeholder="e.g. Anand Sundaram"
                            {...register("fullName")}
                            className={cn(
                              "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.fullName ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                          {errors.fullName && (
                            <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.fullName.message}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                          >
                            Phone Contact
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            {...register("phone")}
                            className={cn(
                              "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.phone ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Email & Subject Grid */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                          >
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            {...register("email")}
                            className={cn(
                              "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                          >
                            Subject / Booking ID
                          </label>
                          <input
                            id="subject"
                            type="text"
                            placeholder="e.g. Airport Transfer or Monthly Billing"
                            {...register("subject")}
                            className={cn(
                              "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                              errors.subject ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                            )}
                          />
                          {errors.subject && (
                            <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.subject.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Message Detail Box */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Message Details
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Provide itinerary details, flight arrival codes, or account specifics..."
                          {...register("message")}
                          className={cn(
                            "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none",
                            errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                          )}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Submit Dispatch */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Routing to Chauffeur Desk...
                          </>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Send Secure Dispatch Request <Send className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}

                  {/* Response Guarantee Bar */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      Guaranteed Response: <span className="text-slate-900 dark:text-white">&lt; 14 Mins</span>
                    </span>
                    <Link
                      href="/faq"
                      className="font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                    >
                      Instant FAQ Guide <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* 3. REGIONAL DISPATCH HUBS STRIP                                           */}
          {/* ========================================================================= */}
          <div className="mt-24 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <Badge className="bg-amber-500/10 text-amber-500 border-none text-[10px] font-bold uppercase tracking-wider">
                  Statewide Network
                </Badge>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Regional Command Hubs
                </h3>
              </div>
              <p className="text-xs text-slate-500">Direct station contacts across Tamil Nadu</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REGIONAL_DESKS.map((desk) => (
                <div
                  key={desk.city}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {desk.city}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {desk.activeCabs}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {desk.address}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <a href={`tel:${desk.phone}`} className="hover:text-amber-500 transition-colors">
                      {desk.phone}
                    </a>
                    <a href={`mailto:${desk.email}`} className="text-slate-500 hover:text-amber-500 transition-colors text-[11px]">
                      {desk.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}