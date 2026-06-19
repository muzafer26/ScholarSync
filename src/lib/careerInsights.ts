export interface CareerInsightInfo {
  demand: string;
  competition: string;
  degreeAdvantage: string;
  remotePotential: string;
  portfolioImportance: string;
}

export const careerInsights: Record<string, CareerInsightInfo> = {
  "frontend-developer": {
    demand: "Strong demand in startups, agencies, and product companies updating client interfaces.",
    competition: "Very competitive at entry level; significantly less competitive for developers with strong JS and layout skills.",
    degreeAdvantage: "Portfolio and projects matter much more than a degree.",
    remotePotential: "Remote opportunities are very common.",
    portfolioImportance: "Critical - visual proof of layouts and interactive features is required."
  },
  "backend-developer": {
    demand: "High demand in cloud services, enterprise platforms, and APIs.",
    competition: "Moderate; requires strong logic, systems design, and database schema knowledge.",
    degreeAdvantage: "Degree is helpful but solid APIs and public code repositories are highly valued.",
    remotePotential: "Remote opportunities common.",
    portfolioImportance: "High - code design, DB optimization, and clean architectural patterns must be shown."
  },
  "devops-engineer": {
    demand: "Extremely high demand due to cloud adoption and microservice complexities.",
    competition: "Low at entry level due to high barrier to entry; highly competitive for senior roles.",
    degreeAdvantage: "Certifications and cloud experience outrank degree status.",
    remotePotential: "Remote opportunities common.",
    portfolioImportance: "High - live deployment infrastructure, Terraform configurations, and CI/CD pipelines needed."
  },
  "cloud-engineer": {
    demand: "Growing demand as enterprise firms shift legacy VM workloads to multi-cloud.",
    competition: "Moderate; vendors (AWS/Azure/GCP) make entry-level competitive, specialized cloud architects remain rare.",
    degreeAdvantage: "Cloud provider certifications (AWS, Azure) are heavily prioritized.",
    remotePotential: "Highly remote friendly.",
    portfolioImportance: "High - architectural blueprints, secure VPC setup configurations, and resource automation scripts."
  },
  "ai-engineer": {
    demand: "Surging demand across tech companies integrating LLMs and generative systems.",
    competition: "High; requires a mix of software engineering and deep math/statistical model understanding.",
    degreeAdvantage: "Advanced degrees (Master's/PhD) carry significant weight, though building models overrides theory.",
    remotePotential: "Moderate remote availability.",
    portfolioImportance: "Critical - interactive model hosting, prompt security filters, and data pipeline logs must be verified."
  },
  "cybersecurity-analyst": {
    demand: "Constant demand across banking, finance, healthcare, and enterprise compliance.",
    competition: "Moderate; credential-heavy field makes entry-level competitive.",
    degreeAdvantage: "Security certifications (Security+, CEH) and hands-on lab audits outrank degrees.",
    remotePotential: "Moderate; onsite security centers often require physical attendance.",
    portfolioImportance: "High - network penetration write-ups, vulnerability reports, and active security lab environments."
  }
};

export const getCareerInsights = (slug: string): CareerInsightInfo | null => {
  return careerInsights[slug] || null;
};
