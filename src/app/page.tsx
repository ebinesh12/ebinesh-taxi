"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  CarFront,
  Shield,
  Clock,
  MoveRight,
  Star,
  UsersRound,
  Route,
  Sparkles,
  Plane,
  CheckCircle2,
  PhoneCall,
  Gauge,
  Luggage,
  Award,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* -------------------------------------------------------------------------- */
/*                               DATA & ASSETS                                */
/* -------------------------------------------------------------------------- */

const STATS = [
  { label: "Verified Chauffeurs", val: "1,500+", icon: UsersRound, metric: "Police Background Checked" },
  { label: "Successful Dispatches", val: "180k+", icon: Route, metric: "Across 38 Districts" },
  { label: "On-Time Punctuality", val: "99.4%", icon: Clock, metric: "Flight-Tracked Arrivals" },
  { label: "Passenger Trust Score", val: "4.96/5", icon: Star, metric: "From 42,000+ Reviews" },
] as const;

const FLEET_CATEGORIES = [
  {
    id: "sedan",
    name: "Classic Sedan",
    subtitle: "Swift Urban Transit",
    model: "Toyota Etios / Dzire",
    capacity: "4 Passengers",
    luggage: "2 Large Bags",
    baseFare: "₹14/km",
    features: ["Climate Control", "Clean Interiors", "Real-time Tracking"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
  },
  {
    id: "executive",
    name: "Executive Chauffeur",
    subtitle: "VIP & Business Travel",
    model: "Toyota Camry / Skoda Superb",
    capacity: "4 Passengers",
    luggage: "3 Bags",
    baseFare: "₹24/km",
    badge: "Most Popular",
    features: ["Leather Seating", "Onboard Wi-Fi", "Bottled Water & Mints", "Priority Route"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800",
  },
  {
    id: "suv",
    name: "Luxury Prime SUV",
    subtitle: "Family & Long Distance",
    model: "Toyota Innova Crysta / Hycross",
    capacity: "7 Passengers",
    luggage: "5 Large Bags",
    baseFare: "₹20/km",
    features: ["Captain Seats", "High-Torque Smooth Drive", "Extra Luggage Space"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800",
  },
];

const CITIES = [
  {
    name: "Chennai",
    hub: "Central & Airport Terminal",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
    desc: "Metropolitan Corporate Hub",
    startingFare: "₹499",
  },
  {
    name: "Coimbatore",
    hub: "Industrial Belt & Airport",
    image: "https://images.unsplash.com/photo-1623150531471-972166663f70?q=80&w=800",
    desc: "Manchester of South India",
    startingFare: "₹399",
  },
  {
    name: "Madurai",
    hub: "Temple Corridor & Ring Road",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800",
    desc: "The Cultural Capital",
    startingFare: "₹349",
  },
  {
    name: "Tiruchirappalli",
    hub: "Central Junction & Outstation",
    image: "https://images.unsplash.com/photo-1626014303757-636611689477?q=80&w=800",
    desc: "The Rock Fort Axis",
    startingFare: "₹349",
  },
  {
    name: "Salem",
    hub: "Steel City Expressway",
    image: "https://images.unsplash.com/photo-1634148418048-0f0474665476?q=80&w=800",
    desc: "Express Transit Junction",
    startingFare: "₹299",
  },
  {
    name: "Thanjavur",
    hub: "Heritage Corridor",
    image: "https://images.unsplash.com/photo-1600673311484-3235b2c9d0a4?q=80&w=800",
    desc: "Delta Heritage Corridor",
    startingFare: "₹399",
  },
];

/* -------------------------------------------------------------------------- */
/*                               HOME COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Home() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">
      <Header />

      <main>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & LIVE FARE ESTIMATOR                                      */}
        {/* ========================================================================= */}
        <section className="relative min-h-[92vh] w-full flex items-center pt-24 pb-16 overflow-hidden">
          {/* Background visuals with night luxury tint */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070"
              alt="Night City Skyline Transit"
              fill
              priority
              className="object-cover object-center brightness-75 dark:brightness-50"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent dark:from-slate-950 dark:via-slate-950/90" />
            <div className="absolute inset-0 bg-radial-at-t from-amber-500/10 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="lg:col-span-7 space-y-6 text-left"
              >
                <Badge className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 px-4 py-1.5 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Premium Chauffeur & Dispatch Service
                </Badge>

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
                  Executive Rides. <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-300 to-emerald-400">
                    Precision Timed.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
                  Punctual airport transfers, interstate travel, and corporate mobility across Tamil Nadu. Fixed upfront pricing with zero surge surprises.
                </p>

                {/* Hero Micro-Perks */}
                <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg border-t border-slate-800/80">
                  <div className="space-y-1">
                    <p className="text-white font-bold text-base flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" /> 3 Min
                    </p>
                    <p className="text-slate-400 text-xs">Avg Dispatch Time</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-bold text-base flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-emerald-400" /> 100%
                    </p>
                    <p className="text-slate-400 text-xs">Insured Vehicles</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-bold text-base flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-sky-400" /> Free
                    </p>
                    <p className="text-slate-400 text-xs">Flight Delay Wait</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="#fleet" className="inline-block">
                    <Button
                      size="lg"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-full px-8 h-13 text-sm tracking-wider uppercase shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
                    >
                      Explore Fleet
                    </Button>
                  </a>
                  <a href="tel:+919876543210" className="inline-block">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-white rounded-full px-7 h-13 text-sm font-semibold backdrop-blur-md"
                    >
                      <PhoneCall className="w-4 h-4 mr-2 text-amber-400" /> Instant Hotline
                    </Button>
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. STATS & RELIABILITY STRIP                                              */}
        {/* ========================================================================= */}
        <section className="bg-white dark:bg-slate-950 py-12 border-y border-slate-200/80 dark:border-slate-800/80 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60"
                >
                  <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl mb-1">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {stat.val}
                  </h3>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {stat.label}
                  </p>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {stat.metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FLEET SPOTLIGHT SECTION                                                */}
        {/* ========================================================================= */}
        <section id="fleet" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Excellence on Wheels
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Our Executive Fleet
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg">
                Immaculately maintained, air-conditioned vehicles fitted with GPS telemetry and sanitized before every dispatch.
              </p>
            </div>
            <Link
              href="/fleet"
              className="inline-flex items-center text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors gap-1.5"
            >
              Explore Full Vehicle Specs <MoveRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {FLEET_CATEGORIES.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="rounded-3xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Vehicle Image with Tag */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    {vehicle.badge && (
                      <Badge className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-bold border-none text-[10px] uppercase tracking-wider">
                        {vehicle.badge}
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                      <div>
                        <p className="text-xs text-amber-400 font-bold">{vehicle.subtitle}</p>
                        <h3 className="text-lg font-black">{vehicle.name}</h3>
                      </div>
                      <span className="text-xs bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg font-bold">
                        {vehicle.baseFare}
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                      <span className="flex items-center gap-1.5">
                        <UsersRound className="w-3.5 h-3.5 text-amber-500" /> {vehicle.capacity}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Luggage className="w-3.5 h-3.5 text-amber-500" /> {vehicle.luggage}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-amber-500" /> AC Enabled
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {vehicle.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="p-6 pt-0">
                  <Button
                    asChild
                    className="w-full rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-colors duration-200"
                  >
                    <Link href="/booking-ride">Select {vehicle.name}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. WHY CHOOSE US / EXECUTIVE ADVANTAGES                                   */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-100/70 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Brand Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1559149206-35360f7bc19c?q=80&w=800"
                    width={800}
                    height={600}
                    className="w-full h-115 object-cover"
                    alt="VIP Chauffeur Service"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-white">
                    <p className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> ISO 9001:2015 Certified Dispatch
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Continuous driver grooming, defensive driving safety, and flight tracking algorithms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Value Propositions */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <Badge className="bg-amber-500/10 text-amber-500 border-none px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    The Gold Standard
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    Why Discerning Travelers Choose Ebin Taxi
                  </h2>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      title: "Flight Punctuality Guarantee",
                      desc: "We track your inbound flight in real-time. If your flight is delayed, your pickup time adjusts automatically at no charge.",
                      icon: Plane,
                    },
                    {
                      title: "Upfront Transparent Billing",
                      desc: "Zero hidden night charges or sudden surge multiples. What you see during estimation is what you pay.",
                      icon: Shield,
                    },
                    {
                      title: "Dedicated Corporate Dispatch Desk",
                      desc: "Monthly GST invoices, consolidated billing, and account manager priority for corporate travel teams.",
                      icon: CarFront,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 flex gap-4 items-start shadow-sm"
                    >
                      <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl shrink-0 mt-1">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CITIES & STRATEGIC DESTINATION HUBS                                    */}
        {/* ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="space-y-2">
              <Badge className="bg-amber-500/10 text-amber-500 border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Comprehensive Network
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Connecting Tamil Nadu’s Key Hubs
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
                Daily round trips, one-way drops, and airport commutes between major industrial corridors.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full text-xs font-bold border-slate-300 dark:border-slate-800"
            >
              View Interstate Tariffs <MoveRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.map((city) => (
              <motion.div
                key={city.name}
                whileHover={{ y: -5 }}
                className="group relative h-75 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md"
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700 text-amber-400">
                      {city.hub}
                    </span>
                    <span className="text-xs font-black text-emerald-400">
                      From {city.startingFare}
                    </span>
                  </div>

                  <div>
                    <p className="text-slate-400 text-xs font-medium">{city.desc}</p>
                    <h3 className="text-2xl font-black tracking-tight flex items-center justify-between mt-1">
                      {city.name}
                      <MoveRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-400" />
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CALL TO ACTION BANNER                                                  */}
        {/* ========================================================================= */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-white p-8 sm:p-14 shadow-2xl">
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <Badge className="bg-amber-500 text-slate-950 font-bold border-none px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
                Immediate Dispatch Ready
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Need a Chauffeur in the Next 15 Minutes?
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Connect directly with our 24/7 priority concierge. No automated bots, just instant vehicle assignment with verified chauffeurs.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-full px-8 h-12 text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Link href="/booking-ride">Book Online Now</Link>
                </Button>

                <a href="tel:+919876543210">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 rounded-full px-7 h-12 text-xs font-bold"
                  >
                    <PhoneCall className="w-4 h-4 mr-2 text-amber-400" /> Call Dispatch Desk
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}