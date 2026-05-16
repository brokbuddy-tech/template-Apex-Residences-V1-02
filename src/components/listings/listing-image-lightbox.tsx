"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface ListingImageLightboxProps {
  images: string[];
  title: string;
  open: boolean;
  activeIndex: number;
  onOpenChange: (open: boolean) => void;
  onActiveIndexChange: (index: number) => void;
}

export function ListingImageLightbox({
  images,
  title,
  open,
  activeIndex,
  onOpenChange,
  onActiveIndexChange,
}: ListingImageLightboxProps) {
  if (images.length === 0) {
    return null;
  }

  const safeActiveIndex = ((activeIndex % images.length) + images.length) % images.length;
  const activeImage = images[safeActiveIndex] || images[0];

  const showPrevious = () => {
    onActiveIndexChange((safeActiveIndex - 1 + images.length) % images.length);
  };

  const showNext = () => {
    onActiveIndexChange((safeActiveIndex + 1) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/95 z-[9999]" />
        <DialogContent className="fixed inset-0 z-[10000] flex flex-col items-center justify-center w-screen h-screen max-w-none m-0 p-0 border-none bg-transparent shadow-none !translate-x-0 !translate-y-0 !top-0 !left-0 [&>button:last-child]:hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{title} gallery</DialogTitle>
            <DialogDescription>
              Fullscreen gallery view for {title}.
            </DialogDescription>
          </DialogHeader>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute top-6 left-6 text-white bg-black/50 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black/70 transition-colors z-[101]"
          >
            <ChevronLeft size={20} /> Back to gallery
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt={`${title} image ${safeActiveIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority={open}
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Show previous image"
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Show next image"
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-6 right-6 text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md text-sm font-medium z-[101]">
            {safeActiveIndex + 1} / {images.length}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
