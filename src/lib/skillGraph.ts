export interface SkillNode {
  name: string;
  prerequisites: string[];
  unlocks: string[];
  usedInCareers: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeEstimate: string;
  commonMistakes: string[];
  relatedTechnologies: string[];
}

export const skillGraph: Record<string, SkillNode> = {
  "HTML": {
    name: "HTML",
    prerequisites: [],
    unlocks: ["CSS", "JavaScript", "React"],
    usedInCareers: ["Frontend Developer", "Full Stack Developer", "UX Designer", "Technical Writer"],
    difficulty: "Beginner",
    timeEstimate: "1–2 Weeks",
    commonMistakes: [
      "Using non-semantic <div> tags everywhere instead of header, nav, main, footer.",
      "Neglecting alternative text (alt tags) on images, breaking accessibility."
    ],
    relatedTechnologies: ["XML", "Markdown"]
  },
  "CSS": {
    name: "CSS",
    prerequisites: ["HTML"],
    unlocks: ["Tailwind", "React", "UX Design"],
    usedInCareers: ["Frontend Developer", "Full Stack Developer", "UX Designer"],
    difficulty: "Beginner",
    timeEstimate: "2–4 Weeks",
    commonMistakes: [
      "Overusing absolute positioning instead of using modern Flexbox or CSS Grid layouts.",
      "Writing duplicate static styles instead of utilizing variables or utility tokens."
    ],
    relatedTechnologies: ["Sass", "Tailwind", "Bootstrap"]
  },
  "JavaScript": {
    name: "JavaScript",
    prerequisites: ["HTML"],
    unlocks: ["React", "Node.js", "TypeScript"],
    usedInCareers: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer"],
    difficulty: "Intermediate",
    timeEstimate: "4–8 Weeks",
    commonMistakes: [
      "Failing to understand the asynchronous event loop, promises, and async/await mechanics.",
      "Mutating state directly instead of writing pure functions."
    ],
    relatedTechnologies: ["TypeScript", "JSON"]
  },
  "React": {
    name: "React",
    prerequisites: ["HTML", "CSS", "JavaScript"],
    unlocks: ["Next.js", "React Native", "Redux"],
    usedInCareers: ["Frontend Developer", "Full Stack Developer", "Mobile Developer"],
    difficulty: "Intermediate",
    timeEstimate: "4–8 Weeks",
    commonMistakes: [
      "Learning React syntax before mastering basic vanilla JavaScript (DOM, array methods, fetch).",
      "Memorizing tutorials line-by-line without building original projects from scratch."
    ],
    relatedTechnologies: ["Vue", "Angular", "Svelte", "SolidJS"]
  },
  "TypeScript": {
    name: "TypeScript",
    prerequisites: ["JavaScript"],
    unlocks: ["Next.js", "Node.js Enterprise"],
    usedInCareers: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
    difficulty: "Intermediate",
    timeEstimate: "2–3 Weeks",
    commonMistakes: [
      "Using the 'any' type everywhere, defeating the type safety features.",
      "Over-engineering type abstractions instead of relying on simple interfaces."
    ],
    relatedTechnologies: ["Flow", "JavaScript"]
  },
  "Next.js": {
    name: "Next.js",
    prerequisites: ["React", "TypeScript"],
    unlocks: ["Enterprise Full Stack Apps"],
    usedInCareers: ["Frontend Developer", "Full Stack Developer"],
    difficulty: "Advanced",
    timeEstimate: "3–6 Weeks",
    commonMistakes: [
      "Confusing Server Components and Client Components, leading to serialization issues.",
      "Over-fetching data in Client Components rather than leveraging Server Component data boundaries."
    ],
    relatedTechnologies: ["Remix", "Nuxt.js", "Astro"]
  },
  "Python": {
    name: "Python",
    prerequisites: [],
    unlocks: ["Machine Learning", "Data Analytics", "Django"],
    usedInCareers: ["AI Engineer", "Data Scientist", "Data Analyst", "Backend Developer"],
    difficulty: "Beginner",
    timeEstimate: "2–4 Weeks",
    commonMistakes: [
      "Writing Python like C++ or Java instead of utilizing idiomatic pythonic list comprehensions.",
      "Failing to manage virtual environments, leading to library dependency conflicts."
    ],
    relatedTechnologies: ["R", "Julia", "Mojo"]
  },
  "SQL": {
    name: "SQL",
    prerequisites: [],
    unlocks: ["PostgreSQL", "Database Administration", "Data Pipelines"],
    usedInCareers: ["Backend Developer", "Data Analyst", "Data Scientist", "Full Stack Developer"],
    difficulty: "Beginner",
    timeEstimate: "2–3 Weeks",
    commonMistakes: [
      "Writing N+1 query loops in application servers instead of structured joins.",
      "Neglecting to index columns that are frequently used in WHERE filters."
    ],
    relatedTechnologies: ["PostgreSQL", "MySQL", "NoSQL", "MongoDB"]
  },
  "Docker": {
    name: "Docker",
    prerequisites: ["Linux"],
    unlocks: ["Kubernetes", "DevOps Pipelines"],
    usedInCareers: ["DevOps Engineer", "Cloud Engineer", "Backend Developer"],
    difficulty: "Intermediate",
    timeEstimate: "2–3 Weeks",
    commonMistakes: [
      "Storing persistent app data inside ephemeral container volumes that wipe on restart.",
      "Creating massive container images by including redundant developer packages."
    ],
    relatedTechnologies: ["Podman", "Containerd"]
  },
  "Kubernetes": {
    name: "Kubernetes",
    prerequisites: ["Docker", "Linux"],
    unlocks: ["Cloud Orchestration"],
    usedInCareers: ["DevOps Engineer", "Cloud Engineer"],
    difficulty: "Advanced",
    timeEstimate: "4–8 Weeks",
    commonMistakes: [
      "Hardcoding cluster secrets in static YAML configuration files.",
      "Failing to configure CPU and Memory limit queries, causing node out-of-memory crashes."
    ],
    relatedTechnologies: ["Docker Swarm", "Nomad", "OpenShift"]
  },
  "AWS": {
    name: "AWS",
    prerequisites: ["Networking"],
    unlocks: ["Cloud Architecting"],
    usedInCareers: ["Cloud Engineer", "DevOps Engineer", "Backend Developer"],
    difficulty: "Intermediate",
    timeEstimate: "4–8 Weeks",
    commonMistakes: [
      "Leaving IAM root user credentials active with no MFA verification.",
      "Failing to configure cloud budget alarms, resulting in unexpected service bills."
    ],
    relatedTechnologies: ["Google Cloud Platform", "Microsoft Azure"]
  },
  "PyTorch": {
    name: "PyTorch",
    prerequisites: ["Python", "Mathematics"],
    unlocks: ["Deep Learning Models", "LLM Tuning"],
    usedInCareers: ["AI Engineer", "Data Scientist"],
    difficulty: "Advanced",
    timeEstimate: "4–8 Weeks",
    commonMistakes: [
      "Not aligning tensor shapes correctly, causing compile dimension mismatch errors.",
      "Failing to toggle evaluation mode (.eval()) during model validation."
    ],
    relatedTechnologies: ["TensorFlow", "JAX", "Keras"]
  },
  "Git": {
    name: "Git",
    prerequisites: [],
    unlocks: ["GitHub Collaboration", "CI/CD Deployment"],
    usedInCareers: ["Frontend Developer", "Backend Developer", "DevOps Engineer", "Full Stack Developer", "AI Engineer", "Technical Writer"],
    difficulty: "Beginner",
    timeEstimate: "1 Week",
    commonMistakes: [
      "Committing sensitive database environment files (.env) directly to public repos.",
      "Writing vague commit messages like 'fixed stuff' or 'updates'."
    ],
    relatedTechnologies: ["GitHub", "GitLab", "SVN"]
  },
  "Figma": {
    name: "Figma",
    prerequisites: [],
    unlocks: ["High-Fidelity Prototyping"],
    usedInCareers: ["UX Designer", "Frontend Developer"],
    difficulty: "Beginner",
    timeEstimate: "2–3 Weeks",
    commonMistakes: [
      "Failing to use Auto-Layout, leading to fragile designs that break on resizing.",
      "Designing UI interfaces without establishing consistent type or color variables."
    ],
    relatedTechnologies: ["Adobe XD", "Sketch", "Framer"]
  },
  "Linux": {
    name: "Linux",
    prerequisites: [],
    unlocks: ["Docker", "Kubernetes"],
    usedInCareers: ["DevOps Engineer", "Cloud Engineer", "Backend Developer"],
    difficulty: "Beginner",
    timeEstimate: "2–3 Weeks",
    commonMistakes: [
      "Running commands as superuser (root) indiscriminately without security checks.",
      "Failing to set correct directory permission modes, resulting in permission leaks."
    ],
    relatedTechnologies: ["Bash", "Unix", "Shell Scripting"]
  },
  "Networking": {
    name: "Networking",
    prerequisites: [],
    unlocks: ["AWS"],
    usedInCareers: ["Cloud Engineer", "DevOps Engineer"],
    difficulty: "Beginner",
    timeEstimate: "2–3 Weeks",
    commonMistakes: [
      "Failing to allocate CIDR blocks correctly, causing IP address conflicts.",
      "Not understanding the difference between public and private subnets."
    ],
    relatedTechnologies: ["DNS", "IP Routing", "TCP/IP"]
  },
  "Mathematics": {
    name: "Mathematics",
    prerequisites: [],
    unlocks: ["PyTorch"],
    usedInCareers: ["AI Engineer", "Data Scientist"],
    difficulty: "Intermediate",
    timeEstimate: "4–8 Weeks",
    commonMistakes: [
      "Skipping linear algebra and statistics foundations to directly copy model code.",
      "Misinterpreting evaluation metrics (e.g. F1-score vs accuracy) due to statistical gaps."
    ],
    relatedTechnologies: ["Linear Algebra", "Calculus", "Statistics"]
  }
};

export function getSkillNode(skillName: string): SkillNode | undefined {
  const norm = skillName.trim().toUpperCase();
  for (const key of Object.keys(skillGraph)) {
    if (key.toUpperCase() === norm || skillGraph[key].name.toUpperCase() === norm) {
      return skillGraph[key];
    }
  }
  return undefined;
}
