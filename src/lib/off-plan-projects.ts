
import { PlaceHolderImages } from "./placeholder-images";

export interface PaymentStep {
  percentage: string;
  label: string;
}

export interface OffPlanProject {
  id: string;
  title: string;
  type: string;
  developer: string;
  image: string;
  location: string;
  price: string;
  handoverDate: string;
  exclusive?: boolean;
  description: string;
  longDescription: string;
  gallery: string[];
  amenities: string[];
  paymentPlan: PaymentStep[];
  agent: {
    name: string;
    role: string;
    image: string;
  };
}

export const OFF_PLAN_PROJECTS: OffPlanProject[] = [
  {
    id: "farm-gardens-2",
    title: "Farm Gardens 2",
    type: "Residences",
    developer: "Emaar Properties",
    location: "The Valley, Dubai",
    price: "From AED 7.2M",
    handoverDate: "Q2 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    exclusive: true,
    description: "A unique retreat designed for those who appreciate the finer things in life.",
    longDescription: "Farm Gardens 2 is a new residential development by Emaar Properties that offers a collection of luxury villas. Nestled within a serene landscape, it provides residents with a peaceful lifestyle away from the city's hustle. Each villa is meticulously designed with modern architecture and premium finishes, ensuring a blend of comfort and sophistication.",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
    ],
    amenities: ["Botanical Garden", "Outdoor Cinema", "Yoga Deck", "Stargazing Platform", "Community Farm"],
    paymentPlan: [
      { percentage: "10%", label: "Down Payment" },
      { percentage: "80%", label: "During Construction" },
      { percentage: "10%", label: "On Handover" }
    ],
    agent: {
      name: "Marcus Thorne",
      role: "Off-Plan Investment Expert",
      image: PlaceHolderImages.find(img => img.id === "agent-4")?.imageUrl || ""
    }
  },
  {
    id: "the-oasis",
    title: "The Oasis",
    type: "Villas",
    developer: "Emaar Properties",
    location: "Al Yufrah 1, Dubai",
    price: "From AED 8.5M",
    handoverDate: "Q4 2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    description: "An ultra-luxury waterfront destination by Emaar.",
    longDescription: "The Oasis is a prestigious waterfront community featuring luxury villas and mansions set amidst winding canals and lush greenery. Designed to offer an unparalleled lifestyle, the development includes world-class amenities and direct access to the water, making it one of the most sought-after addresses in Dubai.",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop"
    ],
    amenities: ["Crystal Lagoons", "Private Beaches", "Wellness Center", "Gourmet Dining", "Sports Courts"],
    paymentPlan: [
      { percentage: "20%", label: "Down Payment" },
      { percentage: "70%", label: "During Construction" },
      { percentage: "10%", label: "On Handover" }
    ],
    agent: {
      name: "Alexander Tuguchev",
      role: "Senior Portfolio Manager",
      image: PlaceHolderImages.find(img => img.id === "agent-2")?.imageUrl || ""
    }
  },
  {
    id: "burj-azizi",
    title: "Burj Azizi",
    type: "Ultra-Luxury",
    developer: "Azizi Developments",
    location: "Sheikh Zayed Road, Dubai",
    price: "Price on Application",
    handoverDate: "2027",
    image: "https://images.unsplash.com/photo-1510665724063-f77a01074aa2?q=80&w=1600&auto=format&fit=crop",
    exclusive: true,
    description: "The next landmark on the Dubai skyline.",
    longDescription: "Burj Azizi is set to be one of the tallest towers in Dubai, offering ultra-luxury residences and a high-end hotel. Located on the iconic Sheikh Zayed Road, the tower will feature cutting-edge design and state-of-the-art facilities, providing residents with breathtaking views and an elite living experience.",
    gallery: [
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543071293-d91175a68672?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1459787915554-b34915863013?q=80&w=1200&auto=format&fit=crop"
    ],
    amenities: ["Observation Deck", "Sky Pool", "Luxury Spa", "Business Lounge", "Valet Service"],
    paymentPlan: [
      { percentage: "10%", label: "Reservation" },
      { percentage: "40%", label: "During Construction" },
      { percentage: "50%", label: "On Completion" }
    ],
    agent: {
      name: "Elena Rodriguez",
      role: "Luxury Portfolio Specialist",
      image: PlaceHolderImages.find(img => img.id === "agent-3")?.imageUrl || ""
    }
  },
  {
    id: "sobha-one",
    title: "Sobha One",
    type: "Apartments",
    developer: "Sobha Realty",
    location: "Sobha Hartland, Dubai",
    price: "From AED 1.5M",
    handoverDate: "Q4 2026",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
    description: "One community. Five towers. Infinite luxury.",
    longDescription: "Sobha One is a masterfully planned development consisting of five interconnected towers. Overlooking a world-class golf course and the Dubai Creek, it offers a range of apartments from 1 to 4 bedrooms. The project emphasizes Sobha's signature quality and attention to detail, creating a holistic urban living environment.",
    gallery: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
    ],
    amenities: ["18-Hole Pitch & Putt Golf Course", "Waterfront Promenade", "Sky Gardens", "Outdoor Cinema", "Clubhouse"],
    paymentPlan: [
      { percentage: "10%", label: "Down Payment" },
      { percentage: "50%", label: "During Construction" },
      { percentage: "40%", label: "On Handover" }
    ],
    agent: {
      name: "Ben Thomas",
      role: "Head of Secondary Sales",
      image: PlaceHolderImages.find(img => img.id === "agent-1")?.imageUrl || ""
    }
  }
];
