// app/admin/layout.jsx
"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { Car, Bell, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* 1. Sidebar - Fixed on desktop */}
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50 border-r bg-white dark:bg-zinc-900">
        <Sidebar />
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 md:pl-72 flex flex-col">
        {/* Sticky Global Header */}
        <header className="sticky top-0 z-40 h-16 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fleet..."
                className="pl-10 h-9 bg-slate-100 dark:bg-zinc-800 border-none rounded-full text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-sm font-black tracking-tighter uppercase italic pr-4 border-r hidden lg:block">
              Dispatch<span className="text-amber-500">Terminal</span>
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-amber-500 rounded-full border-2 border-white dark:border-zinc-900" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden border border-amber-500/50">
              <User className="h-5 w-5 text-zinc-500" />
            </div>
          </div>
        </header>

        {/* 3. Page Content */}
        <main className="relative flex-1 p-6 md:p-10 z-10 overflow-hidden">
          {/* Subtle Map Grid Background */}
          <div
            className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
