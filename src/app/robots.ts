import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site";

/** Search engines are allowed in only once the live domain is confirmed via SITE_URL. */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
