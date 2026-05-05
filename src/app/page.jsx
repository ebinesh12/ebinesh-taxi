"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CarFront,
  Shield,
  Timer,
  MapPin,
  MapPinned,
  MoveRight,
  Star,
  UsersRound,
  Route,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cities = [
  {
    name: "Chennai",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
    desc: "The Detroit of Asia",
  },
  {
    name: "Coimbatore",
    image:
      "https://images.unsplash.com/photo-1623150531471-972166663f70?q=80&w=800",
    desc: "Manchester of South",
  },
  {
    name: "Madurai",
    image:
      "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800",
    desc: "Athens of the East",
  },
  {
    name: "Tiruchirappalli",
    image:
      "https://images.unsplash.com/photo-1626014303757-636611689477?q=80&w=800",
    desc: "The Rock Fort City",
  },
  {
    name: "Salem",
    image:
      "https://images.unsplash.com/photo-1634148418048-0f0474665476?q=80&w=800",
    desc: "City of Steel",
  },
  {
    name: "Thanjavur",
    image:
      "https://images.unsplash.com/photo-1600673311484-3235b2c9d0a4?q=80&w=800",
    desc: "City of Temples",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 selection:bg-blue-500/30 font-sans transition-colors duration-300">
      <Header />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[90vh] w-full overflow-hidden flex items-center">
          {/* Rich Gradient Image Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070"
              alt="City Night Traffic"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-blue-900/20 dark:bg-blue-950/40" />
          </div>

          <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-8"
            >
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-4 py-1.5 backdrop-blur-md rounded-full text-sm font-semibold flex w-fit gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" /> Executive Ride
                Experience
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Your Gateway to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                  Any Destination
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl leading-relaxed font-medium">
                Seamless, safe, and premium transportation services tailored for
                your ultimate comfort across Tamil Nadu.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 text-base font-bold"
                >
                  Book a Ride Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full px-8 h-14 text-base transition-all"
                >
                  View Pricing
                </Button>
              </div>
            </motion.div>

            {/* Quick Booking App-like Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block lg:col-span-5"
            >
              <div className="bg-white/10 dark:bg-slate-950/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between text-white mb-2">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <Route className="text-blue-400 w-6 h-6" />
                      Quick Dispatch
                    </h3>
                  </div>

                  <div className="space-y-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-700/50 rounded-full" />

                    <div className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl flex items-center gap-4 transition-colors hover:border-blue-500/50 cursor-pointer">
                      <MapPinned className="text-blue-400 w-5 h-5 relative z-10 bg-slate-900" />
                      <span className="text-slate-300 font-medium">
                        Enter Pickup Location
                      </span>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl flex items-center gap-4 transition-colors hover:border-emerald-500/50 cursor-pointer">
                      <MapPin className="text-emerald-400 w-5 h-5 relative z-10 bg-slate-900" />
                      <span className="text-slate-300 font-medium">
                        Where to?
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl h-14 text-base font-bold mt-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                    Check Availability
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- STATS BAR --- */}
        <section className="bg-white dark:bg-slate-950 py-16 border-b border-slate-200 dark:border-slate-800/50 relative z-20 -mt-8 rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100 dark:divide-slate-800/50">
              {[
                { label: "Expert Drivers", val: "1,294+", icon: UsersRound },
                { label: "Happy Clients", val: "35k+", icon: Star },
                { label: "City Routes", val: "150+", icon: Route },
                { label: "Safety Rating", val: "4.9/5", icon: Shield },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center space-y-3 px-4 group"
                >
                  <div className="p-3.5 bg-blue-50 dark:bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    {stat.val}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative group">
              {/* Rich glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-emerald-500/30 rounded-[2.5rem] blur-3xl group-hover:blur-2xl transition duration-500 opacity-60 dark:opacity-40" />
              <Image
                src="https://images.unsplash.com/photo-1559149206-35360f7bc19c?q=80&w=800"
                width={800}
                height={600}
                className="relative rounded-[2rem] object-cover shadow-2xl border border-white/10"
                alt="Modern Fleet"
              />
            </div>

            <div className="space-y-8">
              <div className="space-y-5">
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-black">
                  The Premium Choice
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                  We Prioritize Your <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    Journey Comfort
                  </span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                  Bridging the gap between efficiency and luxury. We ensure
                  every mile you travel with us feels like a tailored,
                  first-class experience.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    title: "24/7 Dispatch Availability",
                    desc: "Our fleet is always on the road, ready whenever you need us.",
                    icon: Timer,
                  },
                  {
                    title: "Secure & Digital Payments",
                    desc: "Hassle-free, encrypted transactions directly from your phone.",
                    icon: Shield,
                  },
                  {
                    title: "Eco-Friendly Modern Fleet",
                    desc: "Travel green with our newly updated, low-emission vehicles.",
                    icon: CarFront,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-sm group-hover:border-blue-500/50 transition-colors">
                      <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CITY GRID --- */}
        <section className="bg-slate-950 py-24 text-white relative overflow-hidden">
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />

          <div className="container relative z-10 mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                  Serving the Heart of Tamil Nadu
                </h2>
                <p className="text-slate-400 text-lg">
                  Explore our extensive network covering major industrial, IT,
                  and cultural hubs seamlessly.
                </p>
              </div>
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300 gap-2 group p-0 text-base font-bold"
              >
                View All Routes{" "}
                <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city, i) => (
                <motion.div
                  key={city.name}
                  whileHover={{ y: -8 }}
                  className="group relative h-[340px] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Rich Indigo/Blue Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute bottom-0 p-8 w-full">
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 drop-shadow-md">
                      {city.desc}
                    </p>
                    <h3 className="text-3xl font-black text-white tracking-tight flex items-center justify-between">
                      {city.name}
                      <MoveRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CALL TO ACTION --- */}
        <section className="py-24 container mx-auto px-6">
          <Card className="border-none overflow-hidden relative rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 shadow-2xl shadow-blue-600/20">
            {/* Abstract Graphic overlay */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 translate-x-1/4 mix-blend-overlay pointer-events-none">
              <CarFront className="w-[500px] h-[500px] text-white" />
            </div>

            <CardContent className="p-12 md:p-24 flex flex-col items-center text-center relative z-10">
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-none px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                Join 35,000+ Passengers
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to Upgrade <br /> Your Commute?
              </h2>
              <p className="text-blue-100 font-medium mb-12 max-w-2xl text-lg md:text-xl leading-relaxed">
                Experience seamless booking, professional drivers, and top-tier
                vehicles. Your reliable ride is just a tap away.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-slate-50 rounded-full px-10 h-16 text-lg font-bold shadow-xl transition-transform hover:scale-105"
                >
                  Book Your First Ride
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full px-10 h-16 text-lg font-bold backdrop-blur-sm"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
