"use client";

import React from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  QrCode,
  CheckCircle2,
  FileText
} from "lucide-react";
import { Property } from "@/lib/properties";
import { OffPlanProject } from "@/lib/off-plan-projects";

interface BrochureDialogProps {
  property: Property | OffPlanProject;
  children: React.ReactNode;
}

export function BrochureDialog({ property, children }: BrochureDialogProps) {
  // Data mapping for consistency
  const title = property.title;
  const location = property.location;
  const price = property.price;
  const heroImage = property.image;
  const gallery = property.gallery ? property.gallery.slice(0, 6) : [];
  const description = 'longDescription' in property ? property.longDescription : property.description;
  const dldPermit = 'reraNumber' in property ? property.reraNumber : "238290231";
  const features = 'features' in property ? property.features : (property as any).amenities || [];

  return (
    <Dialog onOpenChange={(open) => { 
      if(open) {
        // Short delay to ensure images are requested and DOM is stable before triggering print
        setTimeout(() => {
          window.print();
        }, 500);
      }
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-5xl p-0 bg-white border-none overflow-hidden rounded-none h-[90vh] flex flex-col z-[100] print:fixed print:inset-0 print:m-0 print:p-0 print:h-screen print:w-screen print:z-[999999] print:bg-white print:block shadow-2xl">
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
            /* Hide everything but the brochure */
            body > *:not([data-radix-portal]) {
              display: none !important;
            }
            [data-radix-portal] > div:not(:last-child) {
              display: none !important;
            }
            /* Ensure the content fills exactly one A4 page */
            #printable-brochure-container {
              display: block !important;
              visibility: visible !important;
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 210mm !important;
              height: 297mm !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              z-index: 999999 !important;
              overflow: hidden !important;
            }
            #printable-brochure {
              width: 210mm !important;
              height: 297mm !important;
              display: flex !important;
              flex-direction: column !important;
              background: white !important;
              page-break-after: avoid !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}} />
        
        <DialogHeader className="p-6 bg-white flex-row justify-between items-center border-b shrink-0 space-y-0 no-print">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">Preparing Brochure...</DialogTitle>
          </div>
          <Button onClick={() => window.print()} size="sm" variant="outline" className="gap-2 h-10 px-6 text-[10px] font-bold uppercase tracking-widest border-black/10 hover:bg-black hover:text-white">
            <FileText className="w-3.5 h-3.5" /> Save as PDF
          </Button>
        </DialogHeader>
        
        <div id="printable-brochure-container" className="flex-grow overflow-y-auto p-12 bg-muted/30 print:p-0 print:bg-white print:overflow-hidden">
          <div id="printable-brochure" className="w-full max-w-[800px] mx-auto bg-white aspect-[1/1.414] flex flex-col print:w-[210mm] print:h-[297mm] overflow-hidden shadow-sm">
            
            {/* Tier 1: Identity & Hero (55%) */}
            <div className="relative h-[55%] w-full flex flex-col shrink-0">
              <div className="flex h-[12%] w-full shrink-0">
                <div className="bg-[#F2F2F2] flex-1 flex flex-col justify-center px-10">
                  <span className="text-[8px] font-bold tracking-[0.5em] text-black/30 uppercase mb-1 leading-none">SIGNATURE RESIDENCE</span>
                  <span className="text-xs font-bold tracking-[0.2em] text-black uppercase font-headline truncate">{location}</span>
                </div>
                <div className="bg-black w-[35%] flex items-center justify-center px-6">
                   <div className="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 10L10 90H30L50 50L70 90H90L50 10Z" fill="#B8860B" />
                    </svg>
                    <span className="text-white font-headline text-[9px] font-bold tracking-[0.2em] uppercase leading-tight">
                      APEX <br/> <span className="font-light">RESIDENCES</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative flex-grow">
                <Image 
                  src={heroImage} 
                  alt={title} 
                  fill 
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
                    <div key={i} className="relative w-full h-full bg-muted overflow-hidden">
                      <Image src={img} alt={`View ${i+1}`} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>

                <div className="space-y-4 shrink-0">
                   <div className="flex items-center gap-4">
                    <h3 className="font-headline text-[9px] font-bold tracking-[0.4em] uppercase text-black">SPECIFICATIONS</h3>
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
                  <p className="text-[10px] leading-relaxed text-black/50 font-serif italic text-justify line-clamp-[12]">
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
                    <ContactDetail icon={Phone} text="+971 4 123 4567" />
                    <ContactDetail icon={Mail} text="concierge@apexresidences.com" />
                    <ContactDetail icon={MapPin} text="Dubai Marina, UAE" />
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
                  <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#B8860B]">
                    APEXRESIDENCES.COM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ContactDetail({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/80 truncate">{text}</span>
    </div>
  );
}