export const CAREER_TAXONOMY: Record<string, string[]> = {
  "Frontend Developer": [
    "react developer",
    "nextjs developer",
    "vue developer",
    "angular developer",
    "ui developer",
    "frontend engineer",
    "web developer",
    "javascript developer",
    "typescript developer",
    "html css developer"
  ],
  "Backend Developer": [
    "node developer",
    "nodejs developer",
    "python developer",
    "django developer",
    "api developer",
    "backend engineer",
    "server engineer",
    "java developer",
    "spring boot developer",
    "c# developer",
    ".net developer"
  ],
  "Full Stack Developer": [
    "software engineer",
    "web engineer",
    "mern stack developer",
    "mean stack developer",
    "freelancer",
    "startup founder",
    "blockchain developer",
    "web3 developer",
    "solidity developer"
  ],
  "Mobile Developer": [
    "android developer",
    "ios developer",
    "flutter developer",
    "react native developer",
    "app developer",
    "kotlin developer",
    "swift developer"
  ],
  "AI Engineer": [
    "prompt engineer",
    "llm engineer",
    "genai engineer",
    "rag engineer",
    "ai researcher",
    "machine learning engineer",
    "ml engineer",
    "deep learning engineer",
    "nlp engineer",
    "ai agent engineer",
    "ai automation engineer",
    "n8n developer",
    "ai product engineer",
    "llmops engineer"
  ],
  "Data Scientist": [
    "data engineer",
    "big data engineer",
    "machine learning scientist",
    "statistical analyst"
  ],
  "Data Analyst": [
    "business analyst",
    "bi analyst",
    "tableau developer",
    "power bi developer",
    "excel expert",
    "sql developer",
    "data reporting analyst"
  ],
  "Cloud Engineer": [
    "cloud developer",
    "cloud architect",
    "aws engineer",
    "azure engineer",
    "gcp engineer",
    "cloud consultant",
    "cloud solutions architect"
  ],
  "DevOps Engineer": [
    "sre",
    "site reliability engineer",
    "platform engineer",
    "build engineer",
    "release engineer",
    "docker specialist",
    "kubernetes administrator"
  ],
  "Cybersecurity Analyst": [
    "security engineer",
    "penetration tester",
    "ethical hacker",
    "soc analyst",
    "information security analyst",
    "infosec engineer",
    "network security engineer"
  ],
  "QA Tester": [
    "automation tester",
    "manual tester",
    "sdet",
    "quality assurance engineer",
    "software test engineer",
    "selenium tester"
  ],
  "UX Designer": [
    "ux designer",
    "ui designer",
    "product designer",
    "interaction designer",
    "web designer",
    "figma designer"
  ],
  "Game Developer": [
    "unity developer",
    "unreal developer",
    "game programmer",
    "c++ developer",
    "gameplay engineer",
    "3d developer"
  ],
  "Technical Writer": [
    "developer advocate",
    "documentation engineer",
    "tech writer",
    "developer evangelist"
  ]
};

// Compile taxonomy into a reverse lookup dictionary for O(1) alias searching
export const TAXONOMY_LOOKUP: Record<string, string> = {};
for (const [coreCareer, aliases] of Object.entries(CAREER_TAXONOMY)) {
  for (const alias of aliases) {
    TAXONOMY_LOOKUP[alias] = coreCareer;
  }
}
