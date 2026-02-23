
"use client";

import React from "react";
import Image from "next/image";
import { Shield, TrendingUp, Gem, HeartHandshake, Microscope, Landmark } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const SERVICES_LIST = [
  {
    icon: Microscope,
    title: "Precision Valuation",
    description: "Our proprietary methodology for property appraisal combines real-time market data with architectural integrity analysis.",
  },
  {
    icon: Landmark,
    title: "Asset Management",
    description: "Maximizing ROI for high-net-worth investors through strategic portfolio optimization and high-yield management.",
  },
  {
    icon: Gem,
    title: "Exclusive Acquisitions",
    description: "Access to off-market signature addresses and pre-launch units not available to the general public.",
  },
  {
    icon: Shield,
    title: "Due Diligence",
    description: "Rigorous vetting of developers, title deeds, and structural reports to ensure your investment is secured.",
  },
  {
    icon: HeartHandshake,
    title: "Lifestyle Concierge",
    description: "Bespoke relocation services, interior design coordination, and private staff recruitment for your new residence.",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description: "Weekly performance reports and area liquidity analysis to keep our clients ahead of market cycles.",
  },
];

export default function ServicesPage() {
  const serviceHeroImg = PlaceHolderImages.find(img => img.id === "journey-strategy")?.imageUrl || "";

  return (
    <div className="min-h-screen bg-black text-white font-body pb-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-white/5">
        <Image
          src={serviceHeroImg}
          alt="Luxury Services"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        
        <div className="relative z-10 text-center space-y-4">
          <h1 className="font-headline text-4xl md:text-6xl font-thin tracking-[0.4em] uppercase leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
            OUR <span className="font-bold text-[#B8860B]">SERVICES</span>
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-light tracking-[0.2em] italic uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            Precision, Performance, and Professionalism
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-white/10">
            {SERVICES_LIST.map((service, idx) => (
              <div key={idx} className="p-12 md:p-16 border-r border-b border-white/10 group hover:bg-[#B8860B]/5 transition-all duration-500">
                <service.icon className="w-10 h-10 text-[#B8860B] mb-8 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-headline text-xl font-bold tracking-[0.2em] uppercase mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-white/40 font-light leading-relaxed tracking-wide text-sm italic">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
