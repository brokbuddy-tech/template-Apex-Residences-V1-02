"use client";

import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchDashboard } from "@/components/listings/search-dashboard";
import { ListingCard } from "@/components/listings/listing-card";
import { PROPERTIES } from "@/lib/properties";
import { Button } from "@/components/ui/button";

export default function BuyPage() {
  const buyProperties = PROPERTIES.filter(p => p.listingType === 'Buy');

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24">
        <SearchDashboard title="PROPERTIES FOR SALE IN DUBAI" />
        
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {buyProperties.map((prop) => (
                <ListingCard key={prop.id} {...prop} />
              ))}
              {/* Duplicate for density demonstration */}
              {buyProperties.map((prop) => (
                <ListingCard key={`${prop.id}-copy`} {...prop} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" className="border-2 border-[#B8860B] text-[#B8860B] bg-transparent hover:bg-[#B8860B] hover:text-black transition-all duration-500 rounded-none h-16 px-16 uppercase text-xs font-bold tracking-[0.4em] w-full max-w-md">
                VIEW MORE PROPERTIES
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
