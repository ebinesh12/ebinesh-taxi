// app/fare-estimation/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Define a Zod schema for validating the search parameters
const searchParamsSchema = z.object({
  pickup: z.string().min(1, "Pickup location is required."),
  drop: z.string().min(1, "Drop location is required."),
  serviceType: z.enum(["One-Way", "Round-Trip"]),
  // Add other params like date and time if you need them for validation
  date: z.string().optional(),
  time: z.string().optional(),
});

// Define a type for our vehicle data for better type safety
type Vehicle = {
  id: string;
  name: string;
  image_url: string | null;
  service_type: string;
  rate_per_km: number;
  base_fare: number;
  estimatedFare?: number;
};

// Mock function to simulate distance calculation
const calculateMockDistance = (pickup: string, drop: string): number => {
  // In a real app, use an API like Google Maps Distance Matrix API
  // Using pickup/drop lengths to make the random number consistent for the same inputs
  const combinedLength = pickup.length + drop.length;
  return (combinedLength % 80) + 20; // returns a consistent distance between 20 and 100 km
};

function FareEstimationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Safely get and validate search params
  const validationResult = searchParamsSchema.safeParse(
    Object.fromEntries(searchParams.entries()),
  );

  useEffect(() => {
    if (!validationResult.success) {
      setError(
        "Invalid or missing trip details. Please go back and try again.",
      );
      setLoading(false);
      return;
    }

    const { pickup, drop, serviceType } = validationResult.data;

    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: dbError } = await supabase
          .from("vehicles")
          .select("*")
          .eq("status", "ACTIVE")
          .eq("service_type", serviceType);

        if (dbError) {
          throw dbError;
        }

        const distance = calculateMockDistance(pickup, drop);
        const vehiclesWithFare = data.map((v: Vehicle) => ({
          ...v,
          estimatedFare: distance * v.rate_per_km + v.base_fare,
        }));
        console.log(distance, vehiclesWithFare);
        setVehicles(vehiclesWithFare);
      } catch (err: any) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to fetch available vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [searchParams, validationResult]); // Depend on searchParams

  const handleBooking = (vehicle: Vehicle) => {
    if (!validationResult.success) return; // Guard clause

    const tripDetails = {
      ...validationResult.data,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      estimatedFare: vehicle.estimatedFare,
    };
    sessionStorage.setItem("tripDetails", JSON.stringify(tripDetails));
    router.push("/booking-verification");
  };

  // if (loading) {
  //   return <VehicleListSkeleton />;
  // }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        <p>{error}</p>
        <Button onClick={() => router.back()} className="bg-yellow-400 mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-yellow-400">
        Available Rides
      </h2>
      <div className="space-y-4">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="w-full">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      vehicle.image_url ||
                      "https://picsum.photos/id/183/1000/600"
                    } // Use a local placeholder
                    alt={vehicle.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <CardTitle className="text-xl font-semibold">
                      {vehicle.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {vehicle.service_type}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-2xl font-bold mb-2">
                    ₹{vehicle.estimatedFare?.toFixed(2)}
                  </p>
                  <Button onClick={() => handleBooking(vehicle)} className="bg-yellow-400 hover:bg-yellow-500">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No vehicles available for the selected criteria.
          </p>
        )}
      </div>
    </div>
  );
}

// A Skeleton component to show while loading
const VehicleListSkeleton = () => (
  <div className="container mx-auto p-4 md:p-8">
    <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
      <Skeleton className="h-9 w-64" />
    </h2>
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="w-full">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-24 w-24 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-10 w-28" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// The final page component uses Suspense to handle searchParams
export default function FareEstimationPage() {
  return (
    <Suspense fallback={<VehicleListSkeleton />}>
      <FareEstimationContent />
    </Suspense>
  );
}
