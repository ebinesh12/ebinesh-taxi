"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Navigation,
  ShieldCheck,
  Headset,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden relative">
      {/* 1. Background Grid HUD */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <main className="container mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* LEFT COLUMN: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-4">
              <Badge className="bg-amber-400 text-slate-950 border-none font-bold uppercase tracking-tighter px-3 py-1">
                Support Terminal
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none dark:text-white">
                Get in <span className="text-amber-500">Touch.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-md leading-relaxed">
                Need a fleet for an event or have a question about your ride?
                Our dispatchers are standing by 24/7.
              </p>
            </div>

            {/* Live Status HUD */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                  Dispatch Center Live
                </span>
              </div>

              <div className="space-y-6">
                <ContactItem
                  icon={Phone}
                  label="Emergency Dispatch"
                  value="+91 98765 43210"
                  sub="Average wait: < 30s"
                />
                <ContactItem
                  icon={Mail}
                  label="Corporate Inquiry"
                  value="fleet@ebintaxi.com"
                  sub="Replies within 2 hours"
                />
                <ContactItem
                  icon={MapPin}
                  label="Headquarters"
                  value="123 Fleet St, Chennai, TN"
                  sub="Open for walk-ins 9am-6pm"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 text-slate-400 dark:text-zinc-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Secure Line
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Headset className="h-4 w-4 text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  24/7 Support
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <Card className="border-none shadow-2xl bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
              <div className="h-2 w-full bg-amber-400" />
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <MessageSquare className="h-6 w-6 text-amber-500" />
                  <h3 className="text-xl font-bold uppercase tracking-tight italic">
                    Route Your Message
                  </h3>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                        Full Name
                      </Label>
                      <Input
                        placeholder="John Doe"
                        className="h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800/50 border-none focus-visible:ring-amber-500 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800/50 border-none focus-visible:ring-amber-500 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                      Subject
                    </Label>
                    <Input
                      placeholder="How can we help you?"
                      className="h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800/50 border-none focus-visible:ring-amber-500 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                      Message Detail
                    </Label>
                    <Textarea
                      placeholder="Type your message here..."
                      className="min-h-[150px] rounded-2xl bg-slate-100 dark:bg-zinc-800/50 border-none focus-visible:ring-amber-500 text-base resize-none"
                    />
                  </div>

                  <Button className="w-full h-16 bg-slate-900 dark:bg-amber-400 dark:text-slate-950 font-black uppercase tracking-tighter italic text-lg rounded-2xl shadow-xl shadow-amber-500/10 group transition-all">
                    Send Message
                    <Send className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap justify-between gap-4">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Average Response Time:{" "}
                    <span className="text-amber-500">14 Mins</span>
                  </p>
                  <button className="text-[10px] text-zinc-500 uppercase tracking-widest font-black hover:text-amber-500 flex items-center gap-1 group">
                    FAQ Center{" "}
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Decorative Navigation Symbol */}
      <div className="absolute -bottom-20 -left-20 opacity-5 pointer-events-none">
        <Navigation className="w-96 h-96 -rotate-12 text-slate-900 dark:text-white" />
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, sub }) {
  return (
    <div className="flex gap-4 group">
      <div className="mt-1 h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-zinc-800 text-amber-500 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">
          {label}
        </p>
        <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
          {value}
        </p>
        <p className="text-xs text-zinc-400 italic mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
