"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OwnerRelationsDialogProps {
  children: React.ReactNode;
}

export function OwnerRelationsDialog({ children }: OwnerRelationsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-black border-white/5 p-16 md:p-24 flex flex-col items-center text-center">
        <DialogHeader className="w-full flex flex-col items-center">
          <DialogTitle className="text-white text-2xl md:text-5xl font-extralight tracking-[0.2em] uppercase mb-12 leading-tight">
            Bought your property <br /> through Apex Residences?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-10 max-w-2xl">
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
            We're excited to introduce you to our Owner Relations team! <br />
            Whether you have questions or need support, we're here to help.
          </p>
          
          <p className="text-white/60 text-lg md:text-xl font-light pt-8">
            Reach out anytime at <span className="text-[#B8860B] font-medium border-b border-[#B8860B]/30 pb-1">owner.relations@apexresidences.com</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
