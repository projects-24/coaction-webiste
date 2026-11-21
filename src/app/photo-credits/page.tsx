import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { photos } from "@/content/images";
import { routes } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "Photo Credits",
    description:
      "Credits and licences for the photographs used on the Coaction Company Limited website.",
    path: routes.photoCredits,
  }),
  robots: { index: false, follow: true },
};

export default function PhotoCreditsPage() {
  const entries = Object.values(photos);
  if (entries.length === 0) notFound();

  return (
    <>
      <PageHeader eyebrow="Photo credits" title="Photographs on this website">
        <p>
          The photographs on this website were taken in Ghana and are used
          under the licences listed below. They are illustrative: they do not
          show Coaction Company Limited’s staff, premises, clients or training
          events, and their creators do not endorse Coaction.
        </p>
      </PageHeader>

      <section className="section-tight">
        <div className="container-site">
          <ul className="max-w-3xl border-t border-line">
            {entries.map((photo) => (
              <li key={photo.credit.sourceUrl} className="border-b border-line py-6">
                <p className="font-display font-bold text-navy">{photo.credit.title}</p>
                <p className="mt-1 text-[1rem] text-slate">{photo.alt}</p>
                <p className="mt-2 text-[0.9375rem]">
                  By {photo.credit.creator}. Licence:{" "}
                  {photo.credit.licenceUrl ? (
                    <a
                      href={photo.credit.licenceUrl}
                      rel="noopener noreferrer license"
                      className="text-link font-medium"
                    >
                      {photo.credit.licence}
                    </a>
                  ) : (
                    photo.credit.licence
                  )}
                  . {photo.credit.changes ? `${photo.credit.changes}. ` : ""}
                  <a
                    href={photo.credit.sourceUrl}
                    rel="noopener noreferrer"
                    className="text-link font-medium"
                  >
                    View the original
                  </a>
                  .
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
