"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Car,
  Phone,
  Navigation,
  User,
  ChevronRight,
  ShieldCheck,
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
  { name: "Home", href: "/" },
  { name: "Our Fleet", href: "/fleet" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300 ease-in-out px-4 md:px-8",
        isScrolled
          ? "h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b shadow-sm"
          : "h-20 bg-transparent",
      )}
    >
      <div className="container h-full mx-auto flex items-center justify-between">
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-amber-400 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Car className="h-6 w-6 text-slate-950" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
              EBIN<span className="text-amber-500">TAXI</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              Premium Dispatch
            </span>
          </div>
        </Link>

        {/* 2. Desktop Navigation (Centered) */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-900",
                pathname === item.href
                  ? "text-amber-500 font-bold"
                  : "text-slate-600 dark:text-slate-300",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 3. Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              Support 24/7
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-500" /> +91 98765 43210
            </span>
          </div>

          <Button
            asChild
            className="hidden sm:flex rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 shadow-lg shadow-amber-500/20"
          >
            <Link href="/booking-ride">Book Now</Link>
          </Button>

          {/* 4. Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] border-l-amber-400/20"
              >
                <SheetHeader className="text-left border-b pb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="bg-amber-400 p-1.5 rounded-md">
                      <Car className="h-5 w-5 text-slate-950" />
                    </div>
                    <span className="italic font-black tracking-tighter uppercase">
                      Ebin Taxi
                    </span>
                  </SheetTitle>
                  <SheetDescription>
                    Safe & Reliable transportation across Tamil Nadu.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-8">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-4 rounded-xl text-lg font-semibold transition-all active:scale-95",
                        pathname === item.href
                          ? "bg-amber-400 text-slate-950 shadow-md"
                          : "hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300",
                      )}
                    >
                      {item.name}
                      <ChevronRight
                        className={cn(
                          "w-5 h-5",
                          pathname === item.href ? "opacity-100" : "opacity-30",
                        )}
                      />
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-10 space-y-4">
                  <Separator className="dark:bg-slate-800" />
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="rounded-xl h-12 flex gap-2"
                    >
                      <User className="w-4 h-4" /> Account
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl h-12 flex gap-2"
                    >
                      <Navigation className="w-4 h-4" /> Track
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="w-full h-14 rounded-xl bg-slate-900 dark:bg-amber-400 dark:text-slate-950 font-bold text-base shadow-xl"
                  >
                    <Link href="/booking-ride">Start My Journey</Link>
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-6">
                    <ShieldCheck className="w-3 h-3 text-green-500" />
                    Verified Secure Service
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

const Separator = ({ className }) => (
  <div className={cn("h-[1px] w-full bg-slate-200", className)} />
);

export default Header;
