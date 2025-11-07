"use server";

import { supabase } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// const supabase = createClient();

// Action to ADD a new vehicle
export async function addVehicle(formData) {
  const newVehicle = {
    name: formData.get("name"),
    service_type: formData.get("service_type"),
    rate_per_km: formData.get("rate_per_km"),
    base_fare: formData.get("base_fare"),
    status: formData.get("status"),
  };

  const { error } = await supabase.from("vehicles").insert([newVehicle]);

  if (error) {
    console.error("Error adding vehicle:", error);
    // You can handle the error more gracefully here, e.g., return an error message
    redirect("/admin/vehicles/add?error=" + error.message);
  }

  // Revalidate the vehicles list page to show the new entry
  revalidatePath("/admin/vehicles");
  // Redirect back to the main list
  redirect("/admin/vehicles");
}

// Action to UPDATE an existing vehicle
export async function updateVehicle(formData) {
  const vehicleId = formData.get("id");

  const updatedVehicle = {
    name: formData.get("name"),
    service_type: formData.get("service_type"),
    rate_per_km: formData.get("rate_per_km"),
    base_fare: formData.get("base_fare"),
    status: formData.get("status"),
  };

  const { error } = await supabase
    .from("vehicles")
    .update([updatedVehicle])
    .eq("id", vehicleId);

  if (error) {
    console.error("Error updating vehicle:", error);
    redirect(`/admin/vehicles/edit/${vehicleId}?error=` + error.message);
  }

  revalidatePath("/admin/vehicles");
  redirect("/admin/vehicles");
}

// Action to DELETE a vehicle
export async function deleteVehicle(id) {
  const vehicleId = id;

  const { error } = await supabase
    .from("vehicles")
    .delete()
    .eq("id", vehicleId);

  if (error) {
    console.error("Error deleting vehicle:", error);
    // Handle error appropriately
    return { error: error.message };
  }

  // Revalidate the path to update the UI
  revalidatePath("/admin/vehicles");
}
