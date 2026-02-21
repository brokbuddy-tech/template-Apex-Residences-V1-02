"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-headline text-3xl font-bold tracking-tighter">
                APEX <span className="text-accent">RESIDENCES</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed text-sm">
              We provide exclusive real estate services for high-net-worth individuals, offering a hand-picked portfolio of the most prestigious properties in the world.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-white border border-white/10 rounded-full">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-white border border-white/10 rounded-full">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-white border border-white/10 rounded-full">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-white border border-white/10 rounded-full">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-6 text-accent">Our Services</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="#" className="hover:text-accent transition-colors">Residential Sales</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Residential Lettings</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Commercial Real Estate</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Property Management</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Portfolio Investment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-6 text-accent">Popular Areas</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="#" className="hover:text-accent transition-colors">Palm Jumeirah</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Dubai Marina</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Downtown Dubai</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Emirates Hills</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">District One</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-6 text-accent">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-6 italic">Subscribe to receive exclusive off-plan launches and market insights.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-white/20 rounded-lg px-4 py-2 text-sm flex-1 outline-none focus:ring-1 ring-accent"
              />
              <Button className="bg-accent text-white hover:bg-accent/90">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-primary-foreground/50">
          <p>© 2024 APEX RESIDENCES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}