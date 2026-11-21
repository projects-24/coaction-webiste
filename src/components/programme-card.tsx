import Link from "next/link";
import { getCategory, programmeHref, type Programme } from "@/content/programmes";
import { ArrowIcon } from "./ui";

export function ProgrammeCard({
  programme,
  headingLevel = "h3",
}: {
  programme: Programme;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const category = getCategory(programme.category);

  return (
    <article className="group relative flex h-full flex-col rounded-[3px] border border-line bg-white p-7 transition-colors duration-150 hover:border-navy sm:p-9">
      <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">
        {category.label}
      </p>
      <Heading className="mt-4 text-h3 font-bold">{programme.title}</Heading>
      <p className="mt-3 text-[1rem] leading-relaxed text-slate">
        {programme.summary}
      </p>
      <p className="mt-auto pt-7">
        <Link
          href={programmeHref(programme.slug)}
          className="inline-flex items-center gap-2 font-display text-[0.9375rem] font-bold text-navy underline decoration-gold decoration-2 underline-offset-[0.35em] after:absolute after:inset-0 after:content-[''] group-hover:decoration-navy"
        >
          View Programme
          <span className="sr-only">: {programme.title}</span>
          <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </p>
    </article>
  );
}
