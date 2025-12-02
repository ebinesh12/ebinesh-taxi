"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function BookingActions({ bookingId }) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={`/admin/bookings/${bookingId}`}>
        <Eye className="h-4 w-4" />
        <span className="sr-only">View Details</span>
      </Link>
    </Button>
  );
}
