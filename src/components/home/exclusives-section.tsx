"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { ConsultationDialog } from "./consultation-dialog";
import { getProperties } from "@/lib/api";
import { toApexOffPlanProject } from "@/lib/live-mappers";
import type { OffPlanProject } from "@/lib/off-plan-projects";

type ExclusiveItem = {
  id: string;
  title: string;
  location: string;
  image: string;
  features: Array<{ label: string; value: string }>;
  summary: string;
  handover: string;
  featured?: boolean;
  recentlyListed?: boolean;
  href: string;
};

function toExclusiveItem(project: OffPlanProject): ExclusiveItem {
  return {
    id: project.id,
    title: project.title,
    location: project.location,
    image: project.image,
    features: [
      { label: "DEVELOPER", value: project.developer },
      { label: "PROPERTY TYPE", value: project.type },
      { label: "STARTING PRICE", value: project.price },
      { label: "HANDOVER", value: project.handoverDate },
    ],
    summary: project.description,
    handover: project.handoverDate,
    featured: project.featured,
    recentlyListed: project.recentlyListed,
    href: `/listings/${project.id}`,
  };
}

export function ExclusivesSection({ agencyName }: { agencyName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<ExclusiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadExclusives() {
      try {
        const liveResponse = await getProperties({ readiness: "OFFPLAN", limit: 8 });
        if (!active) return;

        const nextItems = liveResponse.properties
          .map(toApexOffPlanProject)
          .slice(0, 4)
          .map(toExclusiveItem);

        setItems(nextItems);
      } catch {
        if (active) {
          setItems([]);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadExclusives();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (currentIndex >= items.length && items.length > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, items.length]);

  const activeItem = items[currentIndex];
  const nextItem = items.length > 1 ? items[(currentIndex + 1) % items.length] : activeItem;

  const handleNext = () => {
    if (items.length < 2) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length < 2) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="bg-black py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h2 className="font-headline text-3xl md:text-4xl font-light tracking-[0.4em] text-white uppercase mb-3">
            EXCLUSIVES
          </h2>
          <p className="text-white/40 text-xs font-light italic tracking-[0.2em]">
            Discover live off-plan opportunities curated for {agencyName} clients
          </p>
        </div>

        {!activeItem ? (
          <div className="border border-white/10 bg-white/5 px-8 py-16 text-center text-sm uppercase tracking-[0.3em] text-white/40">
            {isLoading ? "Loading live exclusives..." : "No live exclusive projects are available right now."}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
              <div key={`img-${activeItem.id}`} className="lg:col-span-2 relative aspect-[4/5] overflow-hidden group animate-in fade-in duration-1000 zoom-in-105">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {(activeItem.featured || activeItem.recentlyListed) && (
                  <div className="absolute top-6 left-6 z-10 flex flex-col items-start gap-2">
                    {activeItem.featured && (
                      <span className="border border-[#D1A08B]/40 bg-[#D1A08B]/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md">
                        Featured
                      </span>
                    )}
                    {activeItem.recentlyListed && (
                      <span className="border border-white/10 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md">
                        Recently Listed
                      </span>
                    )}
                  </div>
                )}
                <div className="absolute bottom-8 left-8 space-y-2">
                  <div className="flex items-center gap-2 text-[#D1A08B]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{activeItem.location}</span>
                  </div>
                  <h3 className="text-white font-headline text-xl font-bold tracking-wider max-w-xs uppercase">
                    {activeItem.title}
                  </h3>
                </div>
              </div>

              <div key={`details-${activeItem.id}`} className="lg:col-span-2 flex flex-col justify-between py-2 space-y-10 animate-in fade-in slide-in-from-right-8 duration-1000">
                <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                  {activeItem.features.map((feature, idx) => (
                    <div key={idx} className="space-y-3 relative group">
                      <h4 className="text-[#D1A08B] text-[9px] font-bold uppercase tracking-[0.3em]">
                        {feature.label}
                      </h4>
                      <p className="text-white/60 text-[11px] font-light leading-relaxed">
                        {feature.value}
                      </p>
                      <div className="absolute -bottom-6 left-0 w-full h-[1px] bg-white/5 group-even:hidden" />
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <p className="text-white/40 text-xs font-light leading-loose tracking-wide">
                    {activeItem.summary}
                  </p>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">
                      Handover date: <span className="text-[#D1A08B]">{activeItem.handover}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <ConsultationDialog>
                    <Button className="bg-[#D1A08B] hover:bg-[#D1A08B]/90 text-white rounded-none px-10 h-12 uppercase tracking-[0.3em] text-[9px] font-bold">
                      Enquire now
                    </Button>
                  </ConsultationDialog>
                  <Button asChild variant="outline" className="border-[#B8860B]/30 text-[#B8860B] hover:bg-[#B8860B]/5 rounded-none px-10 h-12 uppercase tracking-[0.3em] text-[9px] font-bold bg-transparent">
                    <Link href={activeItem.href}>Learn more</Link>
                  </Button>
                </div>
              </div>

              {nextItem && items.length > 1 && (
                <div key={`peek-${nextItem.id}`} className="hidden lg:block lg:col-span-1 relative h-full grayscale opacity-20 group cursor-pointer transition-all duration-1000 hover:opacity-40 animate-in fade-in slide-in-from-right-12" onClick={handleNext}>
                  <Image
                    src={nextItem.image}
                    alt="Next Property"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-white text-[9px] font-bold uppercase tracking-[0.5em] -rotate-90 whitespace-nowrap">NEXT PROPERTY</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
              <button
                onClick={handlePrev}
                className="text-white/20 hover:text-[#D1A08B] transition-colors text-[9px] font-bold uppercase tracking-[0.4em]"
              >
                PREV
              </button>

              <div className="text-white font-light tracking-[0.4em] text-[10px]">
                <span className="text-white font-bold">{currentIndex + 1}</span>
                <span className="mx-3 text-white/10">/</span>
                <span className="text-white/30">{items.length}</span>
              </div>

              <button
                onClick={handleNext}
                className="text-white/20 hover:text-[#D1A08B] transition-colors text-[9px] font-bold uppercase tracking-[0.4em]"
              >
                NEXT
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
