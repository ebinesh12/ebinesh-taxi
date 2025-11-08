"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { updateVehicle } from "../../actions"; // Your server action
import Image from "next/image";
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
import { toast } from "sonner"; // Using shadcn's default toaster for feedback

// Define a type for the vehicle for better code quality
type Vehicle = {
  id: string;
  name: string;
  service_type: "One-Way" | "Round-Trip";
  rate_per_km: number;
  base_fare: number;
  status: "Active" | "Inactive";
  vehicle_image?: string; // The bytea field will be a hex string
};

export default function EditVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; // Get ID from URL and assert as string

  // State to hold vehicle data, loading status, and errors
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [service_type, setServiceType] = useState<"One-Way" | "Round-Trip">(
    "One-Way",
  );

  // ***** NEW: State to hold the image preview URL *****
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No vehicle ID provided.");
      setLoading(false);
      return;
    }

    const fetchVehicle = async () => {
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("id", id)
          .single(); // .single() is great for getting one record or an error

        if (error) {
          throw new Error("Vehicle not found or failed to fetch.");
        }

        if (data) {
          setVehicle(data);
          setStatus(data.status); // Set initial status for the Select component
          setServiceType(data.service_type); // Set initial service type for the Select component

          // ***** NEW: Convert bytea hex string to a displayable image URL *****
          if (data.vehicle_image) {
            // The bytea string from PostgREST is prefixed with "\\x"
            const hex = data.vehicle_image.substring(2);
            const uint8Array = new Uint8Array(
              hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
            );
            const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Assume a default type or store it in DB
            setImagePreview(URL.createObjectURL(blob));
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]); // Re-run the effect if the ID changes

  // ***** NEW: Handle new image selection for instant preview *****
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Form submission handler to provide user feedback
  const handleUpdate = async (formData: FormData) => {
    const result = await updateVehicle(formData);

    // Assuming your server action returns an object with an error or success message
    if (result?.error) {
      toast.error("Failed to update vehicle.", {
        description: result.error,
      });
    } else {
      toast.success("Vehicle updated successfully!");
      router.push("/admin/vehicles"); // Redirect to the list page after success
    }
  };

  // Render loading state
  if (loading) {
    return <div className="p-8 text-center">Loading vehicle details...</div>;
  }

  // Render error state
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  // Render not found state
  if (!vehicle) {
    return <div className="p-8 text-center">Vehicle not found.</div>;
  }

  // Render the form once data is available
  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">
            Edit Vehicle
          </CardTitle>
          <CardDescription className="text-center">
            Update the details for{" "}
            <span className="font-bold">{vehicle.name}</span>.
          </CardDescription>
        </CardHeader>
        {/* This form now calls the client-side handler */}
        <form action={handleUpdate}>
          <CardContent className="space-y-6">
            {/* Hidden input to pass the vehicle ID to the server action */}
            <input type="hidden" name="id" value={vehicle.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Vehicle Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  defaultValue={vehicle.name}
                  placeholder="e.g., Toyota Camry"
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="service_type">Service Type</Label>
                <Select
                  name="service_type"
                  required
                  value={service_type}
                  onValueChange={(value: "One-Way" | "Round-Trip") =>
                    setServiceType(value)
                  }
                >
                  {" "}
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
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
                  defaultValue={vehicle.rate_per_km}
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
                  defaultValue={vehicle.base_fare}
                  placeholder="e.g., 5.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {/* The Shadcn Select component requires state for its value */}
                <Select
                  name="status"
                  required
                  value={status}
                  onValueChange={(value: "Active" | "Inactive") =>
                    setStatus(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle_image">Change Vehicle Image</Label>
                <Input
                  id="vehicle_image"
                  name="vehicle_image"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange} // Add onChange handler
                />
              </div>
            </div>
            {/* ***** NEW: Image Preview Section ***** */}
            {imagePreview && (
              <div className="space-y-2">
                <Label>Image Preview</Label>
                <div className="mt-2 w-full max-w-xs aspect-video relative rounded-md overflow-hidden border">
                  <Image
                    src={imagePreview}
                    alt="Vehicle Image Preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Update Vehicle</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
