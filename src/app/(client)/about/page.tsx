"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ShieldCheck,
  Car,
  MapPin,
  Clock,
  Globe,
  Sparkles,
  Award,
  CheckCircle2,
  Building2,
  Send,
  Loader2,
  UserCheck,
  Headphones
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid corporate or personal email" }),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Valid 10-digit phone number is required" }),
  inquiryType: z.enum(["corporate", "driver_partner", "fleet_charter", "general"], {
    message: "Please select an inquiry type",
  }),
  message: z
    .string()
    .min(10, { message: "Message should contain at least 10 characters" }),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

/* -------------------------------------------------------------------------- */
/*                               STATIC DATA                                  */
/* -------------------------------------------------------------------------- */

const STATS = [
  {
    label: "Safe Rides Completed",
    value: "250K+",
    desc: "Across all 38 districts",
    icon: Car,
  },
  {
    label: "Vetted Chauffeurs",
    value: "1,200+",
    desc: "Background & safety verified",
    icon: UserCheck,
  },
  {
    label: "Hubs & Terminals",
    value: "45+",
    desc: "Airports, junctions & IT corridors",
    icon: MapPin,
  },
  {
    label: "Customer Rating",
    value: "4.96/5",
    desc: "From 48,000+ guest reviews",
    icon: Award,
  },
] as const;

const PILLARS = [
  {
    title: "Executive Safety Standard",
    desc: "Every journey is safeguarded with GPS live telemetry, speed capping algorithms, SOS dispatch links, and verified background credentials.",
    icon: ShieldCheck,
    tag: "Zero-Compromise Security",
  },
  {
    title: "Intelligent Fleet Routing",
    desc: "Our proprietary traffic prediction models calculate optimal transit windows to ensure guaranteed on-time arrivals for high-stakes flights and meetings.",
    icon: Clock,
    tag: "Sub-Second Telemetry",
  },
  {
    title: "Transparent Fixed Tariffs",
    desc: "No sudden surge multipliers during peak hours or inclement weather. Upfront price protection so corporate procurement teams can plan with certainty.",
    icon: Globe,
    tag: "Predictable Billing",
  },
];

const TIMELINE = [
  {
    year: "2012",
    title: "The Inaugural Fleet",
    desc: "Founded in Chennai with 5 luxury executive sedans serving corporate delegates.",
  },
  {
    year: "2016",
    title: "Statewide Expansion",
    desc: "Scaled point-to-point dispatch across Coimbatore, Madurai, and Tiruchirappalli.",
  },
  {
    year: "2020",
    title: "Tech & Telemetry Upgrade",
    desc: "Integrated real-time flight radar tracking and digital corporate expense invoicing.",
  },
  {
    year: "Present",
    title: "The Mobility Benchmark",
    desc: "Managing over 1,200 vehicles with electric and luxury hybrid alternatives.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              ABOUT COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pure React Hook Form Initialization
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      inquiryType: "corporate",
      message: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedInquiryType = watch("inquiryType");

  const onInquirySubmit = async (data: InquiryFormValues) => {
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Partner/Corporate Inquiry Sent:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">

      <main className="overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-137.5 bg-linear-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <Badge className="bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Est. 2012 • The Standard in Urban Transit
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto"
            >
              Moving Beyond Transit. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-amber-400 to-emerald-500">
                Delivering Distinction.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              Built upon values of precision, passenger safety, and executive discretion,
              we have transformed personal and corporate travel across Tamil Nadu into a seamless, first-class experience.
            </motion.p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. STATS & CREDENTIALS STRIP                                              */}
        {/* ========================================================================= */}
        <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xl">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5 p-3"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 mb-1">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. BRAND PILLARS / CORE VALUES                                            */}
        {/* ========================================================================= */}
        <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <Badge className="bg-amber-500/10 text-amber-500 border-none text-xs font-bold uppercase tracking-wider">
                Our Operating Philosophy
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Engineered for Comfort, <br />
                <span className="text-amber-500">Refined for Reliability.</span>
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
              Every detail from driver grooming to vehicle telemetry is benchmarked
              against international executive mobility protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full rounded-3xl bg-white dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 shadow-md p-8 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <pillar.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-2 text-xs font-bold text-amber-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Audited Daily Across All Fleets
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. COMPANY TIMELINE / MILESTONES                                          */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-100/60 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <Badge className="bg-amber-500/10 text-amber-500 border-none text-xs font-bold uppercase tracking-wider">
                A Decade of Service
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                The Milestones That Defined Our Standard
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TIMELINE.map((item, idx) => (
                <div
                  key={item.year}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-3xl font-black text-amber-500">
                      {item.year}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    Phase {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CORPORATE & PARTNERSHIP INQUIRY FORM (RHF + ZOD)                       */}
        {/* ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Contact Value Props */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <Badge className="bg-amber-500/10 text-amber-500 border-none text-xs font-bold uppercase tracking-wider">
                  Partner with Us
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Corporate Contracts & Fleet Franchising
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Looking for custom employee shuttle logistics, VIP event convoys,
                  or interested in listing your executive vehicle on our dispatch platform?
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      GST-Compliant Corporate Accounts
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Consolidated monthly billing with detailed trip logs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Dedicated Account Manager
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Direct phone line for high-priority bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative">
                {isSubmitted ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      Inquiry Received
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs text-center">
                      Our corporate fleet director will review your requirements and reach out within 4 business hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onInquirySubmit)}
                    noValidate
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Connect with Enterprise Dispatch
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Fill out the details below to request corporate terms or driver partnerships.
                      </p>
                    </div>

                    {/* Inquiry Type Radio Selector */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {[
                        { id: "corporate", label: "Corporate" },
                        { id: "driver_partner", label: "Driver Partner" },
                        { id: "fleet_charter", label: "Events Fleet" },
                        { id: "general", label: "General" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() =>
                            setValue("inquiryType", tab.id as InquiryFormValues["inquiryType"], {
                              shouldValidate: true,
                            })
                          }
                          className={cn(
                            "py-2 text-xs font-bold rounded-xl border transition-all text-center",
                            selectedInquiryType === tab.id
                              ? "bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400"
                              : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Full Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Contact Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="e.g. Ramesh Krishnan"
                          {...register("fullName")}
                          className={cn(
                            "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                            errors.fullName ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                          )}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-[10px] mt-1">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                        >
                          Phone Number
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
                          <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
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
                        placeholder="corporate@company.com"
                        {...register("email")}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                          errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Message Box */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                      >
                        Requirement Details
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="Describe your fleet needs, estimated monthly trips, or route inquiries..."
                        {...register("message")}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none",
                          errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                        )}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-[10px] mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Transmitting Details...
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Submit Enterprise Request <Send className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}