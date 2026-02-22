"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize, Bed, Bath, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  id: string;
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
  id,
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
    <div className="group relative bg-[#0a0a0a] overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#B8860B]/30 shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.85]"
        />
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
            <span className="text-white text-[9px] font-bold uppercase tracking-widest">{type}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <Link href={`/listings/${id}`} className="w-full">
            <Button className="w-full btn-copper h-12">View Details</Button>
          </Link>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <h3 className="font-headline text-xl font-bold tracking-wider text-white line-clamp-1">{title}</h3>
          <div className="flex items-center text-white/40 text-[10px] uppercase font-bold tracking-widest gap-2">
            <MapPin className="w-3 h-3 text-[#B8860B]" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-lg tracking-wider">{price}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/40">
              <Bed className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Beds</span>
            </div>
            <span className="text-sm font-light text-white">{beds}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/40">
              <Bath className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Baths</span>
            </div>
            <span className="text-sm font-light text-white">{baths}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/40">
              <Maximize className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Sq Ft</span>
            </div>
            <span className="text-sm font-light text-white">{sqft}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
