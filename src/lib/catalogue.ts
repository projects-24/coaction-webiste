import {
  getCategory,
  type CategoryId,
  type Programme,
} from "@/content/programmes";

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function searchableText(programme: Programme): string {
  const category = getCategory(programme.category);
  return normalise(
    [
      programme.title,
      programme.summary,
      category.label,
      ...programme.topics,
      ...programme.outcomes,
      ...(programme.details ?? []).flatMap((detail) => [
        detail.title,
        ...(detail.items ?? []),
      ]),
      ...programme.audiences,
      ...programme.keywords,
    ].join(" "),
  );
}

export type CatalogueFilter = {
  query?: string;
  category?: CategoryId | "all";
};

/**
 * Filters the catalogue by category and free-text query. Every word of the
 * query must appear (as a word prefix) in the programme's title, summary,
 * topics, audiences, category or keywords.
 */
export function filterProgrammes(
  programmes: readonly Programme[],
  { query = "", category = "all" }: CatalogueFilter,
): Programme[] {
  const terms = normalise(query).split(" ").filter(Boolean);

  return programmes.filter((programme) => {
    if (category !== "all" && programme.category !== category) return false;
    if (terms.length === 0) return true;
    const haystack = ` ${searchableText(programme)}`;
    return terms.every((term) => haystack.includes(` ${term}`));
  });
}
