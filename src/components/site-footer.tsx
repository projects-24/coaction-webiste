import Link from "next/link";
import { categories, programmes } from "@/content/programmes";
import {
  company,
  contact,
  corporateRequestHref,
  mapSearchUrl,
  primaryNav,
  routes,
} from "@/content/site";
import { hasPhotoCredits } from "@/content/images";
import { Wordmark } from "./wordmark";

const footerLink =
  "inline-block py-1.5 text-white/80 underline-offset-4 hover:text-white hover:underline";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-navy text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1.2fr] lg:gap-10 lg:py-20">
        <div>
          <Link href={routes.home} className="inline-block">
            <Wordmark tone="light" />
          </Link>
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-white/75">
            {company.positioning}.
          </p>
          <p className="mt-4 max-w-xs font-display text-[0.9375rem] font-semibold leading-snug text-gold-soft">
            {company.brandLine}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Explore
          </h2>
          <ul className="mt-4 text-[0.9375rem]">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={corporateRequestHref} className={footerLink}>
                Request Corporate Training
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Training programmes">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Programme areas
          </h2>
          <ul className="mt-4 text-[0.9375rem]">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`${routes.programmes}?category=${category.id}`}
                  className={footerLink}
                >
                  {category.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={routes.programmes} className={footerLink}>
                All {programmes.length} programmes
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Contact
          </h2>
          <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-white/80">
            {company.name}
            <br />
            {contact.addressLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
          <ul className="mt-3 text-[0.9375rem]">
            {contact.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className={footerLink}>
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={contact.email.href} className={`${footerLink} [overflow-wrap:anywhere]`}>
                {contact.email.display}
              </a>
            </li>
            <li>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                Search the address on Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.name}. Accra, Ghana.</p>
          {hasPhotoCredits ? (
            <Link href={routes.photoCredits} className="underline-offset-4 hover:text-white hover:underline">
              Photo credits
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
