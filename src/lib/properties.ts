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
  mapAddress?: string;
  latitude?: number | null;
  longitude?: number | null;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  listingType: 'Buy' | 'Rent';
  image: string;
  gallery: string[];
  virtualTourUrl?: string | null;
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
    phone?: string;
    email?: string;
    whatsapp?: string;
    slug?: string;
  };
}
