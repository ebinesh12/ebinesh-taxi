"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addVehicle } from "../actions"; // Your server action
import { addVehicleSchema } from "@/services/schema";

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

export default function AddVehiclePage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof addVehicleSchema>>({
    resolver: zodResolver(addVehicleSchema) as Resolver<
      z.infer<typeof addVehicleSchema>
    >,
    defaultValues: {
      name: "",
      service_type: "One-Way",
      rate_per_km: undefined,
      base_fare: undefined,
      status: "ACTIVE",
      vehicle_image: undefined,
    },
  });

  // --- 3. Create the onSubmit handler ---
  const onSubmit = async (values: z.infer<typeof addVehicleSchema>) => {
    const formData = new FormData();
    // Append all values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (key === "vehicle_image" && value?.[0]) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    interface AddVehicleResult {
      error?: string; // or Error if you use Error object
      // include other properties if your function returns more info
    }

    const result = (await addVehicle(formData)) as unknown as AddVehicleResult;

    if (result?.error) {
      toast.error("Failed to add vehicle", { description: result.error });
    } else {
      toast.success("Vehicle added successfully!");
      router.push("/admin/vehicles");
    }
  };

  return (
    <div className="mt-12 p-4 sm:p-8 max-w-3xl mx-auto">
      <Card className="p-6">
        <CardHeader className="py-4">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
            Add New Vehicle
          </CardTitle>
          <CardDescription>
            Fill out the form below to add a new vehicle to the system.
          </CardDescription>
        </CardHeader>

        {/* --- 4. Use the Form component and connect the onSubmit handler --- */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Toyota Camry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="One-Way">
                            <ArrowRight
                              size={16}
                              className="mr-2 text-violet-400"
                            />
                            One-Way
                          </SelectItem>
                          <SelectItem value="Round-Trip">
                            <Repeat
                              size={16}
                              className="mr-2 text-violet-400"
                            />
                            Round-Trip
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rate_per_km"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate/KM (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="e.g., 12.50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="base_fare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Fare (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="e.g., 50.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select initial status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">
                            <CheckCircle
                              size={16}
                              className="text-green-500 mr-2"
                            />
                            Active
                          </SelectItem>
                          <SelectItem value="INACTIVE">
                            <XCircle size={16} className="text-red-500 mr-2" />
                            Inactive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Image</FormLabel>
                      <FormControl>
                        {/* Use form.register for file inputs */}
                        <Input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          {...form.register("vehicle_image")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting} // Disable on submit
                className="bg-gradient-to-r from-fuchsia-500 to-indigo-700"
              >
                {form.formState.isSubmitting ? "Adding..." : "Add Vehicle"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
