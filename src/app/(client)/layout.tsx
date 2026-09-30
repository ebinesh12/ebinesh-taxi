"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PhoneCall,
  CalendarDays,
  ArrowUp,
  MapPin,
  MapPinned,
  ChevronRight,
  Loader2,
  CarFront,
  Compass,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                ZOD SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const quickDispatchSchema = z.object({
  pickup: z
    .string()
    .min(3, { message: "Pick-up point must be at least 3 characters" }),
  drop: z
    .string()
    .min(3, { message: "Drop-off destination is required" }),
  serviceType: z.enum(["One-Way", "Round-Trip", "Airport-Transfer"]),
});

type QuickDispatchValues = z.infer<typeof quickDispatchSchema>;

/* -------------------------------------------------------------------------- */
/*                           CLIENT LAYOUT COMPONENT                          */
/* -------------------------------------------------------------------------- */

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isQuickDrawerOpen, setIsQuickDrawerOpen] = useState(false);

  // Scroll listener for the Back-to-Top trigger
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pure React Hook Form Setup (no ShadCN Form component)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickDispatchValues>({
    resolver: zodResolver(quickDispatchSchema),
    defaultValues: {
      pickup: "",
      drop: "",
      serviceType: "One-Way",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedType = watch("serviceType");

  const onQuickDispatchSubmit = async (values: QuickDispatchValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const queryParams = new URLSearchParams({
      pickup: values.pickup,
      drop: values.drop,
      serviceType: values.serviceType,
    }).toString();

    setIsQuickDrawerOpen(false);
    reset();
    router.push(`/fare-estimation?${queryParams}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-amber-500/30 font-sans transition-colors duration-300">
      {/* 1. GLOBAL HEADER */}
      <Header />

      {/* 2. MAIN VIEWPORT WITH ROUTE TRANSITIONS */}
      <main className="flex-1 relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="w-full flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. GLOBAL FOOTER */}
      <Footer />

      {/* 4. FLOATING BACK TO TOP BUTTON (Desktop & Tablet) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-30 hidden sm:block"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="w-11 h-11 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 border border-slate-200/80 dark:border-slate-800/80 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MOBILE BOTTOM QUICK ACTION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-4 py-2.5 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 items-center max-w-md mx-auto">
          {/* Quick Call */}
          <a href="tel:+919876543210" className="w-full">
            <Button
              variant="outline"
              className="w-full h-11 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-amber-500 flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <span>Call</span>
            </Button>
          </a>

          {/* Quick Dispatch Drawer Trigger */}
          <Sheet open={isQuickDrawerOpen} onOpenChange={setIsQuickDrawerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-11 rounded-2xl border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-500/20"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Estimate</span>
              </Button>
            </SheetTrigger>

            {/* Quick Estimate Sheet (RHF + Zod) */}
            <SheetContent
              side="bottom"
              className="rounded-t-4xl border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 max-h-[85vh] overflow-y-auto"
            >
              <SheetHeader className="text-left pb-4 border-b border-slate-100 dark:border-slate-900">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                    <CarFront className="w-5 h-5" />
                  </div>
                  <div>
                    <SheetTitle className="text-lg font-black text-slate-900 dark:text-white">
                      Instant Fare Estimation
                    </SheetTitle>
                    <SheetDescription className="text-xs text-slate-500 dark:text-slate-400">
                      Calculates upfront rates with zero surge pricing.
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              {/* Form handled by React Hook Form */}
              <form
                onSubmit={handleSubmit(onQuickDispatchSubmit)}
                noValidate
                className="space-y-4 pt-4"
              >
                {/* Trip Type Selector */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {(["One-Way", "Round-Trip", "Airport-Transfer"] as const).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setValue("serviceType", type, {
                            shouldValidate: true,
                          })
                        }
                        className={cn(
                          "py-2 text-[11px] font-bold rounded-lg transition-all truncate",
                          selectedType === type
                            ? "bg-amber-500 text-slate-950 shadow-sm font-extrabold"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        )}
                      >
                        {type.replace("-", " ")}
                      </button>
                    )
                  )}
                </div>

                {/* Pickup Point */}
                <div>
                  <label
                    htmlFor="mobile-pickup"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                  >
                    Pick-up Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="mobile-pickup"
                      type="text"
                      placeholder="e.g. Chennai Central Railway Station"
                      {...register("pickup")}
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                        errors.pickup
                          ? "border-red-500"
                          : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                  </div>
                  {errors.pickup && (
                    <p className="text-red-500 text-[10px] mt-1 font-semibold">
                      {errors.pickup.message}
                    </p>
                  )}
                </div>

                {/* Destination Point */}
                <div>
                  <label
                    htmlFor="mobile-drop"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                  >
                    Drop-off Destination
                  </label>
                  <div className="relative">
                    <MapPinned className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="mobile-drop"
                      type="text"
                      placeholder="e.g. Mahabalipuram Beach Resort"
                      {...register("drop")}
                      className={cn(
                        "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all",
                        errors.drop
                          ? "border-red-500"
                          : "border-slate-200 dark:border-slate-800"
                      )}
                    />
                  </div>
                  {errors.drop && (
                    <p className="text-red-500 text-[10px] mt-1 font-semibold">
                      {errors.drop.message}
                    </p>
                  )}
                </div>

                {/* Submit Estimate Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Routing Fleet...
                    </>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      Calculate Guaranteed Fare <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </SheetContent>
          </Sheet>

          {/* Direct Full Booking Button */}
          <Button
            asChild
            className="w-full h-11 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md shadow-amber-500/20"
          >
            <Link href="/booking-ride">
              <CalendarDays className="w-3.5 h-3.5 mr-1" />
              <span>Book</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}