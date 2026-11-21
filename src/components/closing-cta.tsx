import { contact, corporateRequestHref, enquiryHref } from "@/content/site";
import { ButtonLink } from "./ui";

/** The closing call to action shared by most pages. */
export function ClosingCta({
  title = "Let’s Build Capacity Together",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="closing-cta-title" className="on-dark bg-navy text-white">
      <div className="container-site section-tight grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
        <div>
          <p className="eyebrow mb-5">Get in touch</p>
          <h2 id="closing-cta-title" className="text-h2 font-bold text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lead text-white/80">
            {children ??
              "Whether you are an organisation seeking to strengthen the capacity of your workforce or an individual looking to enhance your professional knowledge and skills, we are ready to support your development objectives."}
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href={corporateRequestHref} variant="gold" className="flex-1">
              Request Corporate Training
            </ButtonLink>
            <ButtonLink
              href={enquiryHref({ type: "general" })}
              variant="outline-light"
              className="flex-1"
            >
              Make an Individual Enquiry
            </ButtonLink>
          </div>
          <p className="mt-6 text-[0.9375rem] text-white/75">
            Prefer to talk? Call{" "}
            <a href={contact.phones[0].href} className="text-link whitespace-nowrap">
              {contact.phones[0].display}
            </a>{" "}
            or email{" "}
            <a href={contact.email.href} className="text-link [overflow-wrap:anywhere]">
              {contact.email.display}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
