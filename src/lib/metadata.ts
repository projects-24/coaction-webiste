import type { Metadata } from "next";
import { company, getSiteUrl } from "@/content/site";

/**
 * Per-page metadata. A canonical URL is emitted only when the live domain has
 * been confirmed through the SITE_URL setting.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = getSiteUrl() ? { alternates: { canonical: path } } : {};
  return {
    title,
    description,
    ...canonical,
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: getSiteUrl() ? path : undefined,
      siteName: company.name,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
    },
  };
}
