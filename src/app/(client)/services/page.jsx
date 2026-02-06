"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Briefcase,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  CarFront,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const serviceClasses = [
  {
    title: "Airport Transfer",
    icon: Plane,
    desc: "Fixed-rate airport pickups and drop-offs with flight tracking and meet-and-greet.",
    price: "₹499",
    features: ["60 min free waiting", "Flight tracking", "Luggage assistance"],
  },
  {
    title: "Corporate Fleet",
    icon: Briefcase,
    desc: "Dedicated account management for business professionals and executive teams.",
    price: "Custom",
    features: [
      "Priority dispatch",
      "Monthly billing",
      "Premium executive sedans",
    ],
  },
  {
    title: "Outstation",
    icon: MapPin,
    desc: "Inter-city travel with professional pilots for long-distance comfort and safety.",
    price: "₹12/KM",
    features: ["Transparent pricing", "One-way/Round-trip", "Verified pilots"],
  },
  {
    title: "Hourly Rental",
    icon: Clock,
    desc: "Book a car and a driver for several hours. Ideal for local city errands or meetings.",
    price: "₹250/Hr",
    features: ["Unlimited stops", "Professional pilot", "City-wide coverage"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 pb-20">
      {/* 1. Header */}
      <header className="py-20 bg-zinc-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl space-y-4"
          >
            <Badge className="bg-amber-400 text-slate-950 border-none font-bold uppercase tracking-tighter">
              Service Catalog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              Dispatch{" "}
              <span className="text-amber-500 text-white">Solutions.</span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Tailored transportation classes for every urban requirement.
            </p>
          </motion.div>
        </div>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </header>

      {/* 2. Service Cards Grid */}
      <section className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          {serviceClasses.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden group">
                <div className="h-2 w-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="p-8 md:p-12 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="p-4 bg-slate-100 dark:bg-zinc-800 rounded-2xl group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                        Starting From
                      </p>
                      <p className="text-2xl font-black tracking-tighter italic text-amber-500">
                        {service.price}
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-black tracking-tighter uppercase italic mt-6">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 md:px-12 space-y-6">
                  <p className="text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-zinc-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 md:p-12 pt-0">
                  <Button className="w-full h-14 rounded-2xl bg-slate-950 dark:bg-white dark:text-slate-950 font-black uppercase tracking-widest text-xs group">
                    Book {service.title}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Call to Action */}
      <section className="container mx-auto px-6 py-24 text-center">
        <div className="bg-amber-400 dark:bg-amber-500 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <Navigation className="w-12 h-12 text-slate-950 mb-4 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-slate-950">
              Need a Custom Route?
            </h2>
            <p className="text-slate-900/80 font-medium max-w-xl text-lg">
              Our dispatchers are available 24/7 to arrange special travel
              requirements for your fleet.
            </p>
            <Button
              variant="outline"
              className="h-14 px-10 rounded-full border-slate-950/20 text-slate-950 font-bold bg-transparent hover:bg-slate-950/10"
            >
              Contact Dispatch Center
            </Button>
          </div>
          {/* Background Symbol */}
          <CarFront className="absolute -bottom-10 -right-10 w-96 h-96 opacity-10 -rotate-12 text-slate-950" />
        </div>
      </section>
    </div>
  );
}
