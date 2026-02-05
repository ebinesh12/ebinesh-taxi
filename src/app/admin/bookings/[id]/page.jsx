"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Car,
  IndianRupee,
  ShieldCheck,
  Loader2,
  FileText,
  History,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingUpdateForm } from "./booking-update-form";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Identification Failure: No ID provided.");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*, vehicles(name)")
          .eq("booking_id", id)
          .single();

        if (error) throw new Error("Manifest not found in dispatch database.");
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
          Decrypting Manifest
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500">
          <FileText className="h-8 w-8" />
        </div>
        <p className="text-lg font-bold text-rose-500 uppercase tracking-tighter italic">
          {error}
        </p>
        <button
          onClick={() => router.back()}
          className="text-xs font-black underline uppercase tracking-widest text-zinc-500"
        >
          Return to Logs
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-4 md:p-8 max-w-5xl space-y-6"
    >
      {/* Top Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dispatch
        </button>
        <Badge
          variant="outline"
          className="font-mono text-[10px] uppercase border-zinc-200 dark:border-zinc-800"
        >
          Created: {new Date(booking.created_at).toLocaleString()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Manifest Details */}
        <Card className="lg:col-span-8 border-none shadow-2xl bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden">
          <div className="h-1.5 w-full bg-amber-400" />
          <CardHeader className="p-8 pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-3xl font-black tracking-tighter uppercase italic dark:text-white">
                  Trip <span className="text-amber-500">Manifest</span>
                </CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                  Ref: {booking.booking_ref}
                </CardDescription>
              </div>
              <div className="bg-slate-100 dark:bg-zinc-800 p-3 rounded-2xl">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 pt-6 space-y-10">
            {/* 1. Route Visualization */}
            <section className="relative space-y-8 pl-8 border-l-2 border-dashed border-zinc-200 dark:border-zinc-800 ml-4">
              <div className="relative">
                <MapPin className="absolute -left-[45px] top-0 h-6 w-6 text-amber-500 bg-white dark:bg-zinc-900 p-1" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">
                  Pickup Point
                </p>
                <p className="text-lg font-bold tracking-tight">
                  {booking.pickup_location}
                </p>
              </div>
              <div className="relative">
                {/* <Navigation className="absolute -left-[45px] top-0 h-6 w-6 text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 p-1" /> */}
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">
                  Destination
                </p>
                <p className="text-lg font-bold tracking-tight">
                  {booking.drop_location}
                </p>
              </div>
            </section>

            <Separator className="opacity-50" />

            {/* 2. Customer & Vehicle Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <DetailHUD
                icon={User}
                label="Customer Name"
                value={booking.customer_name}
              />
              <DetailHUD
                icon={Car}
                label="Assigned Asset"
                value={booking.vehicles?.name ?? "UNASSIGNED"}
                color="text-amber-500"
              />
              <DetailHUD
                icon={Phone}
                label="Mobile Link"
                value={booking.customer_mobile}
              />
              <DetailHUD
                icon={Mail}
                label="Email Address"
                value={booking.customer_email || "Not Provided"}
              />
              <DetailHUD
                icon={Calendar}
                label="Trip Schedule"
                value={new Date(booking.trip_date).toDateString()}
              />
              <DetailHUD
                icon={Clock}
                label="Pickup Time"
                value={booking.trip_time}
              />
            </div>
          </CardContent>

          <CardFooter className="p-8 pt-0 flex justify-between items-center border-t bg-slate-50/50 dark:bg-zinc-800/30">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Final Estimated Fare
              </p>
              <div className="flex items-center text-3xl font-black tracking-tighter text-amber-600 dark:text-amber-400">
                <IndianRupee className="h-6 w-6 stroke-[3px]" />
                {booking.estimated_fare.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase text-zinc-400 italic">
                All Taxes Included
              </p>
              <p className="text-[10px] font-bold uppercase text-zinc-400 italic underline">
                View Fare Breakdown
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* RIGHT: Status Control */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-2xl bg-zinc-900 text-white rounded-[2rem] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2">
                <History className="h-4 w-4" /> Operational Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-8">
              <BookingUpdateForm booking={booking} />
            </CardContent>
          </Card>

          <div className="p-6 rounded-[2rem] bg-amber-400/5 border border-amber-400/10 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Dispatch Protocol
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed italic">
              Updating the status to &quot;Confirmed&quot; will notify the
              driver and trigger route telemetry. Cancellations are permanent
              and require system override to revert.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// HUD Style Detail Item
function DetailHUD({ icon: Icon, label, value, color = "text-zinc-400" }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-3 w-3", color)} />
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          {label}
        </p>
      </div>
      <p className="text-base font-bold dark:text-white leading-tight">
        {value}
      </p>
    </div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
