"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";
import type { OffPlanProject } from "@/lib/off-plan-projects";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/home/consultation-dialog";
import { BrochureDialog } from "@/components/listings/brochure-dialog";
import { ListingImageLightbox } from "@/components/listings/listing-image-lightbox";
import { ListingCard } from "@/components/listings/listing-card";
import { MortgageCalculator } from "@/components/listings/mortgage-calculator";
import { LocationMap } from "@/components/shared/location-map";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
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
  Video,
  Copy
} from "lucide-react";
import { getProperties, getPropertyById as getLivePropertyById, getSiteConfig } from "@/lib/api";
import type { SiteConfig } from "@/lib/live-types";
import { getAgencyDisplayName, toApexOffPlanProject, toApexProperty } from "@/lib/live-mappers";
import { AmenityIcon } from "@/components/amenity-icon";

function getLocationSegment(location: string) {
  return location.split(",")[0]?.trim().toLowerCase() || null;
}

export default function ListingDetails() {
  const { id } = useParams();
  const listingId = Array.isArray(id) ? id[0] : id;
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [offPlanProject, setOffPlanProject] = useState<OffPlanProject | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [similarProjects, setSimilarProjects] = useState<OffPlanProject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadSiteConfig() {
      try {
        const nextSiteConfig = await getSiteConfig();
        if (active) {
          setSiteConfig(nextSiteConfig);
        }
      } catch {
        if (active) {
          setSiteConfig(null);
        }
      }
    }

    void loadSiteConfig();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadListing() {
      if (!listingId) {
        setProperty(null);
        setOffPlanProject(null);
        setSimilarProperties([]);
        setSimilarProjects([]);
        setIsLoaded(true);
        return;
      }

      try {
        const liveProperty = await getLivePropertyById(listingId);
        if (!active) return;

        if (liveProperty) {
          if (liveProperty.status === 'Off-plan') {
            const mappedProject = toApexOffPlanProject(liveProperty);
            setOffPlanProject(mappedProject);
            setProperty(null);
            const relatedResponse = await getProperties({ readiness: 'OFFPLAN', limit: 48 });
            if (!active) return;

            const nextProjects = relatedResponse.properties
              .map(toApexOffPlanProject)
              .filter((candidate) => candidate.id !== mappedProject.id)
              .slice(0, 4);

            setSimilarProjects(nextProjects);
            setSimilarProperties([]);
          } else {
            const mappedProperty = toApexProperty(liveProperty);
            setProperty(mappedProperty);
            setOffPlanProject(null);
            const relatedResponse = await getProperties({
              transactionType: liveProperty.transactionType === 'Rent' ? 'RENT' : 'SALE',
              limit: 48,
            });
            if (!active) return;

            const mappedRelatedProperties = relatedResponse.properties
              .map(toApexProperty)
              .filter((candidate) => candidate.id !== mappedProperty.id);
            const currentLocation = getLocationSegment(mappedProperty.location);
            const matchingLocation = currentLocation
              ? mappedRelatedProperties.filter((candidate) => getLocationSegment(candidate.location) === currentLocation)
              : mappedRelatedProperties;

            setSimilarProperties((matchingLocation.length > 0 ? matchingLocation : mappedRelatedProperties).slice(0, 4));
            setSimilarProjects([]);
          }
        } else {
          setProperty(null);
          setOffPlanProject(null);
          setSimilarProperties([]);
          setSimilarProjects([]);
        }
      } catch {
        if (!active) return;
        setProperty(null);
        setOffPlanProject(null);
        setSimilarProperties([]);
        setSimilarProjects([]);
      } finally {
        if (active) {
          setIsLoaded(true);
        }
      }
    }

    void loadListing();

    return () => {
      active = false;
    };
  }, [listingId]);

  if (!property && !offPlanProject && isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-headline text-white font-bold">Listing Not Found</h1>
          <Button variant="outline" className="border-white text-white" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (!property && !offPlanProject) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="tracking-[0.4em] uppercase text-xs text-white/40">Loading listing...</p>
      </div>
    );
  }

  if (offPlanProject) {
    return <OffPlanProjectDetail project={offPlanProject} similarProjects={similarProjects} siteConfig={siteConfig} />;
  }

  return <PropertyDetail property={property!} similarProperties={similarProperties} siteConfig={siteConfig} />;
}

function PropertyDetail({
  property,
  similarProperties,
  siteConfig,
}: {
  property: Property;
  similarProperties: Property[];
  siteConfig?: SiteConfig | null;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { toast } = useToast();
  const agencyName = getAgencyDisplayName(siteConfig);

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

  const openGalleryAt = (index: number) => {
    setActiveImage(index);
    setIsGalleryOpen(true);
  };

  const availableFloorPlans = (property.floorPlans ?? []).filter(
    (fp) => typeof fp?.url === 'string' && fp.url.trim().length > 0
  );
  const hasRegulatoryInfo = Boolean(
    property.trakheesi ||
    property.dldPermitNo ||
    property.reraPermit ||
    property.agent.brn ||
    property.dldPermitLink
  );

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
            <div
              className="md:col-span-3 relative group overflow-hidden cursor-zoom-in"
              role="button"
              tabIndex={0}
              aria-label={`Open gallery image ${activeImage + 1} of ${property.gallery.length}`}
              onClick={() => setIsGalleryOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsGalleryOpen(true);
                }
              }}
            >
              <Image
                src={property.gallery[activeImage]}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {property.virtualTourUrl ? (
                <Button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    window.open(property.virtualTourUrl!, "_blank", "noopener,noreferrer");
                  }}
                  className="absolute bottom-4 left-4 z-20 rounded-full bg-white/90 px-5 text-black shadow-lg hover:bg-white"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Button>
              ) : null}

              {/* Mobile Slide Controls */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:hidden z-20">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveImage((prev) => (prev - 1 + property.gallery.length) % property.gallery.length);
                  }}
                  className="w-10 h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white rounded-full border border-white/10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveImage((prev) => (prev + 1) % property.gallery.length);
                  }}
                  className="w-10 h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white rounded-full border border-white/10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile View All Button */}
              <div className="absolute bottom-4 right-4 md:hidden z-20">
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsGalleryOpen(true);
                  }}
                  className="bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-none h-10 px-4 gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black/80 transition-all"
                >
                  <Images className="w-4 h-4" />
                  View all {property.gallery.length} photos
                </Button>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-6">
              {property.gallery.filter((_, i) => i !== activeImage).slice(0, 2).map((img, idx) => (
                <div
                  key={`${img}-${idx}`}
                  className="relative flex-1 group overflow-hidden cursor-zoom-in"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open gallery image ${property.gallery.indexOf(img) + 1} of ${property.gallery.length}`}
                  onClick={() => openGalleryAt(property.gallery.indexOf(img))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openGalleryAt(property.gallery.indexOf(img));
                    }
                  }}
                  >
                    <Image src={img} alt="Property view" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                    {idx === 1 ? (
                      <div className="pointer-events-none absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 bg-black/70 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl backdrop-blur-md">
                        <Images className="h-4 w-4" />
                        View More
                      </div>
                    ) : null}
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
              {property.beds > 0 && <SpecIcon label="Bedrooms" value={property.beds.toString()} icon={Bed} />}
              {property.baths > 0 && <SpecIcon label="Bathrooms" value={property.baths.toString()} icon={Bath} />}
              <SpecIcon label="Total Area" value={`${property.sqft.toLocaleString()} sq.ft`} icon={Maximize} />
              <SpecIcon label="Furnishing" value={property.furnishing} icon={Building2} />
            </div>

            <div className="space-y-10">
              <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B]">Description</h2>
              <p className="text-white/50 font-light leading-relaxed text-lg italic whitespace-pre-line">{property.description}</p>

              {availableFloorPlans.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B]">Floor Plans</h2>
                  <Tabs defaultValue={availableFloorPlans[0]?.type || '0'} className="w-full">
                    <TabsList className="w-full justify-start border-b border-white/10 rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap">
                      {availableFloorPlans.map((fp, i) => (
                        <TabsTrigger
                          key={i}
                          value={fp.type || `${i}`}
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#D1A08B] data-[state=active]:shadow-none rounded-none px-4 py-3 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap text-white/50 data-[state=active]:text-[#D1A08B]"
                        >
                          {fp.type || fp.title || `Plan ${i + 1}`}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {availableFloorPlans.map((fp, i) => (
                      <TabsContent key={i} value={fp.type || `${i}`} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className="relative aspect-[16/9] bg-white/[0.02] border border-white/5 group">
                          <Image src={fp.url} alt={fp.title || fp.type || 'Floor plan'} fill className="object-contain p-10 opacity-80" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <a href={fp.url} target="_blank" rel="noopener noreferrer">
                              <Button className="btn-copper px-10 h-14 gap-2">
                                <Maximize className="w-5 h-5" /> View Full Size
                              </Button>
                            </a>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              )}

              <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                <DetailRow label="Location" value={property.location} />
                <DetailRow label="Property Type" value={property.type} />
                <DetailRow label="Listing ID" value={property.id} />
                <DetailRow label="Status" value="Available" />
              </div>

              <div className="pt-10 grid grid-cols-2 md:grid-cols-4 border-l border-t border-white/10">
                {property.features.map((f, i) => (
                  <div key={i} className="p-8 border-r border-b border-white/10 flex items-center gap-3 hover:bg-[#D1A08B]/5 transition-colors">
                    <AmenityIcon name={f} className="h-4 w-4 brightness-0 invert opacity-80" />
                    <span className="text-[12px] font-bold uppercase tracking-widest text-white/70">{f}</span>
                  </div>
                ))}
              </div>

              {property.listingType === 'Buy' && (
                <MortgageCalculator propertyPrice={property.priceValue} />
              )}

              {hasRegulatoryInfo && (
                <div className="pt-2">
                  <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B] mb-6">Regulatory Information</h2>
                  <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 flex-1">
                      {(property.trakheesi || property.dldPermitNo) && (
                        <div className="space-y-2">
                          <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Permit Number</p>
                          <p className="text-[11px] font-bold tracking-widest text-white">
                            {property.trakheesi || property.dldPermitNo}
                          </p>
                        </div>
                      )}
                      {property.reraPermit && (
                        <div className="space-y-2">
                          <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">RERA Project Number</p>
                          <p className="text-[11px] font-bold tracking-widest text-white">{property.reraPermit}</p>
                        </div>
                      )}
                      {property.agent.brn && (
                        <div className="space-y-2">
                          <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">BRN Number</p>
                          <p className="text-[11px] font-bold tracking-widest text-white">{property.agent.brn}</p>
                        </div>
                      )}
                    </div>
                    {property.dldPermitLink && (
                      <div className="p-4 bg-white/5 border border-white/10 shrink-0 ml-8">
                        <Image src={property.dldPermitLink} alt="Trakheesi Permit QR Code" width={80} height={80} className="object-contain" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-10">
              <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#D1A08B]">Location Intelligence</h2>
              <LocationMap
                latitude={property.latitude}
                longitude={property.longitude}
                addressLabel={property.mapAddress || property.location}
                locationLabel={property.location}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <NeighborhoodList title="Schools Nearby" items={property.nearbySchools} icon={School} />
                <NeighborhoodList title="Points of Interest" items={property.pointsOfInterest} icon={MapPin} />
              </div>
            </div>

          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8 no-print">
              {/* Agent Profile Card First */}
              <div className="border border-white/10 bg-[#0a0a0a] p-7 md:p-8 flex flex-col space-y-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[1.25rem] border border-[#D1A08B]/30 bg-white/[0.02]">
                    <Image src={property.agent.image} alt={property.agent.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <h4 className="text-lg md:text-xl font-headline font-bold uppercase tracking-[0.16em] text-white leading-tight">
                      {property.agent.name}
                    </h4>
                    <p className="text-[10px] font-bold text-[#D1A08B] uppercase tracking-[0.28em]">
                      {property.agent.role}
                    </p>
                  </div>
                </div>
                <div className="w-full pt-1 space-y-3">
                  <BrochureDialog property={property} siteConfig={siteConfig}>
                    <Button variant="outline" className="w-full border-[#D1A08B]/60 text-[#D1A08B] hover:bg-[#D1A08B]/10 hover:text-[#D1A08B] bg-transparent rounded-none h-11 uppercase text-[10px] font-bold tracking-widest gap-2">
                      <FileText className="w-4 h-4" />
                      DOWNLOAD BROCHURE (PDF)
                    </Button>
                  </BrochureDialog>
                  <ConsultationDialog>
                    <Button className="w-full btn-copper h-11 gap-2 text-sm">Inquiry</Button>
                  </ConsultationDialog>
                  {property.agent.phone ? (
                    <Button asChild variant="outline" className="w-full btn-outline-white h-11 gap-2 text-sm border-white/10">
                      <a href={`tel:${property.agent.phone}`}><Phone className="w-4 h-4" /> Call Specialist</a>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full btn-outline-white h-11 gap-2 text-sm border-white/10" disabled><Phone className="w-4 h-4" /> Call Specialist</Button>
                  )}
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
                    Market data is analyzed weekly to ensure precise valuation and ROI projections for {agencyName} clients.
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

      <ListingImageLightbox
        images={property.gallery}
        title={property.title}
        open={isGalleryOpen}
        activeIndex={activeImage}
        onOpenChange={setIsGalleryOpen}
        onActiveIndexChange={setActiveImage}
      />
    </div>
  );
}

function OffPlanProjectDetail({
  project,
  similarProjects,
  siteConfig,
}: {
  project: OffPlanProject;
  similarProjects: OffPlanProject[];
  siteConfig?: SiteConfig | null;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const { toast } = useToast();
  const allImages = [project.image, ...(project.gallery || [])];

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

  const openGalleryAt = (index: number) => {
    setActiveImage(index);
    setIsGalleryOpen(true);
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
              <div
                className="relative aspect-[16/9] overflow-hidden group border border-white/5 bg-[#0a0a0a] cursor-zoom-in"
                role="button"
                tabIndex={0}
                aria-label={`Open gallery image ${activeImage + 1} of ${allImages.length}`}
                onClick={() => setIsGalleryOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIsGalleryOpen(true);
                  }
                }}
              >
                <Image
                  src={allImages[activeImage]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />

                {project.virtualTourUrl ? (
                  <Button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      window.open(project.virtualTourUrl!, "_blank", "noopener,noreferrer");
                    }}
                    className="absolute bottom-4 left-4 z-20 rounded-full bg-white/90 px-5 text-black shadow-lg hover:bg-white"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </Button>
                ) : null}

                {/* Mobile Slide Controls for Off-Plan */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:hidden z-20">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length);
                    }}
                    className="w-10 h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white rounded-full border border-white/10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveImage((prev) => (prev + 1) % allImages.length);
                    }}
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
                    onClick={() => openGalleryAt(idx)}
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
                  <p className="text-white/50 text-lg font-light leading-relaxed italic whitespace-pre-line">
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
                    <AmenityIcon name={amenity} className="mb-4 h-5 w-5 brightness-0 invert opacity-80" />
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
                <p className="text-white/40 font-light leading-loose tracking-wide text-base italic whitespace-pre-line">
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
              {project.paymentPlan.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
                  {project.paymentPlan.map((step, idx) => (
                    <div key={`${step.label}-${idx}`} className="p-16 border-b border-white/10 md:border-r last:border-b-0 md:last:border-r-0 flex flex-col items-center text-center space-y-4">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Installment: {idx + 1}</p>
                      <div className="w-8 h-[1px] bg-[#B8860B]/50" />
                      <p className="text-5xl lg:text-7xl font-bold text-[#B8860B]">{step.percentage}</p>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">{step.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-white/10 bg-white/[0.02] p-16 text-center text-white/40 uppercase tracking-[0.3em]">
                  Detailed payment milestones will be shared on request.
                </div>
              )}
            </section>
          </div>

          {/* Sidebar (25%) */}
          <div className="lg:w-[25%] no-print">
            <div className="sticky top-32 space-y-10">
              {/* Agent Profile Card Card */}
              <div className="bg-[#0a0a0a] border border-white/10 p-7 md:p-8 flex flex-col space-y-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[1.25rem] border border-[#B8860B]/25 bg-white/[0.02]">
                    <Image src={project.agent.image} alt={project.agent.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <h4 className="text-lg md:text-xl font-headline font-bold uppercase tracking-[0.16em] text-white leading-tight">
                      {project.agent.name}
                    </h4>
                    <p className="text-[10px] font-bold text-[#B8860B] uppercase tracking-[0.28em]">
                      {project.agent.role}
                    </p>
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <BrochureDialog property={project} siteConfig={siteConfig}>
                    <Button variant="outline" className="w-full border-[#B8860B]/60 text-[#B8860B] hover:bg-[#B8860B]/10 hover:text-[#B8860B] bg-transparent rounded-none h-11 uppercase text-[10px] font-bold tracking-widest gap-2">
                      <FileText className="w-4 h-4" />
                      DOWNLOAD BROCHURE (PDF)
                    </Button>
                  </BrochureDialog>
                  <div className="flex gap-3">
                    {project.agent.phone ? (
                      <Button asChild variant="outline" className="flex-1 btn-outline-white h-11 text-[9px] font-bold border-white/10">
                        <a href={`tel:${project.agent.phone}`}>CALL US</a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1 btn-outline-white h-11 text-[9px] font-bold border-white/10" disabled>CALL US</Button>
                    )}
                    <ConsultationDialog>
                      <Button className="flex-1 btn-copper h-11 text-[9px] font-bold">INQUIRY</Button>
                    </ConsultationDialog>
                  </div>
                </div>
                {project.agent.whatsapp && (
                  <a href={`https://wa.me/${project.agent.whatsapp.replace(/\D/g, "")}`} className="flex items-center gap-2 text-[#25D366] text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
                    <MessageCircle className="w-4 h-4 fill-current" />
                    WhatsApp
                  </a>
                )}
              </div>

              {/* Quick Facts Technical Card */}
              <div className="bg-[#0a0a0a] border border-white/10 p-10 space-y-10">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B8860B]">QUICK FACTS</h3>
                <div className="space-y-6">
                  <DetailRow label="Project" value={project.title} />
                  <DetailRow label="Developer" value={project.developer} />
                  <DetailRow label="Type" value={project.type} />
                  <DetailRow label="Handover" value={project.handoverDate} />
                  <DetailRow label="DLD Permit" value={project.permitNumber || "Available on request"} />
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

      <ListingImageLightbox
        images={allImages}
        title={project.title}
        open={isGalleryOpen}
        activeIndex={activeImage}
        onOpenChange={setIsGalleryOpen}
        onActiveIndexChange={setActiveImage}
      />
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
