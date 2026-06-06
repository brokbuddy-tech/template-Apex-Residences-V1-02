"use client";

import { ReviewCarousel } from "@/components/review-carousel";
import { normalizePublicTestimonials } from "@/lib/reviews";
import { replaceTemplateBranding } from "@/lib/live-mappers";

export function ReviewsSection({
  agencyName,
  testimonials = [],
}: {
  agencyName: string;
  testimonials?: unknown[];
}) {
  const reviews = normalizePublicTestimonials(testimonials).map((review) => ({
    ...review,
    quote: replaceTemplateBranding(review.quote, agencyName),
  }));

  return (
    <ReviewCarousel
      title="What Our Clients Say"
      description={`Real feedback from clients who trusted ${agencyName} with their property goals.`}
      items={reviews}
      variant="gold"
      className="border-t border-white/5"
    />
  );
}
