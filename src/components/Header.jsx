"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  CarFront,
  PhoneCall,
  MapPin,
  User,
  ChevronRight,
  ShieldCheck,
  Clock,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: MapPin },
  { name: "Our Fleet", href: "/fleet", icon: CarFront },
  { name: "Services", href: "/services", icon: Clock },
  { name: "About Us", href: "/about", icon: ShieldCheck },
  { name: "Contact", href: "/contact", icon: PhoneCall },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-slate-200 dark:border-slate-800/50 shadow-sm py-3"
          : "bg-transparent border-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-600/20">
            <CarFront className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Ebin
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                Taxi
              </span>
            </span>
            <span className="text-[9px] font-black tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase mt-1.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-emerald-500" /> Executive
              Dispatch
            </span>
          </div>
        </Link>

        {/* 2. Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-5 py-2 text-sm font-bold transition-all rounded-full relative",
                  isActive
                    ? "text-white bg-blue-600 shadow-md shadow-blue-600/20"
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/50",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. Action Buttons (Desktop) */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex flex-col items-end mr-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3 h-3 text-emerald-500" /> 24/7 Availability
            </span>
            <a
              href="tel:+919876543210"
              className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-blue-500" /> +91 98765 43210
            </a>
          </div>

          <Button
            asChild
            className="hidden sm:flex rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 h-11 shadow-lg shadow-blue-600/20 hover:scale-105 transition-all"
          >
            <Link href="/booking-ride">
              <CalendarDays className="w-4 h-4 mr-2" /> Book Ride
            </Link>
          </Button>

          {/* 4. Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-800 h-11 w-11 hover:bg-blue-50 dark:hover:bg-slate-800"
                >
                  <Menu className="h-5 w-5 dark:text-white text-slate-900" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] border-l-slate-200 dark:border-l-slate-800/50 bg-white dark:bg-[#020617] p-0 flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30">
                  <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-md">
                        <CarFront className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-xl tracking-tight uppercase text-slate-900 dark:text-white">
                          Ebin
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                            Taxi
                          </span>
                        </span>
                      </div>
                    </SheetTitle>
                    <SheetDescription className="mt-3 text-slate-500 dark:text-slate-400 font-medium">
                      Premium, safe & reliable executive transportation across
                      Tamil Nadu.
                    </SheetDescription>
                  </SheetHeader>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "group flex items-center justify-between px-4 py-4 rounded-2xl text-base font-bold transition-all active:scale-[0.98]",
                          isActive
                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20"
                            : "bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-transparent",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={cn(
                              "w-5 h-5",
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-slate-400 group-hover:text-blue-500 transition-colors",
                            )}
                          />
                          {item.name}
                        </div>
                        <ChevronRight
                          className={cn(
                            "w-5 h-5 transition-transform",
                            isActive
                              ? "opacity-100 translate-x-1"
                              : "opacity-30 group-hover:translate-x-1 group-hover:opacity-100",
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Bottom Actions */}
                <div className="p-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/60 mt-auto space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="rounded-xl h-12 flex gap-2 border-slate-200 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800 hover:text-blue-600"
                    >
                      <User className="w-4 h-4 text-blue-500" /> Account
                    </Button>
                    <a href="tel:+919876543210" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full rounded-xl h-12 flex gap-2 border-slate-200 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800 hover:text-emerald-600"
                      >
                        <PhoneCall className="w-4 h-4 text-emerald-500" />{" "}
                        Support
                      </Button>
                    </a>
                  </div>
                  <Button
                    asChild
                    className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-600/20 transition-transform active:scale-[0.98]"
                  >
                    <Link href="/booking-ride">Book Your Ride Now</Link>
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pt-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Verified & Secure Service
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
