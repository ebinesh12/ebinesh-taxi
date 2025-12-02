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
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

export function VehicleActions({ vehicleId }) {
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
      <Button variant="ghost" size="icon" asChild className="text-blue-500">
        <Link href={`/admin/vehicles/edit/${vehicleId}`}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Link>
      </Button>

      {/* Delete Confirmation Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-red-500">
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              vehicle and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
              Cancel
            </AlertDialogCancel>
            {/* The form is now inside the dialog */}
            <form action={handleDeleteAction}>
              <AlertDialogAction
                type="submit"
                className="bg-gradient-to-r from-fuchsia-500 to-indigo-700"
              >
                Yes, Delete Vehicle
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
