import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/closing-cta";
import { ProgrammeCard } from "@/components/programme-card";
import { Breadcrumbs, ButtonLink, JsonLd, MarkerList } from "@/components/ui";
import { learningMethods } from "@/content/company";
import {
  getCategory,
  getProgramme,
  getRelatedProgrammes,
  programmeHref,
  programmes,
} from "@/content/programmes";
import { company, contact, enquiryHref, routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/training-programmes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) return {};
  return pageMetadata({
    title: `${programme.title} Training`,
    description: programme.summary,
    path: programmeHref(programme.slug),
  });
}

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "outcomes", label: "Learning outcomes" },
  { id: "topics", label: "Key topics" },
  { id: "participants", label: "Who should attend" },
  { id: "delivery", label: "How it is delivered" },
];

export default async function ProgrammePage({
  params,
}: PageProps<"/training-programmes/[slug]">) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();

  const category = getCategory(programme.category);
  const related = getRelatedProgrammes(programme);
  const enquire = enquiryHref({ type: "programme", programme: programme.slug });
  const inHouse = enquiryHref({ type: "corporate", programme: programme.slug });

  const actions = (
    <div className="flex flex-col gap-3">
      <ButtonLink href={enquire}>Enquire About This Programme</ButtonLink>
      <ButtonLink href={inHouse} variant="outline">
        Request In-house Training
      </ButtonLink>
    </div>
  );

  return (
    <>
      <header className="border-b border-line bg-ivory">
        <div className="container-site pb-12 pt-10 sm:pb-16 sm:pt-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: routes.home },
              { label: "Training Programmes", href: routes.programmes },
              { label: programme.title },
            ]}
          />
          <p className="eyebrow mb-5">{category.label}</p>
          <h1 className="max-w-4xl text-h1 font-extrabold">{programme.title}</h1>
          <p className="mt-6 max-w-2xl text-lead text-slate">{programme.intro}</p>
        </div>
      </header>

      <div className="container-site grid gap-x-16 gap-y-12 py-12 lg:grid-cols-[minmax(0,1fr)_21.5rem] lg:py-20 xl:gap-x-24">
        {/* Enquiry panel: first on mobile, sticky sidebar on desktop. */}
        <aside
          aria-label="Enquire about this programme"
          className="lg:order-2 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto"
        >
          <div className="rounded-[3px] border border-line bg-white p-7">
            <span aria-hidden="true" className="block h-0.5 w-12 bg-gold" />
            <h2 className="mt-5 text-h3 font-bold">Interested in this programme?</h2>
            <p className="mb-6 mt-3 text-[0.9375rem] leading-relaxed text-slate">
              Ask about taking part, or request the programme as in-house
              training tailored to your organisation.
            </p>
            {actions}
            <dl className="mt-7 border-t border-line pt-6 text-[0.9375rem]">
              <dt className="font-display text-sm font-bold text-navy">Call us</dt>
              <dd className="mt-1 flex flex-col">
                {contact.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="py-1 text-charcoal underline decoration-line-strong underline-offset-4 hover:decoration-navy">
                    {phone.display}
                  </a>
                ))}
              </dd>
              <dt className="mt-4 font-display text-sm font-bold text-navy">Email</dt>
              <dd className="mt-1">
                <a href={contact.email.href} className="[overflow-wrap:anywhere] py-1 text-charcoal underline decoration-line-strong underline-offset-4 hover:decoration-navy">
                  {contact.email.display}
                </a>
              </dd>
            </dl>
          </div>
        </aside>

        <div className="min-w-0 lg:order-1">
          <nav aria-label="On this page" className="mb-12 border-b border-line pb-6">
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {sectionNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-block py-1.5 text-[0.9375rem] font-semibold text-slate underline decoration-line-strong underline-offset-4 hover:text-navy hover:decoration-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section id="overview" aria-labelledby="overview-title">
            <h2 id="overview-title" className="text-h2 font-bold">
              Overview
            </h2>
            <div className="mt-6 max-w-[68ch] space-y-5">
              {programme.overview.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? "text-lead" : "text-slate"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section id="outcomes" aria-labelledby="outcomes-title" className="mt-16">
            <h2 id="outcomes-title" className="text-h2 font-bold">
              Learning outcomes
            </h2>
            <p className="mt-4 max-w-[68ch] text-slate">
              By the end of the programme, participants should be able to:
            </p>
            <ol className="mt-6 max-w-[68ch] border-t border-line">
              {programme.outcomes.map((outcome, index) => (
                <li key={outcome} className="flex gap-5 border-b border-line py-4 leading-snug">
                  <span
                    aria-hidden="true"
                    className="w-6 flex-none font-display text-sm font-bold leading-[1.6] text-gold-ink"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="topics" aria-labelledby="topics-title" className="mt-16">
            <h2 id="topics-title" className="text-h2 font-bold">
              Key topics
            </h2>
            {programme.topicGroups ? (
              <div className="mt-6 grid gap-x-10 gap-y-9 sm:grid-cols-2">
                {programme.topicGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="pb-3 font-display text-base font-bold text-navy">
                      {group.title}
                    </h3>
                    <MarkerList items={group.items} className="border-t border-line text-[1rem]" />
                  </div>
                ))}
              </div>
            ) : (
              <MarkerList
                items={programme.topics}
                columns
                className="mt-6 border-t border-line text-[1rem] sm:border-t-0 sm:[&>li:nth-child(-n+2)]:border-t"
              />
            )}
          </section>

          <section id="participants" aria-labelledby="participants-title" className="mt-16">
            <h2 id="participants-title" className="text-h2 font-bold">
              Who should attend
            </h2>
            <p className="mt-4 max-w-[68ch] text-slate">
              This programme is intended for:
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {programme.audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-[3px] border border-line bg-ivory px-4 py-2.5 text-[0.9375rem] font-medium leading-snug text-charcoal"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </section>

          <section id="delivery" aria-labelledby="delivery-title" className="mt-16">
            <h2 id="delivery-title" className="text-h2 font-bold">
              How it is delivered
            </h2>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div className="border-t-2 border-gold pt-5">
                <h3 className="text-h3 font-bold">Practical learning</h3>
                <p className="mt-2.5 text-[1rem] leading-relaxed text-slate">
                  Our training is interactive and participatory. Sessions draw
                  on {learningMethods.slice(0, -1).join(", ").toLowerCase()} and{" "}
                  {learningMethods.at(-1)!.toLowerCase()}, so that participants
                  can apply what they learn in the workplace.
                </p>
              </div>
              <div className="border-t-2 border-gold pt-5">
                <h3 className="text-h3 font-bold">Tailored to your organisation</h3>
                <p className="mt-2.5 text-[1rem] leading-relaxed text-slate">
                  This programme can be customised and delivered in-house. We
                  begin with a needs assessment so that content and examples
                  reflect your objectives and the roles of your participants.
                </p>
              </div>
            </div>

            {programme.details ? (
              <div className="mt-10 border-t border-line">
                {programme.details.map((detail) => (
                  <details key={detail.title} className="group border-b border-line">
                    <summary className="flex min-h-14 list-none items-center justify-between gap-6 py-4 font-display text-[1.0625rem] font-bold text-navy [&::-webkit-details-marker]:hidden">
                      {detail.title}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="size-5 flex-none text-gold-ink transition-transform duration-150 group-open:rotate-45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M10 4v12M4 10h12" />
                      </svg>
                    </summary>
                    <div className="max-w-[68ch] pb-6 text-[1rem] text-slate">
                      {detail.body ? <p>{detail.body}</p> : null}
                      {detail.items ? (
                        <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-gold">
                          {detail.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {detail.note ? (
                        <p className="mt-4 text-sm text-charcoal">{detail.note}</p>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            ) : null}

            <p className="mt-8 max-w-[68ch] text-sm text-slate">
              Contact us for information about availability and arrangements
              for this programme.
            </p>
          </section>

          {/* In-flow actions for small screens, where the panel above has scrolled away. */}
          <div className="mt-12 rounded-[3px] bg-ivory p-7 lg:hidden">
            <h2 className="text-h3 font-bold">Take the next step</h2>
            <p className="mb-6 mt-2 text-[0.9375rem] text-slate">
              Ask about taking part, or request this programme for your team.
            </p>
            {actions}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="section-tight border-t border-line bg-ivory" aria-labelledby="related-title">
          <div className="container-site">
            <h2 id="related-title" className="text-h2 font-bold">
              Related programmes
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProgrammeCard programme={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCta title="Talk to us about this programme">
        Tell us who the training is for and what you want it to achieve. We
        will respond with how {company.shortName} can help.
      </ClosingCta>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: programme.title,
          description: programme.summary,
          inLanguage: "en",
          teaches: programme.outcomes,
          provider: {
            "@type": "Organization",
            name: company.name,
          },
        }}
      />
    </>
  );
}
