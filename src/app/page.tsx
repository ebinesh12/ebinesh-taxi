// app/page.js
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const cities = [
    {
      name: "Chennai",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg",
      description: "The Detroit of Asia",
    },
    {
      name: "Coimbatore",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Town_Hall%2C_Coimbatore.jpg/1024px-Town_Hall%2C_Coimbatore.jpg",
      description: "Manchester of South India",
    },
    {
      name: "Madurai",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Meenakshi_Amman_West_Tower.jpg/1920px-Meenakshi_Amman_West_Tower.jpg",
      description: "The Athens of the East",
    },
    {
      name: "Tiruchirappalli",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Rock_Fortress_-_Tiruchirappalli_-_India.JPG/1024px-Rock_Fortress_-_Tiruchirappalli_-_India.JPG",
      description: "The Rock Fort City",
    },
    {
      name: "Erode",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Erode_District_Collector%27s_Office.jpg/1024px-Erode_District_Collector%27s_Office.jpg",
      description: "The Turmeric City",
    },
    {
      name: "Salem",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/A_photo_of_Salem_Steel_Plant_entrance.JPG/1024px-A_photo_of_Salem_Steel_Plant_entrance.JPG",
      description: "The City of Steel",
    },
    {
      name: "Thanjavur",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Brihadisvara_Temple%2C_Thanjavur%2C_Tamil_Nadu%2C_India.jpg/800px-Brihadisvara_Temple%2C_Thanjavur%2C_Tamil_Nadu%2C_India.jpg",
      description: "The City of Temples",
    },
  ];
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-col flex-1">
          {/* Hero Section */}
          <div className="relative">
            <div className="h-96 w-full">
              <Image
                src="https://picsum.photos/id/183/1000/600"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Full-width Image"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 bg-opacity-50 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <div className="w-full md:w-1/2">
                  <div className="flex items-center mb-5">
                    <span className="w-2 h-8 bg-indigo-500 mr-3"></span>
                    <p className="text-sm uppercase tracking-widest">
                      Taxi Services
                    </p>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold">
                    Your Gateway
                  </h1>
                  <h1 className="text-4xl md:text-6xl font-bold">
                    to any Destination
                  </h1>
                  <p className="mt-5 text-sm font-semibold">
                    Transportation is a vital aspect of modern society,
                    facilitating the movement of people from one place to
                    another.
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-fuchsia-500 to-indigo-700 mt-5"
                  >
                    <a href="/booking-ride">Explore More</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Why Us Section */}
          <div className="bg-white">
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-5">
                    <span className="w-2 h-8 bg-indigo-500 mr-3"></span>
                    <p className="text-xs uppercase tracking-widest">Why Us</p>
                  </div>
                  <h2 className="text-3xl font-medium mb-5">
                    We really consider your travelling
                  </h2>
                  <p className="text-sm mb-5">
                    Both taxi and bus services contribute to the overall
                    transportation infrastructure, offering solutions for
                    different travel needs and preferences.
                  </p>
                  <Button asChild>
                    <Link
                      href="/booking-ride"
                      className="bg-gradient-to-r from-fuchsia-500 to-indigo-700"
                    >
                      Booking Now
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Image
                      src="https://picsum.photos/id/376/1000/600"
                      width={400}
                      height={250}
                      className="rounded-lg object-cover"
                      alt="taxi"
                    />
                  </div>
                  <div>
                    <Image
                      src="https://picsum.photos/id/376/1000/600"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover border-4 border-white -mt-16"
                      alt="Taxi Interior"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transporting Across The City Section */}
          <div className="bg-indigo-700/60 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-white text-3xl font-medium mb-10">
                Transporting Across The City
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {cities.map((city) => (
                  <div key={city.name} className="relative flex-shrink-0">
                    <Image
                      src={city.image}
                      width={192}
                      height={240}
                      className="object-cover h-full rounded-lg"
                      alt={city.name}
                    />
                    <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-slate-950 to-transparent p-3 flex flex-col justify-end rounded-b-lg">
                      <p className="font-medium text-white">{city.name}</p>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {city.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mx-auto w-full px-4 lg:px-18 py-16">
            <div className="flex items-center  mb-5">
              <span className="w-2 h-8 bg-indigo-500 mr-3"></span>
              <p className="text-xs uppercase tracking-widest">What we do</p>
            </div>
            <h2 className="text-3xl font-medium">Transportation and Service</h2>
            <p className="text-sm my-8">
              Taxis provide a more personalized and on-demand service, while
              buses offer a systematic and mass transit solution for larger
              groups of people.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="flex items-center justify-center">
                  <p className="text-4xl font-medium mr-5">1294</p>
                  <span className="h-5 w-5 bg-indigo-500"></span>
                  <p className="w-fit px-5 text-sm font-medium">Taxi Drivers</p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-4xl font-medium mr-5">3594</p>
                  <span className="h-5 w-5 bg-indigo-500"></span>
                  <p className="w-fit px-5 text-sm font-medium">Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Drivers Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <div className="flex justify-center items-center mb-2">
                <span className="w-2 h-8 bg-indigo-500 mr-3"></span>
                <p className="text-sm uppercase tracking-widest">
                  The Transporters
                </p>
              </div>
              <h2 className="text-4xl font-medium">Our Drivers</h2>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
