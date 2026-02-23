
"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function NewsSection() {
  const news1 = PlaceHolderImages.find((img) => img.id === "news-1")?.imageUrl || "";
  const news2 = PlaceHolderImages.find((img) => img.id === "news-2")?.imageUrl || "";
  const news3 = PlaceHolderImages.find((img) => img.id === "news-3")?.imageUrl || "";

  return (
    <section className="bg-black py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-thin tracking-[0.5em] text-white uppercase mb-4">
            News
          </h2>
          <p className="text-white/40 text-xs font-light tracking-[0.2em] italic max-w-2xl mx-auto">
            Our team constantly shares the latest news about life, the real estate market and important events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Pillar: Large Featured Story */}
          <div className="lg:col-span-2 relative group cursor-pointer overflow-hidden min-h-[400px] border border-white/5">
            <Image
              src={news1}
              alt="Hillsedge Sales"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-8 flex items-center justify-between border-t border-white/5">
              <h3 className="text-white font-headline text-lg md:text-xl font-thin tracking-[0.2em] uppercase">
                START OF SALES: HILLSEDGE
              </h3>
              <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          {/* Right Pillar: Stacked Stories */}
          <div className="flex flex-col gap-6">
            {/* Top Story */}
            <div className="flex-1 flex flex-col group cursor-pointer overflow-hidden border border-white/5 hover:border-white/20 transition-colors duration-500 bg-white/[0.02]">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={news2}
                  alt="LIV Maritime"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase leading-relaxed">
                  PRELAUNCH: LIV MARITIME
                </h3>
                <div className="flex justify-end mt-4">
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-all duration-500" />
                </div>
              </div>
            </div>

            {/* Bottom Story */}
            <div className="flex-1 flex flex-col group cursor-pointer overflow-hidden border border-white/5 hover:border-white/20 transition-colors duration-500 bg-white/[0.02]">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={news3}
                  alt="Market 2024"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase leading-relaxed">
                  DUBAI REAL ESTATE PROPERTY MARKET IN 2024
                </h3>
                <div className="flex justify-end mt-4">
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
