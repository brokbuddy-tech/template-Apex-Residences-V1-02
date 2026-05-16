"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAgents } from "@/lib/api";
import { resolveTemplateImage } from "@/lib/media";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type TeamAgent = {
  id: string;
  name: string;
  title: string;
  experience: string;
  languages: string[];
  image: string;
  imageHint?: string;
  href?: string;
  specializations: string[];
};

export function TeamSection() {
  const [specialization, setSpecialization] = useState("");
  const [language, setLanguage] = useState("");
  const [agents, setAgents] = useState<TeamAgent[]>([]);

  useEffect(() => {
    let active = true;

    async function loadAgents() {
      try {
        const response = await getAgents();
        if (!active) return;

        const liveAgents = response.agents.map((agent) => {
          const avatar = resolveTemplateImage(agent.avatarUrl || agent.avatar, 'agent-1', agent.name);
          return {
            id: agent.slug || agent.id || agent.name,
            name: agent.name.toUpperCase(),
            title: agent.title || 'Property Consultant',
            experience: agent.yearsExperience ? `${agent.yearsExperience} Years` : 'Experienced Advisor',
            languages: agent.languages?.length ? agent.languages : ['English'],
            image: avatar?.src || '',
            imageHint: avatar?.hint,
            href: agent.slug ? `/agents/${agent.slug}` : undefined,
            specializations: agent.specializations?.map((item) => item.toLowerCase()) || [],
          } satisfies TeamAgent;
        });

        setAgents(liveAgents);
      } catch {
        if (active) {
          setAgents([]);
        }
      }
    }

    void loadAgents();

    return () => {
      active = false;
    };
  }, []);

  const filteredAgents = useMemo(() => agents.filter((agent) => {
    const matchesSpecialization = specialization
      ? agent.specializations.some((item) => item.includes(specialization))
        || agent.title.toLowerCase().includes(specialization)
      : true;
    const matchesLanguage = language
      ? agent.languages.some((item) => item.toLowerCase() === language)
      : true;
    return matchesSpecialization && matchesLanguage;
  }), [agents, language, specialization]);
  const visibleAgents = filteredAgents.length > 0 ? filteredAgents : agents;

  const handleReset = () => {
    setSpecialization("");
    setLanguage("");
  };

  return (
    <section className="bg-black py-24 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="space-y-4">
              <h2 className="font-headline text-xl md:text-2xl font-thin tracking-[0.5em] text-white uppercase">
                FIND YOUR <br /> <span className="font-bold">PARTNER</span>
              </h2>
              <p className="text-white/40 text-[10px] md:text-xs font-light leading-relaxed tracking-wide max-w-sm">
                Our team is highly experienced and knowledgeable across all aspects of the real estate industry.
                We are ready to answer your questions in over 30 languages.
              </p>
            </div>

            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-white/40">Specialization</label>
                  <Select value={specialization} onValueChange={setSpecialization}>
                    <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-10 uppercase text-[9px] tracking-widest focus:ring-0 focus:ring-offset-0 hover:border-[#B8860B]/50 transition-colors">
                      <SelectValue placeholder="ANY SPECIALIZATION" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white rounded-none">
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="off-plan">Off-Plan</SelectItem>
                      <SelectItem value="luxury">Luxury Rentals</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-white/40">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-10 uppercase text-[9px] tracking-widest focus:ring-0 focus:ring-offset-0 hover:border-[#B8860B]/50 transition-colors">
                      <SelectValue placeholder="ANY LANGUAGE" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white rounded-none">
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="russian">Russian</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-5 p-2 text-white/40 hover:text-[#B8860B] transition-colors border border-white/10 hover:border-[#B8860B]/50"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <Button asChild variant="outline" className="w-full border-white/10 text-white hover:bg-white hover:text-black rounded-none h-12 uppercase tracking-[0.4em] text-[9px] font-bold transition-all duration-500">
                <Link href="/agents">SHOW ALL</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 relative animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
            {visibleAgents.length > 0 ? (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {visibleAgents.map((agent) => {
                    const avatar = resolveTemplateImage(agent.image, 'agent-1', agent.name);

                    return (
                    <CarouselItem key={agent.id} className="pl-4 basis-full sm:basis-1/2 xl:basis-1/2 group">
                      <div className="relative aspect-[4/5] overflow-hidden transition-all duration-700">
                        <Image
                          src={avatar?.src || ""}
                          alt={avatar?.alt || agent.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          data-ai-hint={avatar?.hint || agent.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="space-y-2">
                            <p className="text-white text-[8px] font-bold uppercase tracking-[0.3em]">
                              {agent.title}
                            </p>
                            {agent.href ? (
                              <Link href={agent.href} className="text-white text-base font-headline font-bold tracking-widest uppercase hover:text-[#B8860B] transition-colors">
                                {agent.name}
                              </Link>
                            ) : (
                              <h3 className="text-white text-base font-headline font-bold tracking-widest uppercase">
                                {agent.name}
                              </h3>
                            )}
                            <div className="pt-3 flex items-center justify-between border-t border-white/10 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              <div className="space-y-0.5">
                                <p className="text-white/40 text-[7px] uppercase tracking-widest">Experience</p>
                                <p className="text-white text-[9px] font-bold">{agent.experience}</p>
                              </div>
                              <div className="space-y-0.5 text-right">
                                <p className="text-white/40 text-[7px] uppercase tracking-widest">Languages</p>
                                <p className="text-white text-[9px] font-bold">{agent.languages.join(", ")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  )})}
                </CarouselContent>

                <div className="flex gap-3 mt-6 justify-end lg:pr-4">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-none bg-transparent border-white/10 text-white hover:bg-[#B8860B] hover:border-[#B8860B] transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </CarouselPrevious>
                  <CarouselNext className="static translate-y-0 h-10 w-10 rounded-none bg-transparent border-white/10 text-white hover:bg-[#B8860B] hover:border-[#B8860B] transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </CarouselNext>
                </div>
              </Carousel>
            ) : (
              <div className="flex min-h-[420px] items-center justify-center border border-white/10 bg-white/5 px-8 text-center text-sm uppercase tracking-[0.3em] text-white/40">
                Live advisor profiles will appear here once they are available.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
