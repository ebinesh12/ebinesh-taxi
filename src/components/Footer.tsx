"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  CarFront,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ArrowUpRight,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Clock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid corporate or personal email" }),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

/* -------------------------------------------------------------------------- */
/*                               FOOTER COMPONENT                             */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // React Hook Form for Newsletter
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onNewsletterSubmit = async (data: NewsletterValues) => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Subscribed to Fare Alerts:", data);
    setIsSubscribed(true);
    reset();
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Spacer for floating overlay card positioning */}
      <div className="h-36 sm:h-28 bg-transparent" />

      {/* Main Footer Body */}
      <div className="relative bg-white dark:bg-[#030712] pt-24 pb-10 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. FLOATING CTA / NEWSLETTER CARD */}
          <div className="relative -mt-52 mb-16 rounded-3xl bg-slate-900 dark:bg-slate-900/90 text-white border border-slate-800/80 p-8 sm:p-10 lg:p-12 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Brand & Mission Statement */}
              <div className="lg:col-span-4 space-y-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 group"
                  aria-label="Ebin Taxi Home"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                    <CarFront className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <span className="text-2xl font-black tracking-tight uppercase">
                    EBIN<span className="text-amber-400">TAXI</span>
                  </span>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-normal">
                  Redefining metropolitan mobility with zero wait-time dispatch, 
                  vetted executive drivers, and transparent, upfront rates.
                </p>

                {/* Social Badges */}
                <div className="flex items-center gap-2 pt-2">
                  {[
                    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2.5 rounded-full border border-slate-800 bg-slate-800/40 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Quick Links */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Services
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Airport Transfers",
                      "Executive Chauffeur",
                      "Outstation Trips",
                      "Corporate Fleets",
                      "Wedding Escorts",
                    ].map((service) => (
                      <li key={service}>
                        <Link
                          href="/services"
                          className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group w-fit"
                        >
                          <span>{service}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-4">
                    Company
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { name: "About Fleet", href: "/about" },
                      { name: "Safety Standards", href: "/safety" },
                      { name: "Tariff & Rates", href: "/pricing" },
                      { name: "Driver Partners", href: "/driver-signup" },
                      { name: "24/7 Support", href: "/contact" },
                    ].map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm text-slate-400 hover:text-white transition-colors block w-fit"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter & Fare Alerts (React Hook Form + Zod) */}
              <div className="lg:col-span-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> Exclusive Fare Alerts
                  </h4>
                  <p className="text-xs text-slate-400">
                    Subscribe for airport discounts, weekend promos, and corporate deals.
                  </p>
                </div>

                {isSubscribed ? (
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-emerald-400 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>You are subscribed to VIP priority discounts!</span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onNewsletterSubmit)}
                    noValidate
                    className="space-y-2"
                  >
                    <div className="space-y-1">
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <Input
                          type="email"
                          placeholder="name@corporate.com"
                          {...register("email")}
                          className={cn(
                            "w-full pl-10 pr-4 h-11 bg-slate-900 border text-white text-xs placeholder:text-slate-500 rounded-xl focus-visible:ring-1 focus-visible:ring-amber-500 transition-all",
                            errors.email
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-slate-800"
                          )}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-[11px] font-medium pl-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5">
                          Get Member Perks <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* 2. CONTACT & DISPATCH HUBS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
            {[
              {
                icon: Phone,
                label: "Dispatch Center (24/7)",
                value: "+91 98765 43210",
                href: "tel:+919876543210",
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                border: "hover:border-amber-500/40",
              },
              {
                icon: Mail,
                label: "Corporate Bookings",
                value: "reservations@ebintaxi.com",
                href: "mailto:reservations@ebintaxi.com",
                color: "text-indigo-500 dark:text-indigo-400",
                bg: "bg-indigo-500/10",
                border: "hover:border-indigo-500/40",
              },
              {
                icon: MapPin,
                label: "Fleet Hub HQ",
                value: "Anna Salai, Chennai, TN",
                href: "https://maps.google.com",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
                border: "hover:border-emerald-500/40",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-200",
                  item.border
                )}
              >
                <div
                  className={cn(
                    item.color,
                    item.bg,
                    "p-3 rounded-xl transition-transform duration-200 group-hover:scale-110"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight mb-1">
                    {item.label}
                  </p>
                  <p className="text-slate-900 dark:text-white font-bold text-sm truncate group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <Separator className="bg-slate-200/80 dark:bg-slate-800/80" />

          {/* 3. COPYRIGHT & LEGAL */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <nav
              aria-label="Footer Legal Navigation"
              className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400"
            >
              <Link
                href="/privacy-policy"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Terms of Carriage
              </Link>
              <Link
                href="/safety"
                className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Passenger Safety
              </Link>
              <Link
                href="/admin"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Fleet Portal
              </Link>
            </nav>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal text-center md:text-right">
              &copy; {currentYear}{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Ebin Taxi Ltd.
              </span>{" "}
              All rights reserved. Certified Urban Dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ACCENT LINE */}
      <div className="h-1.5 w-full bg-linear-to-r from-amber-500 via-amber-400 to-emerald-500" />
    </footer>
  );
}