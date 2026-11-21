/**
 * Company-wide facts. Everything here comes from the company brief.
 * Edit this file to change contact details or navigation across the site.
 */

export const company = {
  name: "Coaction Company Limited",
  shortName: "Coaction",
  positioning:
    "Professional Training, Capacity Development and Corporate Advisory Services",
  headline: "Building Capacity. Developing Competence. Driving Excellence.",
  brandLine:
    "Empowering People. Strengthening Institutions. Transforming Performance.",
  description:
    "Coaction Company Limited is a Ghanaian professional training, capacity development and corporate advisory company serving the energy, extractive, public and corporate sectors.",
} as const;

export const contact = {
  addressLines: [
    "No. 2 Kotobabi Street",
    "Adjacent Pigfarm Total Filling Station",
    "Pigfarm, Accra, Ghana",
  ],
  addressSingleLine:
    "No. 2 Kotobabi Street, Adjacent Pigfarm Total Filling Station, Pigfarm, Accra, Ghana",
  locality: "Accra",
  country: "GH",
  phones: [
    { display: "+233 20 444 5551", href: "tel:+233204445551" },
    { display: "+233 24 878 4942", href: "tel:+233248784942" },
  ],
  email: { display: "Training@coaction.com", href: "mailto:Training@coaction.com" },
} as const;

/** A map *search* for the written address. No coordinates are asserted. */
export const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.addressSingleLine,
)}`;

export const routes = {
  home: "/",
  about: "/about",
  programmes: "/training-programmes",
  services: "/services",
  approach: "/approach",
  contact: "/contact",
  photoCredits: "/photo-credits",
} as const;

export const primaryNav = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Training Programmes", href: routes.programmes },
  { label: "Our Services", href: routes.services },
  { label: "Our Approach", href: routes.approach },
  { label: "Contact Us", href: routes.contact },
] as const;

export type EnquiryType = "general" | "programme" | "corporate";

/** Builds a contact-page link that pre-selects the enquiry route and subject. */
export function enquiryHref(options: {
  type?: EnquiryType;
  programme?: string;
  service?: string;
} = {}): string {
  const params = new URLSearchParams();
  if (options.type) params.set("type", options.type);
  if (options.programme) params.set("programme", options.programme);
  if (options.service) params.set("service", options.service);
  const query = params.toString();
  return `${routes.contact}${query ? `?${query}` : ""}#enquiry-form`;
}

export const corporateRequestHref = enquiryHref({ type: "corporate" });

/**
 * The confirmed public address of the live site, e.g. https://www.example.com.
 * Left unset until the owner confirms the domain: while unset, the site asks
 * search engines not to index it and publishes no canonical URLs or sitemap.
 */
export function getSiteUrl(): URL | null {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}
