"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-24 px-6 bg-background">
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
                  <p className="font-bold text-foreground">+971 4 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-0.5">Email Us</p>
                  <p className="font-bold text-foreground">concierge@apexresidences.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-0.5">Visit Us</p>
                  <p className="font-bold text-foreground">Marina Plaza, 12th Floor, Dubai Marina</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-3xl border shadow-xl">
            <h3 className="font-headline text-2xl font-bold mb-8 text-foreground">Send an Enquiry</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Full Name</label>
                  <Input placeholder="John Doe" className="bg-background border-muted rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="bg-background border-muted rounded-xl h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Phone Number</label>
                <Input placeholder="+971 50 123 4567" className="bg-background border-muted rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Message</label>
                <Textarea placeholder="I'm interested in..." className="bg-background border-muted rounded-xl min-h-[120px]" />
              </div>
              <Button className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg">
                Submit Enquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
