// app/booking-success/page.js
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingSuccess() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Booking Successful!
      </h1>
      <p className="text-lg mb-2">Thank you for choosing our service.</p>
      <p className="text-xl font-semibold">
        Your Booking Reference ID is:{" "}
        <span className="text-blue-600">{ref}</span>
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
}
