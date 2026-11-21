import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/ui";
import { company, contact, getSiteUrl } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: {
    default: `${company.name} | Professional Training and Corporate Advisory in Ghana`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  formatDetection: { telephone: false },
  // Until the live domain is confirmed (SITE_URL), keep the site out of search indexes.
  robots: siteUrl ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    siteName: company.name,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c2038",
};

const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: company.description,
  ...(siteUrl ? { url: siteUrl.origin } : {}),
  email: contact.email.display,
  telephone: contact.phones.map((phone) => phone.display),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.addressLines[0]}, ${contact.addressLines[1]}, Pigfarm`,
    addressLocality: contact.locality,
    addressCountry: contact.country,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-[3px] focus-visible:bg-navy focus-visible:px-5 focus-visible:py-3 focus-visible:font-display focus-visible:font-bold focus-visible:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organisation} />
      </body>
    </html>
  );
}
