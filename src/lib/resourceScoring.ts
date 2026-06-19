import type { Resource } from "@/types";

export type QualityTier = 'Elite' | 'Excellent' | 'Good' | 'Basic';

export interface ScoreResult {
  qualityScore: number;
  qualityTier: QualityTier;
}

const parseDurationMins = (durationStr?: string): number => {
  if (!durationStr) return 0;
  const s = durationStr.toLowerCase();
  
  if (s.includes('week') || s.includes('month') || s.includes('year') || s.includes('day')) {
    return 10000; // Definitely > 3 hours
  }
  
  const numMatch = s.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;

  if (s.includes('hour') || s.includes('hr')) {
    return num * 60;
  }
  
  if (s.includes('min')) {
    return num;
  }
  
  return 0;
};

export const calculateResourceScore = (resource: Resource, allResources: Resource[]): ScoreResult => {
  let score = 50; // Default base

  const source = resource.source?.toLowerCase() || '';

  // SOURCE REPUTATION
  if (source.includes('mit')) score = 100;
  else if (source.includes('harvard')) score = 98;
  else if (source.includes('stanford')) score = 98;
  else if (source.includes('class central')) score = 95;
  else if (source.includes('ossu')) score = 92;
  else if (source.includes('freecodecamp')) score = 90;
  else if (source.includes('khan academy')) score = 88;
  else if (source.includes('coursera') && resource.title.toLowerCase().includes('audit')) score = 85;
  else if (source.includes('coursera')) score = 85;
  else if (source.includes('edx') && resource.title.toLowerCase().includes('audit')) score = 85;
  else if (source.includes('edx')) score = 85;
  else if (source.includes('youtube')) score = 80;
  else score = 50;

  // CONTENT QUALITY
  const durationMins = parseDurationMins(resource.duration);
  if (durationMins > 180) score += 10;
  else if (durationMins > 60) score += 5;

  // Roadmap coverage (+5 for beginner/intermediate)
  if (resource.level === 'beginner' || resource.level === 'intermediate') {
    score += 5;
  }

  // NEW RESOURCE TRUST LAYER RANKING LOGIC
  const typeBadge = (resource.resourceTypeBadge || '').toLowerCase();
  if (typeBadge.includes('official documentation') || typeBadge.includes('official docs') || resource.pricingType === 'OFFICIAL_DOCS') {
    score += 25; // Official Documentation is top priority
  } else if (typeBadge.includes('university curriculum')) {
    score += 20; // University Curriculum
  } else if (typeBadge.includes('community gold standards') || typeBadge.includes('community recommended')) {
    score += 15; // Community Gold Standards
  } else if (typeBadge.includes('interactive practice')) {
    score += 10; // Interactive Practice
  } else if (typeBadge.includes('project based') || typeBadge.includes('project-based')) {
    score += 5;  // Project-Based Learning
  }

  // PENALTIES
  if (!resource.description || resource.description.trim() === '') {
    score -= 10;
  }

  const duplicates = allResources.filter(r => r.url === resource.url);
  if (duplicates.length > 1) {
    score -= 20;
  }

  if (score < 60 && source !== 'youtube') {
    score -= 15; // Low quality source penalty
  }

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  let tier: QualityTier = 'Basic';
  if (score >= 90) tier = 'Elite';
  else if (score >= 80) tier = 'Excellent';
  else if (score >= 70) tier = 'Good';

  return {
    qualityScore: score,
    qualityTier: tier
  };
};
