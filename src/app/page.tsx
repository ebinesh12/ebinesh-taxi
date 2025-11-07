// app/page.js
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// const fetchTopDrivers = async () => {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/top-drivers`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching top drivers:", error);
//     return [];
//   }
// };

export default function Home() {

    const [topDrivers, setTopDrivers] = useState([]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const topDriverData = await fetchTopDrivers();
    //     setTopDrivers(topDriverData);
    //   };

    //   fetchData();
    // }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen">
            <main className="flex flex-col flex-1">
              {/* Search Section */}
              {/* <div id="searchSection" className="mt-20 relative h-auto p-4 lg:p-0">
                <form className="max-w-6xl mx-auto">
                  <div className="bg-black bg-opacity-50 p-5 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
                      <RadioGroup defaultValue="txai" className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="txai" id="yellow-radio" />
                          <Label htmlFor="yellow-radio" className="text-white">TXAI Service</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bus" id="red-radio" />
                          <Label htmlFor="red-radio" className="text-white">BUS Service</Label>
                        </div>
                      </RadioGroup>
                    </div>
      
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <Input type="text" placeholder="Start Location" className="w-full sm:w-64" />
                      <Button type="button" variant="outline">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 16 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 10H1m0 0 3-3m-3 3 3 3m1-9h10m0 0-3 3m3-3-3-3"
                          />
                        </svg>
                      </Button>
                      <Input type="text" placeholder="End Location" className="w-full sm:w-64" />
                      <Input type="date" className="w-full sm:w-auto" />
                      <Input type="time" className="w-full sm:w-auto" />
                      <Button className="w-full sm:w-36">Search</Button>
                    </div>
      
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
                      <span className="text-base font-medium text-gray-300 mr-5">
                        More options :
                      </span>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option1" />
                        <Label htmlFor="option1" className="text-gray-300">Affordable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option2" />
                        <Label htmlFor="option2" className="text-gray-300">Availability</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option3" />
                        <Label htmlFor="option3" className="text-gray-300">Nearby</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option4" />
                        <Label htmlFor="option4" className="text-gray-300">High Rating</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option5" />
                        <Label htmlFor="option5" className="text-gray-300">Popular</Label>
                      </div>
                    </div>
                  </div>
                </form>
              </div> */}
      
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
                        <span className="w-2 h-8 bg-yellow-400 mr-3"></span>
                        <p className="text-sm uppercase tracking-widest">
                          Taxi Services
                        </p>
                      </div>
                      <h1 className="text-4xl md:text-6xl font-bold">Your Gateway</h1>
                      <h1 className="text-4xl md:text-6xl font-bold">
                        to any Destination
                      </h1>
                      <p className="mt-5 text-sm font-semibold">
                        Transportation is a vital aspect of modern society,
                        facilitating the movement of people from one place to another.
                      </p>
                      <Button
                        asChild
                        className="bg-yellow-400 hover:bg-yellow-500 text-stone-900 mt-5"
                      >
                        <a href="/bus/list">Explore More</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* What We Do Section */}
              <div className="bg-yellow-400/10 mx-auto w-full px-4 lg:px-18 py-16">
                <div className="flex items-center  mb-5">
                  <span className="w-2 h-8 bg-yellow-400 mr-3"></span>
                  <p className="text-xs uppercase tracking-widest">What we do</p>
                </div>
                <h2 className="text-3xl font-medium">Transportation and Service</h2>
                <p className="text-sm my-8">
                  Taxis provide a more personalized and on-demand service, while buses
                  offer a systematic and mass transit solution for larger groups of
                  people.
                </p>
              </div>
      
              {/* Why Us Section */}
              <div className="bg-white">
                <div className="container mx-auto px-4 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center mb-5">
                        <span className="w-2 h-8 bg-yellow-400 mr-3"></span>
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
                        <a href="/bus/list">Booking Now</a>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Image
                          src="https://picsum.photos/id/376/1000/600"
                          width={400}
                          height={250}
                          className="rounded-lg object-cover"
                          alt="Bus"
                        />
                      </div>
                      <div>
                        <Image
                          src="https://ak-d.tripcdn.com/images/0351q1200094d3lyp39C4_C_568_320_Q50.jpg_.webp"
                          width={200}
                          height={150}
                          className="rounded-lg object-cover border-4 border-white -mt-16"
                          alt="Bus Interior"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* Transporting Across The City Section */}
              <div className="bg-yellow-400/70 py-16">
                <div className="container mx-auto px-4">
                  <h2 className="text-center text-3xl font-medium mb-10">
                    Transporting Across The City
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {[
                      {
                        name: "Phnom Penh",
                        image:
                          "https://ak-d.tripcdn.com/images/0351q1200094d3lyp39C4_C_568_320_Q50.jpg_.webp",
                      },
                      {
                        name: "Kampong Chhnang",
                        image:
                          "https://ak-d.tripcdn.com/images/0351q1200094d3lyp39C4_C_568_320_Q50.jpg_.webp",
                      },
                      // { name: "Pursat", image: "https://live.staticflickr.com/8691/16995702166_ab7e89c9d0_z.jpg" },
                      // { name: "Battambong", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/a9/33/0d/the-namesake-of-the-city.jpg?w=1200&h=-1&s=1" },
                      // { name: "Pailin", image: "https://memoriapalace.com/wp-content/uploads/2016/08/Phnom-Yat.jpg" },
                      // { name: "Banteay Meanchey", image: "https://www.dinewiththelocals.com/wp-content/uploads/2019/10/IMG_20191020_085059.jpg" },
                      // { name: "Oddar Meanchey", image: "https://tourismcambodia.org/storage/uploads/category_banner/ministry-of-tourism-cambodia-2019-02-18-07-39-42am-Oddar-Meanchey-01.jpg" },
                      // { name: "Siem Reap", image: "https://upload.wikimedia.org/wikipedia/commons/1/14/D%27Angkor.jpg" },
                      // ... Add other cities here
                    ].map((city) => (
                      <div key={city.name} className="relative flex-shrink-0">
                        <Image
                          src={city.image}
                          width={192}
                          height={240}
                          className="object-cover rounded-lg"
                          alt={city.name}
                        />
                        <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-slate-950 to-transparent p-3 flex flex-col justify-end rounded-b-lg">
                          <p className="font-medium text-white">{city.name}</p>
                          <p className="text-xs text-yellow-300">
                            popular and fantasy
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
      
              {/* Service Comparison Section */}
              <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="py-3 px-0">
                    <CardHeader className="px-3">
                      <Image
                        src="https://picsum.photos/id/183/1000/600"
                        width={600}
                        height={300}
                        className="rounded-t-lg object-cover"
                        alt="Taxi Service"
                      />
                      <CardTitle>Taxi service</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-gray-700">
                        Taxi Service: A taxi service is a convenient and flexible mode
                        of transportation where individuals can hire a private vehicle
                        for personal travel.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        variant="outline"
                        className="hover:bg-gray-600 hover:text-white"
                      >
                        <a href="/bus/list">Find Now</a>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
      
              {/* Statistics Section */}
              <div className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    <div className="flex items-center justify-center">
                      <p className="text-4xl font-medium mr-5">1294</p>
                      <span className="h-5 w-5 bg-yellow-400"></span>
                      <p className="w-fit px-5 text-sm font-medium">Taxi Drivers</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-4xl font-medium mr-5">3594</p>
                      <span className="h-5 w-5 bg-yellow-400"></span>
                      <p className="w-fit px-5 text-sm font-medium">Customers</p>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* Our Drivers Section */}
              <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-10">
                  <div className="flex justify-center items-center mb-2">
                    <span className="w-2 h-8 bg-yellow-400 mr-3"></span>
                    <p className="text-sm uppercase tracking-widest">
                      The Transporters
                    </p>
                  </div>
                  <h2 className="text-4xl font-medium">Our Drivers</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {topDrivers?.map((driver) => (
                    <Card key={driver.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <Image
                          src={driver.photoURL}
                          width={300}
                          height={400}
                          className="object-cover w-full h-80"
                          alt={`${driver.firstName} ${driver.lastName}`}
                        />
                      </CardHeader>
                      <CardContent className="p-4 bg-slate-800 text-white">
                        <div className="flex justify-between items-center mb-2">
                          {/* ReactStars can be added here if needed */}
                          <div className="flex space-x-2">
                            <a href="#">
                              <Image
                                width="20"
                                height="20"
                                src="https://img.icons8.com/ios-glyphs/30/ffffff/facebook-new.png"
                                alt="facebook-new"
                              />
                            </a>
                            <a href="#">
                              <Image
                                width="20"
                                height="20"
                                src="https://img.icons8.com/ios-glyphs/30/ffffff/twitter--v1.png"
                                alt="twitter--v1"
                              />
                            </a>
                            <a href="#">
                              <Image
                                width="20"
                                height="20"
                                src="https://img.icons8.com/material-outlined/24/ffffff/instagram-new--v1.png"
                                alt="instagram-new--v1"
                              />
                            </a>
                          </div>
                        </div>
                        <CardTitle className="text-white">
                          {driver.firstName} {driver.lastName}
                        </CardTitle>
                        <div className="flex justify-between text-sm mt-2">
                          <p>Driver</p>
                          <p>{driver.contactNumber}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </main>
          </div>
      <Footer />
    </div>
  );
}
