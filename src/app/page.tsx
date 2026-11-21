import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/closing-cta";
import { PhotoFigure } from "@/components/photo";
import { ArrowIcon, ArrowLink, ButtonLink, SectionHeading } from "@/components/ui";
import {
  approachStages,
  commitment,
  featuredProgrammeSlugs,
  reasons,
  serviceAreas,
  targetMarkets,
} from "@/content/company";
import {
  getCategory,
  getProgramme,
  programmeHref,
  programmes,
} from "@/content/programmes";
import { company, corporateRequestHref, getSiteUrl, routes } from "@/content/site";

export const metadata: Metadata = {
  description:
    "Practical professional training, capacity development and corporate advisory services from Accra, Ghana, for the energy, extractive, public and corporate sectors.",
  ...(getSiteUrl() ? { alternates: { canonical: "/" } } : {}),
};

const featured = featuredProgrammeSlugs.map((slug) => getProgramme(slug)!);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="overflow-hidden bg-ivory">
        <div className="container-site grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p className="eyebrow mb-7 max-w-md">{company.positioning}</p>
            <h1 className="text-display font-extrabold">
              <span className="block">Building Capacity.</span>
              <span className="block">Developing Competence.</span>
              <span className="block">Driving Excellence.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lead text-slate">
              Practical training and tailored advisory services that strengthen
              professional capability and help organisations perform with
              confidence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={routes.programmes} arrow>
                Explore Training Programmes
              </ButtonLink>
              <ButtonLink href={corporateRequestHref} variant="outline">
                Request Corporate Training
              </ButtonLink>
            </div>
            <p className="mt-9 flex items-center gap-3 text-[0.9375rem] text-slate">
              <span aria-hidden="true" className="size-1.5 flex-none bg-gold" />
              Based in Accra, Ghana.
            </p>
          </div>

          <PhotoFigure
            slot="hero"
            ratio="aspect-[4/3] lg:aspect-[5/6]"
            sizes="(min-width: 1024px) 44vw, 100vw"
            priority
            fallbackLabel={company.brandLine}
          />
        </div>
      </section>

      {/* 2. Positioning */}
      <section className="section" aria-labelledby="positioning-title">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Who we are</p>
            <h2 id="positioning-title" className="text-h2 font-bold">
              A Ghanaian training and advisory company focused on practical,
              relevant learning
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-lead">
              Coaction Company Limited is a professional training and capacity
              development company committed to delivering practical, relevant
              and results-oriented learning solutions to individuals,
              businesses, public institutions and organisations.
            </p>
            <p className="mt-5 text-slate">
              We design and deliver professional training programmes, corporate
              development initiatives and capacity-building interventions
              across sectors, with expertise in the oil and gas, mining, energy
              and corporate governance environments. Each programme responds to
              the specific needs of participants and their organisations.
            </p>
            <blockquote className="mt-9 border-l-2 border-gold pl-6">
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold-ink">
                Our commitment
              </p>
              <p className="mt-2 font-display text-xl font-semibold leading-snug text-navy">
                {commitment}
              </p>
            </blockquote>
            <p className="mt-9">
              <ArrowLink href={routes.about}>More about Coaction</ArrowLink>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Service areas */}
      <section className="section border-t border-line" aria-labelledby="services-title">
        <div className="container-site">
          <SectionHeading eyebrow="What we do" title={<span id="services-title">Two connected service areas</span>}>
            <p>
              We build the competence of people through training, and strengthen
              the institutions they work in through advisory support.
            </p>
          </SectionHeading>

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-12">
            {serviceAreas.map((area, index) => (
              <article key={area.id} className="flex flex-col">
                <PhotoFigure
                  slot={area.id}
                  ratio="aspect-[3/2]"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  fallbackLabel={area.title}
                />
                <p className="mt-8 font-display text-sm font-bold tracking-[0.14em] text-gold-ink">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)] font-bold leading-tight tracking-[-0.015em]">
                  {area.title}
                </h3>
                <p className="mt-4 text-slate">{area.summary}</p>
                <ul className="mt-6 border-t border-line">
                  {area.items.slice(0, 4).map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-3.5 border-b border-line py-3 text-[1rem] leading-snug"
                    >
                      <span aria-hidden="true" className="mt-[0.5em] size-1.5 flex-none bg-gold" />
                      {item.title}
                    </li>
                  ))}
                </ul>
                <p className="mt-7">
                  <ArrowLink href={`${routes.services}#${area.id}`}>
                    {area.id === "training"
                      ? "Explore training services"
                      : "Explore advisory services"}
                  </ArrowLink>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Selected programmes */}
      <section className="section bg-ivory" aria-labelledby="programmes-title">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Training programmes"
              title={<span id="programmes-title">Specialist industry depth and management capability</span>}
            >
              <p>
                A selection from our catalogue of {programmes.length} programmes,
                from Ghana’s extractive industries to the boardroom.
              </p>
            </SectionHeading>
            <ButtonLink href={routes.programmes} variant="outline" arrow className="flex-none self-start lg:self-auto">
              View All {programmes.length} Programmes
            </ButtonLink>
          </div>

          <ul className="mt-12 border-t border-navy/25">
            {featured.map((programme) => (
              <li key={programme.slug} className="border-b border-navy/25">
                <Link
                  href={programmeHref(programme.slug)}
                  className="group grid gap-x-10 gap-y-2 py-7 transition-colors duration-150 hover:bg-white md:grid-cols-[13rem_minmax(0,1fr)_auto] md:items-baseline md:px-5 lg:grid-cols-[16rem_minmax(0,1fr)_auto]"
                >
                  <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">
                    {getCategory(programme.category).label}
                  </span>
                  <span>
                    <span className="block font-display text-h3 font-bold text-navy">
                      {programme.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-[1rem] leading-relaxed text-slate">
                      {programme.summary}
                    </span>
                  </span>
                  <span className="mt-2 inline-flex items-center gap-2 font-display text-[0.9375rem] font-bold text-navy md:mt-0">
                    <span className="underline decoration-gold decoration-2 underline-offset-[0.35em] group-hover:decoration-navy">
                      View Programme
                    </span>
                    <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Intended markets */}
      <section className="on-dark section bg-navy text-white" aria-labelledby="markets-title">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Who we serve</p>
            <h2 id="markets-title" className="text-h2 font-bold text-white">
              Designed for the institutions and professionals behind Ghana’s
              key sectors
            </h2>
            <p className="mt-5 text-lead text-white/80">
              Our training and capacity development services are designed for a
              broad range of institutions and professionals.
            </p>
            <PhotoFigure
              slot="energy"
              ratio="aspect-[3/2]"
              sizes="(min-width: 1024px) 38vw, 100vw"
              tone="dark"
              className="mt-10 hidden lg:block"
              optional
            />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold-soft">
              Our services are designed for
            </h3>
            <ul className="mt-5 grid gap-x-10 border-t border-white/20 sm:grid-cols-2">
              {targetMarkets.map((market) => (
                <li
                  key={market}
                  className="flex gap-3.5 border-b border-white/20 py-4 text-[1.0625rem] leading-snug"
                >
                  <span aria-hidden="true" className="mt-[0.5em] size-1.5 flex-none bg-gold" />
                  {market}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Approach */}
      <section className="section" aria-labelledby="approach-title">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our approach"
              title={<span id="approach-title">Learning designed around your needs</span>}
            >
              <p>
                Effective training goes beyond the transfer of theoretical
                knowledge. Our methodology is interactive, participatory and
                focused on what participants can apply in the workplace.
              </p>
            </SectionHeading>
            <ArrowLink href={routes.approach} className="flex-none">
              See how we work
            </ArrowLink>
          </div>

          <ol className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {approachStages.map((stage, index) => (
              <li key={stage.title} className="border-t border-line py-7">
                <p className="font-display text-sm font-bold tracking-[0.14em] text-gold-ink">
                  <span className="sr-only">Stage </span>0{index + 1}
                </p>
                <h3 className="mt-3 text-h3 font-bold">{stage.title}</h3>
                <p className="mt-2.5 text-[1rem] leading-relaxed text-slate">
                  {stage.summary}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Why Coaction */}
      <section className="section bg-ivory" aria-labelledby="why-title">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-5">Why choose Coaction</p>
            <h2 id="why-title" className="text-h2 font-bold">
              A training partner that starts with your requirements
            </h2>
            <p className="mt-5 text-lead text-slate">
              Choosing the right training partner is essential to achieving
              meaningful professional and organisational development.
            </p>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="border-t border-navy/25 py-7">
                <dt className="font-display text-h3 font-bold text-navy">
                  {reason.title}
                </dt>
                <dd className="mt-2.5 text-[1rem] leading-relaxed text-slate">
                  {reason.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 8. Closing call to action */}
      <ClosingCta />
    </>
  );
}
