"use client";

import React, { useState } from "react";
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
import {
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Save,
  ChevronLeft,
} from "lucide-react";

export function BookingUpdateForm({ booking }) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(booking.booking_status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(event.currentTarget);
    const result = await updateBookingStatus(formData);

    setIsUpdating(false);

    if (result?.error) {
      toast.error("Telemetry Error", { description: result.error });
    } else {
      toast.success("Manifest Updated", {
        description: "New status propagated across fleet system.",
      });
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      <input type="hidden" name="booking_id" value={booking.booking_id} />

      <div className="space-y-3">
        <Label
          htmlFor="status"
          className="text-[10px] font-black uppercase tracking-widest text-zinc-500"
        >
          Modify Manifest State
        </Label>
        <Select
          name="status"
          required
          value={currentStatus}
          onValueChange={(value) => setCurrentStatus(value)}
        >
          <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-amber-500">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-zinc-800">
            <SelectItem value="pending">
              <div className="flex items-center gap-2 font-bold text-amber-500 uppercase text-xs tracking-tighter italic">
                <Clock className="h-4 w-4" /> Dispatch Pending
              </div>
            </SelectItem>
            <SelectItem value="confirmed">
              <div className="flex items-center gap-2 font-bold text-emerald-500 uppercase text-xs tracking-tighter italic">
                <CheckCircle2 className="h-4 w-4" /> Manifest Confirmed
              </div>
            </SelectItem>
            <SelectItem value="cancelled">
              <div className="flex items-center gap-2 font-bold text-rose-500 uppercase text-xs tracking-tighter italic">
                <XCircle className="h-4 w-4" /> Mission Cancelled
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button
          disabled={isUpdating}
          className="w-full h-14 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black uppercase tracking-tighter italic rounded-2xl shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all"
          type="submit"
        >
          {isUpdating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Propagate Changes
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-full h-14 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft className="mr-2 h-3 w-3" /> Back to Logs
        </Button>
      </div>
    </form>
  );
}
