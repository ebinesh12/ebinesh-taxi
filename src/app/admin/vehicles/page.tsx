"use client";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
// Import Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

// Import the new client component for actions
import { VehicleActions } from "./vehicle-actions";
import { useState, useEffect } from "react";

// Define a type for our vehicle data for better TypeScript support
export type Vehicle = {
  id: string;
  name: string;
  service_type: string;
  rate_per_km: number;
  base_fare: number;
  status: "ACTIVE" | "INACTIVE";
  vehicle_image?: string; // The bytea field will be a hex string
};

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [imagePreview, setImagePreview] = useState<string>("/#");

  const imagePreview = (vehicle_image: string | undefined) => {
    if (vehicle_image) {
      // The bytea string from PostgREST is prefixed with "\\x"
      const hex = vehicle_image?.substring(2);
      const uint8Array = new Uint8Array(
        hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
      );
      const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Assume a default type or store it in DB
      return URL.createObjectURL(blob);
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase.from("vehicles").select("*"); // .single() is great for getting one record or an error

        if (error) {
          throw new Error("Vehicle not found or failed to fetch.");
        }

        if (data) {
          setVehicles(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="p-8 text-center">Loading vehicle details...</div>;
  }

  // Render error state
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full p-4 sm:p-8">
      {/* <Card> */}
      <CardHeader className="pb-8 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
            Manage Vehicles
          </CardTitle>
          <CardDescription>
            A list of all vehicles in the system.
          </CardDescription>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-fuchsia-500 to-indigo-700"
        >
          <Link href="/admin/vehicles/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vehicle
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Name
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Image
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Service Type
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Rate/KM
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Base Fare
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Status
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="px-6 font-medium">
                      {vehicle.name}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {vehicle?.vehicle_image ? (
                        <Image
                          src={imagePreview(vehicle?.vehicle_image) ?? "/"}
                          alt="Vehicle Image Preview"
                          // layout="fill"
                          width={75}
                          height={100}
                          objectFit="contain"
                        />
                      ) : (
                        "no image"
                      )}
                    </TableCell>
                    <TableCell className="px-6">
                      {vehicle.service_type}
                    </TableCell>
                    <TableCell className="px-6">
                      ₹ {vehicle.rate_per_km.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-6">
                      ₹ {vehicle.base_fare.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-6">
                      <Badge
                        className={`${
                          vehicle.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {vehicle.status === "ACTIVE" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Use the client component for actions */}
                      <VehicleActions vehicleId={vehicle.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="px-6 h-24 text-center text-muted-foreground"
                  >
                    No vehicles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* </Card> */}
    </div>
  );
}
