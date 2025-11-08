// app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [serviceType, setServiceType] = useState("One-Way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pickup && drop && date && time) {
      const queryParams = new URLSearchParams({
        pickup,
        drop,
        date,
        time,
        serviceType,
      }).toString();
      router.push(`/fare-estimation?${queryParams}`);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Book Your Ride</h1>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center mb-4 border-b">
          <button
            onClick={() => setServiceType("One-Way")}
            className={`px-4 py-2 text-lg font-semibold ${serviceType === "One-Way" ? "border-b-2 border-yellow-400 text-yellow-400" : "text-gray-500"}`}
          >
            One Way
          </button>
          <button
            onClick={() => setServiceType("Round-Trip")}
            className={`px-4 py-2 text-lg font-semibold ${serviceType === "Round-Trip" ? "border-b-2 border-yellow-400 text-yellow-400" : "text-gray-500"}`}
          >
            Round Trip
          </button>
        </div>

        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <label
              htmlFor="pickup"
              className="block text-sm font-medium text-gray-700"
            >
              Pickup Location
            </label>
            <input
              type="text"
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="drop"
              className="block text-sm font-medium text-gray-700"
            >
              Drop Location
            </label>
            <input
              type="text"
              id="drop"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"
          >
            Find My Ride
          </button>
        </form>
      </div>
    </main>
  );
}
