import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { getAgentProfile, getSiteConfig, toSocialUrl } from "@/lib/api";
import { ListingCard } from "@/components/listings/listing-card";
import type { Property } from "@/lib/properties";
import { getAgencyDisplayName, toApexProperty } from "@/lib/live-mappers";
import { resolveTemplateImage } from "@/lib/media";

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ agentSlug: string }>;
}) {
  const { agentSlug } = await params;
  const [siteConfig, profileResponse] = await Promise.all([
    getSiteConfig(),
    getAgentProfile(agentSlug),
  ]);

  if (!profileResponse?.agent) {
    notFound();
  }

  const agencyName = getAgencyDisplayName(siteConfig);
  const agent = profileResponse.agent;
  const coverImage = resolveTemplateImage(agent.coverImageUrl || agent.coverImage, 'hero-bg', `${agent.name} cover`);
  const avatar = resolveTemplateImage(agent.avatarUrl || agent.avatar, 'agent-1', agent.name);
  const activeListings: Property[] = profileResponse.activeListings.map(toApexProperty);
  const whatsappHref = toSocialUrl('whatsapp', agent.whatsapp || agent.phone);
  const brokerRegistrationNumber = agent.brn || agent.licenseNumber;

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden border-b border-white/5">
        {coverImage && (
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            data-ai-hint={coverImage.hint}
            fill
            className="object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />

        <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-12 items-end">
          <div className="relative aspect-square w-full max-w-[280px] overflow-hidden border border-white/10">
            {avatar && (
              <Image
                src={avatar.src}
                alt={avatar.alt}
                data-ai-hint={avatar.hint}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="space-y-6">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#B8860B] uppercase">{agencyName}</p>
            <div>
              <h1 className="font-headline text-4xl md:text-6xl font-thin tracking-[0.2em] uppercase">
                <span className="font-bold">{agent.name}</span>
              </h1>
              <p className="mt-3 text-white/60 uppercase tracking-[0.3em] text-sm">{agent.title || 'Property Consultant'}</p>
            </div>
            {agent.tagline && (
              <p className="max-w-3xl text-white/50 text-lg font-light italic">{agent.tagline}</p>
            )}

            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              {agent.email && (
                <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#B8860B]" />
                  {agent.email}
                </a>
              )}
              {agent.phone && (
                <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#B8860B]" />
                  {agent.phone}
                </a>
              )}
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4 text-[#B8860B]" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-16">
          <aside className="space-y-10">
            <div className="border border-white/10 bg-[#0a0a0a] p-8 space-y-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B8860B]">Profile</h2>
              <div className="space-y-4 text-sm text-white/60">
                {agent.bio && <p className="font-light leading-relaxed">{agent.bio}</p>}
                <div className="space-y-3">
                  {agent.languages && agent.languages.length > 0 && (
                    <div>
                      <p className="text-white/30 uppercase tracking-[0.3em] text-[10px]">Languages</p>
                      <p>{agent.languages.join(', ')}</p>
                    </div>
                  )}
                  {agent.specializations && agent.specializations.length > 0 && (
                    <div>
                      <p className="text-white/30 uppercase tracking-[0.3em] text-[10px]">Specializations</p>
                      <p>{agent.specializations.join(', ')}</p>
                    </div>
                  )}
                  {agent.yearsExperience && (
                    <div>
                      <p className="text-white/30 uppercase tracking-[0.3em] text-[10px]">Experience</p>
                      <p>{agent.yearsExperience}+ years</p>
                    </div>
                  )}
                  {brokerRegistrationNumber && (
                    <div>
                      <p className="text-white/30 uppercase tracking-[0.3em] text-[10px]">BRN</p>
                      <p>{brokerRegistrationNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-[#0a0a0a] p-8 space-y-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B8860B]">Live Stats</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{profileResponse.stats.activeListings}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">Active</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{profileResponse.stats.soldListings}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">Sold</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{profileResponse.stats.rentedListings}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">Rented</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#B8860B]">Portfolio</p>
                <h2 className="mt-3 font-headline text-3xl md:text-4xl font-bold uppercase tracking-[0.1em]">
                  Active listings by {agent.name}
                </h2>
              </div>
              <Link href="/agents" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-[#B8860B]">
                Back to all agents
              </Link>
            </div>

            {activeListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {activeListings.map((listing) => (
                  <ListingCard key={listing.id} {...listing} />
                ))}
              </div>
            ) : (
              <div className="border border-white/10 bg-white/5 px-8 py-20 text-center text-white/40 uppercase tracking-[0.4em]">
                No live listings are currently assigned to this advisor.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
