
import { PlaceHolderImages } from "./placeholder-images";

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
  description: string;
  features: string[];
  agent: {
    name: string;
    image: string;
  };
}

export const PROPERTIES: Property[] = [
  {
    id: "zenith-sky-villa",
    title: "Zenith Sky Villa",
    price: "AED 45,000,000",
    priceValue: 45000000,
    location: "Burj Khalifa District, Downtown",
    beds: 5,
    baths: 6,
    sqft: 9200,
    type: "Penthouse",
    listingType: 'Buy',
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
    description: "Experience the pinnacle of urban luxury in this breathtaking penthouse. Featuring double-height ceilings, a private infinity pool, and 360-degree views of the Dubai skyline including the Burj Khalifa.",
    features: ["Private Elevator", "Smart Home System", "Infinity Pool", "Maid's Room", "Floor-to-ceiling Windows"],
    agent: {
      name: "Marcus Thorne",
      image: PlaceHolderImages.find(img => img.id === "agent-1")?.imageUrl || ""
    }
  },
  {
    id: "azure-shore-mansion",
    title: "Azure Shore Mansion",
    price: "AED 32,500,000",
    priceValue: 32500000,
    location: "Palm Jumeirah East Crescent",
    beds: 6,
    baths: 7,
    sqft: 12400,
    type: "Villa",
    listingType: 'Buy',
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
    description: "A masterwork of Mediterranean architecture set on the prestigious Palm Jumeirah. This beachfront estate offers private beach access, lush landscaped gardens, and premium Italian finishes.",
    features: ["Private Beach", "Home Cinema", "Spa & Sauna", "Outdoor BBQ Area", "Chef's Kitchen"],
    agent: {
      name: "Elena Rodriguez",
      image: PlaceHolderImages.find(img => img.id === "agent-3")?.imageUrl || ""
    }
  },
  {
    id: "eclipse-residence",
    title: "Eclipse Residence",
    price: "AED 18,900,000",
    priceValue: 18900000,
    location: "Emirates Hills Gated District",
    beds: 4,
    baths: 5,
    sqft: 7800,
    type: "Mansion",
    listingType: 'Buy',
    image: PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
    description: "Nestled in the 'Beverly Hills' of Dubai, this contemporary mansion offers unparalleled privacy and sophistication. Overlooking the championship golf course with minimalist design philosophy.",
    features: ["Golf Course View", "Wine Cellar", "Automated Security", "Solar Energy System", "Zen Garden"],
    agent: {
      name: "Ben Thomas",
      image: PlaceHolderImages.find(img => img.id === "agent-1")?.imageUrl || ""
    }
  },
  {
    id: "marina-sky-rent",
    title: "Marina Vista Penthouse",
    price: "AED 450,000 / Year",
    priceValue: 450000,
    location: "Dubai Marina",
    beds: 3,
    baths: 4,
    sqft: 3200,
    type: "Penthouse",
    listingType: 'Rent',
    image: PlaceHolderImages.find(img => img.id === "area-1")?.imageUrl || "",
    description: "Luxurious penthouse available for annual rent in the heart of Dubai Marina. Fully furnished with designer pieces.",
    features: ["Marina View", "Fully Furnished", "Gym Access", "Pool Access"],
    agent: {
      name: "Alexander Tuguchev",
      image: PlaceHolderImages.find(img => img.id === "agent-2")?.imageUrl || ""
    }
  }
];
