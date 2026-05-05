"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Briefcase,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const serviceClasses = [
  {
    title: "Airport Elite",
    icon: Plane,
    desc: "Fixed-rate sanctuary. Flight tracking and professional meet-and-greet as standard.",
    price: "₹499",
    features: ["60 min free waiting", "Flight tracking", "Luggage assistance"],
    gradient: "from-emerald-500/20 to-teal-500/10",
    accent: "text-emerald-400",
  },
  {
    title: "Executive Suite",
    icon: Briefcase,
    desc: "Mobile offices for the modern leader. Silent cabins and premium amenities.",
    price: "Custom",
    features: [
      "Priority dispatch",
      "Monthly billing",
      "Premium executive sedans",
    ],
    gradient: "from-blue-500/20 to-indigo-500/10",
    accent: "text-blue-400",
  },
  {
    title: "Intercity Prime",
    icon: MapPin,
    desc: "Crossing borders in absolute comfort. High-speed Wi-Fi and ergonomic seating.",
    price: "₹12/KM",
    features: ["Transparent pricing", "One-way/Round-trip", "Verified pilots"],
    gradient: "from-violet-500/20 to-purple-500/10",
    accent: "text-violet-400",
  },
  {
    title: "Urban Flex",
    icon: Clock,
    desc: "Your car, your schedule. Hourly booking for the city's fast-movers.",
    price: "₹250/Hr",
    features: ["Unlimited stops", "Professional pilot", "City-wide coverage"],
    gradient: "from-rose-500/20 to-orange-500/10",
    accent: "text-rose-400",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-emerald-500/30 pb-24">
      {/* 1. Dynamic Header */}
      <header className="relative py-24 lg:py-36 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6 px-4 py-1.5 uppercase tracking-widest text-[10px] font-bold">
              Premium Tiers
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Precision{" "}
              <span className="text-emerald-500 italic">Mobility.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-light">
              We’ve engineered our fleet tiers to harmonize with your lifestyle,
              ensuring every journey is a masterclass in efficiency.
            </p>
          </motion.div>
        </div>
      </header>

      {/* 2. Service Cards Grid */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {serviceClasses.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent overflow-hidden">
                <div className="relative h-full bg-zinc-950/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between">
                  {/* Hover Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div
                        className={`p-4 rounded-2xl bg-zinc-900 border border-white/5 ${service.accent} group-hover:scale-110 transition-transform`}
                      >
                        <service.icon size={32} />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                          Base Rate
                        </span>
                        <span
                          className={`text-3xl font-bold tracking-tight ${service.accent}`}
                        >
                          {service.price}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 mb-8 leading-relaxed font-light text-lg">
                      {service.desc}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                      {service.features.map((feat, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-3 text-sm text-slate-300"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${service.accent.replace("text", "bg")}`}
                          />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <Button className="group/btn w-full h-16 rounded-2xl bg-white text-black hover:bg-emerald-500 hover:text-white transition-all duration-300 font-bold text-base uppercase tracking-wider">
                      Request Dispatch
                      <ChevronRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Trust Bar */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {[
            { icon: ShieldCheck, label: "Insured Trips" },
            { icon: Zap, label: "Instant Booking" },
            { icon: Sparkles, label: "Pristine Fleet" },
            { icon: HeadphonesIcon, label: "24/7 Support" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 text-slate-500"
            >
              <item.icon size={20} className="text-emerald-500/50" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Call to Action */}
      <section className="container mx-auto px-6">
        <div className="relative bg-emerald-600 rounded-[3rem] p-12 md:p-20 overflow-hidden group">
          {/* Decorative Pattern */}
          <div
            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                Custom Logistics <br />
                <span className="text-emerald-200">Requirements?</span>
              </h2>
              <p className="text-emerald-100/80 text-lg max-w-md">
                Our global dispatch center is ready to handle high-volume
                corporate movements and specialized events.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-white text-emerald-700 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
                Contact Concierge
              </button>
              <button className="px-10 py-5 bg-emerald-700 text-white border border-emerald-500 rounded-2xl font-bold hover:bg-emerald-800 transition-all">
                View Fleet Gallery
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
