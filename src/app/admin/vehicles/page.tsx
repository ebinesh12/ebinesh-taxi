import Link from "next/link";
import { supabase } from "@/utils/supabase/client";

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

// Define a type for our vehicle data for better TypeScript support
export type Vehicle = {
  id: string;
  name: string;
  service_type: string;
  rate_per_km: number;
  base_fare: number;
  status: "ACTIVE" | "INACTIVE";
};

// Async function to fetch vehicles from Supabase
async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase.from("vehicles").select("*");

  if (error) {
    console.error("Error fetching vehicles:", error);
    return []; // Return an empty array on error
  }
  return data || [];
}

export default async function ManageVehicles() {
  const vehicles = await getVehicles();

  return (
    <div className="p-4 sm:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">
              Manage Vehicles
            </CardTitle>
            <CardDescription>
              A list of all vehicles in the system.
            </CardDescription>
          </div>
          <Button asChild>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Rate/KM</TableHead>
                  <TableHead>Base Fare</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">
                        {vehicle.name}
                      </TableCell>
                      <TableCell>{vehicle.service_type}</TableCell>
                      <TableCell>${vehicle.rate_per_km.toFixed(2)}</TableCell>
                      <TableCell>${vehicle.base_fare.toFixed(2)}</TableCell>
                      <TableCell>
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
                      className="h-24 text-center text-muted-foreground"
                    >
                      No vehicles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}