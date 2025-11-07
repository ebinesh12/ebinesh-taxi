// app/booking-verification/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function BookingVerification() {
  const [tripDetails, setTripDetails] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const details = sessionStorage.getItem("tripDetails");
    if (details) {
      setTripDetails(JSON.parse(details));
    } else {
      router.push("/"); // Redirect if no details are found
    }
  }, [router]);

  const generateBookingId = () => `TXN${Date.now()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile) {
      alert("Name and Mobile are required.");
      return;
    }
    setIsSubmitting(true);

    const bookingData = {
      pickup_location: tripDetails.pickup,
      drop_location: tripDetails.drop,
      trip_date: tripDetails.date,
      trip_time: tripDetails.time,
      vehicle_id: tripDetails.vehicleId,
      customer_name: name,
      customer_mobile: mobile,
      customer_email: email,
      estimated_fare: tripDetails.estimatedFare,
      booking_ref: generateBookingId(),
    };
console.log("Booking Data:", bookingData);
    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingData])
      .select();

    if (error) {
      console?.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
      setIsSubmitting(false);
    } else {
      // On success
      sessionStorage.removeItem("tripDetails");
      router.push(`/booking-success?ref=${data[0].booking_ref}`);
    }
  };

  if (!tripDetails) return null;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">Confirm Your Booking</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Trip Summary</h3>
        <p>
          <strong>From:</strong> {tripDetails.pickup}
        </p>
        <p>
          <strong>To:</strong> {tripDetails.drop}
        </p>
        <p>
          <strong>Date & Time:</strong> {tripDetails.date} at {tripDetails.time}
        </p>
        <p>
          <strong>Vehicle:</strong> {tripDetails.vehicleName}
        </p>
        <p className="text-xl font-bold mt-2">
          <strong>Estimated Fare:</strong> ₹
          {Number(tripDetails.estimatedFare).toFixed(2)}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold mb-4">Your Details</h3>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
