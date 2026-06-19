export interface QuizExplanation {
  recommendedReason: string;
  secondReason: string;
  eliminatedReason: string;
}

export const quizExplanations: Record<string, QuizExplanation> = {
  "frontend-developer": {
    recommendedReason: "Frontend Developer survived because you chose visual construction, creative output, and lower math constraints. You enjoy building features that users can directly see and interact with.",
    secondReason: "UX Designer survived as a high-creativity alternative, focusing strictly on visuals and user research.",
    eliminatedReason: "AI Engineer was eliminated due to its high mathematical requirements (linear algebra, calculus, statistics), and Backend Developer was ranked lower because of its low visual focus."
  },
  "backend-developer": {
    recommendedReason: "Backend Developer survived because you preferred systems logic, API building, and data storage design over visual adjustments, while maintaining a low math preference.",
    secondReason: "DevOps Engineer survived as a systems alternative focusing on server configurations and build setups.",
    eliminatedReason: "Frontend Developer was eliminated/ranked lower due to your aversion to CSS wrangling, and AI Engineer was eliminated due to its heavy statistical prerequisites."
  },
  "devops-engineer": {
    recommendedReason: "DevOps Engineer survived because you preferred system pipelines, automation scripting, and server operations over writing user-facing applications.",
    secondReason: "Cloud Engineer survived as a strong infrastructure alternative focusing on vendor console provisioning.",
    eliminatedReason: "Frontend Developer was eliminated because you prefer scripting over styling visual page elements."
  },
  "cloud-engineer": {
    recommendedReason: "Cloud Engineer survived because you preferred deploying network configurations and managing cloud instances over manual design styling and application code files.",
    secondReason: "DevOps Engineer survived as a closely related pathway focusing on deeper terminal automation pipelines.",
    eliminatedReason: "Frontend Developer was eliminated due to lack of visual focus, and AI Engineer was eliminated due to heavy math parameters."
  },
  "ai-engineer": {
    recommendedReason: "AI Engineer survived because you want to work on training pipelines, statistical data processing, and prompting LLMs, and you have a high tolerance for mathematical models.",
    secondReason: "Backend Developer survived as a backend-adjacent path focusing on transactional systems and data routing.",
    eliminatedReason: "Frontend Developer was ranked lower because of its visual UI emphasis, and UX Designer was eliminated due to zero-code requirements."
  },
  "cybersecurity-analyst": {
    recommendedReason: "Cybersecurity Analyst survived because you preferred analyzing network security, auditing firewalls, and security operations over styling frontends.",
    secondReason: "DevOps Engineer survived as a systems-adjacent path involving servers and deployment pipeline security.",
    eliminatedReason: "Frontend Developer was ranked lower due to low visual focus, and AI Engineer was eliminated due to math specifications."
  }
};

export const getQuizExplanation = (recommendedSlug: string, secondSlug: string, eliminatedSlug: string): QuizExplanation => {
  const base = quizExplanations[recommendedSlug] || quizExplanations["frontend-developer"];
  
  // Format slug names for custom display
  const formatSlug = (slug: string) => {
    return slug
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return {
    recommendedReason: base.recommendedReason,
    secondReason: base.secondReason.includes("UX Designer") 
      ? base.secondReason 
      : `Your second match is ${formatSlug(secondSlug)}, which matches your technical infrastructure preferences.`,
    eliminatedReason: base.eliminatedReason.includes("AI Engineer")
      ? base.eliminatedReason
      : `${formatSlug(eliminatedSlug)} was eliminated or ranked lower because your preferences indicated a mismatch with its day-to-day requirements.`
  };
};
