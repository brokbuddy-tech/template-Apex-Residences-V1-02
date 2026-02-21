"use client";

import React from "react";
import Image from "next/image";
import { Heart, Maximize, Bed, Bath, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: string;
}

export function PropertyCard({
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  image,
  type,
}: PropertyCardProps) {
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Badge className="bg-primary/90 text-white border-none uppercase text-[10px] font-bold tracking-wider">
            {type}
          </Badge>
        </div>
        <button className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <Button variant="secondary" className="w-full font-bold">Quick View</Button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline text-xl font-bold line-clamp-1">{title}</h3>
          <span className="text-primary font-bold text-lg">{price}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-4 gap-1">
          <MapPin className="w-3 h-3 text-accent" />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-xs">
              <Bed className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">{beds}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Bath className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">{baths}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Maximize className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">{sqft}</span>
            </div>
          </div>
          <Button variant="link" className="p-0 h-auto text-primary font-bold text-xs uppercase tracking-widest hover:text-accent">
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}