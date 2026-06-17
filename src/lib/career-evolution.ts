export interface EvolutionRegistry {
  [coreCareer: string]: {
    aliases: string[];
    explanation: string;
  };
}

export const CAREER_EVOLUTION_REGISTRY: EvolutionRegistry = {
  "Frontend Developer": {
    aliases: ["React Developer", "Nextjs Developer", "Web Developer", "UI Developer", "Shopify Developer", "Wordpress Developer"],
    explanation: "Frontend developers build client-side web applications using modern visual frameworks like React and Next.js."
  },
  "Backend Developer": {
    aliases: ["Node Developer", "Python Developer", "Django Developer", "API Developer", "Server Engineer", "Golang Developer", "Java Developer"],
    explanation: "Backend developers construct server-side architectures, RESTful APIs, databases, and microservices."
  },
  "DevOps Engineer": {
    aliases: ["SRE", "Site Reliability Engineer", "Platform Engineer", "Systems Administrator", "Cloud Infrastructure Engineer"],
    explanation: "DevOps and Site Reliability Engineers automate container orchestration, system scaling, and continuous deployment pipelines."
  },
  "AI Engineer": {
    aliases: ["Prompt Engineer", "LLM Engineer", "Agent Engineer", "AI Agent Engineer", "MCP Developer", "Machine Learning Engineer", "RAG Engineer", "Generative AI Specialist"],
    explanation: "AI Engineers specialize in LLM application architecture, model fine-tuning, embeddings, and agentic workflows."
  },
  "Data Analyst": {
    aliases: ["Power BI Developer", "Tableau Analyst", "Excel Specialist", "Business Intelligence Analyst", "Operations Analyst"],
    explanation: "Data Analysts translate transactional database records into visual charts, dashboard insights, and operational metrics."
  },
  "Cybersecurity Analyst": {
    aliases: ["Ethical Hacker", "SOC Analyst", "Information Security Specialist", "Penetration Tester", "Security Audit Engineer"],
    explanation: "Cybersecurity Analysts protect corporate networks and applications from vulnerabilities by performing security audits and penetration tests."
  },
  "QA Tester": {
    aliases: ["SDET", "Manual Tester", "Automation Tester", "Cypress Engineer", "Selenium Tester"],
    explanation: "QA Testers write automated end-to-end regression tests to maintain build quality and user interface reliability."
  },
  "Mobile Developer": {
    aliases: ["Android Developer", "Flutter Developer", "Dart Programmer", "iOS Developer", "React Native Developer"],
    explanation: "Mobile Developers build native and cross-platform smartphone applications using Flutter, Swift, or Kotlin."
  },
  "UI/UX Designer": {
    aliases: ["Figma Designer", "UX Researcher", "Product Designer", "Interaction Designer", "Information Architect"],
    explanation: "UX Designers draft interface wireframes, perform user research, and structure accessible design systems."
  },
  "Game Developer": {
    aliases: ["Unity Developer", "Unreal Developer", "Game Programmer", "Game Engine Architect", "C++ Game Developer"],
    explanation: "Game Developers script interactive physics, gameplay engines, and visual environments in C# or C++."
  },
  "Cloud Engineer": {
    aliases: ["AWS Solutions Architect", "Azure Administrator", "GCP Engineer", "Cloud Systems Architect"],
    explanation: "Cloud Engineers provision compute, serverless components, and virtual networks on AWS, GCP, or Azure."
  }
};
