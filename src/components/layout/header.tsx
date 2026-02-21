"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-6",
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L10 90H30L50 50L70 90H90L50 10Z" fill="#B8860B" />
              <path d="M50 30L35 60H65L50 30Z" fill="white" />
            </svg>
          </div>
          <span className="font-headline text-xl font-bold tracking-[0.2em] text-white">
            APEX <span className="font-light">RESIDENCES</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-10 text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">
          <Link href="/buy" className="hover:text-[#B8860B] transition-colors">Buy</Link>
          <Link href="/sell" className="hover:text-[#B8860B] transition-colors">Sell</Link>
          <Link href="/invest" className="hover:text-[#B8860B] transition-colors">Invest</Link>
          <Link href="/off-plan" className="hover:text-[#B8860B] transition-colors">Off-Plan</Link>
          <Link href="/rent" className="hover:text-[#B8860B] transition-colors">Rent</Link>
          <Link href="/guides" className="hover:text-[#B8860B] transition-colors">Guides</Link>
        </nav>

        <div className="flex items-center gap-6">
          <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold uppercase tracking-widest px-6 h-10 rounded-none border-none">
            Instant Valuation
          </Button>

          <Button variant="ghost" size="icon" className="text-white xl:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
