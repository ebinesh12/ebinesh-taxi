// app/fare-estimation/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

// Mock function to simulate distance calculation
const calculateMockDistance = (pickup, drop) => {
  // In a real app, use an API like Google Maps Distance Matrix API
  return Math.floor(Math.random() * 100) + 20; // returns a random distance between 20 and 120 km
};

export default function FareEstimation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const pickup = searchParams.get("pickup");
  const drop = searchParams.get("drop");
  const serviceType = searchParams.get("serviceType");

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "ACTIVE")
        .eq("service_type", serviceType);

      if (error) {
        console.error("Error fetching vehicles:", error);
      } else {
        const distance = calculateMockDistance(pickup, drop);
        const vehiclesWithFare = data.map((v) => ({
          ...v,
          estimatedFare: distance * v.rate_per_km + v.base_fare,
        }));
        setVehicles(vehiclesWithFare);
      }
      setLoading(false);
    };

    if (serviceType) {
      fetchVehicles();
    }
  }, [serviceType, pickup, drop]);

  const handleBooking = (vehicle) => {
    const tripDetails = {
      ...Object.fromEntries(searchParams.entries()),
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      estimatedFare: vehicle.estimatedFare,
    };
    sessionStorage.setItem("tripDetails", JSON.stringify(tripDetails));
    router.push("/booking-verification");
  };

  if (loading) return <p className="text-center mt-8">Loading vehicles...</p>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Available Rides</h2>
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center">
              <img
                src={vehicle.image_url || "https://via.placeholder.com/100"}
                alt={vehicle.name}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                <p className="text-gray-600">{vehicle.service_type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                ₹{vehicle.estimatedFare.toFixed(2)}
              </p>
              <button
                onClick={() => handleBooking(vehicle)}
                className="mt-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
