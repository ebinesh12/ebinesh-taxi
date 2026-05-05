"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Zap,
  Car,
  MapPin,
  Clock,
  Globe,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const stats = [
  {
    label: "Rides Completed",
    value: "250K+",
    icon: Car,
    color: "text-blue-400",
  },
  {
    label: "Active Drivers",
    value: "1,200+",
    icon: Users,
    color: "text-purple-400",
  },
  {
    label: "City Coverage",
    value: "45+",
    icon: MapPin,
    color: "text-emerald-400",
  },
  {
    label: "App Rating",
    value: "4.9/5",
    icon: Smartphone,
    color: "text-rose-400",
  },
];

const features = [
  {
    title: "Elite Safety Protocol",
    desc: "Real-time trip monitoring and encrypted emergency response systems for every mile.",
    icon: ShieldCheck,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    title: "Hyper-Local Intelligence",
    desc: "Proprietary AI routing that predicts traffic patterns before they happen.",
    icon: Zap,
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    iconColor: "text-violet-400",
  },
  {
    title: "Global Standards",
    desc: "Uniform luxury experience across 45+ cities with a zero-compromise quality check.",
    icon: Globe,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30">
      {/* 1. Hero Section with Radial Glow */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-violet-600/20 via-transparent to-transparent blur-3xl opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-white/5 border-white/10 text-cyan-400 px-4 py-1 backdrop-blur-md">
                Est. 2012 • The Future of Transit
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500"
            >
              Moving Beyond <br />
              <span className="text-white">Expectations.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
            >
              We don&apos;t just move people; we move the world forward.
              Experience a premium mobility ecosystem designed for the modern
              professional.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Stats - Glassmorphism Strip */}
      <section className="relative z-20 -mt-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center space-y-2 group"
              >
                <div
                  className={`p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-white italic">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features - Rich Cards */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              The Engine of{" "}
              <span className="text-cyan-400 italic">Innovation</span>
            </h2>
            <p className="text-slate-400">
              Our core values are hard-coded into every line of our platform and
              every mile we drive.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
            Our full technology stack{" "}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <Card className="h-full bg-slate-900/40 border-white/5 backdrop-blur-sm overflow-hidden rounded-[2rem] p-8">
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 space-y-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/10 ${feature.iconColor}`}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed italic font-light">
                      &quot;{feature.desc}&quot;
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <Clock className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Bottom CTA / Visual Finisher */}
      <section className="py-24 container mx-auto px-6 mb-20">
        <div className="relative rounded-[3rem] p-12 overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600">
          <div className="absolute top-0 right-0 opacity-20 transform translate-x-1/4 -translate-y-1/4">
            <Car className="w-96 h-96 -rotate-12" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready for the next level?
            </h2>
            <p className="text-violet-100 text-lg">
              Join thousands of riders who have upgraded their daily commute to
              first-class.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all">
                Download App
              </button>
              <button className="px-8 py-4 bg-indigo-500/30 text-white border border-white/20 backdrop-blur-sm rounded-full font-bold hover:bg-indigo-500/50 transition-all">
                Corporate Fleet
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
