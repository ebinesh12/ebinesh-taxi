// app/booking-success/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CircleCheck } from "lucide-react"; // A nice icon for success
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Zod schema to validate the presence of the 'ref' search param
const searchParamsSchema = z.object({
  ref: z.string().min(1, "Booking reference is missing."),
});

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  // Validate the search parameters
  const validation = searchParamsSchema.safeParse({
    ref: searchParams.get("ref"),
  });

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="items-center">
          <div className="flex justify-center gap-x-4">
            <CircleCheck className="h-16 w-16 text-green-500" />
            <CardTitle className="text-3xl font-bold pt-4">
              Booking Successful!
            </CardTitle>
          </div>
          <CardDescription className="text-lg">
            Thank you for choosing our service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {validation.success ? (
            <div className="space-y-2 rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">
                Your Booking Reference ID is:
              </p>
              <p className="text-xl font-mono font-semibold text-primary">
                {validation.data.ref}
              </p>
            </div>
          ) : (
            <p className="text-destructive">
              Could not retrieve booking reference. Please check your
              confirmation email.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-fuchsia-500 to-indigo-700"
          >
            <Link href="/">Go to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// A simple skeleton fallback for Suspense
const LoadingFallback = () => (
  <div className="container mx-auto flex min-h-[80vh] items-center justify-center p-4">
    <Card className="w-full max-w-lg">
      <CardHeader className="items-center space-y-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-80" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Skeleton className="h-12 w-32" />
      </CardFooter>
    </Card>
  </div>
);

// The page component uses Suspense to handle searchParams usage
export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
