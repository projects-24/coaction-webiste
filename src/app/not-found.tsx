import type { Metadata } from "next";
import { ArrowLink, ButtonLink } from "@/components/ui";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-ivory">
      <div className="container-site section">
        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="max-w-3xl text-h1 font-extrabold">We can’t find that page</h1>
        <p className="mt-6 max-w-xl text-lead text-slate">
          The page may have moved, or the address may have been typed
          incorrectly. These links should help you find what you need.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={routes.programmes} arrow>
            Explore Training Programmes
          </ButtonLink>
          <ButtonLink href={routes.home} variant="outline">
            Go to the Home Page
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <li>
            <ArrowLink href={routes.services}>Our services</ArrowLink>
          </li>
          <li>
            <ArrowLink href={routes.contact}>Contact us</ArrowLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
