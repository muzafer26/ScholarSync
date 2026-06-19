import { searchAccuracyEngine, searchCareers, searchResources } from "../src/lib/search";

const queries = [
  "React",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "TensorFlow",
  "PyTorch",
  "Figma",
  "Solidity",
  "Flutter",
  "Kotlin",
  "TypeScript",
  "Frontend Developer",
  "Backend Developer",
  "AI Engineer",
  "Data Analyst",
  "DevOps Engineer",
  "I hate maths",
  "I am confused",
  "I don't know where to start",
  "Highest salary",
  "Remote jobs",
  "Commerce student",
  "Introvert",
  "Creative person",
  ".",
  "...",
  "😀",
  "",
  "asdfqwerzxcv",
  "' OR 1=1 --",
];

for (const q of queries) {
  try {
    const engine = searchAccuracyEngine(q);
    const rec = engine.recommended.slice(0, 4).map((r) => `${r.kind}:${r.title}`);
    const careers = searchCareers(q).slice(0, 3).map((c) => c.title);
    const resources = searchResources(q).slice(0, 3).map((r) => r.title);
    console.log(JSON.stringify({ q, intent: engine.intent, rec, careers, resources }));
  } catch (error: any) {
    console.log(JSON.stringify({ q, error: error?.message || String(error) }));
  }
}
