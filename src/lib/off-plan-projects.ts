export interface PaymentStep {
  percentage: string;
  label: string;
}

export interface OffPlanProject {
  id: string;
  title: string;
  type: string;
  developer: string;
  permitNumber?: string;
  image: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  price: string;
  virtualTourUrl?: string | null;
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
    phone?: string;
    email?: string;
    whatsapp?: string;
    slug?: string;
  };
}
