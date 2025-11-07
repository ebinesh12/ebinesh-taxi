"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { type BookingDetail } from "./page"; // Import the type from the page

interface BookingUpdateFormProps {
  booking: BookingDetail;
}

export function BookingUpdateForm({ booking }: BookingUpdateFormProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(booking.booking_status);

  const handleUpdate = async (formData: FormData) => {
    const result = await updateBookingStatus(formData);
    if (result?.error) {
      toast.error("Update Failed", { description: result.error });
    } else {
      toast.success("Status Updated", { description: "The booking status has been successfully updated." });
    }
  };

  return (
    <form action={handleUpdate} className="flex items-end gap-4 w-full">
      <input type="hidden" name="booking_id" value={booking.booking_id} />
      <div className="flex-grow">
        <Label htmlFor="status" className="mb-2 block">
          Update Status
        </Label>
        <Select
          name="status"
          required
          value={currentStatus}
          onValueChange={(value) => setCurrentStatus(value as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select new status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Save Changes</Button>
      <Button type="button" variant="outline" onClick={() => router.back()}>
        Go Back
      </Button>
    </form>
  );
}