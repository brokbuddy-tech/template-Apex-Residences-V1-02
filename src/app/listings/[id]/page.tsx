"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { PROPERTIES } from "@/lib/properties";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/home/consultation-dialog";
import { MapPin, Bed, Bath, Maximize, CheckCircle2 } from "lucide-react";

export default function ListingDetails() {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-headline font-bold">Listing Not Found</h1>
          <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="inline-block bg-[#B8860B] px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                {property.type}
              </div>
              <h1 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4 text-[#B8860B]" />
                <span className="text-sm uppercase tracking-widest font-bold">{property.location}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
                    <Bed className="w-4 h-4" /> Bedrooms
                  </div>
                  <p className="text-2xl font-light">{property.beds}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
                    <Bath className="w-4 h-4" /> Bathrooms
                  </div>
                  <p className="text-2xl font-light">{property.baths}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
                    <Maximize className="w-4 h-4" /> Area (Sq Ft)
                  </div>
                  <p className="text-2xl font-light">{property.sqft.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-bold uppercase tracking-widest text-[#B8860B]">Overview</h2>
                <p className="text-white/60 leading-relaxed text-lg font-light italic">
                  {property.description}
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-bold uppercase tracking-widest text-[#B8860B]">Amenities & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/80 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Enquiry */}
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 p-10 space-y-8 sticky top-32">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">Listing Price</p>
                  <p className="text-4xl font-bold text-[#B8860B]">{property.price}</p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10">
                  <ConsultationDialog>
                    <Button className="w-full btn-copper h-14">Enquire Now</Button>
                  </ConsultationDialog>
                  <Button variant="outline" className="w-full btn-outline-white h-14">Download Brochure</Button>
                </div>

                <div className="pt-8 space-y-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Assigned Expert</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden relative">
                       <Image src="https://picsum.photos/seed/agent1/100/100" alt="Agent" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest">Marcus Thorne</p>
                      <p className="text-[10px] text-[#B8860B] font-bold uppercase">Senior Portfolio Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
