"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { replaceTemplateBranding } from "@/lib/live-mappers";

type ReviewCard = {
  id: string;
  author: string;
  text: string;
  rating: number;
  location?: string;
  badgeLabel?: string;
};

function normalizeReviews(testimonials: unknown[], agencyName: string): ReviewCard[] {
  const normalized: ReviewCard[] = [];

  testimonials.forEach((item, index) => {
    const review = item as {
      id?: string;
      author?: string | null;
      name?: string | null;
      clientName?: string | null;
      message?: string | null;
      quote?: string | null;
      content?: string | null;
      rating?: number | null;
      location?: string | null;
      property?: string | null;
      badgeLabel?: string | null;
    };

    const text = review.message?.trim() || review.quote?.trim() || review.content?.trim() || "";
    if (!text) return;

    const author =
      review.author?.trim() ||
      review.name?.trim() ||
      review.clientName?.trim() ||
      "Anonymous";

    normalized.push({
      id: review.id || `${author}-${index}`,
      author,
      text: replaceTemplateBranding(text, agencyName),
      rating: typeof review.rating === "number" ? review.rating : 5,
      location: review.location?.trim() || review.property?.trim() || undefined,
      badgeLabel: review.badgeLabel?.trim() || "Client Review",
    });
  });

  return normalized;
}

export function ReviewsSection({
  agencyName,
  testimonials = [],
}: {
  agencyName: string;
  testimonials?: unknown[];
}) {
  const reviews = normalizeReviews(testimonials, agencyName);

  if (!reviews.length) return null;

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
            {reviews.map((review) => (
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

                  <div className="mt-12 flex items-end justify-between border-t border-white/5 pt-8">
                    <div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#D1A08B] text-[#D1A08B]" />
                        ))}
                      </div>
                      {review.location ? (
                        <p className="mt-4 text-[9px] font-bold tracking-[0.3em] uppercase text-white/30">
                          {review.location}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-[#D1A08B] text-[9px] font-bold tracking-[0.3em] uppercase">
                      {review.badgeLabel || "Client Review"}
                    </span>
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
