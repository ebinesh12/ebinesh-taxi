"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plane,
  Briefcase,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  HeadphonesIcon,
  Crown,
  UsersRound,
  CheckCircle2,
  PhoneCall,
  Loader2,
  CarFront,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const serviceBookingSchema = z.object({
  serviceTier: z.string().min(1, { message: "Service tier is required" }),
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid corporate or personal email" }),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Valid 10-digit phone number required" }),
  pickupLocation: z
    .string()
    .min(3, { message: "Pickup location or city is required" }),
  startDate: z.string().min(1, { message: "Please choose start date" }),
  requirements: z.string().optional(),
});

type ServiceBookingValues = z.infer<typeof serviceBookingSchema>;

/* -------------------------------------------------------------------------- */
/*                               STATIC DATA                                  */
/* -------------------------------------------------------------------------- */

const SERVICE_CLASSES = [
  {
    id: "airport",
    title: "Airport Elite Concierge",
    icon: Plane,
    desc: "Fixed-rate airport transfers with automated flight radar monitoring, terminal meet-and-greet, and luggage handling.",
    price: "₹499",
    priceUnit: "Base Transfer Rate",
    tag: "Flight-Tracked",
    features: [
      "60 mins complimentary delay buffer",
      "Terminal nameplate welcome",
      "Assistance with heavy luggage",
      "Executive sedans & prime SUVs",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Executive Suite",
    icon: Briefcase,
    desc: "Seamless, dedicated mobility solutions for corporate executives, client delegations, and recurring business transit.",
    price: "Custom",
    priceUnit: "Monthly Retainer / Metre",
    tag: "Enterprise Tier",
    features: [
      "Itemized GST monthly invoices",
      "Dedicated account manager",
      "Priority chauffeur allocation",
      "Strict driver NDA compliance",
    ],
  },
  {
    id: "intercity",
    title: "Intercity Outstation Prime",
    icon: MapPin,
    desc: "One-way drops and round-trip highway journeys across 38 districts of Tamil Nadu in supreme highway cruiser comfort.",
    price: "₹14",
    priceUnit: "Per Kilometre",
    tag: "Statewide Network",
    features: [
      "Zero dead-heading hidden fees",
      "All toll & tax inclusive estimates",
      "Verified highway-trained captains",
      "Onboard refreshments & Wi-Fi",
    ],
  },
  {
    id: "hourly",
    title: "Urban Hourly Flex",
    icon: Clock,
    desc: "Your personal car and professional chauffeur on standby. Book for 4, 8, or 12 hours with unlimited city stops.",
    price: "₹299",
    priceUnit: "Per Hour (Min 4 Hrs)",
    tag: "On-Demand Chauffeur",
    features: [
      "Multiple stop flexibility",
      "Wait-and-return flexibility",
      "Immaculately detailed cabins",
      "Ideal for back-to-back meetings",
    ],
  },
  {
    id: "events",
    title: "VIP Convoys & Delegation",
    icon: Crown,
    desc: "Synchronized multi-car convoys for VIP summits, corporate seminars, diplomats, and international delegations.",
    price: "Custom",
    priceUnit: "Event Package",
    tag: "White-Glove Service",
    features: [
      "Coordinated motorcade timings",
      "Uniformed senior chauffeurs",
      "On-site dispatch coordinator",
      "Real-time central telemetry",
    ],
  },
  {
    id: "wedding",
    title: "Luxury Wedding Caravans",
    icon: UsersRound,
    desc: "Turn your special occasions into majestic memories with decorated luxury sedans and family guest transit fleets.",
    price: "₹4,999",
    priceUnit: "Starting Day Package",
    tag: "Celebration Escort",
    features: [
      "Fresh floral car styling options",
      "Large Innova & Tempo caravans",
      "Punctual guest pickups & dropoffs",
      "Pre-inspected pristine vehicles",
    ],
  },
] as const;

const TRUST_METRICS = [
  { icon: ShieldCheck, label: "Fully Insured Trips", desc: "Comprehensive coverage per passenger" },
  { icon: Zap, label: "Instant Telemetry", desc: "Sub-second GPS vehicle dispatch" },
  { icon: Sparkles, label: "Sanitized Cabins", desc: "Detailed before every trip" },
  { icon: HeadphonesIcon, label: "24/7 Human Dispatch", desc: "Direct concierge line with zero bots" },
] as const;

/* -------------------------------------------------------------------------- */
/*                           SERVICES PAGE COMPONENT                          */
/* -------------------------------------------------------------------------- */

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("Airport Elite Concierge");
  const [isSuccess, setIsSuccess] = useState(false);

  // Pure React Hook Form Initialization
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceBookingValues>({
    resolver: zodResolver(serviceBookingSchema),
    defaultValues: {
      serviceTier: "Airport Elite Concierge",
      fullName: "",
      email: "",
      phone: "",
      pickupLocation: "",
      startDate: new Date().toISOString().split("T")[0],
      requirements: "",
    },
  });

  const handleOpenDispatch = (tierTitle: string) => {
    setSelectedTier(tierTitle);
    setValue("serviceTier", tierTitle);
    setIsModalOpen(true);
  };

  const onServiceFormSubmit = async (data: ServiceBookingValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Service Dispatch Request Logged:", data);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      reset();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">

      <main className="relative pb-24">
        {/* ========================================================================= */}
        {/* 1. HERO BANNER                                                            */}
        {/* ========================================================================= */}
        <header className="relative pt-36 pb-28 lg:pt-48 lg:pb-36 overflow-hidden bg-slate-950 text-white">
          {/* Ambient Background Accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/80 to-slate-950 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl space-y-4"
            >
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Executive Mobility Architecture
              </Badge>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
                Precision <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-300 to-emerald-400">
                  Mobility Tiers.
                </span>
              </h1>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Engineered for corporate executives, high-volume delegations, and discerning private travelers. 
                Experience guaranteed punctuality and upfront price transparency.
              </p>
            </motion.div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. SERVICE TIERS GRID                                                     */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICE_CLASSES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group"
                >
                  <Card className="h-full rounded-3xl border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Top Row: Icon, Tag & Pricing */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-md shadow-amber-500/10">
                          <Icon className="w-7 h-7 stroke-2" />
                        </div>

                        <div className="text-right">
                          <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-none text-[10px] font-bold uppercase tracking-wider mb-1">
                            {service.tag}
                          </Badge>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {service.price}
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block -mt-1">
                            {service.priceUnit}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2 mb-6">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {service.desc}
                        </p>
                      </div>

                      {/* Feature Checklist */}
                      <ul className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-8">
                        {service.features.map((feat, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div>
                      <Button
                        onClick={() => handleOpenDispatch(service.title)}
                        className="w-full h-12 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 dark:bg-slate-800 dark:hover:bg-amber-500 dark:hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md"
                      >
                        <span>Reserve This Tier</span>
                        <ChevronRight className="ml-1.5 w-4 h-4 stroke-[2.5]" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TRUST METRICS STRIP                                                    */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TRUST_METRICS.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
                        {metric.label}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {metric.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ENTERPRISE CUSTOM LOGISTICS CTA                                        */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl">
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center lg:text-left max-w-2xl">
                <Badge className="bg-amber-500 text-slate-950 font-bold border-none px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
                  Enterprise Transport Division
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Custom Enterprise Logistics Requirements?
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Our corporate command center oversees daily employee transit routes, statewide VIP conferences, and specialized multi-vehicle convoys.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                <Button
                  onClick={() => handleOpenDispatch("Corporate Executive Suite")}
                  className="h-13 px-8 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
                >
                  Request Consultation
                </Button>
                <a href="tel:+919876543210" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full h-13 px-7 rounded-full border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    <PhoneCall className="w-4 h-4 mr-2 text-amber-400" /> Call Concierge Desk
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SERVICE DISPATCH DIALOG (RHF + ZOD)                                    */}
        {/* ========================================================================= */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-125 p-0 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl overflow-hidden">
            {isSuccess ? (
              <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <BadgeCheck className="w-10 h-10" />
                </div>
                <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white">
                  Service Request Received
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 max-w-xs text-center">
                  Your priority dispatch request has been logged. An executive concierge officer will contact you within 15 minutes.
                </DialogDescription>
              </div>
            ) : (
              <div className="flex flex-col">
                <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                      <CarFront className="w-5 h-5" />
                    </div>
                    <div>
                      <DialogTitle className="text-lg font-black text-slate-900 dark:text-white">
                        Priority Service Dispatch
                      </DialogTitle>
                      <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Requesting: <span className="font-bold text-slate-900 dark:text-white">{selectedTier}</span>
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <form
                  onSubmit={handleSubmit(onServiceFormSubmit)}
                  noValidate
                  className="p-6 space-y-4"
                >
                  {/* Selected Tier (Read-only badge field) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Tier Selected
                    </label>
                    <input
                      type="text"
                      readOnly
                      {...register("serviceTier")}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold cursor-not-allowed"
                    />
                  </div>

                  {/* Name & Phone Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="serv-name"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        id="serv-name"
                        type="text"
                        placeholder="John Doe"
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
                        htmlFor="serv-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                      >
                        Phone Contact
                      </label>
                      <input
                        id="serv-phone"
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
                  </div>

                  {/* Email & Date Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="serv-email"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="serv-email"
                        type="email"
                        placeholder="john@company.com"
                        {...register("email")}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                          errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="serv-date"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                      >
                        Schedule Date
                      </label>
                      <input
                        id="serv-date"
                        type="date"
                        {...register("startDate")}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Pickup Point */}
                  <div>
                    <label
                      htmlFor="serv-pickup"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                    >
                      Pickup Terminal or Address
                    </label>
                    <input
                      id="serv-pickup"
                      type="text"
                      placeholder="e.g. Chennai Domestic Airport / ITC Grand Chola"
                      {...register("pickupLocation")}
                      className={cn(
                        "w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500",
                        errors.pickupLocation ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                    {errors.pickupLocation && (
                      <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.pickupLocation.message}</p>
                    )}
                  </div>

                  {/* Custom Requests */}
                  <div>
                    <label
                      htmlFor="serv-reqs"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                    >
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      id="serv-reqs"
                      rows={2}
                      placeholder="Passenger count, luggage volume, or recurring schedule..."
                      {...register("requirements")}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  {/* Submit Dispatch */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Transmitting Dispatch Request...
                      </>
                    ) : (
                      "Confirm & Dispatch Chauffeur"
                    )}
                  </Button>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

    </div>
  );
}