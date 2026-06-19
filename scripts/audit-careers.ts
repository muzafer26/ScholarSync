import { careers } from "../src/lib/seed-careers";
import { careerReality } from "../src/lib/careerReality";
import { careerActionPlans } from "../src/lib/careerActionPlans";
import { careerCompareData } from "../src/lib/compareInsights";
import { careerSources } from "../src/lib/careerSources";

console.log("=========================================");
console.log("      SCHOLARSYNC CAREER AUDIT RUN       ");
console.log("=========================================\n");
console.log("Total careers in seed-careers.ts:", careers.length);

let failed = false;
const errors: string[] = [];

careers.forEach(c => {
  const slug = c.slug;
  const hasReality = !!careerReality[slug];
  const hasActionPlan = !!careerActionPlans[slug];
  const hasCompare = !!careerCompareData[slug];
  const hasSources = !!careerSources[slug] || (c.sources && c.sources.length > 0);
  
  // Roadmap metadata: stages, whyExists, whyThisStep, whyNow, whyBeforeNext, realWorldUsage, expectedOutcome
  const missingMetadataStages: string[] = [];
  const hasStages = c.stages && c.stages.length > 0;
  
  if (hasStages) {
    c.stages.forEach((s, idx) => {
      const missingFields = [];
      if (!s.whyExists) missingFields.push("whyExists");
      if (!s.whyThisStep) missingFields.push("whyThisStep");
      if (!s.whyNow) missingFields.push("whyNow");
      if (!s.whyBeforeNext) missingFields.push("whyBeforeNext");
      if (!s.realWorldUsage) missingFields.push("realWorldUsage");
      if (!s.expectedOutcome) missingFields.push("expectedOutcome");
      
      if (missingFields.length > 0) {
        missingMetadataStages.push(`Stage ${idx + 1} ("${s.title}") is missing: ${missingFields.join(", ")}`);
      }
    });
  }

  const isRoadmapComplete = hasStages && missingMetadataStages.length === 0;

  console.log(`Career: "${c.title}" | Slug: "${slug}"`);
  console.log(`  custom reality data? ${hasReality ? "YES" : "NO"}`);
  console.log(`  custom action plan? ${hasActionPlan ? "YES" : "NO"}`);
  console.log(`  custom compare data? ${hasCompare ? "YES" : "NO"}`);
  console.log(`  custom sources? ${hasSources ? "YES" : "NO"}`);
  console.log(`  roadmap metadata complete? ${isRoadmapComplete ? "YES" : "NO"}`);

  if (!hasReality) {
    errors.push(`[ERROR] Career "${c.title}" is missing reality data in careerReality.ts`);
    failed = true;
  }
  if (!hasActionPlan) {
    errors.push(`[ERROR] Career "${c.title}" is missing action plan data in careerActionPlans.ts`);
    failed = true;
  }
  if (!hasCompare) {
    errors.push(`[ERROR] Career "${c.title}" is missing compare data in compareInsights.ts`);
    failed = true;
  }
  if (!hasSources) {
    errors.push(`[ERROR] Career "${c.title}" has no sources in careerSources.ts and seed-careers.ts`);
    failed = true;
  }
  if (!isRoadmapComplete) {
    errors.push(`[ERROR] Career "${c.title}" has incomplete roadmap stage metadata. Details:\n    ${missingMetadataStages.join("\n    ")}`);
    failed = true;
  }
});

console.log("\n=========================================");
if (failed) {
  console.error("❌ AUDIT FAILED with the following errors:");
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log("✅ AUDIT PASSED: All 15 careers have reality, action plan, compare data, sources, and complete roadmap stage metadata.");
  process.exit(0);
}
