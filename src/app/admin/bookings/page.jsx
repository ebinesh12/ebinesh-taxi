// app/admin/bookings/page.jsx
import { supabase } from "@/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Search,
  Filter,
  Calendar,
  User,
  Hash,
  Car,
} from "lucide-react";
import { BookingActions } from "./booking-actions";
import { cn } from "@/lib/utils";

async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      booking_id,
      booking_ref,
      customer_name,
      trip_date,
      booking_status,
      vehicles (name)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
  return data || [];
}

export default async function ManageBookingsPage() {
  const bookings = await getBookings();

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "pending":
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Badge className="bg-amber-400 text-slate-950 border-none font-bold uppercase tracking-tighter mb-2">
            Operations
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
            Dispatch <span className="text-amber-500">Logs</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Real-time monitoring of all fleet bookings and customer enquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              placeholder="Filter by Ref..."
              className="pl-10 h-11 w-64 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          </div>
          <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bookings Table Card */}
      <div className="rounded-[2rem] border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-zinc-800/50">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="py-6 pl-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3 h-3" /> Ref ID
                  </div>
                </TableHead>
                <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" /> Customer
                  </div>
                </TableHead>
                <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Car className="w-3 h-3" /> Vehicle
                  </div>
                </TableHead>
                <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Trip Date
                  </div>
                </TableHead>
                <TableHead className="py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">
                  Status
                </TableHead>
                <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Control
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow
                    key={booking.booking_id}
                    className="group border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                  >
                    <TableCell className="pl-8 py-5 font-mono text-xs font-bold text-amber-600 dark:text-amber-500">
                      {booking.booking_ref}
                    </TableCell>
                    <TableCell className="font-bold tracking-tight">
                      {booking.customer_name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="rounded-md border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-tighter"
                      >
                        {booking.vehicles?.name ?? "UNASSIGNED"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                      {new Date(booking.trip_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest",
                          getStatusStyles(booking.booking_status),
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full animate-pulse",
                            booking.booking_status === "confirmed"
                              ? "bg-emerald-500"
                              : booking.booking_status === "cancelled"
                                ? "bg-rose-500"
                                : "bg-amber-500",
                          )}
                        />
                        {booking.booking_status}
                      </div>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <BookingActions bookingId={booking.booking_id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 text-zinc-400">
                      <ClipboardList className="w-10 h-10 opacity-20" />
                      <p className="text-sm font-medium italic">
                        No active dispatch logs found.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
