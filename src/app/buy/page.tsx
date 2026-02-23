"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchDashboard } from "@/components/listings/search-dashboard";
import { ListingCard } from "@/components/listings/listing-card";
import { PROPERTIES } from "@/lib/properties";
import { Button } from "@/components/ui/button";

function BuyPageContent() {
  const searchParams = useSearchParams();
  const locationFilter = searchParams.get("location");

  const buyProperties = PROPERTIES.filter(p => {
    const isBuy = p.listingType === 'Buy';
    const matchesLocation = locationFilter 
      ? p.location.toLowerCase().includes(locationFilter.toLowerCase()) 
      : true;
    return isBuy && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-24">
        <SearchDashboard title={locationFilter ? `PROPERTIES IN ${locationFilter.toUpperCase()}` : "PROPERTIES FOR SALE IN DUBAI"} />
        
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto space-y-16">
            {buyProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {buyProperties.map((prop) => (
                  <ListingCard key={prop.id} {...prop} />
                ))}
                {/* Duplicate for density demonstration if no filter is active */}
                {!locationFilter && buyProperties.map((prop) => (
                  <ListingCard key={`${prop.id}-copy`} {...prop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-white/10 bg-white/5">
                <p className="text-white/40 uppercase tracking-[0.4em] font-light">
                  No properties found in {locationFilter}.
                </p>
              </div>
            )}

            {buyProperties.length > 0 && (
              <div className="flex justify-center">
                <Button variant="outline" className="border-2 border-[#B8860B] text-[#B8860B] bg-transparent hover:bg-[#B8860B] hover:text-black transition-all duration-500 rounded-none h-16 px-16 uppercase text-xs font-bold tracking-[0.4em] w-full max-w-md">
                  VIEW MORE PROPERTIES
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white tracking-widest uppercase text-xs">Loading listings...</p></div>}>
      <BuyPageContent />
    </Suspense>
  );
}
