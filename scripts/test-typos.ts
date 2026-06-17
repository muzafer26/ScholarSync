import { searchAll } from '../src/lib/search';

const TYPO_TEST_SUITE = [
  // Python tests
  "python", "pyhton", "phyton", "pthon",
  // JavaScript tests
  "javascript", "javscript", "javascrit",
  // React tests
  "react", "recat",
  // Docker tests
  "docker", "dockr",
  // Kubernetes tests
  "kubernetes", "kubernatess", "kuberenetes",
  // Frontend tests
  "frontend", "fronted",
  // Machine Learning tests
  "machine learning", "machien learning",
  // Intent test
  "container orchestration"
];

function runTypoAudit() {
  console.log("=========================================");
  console.log("   SCHOLARSYNC SEARCH INTENT AUDIT       ");
  console.log("=========================================\n");

  let passed = 0;
  const total = TYPO_TEST_SUITE.length;

  TYPO_TEST_SUITE.forEach(query => {
    const results = searchAll(query, 5); // top 5 results
    
    if (results.length > 0) {
      console.log(`[PASS] "${query}" -> returned ${results.length} results (Top hit: ${results[0].title})`);
      passed++;
    } else {
      console.log(`[FAIL] "${query}" -> returned 0 results`);
    }
  });

  console.log("\n=========================================");
  console.log(`   FINAL SCORE: ${(passed / total) * 100}% Returns Results`);
  console.log("=========================================");
}

runTypoAudit();
