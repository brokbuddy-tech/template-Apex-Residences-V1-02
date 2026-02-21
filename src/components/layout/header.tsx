"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, User, Phone } from "lucide-react";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-headline text-2xl font-bold tracking-tighter text-primary">
              APEX <span className="text-accent">RESIDENCES</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium uppercase tracking-wide">
            <Link href="/buy" className="hover:text-accent transition-colors">Buy</Link>
            <Link href="/rent" className="hover:text-accent transition-colors">Rent</Link>
            <Link href="/sell" className="hover:text-accent transition-colors">Sell</Link>
            <Link href="/areas" className="hover:text-accent transition-colors">Areas</Link>
            <Link href="/agents" className="hover:text-accent transition-colors">Agents</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-muted/20 rounded-full px-3 py-1.5 border focus-within:ring-1 ring-accent transition-all">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="bg-transparent border-none outline-none text-xs ml-2 w-32 focus:w-48 transition-all"
            />
          </div>
          
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <Phone className="w-4 h-4" />
            <span>Contact</span>
          </Button>

          <Link href="/login">
            <Button size="sm" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}