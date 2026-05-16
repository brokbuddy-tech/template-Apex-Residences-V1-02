"use client";

import React, { useEffect, useState } from "react";
import { SearchDashboard } from "@/components/listings/search-dashboard";
import { ListingCard } from "@/components/listings/listing-card";
import type { Property } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/api";
import { toApexProperty } from "@/lib/live-mappers";

export default function RentPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProperties() {
      try {
        const liveResponse = await getProperties({ transactionType: 'RENT', limit: 48 });
        if (!active) return;

        const liveProperties = liveResponse.properties.map(toApexProperty);
        setProperties(liveProperties);
      } catch {
        if (active) {
          setProperties([]);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadProperties();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-24">
        <SearchDashboard
          title="PROPERTIES FOR RENT IN DUBAI"
          resultCount={properties.length}
          resultLabel="LISTINGS"
        />

        <section className="py-20 px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto space-y-16">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {properties.map((property) => (
                  <ListingCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="col-span-full py-32 text-center border border-white/5 bg-white/5">
                <p className="text-white/40 uppercase tracking-[0.4em] font-light">
                  {isLoading ? 'Loading rentals...' : 'No rentals currently listed in this category.'}
                </p>
              </div>
            )}

            {properties.length > 0 && (
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
