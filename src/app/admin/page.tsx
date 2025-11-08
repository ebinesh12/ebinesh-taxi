// app/admin/dashboard/page.tsx
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";

// Import Shadcn UI Components and Lucide Icons
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpenCheck, Calendar, Car, Database } from "lucide-react";

// Add a type for our stats for better code quality
type BookingStats = {
  totalCount: number;
  todayCount: number;
};

// This function fetches data on the server
async function getBookingStats(): Promise<BookingStats> {
  const today = new Date().toISOString().split("T")[0];

  // Using Promise.all to fetch data in parallel for better performance
  const [totalResult, todayResult] = await Promise.all([
    supabase
      .from("bookings")
      .select("booking_id", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("booking_id", { count: "exact", head: true })
      .eq("trip_date", today),
  ]);

  // Handle potential errors gracefully
  if (totalResult.error) {
    console?.error("Error fetching total bookings:", totalResult.error.message);
  }
  if (todayResult.error) {
    console?.error(
      "Error fetching today's bookings:",
      todayResult.error.message,
    );
  }

  // Return the counts, defaulting to 0 if null or on error
  return {
    totalCount: totalResult.count ?? 0,
    todayCount: todayResult.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const { totalCount, todayCount } = await getBookingStats();

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your bookings and system management.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Enquiries
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{todayCount}</div>
            <p className="text-xs text-muted-foreground">
              New enquiries received today.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enquiries
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">
              All-time enquiry count in the system.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions / Navigation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your core system features from here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/admin/bookings">
              <BookOpenCheck className="mr-2 h-4 w-4" />
              Manage Bookings
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/vehicles">
              <Car className="mr-2 h-4 w-4" />
              Manage Vehicles
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// This Next.js variable ensures the data on this page is re-fetched periodically
export const revalidate = 60; // Revalidate data every 60 seconds
