"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg");

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || ""}
          alt={heroImage?.description || "Hero"}
          fill
          className="object-cover brightness-[0.6]"
          priority
          data-ai-hint={heroImage?.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background/20" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Elevate Your <span className="text-accent italic">Lifestyle</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow-md">
          Exclusive access to the world's most luxurious residential properties.
        </p>

        <div className="bg-background/95 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Type</label>
              <Select>
                <SelectTrigger className="border-none shadow-none focus:ring-0 text-sm font-semibold h-8 p-0">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villas">Villas</SelectItem>
                  <SelectItem value="apartments">Apartments</SelectItem>
                  <SelectItem value="penthouses">Penthouses</SelectItem>
                  <SelectItem value="townhouses">Townhouses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 text-left border-l pl-4 sm:border-l-0 sm:pl-0 lg:border-l lg:pl-4">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Location</label>
              <Select>
                <SelectTrigger className="border-none shadow-none focus:ring-0 text-sm font-semibold h-8 p-0">
                  <SelectValue placeholder="Dubai Marina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="palm">Palm Jumeirah</SelectItem>
                  <SelectItem value="marina">Dubai Marina</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="hills">Emirates Hills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 text-left border-l pl-4 lg:border-l lg:pl-4">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Bedrooms</label>
              <Select>
                <SelectTrigger className="border-none shadow-none focus:ring-0 text-sm font-semibold h-8 p-0">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 border-l pl-4">
              <div className="flex-1 space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-1">Budget</label>
                <div className="text-sm font-semibold truncate">From $2,000,000</div>
              </div>
              <Button size="icon" className="rounded-xl h-12 w-12 bg-primary hover:bg-primary/90">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}