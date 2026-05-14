import Fuse from "fuse.js";
import { careers } from "@/lib/seed-careers";
import { resources } from "@/lib/seed-resources";
import type { Career, Resource } from "@/types";

// Unified search dataset
export const allCareers: Career[] = careers;
export const allResources: Resource[] = resources;

// Fuse.js instances for fuzzy search
export const careerFuse = new Fuse(allCareers, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "shortDescription", weight: 0.15 },
    { name: "description", weight: 0.1 },
    { name: "field", weight: 0.15 },
    { name: "subfield", weight: 0.1 },
    { name: "tags", weight: 0.2 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
});

export const resourceFuse = new Fuse(allResources, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.15 },
    { name: "topics", weight: 0.25 },
    { name: "source", weight: 0.1 },
    { name: "field", weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
});

export interface UnifiedResult {
  kind: "career" | "resource";
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  tags?: string[];
  score?: number;
}

function careerToResult(c: Career, score?: number): UnifiedResult {
  return {
    kind: "career",
    id: c.id,
    title: c.title,
    subtitle: `${c.field} · ${c.subfield}`,
    description: c.shortDescription,
    href: `/explore/${c.slug}`,
    tags: c.tags,
    score,
  };
}
function resourceToResult(r: Resource, score?: number): UnifiedResult {
  return {
    kind: "resource",
    id: r.id,
    title: r.title,
    subtitle: `${r.source} · ${r.level}`,
    description: r.description,
    href: r.url,
    tags: r.topics,
    score,
  };
}

export function searchAll(query: string, limit = 18): UnifiedResult[] {
  if (!query.trim()) {
    return [
      ...allCareers.slice(0, 9).map((c) => careerToResult(c)),
      ...allResources.slice(0, 9).map((r) => resourceToResult(r)),
    ];
  }
  const c = careerFuse.search(query).map((r) => careerToResult(r.item, r.score));
  const r = resourceFuse.search(query).map((x) => resourceToResult(x.item, x.score));
  const merged = [...c, ...r].sort((a, b) => (a.score ?? 1) - (b.score ?? 1));
  return merged.slice(0, limit);
}

export function searchCareers(query: string): Career[] {
  if (!query.trim()) return allCareers;
  return careerFuse.search(query).map((r) => r.item);
}
export function searchResources(query: string): Resource[] {
  if (!query.trim()) return allResources;
  return resourceFuse.search(query).map((r) => r.item);
}

export const TRENDING_QUERIES = [
  "Python",
  "AI Engineer",
  "Web Development",
  "Cybersecurity",
  "Data Science",
  "Machine Learning",
  "Cloud Engineer",
  "Product Design",
  "Blockchain",
  "Game Development",
  "Free Courses",
  "MIT OCW",
];

export function getRelatedSuggestions(query: string, max = 6): UnifiedResult[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const careerHits = allCareers
    .map((c) => ({
      career: c,
      hit: c.tags.some((t) => tokens.some((tok) => t.includes(tok) || tok.includes(t))),
    }))
    .filter((x) => x.hit)
    .slice(0, max)
    .map((x) => careerToResult(x.career));
  if (careerHits.length) return careerHits;

  return allCareers.slice(0, max).map((c) => careerToResult(c));
}
