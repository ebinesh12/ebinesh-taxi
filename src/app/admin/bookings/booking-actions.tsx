"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface BookingActionsProps {
  bookingId: number;
}

export function BookingActions({ bookingId }: BookingActionsProps) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={`/admin/bookings/${bookingId}`}>
        <Eye className="h-4 w-4" />
        <span className="sr-only">View Details</span>
      </Link>
    </Button>
  );
}
