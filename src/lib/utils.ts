import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getResourceTrustLabel } from "@/lib/resourceTrust"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getResourceConfidenceBadge(r: any): string {
  const trustLabel = getResourceTrustLabel(r);
  if (trustLabel === "Inactive" || trustLabel === "Needs Review" || trustLabel === "Verified Free") {
    return trustLabel;
  }

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

export function getResourceIcon(r: any): string {
  const urlLower = (r.url || "").toLowerCase();
  const sourceLower = (r.source || "").toLowerCase();
  const titleLower = (r.title || "").toLowerCase();
  const topicsLower = (r.topics || []).map((t: string) => t.toLowerCase());

  if (urlLower.includes("github.com")) {
    return "📦 GitHub Repository";
  }
  if (["mit ocw", "stanford", "harvard", "yale", "nptel", "university"].some(uni => sourceLower.includes(uni))) {
    return "🎓 University Resource";
  }
  if (sourceLower.includes("youtube") || titleLower.includes("video") || titleLower.includes("crash course")) {
    return "▶ Video";
  }
  if (topicsLower.includes('practice') || titleLower.includes('practice') || titleLower.includes('exercises') || titleLower.includes('challenge') || urlLower.includes("exercism") || urlLower.includes("sqlbolt")) {
    return "💻 Interactive Practice";
  }
  if (topicsLower.includes('projects') || titleLower.includes('project') || titleLower.includes('build your own')) {
    return "🛠 Project";
  }
  if (r.format === 'COURSE' || sourceLower.includes("course") || titleLower.includes("course") || sourceLower.includes("class central")) {
    return "📚 Course";
  }
  return "📄 Article / Documentation";
}

export function getResourceDifficulty(r: any): string {
  const lvl = r.level || "beginner";
  return lvl.charAt(0).toUpperCase() + lvl.slice(1);
}
