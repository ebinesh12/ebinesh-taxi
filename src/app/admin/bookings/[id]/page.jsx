"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookingUpdateForm } from "./booking-update-form"; // Client component for the form
import { useParams } from "next/navigation";

export default function BookingDetailPage() {
  const params = useParams();
  const id = params?.id; // Get ID from URL and assert as string
  // State to hold vehicle data, loading status, and errors
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]); // Re-run the effect if the ID changes

  // Render loading state
  if (loading) {
    return <div className="p-8 text-center">Loading Booking details...</div>;
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
  const DetailItem = ({ label, value }) => (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <Card className="p-6">
        <CardHeader className="py-4">
          <CardTitle className="w-1/2 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
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
          <DetailItem label="Vehicle" value={booking.vehicles?.name ?? "N/A"} />
          <DetailItem label="Pickup Location" value={booking.pickup_location} />
          <DetailItem label="Drop-off Location" value={booking.drop_location} />
          <DetailItem
            label="Trip Date"
            value={new Date(booking.trip_date).toLocaleDateString()}
          />
          <DetailItem label="Trip Time" value={booking.trip_time} />
          <DetailItem
            label="Estimated Fare"
            value={`₹${booking.estimated_fare.toFixed(2)}`}
          />
          <DetailItem
            label="Submitted On"
            value={new Date(booking.created_at).toLocaleString()}
          />
        </CardContent>
        <CardFooter>
          {/* Client component to handle the status update logic */}
          <BookingUpdateForm booking={booking} />
        </CardFooter>
      </Card>
    </div>
  );
}
