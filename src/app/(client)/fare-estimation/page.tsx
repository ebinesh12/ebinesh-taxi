// app/fare-estimation/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { searchParamsSchema } from "@/services/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
        <Button onClick={() => router.back()} className="bg-gradient-to-r from-fuchsia-500 to-indigo-700 mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
        Available Rides
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {vehicles.length > 0 ? (
    vehicles.map((vehicle) => (
      <Card key={vehicle.id} className="p-0 w-full flex flex-col">
        <CardContent className="p-4 flex flex-col items-center text-center flex-grow">
          {/* Image is now at the top */}
          <div className="relative w-full h-48 mb-4">
            <Image
              src={
                vehicle.image_url ||
                "https://picsum.photos/id/183/1000/600"
              }
              alt={vehicle.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>

          {/* Vehicle Name and Service Type */}
          <div className="flex flex-row items-center gap-x-8">
            <CardTitle className="text-xl font-semibold">
              {vehicle.name}
            </CardTitle>
            <p className="text-muted-foreground">
              {vehicle.service_type}
            </p>
          </div>

          {/* Fare and Booking Button */}
          <div className="mt-4 w-full">
            <p className="text-2xl font-bold mb-2">
              ₹{vehicle.estimatedFare?.toFixed(2)}
            </p>
            <Button
              onClick={() => handleBooking(vehicle)}
              className="w-full bg-gradient-to-r from-fuchsia-500 to-indigo-700 hover:from-fuchsia-500/75 hover:to-indigo-700/75"
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <div className="col-span-full text-center text-gray-500">
      <p>
        No vehicles available for the selected criteria.
      </p>
    </div>
  )}
</div>
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
