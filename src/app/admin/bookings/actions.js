"use server";

import { supabase } from "@/utils/supabase/client"; // Use the server client for actions
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Action to update a booking's status
export async function updateBookingStatus(formData) {
  const bookingId = formData.get("booking_id");
  const newStatus = formData.get("status");

  if (!bookingId || !newStatus) {
    return { error: "Missing booking ID or status." };
  }

  const { error } = await supabase
    .from("bookings")
    .update({ booking_status: newStatus })
    .eq("booking_id", bookingId);

  if (error) {
    console.error("Supabase error:", error);
    return { error: "Failed to update booking status." };
  }

  // Revalidate paths to show updated data
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);

  return { success: "Status updated successfully." };
}

// Action to delete a booking
export async function deleteBooking(bookingId) {
  if (!bookingId) {
    return { error: "Invalid booking ID provided." };
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("booking_id", bookingId);

  if (error) {
    console.error("Supabase error:", error);
    return { error: "Failed to delete the booking." };
  }

  // Revalidate the main bookings page and redirect
  revalidatePath("/admin/bookings");
  redirect("/admin/bookings");
}
