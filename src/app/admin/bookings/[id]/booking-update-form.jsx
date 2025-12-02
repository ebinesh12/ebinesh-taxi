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
import { Clock, CheckCircle, XCircle } from "lucide-react";

export function BookingUpdateForm({ booking }) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(booking.booking_status);

  const handleUpdate = async (formData) => {
    const result = await updateBookingStatus(formData);
    if (result?.error) {
      toast.error("Update Failed", { description: result.error });
    } else {
      toast.success("Status Updated", {
        description: "The booking status has been successfully updated.",
      });
    }
  };

  return (
    <form action={handleUpdate} className="py-4 flex items-end gap-6 w-full">
      <input type="hidden" name="booking_id" value={booking.booking_id} />
      <div className="flex-grow">
        <Label htmlFor="status" className="mb-2 block">
          Update Status
        </Label>
        <Select
          name="status"
          required
          value={currentStatus}
          onValueChange={(value) => setCurrentStatus(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select new status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">
              <Clock className="text-yellow-400 mr-1" /> Pending
            </SelectItem>
            <SelectItem value="confirmed">
              <CheckCircle className="text-green-400 mr-1" /> Confirmed
            </SelectItem>
            <SelectItem value="cancelled">
              <XCircle className="text-red-400 mr-1" /> Cancelled
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="bg-gradient-to-r from-fuchsia-500 to-indigo-700 hover:from-fuchsia-500/75 hover:to-indigo-700/75 text-white"
        type="submit"
      >
        Save Changes
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700"
      >
        Go Back
      </Button>
    </form>
  );
}
