import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { ExclusivesSection } from "@/components/home/exclusives-section";
import { ListingSection } from "@/components/home/listing-section";
import { AreaGuides } from "@/components/home/area-guides";
import { TeamSection } from "@/components/home/team-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { FaqSection } from "@/components/home/faq-section";
import { NewsSection } from "@/components/home/news-section";
import { ContactSection } from "@/components/home/contact-section";
import { Button } from "@/components/ui/button";
import { Shield, Award, Gem, Globe } from "lucide-react";
import { ConsultationDialog } from "@/components/home/consultation-dialog";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Category Icons */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center gap-2">
          {[
            { icon: Gem, label: "Luxury Villas" },
            { icon: Globe, label: "Penthouses" },
            { icon: Award, label: "Award Winning" },
            { icon: Shield, label: "Secured Units" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer flex-1 text-center">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-muted/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-tighter sm:tracking-widest text-muted-foreground group-hover:text-primary transition-colors line-clamp-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <ExclusivesSection />

      <ListingSection />
      
      {/* Dynamic CTA */}
      <section className="relative py-32 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-95 z-0" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl md:text-6xl text-primary-foreground font-bold mb-8">Ready to Find Your <span className="text-white italic">Signature</span> Address?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <ConsultationDialog>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 h-14 rounded-full uppercase tracking-widest text-xs">
                Talk to an Agent
              </Button>
            </ConsultationDialog>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold px-10 h-14 rounded-full uppercase tracking-widest text-xs">
              <Link href="#news">View Market Insights</Link>
            </Button>
          </div>
        </div>
      </section>

      <AreaGuides />

      <TeamSection />

      <ReviewsSection />

      <FaqSection />

      <NewsSection />
      
      <ContactSection />
    </div>
  );
}
