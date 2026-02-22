import { PlaceHolderImages } from "./placeholder-images";

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  image: string;
  description: string;
  features: string[];
}

export const PROPERTIES: Property[] = [
  {
    id: "zenith-sky-villa",
    title: "Zenith Sky Villa",
    price: "AED 45,000,000",
    location: "Burj Khalifa District, Downtown",
    beds: 5,
    baths: 6,
    sqft: 9200,
    type: "Penthouse",
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
    description: "Experience the pinnacle of urban luxury in this breathtaking penthouse. Featuring double-height ceilings, a private infinity pool, and 360-degree views of the Dubai skyline including the Burj Khalifa.",
    features: ["Private Elevator", "Smart Home System", "Infinity Pool", "Maid's Room", "Floor-to-ceiling Windows"],
  },
  {
    id: "azure-shore-mansion",
    title: "Azure Shore Mansion",
    price: "AED 32,500,000",
    location: "Palm Jumeirah East Crescent",
    beds: 6,
    baths: 7,
    sqft: 12400,
    type: "Villa",
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
    description: "A masterwork of Mediterranean architecture set on the prestigious Palm Jumeirah. This beachfront estate offers private beach access, lush landscaped gardens, and premium Italian finishes.",
    features: ["Private Beach", "Home Cinema", "Spa & Sauna", "Outdoor BBQ Area", "Chef's Kitchen"],
  },
  {
    id: "eclipse-residence",
    title: "Eclipse Residence",
    price: "AED 18,900,000",
    location: "Emirates Hills Gated District",
    beds: 4,
    baths: 5,
    sqft: 7800,
    type: "Mansion",
    image: PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
    description: "Nestled in the 'Beverly Hills' of Dubai, this contemporary mansion offers unparalleled privacy and sophistication. Overlooking the championship golf course with minimalist design philosophy.",
    features: ["Golf Course View", "Wine Cellar", "Automated Security", "Solar Energy System", "Zen Garden"],
  },
];
