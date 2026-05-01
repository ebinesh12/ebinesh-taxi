"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Target, Car, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const stats = [
  { label: "Rides Completed", value: "250K+", icon: Car },
  { label: "Active Drivers", value: "1,200", icon: Users },
  { label: "City Coverage", value: "45+", icon: Map },
  { label: "Safety Rating", value: "4.9/5", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-slate-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <Badge className="bg-amber-400 text-slate-950 font-bold uppercase tracking-tighter">
              Our Legacy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic dark:text-white">
              Redefining the <br />
              <span className="text-amber-500">Urban Pulse.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed">
              Founded in 2012, we started with a simple mission: to make city
              travel safer, faster, and more reliable than ever before. Today,
              we are the backbone of urban mobility.
            </p>
          </motion.div>
        </div>
        {/* HUD Background Decoration */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 dark:opacity-20 pointer-events-none">
          <Car className="w-full h-full -rotate-12 translate-x-1/4" />
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 bg-white dark:bg-zinc-900 shadow-xl relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-2"
              >
                <stat.icon className="w-6 h-6 text-amber-500 mb-2" />
                <h3 className="text-3xl font-black tracking-tighter dark:text-white italic">
                  {stat.value}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
            The Pillars of <span className="text-amber-500">Service</span>
          </h2>
          <Separator className="w-24 bg-amber-400 h-1.5 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Safety First",
              desc: "Every driver undergoes a rigorous background check and regular defensive driving training.",
              icon: ShieldCheck,
            },
            {
              title: "Reliability",
              desc: "99% on-time arrival rate powered by our real-time dispatch telemetry system.",
              icon: Target,
            },
            {
              title: "Modern Fleet",
              desc: "Our vehicles are kept in pristine condition, average age under 3 years.",
              icon: Car,
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="border-none shadow-xl bg-white dark:bg-zinc-900 rounded-[2rem] hover:ring-2 hover:ring-amber-400 transition-all"
            >
              <CardContent className="p-10 space-y-4">
                <div className="p-3 bg-amber-400/10 rounded-2xl w-fit">
                  <item.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h4 className="text-xl font-bold uppercase italic tracking-tight">
                  {item.title}
                </h4>
                <p className="text-slate-500 dark:text-zinc-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
