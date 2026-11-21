import { ClosingCta } from "@/components/closing-cta";
import { PhotoFigure } from "@/components/photo";
import { ArrowLink, PageHeader } from "@/components/ui";
import { mission, values, vision } from "@/content/company";
import { company, routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Coaction Company Limited is a Ghanaian training and capacity development company providing specialised professional training, organisational development and advisory services. Read our vision, mission and values.",
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="Competent people build capable institutions">
        <p>
          Coaction Company Limited is a Ghanaian training and capacity
          development company established to provide specialised professional
          training, organisational development and advisory services.
        </p>
      </PageHeader>

      <section className="section" aria-labelledby="who-title">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Who we are</p>
            <h2 id="who-title" className="text-h2 font-bold">
              Why we do this work
            </h2>
            <p className="mt-6 text-lead">
              We recognise that the success of every organisation depends
              significantly on the knowledge, competence and capabilities of
              its people.
            </p>
            <p className="mt-5 text-slate">
              In an increasingly competitive and evolving business environment,
              continuous professional development is essential for improving
              productivity, promoting innovation and achieving sustainable
              organisational growth.
            </p>
            <p className="mt-5 text-slate">
              Our approach centres on identifying capacity gaps and developing
              appropriate learning interventions that address the practical
              challenges faced by individuals and organisations.
            </p>
            <p className="mt-5 text-slate">
              We work with professionals, corporate organisations, government
              institutions, industry practitioners and other stakeholders to
              provide customised training programmes that translate knowledge
              into practical workplace competence.
            </p>
            <p className="mt-9">
              <ArrowLink href={routes.approach}>How we design and deliver training</ArrowLink>
            </p>
          </div>

          <PhotoFigure
            slot="accra"
            ratio="aspect-[4/3] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 38vw, 100vw"
            fallbackLabel={company.positioning}
          />
        </div>
      </section>

      <section className="on-dark bg-navy text-white" aria-label="Vision and mission">
        <div className="container-site section-tight grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="eyebrow">Our vision</h2>
            <p className="mt-6 font-display text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] font-semibold leading-snug text-white">
              {vision}
            </p>
          </div>
          <div>
            <h2 className="eyebrow">Our mission</h2>
            <p className="mt-6 font-display text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] font-semibold leading-snug text-white">
              {mission}
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Our core values</p>
            <h2 id="values-title" className="text-h2 font-bold">
              The standards we hold ourselves to
            </h2>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="border-t border-line py-7">
                <dt className="font-display text-h3 font-bold text-navy">{value.title}</dt>
                <dd className="mt-2.5 text-[1rem] leading-relaxed text-slate">
                  {value.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-tight border-t border-line bg-ivory" aria-labelledby="work-title">
        <div className="container-site grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <h2 id="work-title" className="text-h2 font-bold">
              What we offer
            </h2>
          </div>
          <div>
            <p className="text-slate">
              Whether you are seeking to develop technical expertise,
              strengthen management capabilities, improve operational
              efficiency or enhance corporate governance, we provide the
              training and support to help you achieve your objectives.
            </p>
            <ul className="mt-7 flex flex-col gap-4">
              <li>
                <ArrowLink href={routes.programmes}>Browse training programmes</ArrowLink>
              </li>
              <li>
                <ArrowLink href={routes.services}>Read about our services</ArrowLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
