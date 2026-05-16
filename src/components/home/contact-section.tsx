"use client";

import React, { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { getSiteConfig, submitOrgInquiry } from "@/lib/api";
import { getAgencyDisplayName, getAgencyEmail, getAgencyPhone } from "@/lib/live-mappers";
import { useToast } from "@/hooks/use-toast";
import type { SiteConfig } from "@/lib/live-types";

export function ContactSection() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let active = true;

    async function loadSiteConfig() {
      try {
        const nextSiteConfig = await getSiteConfig();
        if (active) {
          setSiteConfig(nextSiteConfig);
        }
      } catch {
        if (active) {
          setSiteConfig(null);
        }
      }
    }

    void loadSiteConfig();

    return () => {
      active = false;
    };
  }, []);

  const agencyName = getAgencyDisplayName(siteConfig);
  const phone = getAgencyPhone(siteConfig) || '+971 4 123 4567';
  const email = getAgencyEmail(siteConfig) || 'concierge@apexresidences.com';
  const address = siteConfig?.profile?.officeAddress || 'Marina Plaza, 12th Floor, Dubai Marina';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await submitOrgInquiry({
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        message: String(formData.get('message') || '').trim(),
        source: 'home-contact',
      });

      toast({
        title: 'Enquiry submitted',
        description: `${agencyName} will reach out shortly.`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: error instanceof Error ? error.message : 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Get In Touch</span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-6">Expert Advice on Your Property Journey</h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
              Whether you're looking to buy your dream home or sell a luxury property, our expert consultants are here to provide world-class guidance.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-0.5">Call Us</p>
                  <a href={`tel:${phone}`} className="font-bold text-foreground hover:text-primary">{phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-0.5">Email Us</p>
                  <a href={`mailto:${email}`} className="font-bold text-foreground hover:text-primary">{email}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-0.5">Visit Us</p>
                  <p className="font-bold text-foreground">{address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-3xl border shadow-xl">
            <h3 className="font-headline text-2xl font-bold mb-8 text-foreground">Send an Enquiry</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Full Name</label>
                  <Input name="name" placeholder="John Doe" className="bg-background border-muted rounded-xl h-12" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Email Address</label>
                  <Input name="email" type="email" placeholder="john@example.com" className="bg-background border-muted rounded-xl h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Phone Number</label>
                <Input name="phone" placeholder="+971 50 123 4567" className="bg-background border-muted rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Message</label>
                <Textarea name="message" placeholder="I'm interested in..." className="bg-background border-muted rounded-xl min-h-[120px]" required />
              </div>
              <Button disabled={isSubmitting} className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg">
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
