"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, Property } from "@/lib/properties";
import { OFF_PLAN_PROJECTS, OffPlanProject } from "@/lib/off-plan-projects";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/home/consultation-dialog";
import { ListingCard } from "@/components/listings/listing-card";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  CheckCircle2, 
  QrCode, 
  Phone, 
  Share2, 
  Download,
  TrendingUp,
  School,
  Building2,
  MessageCircle,
} from "lucide-react";

export default function ListingDetails() {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id);
  const offPlanProject = OFF_PLAN_PROJECTS.find(p => p.id === id);

  if (!property && !offPlanProject) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-headline text-white font-bold">Listing Not Found</h1>
          <Button variant="outline" className="border-white text-white" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (offPlanProject) {
    return <OffPlanProjectDetail project={offPlanProject} />;
  }

  return <PropertyDetail property={property!} />;
}

function PropertyDetail({ property }: { property: Property }) {
  const [activeImage, setActiveImage] = useState(0);
  const similarProperties = PROPERTIES.filter(p => p.id !== property.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-[#D1A08B] selection:text-white pb-32">
      <main className="pt-24 w-full px-6 md:px-12">
        {/* 1. Hero Gallery */}
        <section className="py-12 space-y-12">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-headline font-thin tracking-widest leading-tight uppercase text-white/90">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
              <MapPin className="w-3.5 h-3.5 text-[#D1A08B]" />
              {property.location}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 aspect-[16/10] md:aspect-[16/7]">
            <div className="md:col-span-3 relative group overflow-hidden">
              <Image 
                src={property.gallery[activeImage]} 
                alt={property.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="hidden md:flex flex-col gap-6">
              {property.gallery.filter((_, i) => i !== activeImage).slice(0, 2).map((img, idx) => (
                <div key={idx} className="relative flex-1 group overflow-hidden cursor-pointer" onClick={() => setActiveImage(property.gallery.indexOf(img))}>
                  <Image src={img} alt="Property view" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex items-center justify-between bg-white/[0.02] border border-white/5 p-8 md:px-12">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Listing Price</p>
              <p className="text-4xl md:text-5xl font-bold text-[#D1A08B]">{property.price}</p>
            </div>
            <button className="w-14 h-14 border border-[#D1A08B]/20 flex items-center justify-center text-[#D1A08B] hover:bg-[#D1A08B] hover:text-white transition-all duration-500">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <div className="flex flex-wrap items-center gap-16 py-12 border-y border-white/5">
              <SpecIcon label="Bedrooms" value={property.beds.toString()} icon={Bed} />
              <SpecIcon label="Bathrooms" value={property.baths.toString()} icon={Bath} />
              <SpecIcon label="Total Area" value={`${property.sqft.toLocaleString()} sq.ft`} icon={Maximize} />
              <SpecIcon label="Furnishing" value={property.furnishing} icon={Building2} />
            </div>

            <div className="space-y-12">
              <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Description</h2>
              <p className="text-white/50 font-light leading-relaxed text-xl italic">{property.description}</p>
              
              <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
                <DetailRow label="Location" value={property.location} />
                <DetailRow label="Property Type" value={property.type} />
                <DetailRow label="Listing ID" value={property.id} />
                <DetailRow label="Status" value="Available" />
                <div className="md:col-span-2 pt-10 flex items-center justify-between border-t border-white/5 mt-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">RERA Permit</p>
                    <p className="text-lg font-bold tracking-widest text-white">{property.reraNumber}</p>
                  </div>
                  <div className="p-3 bg-white"><QrCode className="w-16 h-16 text-black" /></div>
                </div>
              </div>

              <div className="pt-12 grid grid-cols-2 md:grid-cols-4 border-l border-t border-white/10">
                {property.features.map((f, i) => (
                  <div key={i} className="p-8 border-r border-b border-white/10 flex items-center gap-4 hover:bg-[#D1A08B]/5">
                    <CheckCircle2 className="w-5 h-5 text-[#D1A08B]" />
                    <span className="text-[12px] font-bold uppercase tracking-widest text-white/70">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Location Intelligence</h2>
              <div className="relative aspect-video w-full bg-white/5 border border-white/10 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2070&auto=format&fit=crop" alt="Map" fill className="object-cover opacity-30 md:grayscale" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-md px-8 py-4 border border-[#D1A08B]/20 flex flex-col items-center">
                    <MapPin className="w-6 h-6 text-[#D1A08B] mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Interactive Pin</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <NeighborhoodList title="Schools Nearby" items={property.nearbySchools} icon={School} />
                <NeighborhoodList title="Points of Interest" items={property.pointsOfInterest} icon={MapPin} />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Floor Plan</h2>
              <div className="relative aspect-[16/9] bg-white/[0.02] border border-white/5 flex items-center justify-center group">
                <Image src={property.floorPlan} alt="Floor plan" fill className="object-contain p-12 opacity-80" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button className="btn-copper px-12 h-16 gap-2"><Download className="w-5 h-5" /> Download PDF</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="border border-[#D1A08B]/20 bg-[#0a0a0a] p-12 flex flex-col items-center text-center space-y-8">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[#D1A08B]/40 p-1">
                  <Image src={property.agent.image} alt={property.agent.name} fill className="object-cover rounded-full md:grayscale group-hover:grayscale-0" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-bold uppercase tracking-wider text-white">{property.agent.name}</h4>
                  <p className="text-[11px] font-bold text-[#D1A08B] uppercase tracking-widest">{property.agent.role}</p>
                </div>
                <div className="w-full pt-4 space-y-4">
                  <ConsultationDialog>
                    <Button className="w-full btn-copper h-14 gap-2 text-sm"><MessageCircle className="w-5 h-5" /> Inquiry</Button>
                  </ConsultationDialog>
                  <Button variant="outline" className="w-full btn-outline-white h-14 gap-2 text-sm"><Phone className="w-5 h-5" /> Call Specialist</Button>
                </div>
              </div>

              <div className="glass-panel p-12 space-y-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#D1A08B]"><TrendingUp className="w-4 h-4" /><p className="text-[10px] font-bold uppercase tracking-[0.3em]">Market Context</p></div>
                  <h3 className="text-xl font-headline font-bold uppercase tracking-widest text-white">Area Intelligence</h3>
                </div>
                <div className="space-y-8 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-end"><p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Avg. Area Price</p><p className="text-2xl font-bold text-white">{property.marketStats.avgAreaPrice}</p></div>
                  <div className="flex justify-between items-end"><p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Price / sq.ft</p><p className="text-2xl font-bold text-white">{property.marketStats.pricePerSqFt}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-40 pt-24 border-t border-white/5">
          <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-16">Similar Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {similarProperties.map(p => <ListingCard key={p.id} {...p} />)}
          </div>
        </section>
      </main>
    </div>
  );
}

function OffPlanProjectDetail({ project }: { project: OffPlanProject }) {
  const similarProjects = OFF_PLAN_PROJECTS.filter(p => p.id !== project.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white font-body pb-32">
      <main className="pt-24 w-full px-6 md:px-12">
        <section className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-headline font-thin tracking-widest leading-tight uppercase text-white/90">
                {project.title}
              </h1>
              <div className="flex items-center gap-2 text-[#D1A08B] text-xs font-bold uppercase tracking-[0.3em]">
                <MapPin className="w-4 h-4" /> {project.location}
              </div>
            </div>
            <p className="text-white/50 text-xl font-light leading-relaxed italic max-w-2xl">{project.longDescription}</p>
            <div className="pt-8 flex flex-wrap gap-6">
              <ConsultationDialog>
                <Button className="btn-copper px-12 h-16 uppercase text-xs font-bold tracking-[0.4em]">Register Interest</Button>
              </ConsultationDialog>
              <Button variant="outline" className="btn-outline-white px-12 h-16 uppercase text-xs font-bold tracking-[0.4em]">Download Brochure</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={project.image} alt={project.title} fill className="object-cover md:grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </section>

        <section className="py-24 border-t border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Highlights</h3>
                <ul className="space-y-4">
                  {project.amenities.map((a, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/60 text-sm font-light uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 text-[#D1A08B]" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Payment Plan</h3>
                <div className="space-y-4">
                  {project.paymentPlan.map((p, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{p.label}</span>
                      <span className="text-[#D1A08B] font-bold">{p.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="border border-[#D1A08B]/20 bg-[#0a0a0a] p-12 flex flex-col items-center text-center space-y-8">
               <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[#D1A08B]/40 p-1">
                  <Image src={project.agent.image} alt={project.agent.name} fill className="object-cover rounded-full md:grayscale hover:grayscale-0" />
               </div>
               <div className="space-y-2">
                 <h4 className="text-2xl font-headline font-bold uppercase tracking-wider text-white">{project.agent.name}</h4>
                 <p className="text-[11px] font-bold text-[#D1A08B] uppercase tracking-widest">{project.agent.role}</p>
               </div>
               <ConsultationDialog>
                 <Button className="w-full btn-copper h-14 uppercase text-[10px] font-bold tracking-widest">Inquiry</Button>
               </ConsultationDialog>
            </div>
          </div>
        </section>

        <section className="mt-40 pt-24 border-t border-white/5">
          <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-16">Similar Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {similarProjects.map(p => (
              <Link key={p.id} href={`/listings/${p.id}`} className="group relative aspect-[4/5] overflow-hidden border border-white/5 bg-[#0a0a0a]">
                <Image src={p.image} alt={p.title} fill className="object-cover brightness-50 md:grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                   <h3 className="text-white font-headline text-lg font-bold tracking-widest uppercase">{p.title}</h3>
                   <p className="text-[#D1A08B] text-[9px] font-bold uppercase tracking-widest mt-2">{p.developer}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function SpecIcon({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 flex items-center justify-center text-[#D1A08B]"><Icon className="w-6 h-6" /></div>
      <div>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</p>
        <p className="text-base font-bold text-white uppercase tracking-wider">{value}</p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/5 pb-2">
      <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{label}</span>
      <span className="text-base font-light text-white">{value}</span>
    </div>
  );
}

function NeighborhoodList({ title, items, icon: Icon }: { title: string; items: any[]; icon: any }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 text-[#D1A08B]"><Icon className="w-5 h-5" /><h4 className="text-[10px] font-bold tracking-[0.3em] uppercase">{title}</h4></div>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-base font-light border-b border-white/5 pb-3">
            <span className="text-white/60">{item.name}</span>
            <span className="text-white/30 text-sm font-bold">{item.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
