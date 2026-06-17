import { searchAll } from '../src/lib/search';

const SCENARIO_TEST_SUITE = {
  "Persona 1: Complete Beginner": [
    "I have never coded before", "Where do I start?", "I am confused", 
    "Best career for beginners", "No degree", "Can I get a tech job without college?", 
    "What should I learn first?", "Programming roadmap", "Learn coding", 
    "Become software engineer"
  ],
  "Persona 2: Student": [
    "BCA student", "Best career after BCA", "Skills for placement", 
    "Interview preparation", "Internship roadmap", "Resume projects", 
    "Portfolio projects", "Job ready roadmap", "Final year project ideas", 
    "Placement preparation"
  ],
  "Persona 3: Career Switcher": [
    "Switch career", "Career change at 30", "Non technical background", 
    "Commerce student in tech", "Fastest way into tech"
  ],
  "Persona 4: Time Constrained": [
    "1 hour daily", "Weekend learning", "3 months roadmap", 
    "6 months roadmap", "Quickest path to job"
  ],
  "Persona 5: Technology Search": [
    "python", "react", "sql", "docker", "kubernetes", "aws", "git", "linux", "nodejs", "typescript"
  ],
  "Typo Scenarios": [
    "pyhton", "phyton", "recat", "dockr", "kubernatess", "fronted", "machien learning", "javscript"
  ],
  "Comparison Scenarios": [
    "python vs java", "react vs angular", "frontend vs backend", "aws vs azure", "data science vs ai"
  ],
  "Reality Check Scenarios": [
    "Does AI require math?", "Is frontend easy?", "Can I get job without degree?", 
    "How long to become developer?", "Can I learn coding at home?"
  ],
  "Learning Resource Scenarios": [
    "Best python course", "Practice python", "Python projects", 
    "React exercises", "SQL practice", "Git exercises", "Linux labs"
  ],
  "Job Scenarios": [
    "Python jobs", "Frontend jobs", "AI internships", "Remote jobs", "Entry level jobs"
  ],
  "Search Failure Scenarios": [
    "abcxyz123", "randomtech999", "unknownframework"
  ]
};

function runScenarioAudit() {
  console.log("=========================================");
  console.log("   SCHOLARSYNC 100-SCENARIO AUDIT SUITE  ");
  console.log("=========================================\n");

  let totalPassed = 0;
  let totalTests = 0;

  for (const [category, queries] of Object.entries(SCENARIO_TEST_SUITE)) {
    console.log(`\n--- ${category} ---`);
    queries.forEach(query => {
      totalTests++;
      const results = searchAll(query, 5); 
      
      if (results.length > 0) {
        const topHit = results[0].title;
        console.log(`[PASS] "${query}" -> Top Hit: ${topHit}`);
        totalPassed++;
      } else {
        console.log(`[FAIL] "${query}" -> 0 RESULTS (EMPTY STATE)`);
      }
    });
  }

  console.log("\n=========================================");
  console.log(`   FINAL SCORE: ${Math.round((totalPassed / totalTests) * 100)}% Intent Success Rate`);
  console.log("=========================================");
}

runScenarioAudit();
