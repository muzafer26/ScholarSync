import { searchAll } from "../src/lib/search";
import { resources } from "../src/lib/seed-resources";

const TOP_20_SEARCHES = [
  "python", "java", "javascript", "react", "frontend", "backend", "sql", "git", "github", 
  "linux", "docker", "kubernetes", "aws", "cloud", "ai", "machine learning", 
  "data analyst", "data science", "flutter", "android"
];

function runCoverageAudit() {
  console.log("=========================================");
  console.log("   SCHOLARSYNC SEARCH COVERAGE AUDIT     ");
  console.log("=========================================\n");

  let totalQueries = 0;
  let perfectQueries = 0;

  for (const query of TOP_20_SEARCHES) {
    const results = searchAll(query);
    
    // Map unified results back to raw resources to check format
    const returnedResources = results
      .filter(r => r.kind === "resource")
      .map(r => resources.find(raw => raw.id === r.id))
      .filter(Boolean) as typeof resources;

    // Check coverage
    const hasCourse = returnedResources.some(r => r.format === "course" || r.format === "video");
    const hasDocs = returnedResources.some(r => r.format === "text" && (r.source === "Official Docs" || r.title.toLowerCase().includes("doc")));
    const hasPractice = returnedResources.some(r => r.format === "interactive" || (r.topics && r.topics.includes("Projects")));
    const hasCareer = results.some(r => r.kind === "career");
    
    const isPerfect = hasCourse && hasPractice; // at minimum course + practice

    totalQueries++;
    if (isPerfect) perfectQueries++;

    console.log(`Search: "${query}" -> ${results.length} results`);
    console.log(`  [${hasCareer ? "✓" : " "}] Career Path`);
    console.log(`  [${hasCourse ? "✓" : " "}] Course/Video`);
    console.log(`  [${hasDocs ? "✓" : " "}] Documentation`);
    console.log(`  [${hasPractice ? "✓" : " "}] Interactive Practice`);
    console.log(`  Status: ${isPerfect ? "✅ PASS" : "❌ NEEDS RESOURCES"}\n`);
  }

  console.log("=========================================");
  console.log(`FINAL SCORE: ${perfectQueries}/${totalQueries} (${Math.round((perfectQueries/totalQueries)*100)}%) Queries have full Learn -> Practice coverage.`);
  console.log("=========================================");
}

runCoverageAudit();
