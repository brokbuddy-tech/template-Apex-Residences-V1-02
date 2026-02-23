
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, RefreshCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchDashboardProps {
  title: string;
}

const AMENITIES = [
  "Private Pool",
  "Gymnasium",
  "Concierge",
  "Security",
  "Parking",
  "Spa & Sauna",
  "Cinema Room",
  "Smart Home",
  "Beach Access",
  "Maid's Room",
  "Golf Course",
  "Pet Friendly"
];

const PLACES = [
  "Palm Jumeirah",
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Emirates Hills",
  "JBR",
  "Dubai Hills",
  "Meydan",
  "Damac Hills",
  "Arabian Ranches",
  "Al Barari",
  "City Walk"
];

export function SearchDashboard({ title }: SearchDashboardProps) {
  const [beds, setBeds] = useState<string[]>([]);
  const [baths, setBaths] = useState<string[]>([]);
  const [unit, setUnit] = useState<"SQ.M" | "SQ.FT">("SQ.FT");
  const [currency, setCurrency] = useState("AED");
  const [aiQuery, setAiQuery] = useState("");

  const toggleBed = (val: string) => {
    setBeds(prev => prev.includes(val) ? prev.filter(b => b !== val) : [...prev, val]);
  };

  const toggleBath = (val: string) => {
    setBaths(prev => prev.includes(val) ? prev.filter(b => b !== val) : [...prev, val]);
  };

  const handleReset = () => {
    setBeds([]);
    setBaths([]);
    setAiQuery("");
  };

  return (
    <div className="bg-black text-white py-12 px-6 md:px-12 border-b border-white/10">
      <div className="max-w-[1600px] mx-auto space-y-12">
        <h2 className="text-center font-headline text-2xl md:text-3xl font-thin tracking-[0.5em] uppercase text-white">
          {title}
        </h2>

        {/* Primary Filter Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8 items-end">
          
          {/* A. AI Search */}
          <div className="space-y-3">
            <label className="text-[14px] uppercase font-bold tracking-widest text-[#B8860B] flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> AI Search
            </label>
            <Input 
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Describe your dream home..." 
              className="h-11 bg-white/5 border-white/10 rounded-none text-sm focus:border-[#B8860B] transition-colors placeholder:text-white/20"
            />
          </div>

          {/* B. Property Type Select */}
          <div className="space-y-3">
            <label className="text-[14px] uppercase font-bold tracking-widest text-white/40">Property Type</label>
            <Select>
              <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-11 uppercase text-[12px] tracking-widest focus:ring-0 focus:ring-offset-0 hover:border-[#B8860B]/50 transition-colors">
                <SelectValue placeholder="ANY" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10 text-white rounded-none">
                <SelectItem value="apartments">Apartments</SelectItem>
                <SelectItem value="penthouses">Penthouses</SelectItem>
                <SelectItem value="villas">Villas</SelectItem>
                <SelectItem value="mansions">Mansions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* C. Bedrooms (Multi-select) */}
          <div className="space-y-3">
            <label className="text-[14px] uppercase font-bold tracking-widest text-white/40">Bedrooms</label>
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5+"].map((num) => (
                <button
                  key={num}
                  onClick={() => toggleBed(num)}
                  className={cn(
                    "w-10 h-11 flex items-center justify-center text-[12px] font-bold border transition-all",
                    beds.includes(num) ? "border-[#B8860B] bg-[#B8860B]/10 text-[#B8860B]" : "border-white/10 text-white/60 hover:border-white/30"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* D. Bathrooms (Multi-select) */}
          <div className="space-y-3">
            <label className="text-[14px] uppercase font-bold tracking-widest text-white/40">Bathrooms</label>
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5+"].map((num) => (
                <button
                  key={num}
                  onClick={() => toggleBath(num)}
                  className={cn(
                    "w-10 h-11 flex items-center justify-center text-[12px] font-bold border transition-all",
                    baths.includes(num) ? "border-[#B8860B] bg-[#B8860B]/10 text-[#B8860B]" : "border-white/10 text-white/60 hover:border-white/30"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* E. Area Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[14px] uppercase font-bold tracking-widest text-white/40">Area</label>
              <div className="flex gap-3">
                {["SQ.M", "SQ.FT"].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u as any)}
                    className={cn(
                      "text-[10px] font-bold tracking-widest transition-colors",
                      unit === u ? "text-[#B8860B]" : "text-white/20"
                    )}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Input placeholder="Min" className="h-11 bg-transparent border-white/10 rounded-none text-sm text-center" />
              <span className="text-white/20">—</span>
              <Input placeholder="Max" className="h-11 bg-transparent border-white/10 rounded-none text-sm text-center" />
            </div>
          </div>

          {/* F. Currency & Price */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[14px] uppercase font-bold tracking-widest text-white/40">Price Range</label>
              <div className="flex gap-3">
                {["GBP", "CNY", "EUR", "AED", "USD"].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={cn(
                      "text-[10px] font-bold tracking-widest transition-colors",
                      currency === curr ? "text-[#B8860B]" : "text-white/20"
                    )}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Input placeholder="Min" className="h-11 bg-transparent border-white/10 rounded-none text-sm text-center" />
              <span className="text-white/20">—</span>
              <Input placeholder="Max" className="h-11 bg-transparent border-white/10 rounded-none text-sm text-center" />
            </div>
          </div>

        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-12 border-white/10 text-white rounded-none uppercase text-[11px] font-bold tracking-[0.3em] px-8 hover:bg-white hover:text-black gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  All Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl bg-black border-white/10 text-white rounded-none">
                <DialogHeader>
                  <DialogTitle className="font-headline tracking-[0.2em] uppercase text-[#B8860B]">Refine Search</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
                  {/* Amenities Section */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-white/40">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {AMENITIES.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-3">
                          <Checkbox id={amenity} className="border-white/20 data-[state=checked]:bg-[#B8860B] data-[state=checked]:border-[#B8860B]" />
                          <label htmlFor={amenity} className="text-[10px] font-bold tracking-widest cursor-pointer hover:text-[#B8860B] transition-colors uppercase">{amenity}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Places Section */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-white/40">Places & Communities</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {PLACES.map((place) => (
                        <div key={place} className="flex items-center space-x-3">
                          <Checkbox id={place} className="border-white/20 data-[state=checked]:bg-[#B8860B] data-[state=checked]:border-[#B8860B]" />
                          <label htmlFor={place} className="text-[10px] font-bold tracking-widest cursor-pointer hover:text-[#B8860B] transition-colors uppercase">{place}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <Button className="bg-[#B8860B] text-black hover:bg-[#B8860B]/90 rounded-none px-12 h-12 font-bold uppercase tracking-widest text-xs">
                    Apply Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/40 font-bold uppercase tracking-widest">Sort By:</span>
              <Select defaultValue="popularity">
                <SelectTrigger className="w-[180px] bg-transparent border-none text-white rounded-none h-auto p-0 uppercase text-[11px] tracking-widest focus:ring-0 focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white rounded-none">
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-[#B8860B] text-[12px] font-bold uppercase tracking-[0.4em]">
              1,248 PROJECTS
            </div>
            <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest" onClick={handleReset}>
              <RefreshCcw className="w-4 h-4" />
              Reset all filters
            </button>
            <Button className="bg-transparent border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-black rounded-none h-14 px-12 uppercase text-[12px] font-bold tracking-[0.4em] transition-all">
              SEARCH
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
