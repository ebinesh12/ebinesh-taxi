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
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-300 overflow-hidden relative">
      {/* 1. Background Grid & Ambient Glows */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <main className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* LEFT COLUMN: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 px-4 py-1.5 backdrop-blur-md rounded-full text-sm font-semibold flex w-fit gap-2">
                <Headset className="w-4 h-4 text-emerald-500" /> Support
                Terminal
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                Get in <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                  Touch.
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-medium">
                Need a premium fleet for a corporate event or have a question
                about your executive ride? Our dispatchers are standing by 24/7.
              </p>
            </div>

            {/* Live Status HUD */}
            <div className="p-8 rounded-[2rem] bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none">
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Dispatch Center Live
                </span>
              </div>

              <div className="space-y-8">
                <ContactItem
                  icon={Phone}
                  label="Emergency Dispatch"
                  value="+91 98765 43210"
                  sub="Average wait time: < 30s"
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

            <div className="flex items-center gap-8 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-[11px] font-black uppercase tracking-widest">
                  Secure Line
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span className="text-[11px] font-black uppercase tracking-widest">
                  Premium Support
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
            <Card className="border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-900/5 dark:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden relative">
              {/* Premium Gradient Top Border */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400" />

              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-500/10 p-2.5 rounded-xl">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Route Your Message
                  </h3>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Full Name
                      </Label>
                      <Input
                        placeholder="John Doe"
                        className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-base transition-all text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-base transition-all text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Subject
                    </Label>
                    <Input
                      placeholder="How can we assist you?"
                      className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-base transition-all text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Message Detail
                    </Label>
                    <Textarea
                      placeholder="Type your message here..."
                      className="min-h-[160px] rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-base resize-none transition-all text-slate-900 dark:text-white p-4"
                    />
                  </div>

                  <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] group">
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap justify-between gap-4">
                  <p className="text-[11px] text-slate-500 uppercase tracking-widest font-black">
                    Average Response Time:{" "}
                    <span className="text-emerald-500">14 Mins</span>
                  </p>
                  <button className="text-[11px] text-slate-500 uppercase tracking-widest font-black hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group transition-colors">
                    FAQ Center{" "}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Decorative Navigation Symbol */}
      <div className="absolute -bottom-20 -left-20 opacity-5 dark:opacity-10 pointer-events-none">
        <Navigation className="w-96 h-96 -rotate-12 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, sub }) {
  return (
    <div className="flex gap-5 group items-start">
      <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1.5">
          {label}
        </p>
        <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
          {value}
        </p>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          {sub}
        </p>
      </div>
    </div>
  );
}
