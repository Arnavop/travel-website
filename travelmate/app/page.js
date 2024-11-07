'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, MapPin } from 'lucide-react'

const cities = [
  { id: 1, name: 'Mumbai', image: '/placeholder.svg?height=200&width=300', description: 'The city of dreams', featured: true },
  { id: 2, name: 'Delhi', image: '/placeholder.svg?height=200&width=300', description: 'The heart of India', featured: true },
  { id: 3, name: 'Bangalore', image: '/placeholder.svg?height=200&width=300', description: 'The Silicon Valley of India', featured: true },
  { id: 4, name: 'Jaipur', image: '/placeholder.svg?height=200&width=300', description: 'The Pink City', featured: true },
  { id: 5, name: 'Kolkata', image: '/placeholder.svg?height=200&width=300', description: 'The City of Joy', featured: false },
  { id: 6, name: 'Chennai', image: '/placeholder.svg?height=200&width=300', description: 'The Detroit of India', featured: false },
]

export default function Home() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="relative h-[60vh] bg-cover bg-center" style={{backgroundImage: "url('/images/india-background.jpg')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Discover India&apos;s Wonders</h1>
          <p className="text-xl mb-8">Explore the diverse cities and rich culture of India</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between text-left font-normal bg-white text-black"
              >
                {value
                  ? cities.find((city) => city.name.toLowerCase() === value)?.name
                  : "Search for a city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search for a city..." />
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === city.name.toLowerCase() ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Featured Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.filter(city => city.featured).map((city) => (
            <Card key={city.id} className="overflow-hidden">
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
                  <Button variant="outline" className="w-full">Explore</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
