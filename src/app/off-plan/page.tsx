"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type { OffPlanProject } from "@/lib/off-plan-projects";
import { getProperties } from "@/lib/api";
import { toApexOffPlanProject } from "@/lib/live-mappers";
import { cleanQueryForCategory, matchesTemplateCategory, normalizeCategory } from "@/lib/search-utils";

function OffPlanPageContent() {
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const [projects, setProjects] = useState<OffPlanProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      setIsLoading(true);
      try {
        const liveResponse = await getProperties({
          readiness: 'OFFPLAN',
          q: cleanQueryForCategory(searchParams.get('q'), normalizeCategory(searchParams.get('category'))),
          minPrice: searchParams.get('minPrice') || undefined,
          maxPrice: searchParams.get('maxPrice') || undefined,
          bedrooms: searchParams.get('bedrooms') || undefined,
          bathrooms: searchParams.get('bathrooms') || undefined,
          minArea: searchParams.get('minArea') || undefined,
          maxArea: searchParams.get('maxArea') || undefined,
          limit: searchParams.get('category') ? 96 : 48,
        });
        if (!active) return;

        const liveProjects = liveResponse.properties
          .filter((property) => matchesTemplateCategory(property, searchParams.get('category')))
          .map(toApexOffPlanProject);
        setProjects(liveProjects);
      } catch {
        if (active) {
          setProjects([]);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      active = false;
    };
  }, [searchKey, searchParams]);

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <section className="relative h-[60vh] flex flex-col items-center justify-center pt-24 overflow-hidden border-b border-white/5">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
          alt="Dubai Skyline Sunset"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        <div className="relative z-10 text-center space-y-4">
          <div className="text-[10px] font-bold tracking-[0.3em] text-white/40 flex items-center justify-center gap-2 mb-8">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white">OFF-PLAN</span>
          </div>

          <h1 className="font-headline text-4xl md:text-6xl font-thin tracking-[0.4em] uppercase leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
            OFF PLAN IN <span className="font-bold text-[#B8860B]">DUBAI</span>
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-light tracking-[0.2em] italic uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            New and launched projects
          </p>
        </div>
      </section>

      <section className="bg-black/80 backdrop-blur-md sticky top-[72px] z-40 border-b border-white/10 px-6 py-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <FilterSelector label="Area" placeholder="ANY AREA" />
          <FilterSelector label="Projects" placeholder="ANY PROJECT" />
          <FilterSelector label="Property Type" placeholder="ANY TYPE" />
          <FilterSelector label="Developer" placeholder="ANY DEVELOPER" />
          <FilterSelector label="Category" placeholder="ANY CATEGORY" />
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-white/10 bg-white/5 text-white/40 uppercase tracking-[0.4em] font-light">
              {isLoading ? "Loading live off-plan projects..." : "No live off-plan projects are available right now."}
            </div>
          )}

          <div className="mt-24 flex items-center justify-center gap-8 text-[11px] font-bold tracking-[0.4em] text-white/20">
            <span className="text-white">01</span>
            <button className="hover:text-white transition-colors">02</button>
            <button className="hover:text-white transition-colors">03</button>
            <button className="hover:text-white transition-colors">04</button>
            <span className="mx-2">...</span>
            <button className="hover:text-[#B8860B] transition-colors">NEXT</button>
            <button className="hover:text-[#B8860B] transition-colors">LAST</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function OffPlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white tracking-widest uppercase text-xs">Loading off-plan projects...</p></div>}>
      <OffPlanPageContent />
    </Suspense>
  );
}

function FilterSelector({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 ml-1">{label}</label>
      <Select>
        <SelectTrigger className="w-full bg-transparent border-white/10 rounded-none h-12 uppercase text-[10px] tracking-widest text-white focus:ring-0 focus:ring-offset-0 hover:border-[#B8860B]/50 transition-colors">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-black border-white/10 text-white rounded-none">
          <SelectItem value="all">ALL</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function ProjectCard({ title, type, developer, image, exclusive, id }: OffPlanProject) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden cursor-pointer border border-white/5 bg-[#0a0a0a]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.7] group-hover:brightness-[0.9]"
      />

      {exclusive && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-black text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-white/20">
            EXCLUSIVE
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <div className="space-y-1">
          <h3 className="text-white font-headline text-2xl font-bold tracking-widest uppercase leading-tight">
            {title}
          </h3>
          <div className="flex flex-col gap-0.5">
            <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest italic">
              Type: {type}
            </p>
            <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest italic">
              Developer: {developer}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Link href={`/listings/${id}`} className="inline-block">
            <span className="text-white/60 group-hover:text-[#B8860B] transition-colors text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-2">
              EXPLORE
              <span className="w-8 h-[1px] bg-white/20 group-hover:bg-[#B8860B]/40 group-hover:w-12 transition-all" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
