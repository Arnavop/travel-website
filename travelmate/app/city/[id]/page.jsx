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
  {     id: 1,
        name: "Mumbai",
        description: `
          🌆 **Mumbai** is the bustling capital of Maharashtra and the largest city in India, serving as its financial powerhouse. 
          Known for its high-energy streets, iconic skyline, and the scenic Arabian Sea coastline, Mumbai is a city of dreams and 
          contrasts. As the home of **Bollywood 🎬**, India’s prolific film industry, Mumbai attracts aspiring actors, artists, and 
          dreamers from all over the country.
    
          ---
          ### Key Highlights
          - **Gateway of India**: An iconic arch monument, overlooking the Mumbai Harbor, that serves as a popular gathering spot 
            and a symbol of the city's rich history.
          - **Marine Drive 🏖️**: A long promenade along the coast, famously known as the "Queen’s Necklace" due to its sparkling 
            lights at night. It's a popular spot for locals and tourists alike, providing panoramic views of the Arabian Sea and 
            incredible sunsets.
          - **Chhatrapati Shivaji Maharaj Terminus**: A UNESCO World Heritage Site with stunning Victorian Gothic architecture that 
            captures Mumbai’s colonial history.
          - **Haji Ali Dargah**: A serene mosque and dargah located on an islet, connected to the city by a narrow pathway that 
            appears during low tide, offering a unique spiritual experience.
    
          ---
          ### Vibrant Neighborhoods
          - **Colaba 🏛️**: Known for its colonial buildings, cafes, and the lively Colaba Causeway market, a haven for street shopping.
          - **Bandra**: A hip area blending old-world charm with modern attractions. It’s famous for Bandstand, Mount Mary Church, 
            and a thriving nightlife.
          - **Dharavi**: Asia's largest slum and a hub of small-scale industries, showcasing resilience and entrepreneurship.
    
          ---
          ### Local Culture and Festivals
          - **Ganesh Chaturthi**: Mumbai’s grandest festival, celebrating Lord Ganesha with vibrant decorations, processions, and 
            the final immersion ritual in the Arabian Sea.
          - **Bollywood Influence 🎥**: With its studios and movie sets, Mumbai’s Bollywood culture influences everything, from 
            music to fashion, making it an essential part of the city’s identity.
    
          ---
          ### Must-Try Cuisine
          Mumbai is known for its mouth-watering street food and diverse culinary scene. Some must-try dishes include:
          - **Vada Pav**: Known as the "Indian burger," this spicy potato fritter sandwich is a Mumbai favorite.
          - **Pav Bhaji**: A flavorful mashed vegetable curry served with buttered bread rolls, a classic street food experience.
          - **Bhel Puri & Sev Puri**: Tangy, spicy snacks made from puffed rice, vegetables, and chutneys, available at almost every 
            street corner.
    
          ---
          ### Getting Around
          Mumbai offers a robust network of transportation options:
          - **Local Trains**: The lifeline of Mumbai, connecting suburbs to the city center. It’s a unique experience, though often 
            crowded.
          - **Buses and Taxis**: BEST buses and black-and-yellow taxis provide an affordable way to explore the city.
          - **Metro and Auto-Rickshaws**: Ideal for shorter distances, the metro and auto-rickshaws are convenient options in many areas.
    
          ---
          ### Best Time to Visit
          - **November to February**: The winter season is the ideal time to visit Mumbai, with comfortable weather perfect for 
            sightseeing.
          - **Monsoon Season**: From June to September, Mumbai experiences heavy rainfall, which brings a different charm but also 
            causes flooding in some areas.
    
          ---
          ### Nearby Getaways
          - **Lonavala & Khandala**: Popular hill stations just a few hours away, ideal for a quick escape into nature with 
            beautiful valleys, waterfalls, and misty mountains.
          - **Alibaug**: Known for its beaches, forts, and laid-back atmosphere, it’s a perfect weekend getaway from Mumbai.
        `,
        image: "https://www.andbeyond.com/wp-content/uploads/sites/5/Chhatrapati-Shivaji-Terminus-railway-station-mumbai.jpg",
        latitude: 19.076,
        longitude: 72.8777,
    
  },
  {
    id: 2,
    name: "Delhi",
    description:
      "🕌 Delhi, the capital city of India, is a vibrant mix of history and modernity. Known for its historic monuments, bustling markets, and diverse culture, it has a unique charm that attracts people from around the world.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/India_Gate_in_New_Delhi_03-2016.jpg",
    latitude: 28.6139,
    longitude: 77.209,
  },
  {
    id: 3,
    name: "Bangalore",
    description:
      "🏙️ Bangalore, also known as Bengaluru, is the Silicon Valley of India. Known for its tech hubs, pleasant weather, and vibrant culture, it's a bustling city with a mix of modernity and tradition.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Bangalore_Skyline.jpg",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  {
    id: 4,
    name: "Jaipur",
    description:
      "🎨 Jaipur, the Pink City, is famous for its vibrant culture, historic palaces, and forts. Key attractions include the Hawa Mahal, City Palace, and Amer Fort. The city is known for its colorful streets and bustling bazaars.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Hawa_Mahal_2011.jpg",
    latitude: 26.9124,
    longitude: 75.7873,
  },
  {
    id: 5,
    name: "Kolkata",
    description:
      "🎭 Kolkata, the City of Joy, is renowned for its cultural festivals, colonial architecture, and art galleries. Key sites include Victoria Memorial, Howrah Bridge, and the lively markets of New Market.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/da/Victoria_Memorial_Kolkata.jpg",
    latitude: 22.5726,
    longitude: 88.3639,
  },
  {
    id: 6,
    name: "Chennai",
    description:
      "🌊 Chennai, the Detroit of India, is known for its cultural heritage, beaches, and temples. Attractions include Marina Beach, Kapaleeshwarar Temple, and Fort St. George.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Chennai_Central_railway_station.jpg",
    latitude: 13.0827,
    longitude: 80.2707,
  },
];

export default function CityPage({ params }) {
  // Unwrap the params object using React.use()
  const unwrappedParams = use(params);
  const cityData = cities.find(
    (city) => city.id === parseInt(unwrappedParams.id),
  );

  const [viewState, setViewState] = useState({
    latitude: cityData?.latitude || 0,
    longitude: cityData?.longitude || 0,
    zoom: 10,
  });

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
                <p>Reviews coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
