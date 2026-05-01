// app/admin/dashboard/page.jsx
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import {
  BookOpenCheck,
  Calendar,
  Car,
  Database,
  TrendingUp,
  Clock,
  Navigation,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getBookingStats() {
  const today = new Date().toISOString().split("T")[0];
  const [totalResult, todayResult] = await Promise.all([
    supabase
      .from("bookings")
      .select("booking_id", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("booking_id", { count: "exact", head: true })
      .eq("trip_date", today),
  ]);

  return {
    totalCount: totalResult.count ?? 0,
    todayCount: todayResult.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const { totalCount, todayCount } = await getBookingStats();

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge className="bg-amber-400 text-slate-950 border-none font-bold mb-2">
            Live Fleet Status
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Control <span className="text-amber-500">Center</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Monitoring {totalCount} total active routes and enquiries.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10"
          >
            <Clock className="w-3 h-3 mr-2" /> Logs
          </Button>
          <Button
            size="sm"
            className="bg-slate-900 dark:bg-amber-400 dark:text-slate-950 rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-6"
          >
            Broadcast Message
          </Button>
        </div>
      </header>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Today's Bookings"
          value={todayCount}
          icon={Calendar}
          trend="+12% vs yesterday"
          color="text-amber-500"
        />
        <StatCard
          title="Total Fleet Enquiries"
          value={totalCount}
          icon={Database}
          trend="All-time data"
          color="text-blue-500"
        />
        <StatCard
          title="Active Drivers"
          value="42"
          icon={Navigation}
          trend="8 currently on trip"
          color="text-green-500"
        />
        <StatCard
          title="System Health"
          value="99.9%"
          icon={TrendingUp}
          trend="Operational"
          color="text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions Card */}
        <Card className="lg:col-span-2 border-none shadow-xl bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-xl font-black uppercase tracking-tight italic">
              Mission <span className="text-amber-500">Control</span>
            </CardTitle>
            <CardDescription>Primary administrative shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ActionLink
              href="/admin/bookings"
              icon={BookOpenCheck}
              label="Manage All Bookings"
              description="View and verify rider requests"
              primary
            />
            <ActionLink
              href="/admin/vehicles"
              icon={Car}
              label="Vehicle Fleet"
              description="Add or maintain your taxis"
            />
          </CardContent>
        </Card>

        {/* System Activity Placeholder */}
        <Card className="border-none shadow-xl bg-zinc-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Navigation className="w-24 h-24" />
          </div>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              System Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-3 text-xs border-b border-white/10 pb-3 last:border-0"
              >
                <span className="text-amber-500 font-mono">14:0{i}</span>
                <p className="text-zinc-400 italic">
                  New booking request from Chennai Central...
                </p>
              </div>
            ))}
            <Button
              variant="link"
              className="text-amber-400 p-0 h-auto text-[10px] uppercase font-bold tracking-widest"
            >
              View Full Console
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable Stat Component
function StatCard({ title, value, icon: Icon, trend, color }) {
  return (
    <Card className="border-none shadow-lg bg-white dark:bg-zinc-900 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div
            className={cn("p-2 rounded-lg bg-slate-50 dark:bg-zinc-800", color)}
          >
            <Icon className="h-5 w-5" />
          </div>
          <Badge
            variant="outline"
            className="text-[10px] opacity-70 border-none px-0"
          >
            {trend}
          </Badge>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {title}
          </p>
          <h3 className="text-4xl font-black tracking-tighter mt-1 italic">
            {value}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}

// Reusable Action Link Component
function ActionLink({ href, icon: Icon, label, description, primary }) {
  return (
    <Link href={href} className="group">
      <div
        className={cn(
          "p-5 rounded-2xl border transition-all flex items-center justify-between",
          primary
            ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 border-transparent shadow-lg shadow-amber-400/10"
            : "bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 hover:border-amber-500",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "p-2 rounded-xl",
              primary
                ? "bg-white/10 dark:bg-slate-950/10"
                : "bg-slate-100 dark:bg-zinc-700",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-black uppercase tracking-tight italic text-sm">
              {label}
            </p>
            <p
              className={cn(
                "text-[10px] opacity-70",
                !primary && "text-muted-foreground",
              )}
            >
              {description}
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

export const revalidate = 60;
