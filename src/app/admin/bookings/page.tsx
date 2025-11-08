import { supabase } from "@/utils/supabase/client";

// Import Shadcn UI Components and Lucide Icons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingActions } from "./booking-actions"; // Client component for buttons

// Define a type for our joined data
export type BookingWithVehicle = {
  booking_id: number;
  booking_ref: string;
  customer_name: string;
  trip_date: string;
  booking_status: "pending" | "confirmed" | "cancelled";
  vehicles: {
    name: string;
  } | null;
};

// Async function to fetch bookings with vehicle names
async function getBookings(): Promise<BookingWithVehicle[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      booking_id,
      booking_ref,
      customer_name,
      trip_date,
      booking_status,
      vehicles (name)
    `,
    )
    .order("created_at", { ascending: false }); // Show newest first

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  // Supabase returns related rows as arrays; normalize to a single vehicle object or null
  const normalized: BookingWithVehicle[] = (data || []).map((row: any) => ({
    booking_id: row.booking_id,
    booking_ref: row.booking_ref,
    customer_name: row.customer_name,
    trip_date: row.trip_date,
    booking_status: row.booking_status,
    vehicles:
      Array.isArray(row.vehicles) && row.vehicles.length
        ? { name: row.vehicles[0].name }
        : null,
  }));

  return normalized;
}

export default async function ManageBookingsPage() {
  const bookings = await getBookings();

  // Helper to determine badge color based on status
  const getStatusVariant = (
    status: string,
  ): "bg-green-500" | "bg-yellow-400" | "bg-red-400" => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-400";
      case "pending":
      default:
        return "bg-yellow-400";
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Manage Bookings</CardTitle>
          <CardDescription>
            A list of all customer enquiries and their statuses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking Ref</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Trip Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <TableRow key={booking.booking_id}>
                      <TableCell className="font-mono">
                        {booking.booking_ref}
                      </TableCell>
                      <TableCell className="font-medium">
                        {booking.customer_name}
                      </TableCell>
                      <TableCell>{booking.vehicles?.name ?? "N/A"}</TableCell>
                      <TableCell>
                        {new Date(booking.trip_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusVariant(booking.booking_status)}
                        >
                          {booking.booking_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <BookingActions bookingId={booking.booking_id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
