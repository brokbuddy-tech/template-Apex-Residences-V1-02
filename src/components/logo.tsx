import Image from 'next/image';

type LogoProps = {
  className?: string;
  logoUrl?: string | null;
  name?: string | null;
};

export function Logo({ className, logoUrl, name }: LogoProps) {
  const displayName = name || 'Agency Website';

  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className || ''}`}>
      {logoUrl ? (
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#B8860B]/20 bg-white md:h-10 md:w-10">
          <Image src={logoUrl} alt={displayName} fill className="object-contain p-1" />
        </div>
      ) : (
        <div className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L10 90H30L50 50L70 90H90L50 10Z" fill="#B8860B" />
            <path d="M50 30L35 60H65L50 30Z" fill="white" />
          </svg>
        </div>
      )}
      <span className="font-headline text-[11px] md:text-xl font-bold tracking-[0.2em] text-white whitespace-nowrap">
        {displayName}
      </span>
    </div>
  );
}
