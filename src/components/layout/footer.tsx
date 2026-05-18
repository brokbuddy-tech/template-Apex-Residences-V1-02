"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { getSiteConfig, toSocialUrl } from "@/lib/api";
import { getAgencyDisplayName, getAgencyEmail, getAgencyPhone } from "@/lib/live-mappers";
import { Logo } from "@/components/logo";
import type { SiteConfig } from "@/lib/live-types";

export function Footer() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

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

  const displayName = getAgencyDisplayName(siteConfig);
  const logoUrl = siteConfig?.profile?.logo || null;
  const phone = getAgencyPhone(siteConfig) || '+971 4 123 4567';
  const email = getAgencyEmail(siteConfig) || 'contact@agencywebsite.com';
  const address = siteConfig?.profile?.officeAddress || 'Marina Plaza, 12th Floor, Dubai Marina';
  const description = siteConfig?.branding?.bio
    || siteConfig?.profile?.aboutCompany
    || `${displayName} provides discrete real estate services for high-net-worth individuals, offering an exclusive portfolio of the world's most prestigious residences.`;

  const socialLinks = useMemo(() => ([
    { href: siteConfig?.profile?.social?.facebookUrl || '#', label: 'Facebook', icon: Facebook },
    { href: toSocialUrl('instagram', siteConfig?.profile?.social?.instagramUrl || siteConfig?.branding?.instagram) || '#', label: 'Instagram', icon: Instagram },
    { href: toSocialUrl('twitter', siteConfig?.profile?.social?.twitterUrl || siteConfig?.branding?.twitter) || '#', label: 'Twitter', icon: Twitter },
    { href: toSocialUrl('linkedin', siteConfig?.branding?.linkedin) || '#', label: 'Linkedin', icon: Linkedin },
  ]), [siteConfig]);

  return (
    <footer className="bg-black text-white py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="space-y-10">
            <Link href="/" className="inline-block" aria-label={displayName}>
              <Logo logoUrl={logoUrl} name={displayName} />
            </Link>
            <p className="text-white/50 leading-relaxed text-sm font-light">
              {description}
            </p>
            <div className="space-y-3 text-sm font-light text-white/60">
              <a href={`tel:${phone}`} className="block hover:text-white transition-colors">{phone}</a>
              <a href={`mailto:${email}`} className="block hover:text-white transition-colors">{email}</a>
              <p>{address}</p>
            </div>
            <div className="flex gap-6">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#B8860B] transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-10 text-[#B8860B] tracking-widest">Global Expertise</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <li><Link href="/buy" className="hover:text-white transition-colors">Residential Sales</Link></li>
              <li><Link href="/off-plan" className="hover:text-white transition-colors">Investment Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Property Management</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Asset Valuation</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Market Research</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-10 text-[#B8860B] tracking-widest">Premium Areas</h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              {(siteConfig?.featuredAreas?.length ? siteConfig.featuredAreas : ['Palm Jumeirah', 'Dubai Marina', 'Downtown Dubai', 'Emirates Hills', 'MBR City']).slice(0, 5).map((area) => (
                <li key={area}><Link href="/buy" className="hover:text-white transition-colors">{area}</Link></li>
              ))}
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
              <button className="text-[#B8860B] hover:text-white transition-colors" type="button">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          <p>&copy; {new Date().getFullYear()} {displayName}. Luxury Real Estate Dubai.</p>
          <div className="flex gap-12">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
