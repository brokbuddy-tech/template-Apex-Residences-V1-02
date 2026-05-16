"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import type { Property } from "@/lib/properties";
import { getProperties } from "@/lib/api";
import { toApexProperty } from "@/lib/live-mappers";

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    let active = true;

    async function loadProperties() {
      try {
        const liveResponse = await getProperties({ limit: 3 });
        if (!active) return;

        setProperties(liveResponse.properties.map(toApexProperty).slice(0, 3));
      } catch {
        if (active) {
          setProperties([]);
        }
      }
    }

    void loadProperties();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-[#B8860B] font-bold uppercase tracking-[0.4em] text-[10px] block">Exclusive Portfolio</span>
            <h2 className="font-headline text-4xl md:text-5xl font-light text-white tracking-wider">Signature <span className="font-bold">Projects</span></h2>
          </div>
          <Button asChild variant="link" className="group text-[#B8860B] font-bold text-[10px] uppercase tracking-[0.2em] p-0 hover:no-underline">
            <Link href="/buy">
              Explore All Listings
              <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <div className="border border-white/10 bg-white/5 px-8 py-16 text-center text-sm uppercase tracking-[0.3em] text-white/40">
            Live featured properties will appear here once they are available.
          </div>
        )}
      </div>
    </section>
  );
}
