import Fuse from "fuse.js";
import { careers } from "@/lib/seed-careers";
import { modernCareers } from "@/lib/seed-careers-extra";
import { resources } from "@/lib/seed-resources";
import { scholarships } from "@/lib/seed-scholarships";
import type { Career, Resource, Scholarship } from "@/types";

// Unified search dataset
export const allCareers: Career[] = [...careers, ...modernCareers];
export const allResources: Resource[] = resources;
export const allScholarships: Scholarship[] = scholarships;

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

export const scholarshipFuse = new Fuse(allScholarships, {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "description", weight: 0.15 },
    { name: "provider", weight: 0.15 },
    { name: "fields", weight: 0.2 },
    { name: "country", weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
});

export interface UnifiedResult {
  kind: "career" | "resource" | "scholarship";
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
function scholarshipToResult(s: Scholarship, score?: number): UnifiedResult {
  return {
    kind: "scholarship",
    id: s.id,
    title: s.name,
    subtitle: `${s.provider} · ${s.country}`,
    description: s.description,
    href: s.applyUrl,
    tags: s.fields,
    score,
  };
}

export function searchAll(query: string, limit = 18): UnifiedResult[] {
  if (!query.trim()) {
    // Show curated mix when no query
    return [
      ...allCareers.slice(0, 6).map((c) => careerToResult(c)),
      ...allResources.slice(0, 6).map((r) => resourceToResult(r)),
      ...allScholarships.slice(0, 6).map((s) => scholarshipToResult(s)),
    ];
  }
  const c = careerFuse.search(query).map((r) => careerToResult(r.item, r.score));
  const r = resourceFuse.search(query).map((x) => resourceToResult(x.item, x.score));
  const s = scholarshipFuse.search(query).map((x) => scholarshipToResult(x.item, x.score));
  const merged = [...c, ...r, ...s].sort((a, b) => (a.score ?? 1) - (b.score ?? 1));
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
export function searchScholarships(query: string): Scholarship[] {
  if (!query.trim()) return allScholarships;
  return scholarshipFuse.search(query).map((r) => r.item);
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
  "Scholarships India",
  "Free Courses",
];

// Suggest fallback content when nothing matches well.
export function getRelatedSuggestions(query: string, max = 6): UnifiedResult[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  // Pick careers with overlapping tags
  const careerHits = allCareers
    .map((c) => ({
      career: c,
      hit: c.tags.some((t) => tokens.some((tok) => t.includes(tok) || tok.includes(t))),
    }))
    .filter((x) => x.hit)
    .slice(0, max)
    .map((x) => careerToResult(x.career));
  if (careerHits.length) return careerHits;

  // Otherwise — return trending careers
  return allCareers.slice(0, max).map((c) => careerToResult(c));
}
