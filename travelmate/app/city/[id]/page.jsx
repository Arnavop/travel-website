"use client";

import { use } from "react";
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const cities = [
  {
    id: 1,
    name: "Mumbai",
    description: `
      🌆 **Mumbai** is the bustling capital of Maharashtra and the largest city in India, serving as its financial powerhouse.
      Known for its high-energy streets, iconic skyline, and the scenic Arabian Sea coastline, Mumbai is a city of dreams and contrasts.
    `,
    image:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/Chhatrapati-Shivaji-Terminus-railway-station-mumbai.jpg",
    latitude: 19.076,
    longitude: 72.8777,
  },
  {
    id: 2,
    name: "Delhi",
    description:
      "🕌 Delhi, the capital city of India, is a vibrant mix of history and modernity.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/India_Gate_in_New_Delhi_03-2016.jpg",
    latitude: 28.6139,
    longitude: 77.209,
  },
];

export default function CityPage({ params }) {
  const unwrappedParams = use(params);
  const cityData = cities.find(
    (city) => city.id === parseInt(unwrappedParams.id)
  );

  const [viewState, setViewState] = useState({
    latitude: cityData?.latitude || 0,
    longitude: cityData?.longitude || 0,
    zoom: 10,
  });

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  if (!cityData) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">City not found</h1>
        </div>
      </main>
    );
  }

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
                <img
                  src={cityData.image}
                  alt={cityData.name}
                  className="w-full h-64 object-cover rounded-md"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="map">
            <Card>
              <CardContent>
                <div className="h-[400px] w-full">
                  <Map
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
                  >
                    <Marker
                      longitude={cityData.longitude}
                      latitude={cityData.latitude}
                      color="red"
                    />
                  </Map>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>
                  What people are saying about {cityData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
                  <ul className="mb-4 space-y-2">
                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <li
                          key={index}
                          className="p-3 border rounded-md shadow-sm bg-gray-50"
                        >
                          <p>{review}</p>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No reviews yet. Be the first to add one!
                      </p>
                    )}
                  </ul>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newReview.trim()) {
                        setReviews([...reviews, newReview]);
                        setNewReview("");
                      }
                    }}
                    className="space-y-3"
                  >
                    <textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Write your review..."
                      className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows="3"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
