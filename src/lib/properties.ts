
import { PlaceHolderImages } from "./placeholder-images";

export interface NearbyPoint {
  name: string;
  distance: string;
}

export interface Property {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  listingType: 'Buy' | 'Rent';
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  furnishing: string;
  reraNumber: string;
  floorPlan: string;
  marketStats: {
    avgAreaPrice: string;
    pricePerSqFt: string;
  };
  nearbySchools: NearbyPoint[];
  pointsOfInterest: NearbyPoint[];
  agent: {
    name: string;
    role: string;
    image: string;
  };
}

export const PROPERTIES: Property[] = [
  {
    id: "zenith-sky-villa",
    title: "Apartment with 5 bedrooms in Zenith Sky, Downtown Dubai",
    price: "AED 45,000,000",
    priceValue: 45000000,
    location: "Burj Khalifa District, Downtown",
    beds: 5,
    baths: 6,
    sqft: 9200,
    type: "Penthouse",
    listingType: 'Buy',
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
    gallery: [
      PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "prop-4")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "journey-expertise")?.imageUrl || "",
    ],
    description: "Experience the pinnacle of urban luxury in this breathtaking penthouse. Featuring double-height ceilings, a private infinity pool, and 360-degree views of the Dubai skyline including the Burj Khalifa. The interior is finished with the finest Italian marble and sustainable hardwood, creating a residence that is both opulent and environmentally conscious.",
    features: ["Private Elevator", "Smart Home System", "Infinity Pool", "Maid's Room", "Floor-to-ceiling Windows", "Covered Parking", "24/7 Security", "Gymnasium"],
    furnishing: "Unfurnished",
    reraNumber: "238290231",
    floorPlan: "https://picsum.photos/seed/floorplan1/800/600",
    marketStats: {
      avgAreaPrice: "AED 42.5M",
      pricePerSqFt: "AED 4,891"
    },
    nearbySchools: [
      { name: "Dubai International Academy", distance: "8 mins" },
      { name: "Hartland International School", distance: "12 mins" }
    ],
    pointsOfInterest: [
      { name: "Dubai Mall", distance: "5 mins" },
      { name: "Burj Khalifa", distance: "3 mins" },
      { name: "Dubai Opera", distance: "6 mins" }
    ],
    agent: {
      name: "Marcus Thorne",
      role: "Head of Luxury Sales",
      image: PlaceHolderImages.find(img => img.id === "agent-4")?.imageUrl || ""
    }
  },
  {
    id: "azure-shore-mansion",
    title: "Mansion with 6 bedrooms in Azure Shore, Palm Jumeirah",
    price: "AED 32,500,000",
    priceValue: 32500000,
    location: "Palm Jumeirah East Crescent",
    beds: 6,
    baths: 7,
    sqft: 12400,
    type: "Villa",
    listingType: 'Buy',
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
    gallery: [
      PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "journey-strategy")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "area-1")?.imageUrl || "",
    ],
    description: "A masterwork of Mediterranean architecture set on the prestigious Palm Jumeirah. This beachfront estate offers private beach access, lush landscaped gardens, and premium Italian finishes throughout.",
    features: ["Private Beach", "Home Cinema", "Spa & Sauna", "Outdoor BBQ Area", "Chef's Kitchen", "Infinity Pool", "Smart Automation"],
    furnishing: "Partially Furnished",
    reraNumber: "119283745",
    floorPlan: "https://picsum.photos/seed/floorplan2/800/600",
    marketStats: {
      avgAreaPrice: "AED 35.2M",
      pricePerSqFt: "AED 2,620"
    },
    nearbySchools: [
      { name: "The Palm Academy", distance: "5 mins" },
      { name: "GEMS Wellington", distance: "15 mins" }
    ],
    pointsOfInterest: [
      { name: "Atlantis The Royal", distance: "4 mins" },
      { name: "Nakheel Mall", distance: "10 mins" }
    ],
    agent: {
      name: "Elena Rodriguez",
      role: "Global Advisor",
      image: PlaceHolderImages.find(img => img.id === "agent-3")?.imageUrl || ""
    }
  },
  {
    id: "eclipse-residence",
    title: "Mansion with 4 bedrooms in Eclipse Residence, Emirates Hills",
    price: "AED 18,900,000",
    priceValue: 18900000,
    location: "Emirates Hills Gated District",
    beds: 4,
    baths: 5,
    sqft: 7800,
    type: "Mansion",
    listingType: 'Buy',
    image: PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
    gallery: [
      PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "journey-connection")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "about-hero")?.imageUrl || "",
    ],
    description: "Nestled in the 'Beverly Hills' of Dubai, this contemporary mansion offers unparalleled privacy and sophistication. Overlooking the championship golf course with minimalist design philosophy.",
    features: ["Golf Course View", "Wine Cellar", "Automated Security", "Solar Energy System", "Zen Garden"],
    furnishing: "Unfurnished",
    reraNumber: "556677889",
    floorPlan: "https://picsum.photos/seed/floorplan3/800/600",
    marketStats: {
      avgAreaPrice: "AED 22.1M",
      pricePerSqFt: "AED 2,423"
    },
    nearbySchools: [
      { name: "Emirates International School", distance: "7 mins" }
    ],
    pointsOfInterest: [
      { name: "Montgomerie Golf Club", distance: "2 mins" },
      { name: "Dubai Marina", distance: "10 mins" }
    ],
    agent: {
      name: "Ben Thomas",
      role: "Luxury Portfolio Specialist",
      image: PlaceHolderImages.find(img => img.id === "agent-1")?.imageUrl || ""
    }
  },
  {
    id: "marina-sky-rent",
    title: "Apartment with 3 bedrooms in Marina Shores, Dubai Marina",
    price: "AED 450,000 / Year",
    priceValue: 450000,
    location: "Dubai Marina",
    beds: 3,
    baths: 4,
    sqft: 3200,
    type: "Penthouse",
    listingType: 'Rent',
    image: PlaceHolderImages.find(img => img.id === "prop-4")?.imageUrl || "",
    gallery: [
      PlaceHolderImages.find(img => img.id === "prop-4")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "area-2")?.imageUrl || "",
      PlaceHolderImages.find(img => img.id === "news-2")?.imageUrl || "",
    ],
    description: "Luxurious penthouse available for annual rent in the heart of Dubai Marina. Fully furnished with designer pieces and offering stunning waterfront views.",
    features: ["Marina View", "Fully Furnished", "Gym Access", "Pool Access", "Concierge"],
    furnishing: "Fully Furnished",
    reraNumber: "998877665",
    floorPlan: "https://picsum.photos/seed/floorplan4/800/600",
    marketStats: {
      avgAreaPrice: "AED 380k / Yr",
      pricePerSqFt: "AED 140"
    },
    nearbySchools: [
      { name: "Regent International", distance: "10 mins" }
    ],
    pointsOfInterest: [
      { name: "Marina Mall", distance: "5 mins" },
      { name: "JBR Beach", distance: "8 mins" }
    ],
    agent: {
      name: "Alexander Tuguchev",
      role: "Senior Portfolio Manager",
      image: PlaceHolderImages.find(img => img.id === "agent-2")?.imageUrl || ""
    }
  }
];
