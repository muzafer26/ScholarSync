import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getResourceConfidenceBadge(r: any): string {
  const titleLower = (r.title || "").toLowerCase();
  const sourceLower = (r.source || "").toLowerCase();
  const topicsLower = (r.topics || []).map((t: string) => t.toLowerCase());

  if (r.pricingType === 'OFFICIAL_DOCS' || titleLower.includes('docs') || titleLower.includes('documentation')) {
    return "Official Documentation";
  }
  if (topicsLower.includes('practice') || titleLower.includes('practice') || titleLower.includes('exercises') || titleLower.includes('challenge')) {
    return "Interactive Practice";
  }
  if (topicsLower.includes('projects') || titleLower.includes('project') || titleLower.includes('build your own')) {
    return "Project Based";
  }
  if (["mit ocw", "stanford", "harvard", "yale", "nptel", "university"].some(uni => sourceLower.includes(uni))) {
    return "University Course";
  }
  return "Community Recommended";
}
