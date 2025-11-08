"use client"; // This is a client component

import Link from "next/link";
import { deleteVehicle } from "./actions"; // Your server action for deleting

// Import Shadcn UI and Lucide Icons
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
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Define the props for this component
interface VehicleActionsProps {
  vehicleId: string;
}

export function VehicleActions({ vehicleId }: VehicleActionsProps) {
  const handleDeleteAction = async () => {
    const result = await deleteVehicle(vehicleId);

    if (result?.error) {
      toast.error("Failed to delete vehicle", {
        description: result.error,
      });
    } else {
      toast.success("Vehicle deleted successfully!");
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      {/* Edit Button */}
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/vehicles/edit/${vehicleId}`}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Link>
      </Button>

      {/* Delete Confirmation Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-red-500">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              vehicle and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* The form is now inside the dialog */}
            <form action={handleDeleteAction}>
              <AlertDialogAction type="submit">
                Yes, delete vehicle
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
