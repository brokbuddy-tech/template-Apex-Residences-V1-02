
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
    image: "https://picsum.photos/seed/off1/1600/900",
    exclusive: true,
    description: "A unique retreat designed for those who appreciate the finer things in life.",
    longDescription: "Farm Gardens 2 is a new residential development by Emaar Properties that offers a collection of luxury villas. Nestled within a serene landscape, it provides residents with a peaceful lifestyle away from the city's hustle. Each villa is meticulously designed with modern architecture and premium finishes, ensuring a blend of comfort and sophistication.",
    gallery: [
      "https://picsum.photos/seed/g1/1200/800",
      "https://picsum.photos/seed/g2/1200/800",
      "https://picsum.photos/seed/g3/1200/800",
      "https://picsum.photos/seed/g4/1200/800"
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
      image: "https://picsum.photos/seed/agent1/200/200"
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
    image: "https://picsum.photos/seed/off2/1600/900",
    description: "An ultra-luxury waterfront destination by Emaar.",
    longDescription: "The Oasis is a prestigious waterfront community featuring luxury villas and mansions set amidst winding canals and lush greenery. Designed to offer an unparalleled lifestyle, the development includes world-class amenities and direct access to the water, making it one of the most sought-after addresses in Dubai.",
    gallery: [
      "https://picsum.photos/seed/o1/1200/800",
      "https://picsum.photos/seed/o2/1200/800",
      "https://picsum.photos/seed/o3/1200/800"
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
      image: "https://picsum.photos/seed/agent2/200/200"
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
    image: "https://picsum.photos/seed/off3/1600/900",
    exclusive: true,
    description: "The next landmark on the Dubai skyline.",
    longDescription: "Burj Azizi is set to be one of the tallest towers in Dubai, offering ultra-luxury residences and a high-end hotel. Located on the iconic Sheikh Zayed Road, the tower will feature cutting-edge design and state-of-the-art facilities, providing residents with breathtaking views and an elite living experience.",
    gallery: [
      "https://picsum.photos/seed/ba1/1200/800",
      "https://picsum.photos/seed/ba2/1200/800",
      "https://picsum.photos/seed/ba3/1200/800"
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
      image: "https://picsum.photos/seed/agent3/200/200"
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
    image: "https://picsum.photos/seed/off4/1600/900",
    description: "One community. Five towers. Infinite luxury.",
    longDescription: "Sobha One is a masterfully planned development consisting of five interconnected towers. Overlooking a world-class golf course and the Dubai Creek, it offers a range of apartments from 1 to 4 bedrooms. The project emphasizes Sobha's signature quality and attention to detail, creating a holistic urban living environment.",
    gallery: [
      "https://picsum.photos/seed/s1/1200/800",
      "https://picsum.photos/seed/s2/1200/800",
      "https://picsum.photos/seed/s3/1200/800"
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
      image: "https://picsum.photos/seed/agent1/200/200"
    }
  }
];
