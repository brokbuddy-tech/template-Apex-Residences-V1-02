
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { getSiteConfig } from "@/lib/api";
import { getAgencyDisplayName } from "@/lib/live-mappers";
import type { SiteConfig } from "@/lib/live-types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const pathname = usePathname();
  const desktopNavRef = useRef<HTMLElement | null>(null);
  const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { href: "/buy", label: "BUY" },
    { href: "/rent", label: "RENT" },
    { href: "/sell", label: "SELL" },
    { href: "/off-plan", label: "OFF-PLAN" },
    { href: "/agents", label: "AGENTS" },
    { href: "/services", label: "SERVICES" },
    { href: "/about", label: "ABOUT US" },
  ];
  const displayName = getAgencyDisplayName(siteConfig);
  const logoUrl = siteConfig?.profile?.logo || null;
  const activeNavHref = navLinks.find((link) => pathname === link.href || pathname.startsWith(`${link.href}/`))?.href;
  const [activeUnderline, setActiveUnderline] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const updateUnderline = () => {
      if (!activeNavHref || !desktopNavRef.current) {
        setActiveUnderline(null);
        return;
      }

      const activeLink = desktopLinkRefs.current[activeNavHref];
      if (!activeLink) {
        setActiveUnderline(null);
        return;
      }

      const navRect = desktopNavRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setActiveUnderline({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeNavHref]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-12 py-4 md:py-6",
        isScrolled ? "bg-black/95 backdrop-blur-md border-b border-white/5 py-3 md:py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <Link href="/" aria-label={displayName}>
          <Logo logoUrl={logoUrl} name={displayName} />
        </Link>

        <nav ref={desktopNavRef} className="relative hidden lg:flex items-center gap-10 pb-2 text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">
          {activeUnderline && (
            <span
              className="pointer-events-none absolute bottom-0 h-px bg-[#B8860B] transition-all duration-300 ease-out"
              style={{
                left: activeUnderline.left,
                width: activeUnderline.width,
              }}
            />
          )}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(node) => {
                desktopLinkRefs.current[link.href] = node;
              }}
              aria-current={link.href === activeNavHref ? "page" : undefined}
              className={cn(
                "relative py-1 hover:text-[#B8860B] transition-colors",
                link.href === activeNavHref && "text-[#B8860B]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-6">
          <Button asChild className="hidden md:flex bg-[#B8860B] hover:bg-[#B8860B]/90 text-white text-[12px] font-bold uppercase tracking-widest px-6 h-10 rounded-none border-none">
            <Link href="/#contact">Contact Us</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white lg:hidden p-0 w-8 h-8">
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
                <Link href="/" className="text-white/70 hover:text-[#B8860B] transition-colors border-b border-white/5 pb-2">
                  {displayName}
                </Link>
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="hover:text-[#B8860B] transition-colors border-b border-white/5 pb-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 bg-[#B8860B] hover:bg-[#B8860B]/90 text-white text-[12px] font-bold uppercase tracking-widest h-12 rounded-none border-none w-full">
                  <Link href="/#contact">Contact Us</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
