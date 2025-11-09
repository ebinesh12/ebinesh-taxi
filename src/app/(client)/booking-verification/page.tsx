// app/booking-verification/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react"; // For the loading spinner
import { supabase } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifySchema } from "@/services/schema";

// Define a type for our trip details for type safety
type TripDetails = {
  pickup: string;
  drop: string;
  date: string;
  time: string;
  vehicleId: string;
  vehicleName: string;
  estimatedFare: number;
};

export default function BookingVerificationPage() {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Safely get trip details from session storage on component mount
  useEffect(() => {
    try {
      const detailsString = sessionStorage.getItem("tripDetails");
      if (detailsString) {
        setTripDetails(JSON.parse(detailsString));
      } else {
        router.replace("/"); // Use replace to avoid adding to history
      }
    } catch (e) {
      console.error("Failed to parse trip details:", e);
      router.replace("/");
    }
  }, [router]);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const generateBookingId = () => `TXN${Date.now()}`;

  // This function only runs if the form validation passes
  async function onSubmit(values: z.infer<typeof verifySchema>) {
    if (!tripDetails) {
      setError("Trip details are missing. Please start over.");
      return;
    }
    setError(null);

    const bookingData = {
      pickup_location: tripDetails.pickup,
      drop_location: tripDetails.drop,
      trip_date: tripDetails.date,
      trip_time: tripDetails.time,
      vehicle_id: tripDetails.vehicleId,
      customer_name: values.name,
      customer_mobile: values.mobile,
      customer_email: values.email,
      estimated_fare: tripDetails.estimatedFare,
      booking_ref: generateBookingId(),
    };

    try {
      const { data, error: dbError } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select()
        .single(); // Use .single() to get a single object back

      if (dbError) throw dbError;

      // On success
      sessionStorage.removeItem("tripDetails");
      router.push(`/booking-success?ref=${data.booking_ref}`);
    } catch (err: any) {
      console.error("Booking failed:", err);
      setError(`Booking failed: ${err.message}. Please try again.`);
    }
  }

  // Render a loading or null state while checking session storage
  if (!tripDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700 font-bold">
            Confirm Your Booking
          </CardTitle>
          <CardDescription className="muted">
            Review your trip summary below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>From:</strong> {tripDetails.pickup}
          </p>
          <p>
            <strong>To:</strong> {tripDetails.drop}
          </p>
          <p>
            <strong>Date & Time:</strong> {tripDetails.date} at{" "}
            {tripDetails.time}
          </p>
          <p>
            <strong>Vehicle:</strong> {tripDetails.vehicleName}
          </p>
          <p className="text-md font-bold mt-2">
            <strong>Estimated Fare:</strong> ₹
            {Number(tripDetails.estimatedFare).toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
            Your Details
          </CardTitle>
          <CardDescription>
            Please provide your contact information to finalize the booking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your mobile number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-fuchsia-500 to-indigo-700 w-full"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
