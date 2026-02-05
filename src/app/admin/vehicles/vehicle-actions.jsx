"use client";

import React from "react";
import Link from "next/link";
import { Edit2, Trash2, AlertTriangle, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { deleteVehicle } from "./actions";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function VehicleActions({ vehicleId }) {
  const handleDeleteAction = async () => {
    const result = await deleteVehicle(vehicleId);
    if (result?.error) {
      toast.error("Telemetry error", { description: result.error });
    } else {
      toast.success("Asset decommissioned successfully.");
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="h-9 w-9 rounded-lg hover:bg-amber-100 hover:text-amber-600 dark:hover:bg-amber-400/10 dark:hover:text-amber-400 transition-colors"
      >
        <Link href={`/admin/vehicles/edit/${vehicleId}`}>
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">Edit Asset</span>
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-400/10 dark:hover:text-rose-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Asset</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl bg-white dark:bg-zinc-900">
          <AlertDialogHeader>
            <div className="mx-auto bg-rose-100 dark:bg-rose-900/30 p-3 rounded-2xl w-fit mb-4">
              <AlertTriangle className="h-6 w-6 text-rose-600" />
            </div>
            <AlertDialogTitle className="text-2xl font-black tracking-tighter uppercase italic text-center">
              Decommission <span className="text-rose-500">Asset?</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
              This action is irreversible. The vehicle telemetry and history
              will be purged from the dispatch system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3 pt-4">
            <AlertDialogCancel className="sm:flex-1 rounded-xl h-12 border-slate-200 dark:border-zinc-800 font-bold uppercase tracking-widest text-[10px]">
              Abort
            </AlertDialogCancel>
            <form action={handleDeleteAction} className="sm:flex-1">
              <AlertDialogAction
                type="submit"
                className="w-full rounded-xl h-12 bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest text-[10px]"
              >
                Confirm Deletion
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
