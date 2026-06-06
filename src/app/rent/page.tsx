"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchDashboard } from "@/components/listings/search-dashboard";
import { ListingCard } from "@/components/listings/listing-card";
import type { Property } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/api";
import { toApexProperty } from "@/lib/live-mappers";
import { cleanQueryForCategory, matchesTemplateCategory, normalizeCategory } from "@/lib/search-utils";

function RentPageContent() {
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const category = normalizeCategory(searchParams.get("category"));
  const locationFilter = cleanQueryForCategory(searchParams.get("q") || searchParams.get("location"), category);
  const headingFilter = locationFilter || category;
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProperties() {
      setIsLoading(true);
      try {
        const liveResponse = await getProperties({
          transactionType: 'RENT',
          q: cleanQueryForCategory(searchParams.get('q') || searchParams.get('location'), normalizeCategory(searchParams.get('category'))),
          minPrice: searchParams.get('minPrice') || undefined,
          maxPrice: searchParams.get('maxPrice') || undefined,
          bedrooms: searchParams.get('bedrooms') || undefined,
          bathrooms: searchParams.get('bathrooms') || undefined,
          minArea: searchParams.get('minArea') || undefined,
          maxArea: searchParams.get('maxArea') || undefined,
          limit: searchParams.get('category') ? 96 : 48,
        });
        if (!active) return;

        const liveProperties = liveResponse.properties
          .filter((property) => matchesTemplateCategory(property, searchParams.get('category')))
          .map(toApexProperty);
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
  }, [searchKey, searchParams]);

  const rentProperties = properties.filter((property) => property.listingType === 'Rent');

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-24">
        <SearchDashboard
          title={headingFilter ? `RENTALS IN ${headingFilter.toUpperCase()}` : "PROPERTIES FOR RENT IN DUBAI"}
          resultCount={rentProperties.length}
          resultLabel="LISTINGS"
        />

        <section className="py-20 px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto space-y-16">
            {rentProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {rentProperties.map((property) => (
                  <ListingCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="col-span-full py-32 text-center border border-white/5 bg-white/5">
                <p className="text-white/40 uppercase tracking-[0.4em] font-light">
                  {isLoading ? 'Loading rentals...' : 'No rentals found for this search.'}
                </p>
              </div>
            )}

            {rentProperties.length > 0 && (
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

export default function RentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white tracking-widest uppercase text-xs">Loading rentals...</p></div>}>
      <RentPageContent />
    </Suspense>
  );
}
