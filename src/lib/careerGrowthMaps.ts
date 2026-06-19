export interface CareerTransitionGroup {
  typical: string[];
  common: string[];
  advanced: string[];
}

export interface CareerGrowthNode {
  slug: string;
  careerTitle: string;
  nextSteps: string[];
  transitions: CareerTransitionGroup;
  timeframe: string;
  upskillNeeded: string[];
}

export const careerGrowthMaps: Record<string, CareerGrowthNode> = {
  "frontend-developer": {
    slug: "frontend-developer",
    careerTitle: "Frontend Developer",
    nextSteps: ["Senior Frontend Engineer", "Full Stack Developer", "UX Engineer", "Mobile Developer", "Product Engineer", "Technical Lead"],
    transitions: {
      typical: ["Senior Frontend Engineer", "Full Stack Developer"],
      common: ["UX Engineer", "Mobile Developer"],
      advanced: ["Product Engineer", "Technical Lead"]
    },
    timeframe: "2–5 Years",
    upskillNeeded: ["Server-side databases (SQL/PostgreSQL)", "Advanced API routing & design systems", "System design & team mentorship"]
  },
  "backend-developer": {
    slug: "backend-developer",
    careerTitle: "Backend Developer",
    nextSteps: ["Senior Backend Engineer", "Full Stack Developer", "DevOps Engineer", "Database Architect", "System Architect", "Technical Lead"],
    transitions: {
      typical: ["Senior Backend Engineer", "Full Stack Developer"],
      common: ["DevOps Engineer", "Database Architect"],
      advanced: ["System Architect", "Technical Lead"]
    },
    timeframe: "2–5 Years",
    upskillNeeded: ["Cloud infrastructure (AWS/Azure)", "Docker containerization & orchestration", "Message queues & caching systems"]
  },
  "full-stack-developer": {
    slug: "full-stack-developer",
    careerTitle: "Full Stack Developer",
    nextSteps: ["Senior Full Stack Engineer", "Solutions Architect", "Technical Lead", "Product Manager", "CTO / Founder"],
    transitions: {
      typical: ["Senior Full Stack Engineer", "Solutions Architect"],
      common: ["Technical Lead", "Product Manager"],
      advanced: ["CTO / Founder"]
    },
    timeframe: "3–7 Years",
    upskillNeeded: ["Enterprise system scaling", "Product design & user analytics", "Engineering team management & budget mapping"]
  },
  "java-developer": {
    slug: "java-developer",
    careerTitle: "Java Developer",
    nextSteps: ["Senior Java Engineer", "Enterprise Architect", "Backend Developer", "Big Data Engineer", "Technical Lead"],
    transitions: {
      typical: ["Senior Java Engineer", "Backend Developer"],
      common: ["Enterprise Architect", "Big Data Engineer"],
      advanced: ["Technical Lead"]
    },
    timeframe: "3–6 Years",
    upskillNeeded: ["Microservices architecture & cloud migration", "JVM tuning & performance scaling", "Big data technologies (Hadoop/Spark)"]
  },
  "data-scientist": {
    slug: "data-scientist",
    careerTitle: "Data Scientist",
    nextSteps: ["Senior Data Scientist", "Machine Learning Engineer", "AI Researcher", "Data Architect", "Director of Analytics"],
    transitions: {
      typical: ["Senior Data Scientist", "Machine Learning Engineer"],
      common: ["AI Researcher", "Data Architect"],
      advanced: ["Director of Analytics"]
    },
    timeframe: "3–6 Years",
    upskillNeeded: ["Deep learning frameworks (PyTorch/TensorFlow)", "High-performance vector databases", "Distributed computing (Spark/Flink)"]
  },
  "ai-engineer": {
    slug: "ai-engineer",
    careerTitle: "AI Engineer",
    nextSteps: ["Senior AI Engineer", "AI Research Scientist", "MLOps Engineer", "Principal AI Architect", "Chief AI Officer"],
    transitions: {
      typical: ["Senior AI Engineer", "MLOps Engineer"],
      common: ["AI Research Scientist", "Principal AI Architect"],
      advanced: ["Chief AI Officer"]
    },
    timeframe: "3–7 Years",
    upskillNeeded: ["Large Language Model (LLM) fine-tuning", "Neural network architecture design", "ML model deployment & quantization"]
  },
  "devops-engineer": {
    slug: "devops-engineer",
    careerTitle: "DevOps Engineer",
    nextSteps: ["Senior DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer", "Cloud Architect", "Head of Infrastructure"],
    transitions: {
      typical: ["Senior DevOps Engineer", "Site Reliability Engineer (SRE)"],
      common: ["Platform Engineer", "Cloud Architect"],
      advanced: ["Head of Infrastructure"]
    },
    timeframe: "2–5 Years",
    upskillNeeded: ["Advanced Kubernetes orchestration", "Infrastructure as Code (Terraform/Ansible)", "Automated system monitoring & telemetry"]
  },
  "mobile-developer": {
    slug: "mobile-developer",
    careerTitle: "Mobile Developer",
    nextSteps: ["Senior Mobile Engineer", "Full Stack Developer", "Mobile Architect", "UX Engineer", "Engineering Manager"],
    transitions: {
      typical: ["Senior Mobile Engineer", "Mobile Architect"],
      common: ["Full Stack Developer", "UX Engineer"],
      advanced: ["Engineering Manager"]
    },
    timeframe: "2–5 Years",
    upskillNeeded: ["Native platform APIs (Swift/Kotlin)", "Mobile app security & encryption", "Offline sync & local database scaling"]
  },
  "ux-designer": {
    slug: "ux-designer",
    careerTitle: "UX Designer",
    nextSteps: ["Senior Product Designer", "UX Engineer", "UX Researcher", "Design System Architect", "Design Director"],
    transitions: {
      typical: ["Senior Product Designer", "UX Researcher"],
      common: ["UX Engineer", "Design System Architect"],
      advanced: ["Design Director"]
    },
    timeframe: "3–6 Years",
    upskillNeeded: ["Front-end coding (HTML/CSS/JS)", "A/B testing & data telemetry tools", "Design system management in Figma"]
  },
  "cybersecurity-analyst": {
    slug: "cybersecurity-analyst",
    careerTitle: "Cybersecurity Analyst",
    nextSteps: ["Senior Security Analyst", "Penetration Tester", "Security Architect", "Security Engineer", "Chief Information Security Officer (CISO)"],
    transitions: {
      typical: ["Senior Security Analyst", "Security Engineer"],
      common: ["Penetration Tester", "Security Architect"],
      advanced: ["Chief Information Security Officer (CISO)"]
    },
    timeframe: "3–7 Years",
    upskillNeeded: ["Vulnerability auditing & reverse engineering", "Network threat hunting & incident response", "Security compliance standards (ISO 27001/SOC2)"]
  },
  "qa-tester": {
    slug: "qa-tester",
    careerTitle: "QA Tester",
    nextSteps: ["QA Automation Engineer", "Performance Engineer", "SDET (Software Development Engineer in Test)", "QA Lead", "Release Manager"],
    transitions: {
      typical: ["QA Automation Engineer", "QA Lead"],
      common: ["SDET (Software Development Engineer in Test)", "Performance Engineer"],
      advanced: ["Release Manager"]
    },
    timeframe: "2–5 Years",
    upskillNeeded: ["Test automation frameworks (Playwright/Selenium)", "API & load testing protocols", "CI/CD integration & scripting"]
  },
  "data-analyst": {
    slug: "data-analyst",
    careerTitle: "Data Analyst",
    nextSteps: ["Data Scientist", "Analytics Engineer", "BI Developer", "Product Analyst", "Data Manager"],
    transitions: {
      typical: ["Analytics Engineer", "BI Developer"],
      common: ["Data Scientist", "Product Analyst"],
      advanced: ["Data Manager"]
    },
    timeframe: "2–5 Years",
    upskillNeeded: ["Advanced SQL queries & analytics tools", "Python/R statistical computing", "Business case study synthesis"]
  },
  "game-developer": {
    slug: "game-developer",
    careerTitle: "Game Developer",
    nextSteps: ["Senior Game Engineer", "Gameplay Architect", "Graphics Engineer", "Technical Director", "Studio Founder"],
    transitions: {
      typical: ["Senior Game Engineer", "Gameplay Architect"],
      common: ["Graphics Engineer", "Technical Director"],
      advanced: ["Studio Founder"]
    },
    timeframe: "3–7 Years",
    upskillNeeded: ["C++ programming & shader development", "Graphics pipeline optimization", "Game network architectures & scaling"]
  },
  "technical-writer": {
    slug: "technical-writer",
    careerTitle: "Technical Writer",
    nextSteps: ["Senior Technical Writer", "Documentation Manager", "Developer Advocate", "Product Manager", "Information Architect"],
    transitions: {
      typical: ["Senior Technical Writer", "Documentation Manager"],
      common: ["Developer Advocate", "Information Architect"],
      advanced: ["Product Manager"]
    },
    timeframe: "3–6 Years",
    upskillNeeded: ["Static site generator stacks (Docusaurus)", "API specifications & OpenAPI design", "Developer experience & community advocacy"]
  },
  "cloud-engineer": {
    slug: "cloud-engineer",
    careerTitle: "Cloud Engineer",
    nextSteps: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer", "Cloud Architect", "Cloud Security Specialist"],
    transitions: {
      typical: ["DevOps Engineer", "Site Reliability Engineer (SRE)"],
      common: ["Platform Engineer", "Cloud Architect"],
      advanced: ["Cloud Security Specialist"]
    },
    timeframe: "3–6 Years",
    upskillNeeded: ["Multi-cloud configurations (AWS/Azure/GCP)", "Infrastructure as Code automation", "Cloud network design & budget optimization"]
  }
};

export function getCareerGrowthMap(slug: string): CareerGrowthNode | undefined {
  return careerGrowthMaps[slug];
}
