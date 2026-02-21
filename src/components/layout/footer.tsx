"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-black text-white py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="space-y-10">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L10 90H30L50 50L70 90H90L50 10Z" fill="#B8860B" />
                </svg>
                <span className="font-headline text-2xl font-bold tracking-[0.2em]">
                  APEX <span className="font-light">RESIDENCES</span>
                </span>
              </div>
            </Link>
            <p className="text-white/50 leading-relaxed text-sm font-light">
              Apex Residences provides discrete real estate services for high-net-worth individuals, offering an exclusive portfolio of the world's most prestigious residences.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/40 hover:text-[#B8860B] transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="text-white/40 hover:text-[#B8860B] transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="text-white/40 hover:text-[#B8860B] transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="text-white/40 hover:text-[#B8860B] transition-colors"><Linkedin className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-10 text-[#B8860B] tracking-widest">Global Expertise</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">Residential Sales</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Investment Portfolio</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Property Management</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Asset Valuation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Market Research</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-10 text-[#B8860B] tracking-widest">Premium Areas</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">Palm Jumeirah</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dubai Marina</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Downtown Dubai</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Emirates Hills</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">MBR City</Link></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="font-headline text-lg font-bold text-[#B8860B] tracking-widest">Market Insights</h4>
            <p className="text-sm text-white/50 font-light italic">Subscribe to receive exclusive off-plan launches and market performance data.</p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Business Email" 
                className="bg-transparent text-sm flex-1 outline-none text-white font-light"
              />
              <button className="text-[#B8860B] hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          <p>© 2024 APEX RESIDENCES. LUXURY REAL ESTATE DUBAI.</p>
          <div className="flex gap-12">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}