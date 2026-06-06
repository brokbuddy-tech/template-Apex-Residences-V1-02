import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { getAgents, getSiteConfig } from "@/lib/api";
import { getAgencyDisplayName } from "@/lib/live-mappers";
import { resolveTemplateImage } from "@/lib/media";

export default async function AgentsPage() {
  const [siteConfig, agentsResponse] = await Promise.all([
    getSiteConfig(),
    getAgents(),
  ]);

  const agencyName = getAgencyDisplayName(siteConfig);
  const agents = agentsResponse.agents;

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 px-6 md:px-12 pb-16 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#B8860B] uppercase">Advisors</p>
          <h1 className="font-headline text-4xl md:text-6xl font-thin tracking-[0.2em] uppercase max-w-5xl">
            Meet the live team behind <span className="font-bold">{agencyName}</span>
          </h1>
          <p className="max-w-3xl text-white/50 font-light leading-relaxed text-lg italic">
            Headshots, contact details, expertise and live listing relationships are pulled directly from the public agency profile.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20">
        <div className="max-w-[1600px] mx-auto">
          {agents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {agents.map((agent) => {
                const avatar = resolveTemplateImage(agent.avatarUrl || agent.avatar, 'agent-1', agent.name);

                return (
                  <article
                    key={agent.slug || agent.id || agent.name}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-sm"
                  >
                    <div className="relative aspect-[4/3] bg-white/5">
                      {avatar && (
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          data-ai-hint={avatar.hint}
                          fill
                          className="object-cover object-top"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    <div className="flex min-h-[276px] flex-1 flex-col gap-4 p-6">
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#B8860B]">
                          {agent.title || 'Property Consultant'}
                        </p>
                        <h2 className="font-headline text-[1.75rem] font-bold uppercase tracking-[0.16em] leading-tight">
                          {agent.name}
                        </h2>
                        {agent.tagline && (
                          <p className="line-clamp-2 text-sm leading-6 text-white/50 font-light">
                            {agent.tagline}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2.5 text-sm text-white/60">
                        {agent.email && (
                          <a
                            href={`mailto:${agent.email}`}
                            className="flex items-center gap-3 break-all hover:text-white transition-colors"
                          >
                            <Mail className="w-4 h-4 text-[#B8860B]" />
                            {agent.email}
                          </a>
                        )}
                        {agent.phone && (
                          <a href={`tel:${agent.phone}`} className="flex items-center gap-3 hover:text-white transition-colors">
                            <Phone className="w-4 h-4 text-[#B8860B]" />
                            {agent.phone}
                          </a>
                        )}
                      </div>

                      <Link
                        href={`/agents/${agent.slug || agent.id}`}
                        className="mt-auto inline-flex items-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8860B]"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="border border-white/10 bg-white/5 px-8 py-20 text-center text-white/40 uppercase tracking-[0.4em]">
              No live agent profiles are available for this agency yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
