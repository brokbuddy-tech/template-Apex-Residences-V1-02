"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Map, Sparkles } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { ConsultationDialog } from "./consultation-dialog";
import { OwnerRelationsDialog } from "./owner-relations-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HeroProps = {
  agencyName: string;
  ownerRelationsEmail?: string | null;
};

export function Hero({ agencyName, ownerRelationsEmail }: HeroProps) {
  const [activeTab, setActiveTab] = useState("manual");
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
              with <span className="font-bold">{agencyName}</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base font-light italic tracking-wider">
              "Precision, Performance, and Due Diligence at Your Service"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <ConsultationDialog>
              <Button className="btn-copper px-12 h-14">
                Leave a request
              </Button>
            </ConsultationDialog>
            <OwnerRelationsDialog agencyName={agencyName} ownerRelationsEmail={ownerRelationsEmail}>
              <Button className="btn-outline-white px-12 h-14">
                Already an owner?
              </Button>
            </OwnerRelationsDialog>
          </div>
        </div>

        {/* Right Widget */}
        <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
          <div className="glass-panel w-full max-w-[450px] p-8 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab("manual")}
                className={cn(
                  "flex-1 pb-4 text-[12px] uppercase font-bold tracking-[0.2em] transition-all",
                  activeTab === "manual" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-white/40"
                )}
              >
                Manual
              </button>
              <button 
                onClick={() => setActiveTab("ai")}
                className={cn(
                  "flex-1 pb-4 text-[12px] uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                  activeTab === "ai" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-white/40"
                )}
              >
                <Sparkles className={cn("w-3.5 h-3.5 transition-opacity", activeTab === "ai" ? "opacity-100" : "opacity-0")} />
                AI Search
              </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[300px] flex flex-col justify-between">
              {activeTab === "manual" ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Property Type</label>
                    <Select>
                      <SelectTrigger className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto pb-2 text-sm font-light text-white hover:border-[#B8860B] transition-colors focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Apartments, Penthouses, Villas" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10 text-white rounded-none">
                        <SelectItem value="apartments">Apartments</SelectItem>
                        <SelectItem value="penthouses">Penthouses</SelectItem>
                        <SelectItem value="villas">Villas</SelectItem>
                        <SelectItem value="mansions">Mansions</SelectItem>
                        <SelectItem value="townhouses">Townhouses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Bedrooms</label>
                      <Select>
                        <SelectTrigger className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto pb-2 text-sm font-light text-white hover:border-[#B8860B] transition-colors focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-white/10 text-white rounded-none">
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Bathrooms</label>
                      <Select>
                        <SelectTrigger className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto pb-2 text-sm font-light text-white hover:border-[#B8860B] transition-colors focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-white/10 text-white rounded-none">
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                          <SelectItem value="4">4 Bathrooms</SelectItem>
                          <SelectItem value="5">5+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
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
              ) : (
                <div className="space-y-6 h-full flex flex-col">
                  <div className="space-y-2 flex-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> Describe your dream home
                    </label>
                    <Textarea 
                      placeholder="e.g. A 4-bedroom modern villa in Palm Jumeirah with a private beach access and sunset views..."
                      className="bg-white/5 border-white/10 focus:border-[#B8860B] transition-colors rounded-none h-full min-h-[220px] text-white placeholder:text-white/20 resize-none font-light leading-relaxed"
                    />
                  </div>
                  <p className="text-[9px] text-white/40 italic font-light">
                    Our AI will analyze your request and suggest matching luxury properties from our exclusive portfolio.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-4 pt-8">
                <Button className="btn-copper w-full h-14 gap-2">
                  {activeTab === "manual" ? (
                    "Show Projects"
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Start AI Search
                    </>
                  )}
                </Button>
                <Button variant="outline" className="btn-outline-white w-full h-14 flex items-center justify-center gap-2">
                  <Map className="w-4 h-4" />
                  View Properties on Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
