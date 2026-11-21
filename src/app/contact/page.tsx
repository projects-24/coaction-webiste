import Link from "next/link";
import { Suspense } from "react";
import { EnquiryForm, EnquiryFormFromUrl } from "@/components/enquiry-form";
import { PageHeader } from "@/components/ui";
import { company, contact, enquiryHref, mapSearchUrl, routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Coaction Company Limited in Accra, Ghana, to discuss your training requirements, enquire about a programme or request customised corporate training.",
  path: routes.contact,
});

const enquiryRoutes = [
  {
    title: "Corporate training request",
    description: "In-house or customised training for your organisation.",
    href: enquiryHref({ type: "corporate" }),
  },
  {
    title: "Programme enquiry",
    description: "Ask about a specific training programme.",
    href: enquiryHref({ type: "programme" }),
  },
  {
    title: "General enquiry",
    description: "Any other question about Coaction and our services.",
    href: enquiryHref({ type: "general" }),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact us" title="Let’s Build Capacity Together">
        <p>
          Contact us to discuss your training requirements, request a
          customised programme or ask about our training programmes.
        </p>
      </PageHeader>

      <section className="border-b border-line" aria-label="Ways to enquire">
        <ul className="container-site grid md:grid-cols-3">
          {enquiryRoutes.map((route, index) => (
            <li
              key={route.title}
              className="border-b border-line last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <Link
                href={route.href}
                className={`group block h-full py-7 md:py-9 md:pr-8 ${index === 0 ? "" : "md:pl-8"}`}
              >
                <span className="block font-display text-h3 font-bold text-navy underline decoration-transparent decoration-2 underline-offset-[0.3em] group-hover:decoration-gold">
                  {route.title}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] text-slate">
                  {route.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-tight">
        <div className="container-site grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div id="enquiry-form" className="min-w-0 scroll-mt-28">
            <h2 className="text-h2 font-bold">Send us an enquiry</h2>
            <p className="mb-10 mt-4 max-w-2xl text-slate">
              Choose the type of enquiry and tell us a little about what you
              need.
            </p>
            {/* The plain form is the static fallback; URL context applies on load. */}
            <Suspense fallback={<EnquiryForm />}>
              <EnquiryFormFromUrl />
            </Suspense>
          </div>

          <aside aria-labelledby="details-title" className="lg:border-l lg:border-line lg:pl-12">
            <h2 id="details-title" className="text-h3 font-bold">
              Contact details
            </h2>

            <dl className="mt-6 space-y-7 text-[1rem]">
              <div>
                <dt className="font-display text-sm font-bold uppercase tracking-[0.12em] text-gold-ink">
                  Telephone
                </dt>
                <dd className="mt-2 flex flex-col gap-1">
                  {contact.phones.map((phone) => (
                    <a key={phone.href} href={phone.href} className="text-link w-fit py-1">
                      {phone.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-display text-sm font-bold uppercase tracking-[0.12em] text-gold-ink">
                  Email
                </dt>
                <dd className="mt-2">
                  <a href={contact.email.href} className="text-link [overflow-wrap:anywhere] py-1">
                    {contact.email.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-sm font-bold uppercase tracking-[0.12em] text-gold-ink">
                  Office address
                </dt>
                <dd className="mt-2">
                  <address className="not-italic leading-relaxed">
                    {company.name}
                    <br />
                    {contact.addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </address>
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link mt-3 inline-block py-1 text-[0.9375rem]"
                  >
                    Search this address on Google Maps
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <p className="mt-2 text-sm text-slate">
                    The link runs a map search for the written address. Please
                    call us if you need directions.
                  </p>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
