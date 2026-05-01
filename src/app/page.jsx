"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Car,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  Star,
  Users,
  Navigation,
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
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-400/30">
      <Header />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[90vh] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070"
            alt="City Taxi"
            fill
            className="object-cover brightness-[0.4] dark:brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <Badge
                  variant="outline"
                  className="text-amber-400 border-amber-400/50 px-4 py-1 backdrop-blur-md"
                >
                  ✨ Premium Ride Experience
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                  Your Gateway to <br />
                  <span className="text-amber-400">Any Destination</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                  Reliable, safe, and professional transportation services
                  tailored for your comfort across Tamil Nadu.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8"
                  >
                    Book a Ride Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10 backdrop-blur-md"
                  >
                    View Pricing
                  </Button>
                </div>
              </motion.div>

              {/* Quick Booking Preview Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white mb-6">
                    <Navigation className="text-amber-400 w-6 h-6" />
                    <h3 className="text-xl font-bold">Quick Dispatch</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
                      <MapPin className="text-amber-400 w-5 h-5" />
                      <span className="text-slate-300 text-sm">
                        Pickup Location
                      </span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
                      <Navigation className="text-green-400 w-5 h-5" />
                      <span className="text-slate-300 text-sm">
                        Drop-off Destination
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 py-6 text-base font-bold">
                    Check Availability
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- STATS BAR --- */}
        <section className="bg-slate-50 dark:bg-zinc-900 border-y border-border">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Expert Drivers", val: "1,294+", icon: Users },
                { label: "Happy Clients", val: "35k+", icon: Star },
                { label: "City Routes", val: "150+", icon: Navigation },
                { label: "Safety Rating", val: "4.9/5", icon: ShieldCheck },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="p-3 bg-amber-400/10 rounded-2xl">
                    <stat.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h4 className="text-3xl font-bold tracking-tighter">
                    {stat.val}
                  </h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-400/20 rounded-[2rem] blur-2xl group-hover:bg-amber-400/30 transition duration-500" />
              <Image
                src="https://images.unsplash.com/photo-1559149206-35360f7bc19c?q=80&w=800"
                width={800}
                height={600}
                className="relative rounded-[2rem] object-cover shadow-2xl"
                alt="Modern Fleet"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-none px-4 py-1">
                  The Better Choice
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight">
                  We Prioritize Your Journey Comfort
                </h2>
                <p className="text-muted-foreground leading-relaxed italic">
                  &ldquo;Our mission is to bridge the gap between efficiency and
                  luxury, ensuring every mile you travel with us feels like a
                  premium experience.&rdquo;
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    title: "24/7 Availability",
                    desc: "Always on the road, whenever you need us.",
                    icon: Clock,
                  },
                  {
                    title: "Secure Payments",
                    desc: "Digital, hassle-free transactions.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Eco-Friendly Fleet",
                    desc: "Modern vehicles with low emissions.",
                    icon: Car,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-primary text-primary-foreground p-2 rounded-lg">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
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
        <section className="bg-zinc-950 py-24 text-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">
                  Serving the Heart of Tamil Nadu
                </h2>
                <p className="text-slate-400 max-w-xl">
                  Explore our extensive network covering major industrial and
                  cultural hubs.
                </p>
              </div>
              <Button variant="link" className="text-amber-400 gap-2 group p-0">
                View All Cities{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city, i) => (
                <motion.div
                  key={city.name}
                  whileHover={{ y: -10 }}
                  className="group relative h-80 overflow-hidden rounded-3xl"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-6 w-full">
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                      {city.desc}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {city.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CALL TO ACTION --- */}
        <section className="py-24 container mx-auto px-6 text-center">
          <Card className="bg-amber-400 dark:bg-amber-500 border-none overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
              <Car className="w-96 h-96 -rotate-12 text-slate-950" />
            </div>
            <CardContent className="p-12 md:p-20 flex flex-col items-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6 uppercase tracking-tighter">
                Ready to Start Your Journey?
              </h2>
              <p className="text-slate-900/80 font-medium mb-10 max-w-2xl text-lg">
                Join over 35,000 satisfied passengers who trust us for their
                daily commutes and special trips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-slate-950 text-white rounded-full px-10 h-14 text-base"
                >
                  Book Your First Ride
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-slate-950/20 text-slate-950 hover:bg-slate-950/10 rounded-full px-10 h-14 text-base"
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
