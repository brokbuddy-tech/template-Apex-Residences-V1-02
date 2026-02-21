"use client";

import React from "react";
import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const PROPERTIES = [
  {
    id: 1,
    title: "The Zenith Penthouse",
    price: "$12,500,000",
    location: "Downtown Boulevard, Dubai",
    beds: 5,
    baths: 6,
    sqft: 8500,
    type: "Penthouse",
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
  },
  {
    id: 2,
    title: "Azure Beachfront Villa",
    price: "$8,250,000",
    location: "Palm Jumeirah, Dubai",
    beds: 4,
    baths: 5,
    sqft: 6200,
    type: "Villa",
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
  },
  {
    id: 3,
    title: "Minimalist Loft Mansion",
    price: "$5,900,000",
    location: "Emirates Hills, Dubai",
    beds: 4,
    baths: 4,
    sqft: 5800,
    type: "Mansion",
    image: PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
  },
];

export function FeaturedProperties() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Premium Listings</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary">Featured Properties</h2>
          </div>
          <Button variant="outline" className="group rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all">
            View All Properties
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}