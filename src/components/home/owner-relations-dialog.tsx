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
      <DialogContent className="max-w-2xl bg-black border-white/5 p-10 md:p-16 flex flex-col items-center text-center justify-center">
        <DialogHeader className="w-full flex flex-col items-center justify-center">
          <DialogTitle className="text-white text-xl md:text-2xl font-extralight tracking-[0.2em] uppercase mb-8 leading-tight text-center">
            Bought your property <br /> through Apex Residences?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-w-lg">
          <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
            We're excited to introduce you to our Owner Relations team! <br />
            Whether you have questions or need support, we're here to help.
          </p>
          
          <p className="text-white/60 text-sm md:text-base font-light pt-4">
            Reach out anytime at <br className="md:hidden" />
            <span className="text-[#B8860B] font-medium border-b border-[#B8860B]/30 pb-1 break-all md:break-normal">owner.relations@apexresidences.com</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
