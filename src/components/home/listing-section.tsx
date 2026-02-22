"use client";

import React from "react";
import { PropertyCard } from "./property-card";
import { PROPERTIES } from "@/lib/properties";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ListingSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-[#B8860B] font-bold uppercase tracking-[0.4em] text-[10px] block">New Arrivals</span>
            <h2 className="font-headline text-3xl md:text-5xl font-light text-white tracking-wider">LATEST <span className="font-bold">LISTINGS</span></h2>
          </div>
          <Button variant="link" className="group text-[#B8860B] font-bold text-[10px] uppercase tracking-[0.2em] p-0 hover:no-underline">
            View all properties
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
