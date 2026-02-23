
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, Property } from "@/lib/properties";
import { OFF_PLAN_PROJECTS, OffPlanProject } from "@/lib/off-plan-projects";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  Mail, 
  ArrowRight, 
  Share2, 
  Download,
  TrendingUp,
  School,
  Building2,
  MessageCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
      <Header />

      <main className="pt-24 w-full px-6 md:px-12">
        {/* 1. Hero Gallery & Primary Specs */}
        <section className="py-12 space-y-12">
          {/* Headline Area */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-headline font-thin tracking-widest leading-tight uppercase text-white/90">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
                <MapPin className="w-3.5 h-3.5 text-[#D1A08B]" />
                {property.location}
              </div>
            </div>
          </div>

          {/* Asymmetrical Image Gallery */}
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

          {/* Price Area - Positioned below Gallery */}
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
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* 2. Features & Specs Icons */}
            <div className="flex flex-wrap items-center gap-16 py-12 border-y border-white/5">
              <SpecIcon label="Bedrooms" value={property.beds.toString()} icon={Bed} />
              <SpecIcon label="Bathrooms" value={property.baths.toString()} icon={Bath} />
              <SpecIcon label="Total Area" value={`${property.sqft.toLocaleString()} sq.ft`} icon={Maximize} />
              <SpecIcon label="Furnishing" value={property.furnishing} icon={Building2} />
            </div>

            {/* 3. Description & Property Details */}
            <div className="space-y-12">
              <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Description</h2>
              <div className="text-white/50 font-light leading-relaxed text-xl italic space-y-6 max-w-4xl">
                <p>{property.description}</p>
              </div>

              {/* Technical Details Table */}
              <div className="pt-12">
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40 mb-10">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
                  <DetailRow label="Location" value={property.location} />
                  <DetailRow label="Property Type" value={property.type} />
                  <DetailRow label="Listing ID" value={property.id} />
                  <DetailRow label="Status" value="Available" />
                  <div className="md:col-span-2 pt-10 flex items-center justify-between border-t border-white/5 mt-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">RERA Permit Number</p>
                      <p className="text-lg font-bold tracking-widest text-white">{property.reraNumber}</p>
                    </div>
                    <div className="p-3 bg-white flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities Matrix */}
              <div className="pt-12">
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40 mb-10">Amenities & Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-white/10">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="p-8 border-r border-b border-white/10 flex items-center gap-4 group hover:bg-[#D1A08B]/5 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-[#D1A08B]" />
                      <span className="text-[12px] font-bold uppercase tracking-widest text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Location & Nearby Intelligence */}
            <div className="space-y-12">
              <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Location Intelligence</h2>
              <div className="relative aspect-video w-full bg-white/5 border border-white/10 group overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2070&auto=format&fit=crop" 
                  alt="Map Location" 
                  fill 
                  className="object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-md px-8 py-4 border border-[#D1A08B]/20">
                    <MapPin className="w-6 h-6 text-[#D1A08B] mx-auto mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Interactive Property Pin</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-[#D1A08B]">
                    <School className="w-5 h-5" />
                    <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase">Schools Nearby</h4>
                  </div>
                  <div className="space-y-6">
                    {property.nearbySchools.map((school, i) => (
                      <div key={i} className="flex justify-between items-center text-base font-light border-b border-white/5 pb-3">
                        <span className="text-white/60">{school.name}</span>
                        <span className="text-white/30 text-sm font-bold">{school.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-[#D1A08B]">
                    <MapPin className="w-5 h-5" />
                    <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase">Points of Interest</h4>
                  </div>
                  <div className="space-y-6">
                    {property.pointsOfInterest.map((poi, i) => (
                      <div key={i} className="flex justify-between items-center text-base font-light border-b border-white/5 pb-3">
                        <span className="text-white/60">{poi.name}</span>
                        <span className="text-white/30 text-sm font-bold">{poi.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Floor Plan */}
            <div className="space-y-8">
              <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Architectural Floor Plan</h2>
              <div className="relative aspect-[16/9] bg-white/[0.02] border border-white/5 flex items-center justify-center group overflow-hidden">
                <Image src={property.floorPlan} alt="Floor plan" fill className="object-contain p-12 opacity-80" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button className="btn-copper px-12 h-16 gap-2">
                      <Download className="w-5 h-5" />
                      Download High-Res PDF
                   </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              {/* Market Comparison Card */}
              <div className="glass-panel p-12 space-y-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#D1A08B]">
                    <TrendingUp className="w-4 h-4" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Market Context</p>
                  </div>
                  <h3 className="text-xl font-headline font-bold uppercase tracking-widest text-white">Area Intelligence</h3>
                </div>

                <div className="space-y-8 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Avg. Area Price</p>
                    <p className="text-2xl font-bold text-white">{property.marketStats.avgAreaPrice}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Price / sq.ft</p>
                    <p className="text-2xl font-bold text-white">{property.marketStats.pricePerSqFt}</p>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/10">
                   <p className="text-white/30 text-[10px] font-light leading-relaxed italic">
                    Market data is analyzed weekly to ensure precise valuation and ROI projections for Apex Residences clients.
                   </p>
                </div>
              </div>

              {/* Agent Floating Card */}
              <div className="border border-[#D1A08B]/20 bg-[#0a0a0a] p-12 flex flex-col items-center text-center space-y-8">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[#D1A08B]/40 p-1">
                   <Image src={property.agent.image} alt={property.agent.name} fill className="object-cover rounded-full" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-bold uppercase tracking-wider text-white">{property.agent.name}</h4>
                  <p className="text-[11px] font-bold text-[#D1A08B] uppercase tracking-widest">{property.agent.role}</p>
                </div>
                <div className="w-full pt-4 space-y-4">
                  <ConsultationDialog>
                    <Button className="w-full btn-copper h-14 gap-2 text-sm">
                      <MessageCircle className="w-5 h-5" /> Inquiry
                    </Button>
                  </ConsultationDialog>
                  <Button variant="outline" className="w-full btn-outline-white h-14 gap-2 text-sm">
                    <Phone className="w-5 h-5" /> Call Specialist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Similar Listings */}
        <section className="mt-40 pt-24 border-t border-white/5">
          <div className="space-y-16">
            <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Similar Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {similarProperties.map((prop) => (
                <ListingCard key={prop.id} {...prop} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function OffPlanProjectDetail({ project }: { project: OffPlanProject }) {
  const [activeImage, setActiveImage] = useState(0);

  const similarProjects = OFF_PLAN_PROJECTS.filter(p => p.id !== project.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-[#D1A08B] selection:text-white">
      <Header />

      <main className="w-full">
        {/* 1. Hero Showcase */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          
          <div className="relative z-10 text-center space-y-6 px-6">
            <h1 className="font-headline text-5xl md:text-8xl xl:text-9xl font-bold tracking-[0.1em] uppercase leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000 text-white">
              {project.title}
            </h1>
            <p className="text-[#D1A08B] text-xl md:text-2xl font-light tracking-[0.4em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              {project.location}
            </p>
          </div>
        </section>

        {/* 2. Visual Media Gallery */}
        <section className="py-24 w-full px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-8">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.gallery[activeImage] || project.image}
                  alt="Project View"
                  fill
                  className="object-cover transition-all duration-1000"
                />
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative w-40 aspect-video overflow-hidden border-2 transition-all shrink-0",
                      activeImage === idx ? "border-[#D1A08B]" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col justify-center space-y-16">
              <div className="grid grid-cols-1 gap-12">
                <SpecIcon label="Property Type" value={project.type} icon={Bed} />
                <SpecIcon label="Pricing Starts" value={project.price} icon={Maximize} />
                <SpecIcon label="Prime Location" value={project.location} icon={MapPin} />
              </div>

              <div className="pt-10 border-t border-white/5 space-y-10">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-[#D1A08B] group-hover:bg-[#D1A08B] group-hover:text-white transition-all duration-500">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">DLD PERMIT</p>
                    <p className="text-sm font-bold uppercase tracking-wider text-white">QR-76221-A9</p>
                  </div>
                </div>

                <button className="flex items-center gap-8 group w-full text-left">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-[#D1A08B] group-hover:bg-[#D1A08B] group-hover:text-white transition-all duration-500">
                    <Share2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">SHARE PROPERTY</p>
                    <p className="text-sm font-bold uppercase tracking-wider text-white">Send to contact</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Project Narrative & Payment Plan */}
        <section className="py-32 bg-white/[0.02]">
          <div className="w-full px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-10">
                <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tighter leading-tight text-white">
                  {project.description}
                </h2>
                <div className="w-24 h-[1px] bg-[#D1A08B]" />
              </div>
              <div className="text-white/50 font-light leading-relaxed text-xl italic max-w-3xl">
                {project.longDescription}
              </div>
            </div>

            {/* Payment Plan Grid */}
            <div className="mt-40">
              <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-16">Payment Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {project.paymentPlan.map((step, idx) => (
                  <div key={idx} className="border border-white/5 bg-white/[0.01] p-16 space-y-6">
                    <span className="text-6xl md:text-8xl font-bold text-white tracking-tighter">{step.percentage}</span>
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Amenities & Developer */}
        <section className="py-32 w-full px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="space-y-16">
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-10">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16">
                  {project.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-white/70 font-light">
                      <div className="w-2 h-2 rounded-full bg-[#D1A08B]" />
                      <span className="uppercase text-[12px] tracking-widest font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-16 border-t border-white/5">
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-10">Developer</h3>
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-headline font-bold uppercase tracking-[0.2em] text-white">{project.developer}</span>
                  <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-3">
                    VIEW DETAILS <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 border border-white/10 group overflow-hidden">
               <Image 
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2070&auto=format&fit=crop" 
                alt="Map Location" 
                fill 
                className="object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" 
              />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-md px-10 py-5 border border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white">Interactive Map Location</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. Agent Consultation & Inquiry */}
        <section className="py-40 bg-black border-t border-white/5">
          <div className="w-full px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
              
              {/* Agent Card */}
              <div className="lg:col-span-1 p-12 border border-[#D1A08B]/20 bg-white/[0.02] flex flex-col items-center text-center space-y-8">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-[#D1A08B]/40 p-1">
                   <Image src={project.agent.image} alt={project.agent.name} fill className="object-cover rounded-full" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-headline font-bold uppercase tracking-wider text-white">{project.agent.name}</h4>
                  <p className="text-[11px] font-bold text-[#D1A08B] uppercase tracking-widest mt-1">{project.agent.role}</p>
                </div>
                <div className="flex gap-6 w-full">
                  <Button variant="outline" className="flex-1 rounded-none border-white/10 h-14 uppercase text-[11px] font-bold tracking-widest gap-3 bg-transparent text-white">
                    <Phone className="w-4 h-4" /> Call
                  </Button>
                  <ConsultationDialog>
                    <Button variant="outline" className="flex-1 rounded-none border-white/10 h-14 uppercase text-[11px] font-bold tracking-widest gap-3 bg-transparent text-white">
                      <Mail className="w-4 h-4" /> Inquiry
                    </Button>
                  </ConsultationDialog>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-widest leading-tight text-white">
                    Professional <span className="text-[#D1A08B]">Consultation</span>
                  </h2>
                  <p className="text-white/40 text-base font-light italic tracking-widest max-w-2xl">
                    Fill the form and our senior advisor will contact you shortly regarding <span className="text-white font-bold">{project.title}</span>.
                  </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Name</label>
                    <Input placeholder="John Doe" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-14 text-lg text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#D1A08B] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Phone</label>
                    <Input placeholder="+971 50 123 4567" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-14 text-lg text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#D1A08B] transition-all" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">E-mail</label>
                    <Input placeholder="john@example.com" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-14 text-lg text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#D1A08B] transition-all" />
                  </div>
                  <div className="md:col-span-2 pt-10">
                    <Button className="w-full bg-[#D1A08B] text-white hover:bg-[#D1A08B]/90 rounded-none h-16 uppercase text-[12px] font-bold tracking-[0.4em] transition-all">
                      SEND INQUIRY
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Similar Projects */}
        <section className="py-24 w-full px-6 md:px-12 border-t border-white/5 mt-40">
          <div className="space-y-16">
            <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B]">Similar Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {similarProjects.map((proj) => (
                <div key={proj.id} className="group relative aspect-[4/5] overflow-hidden cursor-pointer border border-white/5 bg-[#0a0a0a]">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.7] group-hover:brightness-[0.9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 space-y-6">
                    <h3 className="text-white font-headline text-2xl font-bold tracking-widest uppercase leading-tight">{proj.title}</h3>
                    <Link href={`/listings/${proj.id}`} className="text-[#D1A08B] text-[11px] font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                      Explore <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SpecIcon({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 flex items-center justify-center text-[#D1A08B]">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</p>
        <p className="text-base font-bold text-white uppercase tracking-wider">{value}</p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/5 pb-3">
      <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{label}</span>
      <span className="text-base font-light text-white">{value}</span>
    </div>
  );
}
