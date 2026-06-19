export interface CareerCompareInfo {
  firstJobDifficulty: string;
  learningCurve: string;
  freelancePotential: string;
  remoteOpportunities: string;
  aiImpact: string;
  bestFor: string;
  whoThrives: string;
  whoStruggles: string;
  portfolioImportance: "Critical" | "High" | "Moderate";
}

export const careerCompareData: Record<string, CareerCompareInfo> = {
  "frontend-developer": {
    firstJobDifficulty: "Medium",
    learningCurve: "Moderate",
    freelancePotential: "High",
    remoteOpportunities: "Very High",
    aiImpact: "Moderate",
    bestFor: "Visual builders and creative problem solvers",
    whoThrives: "Visual builders who care about design details, user accessibility, and rapid feature deployments.",
    whoStruggles: "Developers who want pure back-end algorithmic code and get easily frustrated by browser quirks.",
    portfolioImportance: "Critical"
  },
  "backend-developer": {
    firstJobDifficulty: "Medium-High",
    learningCurve: "Steeper",
    freelancePotential: "Medium",
    remoteOpportunities: "High",
    aiImpact: "Low",
    bestFor: "Logical problem solvers",
    whoThrives: "Logic thinkers who enjoy data flow routing, database design, and optimization.",
    whoStruggles: "Builders who want instant visual feedback and dislike dealing with abstract APIs.",
    portfolioImportance: "High"
  },
  "devops-engineer": {
    firstJobDifficulty: "High",
    learningCurve: "Steep",
    freelancePotential: "Low",
    remoteOpportunities: "High",
    aiImpact: "Low",
    bestFor: "Automation builders and platform specialists",
    whoThrives: "Engineers who love scripting, configuring infrastructure pipelines, and resolving server alerts.",
    whoStruggles: "People who dislike terminal commands, network debugging, or on-call duties.",
    portfolioImportance: "Moderate"
  },
  "cloud-engineer": {
    firstJobDifficulty: "Medium-High",
    learningCurve: "Steep",
    freelancePotential: "Medium",
    remoteOpportunities: "Very High",
    aiImpact: "Moderate",
    bestFor: "Infrastructure scalers and network architects",
    whoThrives: "Detail-oriented engineers who enjoy virtual resource configuration and cost management.",
    whoStruggles: "Developers looking to write pure application features who dislike cloud provider consoles.",
    portfolioImportance: "High"
  },
  "ai-engineer": {
    firstJobDifficulty: "Very High",
    learningCurve: "Extreme",
    freelancePotential: "High",
    remoteOpportunities: "High",
    aiImpact: "Low",
    bestFor: "Math lovers and data-driven model developers",
    whoThrives: "People who enjoy tuning hyper-parameters, statistical validation, and working with complex datasets.",
    whoStruggles: "People seeking a quick, zero-math development route.",
    portfolioImportance: "Critical"
  },
  "cybersecurity-analyst": {
    firstJobDifficulty: "High",
    learningCurve: "Steep",
    freelancePotential: "Medium",
    remoteOpportunities: "Moderate",
    aiImpact: "Moderate",
    bestFor: "Network checkers and security specialists",
    whoThrives: "Analytical minds who enjoy tracking logs, auditing threat vectors, and policy checking.",
    whoStruggles: "Developers expecting Hollywood hacking scenes who dislike writing reports and audits.",
    portfolioImportance: "High"
  },
  "java-developer": {
    firstJobDifficulty: "Medium-High",
    learningCurve: "Moderate",
    freelancePotential: "Low",
    remoteOpportunities: "High",
    aiImpact: "Low",
    bestFor: "Enterprise builders and system optimizers",
    whoThrives: "Developers who enjoy object-oriented architecture, massive scaling systems, and clean back-end compilation.",
    whoStruggles: "Creative visual frontend builders or script programmers seeking fast, minimal-code projects.",
    portfolioImportance: "High"
  },
  "full-stack-developer": {
    firstJobDifficulty: "High",
    learningCurve: "Steep",
    freelancePotential: "Very High",
    remoteOpportunities: "Very High",
    aiImpact: "Moderate",
    bestFor: "Product creators and startup builders",
    whoThrives: "Generalists who love connecting multiple technologies, designing interfaces, and configuring server APIs.",
    whoStruggles: "Specialists who prefer sticking to a single environment (CSS design only, or database scaling only) without context switching.",
    portfolioImportance: "Critical"
  },
  "data-scientist": {
    firstJobDifficulty: "Very High",
    learningCurve: "Steep",
    freelancePotential: "Medium",
    remoteOpportunities: "High",
    aiImpact: "Low",
    bestFor: "Analytical thinkers and statistical modelers",
    whoThrives: "Data researchers who enjoy hypothesis testing, finding patterns in large datasets, and writing analytical models.",
    whoStruggles: "Developers who want immediate UI visual feedback or who dislike statistics, math, and linear algebra.",
    portfolioImportance: "High"
  },
  "mobile-developer": {
    firstJobDifficulty: "Medium",
    learningCurve: "Moderate",
    freelancePotential: "High",
    remoteOpportunities: "High",
    aiImpact: "Moderate",
    bestFor: "App creators and native gesture builders",
    whoThrives: "Developers interested in on-device performance, smooth gesture animations, and compiling client application builds.",
    whoStruggles: "Engineers who prefer server API routing or database queries, or who dislike app store review guidelines.",
    portfolioImportance: "Critical"
  },
  "ux-designer": {
    firstJobDifficulty: "Medium",
    learningCurve: "Moderate",
    freelancePotential: "High",
    remoteOpportunities: "High",
    aiImpact: "Moderate",
    bestFor: "Visual design researchers and prototype builders",
    whoThrives: "Visual communicators who enjoy user research, creating design systems, and mapping intuitive user journeys.",
    whoStruggles: "People wanting to write production code or who dislike constant meetings, design feedback, and visual iterations.",
    portfolioImportance: "Critical"
  },
  "qa-tester": {
    firstJobDifficulty: "Medium",
    learningCurve: "Moderate",
    freelancePotential: "Medium",
    remoteOpportunities: "High",
    aiImpact: "Moderate",
    bestFor: "Detail-oriented checklists and bug finders",
    whoThrives: "Problem finders who enjoy scripting automated test suites, discovering edge cases, and verifying build quality.",
    whoStruggles: "Builders who only want to create new features and lack patience for repetitive quality verification.",
    portfolioImportance: "Moderate"
  },
  "data-analyst": {
    firstJobDifficulty: "Medium",
    learningCurve: "Moderate",
    freelancePotential: "Medium",
    remoteOpportunities: "High",
    aiImpact: "Moderate",
    bestFor: "Business insight presenters and query writers",
    whoThrives: "Analysts who enjoy writing SQL queries, building dashboard charts, and presenting insights to team leads.",
    whoStruggles: "Developers looking to build software systems or who dislike writing reports and executive slide decks.",
    portfolioImportance: "High"
  },
  "game-developer": {
    firstJobDifficulty: "High",
    learningCurve: "Steep",
    freelancePotential: "Medium",
    remoteOpportunities: "Moderate",
    aiImpact: "Low",
    bestFor: "Gameplay scripters and physics animators",
    whoThrives: "Creatives who love interactive physics, system performance, and game engine mechanics like Unity/Unreal.",
    whoStruggles: "Developers looking for high-paying starting salaries, low stress, and basic web coding workloads.",
    portfolioImportance: "Critical"
  },
  "technical-writer": {
    firstJobDifficulty: "Medium",
    learningCurve: "Moderate",
    freelancePotential: "High",
    remoteOpportunities: "Very High",
    aiImpact: "High",
    bestFor: "Developer documenters and tutorial creators",
    whoThrives: "Communicators who enjoy reading source code, testing API endpoints, and translating technical systems into clear guides.",
    whoStruggles: "Developers who want to write production code all day or who dislike explaining how systems work in writing.",
    portfolioImportance: "High"
  }
};

export const getCareerCompareInfo = (slug: string): CareerCompareInfo | null => {
  return careerCompareData[slug] || null;
};
