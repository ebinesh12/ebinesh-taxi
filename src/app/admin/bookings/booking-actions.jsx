// app/admin/bookings/booking-actions.jsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, ChevronRight } from "lucide-react";

export function BookingActions({ bookingId }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="h-9 px-4 gap-2 rounded-lg hover:bg-amber-400 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 transition-all font-bold uppercase tracking-widest text-[10px] group"
    >
      <Link href={`/admin/bookings/${bookingId}`}>
        <Eye className="h-4 w-4" />
        View Details
        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
      </Link>
    </Button>
  );
}
