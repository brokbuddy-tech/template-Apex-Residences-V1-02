"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Map } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export function Hero() {
  const [activeTab, setActiveTab] = useState("primary");
  const [currency, setCurrency] = useState("AED");
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || ""}
          alt="Dubai Skyline Night"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-32">
        {/* Left Content */}
        <div className="space-y-12 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="space-y-4">
            <h1 className="font-headline text-3xl md:text-4xl xl:text-5xl font-thin tracking-[0.1em] leading-tight text-white uppercase">
              Invest in <br />
              Luxury Living <br />
              with <span className="font-bold">Apex Residences</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base font-light italic tracking-wider">
              "Precision, Performance, and Due Diligence at Your Service"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button className="btn-copper px-12 h-14">
              Leave a request
            </Button>
            <Button className="btn-outline-white px-12 h-14">
              Already an owner?
            </Button>
          </div>
        </div>

        {/* Right Widget */}
        <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
          <div className="glass-panel w-full max-w-[450px] p-8 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab("primary")}
                className={cn(
                  "flex-1 pb-4 text-[10px] uppercase font-bold tracking-widest transition-all",
                  activeTab === "primary" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-white/40"
                )}
              >
                Primary
              </button>
              <button 
                onClick={() => setActiveTab("secondary")}
                className={cn(
                  "flex-1 pb-4 text-[10px] uppercase font-bold tracking-widest transition-all",
                  activeTab === "secondary" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-white/40"
                )}
              >
                Secondary
              </button>
            </div>

            {/* Filters */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Property Type</label>
                <div className="flex items-center justify-between border-b border-white/20 pb-2 cursor-pointer group">
                  <span className="text-sm font-light">Apartments, Penthouses, Villas</span>
                  <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Bedrooms</label>
                <div className="flex items-center justify-between border-b border-white/20 pb-2 cursor-pointer group">
                  <span className="text-sm font-light">Any</span>
                  <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-4 py-2">
                {['GBP', 'CNY', 'EUR', 'AED', 'USD'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={cn(
                      "text-[10px] font-bold tracking-widest transition-colors",
                      currency === curr ? "text-[#B8860B]" : "text-white/40 hover:text-white"
                    )}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Min Price</label>
                  <input type="text" placeholder="Min" className="bg-transparent border-b border-white/20 w-full pb-2 text-sm outline-none focus:border-[#B8860B] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Max Price</label>
                  <input type="text" placeholder="Max" className="bg-transparent border-b border-white/20 w-full pb-2 text-sm outline-none focus:border-[#B8860B] transition-colors" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <Button className="btn-copper w-full h-14">
                Show Projects
              </Button>
              <Button variant="outline" className="btn-outline-white w-full h-14 flex items-center justify-center gap-2">
                <Map className="w-4 h-4" />
                View Properties on Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
