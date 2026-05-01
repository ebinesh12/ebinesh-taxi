"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Car,
  Instagram,
  Twitter,
  Facebook,
  ArrowUpRight,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* 1. Top Spacer (Background for the overlap) */}
      <div className="h-32 bg-transparent"></div>

      {/* 2. Main Footer Wrapper */}
      <div className="relative bg-zinc-900 dark:bg-black pt-20 pb-10">
        <div className="container mx-auto px-6">
          {/* 3. The Floating "Call to Action" Card */}
          <div className="relative -mt-52 mb-16 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 md:p-12 shadow-2xl shadow-black/10 dark:shadow-amber-500/5 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Brand & Newsletter */}
              <div className="lg:col-span-1 space-y-6">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="bg-amber-400 p-2 rounded-lg transition-transform group-hover:rotate-12">
                    <Car className="h-6 w-6 text-slate-950" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-950 dark:text-white">
                    EBIN<span className="text-amber-500">TAXI</span>
                  </span>
                </Link>
                <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
                  Experience the next generation of ride-hailing. Professional
                  drivers, premium vehicles, and transparent pricing across the
                  city.
                </p>
                <div className="flex gap-4">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-slate-200 dark:border-zinc-700 hover:bg-amber-400 dark:hover:bg-amber-500 hover:text-slate-950 transition-all"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-slate-200 dark:border-zinc-700 hover:bg-amber-400 dark:hover:bg-amber-500 hover:text-slate-950 transition-all"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-slate-200 dark:border-zinc-700 hover:bg-amber-400 dark:hover:bg-amber-500 hover:text-slate-950 transition-all"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Links Grid */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-6">
                    Services
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Airport Transfer",
                      "Local Rentals",
                      "Outstation",
                      "Corporate Fleet",
                    ].map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-amber-500 transition-colors flex items-center group"
                        >
                          {link}{" "}
                          <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-6">
                    Company
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Our Drivers",
                      "About Us",
                      "Contact",
                      "Partner with us",
                    ].map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-amber-500 transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-6">
                    Get Updates
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Email Address"
                      className="rounded-xl bg-slate-100 dark:bg-zinc-800 border-none h-12"
                    />
                    <Button className="rounded-xl h-12 bg-slate-950 dark:bg-amber-400 dark:text-slate-950 font-bold">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Contact Info Bar (Modern Dashboard Look) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Phone,
                label: "Dispatch Center",
                value: "+91 98765 43210",
                color: "text-amber-500",
              },
              {
                icon: Mail,
                label: "Business Inquiry",
                value: "hello@ebintaxi.com",
                color: "text-blue-500",
              },
              {
                icon: MapPin,
                label: "Headquarters",
                value: "Chennai, Tamil Nadu",
                color: "text-green-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50"
              >
                <div className={`${item.color} bg-white/5 p-3 rounded-xl`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-zinc-800" />

          {/* 5. Copyright & Social Footer */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Driver Login
              </Link>
            </div>

            <p className="text-xs text-zinc-500 font-medium">
              &copy; {currentYear}{" "}
              <Link href="/admin" className="hover:text-white">
                Ebin Taxi.
              </Link>
              Designed for high-performance city transit.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Bottom Decor (Optional - Industrial Line) */}
      <div className="h-1.5 w-full bg-amber-400"></div>
    </footer>
  );
};

export default Footer;
