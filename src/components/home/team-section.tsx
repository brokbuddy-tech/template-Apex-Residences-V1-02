"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const AGENTS = [
  {
    id: 1,
    name: "BEN THOMAS",
    title: "Head of Secondary",
    experience: "12 Years",
    languages: ["English", "Spanish"],
    imageId: "agent-1",
  },
  {
    id: 2,
    name: "ALEXANDER TUGUCHEV",
    title: "Senior Portfolio Manager",
    experience: "8 Years",
    languages: ["English", "Russian"],
    imageId: "agent-2",
  },
  {
    id: 3,
    name: "ELENA RODRIGUEZ",
    title: "Luxury Rental Specialist",
    experience: "10 Years",
    languages: ["Spanish", "French", "English"],
    imageId: "agent-3",
  },
  {
    id: 4,
    name: "MARCUS THORNE",
    title: "Off-Plan Investment Expert",
    experience: "15 Years",
    languages: ["English", "German"],
    imageId: "agent-4",
  },
];

export function TeamSection() {
  const [specialization, setSpecialization] = useState("");
  const [language, setLanguage] = useState("");

  const handleReset = () => {
    setSpecialization("");
    setLanguage("");
  };

  return (
    <section className="bg-black py-24 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Navigation & Content */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="space-y-4">
              <h2 className="font-headline text-2xl md:text-3xl font-thin tracking-[0.5em] text-white uppercase">
                FIND YOUR <br /> <span className="font-bold">PARTNER</span>
              </h2>
              <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed tracking-wide max-w-sm">
                Our team is highly experienced and knowledgeable across all aspects of the real estate industry. 
                We are ready to answer your questions in over 30 languages.
              </p>
            </div>

            {/* Interactive Filters */}
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-white/40">Specialization</label>
                  <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-10 uppercase text-[9px] tracking-widest focus:ring-0 focus:ring-offset-0 hover:border-[#B8860B]/50 transition-colors">
                      <SelectValue placeholder="ANY SPECIALIZATION" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white rounded-none">
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="off-plan">Off-Plan</SelectItem>
                      <SelectItem value="luxury">Luxury Rentals</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-white/40">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-10 uppercase text-[9px] tracking-widest focus:ring-0 focus:ring-offset-0 hover:border-[#B8860B]/50 transition-colors">
                      <SelectValue placeholder="ANY LANGUAGE" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white rounded-none">
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="russian">Russian</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <button 
                  onClick={handleReset}
                  className="mt-5 p-2 text-white/40 hover:text-[#B8860B] transition-colors border border-white/10 hover:border-[#B8860B]/50"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white hover:text-black rounded-none h-12 uppercase tracking-[0.4em] text-[9px] font-bold transition-all duration-500">
                SHOW ALL
              </Button>
            </div>
          </div>

          {/* Right Column: Expert Slider */}
          <div className="lg:col-span-7 relative animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {AGENTS.map((agent) => {
                  const agentImage = PlaceHolderImages.find(img => img.id === agent.imageId);
                  return (
                    <CarouselItem key={agent.id} className="pl-4 basis-full sm:basis-1/2 xl:basis-1/2 group">
                      <div className="relative aspect-[4/5] overflow-hidden md:grayscale md:hover:grayscale-0 transition-all duration-700">
                        <Image
                          src={agentImage?.imageUrl || ""}
                          alt={agent.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          data-ai-hint={agentImage?.imageHint}
                        />
                        {/* Metadata Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="space-y-2">
                            <p className="text-white text-[8px] font-bold uppercase tracking-[0.3em]">
                              {agent.title}
                            </p>
                            <h3 className="text-white text-lg font-headline font-bold tracking-widest uppercase">
                              {agent.name}
                            </h3>
                            <div className="pt-3 flex items-center justify-between border-t border-white/10 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              <div className="space-y-0.5">
                                <p className="text-white/40 text-[7px] uppercase tracking-widest">Experience</p>
                                <p className="text-white text-[9px] font-bold">{agent.experience}</p>
                              </div>
                              <div className="space-y-0.5 text-right">
                                <p className="text-white/40 text-[7px] uppercase tracking-widest">Languages</p>
                                <p className="text-white text-[9px] font-bold">{agent.languages.join(", ")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              
              {/* Navigation Controls */}
              <div className="flex gap-3 mt-6 justify-end lg:pr-4">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-none bg-transparent border-white/10 text-white hover:bg-[#B8860B] hover:border-[#B8860B] transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </CarouselPrevious>
                <CarouselNext className="static translate-y-0 h-10 w-10 rounded-none bg-transparent border-white/10 text-white hover:bg-[#B8860B] hover:border-[#B8860B] transition-all">
                  <ChevronRight className="w-4 h-4" />
                </CarouselNext>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
