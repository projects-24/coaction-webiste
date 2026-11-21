import { ClosingCta } from "@/components/closing-cta";
import { ArrowLink, PageHeader } from "@/components/ui";
import { approachStages, learningMethods } from "@/content/company";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Approach",
  description:
    "How Coaction designs and delivers training: needs assessment, customised programme design, expert facilitation, practical learning, assessment and evaluation, and post-training support where required.",
  path: routes.approach,
});

export default function ApproachPage() {
  return (
    <>
      <PageHeader eyebrow="Our training approach" title="Learning designed around your needs">
        <p>
          We believe that effective training must go beyond the transfer of
          theoretical knowledge. It must equip participants with practical
          skills and competencies they can apply in their workplaces.
        </p>
      </PageHeader>

      <section className="section" aria-labelledby="stages-title">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-5">Six stages</p>
            <h2 id="stages-title" className="text-h2 font-bold">
              From understanding the need to supporting its application
            </h2>
            <p className="mt-5 text-slate">
              Our methodology is interactive, participatory and
              results-oriented. Each stage has a clear purpose for the client
              and for participants.
            </p>
          </div>

          <ol className="border-t border-navy/25">
            {approachStages.map((stage, index) => (
              <li
                key={stage.title}
                className="grid gap-x-8 gap-y-3 border-b border-navy/25 py-9 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
              >
                <p
                  aria-hidden="true"
                  className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight text-gold-ink"
                >
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-[clamp(1.25rem,1.15rem+0.5vw,1.5rem)] font-bold leading-tight">
                    <span className="sr-only">Stage {index + 1}: </span>
                    {stage.title}
                    {"qualifier" in stage ? (
                      <span className="ml-3 inline-block rounded-[3px] border border-line-strong px-2 py-0.5 align-middle font-sans text-xs font-semibold tracking-normal text-slate">
                        {stage.qualifier}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-3 max-w-[62ch]">{stage.summary}</p>
                  <p className="mt-4 max-w-[62ch] border-l-2 border-gold pl-4 text-[1rem] text-slate">
                    <span className="font-semibold text-charcoal">What this achieves: </span>
                    {stage.benefit}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-y border-line bg-ivory" aria-labelledby="methods-title">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-5">In the training room</p>
            <h2 id="methods-title" className="text-h2 font-bold">
              Practical, participatory learning
            </h2>
            <p className="mt-5 text-lead text-slate">
              Participants learn by working through realistic problems
              together, not only by listening.
            </p>
            <p className="mt-5 text-slate">
              Training supports professional development; what participants
              and organisations achieve afterwards also depends on how
              learning is applied in the workplace. Where required, we provide
              follow-up support and recommendations to help with that.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold-ink">
              Methods we use
            </h3>
            <ul className="mt-5 border-t border-navy/25">
              {learningMethods.map((method) => (
                <li
                  key={method}
                  className="flex items-center gap-4 border-b border-navy/25 py-4 font-display text-lg font-semibold text-navy"
                >
                  <span aria-hidden="true" className="size-1.5 flex-none bg-gold" />
                  {method}
                </li>
              ))}
            </ul>
            <ul className="mt-9 flex flex-col gap-4">
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

      <ClosingCta title="Start with a conversation about your needs">
        A needs assessment is the first stage of every programme we design.
        Tell us about your organisation’s objectives and the people you want
        to develop.
      </ClosingCta>
    </>
  );
}
