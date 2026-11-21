import type { MetadataRoute } from "next";
import { programmeHref, programmes } from "@/content/programmes";
import { getSiteUrl, routes } from "@/content/site";

/** Empty until the live domain is confirmed via SITE_URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const paths = [
    routes.home,
    routes.about,
    routes.programmes,
    ...programmes.map((programme) => programmeHref(programme.slug)),
    routes.services,
    routes.approach,
    routes.contact,
  ];

  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
