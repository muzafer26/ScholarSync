import { NextRequest, NextResponse } from "next/server";
import { searchAccuracyEngine } from "@/lib/search";
import { careers } from "@/lib/seed-careers";
import { resources } from "@/lib/seed-resources";
import * as fs from "fs";
import * as path from "path";

export async function GET(req: NextRequest) {
  const traces: Record<string, string[]> = {};

  const queries = [
    "react",
    "cloud developer",
    "ai engineer",
    "i dont know what to do",
    "docker"
  ];

  for (const q of queries) {
    (globalThis as any).diagnosticLogs = [];
    searchAccuracyEngine(q);
    traces[q] = [...((globalThis as any).diagnosticLogs || [])];
  }

  // Run Recommended Resources for the 3 careers
  const recommendedTraces: Record<string, any[]> = {};

  const targetCareers = [
    { name: "AI/ML Engineer", slug: "ai-engineer" },
    { name: "UX Designer", slug: "ux-designer" },
    { name: "DevOps Engineer", slug: "devops-engineer" }
  ];

  for (const tc of targetCareers) {
    const career = careers.find(c => c.slug === tc.slug);
    if (!career) {
      recommendedTraces[tc.slug] = [{ error: `Career with slug ${tc.slug} not found` }];
      continue;
    }

    const careerTags = (career.tags || []).map(t => t.toLowerCase());
    const careerTitleWords = career.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const careerSkills = career.stages.flatMap(s => s.skills || []).map(s => s.toLowerCase());

    const scored = resources.map(r => {
      let score = 0;
      const titleLower = r.title.toLowerCase();
      const descLower = r.description.toLowerCase();
      const resourceTopics = (r.topics || []).map(t => t.toLowerCase());

      // 1. Explicit attachment boost
      if (career.recommendedResourceIds?.includes(r.id)) {
        score += 1000;
      }

      // 2. Stage skills overlap
      const matchingSkills = resourceTopics.filter(topic => careerSkills.includes(topic));
      score += matchingSkills.length * 50;

      // 3. Career tags overlap
      const matchingTags = resourceTopics.filter(topic => careerTags.includes(topic));
      score += matchingTags.length * 30;

      // 4. Title word matching
      const matchingTitleWords = careerTitleWords.filter(word => titleLower.includes(word) || descLower.includes(word));
      score += matchingTitleWords.length * 40;

      // 5. Generic penalty system (Python, CS50, Git) for non-relevant careers
      const isGenericTopic = resourceTopics.includes('python') || resourceTopics.includes('git') || resourceTopics.includes('github') || titleLower.includes('cs50');
      
      const careerIsPythonRelated = careerTags.includes('python') || careerSkills.includes('python') || career.title.toLowerCase().includes('python') || career.title.toLowerCase().includes('data science') || career.title.toLowerCase().includes('ai') || career.title.toLowerCase().includes('data analyst');
      
      const careerIsGitRelated = careerTags.includes('git') || careerSkills.includes('git');

      if (isGenericTopic) {
        if (resourceTopics.includes('python') && !careerIsPythonRelated) {
          score -= 500;
        }
        if ((resourceTopics.includes('git') || resourceTopics.includes('github')) && !careerIsGitRelated) {
          score -= 100;
        }
      }

      return {
        id: r.id,
        title: r.title,
        score,
        details: {
          matchingSkills,
          matchingTags,
          matchingTitleWords,
          isGenericTopic,
          careerIsPythonRelated,
          careerIsGitRelated
        }
      };
    });

    const sorted = scored
      .sort((a, b) => b.score - a.score || (resources.find(r => r.id === b.id)?.qualityScore || 0) - (resources.find(r => r.id === a.id)?.qualityScore || 0))
      .slice(0, 5);

    recommendedTraces[tc.slug] = sorted;
  }

  const result = {
    traces,
    recommendedTraces
  };

  // Write to workspace file
  fs.writeFileSync(path.join(process.cwd(), "diagnostic-output.json"), JSON.stringify(result, null, 2));

  return NextResponse.json(result);
}
