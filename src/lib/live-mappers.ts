import type { OffPlanProject, PaymentStep } from './off-plan-projects';
import type { NearbyPoint, Property } from './properties';
import type { LiveProperty, PropertyImage, SiteAgent, SiteConfig } from './live-types';
import { PlaceHolderImages } from './placeholder-images';

function getImageUrl(image?: PropertyImage | null) {
  if (!image) return '';
  return typeof image === 'string' ? image : image.src;
}

function getGalleryUrls(images: PropertyImage[]) {
  return images.map((image) => getImageUrl(image)).filter(Boolean);
}

function getAgentImage(agent?: LiveProperty['agent'] | SiteAgent | null) {
  if (!agent) return '';
  if ('avatar' in agent && typeof agent.avatar === 'string' && agent.avatar) {
    return agent.avatar;
  }
  return agent.avatarUrl || '';
}

function getPlaceholderUrl(id: string) {
  return PlaceHolderImages.find((image) => image.id === id)?.imageUrl || '';
}

function formatAed(value: number) {
  return `AED ${Math.round(value).toLocaleString('en-US')}`;
}

function formatListingPrice(listing: LiveProperty) {
  const basePrice = formatAed(listing.price);
  return listing.transactionType === 'Rent' ? `${basePrice} / Year` : basePrice;
}

function buildFeatureList(listing: LiveProperty) {
  if (listing.amenities.length > 0) {
    return listing.amenities.slice(0, 8);
  }

  return [
    listing.type,
    listing.transactionType === 'Rent' ? 'Flexible Leasing' : 'Prime Investment',
    listing.location,
    listing.status,
  ].filter(Boolean) as string[];
}

function buildNearbyPoints(places?: LiveProperty['nearby']) {
  return (places || []).map<NearbyPoint>((place) => ({
    name: place.name,
    distance: place.time,
  }));
}

function getFallbackFloorPlan() {
  return getPlaceholderUrl('journey-strategy') || getPlaceholderUrl('prop-1');
}

function buildPaymentPlan(listing: LiveProperty): PaymentStep[] {
  const plan = (listing.paymentPlanData || {}) as Record<string, unknown>;
  const steps: PaymentStep[] = [];

  const getPercent = (value: unknown): number | null => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      const parsed = Number.parseFloat(value.replace(/[^\d.]/g, ''));
      return Number.isFinite(parsed) ? parsed : null;
    }
    if (value && typeof value === 'object') {
      const record = value as Record<string, unknown>;
      return (
        getPercent(record.percentage)
        || getPercent(record.percent)
        || getPercent(record.value)
        || getPercent(record.amount)
      );
    }
    return null;
  };

  const downPayment = getPercent(plan.down_payment);
  if (downPayment !== null) {
    steps.push({ percentage: `${downPayment}%`, label: 'Down Payment' });
  }

  const constructionLinked = Array.isArray(plan.construction_linked_payments)
    ? plan.construction_linked_payments.reduce((sum, item) => sum + (getPercent(item) || 0), 0)
    : getPercent(plan.construction_linked_payments);
  if (constructionLinked !== null) {
    steps.push({ percentage: `${constructionLinked}%`, label: 'During Construction' });
  }

  const handoverPayment = getPercent(plan.handover_payment);
  if (handoverPayment !== null) {
    steps.push({ percentage: `${handoverPayment}%`, label: 'On Handover' });
  }

  const postHandoverPayment = getPercent(plan.post_handover_payment);
  if (postHandoverPayment !== null) {
    steps.push({ percentage: `${postHandoverPayment}%`, label: 'Post Handover' });
  }

  if (steps.length > 0) {
    return steps;
  }

  return [
    { percentage: '10%', label: 'Reserve Now' },
    { percentage: '70%', label: 'During Construction' },
    { percentage: '20%', label: 'On Completion' },
  ];
}

export function isLikelyOffPlan(listing: LiveProperty) {
  if (listing.status === 'Off-plan') return true;

  const haystack = `${listing.title} ${listing.type} ${listing.description}`.toLowerCase();
  return ['off plan', 'off-plan', 'launch', 'handover', 'residences'].some((keyword) =>
    haystack.includes(keyword),
  );
}

export function toApexProperty(listing: LiveProperty): Property {
  const gallery = getGalleryUrls(listing.images);
  const nearby = buildNearbyPoints(listing.nearby);
  const pricePerSqFt = listing.sqft > 0 ? formatAed(Math.round(listing.price / listing.sqft)) : 'On request';
  const fallbackPropertyImage = getPlaceholderUrl('prop-1');
  const fallbackAgentImage = getPlaceholderUrl('agent-1');

  return {
    id: listing.id,
    title: listing.title,
    price: formatListingPrice(listing),
    priceValue: listing.price,
    location: listing.mapAddress || listing.location,
    mapAddress: listing.mapAddress || listing.location,
    latitude: listing.latitude ?? null,
    longitude: listing.longitude ?? null,
    beds: listing.bedrooms,
    baths: listing.bathrooms,
    sqft: listing.sqft,
    type: listing.type || 'Property',
    listingType: listing.transactionType === 'Rent' ? 'Rent' : 'Buy',
    featured: listing.featured,
    createdAt: listing.createdAt,
    recentlyListed: listing.recentlyListed,
    image: gallery[0] || fallbackPropertyImage,
    gallery: gallery.length > 0 ? gallery : [fallbackPropertyImage],
    virtualTourUrl: listing.virtualTourUrl || null,
    description: listing.description,
    features: buildFeatureList(listing),
    furnishing: listing.amenities.find((feature) => /furnished/i.test(feature)) || 'Available on request',
    reraNumber: listing.reraPermit || listing.referenceId || listing.id,
    floorPlan: gallery[1] || gallery[0] || getFallbackFloorPlan(),
    marketStats: {
      avgAreaPrice: formatAed(listing.price),
      pricePerSqFt,
    },
    nearbySchools: nearby.slice(0, 2),
    pointsOfInterest: nearby.slice(2, 6).length > 0 ? nearby.slice(2, 6) : nearby.slice(0, 4),
    agent: {
      name: listing.agent?.name || listing.organizationName || 'Property Consultant',
      role: listing.agent?.title || 'Property Consultant',
      image: getAgentImage(listing.agent) || fallbackAgentImage,
      phone: listing.agent?.phone || undefined,
      email: listing.agent?.email || undefined,
      whatsapp: listing.agent?.whatsapp || undefined,
      slug: listing.agent?.slug || undefined,
      brn: listing.agent?.brn || null,
    },
    dldPermitNo: listing.reraPermit || undefined,
    trakheesi: listing.trakheesi,
    reraPermit: listing.reraPermit,
    dldPermitLink: listing.dldPermitLink,
    floorPlans: listing.floorPlans,
  };
}

export function toApexOffPlanProject(listing: LiveProperty): OffPlanProject {
  const gallery = getGalleryUrls(listing.images);
  const fallbackProjectImage = getPlaceholderUrl('prop-2');
  const fallbackAgentImage = getPlaceholderUrl('agent-1');

  return {
    id: listing.id,
    title: listing.title,
    type: listing.type || 'Residences',
    developer: listing.developerName || listing.organizationName || 'Developer details on request',
    permitNumber: listing.reraPermit || listing.referenceId || listing.id,
    image: gallery[0] || fallbackProjectImage,
    location: listing.mapAddress || listing.location,
    latitude: listing.latitude ?? null,
    longitude: listing.longitude ?? null,
    price: listing.price > 0 ? `From ${formatAed(listing.price)}` : 'Price on Application',
    virtualTourUrl: listing.virtualTourUrl || null,
    handoverDate: listing.handoverDate || 'To be announced',
    exclusive: Boolean(listing.featured),
    featured: listing.featured,
    createdAt: listing.createdAt,
    recentlyListed: listing.recentlyListed,
    description: listing.description,
    longDescription: listing.description,
    gallery: gallery.length > 0 ? gallery : [fallbackProjectImage],
    amenities: listing.amenities.length > 0 ? listing.amenities : ['Launch details available on request'],
    paymentPlan: buildPaymentPlan(listing),
    agent: {
      name: listing.agent?.name || listing.organizationName || 'Project Specialist',
      role: listing.agent?.title || 'Off-Plan Specialist',
      image: getAgentImage(listing.agent) || fallbackAgentImage,
      phone: listing.agent?.phone || undefined,
      email: listing.agent?.email || undefined,
      whatsapp: listing.agent?.whatsapp || undefined,
      slug: listing.agent?.slug || undefined,
    },
  };
}

export function getAgencyDisplayName(siteConfig?: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || 'Agency Website';
}

export function getAgencyEmail(siteConfig?: SiteConfig | null) {
  return siteConfig?.profile?.contact?.officialEmail || siteConfig?.branding?.publicEmail || null;
}

export function getAgencyPhone(siteConfig?: SiteConfig | null) {
  return (
    siteConfig?.profile?.contact?.primaryPhone
    || siteConfig?.branding?.publicPhone
    || siteConfig?.profile?.contact?.secondaryPhone
    || null
  );
}

function getPossessiveName(name: string) {
  const trimmedName = name.trim();
  if (!trimmedName) return 'Agency Website';
  return /s$/i.test(trimmedName) ? `${trimmedName}'` : `${trimmedName}'s`;
}

export function replaceTemplateBranding(text: string, agencyName: string) {
  const normalizedAgencyName = agencyName.trim() || 'Agency Website';

  return text
    .replace(/{{agencyName}}/g, normalizedAgencyName)
    .replace(/Apex's/gi, getPossessiveName(normalizedAgencyName))
    .replace(/Apex Residences/gi, normalizedAgencyName)
    .replace(/\bApex\b/gi, normalizedAgencyName);
}
