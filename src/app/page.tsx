
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { ExclusivesSection } from "@/components/home/exclusives-section";
import { ListingSection } from "@/components/home/listing-section";
import { AreaGuides } from "@/components/home/area-guides";
import { NewsSection } from "@/components/home/news-section";
import { ContactSection } from "@/components/home/contact-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { FaqSection } from "@/components/home/faq-section";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Shield, Award, Gem, Globe } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Category Icons */}
      <section className="py-12 bg-card border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex justify-around items-center min-w-[800px]">
          {[
            { icon: Gem, label: "Luxury Villas" },
            { icon: Globe, label: "Penthouses" },
            { icon: Award, label: "Award Winning" },
            { icon: Shield, label: "Secured Units" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
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
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 h-14 rounded-full uppercase tracking-widest text-xs">
              Talk to an Agent
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold px-10 h-14 rounded-full uppercase tracking-widest text-xs">
              View Market Insights
            </Button>
          </div>
        </div>
      </section>

      <AreaGuides />

      <NewsSection />

      <ReviewsSection />

      <FaqSection />
      
      <ContactSection />
      
      <Footer />
    </main>
  );
}
