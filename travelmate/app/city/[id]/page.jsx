'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const cityData = {
  id: 1,
  name: 'Mumbai',
  description: 'Mumbai, formerly Bombay, is the capital city of the Indian state of Maharashtra. It is the most populous city in India and the ninth most populous agglomeration in the world.',
  image: '/placeholder.svg?height=400&width=600',
  latitude: 19.0760,
  longitude: 72.8777,
}

export default function CityPage({ params }){
  const [viewState, setViewState] = useState({
    latitude: cityData.latitude,
    longitude: cityData.longitude,
    zoom: 10
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">{cityData.name}</h1>
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>{cityData.name}</CardTitle>
                <CardDescription>{cityData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={cityData.image} alt={cityData.name} className="w-full h-64 object-cover rounded-md" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="map">
            <Card>
              <CardContent>
                <div className="h-[400px] w-full">
                  <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
                  >
                    <Marker longitude={cityData.longitude} latitude={cityData.latitude} color="red" />
                  </Map>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>What people are saying about {cityData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add review components here */}
                <p>Reviews coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}