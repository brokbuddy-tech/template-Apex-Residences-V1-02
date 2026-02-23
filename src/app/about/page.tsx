"use client";

import React from "react";
import Image from "next/image";
import { TeamSection } from "@/components/home/team-section";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const STATS = [
  { label: "AGENCIES WORLDWIDE", value: "1,000+" },
  { label: "TRANSACTIONS VOLUME", value: "AED 120B+" },
  { label: "ELITE CONSULTANTS", value: "500+" },
  { label: "SIGNATURE PROJECTS", value: "250+" },
];

const JOURNEY_STEPS = [
  {
    id: "01",
    title: "EXPERTISE",
    desc: "Our journey began with a singular focus on industry mastery. We analyze market cycles with scientific precision to protect and grow our clients' wealth.",
    imageId: "journey-expertise",
  },
  {
    id: "02",
    title: "STRATEGY",
    desc: "Beyond simple brokerage, we act as strategic advisors. Every signature address in our portfolio is vetted through a rigorous due-diligence framework.",
    imageId: "journey-strategy",
  },
  {
    id: "03",
    title: "CONNECTION",
    desc: "Luxury is personal. We've built a global network that connects high-net-worth individuals with off-market opportunities not found elsewhere.",
    imageId: "journey-connection",
  },
];

export default function AboutPage() {
  const leadershipImg = PlaceHolderImages.find(img => img.id === "about-hero")?.imageUrl || "";

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-[#D1A08B] selection:text-white">
      {/* 1. Hero: Leadership & Mission */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        <Image
          src={leadershipImg}
          alt="Apex Residences Leadership"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        
        <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl">
          <h1 className="font-headline text-3xl md:text-4xl xl:text-5xl font-thin tracking-[0.2em] uppercase leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            ABOUT <span className="font-bold">APEX RESIDENCES</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-16 max-w-4xl mx-auto border-t border-white/10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <p className="text-lg font-light italic text-white/90 leading-relaxed">
              "We provide discrete real estate services for the world's most discerning individuals, guided by precision and performance."
            </p>
            <p className="text-white/50 text-[13px] font-light leading-loose tracking-wide">
              Apex Residences is a global authority in luxury real estate. Our methodology combines deep market intelligence with an unwavering commitment to confidentiality and bespoke service. We don't just find houses; we secure signature assets.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Global Hubs Strip */}
      <section className="py-12 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
          {["DUBAI", "RIYADH", "LONDON", "SHENZHEN", "ZURICH"].map((city, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/40">{city}</span>
              {idx < 4 && <div className="w-8 h-[1px] bg-[#D1A08B]/30" />}
            </div>
          ))}
        </div>
      </section>

      {/*  timeline & Milestones: Zigzag Journey */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-40">
          {JOURNEY_STEPS.map((step, idx) => {
            const stepImage = PlaceHolderImages.find(img => img.id === step.imageId)?.imageUrl || "";
            return (
              <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative aspect-[4/3] overflow-hidden group ${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <Image 
                    src={stepImage} 
                    alt={step.title} 
                    fill 
                    className="object-cover transition-all duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
                </div>
                <div className="space-y-8">
                  <span className="text-6xl md:text-8xl font-bold text-[#D1A08B]/10 italic leading-none">{step.id}</span>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-headline text-[#D1A08B] tracking-[0.3em] uppercase">{step.title}</h3>
                    <p className="text-white/50 font-light text-lg leading-relaxed italic max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Team Discovery Section */}
      <TeamSection />

      {/* 5. Impact Statistics & Media */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-2 text-center">
                <p className="text-2xl md:text-4xl font-bold text-[#D1A08B] tracking-tighter leading-tight">{stat.value}</p>
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
