"use client"; // Required for using hooks like useState and useRouter

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addVehicle } from "../actions"; // Your server action

// Import Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"; // For showing success/error messages

export default function AddVehiclePage() {
  const router = useRouter();

  // State to control the Select components
  const [serviceType, setServiceType] = useState("One-Way");
  const [status, setStatus] = useState("ACTIVE");

  // Client-side action to handle form submission and provide user feedback
  const handleAddVehicle = async (formData: FormData) => {
    // Check if a file is selected for better UX, though the server handles the logic
    const imageFile = formData.get("vehicle_image") as File;
    if (imageFile && imageFile.size === 0) {
      toast.info("No image selected", {
        description: "Please select an image file to upload.",
      });
      return; // Stop if the file input is there but no file is chosen
    }

    const result = await addVehicle(formData);

    // Check the result from the server action
    if (result?.error) {
      // Show an error toast if something went wrong
      toast.error("Failed to add vehicle", {
        description: result.error,
      });
    } else {
      // Show a success toast
      toast.success("Vehicle added successfully!");
      // Redirect to the vehicles list page
      router.push("/admin/vehicles");
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Add New Vehicle</CardTitle>
          <CardDescription>
            Fill out the form below to add a new vehicle to the system.
          </CardDescription>
        </CardHeader>
        {/* The form calls the client-side handler for better UX */}
        <form action={handleAddVehicle}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Vehicle Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g., Toyota Camry, Volvo Bus"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_type">Service Type</Label>
                <Select
                  name="service_type"
                  required
                  value={serviceType}
                  onValueChange={setServiceType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="One-Way">One-Way</SelectItem>
                    <SelectItem value="Round-Trip">Round-Trip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate_per_km">Rate/KM ($)</Label>
                <Input
                  id="rate_per_km"
                  name="rate_per_km"
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g., 0.50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base_fare">Base Fare ($)</Label>
                <Input
                  id="base_fare"
                  name="base_fare"
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g., 5.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  required
                  value={status}
                  onValueChange={setStatus}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select initial status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_image">Vehicle Image</Label>
                <Input
                  id="vehicle_image"
                  name="vehicle_image"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Add Vehicle</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
