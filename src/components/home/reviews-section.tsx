"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const REVIEWS_DATA = [
  {
    id: 1,
    author: "OMER KHAN",
    text: "APEX RESIDENCES provided an exceptional service. Their attention to detail in finding our penthouse in Downtown Dubai was unmatched. Truly the gold standard of real estate.",
    rating: 5,
  },
  {
    id: 2,
    author: "SARAH JENKINS",
    text: "The team at APEX is professional and highly discrete. They truly understand the luxury market in Dubai and helped us secure a signature villa in Palm Jumeirah.",
    rating: 5,
  },
  {
    id: 3,
    author: "DAVID CHEN",
    text: "Found my signature address through their exclusive portfolio. Highly recommended for high-net-worth investors looking for precision and due diligence.",
    rating: 5,
  },
  {
    id: 4,
    author: "ELENA RODRIGUEZ",
    text: "Seamless experience from start to finish. The property management team is also top-notch, handling every aspect of our investment with care.",
    rating: 5,
  },
];

export function ReviewsSection() {
  return (
    <section className="bg-black py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-headline text-3xl md:text-4xl font-thin tracking-[0.5em] text-white uppercase mb-4">
            REVIEWS
          </h2>
          <div className="w-12 h-[1px] bg-[#D1A08B] mx-auto mt-8 opacity-50" />
        </div>

        {/* Carousel Container */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-6">
            {REVIEWS_DATA.map((review) => (
              <CarouselItem key={review.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="h-full bg-white/[0.03] border border-white/10 p-10 md:p-12 flex flex-col justify-between group hover:border-white/20 transition-all duration-500">
                  <div className="space-y-8">
                    <h3 className="text-white text-xs font-bold tracking-[0.3em] uppercase">
                      {review.author}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base font-light leading-loose italic">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D1A08B] text-[#D1A08B]" />
                      ))}
                    </div>
                    <button className="text-[#D1A08B] text-[9px] font-bold tracking-[0.3em] uppercase hover:text-white transition-colors">
                      READ MORE
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Controls */}
          <div className="mt-16 flex items-center justify-between px-2">
            <CarouselPrevious className="static translate-y-0 h-auto bg-transparent border-none text-white/20 hover:text-white transition-colors rounded-none p-0 text-[9px] font-bold tracking-[0.4em] uppercase">
              PREV
            </CarouselPrevious>
            
            <button className="text-white/20 hover:text-[#D1A08B] transition-colors text-[9px] font-bold tracking-[0.4em] uppercase">
              Show All
            </button>

            <CarouselNext className="static translate-y-0 h-auto bg-transparent border-none text-white/20 hover:text-white transition-colors rounded-none p-0 text-[9px] font-bold tracking-[0.4em] uppercase">
              NEXT
            </CarouselNext>
          </div>
        </Carousel>

        {/* Primary CTA */}
        <div className="mt-24 flex justify-center">
          <Button variant="outline" className="border-[#D1A08B]/30 text-[#D1A08B] hover:bg-[#D1A08B] hover:text-white transition-all duration-500 rounded-none px-12 h-14 uppercase tracking-[0.3em] text-[10px] font-bold bg-transparent">
            Leave your review
          </Button>
        </div>
      </div>
    </section>
  );
}
