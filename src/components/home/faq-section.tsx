"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    question: "HOW DO I BOOK A PRIVATE VIEWING?",
    answer: "You can book a private viewing by clicking any 'Enquire Now' button or contacting our concierge directly. We arrange discrete, high-privacy tours for our signature residences at your convenience.",
  },
  {
    question: "WHAT ARE THE TRANSACTION FEES FOR DUBAI PROPERTY?",
    answer: "Standard transaction fees include a 4% DLD (Dubai Land Department) fee, a 2% agency commission, and minor administrative costs for the Title Deed and NOC. Our experts provide a full breakdown during your consultation.",
  },
  {
    question: "DO YOU OFFER OFF-PLAN INVESTMENT CONSULTATIONS?",
    answer: "Yes, APEX RESIDENCES specializes in off-plan launches from top developers like Emaar, Nakheel, and Select Group. We provide exclusive access to pre-launch units and performance data.",
  },
  {
    question: "CAN APEX RESIDENCES MANAGE MY INVESTMENT PORTFOLIO?",
    answer: "Our Asset Management division handles everything from high-yield short-term rentals to long-term maintenance, ensuring your signature address remains a high-performing asset.",
  },
  {
    question: "WHAT IS THE 'PRECISION DUE DILIGENCE' PROCESS?",
    answer: "Precision due diligence is our unique methodology for vetting properties. We analyze developer track records, structural integrity, market liquidity, and future area development before presenting a property to our clients.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-black py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-thin tracking-[0.5em] text-white uppercase mb-4">
            FAQ
          </h2>
          <p className="text-white/40 text-xs font-light italic tracking-[0.2em]">
            Expert answers to your most common real estate questions
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-white/10 hover:border-[#D1A08B]/30 transition-colors px-6 bg-white/[0.02]"
            >
              <AccordionTrigger className="text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:no-underline hover:text-[#D1A08B] text-left py-8">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/50 text-sm font-light leading-relaxed pb-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-20 text-center">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Still have questions?</p>
          <button className="text-[#D1A08B] border-b border-[#D1A08B]/30 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors">
            Contact our advisors
          </button>
        </div>
      </div>
    </section>
  );
}
