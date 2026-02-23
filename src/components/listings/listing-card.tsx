"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize, Bed, Bath, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Property } from "@/lib/properties";

export function ListingCard({
  id,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  image,
  type,
  listingType,
  agent
}: Property) {
  return (
    <div className="group relative bg-white overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl flex flex-col h-full border border-black/5">
      {/* Media Header */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Transaction Tag */}
        <div className="absolute top-4 left-4 z-10">
          <div className={cn(
            "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white",
            listingType === 'Buy' ? "bg-[#B8860B]" : "bg-[#333333]"
          )}>
            {listingType}
          </div>
        </div>

        {/* Property Type Tag */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span className="text-black text-[9px] font-bold uppercase tracking-widest">{type}</span>
          </div>
        </div>

        <Link href={`/listings/${id}`} className="absolute inset-0 z-0" />
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <Link href={`/listings/${id}`}>
            <h3 className="font-bold text-sm md:text-base text-black line-clamp-2 hover:text-[#B8860B] transition-colors leading-tight">
              {title}
            </h3>
          </Link>
          <div className="flex items-center text-muted-foreground text-[10px] font-medium gap-1.5">
            <MapPin className="w-3 h-3 text-[#B8860B]" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex items-center gap-4 text-black/60 border-y border-black/5 py-3">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{baths}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{sqft} <span className="text-[10px] font-normal">Sq Ft</span></span>
          </div>
        </div>

        {/* Price Strip */}
        <div className="bg-muted/30 -mx-5 px-5 py-3 mt-auto">
          <p className="text-lg font-bold text-black tracking-tight">{price}</p>
        </div>

        {/* Agent Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10">
              <Image src={agent.image} alt={agent.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">Listed By</span>
              <span className="text-[10px] font-bold text-black">{agent.name}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-black/10 hover:bg-[#B8860B] hover:text-white transition-all">
              <Phone className="w-3.5 h-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-green-500/20 hover:bg-green-500 hover:text-white transition-all">
              <MessageCircle className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
