
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROPERTIES } from "@/lib/properties";
import { OFF_PLAN_PROJECTS, OffPlanProject } from "@/lib/off-plan-projects";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/home/consultation-dialog";
import { MapPin, Bed, Bath, Maximize, CheckCircle2, QrCode, Phone, Mail, ArrowRight } from "lucide-react";
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
          <h1 className="text-4xl font-headline font-bold">Listing Not Found</h1>
          <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  // If it's an off-plan project, render the high-fidelity Off-Plan Detail Page
  if (offPlanProject) {
    return <OffPlanProjectDetail project={offPlanProject} />;
  }

  // Fallback to standard property detail (already exists)
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src={property!.image}
            alt={property!.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="inline-block bg-[#B8860B] px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                {property!.type}
              </div>
              <h1 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight">
                {property!.title}
              </h1>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4 text-[#B8860B]" />
                <span className="text-sm uppercase tracking-widest font-bold">{property!.location}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
                    <Bed className="w-4 h-4" /> Bedrooms
                  </div>
                  <p className="text-2xl font-light">{property!.beds}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
                    <Bath className="w-4 h-4" /> Bathrooms
                  </div>
                  <p className="text-2xl font-light">{property!.baths}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
                    <Maximize className="w-4 h-4" /> Area (Sq Ft)
                  </div>
                  <p className="text-2xl font-light">{property!.sqft.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-bold uppercase tracking-widest text-[#B8860B]">Overview</h2>
                <p className="text-white/60 leading-relaxed text-lg font-light italic">
                  {property!.description}
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-bold uppercase tracking-widest text-[#B8860B]">Amenities & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property!.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/80 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 p-10 space-y-8 sticky top-32">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">Listing Price</p>
                  <p className="text-4xl font-bold text-[#B8860B]">{property!.price}</p>
                </div>
                <div className="space-y-4 pt-8 border-t border-white/10">
                  <ConsultationDialog>
                    <Button className="w-full btn-copper h-14">Enquire Now</Button>
                  </ConsultationDialog>
                  <Button variant="outline" className="w-full btn-outline-white h-14">Download Brochure</Button>
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

function OffPlanProjectDetail({ project }: { project: OffPlanProject }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-[#D1A08B] selection:text-white">
      <Header />

      <main>
        {/* 1. Hero Showcase */}
        <section className="relative h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          
          <div className="relative z-10 text-center space-y-4 px-6">
            <h1 className="font-headline text-5xl md:text-7xl xl:text-8xl font-bold tracking-[0.1em] uppercase leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {project.title}
            </h1>
            <p className="text-[#D1A08B] text-lg md:text-xl font-light tracking-[0.4em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              {project.location}
            </p>
          </div>

          {/* Right-Aligned Sidebar Card (Sticky behavior handled in container) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-12 hidden xl:block z-30">
            <div className="w-[380px] bg-black/40 backdrop-blur-2xl border border-white/10 p-10 space-y-8">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Developer</p>
                  <p className="text-xl font-headline font-bold uppercase tracking-wider">{project.developer}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Price</p>
                  <p className="text-2xl font-bold text-[#D1A08B]">{project.price}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Handover</p>
                  <p className="text-xl font-bold">{project.handoverDate}</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Scan for</p>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">Digital Brochure</p>
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded-sm">
                   <QrCode className="w-full h-full text-black" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Visual Media Gallery */}
        <section className="py-24 max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.gallery[activeImage] || project.image}
                  alt="Project View"
                  fill
                  className="object-cover transition-all duration-1000"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative w-32 aspect-video overflow-hidden border-2 transition-all shrink-0",
                      activeImage === idx ? "border-[#D1A08B]" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col justify-center space-y-12">
              <div className="grid grid-cols-1 gap-10">
                <UtilityIcon label="Property Type" value={project.type} icon={Bed} />
                <UtilityIcon label="Pricing Starts" value={project.price} icon={Maximize} />
                <UtilityIcon label="Prime Location" value={project.location} icon={MapPin} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Project Narrative & Payment Plan */}
        <section className="py-32 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter leading-tight">
                  {project.description}
                </h2>
                <div className="w-20 h-[1px] bg-[#D1A08B]" />
              </div>
              <div className="text-white/50 font-light leading-relaxed text-lg italic">
                {project.longDescription}
              </div>
            </div>

            {/* Payment Plan Grid */}
            <div className="mt-32">
              <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-12">Payment Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.paymentPlan.map((step, idx) => (
                  <div key={idx} className="border border-white/5 bg-white/[0.01] p-12 space-y-4">
                    <span className="text-4xl md:text-6xl font-bold text-white tracking-tighter">{step.percentage}</span>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Amenities & Developer */}
        <section className="py-32 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-8">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  {project.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-white/70 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D1A08B]" />
                      <span className="uppercase text-[11px] tracking-widest font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-12 border-t border-white/5">
                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#D1A08B] mb-8">Developer</h3>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-headline font-bold uppercase tracking-[0.2em]">{project.developer}</span>
                  <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
                    VIEW DETAILS <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 border border-white/10 group overflow-hidden">
               <Image 
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2070&auto=format&fit=crop" 
                alt="Map Placeholder" 
                fill 
                className="object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" 
              />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-md px-6 py-3 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Interactive Map Location</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. Agent Consultation & Inquiry */}
        <section className="py-32 bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              
              {/* Agent Card */}
              <div className="lg:col-span-1 p-10 border border-[#D1A08B]/20 bg-white/[0.02] flex flex-col items-center text-center space-y-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#D1A08B]/40 p-1">
                   <Image src={project.agent.image} alt={project.agent.name} fill className="object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="text-xl font-headline font-bold uppercase tracking-wider">{project.agent.name}</h4>
                  <p className="text-[10px] font-bold text-[#D1A08B] uppercase tracking-widest mt-1">{project.agent.role}</p>
                </div>
                <div className="flex gap-4 w-full">
                  <Button variant="outline" className="flex-1 rounded-none border-white/10 h-12 uppercase text-[10px] font-bold tracking-widest gap-2">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-none border-white/10 h-12 uppercase text-[10px] font-bold tracking-widest gap-2">
                    <Mail className="w-3.5 h-3.5" /> Inquiry
                  </Button>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="lg:col-span-2 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl font-headline font-bold uppercase tracking-widest leading-tight">
                    Professional <span className="text-[#D1A08B]">Consultation</span>
                  </h2>
                  <p className="text-white/40 text-sm font-light italic tracking-widest">
                    Fill the form and our senior advisor will contact you shortly regarding <span className="text-white font-bold">{project.title}</span>.
                  </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Name</label>
                    <Input placeholder="John Doe" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#D1A08B] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Phone</label>
                    <Input placeholder="+971 50 123 4567" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#D1A08B] transition-all" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">E-mail</label>
                    <Input placeholder="john@example.com" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#D1A08B] transition-all" />
                  </div>
                  <div className="md:col-span-2 pt-6">
                    <Button className="w-full bg-[#D1A08B] text-white hover:bg-[#D1A08B]/90 rounded-none h-14 uppercase text-[11px] font-bold tracking-[0.4em] transition-all">
                      SEND INQUIRY
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function UtilityIcon({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-14 h-14 border border-white/10 flex items-center justify-center text-[#D1A08B] group-hover:bg-[#D1A08B] group-hover:text-white transition-all duration-500">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-bold uppercase tracking-wider">{value}</p>
      </div>
    </div>
  );
}
