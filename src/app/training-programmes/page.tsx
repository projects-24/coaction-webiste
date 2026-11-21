import { Suspense } from "react";
import { Catalogue, CatalogueFromUrl } from "@/components/catalogue";
import { ClosingCta } from "@/components/closing-cta";
import { PageHeader } from "@/components/ui";
import { programmes } from "@/content/programmes";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Training Programmes",
  description:
    "Browse Coaction’s ten professional training programmes across energy and extractive industries, governance, strategy and leadership, finance, procurement and operations, and cyber security.",
  path: routes.programmes,
});

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader eyebrow="Training programmes" title="Find the right programme">
        <p>
          {programmes.length} programmes for professionals and organisations.
          Every programme can also be tailored and delivered in-house for your
          team.
        </p>
      </PageHeader>

      <section className="section-tight" aria-label="Programme catalogue">
        <div className="container-site">
          {/* The full catalogue is the static fallback; URL filters apply on load. */}
          <Suspense fallback={<Catalogue />}>
            <CatalogueFromUrl />
          </Suspense>
        </div>
      </section>

      <ClosingCta title="Need a programme built around your organisation?">
        Tell us about your objectives and the people you want to develop. We
        will discuss how a programme can be customised to your requirements.
      </ClosingCta>
    </>
  );
}
