export const VOCABULARY = [
  "frontend", "backend", "devops", "cloud", "ai", "machine learning", "cybersecurity", "design", "writer", "testing", "qa", "data science",
  "react", "angular", "vue", "javascript", "typescript", "python", "html", "css", "docker", "kubernetes", "git", "github", "java", "spring", "node", "express",
  "postgresql", "mongodb", "aws", "gcp", "azure", "linux", "django", "flask", "rust", "go", "c++", "qa tester", "full stack", "ux design",
  "frontend developer", "frontend engineer", "ui developer", "web developer"
];

export const SEARCH_SUGGESTIONS_MAP: Record<string, string> = {
  "react": "Frontend Developer",
  "docker": "DevOps Engineer",
  "aws": "Cloud Engineer",
  "tensorflow": "AI Engineer",
  "figma": "UX Designer",
  "python": "Backend Developer, Data Analyst, AI Engineer"
};

export const DID_YOU_MEAN_MAPPINGS: Record<string, string[]> = {
  "frontend": ["Frontend Developer", "Frontend Engineer", "UI Developer", "Web Developer"],
  "backend": ["Backend Developer", "Backend Engineer", "API Developer", "Server Developer"],
  "devops": ["DevOps Engineer", "Site Reliability Engineer", "Platform Engineer"],
  "cloud": ["Cloud Engineer", "Solutions Architect", "AWS Engineer"],
  "ai": ["AI Engineer", "Machine Learning Engineer", "Data Scientist"],
  "cybersecurity": ["Cybersecurity Analyst", "Security Engineer", "Ethical Hacker"]
};

export function getRelatedSearchSuggestions(query: string): string[] {
  const target = query.toLowerCase();
  
  // Explicit exact maps
  if (target === "react") return ["Frontend Developer", "JavaScript", "UI/UX Design"];
  if (target === "docker") return ["DevOps Engineer", "CI/CD Pipelines", "Linux Administration"];
  if (target === "aws") return ["Cloud Engineer", "Infrastructure as Code", "VPC Networking"];
  if (target === "tensorflow") return ["AI Engineer", "Deep Learning", "Python Programming"];
  if (target === "figma") return ["UX Designer", "Figma Design", "UI/UX Design"];
  if (target === "python") return ["Backend Developer", "Data Analyst", "AI Engineer"];

  if (target.includes("front") || target.includes("react") || target.includes("css") || target.includes("html")) {
    return ["UI/UX Design", "JavaScript", "React Developer", "Tailwind CSS"];
  }
  if (target.includes("back") || target.includes("node") || target.includes("api") || target.includes("sql")) {
    return ["Databases", "System Design", "Node.js", "PostgreSQL"];
  }
  if (target.includes("devops") || target.includes("docker") || target.includes("kubernetes") || target.includes("cloud")) {
    return ["CI/CD Pipelines", "AWS Cloud", "Linux Administration", "Infrastructure as Code"];
  }
  if (target.includes("ai") || target.includes("machine") || target.includes("data") || target.includes("python")) {
    return ["Python Programming", "Deep Learning", "Data Analysis", "Hugging Face"];
  }
  return ["Git & GitHub", "Technical Writing", "QA Testing", "Career Compare"];
}
