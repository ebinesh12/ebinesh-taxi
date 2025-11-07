"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookingUpdateForm } from "./booking-update-form"; // Client component for the form
import { useParams, useRouter } from "next/navigation";

// Define a detailed type for a single booking
export type BookingDetail = {
  booking_id: number;
  booking_ref: string;
  pickup_location: string;
  drop_location: string;
  trip_date: string;
  trip_time: string;
  customer_name: string;
  customer_mobile: string;
  customer_email: string;
  estimated_fare: number;
  booking_status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  vehicles: {
    name: string;
  } | null;
};


export default function BookingDetailPage() {
  const params = useParams();
  const id = params?.id as string; // Get ID from URL and assert as string
    // State to hold vehicle data, loading status, and errors
    const [booking, setBooking] = useState<BookingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStatus, setCurrentStatus] = useState<"pending"|"confirmed"|"cancelled">("pending");


    useEffect(() => {
      if (!id) {
        setError("No booking ID provided.");
        setLoading(false);
        return;
      }
  
      const fetchBooking = async () => {
        try {
          const { data, error } = await supabase
    .from("bookings")
    .select("*, vehicles(name)")
    .eq("booking_id", id)
    .single();
  
          if (error) {
            throw new Error("Booking not found or failed to fetch.");
          }
  
          if (data) {
            setBooking(data);
            setCurrentStatus(data.booking_status);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
       fetchBooking();
    }, [id]); // Re-run the effect if the ID changes

  // Render loading state
  if (loading) {
    return <div className="p-8 text-center">Loading vehicle details...</div>;
  }

  // Render error state
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  // Render not found state
  if (!booking) {
    return <div className="p-8 text-center">Booking not found.</div>;
  }

  // Helper component for displaying details cleanly
  const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Booking Details
          </CardTitle>
          <CardDescription className="font-mono">
            Ref: {booking.booking_ref}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem label="Customer Name" value={booking.customer_name} />
          <DetailItem label="Customer Mobile" value={booking.customer_mobile} />
          <DetailItem label="Customer Email" value={booking.customer_email} />
          <DetailItem label="Vehicle" value={booking.vehicles?.name ?? 'N/A'} />
          <DetailItem label="Pickup Location" value={booking.pickup_location} />
          <DetailItem label="Drop-off Location" value={booking.drop_location} />
          <DetailItem label="Trip Date" value={new Date(booking.trip_date).toLocaleDateString()} />
          <DetailItem label="Trip Time" value={booking.trip_time} />
          <DetailItem label="Estimated Fare" value={`$${booking.estimated_fare.toFixed(2)}`} />
          <DetailItem label="Submitted On" value={new Date(booking.created_at).toLocaleString()} />
        </CardContent>
        <CardFooter>
          {/* Client component to handle the status update logic */}
          <BookingUpdateForm booking={booking} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />
        </CardFooter>
      </Card>
    </div>
  );
}