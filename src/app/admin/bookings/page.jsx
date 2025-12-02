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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingActions } from "./booking-actions"; // Client component for buttons

// Async function to fetch bookings with vehicle names
async function getBookings() {
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
  const normalized = (data || []).map((row) => ({
    booking_id: row.booking_id,
    booking_ref: row.booking_ref,
    customer_name: row.customer_name,
    trip_date: row.trip_date,
    booking_status: row.booking_status,
    vehicles: row.vehicles,
  }));

  return normalized;
}

export default async function ManageBookingsPage() {
  const bookings = await getBookings();

  // Helper to determine badge color based on status
  const getStatusVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      case "pending":
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  return (
    <div className="w-full p-4 sm:p-8">
      {/* <Card > */}
      <CardHeader className="pb-8">
        <CardTitle className="text-3xl font-bold w-1/2 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
          Manage Bookings
        </CardTitle>
        <CardDescription>
          A list of all customer enquiries and their statuses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Booking Ref
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Customer
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Vehicle
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Trip Date
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
                  Status
                </TableHead>
                <TableHead className="px-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.booking_id}>
                    <TableCell className="px-6 font-mono">
                      {booking.booking_ref}
                    </TableCell>
                    <TableCell className="px-6 font-medium">
                      {booking.customer_name}
                    </TableCell>
                    <TableCell className="px-6">
                      {booking.vehicles?.name ?? "N/A"}
                    </TableCell>
                    <TableCell className="px-6">
                      {new Date(booking.trip_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6">
                      <Badge
                        className={getStatusVariant(booking.booking_status)}
                      >
                        {booking.booking_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 text-right">
                      <BookingActions bookingId={booking.booking_id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="px-6 h-24 text-center text-muted-foreground"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* </Card> */}
    </div>
  );
}
