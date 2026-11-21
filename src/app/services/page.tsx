import Link from "next/link";
import { ClosingCta } from "@/components/closing-cta";
import { PhotoFigure } from "@/components/photo";
import { ArrowLink, ButtonLink, PageHeader } from "@/components/ui";
import { serviceAreas } from "@/content/company";
import { getProgramme, programmeHref } from "@/content/programmes";
import { enquiryHref, routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Coaction’s two service areas: Training and Capacity Development, and Corporate Advisory and Organisational Development, including strategic planning, governance advisory and bespoke in-house training.",
  path: routes.services,
});

const photoSlots = { training: "downstream", advisory: "mining" } as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Our services" title="Training for your people. Advisory support for your institution.">
        <p>
          We work in two connected areas: building the competence of
          individuals and teams, and helping organisations strengthen the
          structures and systems they depend on.
        </p>
        <ul className="mt-8 flex flex-col gap-3 text-[1rem] sm:flex-row sm:flex-wrap sm:gap-x-10">
          {serviceAreas.map((area) => (
            <li key={area.id} className="flex-none">
              <ArrowLink href={`#${area.id}`} className="sm:whitespace-nowrap">
                {area.title}
              </ArrowLink>
            </li>
          ))}
        </ul>
      </PageHeader>

      {serviceAreas.map((area, index) => (
        <section
          key={area.id}
          id={area.id}
          aria-labelledby={`${area.id}-title`}
          className={`section ${index % 2 === 1 ? "border-y border-line bg-ivory" : ""}`}
        >
          <div className="container-site">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p className="eyebrow mb-5">Service area 0{index + 1}</p>
                <h2 id={`${area.id}-title`} className="text-h2 font-bold">
                  {area.title}
                </h2>
                <div className="mt-6 space-y-4 text-slate">
                  {area.body.map((paragraph, i) => (
                    <p key={paragraph} className={i === 0 ? "text-lead text-charcoal" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8">
                  <ButtonLink
                    href={enquiryHref({ type: "corporate", service: area.id })}
                    arrow
                  >
                    {area.id === "training"
                      ? "Request Corporate Training"
                      : "Discuss an Advisory Engagement"}
                  </ButtonLink>
                </div>
                <PhotoFigure
                  slot={photoSlots[area.id]}
                  ratio="aspect-[3/2]"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="mt-12"
                  optional
                />
              </div>

              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold-ink">
                  {area.itemsLabel}
                </h3>
                <ul className="mt-5 border-t border-navy/25">
                  {area.items.map((item) => {
                    const linked = (item.programmes ?? []).map((slug) => getProgramme(slug)!);
                    return (
                      <li key={item.title} className="border-b border-navy/25 py-7">
                        <h4 className="text-h3 font-bold">{item.title}</h4>
                        <p className="mt-2 max-w-[62ch] text-[1rem] leading-relaxed text-slate">
                          {item.description}
                        </p>
                        {linked.length > 0 ? (
                          <p className="mt-4 text-[0.9375rem] leading-loose">
                            <span className="font-semibold text-charcoal">
                              Related {linked.length === 1 ? "programme" : "programmes"}:
                            </span>{" "}
                            {linked.map((programme, i) => (
                              <span key={programme.slug}>
                                <Link href={programmeHref(programme.slug)} className="text-link font-medium">
                                  {programme.title}
                                </Link>
                                {i < linked.length - 1 ? <span aria-hidden="true"> · </span> : null}
                              </span>
                            ))}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-tight" aria-labelledby="next-title">
        <div className="container-site grid gap-8 md:grid-cols-2 md:gap-16">
          <h2 id="next-title" className="text-h2 font-bold">
            Not sure where to start?
          </h2>
          <div>
            <p className="text-slate">
              Every engagement begins with a needs assessment. Tell us what
              you want to achieve and we will help you decide whether
              training, advisory support or a combination is the right fit.
            </p>
            <ul className="mt-7 flex flex-col gap-4">
              <li>
                <ArrowLink href={routes.approach}>See how we work</ArrowLink>
              </li>
              <li>
                <ArrowLink href={routes.programmes}>Browse all training programmes</ArrowLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
