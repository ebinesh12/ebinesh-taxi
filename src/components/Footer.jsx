"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  CarFront,
  Instagram,
  Twitter,
  Facebook,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      {/* 1. Top Spacer (Background for the overlap) */}
      <div className="h-32 bg-transparent"></div>

      {/* 2. Main Footer Wrapper */}
      <div className="relative bg-white dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800/50">
        <div className="container mx-auto px-6">
          {/* 3. The Floating "Call to Action" Card */}
          <div className="relative -mt-52 mb-16 rounded-[2.5rem] bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] backdrop-blur-xl overflow-hidden">
            {/* Abstract Gradient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10">
              {/* Brand & Newsletter */}
              <div className="lg:col-span-1 space-y-6">
                <Link href="/" className="flex items-center gap-2 group w-fit">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-blue-600/20">
                    <CarFront className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
                    EBIN
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                      TAXI
                    </span>
                  </span>
                </Link>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                  Experience the next generation of executive ride-hailing.
                  Professional drivers, premium EV fleet, and transparent
                  pricing.
                </p>
                <div className="flex gap-3">
                  {[Twitter, Instagram, Facebook].map((Icon, i) => (
                    <Button
                      key={i}
                      size="icon"
                      variant="outline"
                      className="rounded-full border-slate-200 dark:border-slate-800 bg-transparent hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/30 dark:hover:border-blue-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Links Grid */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-6">
                    Services
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Airport Transfer",
                      "Executive Rentals",
                      "Outstation Trips",
                      "Corporate Fleet",
                    ].map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group w-fit"
                        >
                          {link}
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-6">
                    Company
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Our Drivers",
                      "About Us",
                      "Contact Support",
                      "Partner with us",
                    ].map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1 space-y-6">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-6">
                    Get Updates
                  </h4>
                  <div className="flex flex-col gap-3">
                    <Input
                      placeholder="Email Address"
                      className="rounded-xl bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 h-12 focus-visible:ring-blue-500"
                    />
                    <Button className="rounded-xl h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 transition-all">
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
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-100 dark:bg-blue-500/10",
                border: "group-hover:border-blue-500/30",
              },
              {
                icon: Mail,
                label: "Business Inquiry",
                value: "hello@ebintaxi.com",
                color: "text-indigo-600 dark:text-indigo-400",
                bg: "bg-indigo-100 dark:bg-indigo-500/10",
                border: "group-hover:border-indigo-500/30",
              },
              {
                icon: MapPin,
                label: "Headquarters",
                value: "Chennai, Tamil Nadu",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-100 dark:bg-emerald-500/10",
                border: "group-hover:border-emerald-500/30",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group flex items-center gap-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 transition-colors ${item.border}`}
              >
                <div
                  className={`${item.color} ${item.bg} p-3.5 rounded-xl transition-transform group-hover:scale-110`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-slate-900 dark:text-white font-bold text-sm md:text-base">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-slate-200 dark:bg-slate-800" />

          {/* 5. Copyright & Social Footer */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">
              <Link
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Driver Portal
              </Link>
            </div>

            <p className="text-xs text-slate-500 font-medium text-center md:text-right">
              &copy; {currentYear}{" "}
              <Link
                href="/admin"
                className="text-slate-700 dark:text-slate-300 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Ebin Taxi.
              </Link>{" "}
              Designed for high-performance city transit.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Bottom Decor (Premium Tech Gradient Line) */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400"></div>
    </footer>
  );
};

export default Footer;
