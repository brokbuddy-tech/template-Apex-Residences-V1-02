"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const AREAS = [
  {
    id: 1,
    title: "Palm Jumeirah",
    count: "124 Properties",
    image: PlaceHolderImages.find(img => img.id === "area-1")?.imageUrl || "",
  },
  {
    id: 2,
    title: "Dubai Marina",
    count: "215 Properties",
    image: PlaceHolderImages.find(img => img.id === "area-2")?.imageUrl || "",
  },
  {
    id: 3,
    title: "Downtown Dubai",
    count: "189 Properties",
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
  },
  {
    id: 4,
    title: "Emirates Hills",
    count: "45 Properties",
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
  },
];

export function AreaGuides() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Neighborhood Expert</span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-4">Explore Our Areas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic">Discover the unique lifestyles and luxury amenities across Dubai's most prestigious districts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AREAS.map((area) => (
            <div key={area.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg">
              <Image
                src={area.image}
                alt={area.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">{area.count}</p>
                <h3 className="text-white font-headline text-2xl font-bold mb-4">{area.title}</h3>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary rounded-full uppercase text-[10px] font-bold tracking-widest h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Explore District
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}