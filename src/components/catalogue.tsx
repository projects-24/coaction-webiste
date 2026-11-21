"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import {
  categories,
  isCategoryId,
  programmes,
  type CategoryId,
} from "@/content/programmes";
import { enquiryHref } from "@/content/site";
import { filterProgrammes } from "@/lib/catalogue";
import { ProgrammeCard } from "./programme-card";
import { buttonClass } from "./ui";

type CategoryFilter = CategoryId | "all";

export function Catalogue({
  initialCategory = "all",
}: {
  initialCategory?: CategoryFilter;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const searchId = useId();

  const results = useMemo(
    () => filterProgrammes(programmes, { query, category }),
    [query, category],
  );

  const filtered = query.trim() !== "" || category !== "all";
  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  const options: { id: CategoryFilter; label: string; count: number }[] = [
    { id: "all", label: "All programmes", count: programmes.length },
    ...categories.map((item) => ({
      id: item.id,
      label: item.label,
      count: programmes.filter((p) => p.category === item.id).length,
    })),
  ];

  return (
    <div>
      <search className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
        <div>
          <label
            htmlFor={searchId}
            className="block font-display text-sm font-bold text-navy"
          >
            Search programmes
          </label>
          <div className="relative mt-2.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-4 top-1/2 size-[1.125rem] -translate-y-1/2 text-slate"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="9" cy="9" r="5.5" />
              <path d="M13.2 13.2L17 17" />
            </svg>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Topic, title or role"
              autoComplete="off"
              className="h-13 w-full rounded-[3px] border border-field bg-white pl-11 pr-4 text-[1rem] text-charcoal placeholder:text-slate focus-visible:border-navy"
            />
          </div>
          <p className="mt-2.5 text-sm text-slate">
            Try “governance”, “risk” or “station managers”.
          </p>
        </div>

        <fieldset>
          <legend className="font-display text-sm font-bold text-navy">
            Filter by programme area
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            {options.map((option) => {
              const selected = category === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setCategory(option.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-[3px] border px-4 py-2 text-left text-[0.9375rem] font-semibold leading-tight transition-colors duration-150 ${
                    selected
                      ? "border-navy bg-navy text-white"
                      : "border-field bg-white text-charcoal hover:border-navy"
                  }`}
                >
                  {option.label}
                  <span
                    className={`text-sm font-normal ${selected ? "text-white/75" : "text-slate"}`}
                  >
                    <span className="sr-only">, </span>
                    {option.count}
                    <span className="sr-only">
                      {option.count === 1 ? " programme" : " programmes"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </search>

      <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6">
        <p role="status" aria-live="polite" className="text-[0.9375rem] text-slate">
          {results.length === 0
            ? "No programmes match your search."
            : `Showing ${results.length} of ${programmes.length} programmes`}
        </p>
        {filtered ? (
          <button
            type="button"
            onClick={reset}
            className="text-link min-h-11 text-[0.9375rem]"
          >
            Clear search and filters
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2">
          {results.map((programme) => (
            <li key={programme.slug}>
              <ProgrammeCard programme={programme} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-[3px] border border-line bg-ivory px-7 py-12 sm:px-12">
          <h2 className="text-h3 font-bold">
            We couldn’t find a programme matching your search
          </h2>
          <p className="mt-3 max-w-xl text-slate">
            Try a broader term or a different programme area. If the subject you
            need is not listed, tell us about it: we design customised
            programmes around specific organisational requirements.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className={buttonClass("primary")}>
              Show all programmes
            </button>
            <Link
              href={enquiryHref({ type: "corporate" })}
              className={buttonClass("outline")}
            >
              Discuss a customised programme
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/** Reads ?category= so links from other pages can open a filtered catalogue. */
export function CatalogueFromUrl() {
  const param = useSearchParams().get("category");
  const initial = isCategoryId(param) ? param : "all";
  return <Catalogue key={initial} initialCategory={initial} />;
}
