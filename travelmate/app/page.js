"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

// Rest of the code..

const cities = [
  {
    id: 1,
    name: "Mumbai",
    image:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/Chhatrapati-Shivaji-Terminus-railway-station-mumbai.jpg",
    description: "The city of dreams",
    featured: true,
  },
  {
    id: 2,
    name: "Delhi",
    image: "https://www.revv.co.in/blogs/wp-content/uploads/2020/02/visit-in-delhi-with-self-drive.jpg",
    description: "The heart of India",
    featured: true,
  },
  {
    id: 3,
    name: "Bangalore",
    image: "https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blta952a51d42986166/61bc491fc548b77c207dbdbf/US_Bengaluru_IN_Header.jpg?width=1440&quality=70&auto=webp",
    description: "The Silicon Valley of India",
    featured: true,
  },
  {
    id: 4,
    name: "Jaipur",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    description: "The Pink City",
    featured: true,
  },
  {
    id: 5,
    name: "Kolkata",
    image: "https://www.touropia.com/gfx/d/best-places-to-visit-in-kolkata/victoria_memorial.jpg",
    description: "The City of Joy",
    featured: true,
  },
  {
    id: 6,
    name: "Chennai",
    image: "https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/Vivekanandar-Illam-in-Chennai.jpg",
    description: "The Detroit of India",
    featured: true,
  },
  {
    id: 7,
    name: "Hyderabad",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Charminar%2C_Hyderabad.jpg/1280px-Charminar%2C_Hyderabad.jpg",
    description: "The City of Pearls",
    featured: true,
  },
  {
    id: 8,
    name: "Udaipur",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/View_of_Udaipur_City_Palace_and_Lake_Pichola%2C_Rajasthan%2C_India.jpg/1280px-View_of_Udaipur_City_Palace_and_Lake_Pichola%2C_Rajasthan%2C_India.jpg",
    description: "The Venice of the East",
    featured: true,
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <Navigation />
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://deih43ym53wif.cloudfront.net/large_hanging_bridge_himachal_india_shutterstock_1087070918_c59e0eb675.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Discover India&apos;s Wonders
          </h1>
          <p className="text-xl mb-8">
            Explore the diverse cities and rich culture of India
          </p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between text-left font-normal bg-white text-black"
              >
                {value
                  ? cities.find((city) => city.name.toLowerCase() === value)
                      ?.name
                  : "Search for a city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search for a city..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                {filteredCities.length === 0 ? (
                  <CommandEmpty>No city found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {filteredCities.map((city) => (
                      <CommandItem
                        key={city.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value.toLowerCase() === city.name.toLowerCase()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {city.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Featured Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCities
            .filter((city) => city.featured)
            .map((city) => (
              <Card key={city.id} className="overflow-hidden shadow-lg">
                <Image
                  src={city.image}
                  alt={city.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    {city.name}
                  </CardTitle>
                  <CardDescription>{city.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={`/city/${city.id}`} passHref>
                    <Button variant="outline" className="w-full">
                      Explore
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Indian Cities. All rights reserved.</p>
          <div>
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p>
              We are a team dedicated to showcasing the diverse and vibrant cities of India. Our mission is to inspire travelers to explore the rich culture, history, and natural beauty that India has to offer.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}