import { searchAll } from '../src/lib/search';

const GOLDEN_TEST_SET = [
  { query: "start coding", expectedHit: "Frontend Developer" },
  { query: "become ai engineer", expectedHit: "AI Engineer" },
  { query: "practice sql", expectedHit: "SQLBolt" },
  { query: "learn git", expectedHit: "Learn Git Branching" },
  { query: "python projects", expectedHit: "Build a Discord Bot in Python" },
  { query: "pyhton", expectedHit: "Python for Everybody" },
  { query: "dockr", expectedHit: "Docker" }, // Could hit Docker Tutorial or DevOps Career
  { query: "kubernatess", expectedHit: "Docker Tutorial for Beginners" }, // Has kubernetes tags
  { query: "no degree", expectedHit: "Frontend Developer" },
  { query: "high salary", expectedHit: "AI Engineer" }
];

function runGoldenAudit() {
  console.log("=========================================");
  console.log("   SCHOLARSYNC GOLDEN TEST SUITE         ");
  console.log("=========================================\n");

  let passed = 0;

  GOLDEN_TEST_SET.forEach(({ query, expectedHit }) => {
    const results = searchAll(query, 5);
    if (results.length === 0) {
      console.log(`[FAIL] "${query}" -> 0 RESULTS`);
      return;
    }
    
    // Check if the expected hit is anywhere in the top 5 results
    const found = results.some(r => r.title.toLowerCase().includes(expectedHit.toLowerCase()));
    
    if (found) {
      console.log(`[PASS] "${query}" -> Found "${expectedHit}" in Top 5 (Top Hit: ${results[0].title})`);
      passed++;
    } else {
      console.log(`[FAIL] "${query}" -> Expected "${expectedHit}", but got "${results[0].title}"`);
    }
  });

  console.log("\n=========================================");
  console.log(`   GOLDEN SCORE: ${Math.round((passed / GOLDEN_TEST_SET.length) * 100)}% Accuracy`);
  console.log("=========================================");
}

runGoldenAudit();
