import Fuse from "fuse.js";
// HMR Cache Bust: 1718600000
import { careers } from "@/lib/seed-careers";
import { resources as rawResources } from "@/lib/seed-resources";
import type { Career, Resource, Job } from "@/types";
import { TAXONOMY_LOOKUP } from "@/lib/career-taxonomy";
import { CAREER_EVOLUTION_REGISTRY } from "./career-evolution";
import { TECH_TO_CAREER } from "./tech-to-career";

// Unified search dataset
export const allCareers: Career[] = careers;
// Dynamically enforce "100% Free Resources" by filtering out paid/audit-heavy platforms
export const allResources: Resource[] = rawResources.filter(
  (r) => !["coursera", "udemy", "edx"].some((paid) => r.source.toLowerCase().includes(paid))
);
export const allJobs: Job[] = [
  { id: 'j-1', title: 'Frontend Developer', source: 'LinkedIn', location: 'Remote', experience: 'Junior', requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'], lastUpdated: new Date().toISOString() },
  { id: 'j-2', title: 'Data Scientist', source: 'Indeed', location: 'New York, NY', experience: 'Mid-Level', requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Pandas'], lastUpdated: new Date().toISOString() },
  { id: 'j-3', title: 'Backend Engineer', source: 'Glassdoor', location: 'Remote', experience: 'Senior', requiredSkills: ['Node.js', 'PostgreSQL', 'AWS', 'System Design'], lastUpdated: new Date().toISOString() },
];

const SEARCH_ALIASES: Record<string, string[]> = {
  // Aliases & Intent
  'js': ['javascript', 'react', 'node'],
  'ml': ['machine learning', 'deep learning', 'ai'],
  'ai': ['artificial intelligence', 'machine learning'],
  'web': ['html', 'css', 'javascript', 'frontend'],
  'frontend': ['html', 'css', 'javascript', 'react', 'nextjs'],
  'backend': ['node', 'api', 'database', 'java', 'spring'],
  'java': ['spring', 'springboot', 'oop'],
  'ts': ['typescript'],
  'cs': ['computer science', 'programming'],
  'ds': ['data science', 'data analysis', 'pandas'],
  'ui': ['design', 'figma', 'ux'],
  'db': ['database', 'sql', 'mongodb', 'postgresql'],
  'devops': ['docker', 'kubernetes', 'ci/cd', 'jenkins'],
  'python': ['django', 'flask', 'fastapi', 'data science'],
  'c++': ['cpp', 'cplusplus'],
  'c#': ['csharp', 'dotnet'],
  'sde': ['software engineer'],
  'mern': ['mongodb', 'express', 'react', 'node'],
  'faang': ['dsa', 'system design', 'data structures'],
  'container orchestration': ['kubernetes', 'docker', 'devops', 'cloud'],
  
  // Hardcoded Typos (Level 2 Confidence)
  'pyhton': ['python'],
  'phyton': ['python'],
  'pthon': ['python'],
  'reactjs': ['react'],
  'reactjss': ['react'],
  'recat': ['react'],
  'javascrit': ['javascript'],
  'javscript': ['javascript'],
  'dockr': ['docker'],
  'kubernatess': ['kubernetes'],
  'kuberenetes': ['kubernetes'],
  'fronted': ['frontend'],
  'machien learning': ['machine learning'],
  'devops enginer': ['devops'],
  'cyber securty': ['cybersecurity'],
  'blockchian developer': ['blockchain developer'],
  'nodejs': ['node'],
  'typescript': ['javascript'],
  'nextjs': ['react'],

  // Global Synonyms Engine
  'cloud computing': ['devops', 'cloud'],
  'cloud developer': ['devops', 'cloud'],
  'cloud engineer': ['devops', 'cloud'],
  'aws engineer': ['devops', 'cloud'],
  'azure engineer': ['devops', 'cloud'],
  'gcp engineer': ['devops', 'cloud'],
  'platform engineer': ['devops', 'cloud'],
  'game dev': ['game developer'],
  'game programmer': ['game developer'],
  'unity dev': ['game developer'],
  'unreal dev': ['game developer'],
  'genai': ['ai engineer'],
  'llm': ['ai engineer'],
  'prompt engineering': ['ai engineer'],
  'ai agents': ['ai engineer'],
  'mcp': ['ai engineer'],
  'rag': ['ai engineer']
};

// Scenario-Driven Intent Mapping (Level 3 & 4 Confidence)
const INTENT_MAP: Record<string, string> = {
  // Complete Beginners
  "never coded before": "frontend | python | discovery",
  "where should i start": "frontend | python",
  "where do i start": "frontend | python",
  "how do i become a developer": "software engineer full stack",
  "best tech career for beginners": "frontend | qa tester",
  "easiest programming language": "frontend | python",
  "what should i learn first": "html | python",
  "can i learn coding without college": "frontend | web development",
  "i am totally confused": "frontend | beginner",
  "i am confused": "frontend | beginner",
  "i don't know what to choose": "frontend | discovery",
  "which tech field is best": "frontend | discovery",

  // Students
  "bca student": "frontend | java",
  "i am a bca student": "frontend | java",
  "skills for placement": "java | python | sql | dsa",
  "projects for resume": "project full stack react",
  "how to get internship": "frontend | react | python",
  "java for placements": "java | sql",
  "best career after bca": "frontend | backend | data",
  "campus placement preparation": "java | python",
  "skills companies want": "frontend | backend | full stack",
  "resume projects": "project full stack react",
  "how to crack interviews": "java | python",

  // Career Switchers
  "career change at 30": "data analyst",
  "career change at 40": "data analyst | qa tester",
  "commerce to tech": "data analyst",
  "non technical background": "ux designer | qa tester",
  "can i switch to it": "qa tester | frontend",
  "no coding experience": "frontend | qa tester",
  "job without degree": "frontend",
  "remote career options": "frontend | full stack",
  "high demand careers": "ai engineer | devops | full stack",
  "fast growing careers": "ai engineer | devops",

  // Salary Driven
  "highest paying tech jobs": "ai engineer | devops",
  "best salary in tech": "ai engineer",
  "ai salary": "ai engineer",
  "frontend salary": "frontend",
  "data science salary": "data scientist",
  "career with highest package": "ai engineer",
  "jobs above 20 lpa": "ai engineer | devops",
  "future proof career": "ai engineer | full stack",
  "richest tech field": "ai engineer",
  "best roi career": "full stack | qa tester",

  // Time Constrained
  "i have only 1 hour daily": "frontend | python",
  "i have only weekends": "frontend | python",
  "3 month roadmap": "qa tester",
  "6 month roadmap": "full stack",
  "quickest path to job": "qa tester",
  "fastest tech career": "qa tester",
  "learn coding quickly": "frontend",
  "short learning path": "qa tester",
  "part time learning": "frontend",
  "busy student": "frontend",

  // Fear Based
  "i hate maths": "ux designer",
  "maths weak": "ux designer | qa tester",
  "bad at coding": "ux designer",
  "can average students learn coding": "frontend | qa tester",
  "not good at logic": "ux designer",
  "afraid of programming": "ux designer",
  "can i do ai without maths": "ai engineer | machine learning",
  "easy tech career": "qa tester",
  "simple career path": "qa tester",
  "beginner friendly career": "frontend | qa tester",

  // Job Seekers
  "entry level jobs": "qa tester | frontend",
  "freshers jobs": "qa tester | frontend",
  "remote jobs": "frontend | full stack",
  "work from home": "frontend",
  "junior developer": "frontend",
  "react jobs": "frontend",
  "python jobs": "backend",
  "data analyst jobs": "data analyst",
  "cloud jobs": "devops engineer",

  // Random Human
  "help me choose": "frontend | discovery",
  "what should i learn": "frontend | python",
  "what career fits me": "frontend | discovery",
  "i want money": "ai engineer | devops",
  "i want remote work": "frontend",
  "i want freedom": "frontend | full stack",
  "i want freelancing": "freelancer | full stack",
  "i want startup": "full stack",
  "i want ai": "ai engineer",
  "i want to make websites": "frontend | web development",
  "i want to build apps": "mobile developer | flutter",
  "i want to create games": "game developer | c++",
  "i love ai": "ai engineer | machine learning",

  // Comparison Scenarios
  "react vs angular": "react | frontend",
  "aws vs azure": "aws | devops | cloud",
  "python vs java": "python | java | backend",
  "frontend vs backend": "frontend | backend",
  "data science vs ai": "data scientist | ai engineer",

  // Learning Resource Scenarios
  "best python course": "python course freecodecamp",
  "practice python": "python practice exercism",
  "python projects": "python project",
  "react exercises": "react practice",
  "sql practice": "sql practice sqlbolt",
  "git exercises": "git practice github",
  "linux labs": "linux practice overthewire",

  // Job Scenarios
  "python jobs": "python backend data",
  "frontend jobs": "frontend react web",
  "ai internships": "ai machine learning",
  "remote jobs": "software engineer frontend backend",
  "entry level jobs": "frontend python qa",
};

export function expandQuery(query: string): string {
  if (!query) return "";
  let q = query.toLowerCase().trim();
  
  let intentAppend = "";
  // Check for scenario matches
  for (const [intent, mapping] of Object.entries(INTENT_MAP)) {
    if (q.includes(intent)) {
      intentAppend = ` | ${mapping}`;
    }
  }

  // Handle Fuse.js extended search operator collisions for C++ and C#
  q = q.replace(/\bc\+\+/g, '="c++" | cpp | cplusplus');
  q = q.replace(/\bc#/g, '="c#" | csharp | dotnet');
  
  // Exact scenario matches completely override the query logic
  for (const [intent, mapping] of Object.entries(INTENT_MAP)) {
    if (q.includes(intent)) {
      q = mapping;
      break; // Safe complete override for specific conversational queries
    }
  }

  // Expand standard aliases
  const aliases = Array.from(new Set(
    q.split(/\s+/).flatMap(word => SEARCH_ALIASES[word] || [])
  )).map(word => `'${word}`);

  // Base query logic: keep exact match or fuzzy match the entire phrase, avoid splitting words into loose ORs.
  const baseQuery = q.includes('="') ? q : `'${q}`;

  // Use Fuse.js Extended Search OR operator
  return [baseQuery, ...aliases].join(" | ");
}

// Fuse.js instances for fuzzy search
export const careerFuse = new Fuse(allCareers, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "aliases", weight: 0.35 },
    { name: "tags", weight: 0.2 },
    { name: "shortDescription", weight: 0.15 },
    { name: "description", weight: 0.1 },
    { name: "field", weight: 0.15 },
    { name: "subfield", weight: 0.1 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  includeScore: true,
  useExtendedSearch: true,
});

export const resourceFuse = new Fuse(allResources, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.15 },
    { name: "topics", weight: 0.25 },
    { name: "source", weight: 0.1 },
    { name: "field", weight: 0.1 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  includeScore: true,
  useExtendedSearch: true,
});

export const jobFuse = new Fuse(allJobs, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "requiredSkills", weight: 0.5 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  includeScore: true,
  useExtendedSearch: true,
});

export type MatchType = "exact" | "prefix" | "alias" | "fuzzy";

export interface UnifiedResult {
  kind: "career" | "resource" | "job";
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  tags?: string[];
  score?: number;
  adjustedScore?: number;
  explanation?: string;
  whyRecommended?: string;
  isVerified?: boolean;
  matchType?: MatchType;
  pricingType?: string;
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
    isVerified: r.verified,
    pricingType: r.pricingType,
    whyRecommended: r.whyRecommended
  };
}
function jobToResult(j: Job, score?: number): UnifiedResult {
  return {
    kind: "job",
    id: j.id,
    title: j.title,
    subtitle: `${j.source} · ${j.location}`,
    description: `${j.experience} · Required: ${j.requiredSkills.join(", ")}`,
    href: `#`,
    tags: j.requiredSkills,
    score,
  };
}

export function searchAll(query: string, limit = 20): UnifiedResult[] {
  if (!query.trim()) {
    return [
      ...allCareers.slice(0, 5).map((c) => careerToResult(c)),
      ...allResources.slice(0, 10).map((r) => resourceToResult(r)),
      ...allJobs.slice(0, 5).map((j) => jobToResult(j)),
    ];
  }
  
  const expandedQuery = expandQuery(query);
  
  const c = careerFuse.search(expandedQuery).map((r) => careerToResult(r.item, r.score));
  const r = resourceFuse.search(expandedQuery).map((x) => resourceToResult(x.item, x.score));
  const j = jobFuse.search(expandedQuery).map((x) => jobToResult(x.item, x.score));
  
  const merged = [...c, ...r, ...j].map(item => {
    let rankingPenalty = 0;
    if (item.kind === 'resource') {
      if (item.isVerified) rankingPenalty = -0.2; // Verified resources at the top
      else rankingPenalty = 0.3; // Unverified at the bottom
    } else if (item.kind === 'career') {
      rankingPenalty = -0.5; // Roadmaps high priority (was -0.1)
    } else if (item.kind === 'job') {
      rankingPenalty = 0.1; // Jobs medium priority
    }
    return { ...item, adjustedScore: (item.score ?? 1) + rankingPenalty };
  }).sort((a, b) => a.adjustedScore - b.adjustedScore);
  
  return merged.slice(0, limit);
}

export function searchCareers(query: string): Career[] {
  if (!query.trim()) return allCareers;
  
  const normQuery = query.toLowerCase().trim();
  let results = careerFuse.search(expandQuery(query)).map((r) => r.item);
  
  // Tier 3: Taxonomy Explanation Layer
  const taxonomyTarget = TAXONOMY_LOOKUP[normQuery];
  if (taxonomyTarget) {
    // If it matches an exact alias in the taxonomy (e.g. 'cloud developer' -> 'Cloud Engineer')
    const targetCareer = allCareers.find(c => c.title.toLowerCase() === taxonomyTarget.toLowerCase());
    if (targetCareer) {
      // Attach the explanation
      let whyText = `'${query}' is not a standardized hiring title. ${targetCareer.title} is the closest industry pathway.`;
      let confidence = "85% Match";
      
      if (normQuery.includes("cloud") || normQuery.includes("kubernetes") || normQuery.includes("docker") || normQuery.includes("sre")) {
        whyText = "Cloud Developer is not a standardized role. DevOps/Cloud Engineering is the closest industry pathway.";
        confidence = "85% Match";
      } else if (normQuery.includes("prompt") || normQuery.includes("llm") || normQuery.includes("rag") || normQuery.includes("genai")) {
        whyText = "Prompt/LLM Engineering is a specialized subset. AI Engineering is the primary industry pathway.";
        confidence = "90% Match";
      } else if (normQuery.includes("unity") || normQuery.includes("unreal")) {
        whyText = "Unity & Unreal are engine tools. Game Developer is the standard industry path.";
        confidence = "92% Match";
      } else if (normQuery.includes("react") || normQuery.includes("next") || normQuery.includes("vue") || normQuery.includes("angular")) {
        whyText = "These are web frameworks. Frontend Developer is the primary standardized pathway.";
        confidence = "95% Match";
      }
      
      const explainedCareer: Career = {
        ...targetCareer,
        matchExplanation: `${confidence} · Closest Pathway: ${targetCareer.title}\nWhy: ${whyText}`
      };
      
      // Ensure it sits at the very top of the results
      results = [explainedCareer, ...results.filter(c => c.id !== targetCareer.id)];
    }
  }

  // Never return an empty state. If strict search fails, force a fallback to the most popular/related careers.
  if (results.length === 0) {
    // Relax the threshold manually to force the closest matches
    const looseFuse = new Fuse(allCareers, {
      keys: ["title", "tags", "description"],
      threshold: 0.8, // extremely loose matching
      ignoreLocation: true,
    });
    results = looseFuse.search(query).map((r) => r.item);
    
    // If even the loose search fails, provide 3 highly popular entry-point careers as guided fallbacks instead of returning everything.
    if (results.length === 0) {
      return allCareers.filter(c => ["frontend-developer", "data-analyst", "full-stack-developer"].includes(c.slug));
    }
  }
  
  return results;
}
export function searchResources(query: string): Resource[] {
  if (!query.trim()) return allResources;
  return resourceFuse.search(expandQuery(query)).map((r) => r.item);
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

// ==========================================
// SEARCH ACCURACY ENGINE V1
// ==========================================

export type SearchIntent = "Learning" | "Career" | "Job" | "Project" | "General";

export interface EngineResult {
  intent: SearchIntent;
  recommended: UnifiedResult[];
  results: UnifiedResult[];
}

function detectIntent(query: string): SearchIntent {
  const q = query.toLowerCase();
  if (q.includes("internship") || q.includes("job") || q.includes("hire") || q.includes("role")) return "Job";
  if (q.includes("project") || q.includes("build") || q.includes("portfolio")) return "Project";
  if (q.includes("career") || q.includes("developer") || q.includes("engineer") || q.includes("designer") || q.includes("analyst") || q.includes("choose")) return "Career";
  if (q.includes("learn") || q.includes("course") || q.includes("tutorial") || q.includes("how to") || q.includes("start")) return "Learning";
  return "General";
}

function normalizeQuery(q: string): string {
  return q.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
}

function determineMatchType(title: string, tags: string[] = [], originalQuery: string, aliases: string[]): MatchType {
  const normTitle = normalizeQuery(title);
  const normQuery = normalizeQuery(originalQuery);
  const normTags = tags.map(normalizeQuery);

  if (normTitle === normQuery || normTags.includes(normQuery)) return "exact";
  if (normTitle.startsWith(normQuery) || normTitle.includes(` ${normQuery} `) || normTitle.includes(`${normQuery} `) || normTitle.includes(` ${normQuery}`)) return "prefix";
  if (aliases.some(a => normTitle.includes(a) || normTags.includes(a))) return "alias";
  return "fuzzy";
}

function getMatchScoreBoost(matchType: MatchType): number {
  switch (matchType) {
    case "exact": return -1000;
    case "prefix": return -500;
    case "alias": return -250;
    case "fuzzy": return 0;
  }
}

function inferPricingType(source: string, title: string): string {
  if (source === 'Coursera' || source === 'edX' || source === 'Class Central' || source === 'Udacity') return 'AUDIT_ONLY';
  if (source === 'GitHub' || source === 'Open Source') return 'OPEN_SOURCE';
  if (title.toLowerCase().includes('docs') || title.toLowerCase().includes('documentation') || source === 'Mozilla' || source === 'Google' || source === 'Node.js' || source === 'React') return 'OFFICIAL_DOCS';
  return 'FREE';
}

const diagLog = (...args: any[]) => {
  const str = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
  console.log(str);
  if (!(globalThis as any).diagnosticLogs) (globalThis as any).diagnosticLogs = [];
  (globalThis as any).diagnosticLogs.push(str);
};

export function searchAccuracyEngine(query: string): EngineResult {
  diagLog(`--- Diagnostic Start for query: "${query}" ---`);
  const normQuery = normalizeQuery(query);
  diagLog(`Raw input after preprocessing (normalizeQuery): "${normQuery}"`);
  
  const intent = detectIntent(normQuery);
  diagLog(`Intent detected: "${intent}" (via detectIntent)`);
  
  const expandedQuery = expandQuery(normQuery);
  diagLog(`Expanded query (expandQuery): "${expandedQuery}"`);
  
  const activeAliases = SEARCH_ALIASES[normQuery] || [];
  diagLog(`Active aliases: ${JSON.stringify(activeAliases)}`);

  diagLog("--- Evaluating Career Candidates ---");
  let careers = careerFuse.search(expandedQuery).map((r) => {
    const isJavaJsConflict = normQuery === "java" && r.item.title.toLowerCase().includes("javascript");
    let scoreBase = r.score ?? 1;
    let mType = determineMatchType(r.item.title, r.item.tags, normQuery, activeAliases);
    let boost = getMatchScoreBoost(mType);
    let adjustedScore = isJavaJsConflict ? 9999 : scoreBase - 0.2 + boost;
    
    diagLog(`Career Candidate: "${r.item.title}" | Raw Score: ${r.score} | MatchType: ${mType} | Boost: ${boost} | AdjustedScore: ${adjustedScore} ${isJavaJsConflict ? '(Java/JS Penalty)' : ''}`);
    
    const res = careerToResult(r.item, r.score);
    res.matchType = mType;
    if (mType === "alias") {
      if (normQuery.includes("cloud") || normQuery.includes("kubernetes") || normQuery.includes("docker")) {
        res.explanation = `Why ${r.item.title}? Most cloud infrastructure roles are standardly hired under DevOps Engineer.`;
      } else if (normQuery.includes("prompt") || normQuery.includes("llm") || normQuery.includes("ai") || normQuery.includes("gpt")) {
        res.explanation = `Why ${r.item.title}? LLM & Prompt engineering are specialized subsets under AI Engineering.`;
      } else if (normQuery.includes("react") || normQuery.includes("next") || normQuery.includes("vue") || normQuery.includes("css")) {
        res.explanation = `Why ${r.item.title}? Frontend Developer is the primary career pipeline for web interface technologies.`;
      } else {
        res.explanation = `Why ${r.item.title}? This is the closest standardized hiring path for your alias search.`;
      }
    } else if (mType === "exact") {
      res.explanation = "✓ Core Pathway: Industry-standard career role with verified roadmap.";
    } else {
      res.explanation = `✓ Mapped Technology: Rationale path for learning related tools (${normQuery}).`;
    }
    
    return { ...res, adjustedScore };
  });

  // Inject Tech Map Match
  diagLog("--- Checking Tech Map Inject ---");
  const techMatch = TECH_TO_CAREER[normQuery];
  if (techMatch) {
    const targetCareer = allCareers.find(c => c.slug === techMatch.careers[0]);
    if (targetCareer) {
      const explainStr = `Showing ${targetCareer.title} | Reason: ${techMatch.explanation} We recommend entering the ${targetCareer.title} pathway.`;
      diagLog(`Injected Tech Map: "${targetCareer.title}" with adjustedScore: -2000`);
      const res = {
        ...careerToResult(targetCareer, -2000),
        matchType: "exact" as MatchType,
        explanation: explainStr,
        adjustedScore: -2000
      };
      careers = [res, ...careers.filter(c => c.id !== targetCareer.id)];
    }
  }

  // Inject Career Evolution Registry Match
  diagLog("--- Checking Career Evolution Registry Inject ---");
  for (const [coreCareer, data] of Object.entries(CAREER_EVOLUTION_REGISTRY)) {
    const matchedAlias = data.aliases.find(a => a.toLowerCase() === normQuery);
    if (matchedAlias) {
      const targetCareer = allCareers.find(c => c.title.toLowerCase() === coreCareer.toLowerCase());
      if (targetCareer) {
        const explainStr = `Showing ${targetCareer.title} | Reason: "${matchedAlias}" is commonly hired under ${targetCareer.title} roles.`;
        diagLog(`Injected Career Evolution Registry match: "${targetCareer.title}" for alias: "${matchedAlias}" with adjustedScore: -2000`);
        const res = {
          ...careerToResult(targetCareer, -2000),
          matchType: "alias" as MatchType,
          explanation: explainStr,
          adjustedScore: -2000
        };
        careers = [res, ...careers.filter(c => c.id !== targetCareer.id)];
      }
    }
  }

  diagLog("--- Evaluating Resource Candidates ---");
  let resources = resourceFuse.search(expandedQuery).map((r) => {
    const isJavaJsConflict = normQuery === "java" && r.item.title.toLowerCase().includes("javascript");
    r.item.pricingType = r.item.pricingType || inferPricingType(r.item.source, r.item.title) as any;
    
    const mType = determineMatchType(r.item.title, r.item.topics, normQuery, activeAliases);
    const relevance = 1 - (r.score ?? 0.5);
    const trustBase = r.item.pricingType === 'OFFICIAL_DOCS' ? 100 : r.item.verified ? 95 : 70;
    const trustScore = ((r.item.qualityScore || 80) + trustBase) / 200;
    const freshnessScore = r.item.status === 'Active' || r.item.status === 'Verified' ? 1.0 : 0.8;
    const compositeScore = (relevance * 0.5) + (trustScore * 0.3) + (freshnessScore * 0.2);
    let boost = getMatchScoreBoost(mType);
    let adjustedScore = isJavaJsConflict ? 9999 : -compositeScore + boost;
    
    diagLog(`Resource Candidate: "${r.item.title}" | Raw Score: ${r.score} | MatchType: ${mType} | Composite: ${compositeScore} | Boost: ${boost} | AdjustedScore: ${adjustedScore} ${isJavaJsConflict ? '(Java/JS Penalty)' : ''}`);

    const res = resourceToResult(r.item, r.score);
    const reasons = [];
    if (r.item.whyRecommended) {
      reasons.push(r.item.whyRecommended);
    } else {
      if (r.item.level === "beginner") reasons.push("Best starting point for beginners");
      if (r.item.qualityTier === "Elite") reasons.push("Exceptional depth and clarity");
      if (r.item.verified) reasons.push("Human reviewed and updated recently");
    }
    res.explanation = reasons.length > 0 ? "✓ " + reasons.join(" · ") : "✓ Community verified learning path";
    res.matchType = mType;
    
    return { ...res, adjustedScore };
  });

  diagLog("--- Evaluating Job Candidates ---");
  let jobs = jobFuse.search(expandedQuery).map((r) => {
    const mType = determineMatchType(r.item.title, r.item.requiredSkills, normQuery, activeAliases);
    const boost = getMatchScoreBoost(mType);
    const adjustedScore = (r.score ?? 1) + boost;
    
    diagLog(`Job Candidate: "${r.item.title}" | Raw Score: ${r.score} | MatchType: ${mType} | Boost: ${boost} | AdjustedScore: ${adjustedScore}`);

    const res = jobToResult(r.item, r.score);
    res.explanation = "✓ Live opportunity matching your skills";
    res.matchType = mType;
    return { ...res, adjustedScore };
  });

  // Apply Intent Bias
  diagLog("--- Applying Intent Bias ---");
  diagLog(`Pre-bias Scores - Careers count: ${careers.length}, Resources count: ${resources.length}, Jobs count: ${jobs.length}`);
  if (intent === "Learning") {
    diagLog("Applying bias: Learning (+0.5 boost to resources, i.e., subtracting 0.5 from score)");
    resources.forEach(r => r.adjustedScore! -= 0.5);
  } else if (intent === "Career") {
    diagLog("Applying bias: Career (+0.5 boost to careers, i.e., subtracting 0.5 from score)");
    careers.forEach(c => c.adjustedScore! -= 0.5);
  } else if (intent === "Job") {
    diagLog("Applying bias: Job (+0.5 boost to jobs, +0.3 boost to careers)");
    jobs.forEach(j => j.adjustedScore! -= 0.5);
    careers.forEach(c => c.adjustedScore! -= 0.3);
  } else if (intent === "Project") {
    diagLog("Applying bias: Project (+0.6 boost to project-related resources)");
    resources.forEach(r => {
      if (r.tags?.includes("project") || r.description?.toLowerCase().includes("project")) {
        r.adjustedScore! -= 0.6;
        r.explanation = "✓ Hands-on project implementation";
      }
    });
  }

  // Filtering out penalized items
  diagLog("--- Filtering Candidates ---");
  const beforeFilterCount = careers.length + resources.length + jobs.length;
  const filteredOutList = [...careers, ...resources, ...jobs].filter(a => a.adjustedScore! >= 9000);
  filteredOutList.forEach(a => {
    diagLog(`Filtered OUT: [${a.kind}] "${a.title}" | Adjusted Score: ${a.adjustedScore} | Reason: Java/JS conflict penalty`);
  });

  const allMerged = [...careers, ...resources, ...jobs]
    .filter(a => a.adjustedScore! < 9000)
    .sort((a, b) => a.adjustedScore! - b.adjustedScore!);

  diagLog(`Candidates remaining after filter: ${allMerged.length} of ${beforeFilterCount}`);

  diagLog("--- Sorting Results (Descending order by rank / Ascending score) ---");
  allMerged.forEach((item, idx) => {
    diagLog(`Sorted Rank ${idx + 1}: [${item.kind}] "${item.title}" | Score: ${item.adjustedScore?.toFixed(4)} | MatchType: ${item.matchType}`);
  });

  const recommended: UnifiedResult[] = [];
  const results: UnifiedResult[] = [];
  const seenKinds = new Set<string>();
  
  for (const item of allMerged) {
    if (recommended.length < 4 && !seenKinds.has(item.kind)) {
      recommended.push(item);
      seenKinds.add(item.kind);
      diagLog(`Added to Recommended (Diversity): [${item.kind}] "${item.title}"`);
    } else if (recommended.length < 4 && item.kind === "resource" && intent === "Learning" && recommended.filter(r => r.kind === "resource").length < 2) {
      recommended.push(item);
      diagLog(`Added to Recommended (Learning extra resource): [${item.kind}] "${item.title}"`);
    } else {
      results.push(item);
    }
  }

  diagLog(`Recommended List length: ${recommended.length}`);
  diagLog(`Results List length: ${results.length}`);

  const finalResults = { intent, recommended, results: results.slice(0, 30) };
  diagLog(`--- Diagnostic End for query: "${query}" ---`);
  return finalResults;
}
