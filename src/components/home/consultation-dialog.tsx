"use client";

import React, { useEffect, useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSiteConfig, submitOrgInquiry, toSocialUrl } from "@/lib/api";
import { getAgencyDisplayName, getAgencyPhone } from "@/lib/live-mappers";
import { useToast } from "@/hooks/use-toast";
import type { SiteConfig } from "@/lib/live-types";

interface ConsultationDialogProps {
  children: React.ReactNode;
}

export function ConsultationDialog({ children }: ConsultationDialogProps) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const agencyName = getAgencyDisplayName(siteConfig);
  const phone = getAgencyPhone(siteConfig) || '+971 4 123 4567';
  const whatsappHref = toSocialUrl(
    'whatsapp',
    siteConfig?.profile?.contact?.whatsappNumber || siteConfig?.branding?.whatsapp || phone,
  ) || '#';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await submitOrgInquiry({
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        message: `Prompt consultation request from ${agencyName}.`,
        templateName: 'Apex Residences',
        formContext: 'consultation-dialog',
      });

      toast({
        title: 'Consultation requested',
        description: `${agencyName} will contact you shortly.`,
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Request failed',
        description: error instanceof Error ? error.message : 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-[#0a0a0a] border-white/5 p-6 md:p-10 flex flex-col items-center">
        <DialogHeader className="mb-8 w-full flex flex-col items-center text-center sm:text-center">
          <DialogTitle className="text-white text-[25px] font-extralight tracking-[0.4em] uppercase mb-4 leading-tight">
            Prompt Consultation
          </DialogTitle>
          <p className="text-white/40 text-sm md:text-base font-light tracking-[0.2em]">
            Fill form below and our agent will contact you shortly
          </p>
        </DialogHeader>

        <form className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-end justify-center" onSubmit={handleSubmit}>
          <div className="flex-1 w-full">
            <Input
              name="name"
              placeholder="Your Name"
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-[#B8860B] transition-colors text-base"
              required
            />
          </div>
          <div className="flex-1 w-full">
            <Input
              name="phone"
              placeholder="Your Phone"
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-[#B8860B] transition-colors text-base"
            />
          </div>
          <div className="flex-1 w-full">
            <Input
              name="email"
              type="email"
              placeholder="Your E-Mail"
              className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-[#B8860B] transition-colors text-base"
              required
            />
          </div>
          <div className="w-full md:w-auto">
            <Button disabled={isSubmitting} className="border border-[#B8860B] bg-transparent text-[#B8860B] hover:bg-[#B8860B] hover:text-white rounded-none uppercase tracking-[0.3em] font-medium px-10 h-14 text-base transition-all min-w-[150px]">
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </form>

        <div className="mt-10 flex items-center gap-4 text-white/40 text-[9px] md:text-xs font-light tracking-[0.3em] uppercase">
          <span>Or contact us right now via</span>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#B8860B] hover:text-[#B8860B]/80 transition-colors font-bold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
