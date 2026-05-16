
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize, Bed, Bath, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Property } from "@/lib/properties";
import { toSocialUrl } from "@/lib/api";

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
  const whatsappHref = toSocialUrl('whatsapp', agent.whatsapp || agent.phone || null);

  return (
    <div className="group relative bg-[#0a0a0a] overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#B8860B]/30 shadow-2xl flex flex-col h-full">
      {/* Media Header */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.85]"
        />
        
        {/* Transaction Tag */}
        <div className="absolute top-4 left-4 z-10">
          <div className={cn(
            "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md",
            listingType === 'Buy' ? "bg-[#B8860B]" : "bg-[#333333]"
          )}>
            {listingType}
          </div>
        </div>

        {/* Property Type Tag */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
            <span className="text-white text-[9px] font-bold uppercase tracking-widest">{type}</span>
          </div>
        </div>

        <Link href={`/listings/${id}`} className="absolute inset-0 z-0" />
      </div>

      {/* Content Details */}
      <div className="p-8 flex flex-col flex-1 space-y-6">
        <div className="space-y-1">
          <Link href={`/listings/${id}`}>
            <h3 className="font-headline text-lg font-bold tracking-wider text-white line-clamp-2 hover:text-[#B8860B] transition-colors leading-tight">
              {title}
            </h3>
          </Link>
          <div className="flex items-center text-white/40 text-[9px] uppercase font-bold tracking-[0.2em] gap-1.5">
            <MapPin className="w-3 h-3 text-[#B8860B]" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Price Strip */}
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-xl tracking-wider">{price}</span>
        </div>

        {/* Metadata Row */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/40">
              <Bed className="w-3 h-3" />
              <span className="text-[9px] uppercase font-bold tracking-widest">Beds</span>
            </div>
            <span className="text-sm font-light text-white">{beds}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/40">
              <Bath className="w-3 h-3" />
              <span className="text-[9px] uppercase font-bold tracking-widest">Baths</span>
            </div>
            <span className="text-sm font-light text-white">{baths}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/40">
              <Maximize className="w-3 h-3" />
              <span className="text-[9px] uppercase font-bold tracking-widest">Sq Ft</span>
            </div>
            <span className="text-sm font-light text-white">{sqft.toLocaleString()}</span>
          </div>
        </div>

        {/* Agent Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
              <Image src={agent.image} alt={agent.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest">Expert Consultant</span>
              {agent.slug ? (
                <Link href={`/agents/${agent.slug}`} className="text-[10px] font-bold text-white uppercase tracking-widest hover:text-[#B8860B] transition-colors">
                  {agent.name}
                </Link>
              ) : (
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{agent.name}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button asChild={Boolean(agent.phone)} variant="outline" size="icon" className="w-9 h-9 rounded-none border-white/10 text-white hover:bg-[#B8860B] hover:border-[#B8860B] hover:text-white transition-all bg-transparent">
              {agent.phone ? (
                <a href={`tel:${agent.phone}`} aria-label={`Call ${agent.name}`}>
                  <Phone className="w-4 h-4" />
                </a>
              ) : (
                <span>
                  <Phone className="w-4 h-4" />
                </span>
              )}
            </Button>
            <Button asChild={Boolean(whatsappHref)} variant="outline" size="icon" className="w-9 h-9 rounded-none border-white/10 text-white hover:bg-green-600/20 hover:border-green-600 hover:text-green-500 transition-all bg-transparent">
              {whatsappHref ? (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${agent.name}`}>
                  <MessageCircle className="w-4 h-4" />
                </a>
              ) : (
                <span>
                  <MessageCircle className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
