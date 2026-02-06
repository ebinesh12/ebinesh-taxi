"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { removeUser } from "@/redux/userSlice";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Icons
import {
  LayoutDashboard,
  ClipboardList,
  CarFront,
  Settings,
  ShieldCheck,
  ChevronRight,
  Navigation,
  Bell,
  User,
  Search,
  LogOut,
  Menu,
  UserCircle,
  Mail,
} from "lucide-react";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
// New Shadcn Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * 1. CONFIGURATION: Navigation Items
 */
const NAV_GROUPS = [
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

/**
 * 2. SUB-COMPONENT: Sidebar Content
 */
const SidebarContent = ({ pathname, onLogout, isLoggingOut }) => (
  <aside className="flex h-full w-full flex-col bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 shadow-xl">
    <div className="flex h-20 items-center px-6 border-b border-slate-100 dark:border-zinc-800/50">
      <Link href="/admin" className="flex items-center gap-3 group">
        <div className="bg-amber-400 p-2 rounded-xl shadow-lg shadow-amber-500/20 group-hover:rotate-6 transition-transform">
          <Navigation className="h-5 w-5 text-slate-950 fill-current" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tighter uppercase italic leading-none dark:text-white">
            EBINESH<span className="text-amber-500">ADMIN</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mt-0.5">
            Terminal v2.0
          </span>
        </div>
      </Link>
    </div>

    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
      {NAV_GROUPS.map((group) => (
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
                      : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white",
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

    <div className="mt-auto p-4 space-y-4">
      <div className="rounded-2xl bg-slate-50 dark:bg-zinc-900/50 p-4 border border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
            Dispatcher Online
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-amber-500" />
            <span className="text-[10px] font-medium text-slate-400 italic">
              Verified Terminal
            </span>
          </div>
          <Badge variant="outline" className="text-[8px] h-4 font-mono px-1">
            v2.4.0
          </Badge>
        </div>
      </div>
    </div>
  </aside>
);

/**
 * 3. MAIN COMPONENT: Admin Layout
 */
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Get user data from Redux
  const user = useSelector((state) => state.userSlice.user);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/v1/signout", { method: "POST" });
      if (res.ok) {
        dispatch(removeUser());
        toast.success("Terminal session closed.");
        router.push("/auth/login");
        router.refresh();
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      toast.error("Network error.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50">
        <SidebarContent
          pathname={pathname}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 md:pl-72 flex flex-col">
        {/* STICKY HEADER */}
        <header className="sticky top-0 z-40 h-16 border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 border-none">
                  <SidebarContent
                    pathname={pathname}
                    onLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="relative hidden lg:block w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search dispatch logs..."
                className="pl-10 h-10 bg-slate-100 dark:bg-zinc-900 border-none rounded-xl text-xs focus-visible:ring-amber-500"
              />
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <h1 className="text-sm font-black tracking-tighter uppercase italic leading-none">
                Dispatch<span className="text-amber-500">Terminal</span>
              </h1>
              <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mt-1">
                Node: TN-01
              </span>
            </div>

            <Separator
              orientation="vertical"
              className="h-8 hidden sm:block mx-2"
            />

            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-amber-400/10 hover:text-amber-500 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-amber-500 rounded-full border-2 border-white dark:border-zinc-950 animate-pulse" />
            </Button>

            {/* USER DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-xl bg-amber-400 p-0 overflow-hidden shadow-lg shadow-amber-400/20 border border-amber-500/50 hover:opacity-90"
                >
                  <User className="h-5 w-5 text-slate-950" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 mt-2 rounded-2xl border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2 p-1">
                    <p className="text-sm font-black tracking-tight uppercase italic leading-none">
                      {user?.username || "Operator"}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Mail className="mr-1 h-3 w-3" />
                      {user?.email || "dispatch@system.com"}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-zinc-800" />

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer py-3 rounded-xl focus:bg-amber-400 focus:text-slate-950"
                >
                  <Link
                    href="/admin/profile"
                    className="flex w-full items-center"
                  >
                    <UserCircle className="mr-3 h-4 w-4" />
                    <span className="font-bold text-xs uppercase tracking-widest">
                      My Profile
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer py-3 rounded-xl focus:bg-amber-400 focus:text-slate-950"
                >
                  <Link
                    href="/admin/settings"
                    className="flex w-full items-center"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    <span className="font-bold text-xs uppercase tracking-widest">
                      Settings
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-100 dark:bg-zinc-800" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="cursor-pointer py-3 rounded-xl text-rose-500 focus:bg-rose-500 focus:text-white transition-colors"
                >
                  <LogOut
                    className={cn(
                      "mr-3 h-4 w-4",
                      isLoggingOut && "animate-spin",
                    )}
                  />
                  <span className="font-black text-xs uppercase tracking-[0.2em]">
                    {isLoggingOut ? "Closing..." : "Terminate Session"}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* MAIN PAGE CONTENT */}
        <main className="relative flex-1 p-6 lg:p-10 z-10 overflow-hidden">
          <div
            className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
