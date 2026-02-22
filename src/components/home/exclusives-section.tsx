"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const EXCLUSIVES_DATA = [
  {
    id: 1,
    title: "THE TERRACES MARASI DRIVE",
    location: "Business Bay",
    image: PlaceHolderImages.find(img => img.id === "excl-1")?.imageUrl || "",
    features: [
      { label: "BUSINESS SPOT", value: "Perfect residence for businessmen and executives" },
      { label: "COMFORTABILITY", value: "Resort style living priorities and premium services" },
      { label: "PROPERTY RANGE", value: "Range of apartments, duplexes and penthouses" },
      { label: "VIEW", value: "Breathtaking views of Burj Khalifa" },
    ],
    summary: "Ideally located in the heart of Business Bay, this landmark development offers seamless connectivity to Downtown Dubai. Burj Khalifa and Dubai Mall are within walking distance, and the International Airport is just 15 minutes away.",
    handover: "June 30, 2024",
  },
  {
    id: 2,
    title: "SKYLINE VISTA RESIDENCES",
    location: "Downtown Dubai",
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
    features: [
      { label: "LUXURY FINISH", value: "Italian marble and premium hardwood flooring" },
      { label: "SMART HOME", value: "Fully integrated automation for lights and climate" },
      { label: "POOL DECK", value: "Private infinity pool overlooking the city skyline" },
      { label: "CONCIERGE", value: "24/7 dedicated lifestyle management services" },
    ],
    summary: "A masterpiece of modern architecture in Downtown Dubai, offering residents an unparalleled urban experience. Surrounded by the city's finest dining and entertainment venues.",
    handover: "December 15, 2024",
  }
];

export function ExclusivesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeItem = EXCLUSIVES_DATA[currentIndex];
  const nextItem = EXCLUSIVES_DATA[(currentIndex + 1) % EXCLUSIVES_DATA.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % EXCLUSIVES_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + EXCLUSIVES_DATA.length) % EXCLUSIVES_DATA.length);
  };

  return (
    <section className="bg-black py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h2 className="font-headline text-4xl md:text-5xl font-light tracking-[0.4em] text-white uppercase mb-4">
            EXCLUSIVES
          </h2>
          <p className="text-white/40 text-xs md:text-sm font-light italic tracking-[0.2em]">
            Discover the outstanding range of Dubai properties only with APEX RESIDENCES
          </p>
        </div>

        {/* Golden Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          
          {/* Left Column: Primary Visual (flex-2 equivalent) */}
          <div key={`img-${activeItem.id}`} className="lg:col-span-2 relative aspect-[3/4] overflow-hidden group animate-in fade-in duration-1000 zoom-in-105">
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 space-y-2">
              <div className="flex items-center gap-2 text-[#D1A08B]">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{activeItem.location}</span>
              </div>
              <h3 className="text-white font-headline text-2xl font-bold tracking-wider max-w-xs uppercase">
                {activeItem.title}
              </h3>
            </div>
          </div>

          {/* Center Column: Feature Details (flex-2 equivalent) */}
          <div key={`details-${activeItem.id}`} className="lg:col-span-2 flex flex-col justify-between py-6 space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-16">
              {activeItem.features.map((feature, idx) => (
                <div key={idx} className="space-y-4 relative group">
                  <h4 className="text-[#D1A08B] text-[10px] font-bold uppercase tracking-[0.3em]">
                    {feature.label}
                  </h4>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                    {feature.value}
                  </p>
                  <div className="absolute -bottom-8 left-0 w-full h-[1px] bg-white/10 group-even:hidden" />
                </div>
              ))}
            </div>

            {/* Summary & Handover */}
            <div className="space-y-8">
              <p className="text-white/40 text-sm font-light leading-loose tracking-wide">
                {activeItem.summary}
              </p>
              <div className="pt-8 border-t border-white/10">
                <p className="text-white text-xs font-bold uppercase tracking-[0.3em]">
                  Handover date: <span className="text-[#D1A08B]">{activeItem.handover}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-6 pt-8">
              <Button className="bg-[#D1A08B] hover:bg-[#D1A08B]/90 text-white rounded-none px-12 h-14 uppercase tracking-[0.3em] text-[10px] font-bold">
                Enquire now
              </Button>
              <Button variant="outline" className="border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/5 rounded-none px-12 h-14 uppercase tracking-[0.3em] text-[10px] font-bold bg-transparent">
                Learn more
              </Button>
            </div>
          </div>

          {/* Right Column: Peek-Ahead (flex-1 equivalent) */}
          <div key={`peek-${nextItem.id}`} className="hidden lg:block lg:col-span-1 relative h-full grayscale opacity-30 group cursor-pointer transition-all duration-1000 hover:opacity-50 animate-in fade-in slide-in-from-right-12" onClick={handleNext}>
            <Image
              src={nextItem.image}
              alt="Next Property"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-white text-[10px] font-bold uppercase tracking-[0.5em] -rotate-90 whitespace-nowrap">NEXT PROPERTY</span>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-10">
          <button 
            onClick={handlePrev}
            className="text-white/30 hover:text-[#D1A08B] transition-colors text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            PREV
          </button>
          
          <div className="text-white font-light tracking-[0.4em] text-xs">
            <span className="text-white font-bold">{currentIndex + 1}</span>
            <span className="mx-4 text-white/20">/</span>
            <span className="text-white/40">{EXCLUSIVES_DATA.length}</span>
          </div>

          <button 
            onClick={handleNext}
            className="text-white/30 hover:text-[#D1A08B] transition-colors text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            NEXT
          </button>
        </div>
      </div>
    </section>
  );
}
