"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                               NAVIGATION DATA                              */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: MapPin },
  { name: "Our Fleet", href: "/fleet", icon: CarFront },
  { name: "Services", href: "/services", icon: Clock },
  { name: "About Us", href: "/about", icon: ShieldCheck },
  { name: "Contact", href: "/contact", icon: PhoneCall },
] as const;

/* -------------------------------------------------------------------------- */
/*                           HEADER COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Scroll listener for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-900/5 py-3"
            : "bg-linear-to-b from-black/40 via-black/10 to-transparent dark:from-slate-950/80 py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 1. BRAND LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
            aria-label="Ebin Taxi Home"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
              <CarFront className="w-6 h-6 stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
                  Ebin
                  <span className="text-amber-500 ml-0.5">Taxi</span>
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-[0.22em] text-slate-500 dark:text-slate-400 uppercase -mt-0.5 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Executive Dispatch
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-inner"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-out",
                    isActive
                      ? "text-slate-950 dark:text-white bg-white dark:bg-slate-800 shadow-sm font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. ACTIONS & QUICK BOOKING */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone support */}
            <div className="hidden xl:flex flex-col items-end text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                24/7 Concierge
              </span>
              <a
                href="tel:+919876543210"
                className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                +91 98765 43210
              </a>
            </div>

            {/* Quick Booking Dialog Trigger */}
                <Button
                  onClick={() => router.push('/booking-ride')}
                  className="hidden sm:inline-flex rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 h-11 shadow-lg shadow-amber-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <CalendarDays className="w-4 h-4 mr-2 stroke-[2.5]" />
                  Book Ride
                </Button>


            {/* 4. MOBILE SHEET NAVIGATION */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md h-10 w-10 text-slate-900 dark:text-white hover:bg-amber-500/10 hover:border-amber-500/30"
                    aria-label="Open Mobile Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-95 p-0 border-l border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col"
                >
                  {/* Sheet Header */}
                  <div className="p-6 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20">
                    <SheetHeader className="text-left">
                      <SheetTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
                          <CarFront className="h-5 w-5" />
                        </div>
                        <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white uppercase">
                          Ebin<span className="text-amber-500">Taxi</span>
                        </span>
                      </SheetTitle>
                      <SheetDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Premium executive travel & airport dispatch.
                      </SheetDescription>
                    </SheetHeader>
                  </div>

                  {/* Nav Links */}
                  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
                    {NAV_ITEMS.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all",
                            isActive
                              ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={cn(
                                "w-4 h-4",
                                isActive
                                  ? "text-slate-950"
                                  : "text-slate-400 dark:text-slate-500"
                              )}
                            />
                            {item.name}
                          </div>
                          <ChevronRight
                            className={cn(
                              "w-4 h-4",
                              isActive
                                ? "text-slate-950"
                                : "text-slate-400 opacity-60"
                            )}
                          />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Bottom Mobile Actions */}
                  <div className="p-5 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="rounded-xl h-11 text-xs font-bold border-slate-200 dark:border-slate-800"
                      >
                        <User className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Account
                      </Button>
                      <a href="tel:+919876543210" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl h-11 text-xs font-bold border-slate-200 dark:border-slate-800"
                        >
                          <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Concierge
                        </Button>
                      </a>
                    </div>

                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                         router.push('/booking-ride');
                      }}
                      className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20"
                    >
                      Instant Taxi Reservation
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Licensed & Insured Fleet
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}