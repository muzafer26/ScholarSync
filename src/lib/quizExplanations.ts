export interface QuizExplanation {
  recommendedReason: string;
  secondReason: string;
  eliminatedReason: string;
  butConsider?: string;
}

export const quizExplanations: Record<string, Omit<QuizExplanation, "eliminatedReason">> = {
  "frontend-developer": {
    recommendedReason: "Frontend Developer is a strong match because you selected visual construction, creative user outcomes, and lower mathematical constraints. You will enjoy building visual web elements that users directly interact with.",
    secondReason: "UX Designer or Backend Developer could serve as alternative paths depending on whether you want to focus more on visual research or back-end API integration."
  },
  "backend-developer": {
    recommendedReason: "Backend Developer fits your profile because you preferred systems logic, API data structures, and server-side storage over visual aesthetics and styling.",
    secondReason: "DevOps Engineer or AI Engineer are solid alternative paths if you want to branch into server pipelines or data processing."
  },
  "devops-engineer": {
    recommendedReason: "DevOps Engineer is recommended because you favored automation scripts, deployment pipelines, and server orchestration over building customer-facing UI visual layouts.",
    secondReason: "Cloud Engineer or Backend Developer are close alternatives focusing on cloud consoles or building API routes."
  },
  "cloud-engineer": {
    recommendedReason: "Cloud Engineer matches your preferences because you want to provision networks, cloud VMs, and cloud vendor infrastructure with moderate coding.",
    secondReason: "DevOps Engineer or Cybersecurity Analyst are great adjacent tracks for automation or network auditing."
  },
  "ai-engineer": {
    recommendedReason: "AI Engineer is the top match because you want to build machine learning models, tune hyperparameters, prompt LLMs, and you have high tolerance for statistics and linear algebra.",
    secondReason: "Backend Developer or Data Analyst are strong adjacent choices focusing on databases or analytical scripting."
  },
  "cybersecurity-analyst": {
    recommendedReason: "Cybersecurity Analyst fits because you preferred network security auditing, firewall configuration, and threat detection systems with moderate programming.",
    secondReason: "DevOps Engineer or Cloud Engineer are closely related infrastructure tracks dealing with server security."
  }
};

export function getEliminationReason(slug: string, answers: Record<string, string>): string {
  const frustrates = answers["frustrates"] || "";
  const coding = answers["coding"] || "";
  const math = answers["math"] || "";

  switch (slug) {
    case "frontend-developer":
      if (frustrates === "styling_css") {
        return "Eliminated because you explicitly want to avoid styling CSS, visual alignment quirks, and browser rendering issues.";
      }
      if (coding === "zero") {
        return "Eliminated because Frontend Engineering requires heavy coding in JavaScript, TypeScript, and React frameworks.";
      }
      return "Ranked lower because your answers leaned away from visual layouts and user interface construction.";

    case "backend-developer":
      if (frustrates === "silent_db") {
        return "Eliminated because you want to avoid database transaction locks, server connection leaks, and API debugging.";
      }
      if (coding === "zero") {
        return "Eliminated because Backend Engineering requires writing heavy application logic and algorithmic routines.";
      }
      return "Ranked lower because systems-level scripting and API logic did not match your primary interests.";

    case "devops-engineer":
    case "cloud-engineer":
      if (frustrates === "server_ops") {
        return "Eliminated because you want to avoid midnight server alerts, YAML configuration wrangling, and production on-call duty.";
      }
      if (coding === "zero" && slug === "devops-engineer") {
        return "Eliminated because DevOps requires scripting automation pipelines and command line configurations.";
      }
      return "Ranked lower because you did not prioritize cloud infrastructure, deployment scripting, or networking.";

    case "ai-engineer":
      if (frustrates === "heavy_math") {
        return "Eliminated because you want to avoid complex math theories, linear algebra, and calculus.";
      }
      if (math === "none" || math === "basic") {
        return "Eliminated because AI/Machine Learning pipelines require a high tolerance for statistics, matrix calculus, and math papers.";
      }
      if (coding === "zero") {
        return "Eliminated because AI pipelines require heavy coding in Python, PyTorch, or Mojo.";
      }
      return "Ranked lower because you indicated moderate to low interest in statistical modeling and training pipelines.";

    case "cybersecurity-analyst":
      if (coding === "heavy") {
        return "Ranked lower because you preferred heavy application development coding, whereas security analysis centers around network auditing and system compliance.";
      }
      return "Ranked lower because your interests did not align with firewall configurations, compliance checks, or vulnerability assessments.";

    default:
      return "Ranked lower because your selected preferences indicated a stronger mismatch with this career's day-to-day operations.";
  }
}

export function getButConsiderWarning(recommendedSlug: string, answers: Record<string, string>): string | undefined {
  const frustrates = answers["frustrates"] || "";
  const math = answers["math"] || "";

  if (recommendedSlug === "frontend-developer" && frustrates === "styling_css") {
    return "💡 Tradeoff Warning: You matched with Frontend Developer, but you noted that you want to avoid styling/CSS frustrations. Keep in mind that styling forms a major part of frontend work. If that's a dealbreaker, you may want to look into UX Design (design-first) or Backend Developer (logic-first).";
  }

  if (recommendedSlug === "backend-developer" && frustrates === "silent_db") {
    return "💡 Tradeoff Warning: You matched with Backend Developer, but you want to avoid database and API frustrations. Since backend work revolves around data layers and API stability, you might face friction. Consider Frontend Developer or DevOps instead.";
  }

  if (recommendedSlug === "ai-engineer" && (math === "basic" || math === "none")) {
    return "💡 Tradeoff Warning: You matched with AI Engineer, but you prefer basic or zero mathematics. Machine learning pipelines and deep learning research are heavily theoretical and rely on advanced calculus and statistics. Consider Backend Developer as a less math-intensive pathway.";
  }

  if ((recommendedSlug === "devops-engineer" || recommendedSlug === "cloud-engineer") && frustrates === "server_ops") {
    return "💡 Tradeoff Warning: You matched with an infrastructure role, but you want to avoid midnight server alerts and server operations. DevOps and Cloud engineering roles frequently involve on-call rotations and system troubleshooting. Consider Backend Developer as a less operationally demanding route.";
  }

  return undefined;
}

export const getQuizExplanation = (
  recommendedSlug: string, 
  secondSlug: string, 
  eliminatedSlug: string,
  answers?: Record<string, string>
): QuizExplanation => {
  const base = quizExplanations[recommendedSlug] || quizExplanations["frontend-developer"];
  
  // Format slug names for custom display
  const formatSlug = (slug: string) => {
    return slug
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const actualAnswers = answers || {};
  const eliminatedReason = getEliminationReason(eliminatedSlug, actualAnswers);
  const butConsider = getButConsiderWarning(recommendedSlug, actualAnswers);

  return {
    recommendedReason: base.recommendedReason,
    secondReason: base.secondReason.includes("UX Designer") 
      ? base.secondReason 
      : `Your second match is ${formatSlug(secondSlug)}, which matches your technical infrastructure preferences.`,
    eliminatedReason,
    butConsider
  };
};
