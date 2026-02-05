"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  CarFront,
  Settings,
  ShieldCheck,
  ChevronRight,
  Navigation,
} from "lucide-react";
import Logout from "./Logout";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navGroups = [
  {
    label: "Main Dispatch",
    items: [
      { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin/bookings", icon: ClipboardList, label: "All Bookings" },
    ],
  },
  {
    label: "Fleet Management",
    items: [
      { href: "/admin/vehicles", icon: CarFront, label: "Vehicle Fleet" },
      { href: "/admin/settings", icon: Settings, label: "System Config" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 shadow-xl">
      {/* 1. Sidebar Header / Logo */}
      <div className="flex h-20 items-center px-6 border-b border-slate-100 dark:border-zinc-800/50">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="bg-amber-400 p-2 rounded-xl shadow-lg shadow-amber-500/20 group-hover:rotate-6 transition-transform">
            <Navigation className="h-5 w-5 text-slate-950 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter uppercase italic leading-none dark:text-white">
              EBIN<span className="text-amber-500">ADMIN</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mt-0.5">
              Terminal v2.0
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation Content */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-3">
            <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
              {group.label}
            </h4>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 active:scale-95",
                      isActive
                        ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10"
                        : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          isActive
                            ? "text-slate-950"
                            : "text-slate-400 group-hover:text-amber-500",
                        )}
                      />
                      <span className="tracking-tight">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3 w-3" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* 3. Sidebar Footer / System Status */}
      <div className="mt-auto p-4 space-y-4">
        <div className="rounded-2xl bg-slate-50 dark:bg-zinc-800/50 p-4 border border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
              System Secure
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 text-amber-500" />
              <span className="text-[10px] font-medium text-slate-400 italic">
                Auth Verified
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-[8px] h-4 border-slate-200 dark:border-zinc-700"
            >
              v2.4
            </Badge>
          </div>
        </div>

        {/* Custom Logout implementation within sidebar context */}
        <div className="px-2">
          <Logout className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900" />
        </div>
      </div>
    </aside>
  );
}
