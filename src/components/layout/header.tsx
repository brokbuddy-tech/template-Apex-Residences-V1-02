"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/buy", label: "BUY" },
    { href: "/rent", label: "RENT" },
    { href: "/sell", label: "SELL" },
    { href: "/off-plan", label: "OFF-PLAN" },
    { href: "/about", label: "ABOUT US" },
    { href: "/services", label: "SERVICES" },
  ];

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
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#B8860B] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold uppercase tracking-widest px-6 h-10 rounded-none border-none">
            Contact Us
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white xl:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-white/10 text-white w-[300px] pt-16">
              <SheetHeader className="mb-12">
                <SheetTitle className="text-left text-white font-headline tracking-[0.2em] uppercase text-xl">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-8 text-[14px] font-bold uppercase tracking-[0.2em]">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="hover:text-[#B8860B] transition-colors border-b border-white/5 pb-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold uppercase tracking-widest h-12 rounded-none border-none w-full">
                  Contact Us
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
