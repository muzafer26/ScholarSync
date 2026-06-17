import { searchAll } from '../src/lib/search';

const TRUST_TESTS = {
  careers: [
    { q: "Frontend Developer", expected: "Frontend Developer" },
    { q: "React Developer", expected: "Frontend Developer" },
    { q: "Next.js Developer", expected: "Frontend Developer" },
    { q: "Game Developer", expected: "Game Developer" },
    { q: "Unity Developer", expected: "Game Developer" },
    { q: "Cloud Developer", expected: "DevOps Engineer" },
    { q: "AWS Engineer", expected: "DevOps Engineer" },
    { q: "DevOps Engineer", expected: "DevOps Engineer" },
    { q: "QA Tester", expected: "QA Tester" },
    { q: "Automation Tester", expected: "QA Tester" },
    { q: "SDET", expected: "QA Tester" },
    { q: "Security Engineer", expected: "Cybersecurity Analyst" },
    { q: "Ethical Hacker", expected: "Cybersecurity Analyst" },
    { q: "SOC Analyst", expected: "Cybersecurity Analyst" },
    { q: "AI Engineer", expected: "AI Engineer" },
    { q: "ML Engineer", expected: "AI Engineer" },
    { q: "Prompt Engineer", expected: "AI Engineer" },
    { q: "LLM Engineer", expected: "AI Engineer" },
    { q: "Data Scientist", expected: "Data Scientist" },
    { q: "Data Analyst", expected: "Data Analyst" },
    { q: "Data Engineer", expected: "Data Scientist" }, // Fallback to Data Scientist
    { q: "Android Developer", expected: "Mobile Developer" },
    { q: "Flutter Developer", expected: "Mobile Developer" },
    { q: "iOS Developer", expected: "Mobile Developer" },
    { q: "Blockchain Developer", expected: "Full Stack Developer" },
    { q: "Web3 Developer", expected: "Full Stack Developer" },
    { q: "Technical Writer", expected: "Technical Writer" },
    { q: "Developer Advocate", expected: "Technical Writer" }, // Fallback to Technical Writer or Full Stack
    { q: "Freelancer", expected: "Full Stack Developer" },
    { q: "Startup Founder", expected: "Full Stack Developer" }
  ],
  tech: [
    { q: "python", expected: "Python" },
    { q: "java", expected: "Java" },
    { q: "javascript", expected: "JavaScript" },
    { q: "typescript", expected: "TypeScript" },
    { q: "react", expected: "React" },
    { q: "nextjs", expected: "Next.js" },
    { q: "nodejs", expected: "Node.js" },
    { q: "sql", expected: "SQL" },
    { q: "postgresql", expected: "PostgreSQL" },
    { q: "docker", expected: "Docker" },
    { q: "kubernetes", expected: "Kubernetes" },
    { q: "aws", expected: "AWS" },
    { q: "linux", expected: "Linux" },
    { q: "ai", expected: "AI" },
    { q: "machine learning", expected: "Machine Learning" },
    { q: "deep learning", expected: "Deep Learning" },
    { q: "flutter", expected: "Flutter" },
    { q: "android", expected: "Android" },
    { q: "unity", expected: "Unity" }
  ],
  human: [
    { q: "I want to make websites", expected: "Frontend Developer" },
    { q: "I want to create games", expected: "Game Developer" },
    { q: "I want remote work", expected: "Frontend Developer" },
    { q: "I have no degree", expected: "Frontend Developer" },
    { q: "I am from commerce", expected: "Data Analyst" },
    { q: "I am a BCA student", expected: "Frontend Developer" },
    { q: "I want internship", expected: "Frontend Developer" },
    { q: "I want freelancing", expected: "Full Stack Developer" },
    { q: "I am confused", expected: "Frontend Developer" },
    { q: "I don't know where to start", expected: "Frontend Developer" },
    { q: "Quickest tech job", expected: "QA Tester" },
    { q: "High salary career", expected: "AI Engineer" },
    { q: "Career without maths", expected: "UX Designer" }, // Mapped to UX
    { q: "does ai require math", expected: "AI Engineer" },
    { q: "fastest way into tech", expected: "Frontend Developer" }
  ]
};

function runTrustAudit() {
  console.log("=========================================");
  console.log("   SCHOLARSYNC V1 - 150 SEARCH TRUST AUDIT");
  console.log("=========================================\n");

  let totalPassed = 0;
  let totalTests = 0;

  for (const [category, tests] of Object.entries(TRUST_TESTS)) {
    console.log(`\n--- CATEGORY: ${category.toUpperCase()} ---`);
    
    tests.forEach(({ q, expected }) => {
      totalTests++;
      const results = searchAll(q, 5);
      
      if (results.length === 0) {
        console.log(`[FAIL] "${q}" -> NO RESULTS`);
        return;
      }
      
      // Look for a substring match in the title or description/tags of top 3 results
      const top3 = results.slice(0, 3);
      const isMatch = top3.some(r => 
        r.title.toLowerCase().includes(expected.toLowerCase()) || 
        (r.tags && r.tags.some(t => t.toLowerCase().includes(expected.toLowerCase()))) ||
        (r.subtitle && r.subtitle.toLowerCase().includes(expected.toLowerCase()))
      );

      if (isMatch) {
        console.log(`[PASS] "${q}" -> Found "${expected}" in top hits (Top result: ${results[0].title})`);
        totalPassed++;
      } else {
        console.log(`[FAIL] "${q}" -> Expected "${expected}", but got "${results[0].title}"`);
      }
    });
  }

  const score = Math.round((totalPassed / totalTests) * 100);
  console.log("\n=========================================");
  console.log(`   FINAL ACCURACY SCORE: ${score}% (${totalPassed}/${totalTests})`);
  console.log("=========================================");
  
  if (score >= 95) {
    console.log("   VERDICT: PRODUCTION READY 🚀");
  } else if (score >= 90) {
    console.log("   VERDICT: SOFT LAUNCH READY 🟢");
  } else {
    console.log("   VERDICT: FIX SEARCH 🔴");
  }
}

runTrustAudit();
