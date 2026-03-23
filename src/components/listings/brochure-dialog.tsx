"use client";

import React from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  QrCode,
  Printer,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { Property } from "@/lib/properties";
import { OffPlanProject } from "@/lib/off-plan-projects";

interface BrochureDialogProps {
  property: Property | OffPlanProject;
  children: React.ReactNode;
}

export function BrochureDialog({ property, children }: BrochureDialogProps) {
  // Common data mapping
  const title = property.title;
  const location = property.location;
  const price = property.price;
  const heroImage = 'image' in property ? property.image : property.gallery?.[0] || property.image;
  const gallery = property.gallery ? property.gallery.slice(0, 6) : [];
  const description = property.description;
  const dldPermit = 'reraNumber' in property ? property.reraNumber : "238290231";
  const features = 'features' in property ? property.features : property.amenities;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-5xl p-0 bg-[#f8f8f8] border-none overflow-hidden rounded-none h-[95vh] flex flex-col z-[100]">
        <DialogHeader className="p-6 bg-white flex-row justify-between items-center border-b shrink-0 space-y-0">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">Brochure Preview</DialogTitle>
            <div className="h-4 w-[1px] bg-black/10" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-black">{title}</span>
          </div>
          <div className="flex gap-3">
            <Button onClick={handlePrint} size="sm" variant="outline" className="gap-2 h-10 px-6 text-[10px] font-bold uppercase tracking-widest border-black/10 hover:bg-black hover:text-white transition-all">
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto p-12 bg-muted/30 print:p-0 print:bg-white">
          {/* A4 Container */}
          <div className="w-full max-w-[800px] mx-auto bg-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] aspect-[1/1.414] flex flex-col print:shadow-none print:w-full print:max-w-none">
            
            {/* Tier 1: Identity & Hero (50%) */}
            <div className="relative h-[50%] w-full flex flex-col shrink-0">
              {/* Top Banner */}
              <div className="flex h-[15%] w-full shrink-0">
                <div className="bg-[#F2F2F2] flex-1 flex flex-col justify-center px-10">
                  <span className="text-[9px] font-bold tracking-[0.5em] text-black/30 uppercase mb-1">EXCLUSIVE HOUSE FOR SALE</span>
                  <span className="text-sm font-bold tracking-[0.2em] text-black uppercase font-headline">{location}</span>
                </div>
                <div className="bg-black w-[35%] flex items-center justify-center px-6">
                   <div className="flex items-center gap-3">
                    <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 10L10 90H30L50 50L70 90H90L50 10Z" fill="#B8860B" />
                    </svg>
                    <span className="text-white font-headline text-[11px] font-bold tracking-[0.3em] uppercase leading-tight">
                      APEX <br/> <span className="font-light">RESIDENCES</span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Hero Visual */}
              <div className="relative flex-grow">
                <Image 
                  src={heroImage} 
                  alt={title} 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Price Tag Overlay */}
                <div className="absolute bottom-6 left-10 bg-black/80 backdrop-blur-md px-6 py-3 border-l-4 border-[#B8860B]">
                  <span className="text-white font-headline text-lg font-bold tracking-widest uppercase">{price}</span>
                </div>
              </div>
            </div>

            {/* Tier 2: The Detail Strip (50%) */}
            <div className="flex-grow w-full flex">
              {/* Left Data Column (Technical & Narrative) */}
              <div className="flex-grow p-10 flex flex-col gap-8 overflow-hidden">
                {/* 2x3 Grid of Detail Shots */}
                <div className="grid grid-cols-3 gap-3 aspect-[3/1.4] shrink-0">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative w-full h-full bg-muted overflow-hidden">
                      <Image src={img} alt={`Detail ${i+1}`} fill className="object-cover" />
                    </div>
                  ))}
                  {/* Fill remaining slots if gallery is small */}
                  {Array.from({ length: Math.max(0, 6 - gallery.length) }).map((_, i) => (
                    <div key={`fill-${i}`} className="relative w-full h-full bg-[#f8f8f8] border border-black/5" />
                  ))}
                </div>

                {/* Features & Amenities Block */}
                <div className="space-y-4 shrink-0">
                   <div className="flex items-center gap-4">
                    <h3 className="font-headline text-[10px] font-bold tracking-[0.3em] uppercase text-black">FEATURES & AMENITIES</h3>
                    <div className="h-[1px] flex-grow bg-black/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {features.slice(0, 8).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#B8860B]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-black/70">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Editorial Narrative */}
                <div className="space-y-4 flex-grow overflow-hidden">
                  <div className="flex items-center gap-4">
                    <h3 className="font-headline text-[10px] font-bold tracking-[0.3em] uppercase text-black">PROPERTY OVERVIEW</h3>
                    <div className="h-[1px] flex-grow bg-black/10" />
                  </div>
                  <div className="text-[10px] leading-relaxed text-black/60 font-serif italic text-justify line-clamp-[12]">
                    <p className="mb-2">{description}</p>
                    <p>Designed for the world's most discerning individuals, this residence combines architectural mastery with unrivaled performance. Every signature address in our portfolio is vetted through a rigorous due-diligence framework to protect and grow our clients' wealth.</p>
                  </div>
                </div>
              </div>

              {/* Right Contact Sidebar (High-Contrast Black) */}
              <div className="w-[35%] bg-black p-10 flex flex-col justify-between text-white shrink-0">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="font-headline text-sm font-bold tracking-[0.4em] uppercase text-[#B8860B] italic">Contact us:</h4>
                    <div className="w-8 h-[1px] bg-[#B8860B]" />
                  </div>
                  
                  <div className="space-y-8">
                    <ContactItem icon={Phone} label="+971 4 123 4567" />
                    <ContactItem icon={Mail} label="concierge@apexresidences.com" />
                    <ContactItem icon={MapPin} label="Dubai Marina, UAE" />
                  </div>
                </div>

                <div className="space-y-8 flex flex-col items-center border-t border-white/10 pt-10">
                  <div className="bg-white p-3 shadow-xl">
                    <QrCode className="w-20 h-20 text-black" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/30">DLD PERMIT NO</p>
                    <p className="text-sm font-bold tracking-[0.2em] text-white uppercase font-headline">{dldPermit}</p>
                  </div>
                  <div className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#B8860B] border-b border-[#B8860B]/20 pb-1">
                    APEXRESIDENCES.COM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ContactItem({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="w-9 h-9 rounded-none border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] shrink-0 transition-colors group-hover:bg-[#B8860B] group-hover:text-black">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/80 leading-relaxed break-all">{label}</span>
      </div>
    </div>
  );
}