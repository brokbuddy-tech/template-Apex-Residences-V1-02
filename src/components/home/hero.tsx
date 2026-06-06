"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Map, Sparkles } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { ConsultationDialog } from "./consultation-dialog";
import { OwnerRelationsDialog } from "./owner-relations-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cleanQueryForCategory, normalizeCategory } from "@/lib/search-utils";

type HeroProps = {
  agencyName: string;
  ownerRelationsEmail?: string | null;
};

type AiSearchFilters = {
  q?: string;
  type?: string;
  transactionType?: string;
  propertyType?: string;
  category?: string;
  readiness?: string;
  bedrooms?: string;
  bathrooms?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
};

function getDestination(filters: AiSearchFilters, fallbackMode: 'buy' | 'rent') {
  if (filters.readiness === 'OFFPLAN' || filters.type === 'new-homes') return '/off-plan';
  if (filters.transactionType === 'RENT' || filters.type === 'rent') return '/rent';
  return fallbackMode === 'rent' ? '/rent' : '/buy';
}

function buildSearchHref(filters: AiSearchFilters, fallbackMode: 'buy' | 'rent') {
  const params = new URLSearchParams();
  const category = normalizeCategory(filters.category);
  const normalizedFilters = {
    ...filters,
    category,
    q: cleanQueryForCategory(filters.q, category),
  };
  Object.entries(normalizedFilters).forEach(([key, value]) => {
    if (!value || value === 'any') return;
    if (key === 'type' || key === 'transactionType' || key === 'propertyType') return;
    params.set(key, value);
  });
  const query = params.toString();
  return `${getDestination(filters, fallbackMode)}${query ? `?${query}` : ''}`;
}

export function Hero({ agencyName, ownerRelationsEmail }: HeroProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("manual");
  const [listingMode, setListingMode] = useState<'buy' | 'rent'>('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('any');
  const [bedrooms, setBedrooms] = useState('any');
  const [bathrooms, setBathrooms] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currency, setCurrency] = useState("AED");
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg");

  const getCurrentFilters = (): AiSearchFilters => ({
    q: cleanQueryForCategory(searchQuery, propertyType),
    transactionType: listingMode === 'rent' ? 'RENT' : 'SALE',
    category: normalizeCategory(propertyType),
    bedrooms: bedrooms !== 'any' ? bedrooms : undefined,
    bathrooms: bathrooms !== 'any' ? bathrooms : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
  });

  const runManualSearch = () => {
    router.push(buildSearchHref(getCurrentFilters(), listingMode));
  };

  const runAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiQuery, filters: getCurrentFilters() }),
      });
      if (!response.ok) throw new Error('AI search failed');
      const data = await response.json() as { filters?: AiSearchFilters };
      router.push(buildSearchHref({ ...getCurrentFilters(), ...(data.filters || {}) }, listingMode));
    } catch {
      router.push(buildSearchHref({ ...getCurrentFilters(), q: aiQuery.trim() }, listingMode));
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || ""}
          alt="Dubai Skyline Night"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-32">
        {/* Left Content */}
        <div className="space-y-12 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="space-y-4">
            <h1 className="font-headline text-3xl md:text-4xl xl:text-5xl font-thin tracking-[0.1em] leading-tight text-white uppercase">
              Invest in <br />
              Luxury Living <br />
              with <span className="font-bold">{agencyName}</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base font-light italic tracking-wider">
              "Precision, Performance, and Due Diligence at Your Service"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <ConsultationDialog>
              <Button className="btn-copper px-12 h-14">
                Leave a request
              </Button>
            </ConsultationDialog>
            <OwnerRelationsDialog agencyName={agencyName} ownerRelationsEmail={ownerRelationsEmail}>
              <Button className="btn-outline-white px-12 h-14">
                Already an owner?
              </Button>
            </OwnerRelationsDialog>
          </div>
        </div>

        {/* Right Widget */}
        <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
          <div className="glass-panel w-full max-w-[450px] p-8 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab("manual")}
                className={cn(
                  "flex-1 pb-4 text-[12px] uppercase font-bold tracking-[0.2em] transition-all",
                  activeTab === "manual" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-white/40"
                )}
              >
                Manual
              </button>
              <button 
                onClick={() => setActiveTab("ai")}
                className={cn(
                  "flex-1 pb-4 text-[12px] uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                  activeTab === "ai" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-white/40"
                )}
              >
                <Sparkles className={cn("w-3.5 h-3.5 transition-opacity", activeTab === "ai" ? "opacity-100" : "opacity-0")} />
                AI Search
              </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[300px] flex flex-col justify-between">
              {activeTab === "manual" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-2">
                    {(['buy', 'rent'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setListingMode(mode)}
                        className={cn(
                          "h-10 border text-[10px] uppercase font-bold tracking-[0.25em] transition-all",
                          listingMode === mode
                            ? "border-[#B8860B] bg-[#B8860B] text-black"
                            : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Location or Keyword</label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') runManualSearch();
                      }}
                      placeholder="Dubai Marina, Downtown, beachfront..."
                      className="bg-transparent border-b border-white/20 w-full pb-2 text-sm outline-none focus:border-[#B8860B] transition-colors text-white placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Property Type</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto pb-2 text-sm font-light text-white hover:border-[#B8860B] transition-colors focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Apartments, Penthouses, Villas" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10 text-white rounded-none">
                        <SelectItem value="any">Any Type</SelectItem>
                        <SelectItem value="Apartment">Apartments</SelectItem>
                        <SelectItem value="Penthouse">Penthouses</SelectItem>
                        <SelectItem value="Villa">Villas</SelectItem>
                        <SelectItem value="House">Mansions</SelectItem>
                        <SelectItem value="Townhouse">Townhouses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Bedrooms</label>
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto pb-2 text-sm font-light text-white hover:border-[#B8860B] transition-colors focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-white/10 text-white rounded-none">
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Bathrooms</label>
                      <Select value={bathrooms} onValueChange={setBathrooms}>
                        <SelectTrigger className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto pb-2 text-sm font-light text-white hover:border-[#B8860B] transition-colors focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-white/10 text-white rounded-none">
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                          <SelectItem value="4">4 Bathrooms</SelectItem>
                          <SelectItem value="5">5+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Currency Selector */}
                  <div className="flex items-center gap-4 py-2">
                    {['GBP', 'CNY', 'EUR', 'AED', 'USD'].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={cn(
                          "text-[10px] font-bold tracking-widest transition-colors",
                          currency === curr ? "text-[#B8860B]" : "text-white/40 hover:text-white"
                        )}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>

                  {/* Price Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Min Price</label>
                      <input type="text" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Min" className="bg-transparent border-b border-white/20 w-full pb-2 text-sm outline-none focus:border-[#B8860B] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-tighter text-white/40">Max Price</label>
                      <input type="text" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Max" className="bg-transparent border-b border-white/20 w-full pb-2 text-sm outline-none focus:border-[#B8860B] transition-colors" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 h-full flex flex-col">
                  <div className="space-y-2 flex-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> Describe your dream home
                    </label>
                    <Textarea 
                      placeholder="e.g. A 4-bedroom modern villa in Palm Jumeirah with a private beach access and sunset views..."
                      value={aiQuery}
                      onChange={(event) => setAiQuery(event.target.value)}
                      className="bg-white/5 border-white/10 focus:border-[#B8860B] transition-colors rounded-none h-full min-h-[220px] text-white placeholder:text-white/20 resize-none font-light leading-relaxed"
                    />
                  </div>
                  <p className="text-[9px] text-white/40 italic font-light">
                    Our AI will analyze your request and suggest matching luxury properties from our exclusive portfolio.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-4 pt-8">
                <Button className="btn-copper w-full h-14 gap-2" onClick={activeTab === "manual" ? runManualSearch : runAiSearch} disabled={isSearching}>
                  {activeTab === "manual" ? (
                    "Show Projects"
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {isSearching ? 'Searching...' : 'Start AI Search'}
                    </>
                  )}
                </Button>
                <Button variant="outline" className="btn-outline-white w-full h-14 flex items-center justify-center gap-2">
                  <Map className="w-4 h-4" />
                  View Properties on Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
