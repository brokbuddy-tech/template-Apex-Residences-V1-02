"use client";

import React from "react";
import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const PROPERTIES = [
  {
    id: 1,
    title: "Zenith Sky Villa",
    price: "AED 45,000,000",
    location: "Burj Khalifa District, Downtown",
    beds: 5,
    baths: 6,
    sqft: 9200,
    type: "Penthouse",
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
  },
  {
    id: 2,
    title: "Azure Shore Mansion",
    price: "AED 32,500,000",
    location: "Palm Jumeirah East Crescent",
    beds: 6,
    baths: 7,
    sqft: 12400,
    type: "Villa",
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
  },
  {
    id: 3,
    title: "Eclipse Residence",
    price: "AED 18,900,000",
    location: "Emirates Hills Gated District",
    beds: 4,
    baths: 5,
    sqft: 7800,
    type: "Mansion",
    image: PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
  },
];

export function FeaturedProperties() {
  return (
    <section className="py-32 px-6 md:px-12 bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-[#B8860B] font-bold uppercase tracking-[0.4em] text-[10px] block">Exclusive Portfolio</span>
            <h2 className="font-headline text-4xl md:text-5xl font-light text-white tracking-wider">Signature <span className="font-bold">Projects</span></h2>
          </div>
          <Button variant="link" className="group text-[#B8860B] font-bold text-[10px] uppercase tracking-[0.2em] p-0 hover:no-underline">
            Explore All Listings
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}