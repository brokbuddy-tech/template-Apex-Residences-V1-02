"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROPERTIES, Property } from "@/lib/properties";
import { OFF_PLAN_PROJECTS, OffPlanProject } from "@/lib/off-plan-projects";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/home/consultation-dialog";
import { BrochureDialog } from "@/components/listings/brochure-dialog";
import { ListingCard } from "@/components/listings/listing-card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Mail,
  Facebook,
  Linkedin,
  Images,
  ChevronLeft,
  ChevronRight,
  FileText,
  Copy
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ListingDetails() {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id);
  const offPlanProject = OFF_PLAN_PROJECTS.find(p => p.id === id);

  if (!property && !offPlanProject) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-headline text-white font-bold">Listing Not Found</h1>
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { toast } = useToast();
  const similarProperties = PROPERTIES.filter(p => p.id !== property.id).slice(0, 4);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "Link Copied",
      description: "The listing URL has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-[#D1A08B] selection:text-white pb-32 w-full">
      <main className="pt-24 w-full">
        {/* 1. Hero Gallery */}
        <section className="px-6 md:px-12 py-12 space-y-12">
          <div className="space-y-4 text-left">
            <h1 className="text-xl md:text-3xl font-headline font-thin tracking-widest leading-tight uppercase text-white/90">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
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
              
              {/* Mobile Slide Controls */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:hidden z-20">
                <button 
                  onClick={() => setActiveImage((prev) => (prev - 1 + property.gallery.length) % property.gallery.length)}
                  className="w-10 h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white rounded-full border border-white/10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveImage((prev) => (prev + 1) % property.gallery.length)}
                  className="w-10 h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white rounded-full border border-white/10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile View All Button */}
              <div className="absolute bottom-4 right-4 md:hidden z-20">
                <Button 
                  onClick={() => setIsGalleryOpen(true)}
                  className="bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-none h-10 px-4 gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black/80 transition-all"
                >
                  <Images className="w-4 h-4" />
                  View all {property.gallery.length} photos
                </Button>
              </div>
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

          <div className="w-full flex items-center justify-start gap-12 bg-white/[0.02] border border-white/5 p-6 md:px-10 mt-8">
            <div className="space-y-1 text-left">
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Listing Price</p>
              <p className="text-xl md:text-4xl font-bold text-[#D1A08B]">{property.price}</p>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-12 h-12 border border-[#D1A08B]/20 flex items-center justify-center text-[#D1A08B] hover:bg-[#D1A08B] hover:text-white transition-all duration-500">
                  <Share2 className="w-5 h-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black border-white/10 text-white rounded-none p-4" align="start">
                <div className="space-y-4">
                  <h4 className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#D1A08B]">Share Listing</h4>
                  <div className="flex gap-2">
                    <Input 
                      readOnly 
                      value={currentUrl} 
                      className="h-10 bg-white/5 border-white/10 rounded-none text-xs focus:ring-0"
                    />
                    <Button 
                      size="sm" 
                      className="btn-copper h-10 px-4 gap-2"
                      onClick={handleCopyLink}
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </section>

        <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <div className="flex flex-wrap items-center gap-10 py-10 border-y border-white/5">
              <SpecIcon label="Bedrooms" value={property.beds.toString()} icon={Bed} />
              <SpecIcon label="Bathrooms" value={property.baths.toString()} icon={Bath} />
              <SpecIcon label="Total Area" value={`${property.sqft.toLocaleString()} sq.ft`} icon={Maximize} />
              <SpecIcon label="Furnishing" value={property.furnishing} icon={Building2} />
            </div>

            <div className="space-y-10">
              <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B]">Description</h2>
              <p className="text-white/50 font-light leading-relaxed text-lg italic">{property.description}</p>
              
              <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                <DetailRow label="Location" value={property.location} />
                <DetailRow label="Property Type" value={property.type} />
                <DetailRow label="Listing ID" value={property.id} />
                <DetailRow label="Status" value="Available" />
                <div className="md:col-span-2 pt-10 flex items-center justify-between border-t border-white/5 mt-6">
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">RERA Permit</p>
                    <p className="text-xl font-bold tracking-widest text-white">{property.reraNumber}</p>
                  </div>
                  <div className="p-3 bg-white"><QrCode className="w-16 h-16 text-black" /></div>
                </div>
              </div>

              <div className="pt-10 grid grid-cols-2 md:grid-cols-4 border-l border-t border-white/10">
                {property.features.map((f, i) => (
                  <div key={i} className="p-8 border-r border-b border-white/10 flex items-center gap-3 hover:bg-[#D1A08B]/5 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#D1A08B]" />
                    <span className="text-[12px] font-bold uppercase tracking-widest text-white/70">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B]">Location Intelligence</h2>
              <div className="relative aspect-video w-full bg-white/5 border border-white/10 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2070&auto=format&fit=crop" alt="Map" fill className="object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-md px-8 py-4 border border-[#D1A08B]/20 flex flex-col items-center">
                    <MapPin className="w-6 h-6 text-[#D1A08B] mb-2" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white">Interactive Pin</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <NeighborhoodList title="Schools Nearby" items={property.nearbySchools} icon={School} />
                <NeighborhoodList title="Points of Interest" items={property.pointsOfInterest} icon={MapPin} />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B]">Floor Plan</h2>
              <div className="relative aspect-[16/9] bg-white/[0.02] border border-white/5 flex items-center justify-center group">
                <Image src={property.floorPlan} alt="Floor plan" fill className="object-contain p-10 opacity-80" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button className="btn-copper px-10 h-14 gap-2"><Download className="w-5 h-5" /> Download PDF</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8 no-print">
              {/* Agent Profile Card First */}
              <div className="border border-white/10 bg-[#0a0a0a] p-10 flex flex-col items-center text-center space-y-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#D1A08B]/40 p-1">
                  <Image src={property.agent.image} alt={property.agent.name} fill className="object-cover rounded-full" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-headline font-bold uppercase tracking-wider text-white">{property.agent.name}</h4>
                  <p className="text-[11px] font-bold text-[#D1A08B] uppercase tracking-widest">{property.agent.role}</p>
                </div>
                <div className="w-full pt-4 space-y-4">
                  <BrochureDialog property={property}>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white/5 bg-transparent rounded-none h-12 uppercase text-[10px] font-bold tracking-widest gap-2">
                      <FileText className="w-4 h-4" />
                      DOWNLOAD BROCHURE (PDF)
                    </Button>
                  </BrochureDialog>
                  <ConsultationDialog>
                    <Button className="w-full btn-copper h-12 gap-2 text-sm">Inquiry</Button>
                  </ConsultationDialog>
                  <Button variant="outline" className="w-full btn-outline-white h-12 gap-2 text-sm border-white/10"><Phone className="w-4 h-4" /> Call Specialist</Button>
                </div>
              </div>

              {/* Market Intelligence Second */}
              <div className="glass-panel p-10 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#D1A08B]"><TrendingUp className="w-4 h-4" /><p className="text-[11px] font-bold uppercase tracking-[0.3em]">Market Context</p></div>
                  <h3 className="text-lg font-headline font-bold uppercase tracking-widest text-white">Area Intelligence</h3>
                </div>
                <div className="space-y-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end"><p className="text-white/40 text-[11px] uppercase font-bold tracking-widest">Avg. Area Price</p><p className="text-xl font-bold text-white">{property.marketStats.avgAreaPrice}</p></div>
                  <div className="flex justify-between items-end"><p className="text-white/40 text-[11px] uppercase font-bold tracking-widest">Price / sq.ft</p><p className="text-xl font-bold text-white">{property.marketStats.pricePerSqFt}</p></div>
                  <p className="text-[11px] text-white/40 font-light leading-relaxed italic">
                    Market data is analyzed weekly to ensure precise valuation and ROI projections for Apex Residences clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-40 pt-24 border-t border-white/5 px-6 md:px-12 no-print">
          <h2 className="text-[12px] font-bold tracking-[0.4em] uppercase text-[#D1A08B] mb-12">Similar Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {similarProperties.map(p => <ListingCard key={p.id} {...p} />)}
          </div>
        </section>
      </main>

      {/* Gallery Dialog for Mobile */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-[95vw] h-[90vh] bg-black border-white/10 p-0 overflow-hidden flex flex-col rounded-none">
          <DialogHeader className="p-6 border-b border-white/5 shrink-0">
            <DialogTitle className="text-white font-headline text-lg uppercase tracking-widest">{property.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {property.gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-video w-full border border-white/10">
                <Image src={img} alt={`Gallery image ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OffPlanProjectDetail({ project }: { project: OffPlanProject }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { toast } = useToast();
  const allImages = [project.image, ...(project.gallery || [])];
  const similarProjects = OFF_PLAN_PROJECTS.filter(p => p.id !== project.id).slice(0, 4);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "Link Copied",
      description: "The listing URL has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-[#B8860B] selection:text-white pb-32 w-full">
      <main className="pt-24 w-full">
        {/* 1. Header & Breadcrumbs */}
        <section className="px-6 md:px-12 py-10 border-b border-white/5 mb-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl md:text-6xl font-headline font-bold tracking-[0.1em] leading-tight uppercase text-white">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <span className="text-white/20">/</span>
              <Link href="/off-plan" className="hover:text-white transition-colors">DUBAI</Link>
              <span className="text-white/20">/</span>
              <span className="text-white">{project.title}</span>
            </div>
          </div>
        </section>

        <div className="px-6 md:px-12 flex flex-col lg:flex-row gap-16">
          {/* Main Content (75%) */}
          <div className="lg:w-[75%] space-y-24">
            {/* Visual Gallery */}
            <section className="space-y-6">
              <div className="relative aspect-[16/9] overflow-hidden group border border-white/5 bg-[#0a0a0a]">
                <Image 
                  src={allImages[activeImage]} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  priority
                />
                
                {/* Mobile Slide Controls for Off-Plan */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:hidden z-20">
                  <button 
                    onClick={() => setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                    className="w-10 h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white rounded-full border border-white/10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setActiveImage((prev) => (prev + 1) % allImages.length)}
                    className="w-10 h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white rounded-full border border-white/10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative w-32 aspect-video flex-shrink-0 border-2 transition-all duration-300",
                      activeImage === idx ? "border-[#B8860B] opacity-100" : "border-white/5 opacity-40 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* Lifestyle Narrative */}
            <section className="space-y-12">
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-[#B8860B]">
                LIFESTYLE AT {project.title}
              </h2>
              <div className="max-w-4xl space-y-8">
                <div className={cn(
                  "relative transition-all duration-700 overflow-hidden",
                  !isExpanded ? "max-h-[250px]" : "max-h-[2000px]"
                )}>
                  <p className="text-white/50 text-lg font-light leading-relaxed italic">
                    {project.longDescription}
                  </p>
                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
                  )}
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#B8860B] text-[11px] font-bold uppercase tracking-[0.4em] border-b border-[#B8860B]/30 pb-1 hover:text-white transition-colors"
                  >
                    {isExpanded ? "READ LESS" : "READ MORE"}
                  </button>
                </div>
              </div>
            </section>

            {/* Amenities Grid */}
            <section className="space-y-12">
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-[#B8860B]">
                PROJECT HIGHLIGHTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-white/10">
                {project.amenities.map((amenity, idx) => (
                  <div key={idx} className="p-10 border-r border-b border-white/10 group hover:bg-[#B8860B]/5 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#B8860B] mb-4" />
                    <span className="text-[13px] font-bold uppercase tracking-widest text-white/80">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Atmosphere Block (Horizontal Split) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/[0.02] border border-white/10 overflow-hidden">
               <div className="relative aspect-square md:aspect-auto overflow-hidden group">
                 <Image 
                   src={project.gallery[1] || project.image} 
                   alt="Atmosphere" 
                   fill 
                   className="object-cover transition-all duration-[2000ms] group-hover:scale-110" 
                 />
               </div>
               <div className="p-12 md:p-20 flex flex-col justify-center space-y-6">
                 <h3 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-[0.2em] text-[#B8860B]">ATMOSPHERE</h3>
                 <p className="text-white/40 font-light leading-loose tracking-wide text-base italic">
                   {project.description}
                 </p>
                 <div className="w-10 h-[1px] bg-[#B8860B]/40" />
               </div>
            </section>

            {/* Structured Payment Plan */}
            <section className="space-y-12">
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-[#B8860B]">
                PAYMENT PLAN
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-0 border border-white/10">
                <div className="p-16 border-r border-b border-white/10 flex flex-col items-center text-center space-y-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Installment: 1</p>
                  <div className="w-8 h-[1px] bg-[#B8860B]/50" />
                  <p className="text-5xl lg:text-7xl font-bold text-[#B8860B]">10%</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">DOWN PAYMENT</p>
                </div>
                <div className="p-16 border-b border-white/10 flex flex-col items-center text-center space-y-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Installment: 2</p>
                  <div className="w-8 h-[1px] bg-[#B8860B]/50" />
                  <p className="text-5xl lg:text-7xl font-bold text-[#B8860B]">80%</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">DURING CONSTRUCTION</p>
                </div>
                <div className="col-span-full p-16 flex flex-col items-center text-center space-y-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Installment: 3</p>
                  <div className="w-8 h-[1px] bg-[#B8860B]/50" />
                  <p className="text-5xl lg:text-7xl font-bold text-[#B8860B]">10%</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">ON HANDOVER</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar (25%) */}
          <div className="lg:w-[25%] no-print">
            <div className="sticky top-32 space-y-10">
              {/* Agent Profile Card Card */}
              <div className="bg-[#0a0a0a] border border-white/10 p-10 flex flex-col items-center text-center space-y-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#B8860B]/20 p-1">
                  <Image src={project.agent.image} alt={project.agent.name} fill className="object-cover rounded-full" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-headline font-bold uppercase tracking-wider text-white">{project.agent.name}</h4>
                  <p className="text-[11px] font-bold text-[#B8860B] uppercase tracking-widest">{project.agent.role}</p>
                </div>
                <div className="w-full space-y-4">
                  <BrochureDialog property={project}>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white/5 bg-transparent rounded-none h-12 uppercase text-[10px] font-bold tracking-widest gap-2">
                      <FileText className="w-4 h-4" />
                      DOWNLOAD BROCHURE (PDF)
                    </Button>
                  </BrochureDialog>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 btn-outline-white h-12 text-[9px] font-bold border-white/10">CALL US</Button>
                    <ConsultationDialog>
                      <Button className="flex-1 btn-copper h-12 text-[9px] font-bold">INQUIRY</Button>
                    </ConsultationDialog>
                  </div>
                </div>
                <a href="#" className="flex items-center gap-2 text-[#25D366] text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  WhatsApp
                </a>
              </div>

              {/* Quick Facts Technical Card */}
              <div className="bg-[#0a0a0a] border border-white/10 p-10 space-y-10">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B8860B]">QUICK FACTS</h3>
                <div className="space-y-6">
                  <DetailRow label="Project" value={project.title} />
                  <DetailRow label="Developer" value={project.developer} />
                  <DetailRow label="Type" value={project.type} />
                  <DetailRow label="Handover" value={project.handoverDate} />
                  <DetailRow label="DLD Permit" value="238290231" />
                </div>
                <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                  <div className="bg-white p-3"><QrCode className="w-20 h-20 text-black" /></div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">Brochure</p>
                </div>
              </div>

              {/* Social Share Block */}
              <div className="flex justify-between items-center px-6 py-6 border border-white/10 bg-[#0a0a0a]">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-white/30 hover:text-[#B8860B] transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-black border-white/10 text-white rounded-none p-4" align="center">
                    <div className="space-y-4">
                      <h4 className="font-headline text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">Share Listing</h4>
                      <div className="flex gap-2">
                        <Input 
                          readOnly 
                          value={currentUrl} 
                          className="h-10 bg-white/5 border-white/10 rounded-none text-xs focus:ring-0"
                        />
                        <Button 
                          size="sm" 
                          className="btn-copper h-10 px-4 gap-2"
                          onClick={handleCopyLink}
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {[Mail, Facebook, Linkedin, MessageCircle].map((Icon, idx) => (
                  <button key={idx} className="text-white/30 hover:text-[#B8860B] transition-colors">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Projects Exploration */}
        <section className="mt-40 pt-24 border-t border-white/5 px-6 md:px-12 no-print">
          <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-[#B8860B] mb-16">SIMILAR PROJECTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {similarProjects.map(p => (
              <Link key={p.id} href={`/listings/${p.id}`} className="group relative aspect-[3/4] overflow-hidden border border-white/10 bg-[#0a0a0a]">
                <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-10 space-y-3">
                   <h3 className="text-white font-headline text-lg font-bold tracking-widest uppercase leading-tight">{p.title}</h3>
                   <div className="flex items-center gap-3">
                     <p className="text-[#B8860B] text-[9px] font-bold uppercase tracking-widest">{p.developer}</p>
                     <div className="w-6 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-[#B8860B] transition-all" />
                   </div>
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
      <div className="w-12 h-12 flex items-center justify-center text-[#D1A08B] bg-white/[0.02] border border-white/5"><Icon className="w-6 h-6" /></div>
      <div className="text-left">
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
      <span className="text-sm font-light text-white text-right">{value}</span>
    </div>
  );
}

function NeighborhoodList({ title, items, icon: Icon }: { title: string; items: any[]; icon: any }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3 text-[#D1A08B]"><Icon className="w-6 h-6" /><h4 className="text-[11px] font-bold tracking-[0.3em] uppercase">{title}</h4></div>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-base font-light border-b border-white/5 pb-3">
            <span className="text-white/60">{item.name}</span>
            <span className="text-white/30 text-xs font-bold">{item.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
