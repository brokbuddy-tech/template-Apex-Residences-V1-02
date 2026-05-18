"use client";

import React, { useState } from "react";
import {
  Phone, 
  Mail, 
  MapPin, 
  QrCode,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Property } from "@/lib/properties";
import { OffPlanProject } from "@/lib/off-plan-projects";
import type { SiteConfig } from "@/lib/live-types";
import { getAgencyDisplayName, getAgencyEmail, getAgencyPhone } from "@/lib/live-mappers";

interface BrochureDownloaderProps {
  property: Property | OffPlanProject;
  siteConfig?: SiteConfig | null;
  children: React.ReactElement<{
    disabled?: boolean;
    children?: React.ReactNode;
  }>;
}

/**
 * @fileOverview A dedicated component for generating and downloading property brochures.
 * It bypasses the preview modal and triggers a professional single-page A4 PDF download.
 */
export function BrochureDialog({ property, siteConfig, children }: BrochureDownloaderProps) {
  const [isPreparing, setIsPreparing] = useState(false);

  // Data mapping for consistency between properties and off-plan projects
  const title = property.title;
  const location = property.location;
  const price = property.price;
  const heroImage = property.image;
  const gallery = property.gallery ? property.gallery.slice(0, 6) : [];
  const description = 'longDescription' in property ? property.longDescription : property.description;
  const dldPermit = 'reraNumber' in property ? property.reraNumber : "238290231";
  const features = 'features' in property ? property.features : (property as any).amenities || [];
  const agencyName = getAgencyDisplayName(siteConfig);
  const phone = getAgencyPhone(siteConfig) || '+971 4 123 4567';
  const email = getAgencyEmail(siteConfig) || 'contact@agencywebsite.com';
  const address = siteConfig?.profile?.officeAddress || 'Dubai, UAE';
  const websiteLabel = (
    siteConfig?.branding?.website
    || siteConfig?.organization?.publicAgencyUrl
    || agencyName
  )
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/$/, '')
    .toUpperCase();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPreparing(true);
    
    // Brief delay to ensure the UI updates and the print engine captures the prepared state
    // We use a slightly longer delay to ensure all images are "decoded" by the browser
    setTimeout(() => {
      window.print();
      setIsPreparing(false);
    }, 800);
  };

  return (
    <>
      <div onClick={handleDownload} className="cursor-pointer w-full">
        {React.cloneElement(children, {
          disabled: isPreparing,
          children: isPreparing ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              PREPARING...
            </div>
          ) : (
            children.props.children
          )
        })}
      </div>

      {/* 
          HIDDEN PRINT ROOT
          This section is hidden during normal browsing and only visible to the print engine.
          It forces the browser to isolate this specific layout for the PDF.
      */}
      <div id="apex-brochure-print-root" className="hidden print:block fixed inset-0 z-[99999] bg-white text-black overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page { 
              size: A4 portrait; 
              margin: 0 !important; 
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              height: 297mm !important;
              width: 210mm !important;
              overflow: hidden !important;
              background-color: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            /* Explicitly hide everything EXCEPT the print root to prevent blank pages or bleed */
            body > *:not(#apex-brochure-print-root) {
              display: none !important;
            }
            #apex-brochure-print-root {
              display: block !important;
              visibility: visible !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              z-index: 999999 !important;
            }
          }
        `}} />
        
        <div className="w-[210mm] h-[297mm] bg-white flex flex-col overflow-hidden shadow-none">
          
          {/* Tier 1: Identity & Hero (55%) */}
          <div className="relative h-[55%] w-full flex flex-col shrink-0">
            <div className="flex h-[12%] w-full shrink-0">
              <div className="bg-[#F2F2F2] flex-1 flex flex-col justify-center px-10">
                <span className="text-[8px] font-bold tracking-[0.5em] text-black/30 uppercase mb-1">SIGNATURE RESIDENCE</span>
                <span className="text-xs font-bold tracking-[0.2em] text-black uppercase font-headline truncate">{location}</span>
              </div>
              <div className="bg-black w-[35%] flex items-center justify-center px-6">
                 <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10L10 90H30L50 50L70 90H90L50 10Z" fill="#B8860B" />
                  </svg>
                  <span className="max-w-[140px] break-words text-center text-white font-headline text-[9px] font-bold tracking-[0.2em] uppercase leading-tight">
                    {agencyName}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative flex-grow">
              {/* Using standard img for high-fidelity print reliability */}
              <img 
                src={heroImage} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover" 
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Price Tag Overlay */}
              <div className="absolute bottom-8 left-10 bg-black/90 px-8 py-4 border-l-4 border-[#B8860B]">
                <span className="text-white font-headline text-2xl font-bold tracking-[0.1em] uppercase">{price}</span>
              </div>
            </div>
          </div>

          {/* Tier 2: Details & Contact (45%) */}
          <div className="flex-grow w-full flex overflow-hidden">
            <div className="flex-grow p-10 flex flex-col gap-8 overflow-hidden">
              <div className="grid grid-cols-3 gap-2 aspect-[3/1.2] shrink-0">
                {gallery.map((img, i) => (
                  <div key={i} className="relative w-full h-full bg-[#F5F5F5] overflow-hidden">
                    <img src={img} alt={`View ${i+1}`} className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" />
                  </div>
                ))}
              </div>

              {/* Features & Amenities Section */}
              <div className="space-y-4 shrink-0">
                 <div className="flex items-center gap-4">
                  <h3 className="font-headline text-[9px] font-bold tracking-[0.4em] uppercase text-black">FEATURES & AMENITIES</h3>
                  <div className="h-[1px] flex-grow bg-black/5" />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {features.slice(0, 8).map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#B8860B]" />
                      <span className="text-[8.5px] font-bold uppercase tracking-widest text-black/60 truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 flex-grow overflow-hidden">
                <div className="flex items-center gap-4">
                  <h3 className="font-headline text-[9px] font-bold tracking-[0.4em] uppercase text-black">PROPERTY OVERVIEW</h3>
                  <div className="h-[1px] flex-grow bg-black/5" />
                </div>
                <p className="text-[10px] leading-relaxed text-black/50 font-body text-justify whitespace-pre-line line-clamp-[10]">
                  {description}
                </p>
              </div>
            </div>

            <div className="w-[35%] bg-black p-10 flex flex-col justify-between text-white shrink-0">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h4 className="font-headline text-xs font-bold tracking-[0.4em] uppercase text-[#B8860B] italic">Contact Specialist:</h4>
                  <div className="w-8 h-[1px] bg-[#B8860B]" />
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/80 truncate">{phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/80 truncate">{email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/80 truncate">{address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 flex flex-col items-center border-t border-white/10 pt-10">
                <div className="bg-white p-2">
                  <QrCode className="w-16 h-16 text-black" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[7px] font-bold tracking-[0.5em] uppercase text-white/30">DLD PERMIT NO</p>
                  <p className="text-xs font-bold tracking-[0.2em] text-white uppercase font-headline">{dldPermit}</p>
                </div>
                <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#B8860B]">{websiteLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
