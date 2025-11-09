"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/utils/supabase/client";
import { updateVehicle } from "../../actions"; // Your server action
import Image from "next/image";
import type { Resolver } from "react-hook-form";
import { editVehicleSchema } from "@/services/schema";

// Import Shadcn UI and Lucide Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { toast } from "sonner";
import { ArrowRight, Repeat, CheckCircle, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";


export default function EditVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // State for UI control (loading, errors, image preview)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // --- 2. Set up the form with react-hook-form and Zod ---
  const form = useForm<z.infer<typeof editVehicleSchema>>({
   resolver: zodResolver(editVehicleSchema) as Resolver<z.infer<typeof editVehicleSchema>>,
    defaultValues: {
        name: "",
        service_type: "One-Way",
        status: "ACTIVE",
    },
  });

  // --- 3. Fetch data and populate the form ---
  useEffect(() => {
    if (!id) {
      setError("No vehicle ID provided.");
      setLoading(false);
      return;
    }

    const fetchVehicle = async () => {
      try {
        const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).single();
        if (error) throw new Error("Vehicle not found or failed to fetch.");
        
        if (data) {
          // Reset the form with the fetched data
          form.reset(data);

          // Convert bytea hex string to a displayable image URL
          if (data.vehicle_image) {
            const hex = data.vehicle_image.substring(2);
            const uint8Array = new Uint8Array(hex.match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16)));
            const blob = new Blob([uint8Array]);
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
  }, [id, form]);

  // --- 4. Watch for image input changes and update the preview ---
  const imageFile = form.watch("vehicle_image");

 // Effect to update preview when a new file is selected by the user
  useEffect(() => {
    // Check if imageFile is a FileList and has at least one file
    if (imageFile instanceof FileList && imageFile.length > 0) {
      const file = imageFile[0]; // This is a File object
      const newPreviewUrl = URL.createObjectURL(file);
      setImagePreview(newPreviewUrl);

      // Clean up the object URL when the component unmounts or the file changes
      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  }, [imageFile]);

  // --- 5. Create the onSubmit handler ---
  const onSubmit = async (values: z.infer<typeof editVehicleSchema>) => {
    const formData = new FormData();
    formData.append("id", id); // Add the ID for the update action

    // Append all form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (key === "vehicle_image" && value?.[0]) {
        formData.append(key, value[0]); // Append the file
      } else if (key !== "vehicle_image") {
        formData.append(key, String(value));
      }
    });

    interface EditVehicleResult {
        error?: string; // or Error if you use Error object
        // include other properties if your function returns more info
      }

    const result = await updateVehicle(formData) as unknown as EditVehicleResult;

    if (result?.error) {
      toast.error("Failed to update vehicle.", { description: result.error });
    } else {
      toast.success("Vehicle updated successfully!");
      router.push("/admin/vehicles");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading vehicle details...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <Card className="p-6">
        <CardHeader className="py-4">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
            Edit Vehicle
          </CardTitle>
          <CardDescription>
            Update the details for{" "}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
              {form.getValues("name")}
            </span>.
          </CardDescription>
        </CardHeader>
        
        {/* --- 6. Use the Form component --- */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Toyota Camry" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="service_type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a service type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="One-Way"><ArrowRight size={16} className="mr-2 text-violet-400" />One-Way</SelectItem>
                        <SelectItem value="Round-Trip"><Repeat size={16} className="mr-2 text-violet-400" />Round-Trip</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="rate_per_km" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate/KM (₹)</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="e.g., 12.50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="base_fare" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Fare (₹)</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="e.g., 50.00" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE"><CheckCircle size={16} className="text-green-500 mr-2" />Active</SelectItem>
                        <SelectItem value="INACTIVE"><XCircle size={16} className="text-red-500 mr-2" />Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="vehicle_image" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Vehicle Image</FormLabel>
                    <FormControl><Input type="file" accept="image/png, image/jpeg, image/webp" {...form.register("vehicle_image")} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              {imagePreview && (
                <div className="mt-6 space-y-2">
                  <Label>Image Preview</Label>
                  <div className="w-full max-w-xs aspect-video relative rounded-md overflow-hidden border">
                    <Image src={imagePreview} alt="Vehicle Image Preview" layout="fill" objectFit="cover" />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                {form.formState.isSubmitting ? "Updating..." : "Update Vehicle"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}