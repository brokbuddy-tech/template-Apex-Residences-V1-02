"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConsultationDialog } from "@/components/home/consultation-dialog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ShieldCheck, TrendingUp, Zap, Camera, Film } from "lucide-react";

export default function SellPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === "sell-hero")?.imageUrl || "";
  const videoImg = PlaceHolderImages.find(img => img.id === "marketing-video")?.imageUrl || "";
  const photoImg = PlaceHolderImages.find(img => img.id === "marketing-photo")?.imageUrl || "";

  return (
    <div className="min-h-screen bg-black text-white font-body">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={heroImg}
          alt="Luxury Consultation"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl">
          <h1 className="font-headline text-4xl md:text-6xl xl:text-7xl font-thin tracking-[0.3em] uppercase leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
            LET&apos;S SELL YOUR PROPERTY <br /> <span className="font-bold">PROFITABLY</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light italic tracking-widest animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            &quot;Full process with us, from evaluation to a deal.&quot;
          </p>
          <div className="pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <ConsultationDialog>
              <Button className="border-2 border-[#B8860B] bg-transparent text-[#B8860B] hover:bg-[#B8860B] hover:text-black transition-all duration-500 rounded-none h-16 px-16 uppercase text-xs font-bold tracking-[0.4em] min-w-[300px]">
                CONTACT AN AGENT
              </Button>
            </ConsultationDialog>
          </div>
        </div>
      </section>

      {/* Work Principles */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-thin tracking-[0.4em] uppercase mb-20 text-center">
            OUR WORK <span className="font-bold">PRINCIPLES</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "TRANSPARENCY",
                desc: "We maintain absolute transparency throughout the selling process, keeping you informed at every critical milestone.",
              },
              {
                icon: TrendingUp,
                title: "BENEFIT",
                desc: "Our priority is finding the optimal market price to ensure you achieve the most profitable deal for your asset.",
              },
              {
                icon: Zap,
                title: "RAPIDITY",
                desc: "Leverage our extensive global buyer database and high-impact marketing for a swift and seamless transaction.",
              },
            ].map((principle, idx) => (
              <div key={idx} className="border border-[#B8860B]/20 p-12 space-y-6 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group">
                <principle.icon className="w-10 h-10 text-[#B8860B] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-headline text-xl font-bold tracking-[0.2em] uppercase">{principle.title}</h3>
                <p className="text-white/40 font-light leading-relaxed tracking-wide text-sm">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video Block */}
          <div className="relative aspect-[4/3] overflow-hidden group">
            <Image src={videoImg} alt="Video Production" fill className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end border-r border-[#B8860B]/10">
              <Film className="w-12 h-12 text-[#B8860B] mb-6" />
              <h3 className="font-headline text-2xl font-bold tracking-widest uppercase mb-4">CINEMATIC VIDEO</h3>
              <p className="text-white/70 font-light leading-relaxed max-w-md text-sm italic">
                We produce high-definition property films that tell a story, capturing the emotion and lifestyle of your signature address.
              </p>
            </div>
          </div>
          {/* Photo Block */}
          <div className="relative aspect-[4/3] overflow-hidden group">
            <Image src={photoImg} alt="Architectural Photography" fill className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end border-l border-[#B8860B]/10">
              <Camera className="w-12 h-12 text-[#B8860B] mb-6" />
              <h3 className="font-headline text-2xl font-bold tracking-widest uppercase mb-4">EXPERT PHOTOGRAPHY</h3>
              <p className="text-white/70 font-light leading-relaxed max-w-md text-sm italic">
                Our architectural photographers use specialized techniques to highlight the structural beauty and premium finishes of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-thin tracking-[0.4em] uppercase mb-24 text-center">
            HOW IT <span className="font-bold">WORKS</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { step: "01", title: "PREPARATION", desc: "Expert valuation, market analysis, and defining a bespoke sales strategy." },
              { step: "02", title: "PROMOTION", desc: "High-end content production and targeted marketing to our elite global audience." },
              { step: "03", title: "AGREEMENT", desc: "Managing inquiries, viewings, and professional negotiation of the best deal." },
              { step: "04", title: "PAYMENT", desc: "Coordinating legal documentation and ensuring secure financial closure." },
            ].map((item, idx) => (
              <div key={idx} className="space-y-6 relative">
                <span className="text-6xl md:text-7xl font-bold text-[#B8860B]/10 absolute -top-10 -left-4 pointer-events-none select-none italic">
                  {item.step}
                </span>
                <div className="pt-4">
                  <h3 className="font-headline text-lg font-bold tracking-[0.2em] uppercase mb-4 text-[#B8860B]">{item.title}</h3>
                  <p className="text-white/50 font-light leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Footer */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-panel p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 max-w-md">
              <h2 className="font-headline text-2xl md:text-3xl font-thin tracking-[0.2em] uppercase leading-tight">
                PROFESSIONAL <br /> <span className="font-bold">CONSULTATION</span>
              </h2>
              <p className="text-white/40 text-sm font-light tracking-widest italic">
                Fill the form and our senior advisor will contact you shortly.
              </p>
            </div>

            <form className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Name</label>
                <Input placeholder="Enter your name" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/10 focus-visible:ring-0 focus-visible:border-[#B8860B] transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Phone</label>
                <Input placeholder="Enter your phone" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-[#B8860B] transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">E-mail</label>
                <Input placeholder="Enter your email" className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-12 text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-[#B8860B] transition-all" />
              </div>
              <div className="md:col-span-3 pt-6 flex justify-end">
                <Button className="border border-[#B8860B] bg-[#B8860B] text-black hover:bg-black hover:text-[#B8860B] transition-all duration-500 rounded-none h-14 px-16 uppercase text-xs font-bold tracking-[0.4em] w-full md:w-auto">
                  SEND
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
