import { describe, expect, it } from "vitest";
import { categories, getProgramme, programmes } from "@/content/programmes";
import { featuredProgrammeSlugs, serviceAreas } from "@/content/company";
import { filterProgrammes } from "@/lib/catalogue";

const slugs = (query: string, category: Parameters<typeof filterProgrammes>[1]["category"] = "all") =>
  filterProgrammes(programmes, { query, category }).map((p) => p.slug);

describe("programme content", () => {
  it("contains all ten programmes with unique slugs", () => {
    expect(programmes).toHaveLength(10);
    expect(new Set(programmes.map((p) => p.slug)).size).toBe(10);
  });

  it("places programmes in the agreed editorial categories", () => {
    const count = (id: string) => programmes.filter((p) => p.category === id).length;
    expect(count("energy-extractives")).toBe(4);
    expect(count("governance-leadership")).toBe(3);
    expect(count("finance-operations")).toBe(2);
    expect(count("cyber-technology")).toBe(1);
    expect(categories).toHaveLength(4);
  });

  it("gives every programme complete page content", () => {
    for (const programme of programmes) {
      expect(programme.summary.length, programme.slug).toBeGreaterThan(40);
      expect(programme.overview.length, programme.slug).toBeGreaterThan(0);
      expect(programme.outcomes.length, programme.slug).toBeGreaterThanOrEqual(5);
      expect(programme.topics.length, programme.slug).toBeGreaterThanOrEqual(9);
      expect(programme.audiences.length, programme.slug).toBeGreaterThanOrEqual(4);
    }
  });

  it("only links to programmes that exist, and never to itself", () => {
    for (const programme of programmes) {
      expect(programme.related.length, programme.slug).toBe(3);
      for (const slug of programme.related) {
        expect(getProgramme(slug), `${programme.slug} -> ${slug}`).toBeDefined();
        expect(slug).not.toBe(programme.slug);
      }
    }
    for (const slug of featuredProgrammeSlugs) expect(getProgramme(slug)).toBeDefined();
    for (const area of serviceAreas)
      for (const item of area.items)
        for (const slug of item.programmes ?? []) expect(getProgramme(slug), slug).toBeDefined();
  });
});

describe("catalogue search and filtering", () => {
  it("returns everything when there is no query or category", () => {
    expect(slugs("")).toHaveLength(10);
    expect(slugs("   ")).toHaveLength(10);
  });

  it("matches programme titles, ignoring case", () => {
    expect(slugs("PETROLEUM ECONOMICS")).toContain("petroleum-economics");
    expect(slugs("forecourt")).toEqual(["forecourt-management"]);
  });

  it("matches topics", () => {
    expect(slugs("PESTLE")).toEqual(
      expect.arrayContaining(["corporate-strategic-planning"]),
    );
    expect(slugs("bank reconciliation")).toEqual(["cash-management"]);
    expect(slugs("psychological safety")).toEqual(["leading-in-a-dynamic-environment"]);
  });

  it("matches audiences", () => {
    expect(slugs("company secretaries")).toEqual(["corporate-governance"]);
    expect(slugs("supply chain officers")).toEqual(["procurement-in-a-dynamic-environment"]);
    expect(slugs("station managers")).toEqual(
      expect.arrayContaining(["forecourt-management", "cash-management"]),
    );
  });

  it("matches word prefixes and ignores punctuation", () => {
    expect(slugs("govern")).toContain("corporate-governance");
    expect(slugs("oil & gas")).toContain("downstream-oil-and-gas");
    expect(slugs("ISO/IEC 27001")).toEqual(["cyber-security"]);
  });

  it("requires every search word to match", () => {
    expect(slugs("governance zebra")).toEqual([]);
  });

  it("filters by category and combines with search", () => {
    expect(slugs("", "energy-extractives")).toHaveLength(4);
    expect(slugs("", "cyber-technology")).toEqual(["cyber-security"]);
    expect(slugs("risk", "finance-operations")).toEqual(
      expect.arrayContaining(["cash-management", "procurement-in-a-dynamic-environment"]),
    );
    expect(slugs("forecourt", "governance-leadership")).toEqual([]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(slugs("quantum astrophysics")).toEqual([]);
  });
});
