export interface CareerSourceInfo {
  title: string;
  primaryReferences: { label: string; url: string }[];
  industrySignals: { label: string; url: string }[];
}

export const careerSources: Record<string, CareerSourceInfo> = {
  "frontend-developer": {
    title: "Frontend Developer",
    primaryReferences: [
      { label: "roadmap.sh - Frontend Roadmap", url: "https://roadmap.sh/frontend" },
      { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
      { label: "React Documentation", url: "https://react.dev/" }
    ],
    industrySignals: [
      { label: "State of JS Survey", url: "https://2024.stateofjs.com/" },
      { label: "W3C Web Accessibility Guidelines", url: "https://www.w3.org/" }
    ]
  },
  "backend-developer": {
    title: "Backend Developer",
    primaryReferences: [
      { label: "roadmap.sh - Backend Roadmap", url: "https://roadmap.sh/backend" },
      { label: "Node.js API Reference", url: "https://nodejs.org/docs/latest/api/" },
      { label: "Oracle Java SE Documentation", url: "https://docs.oracle.com/en/java/" }
    ],
    industrySignals: [
      { label: "PostgreSQL Manual", url: "https://www.postgresql.org/docs/" },
      { label: "Stack Overflow Developer Survey", url: "https://survey.stackoverflow.co/" }
    ]
  },
  "devops-engineer": {
    title: "DevOps Engineer",
    primaryReferences: [
      { label: "roadmap.sh - DevOps Roadmap", url: "https://roadmap.sh/devops" },
      { label: "Kubernetes Reference Docs", url: "https://kubernetes.io/docs/" },
      { label: "Docker Docs", url: "https://docs.docker.com/" }
    ],
    industrySignals: [
      { label: "AWS Cloud Documentation", url: "https://aws.amazon.com/documentation/" },
      { label: "CNCF Cloud Native Landscape", url: "https://landscape.cncf.io/" }
    ]
  },
  "cloud-engineer": {
    title: "Cloud Engineer",
    primaryReferences: [
      { label: "roadmap.sh - DevOps & Cloud", url: "https://roadmap.sh/devops" },
      { label: "AWS Documentation Library", url: "https://aws.amazon.com/documentation/" },
      { label: "Microsoft Azure Documentation", url: "https://learn.microsoft.com/azure/" }
    ],
    industrySignals: [
      { label: "Google Cloud Platform Docs", url: "https://cloud.google.com/docs" },
      { label: "CNCF Cloud Native Landscape", url: "https://landscape.cncf.io/" }
    ]
  },
  "ai-engineer": {
    title: "AI Engineer",
    primaryReferences: [
      { label: "roadmap.sh - AI Roadmap", url: "https://roadmap.sh/ai-data-scientist" },
      { label: "Hugging Face Developer Docs", url: "https://huggingface.co/docs" },
      { label: "PyTorch API Reference", url: "https://pytorch.org/docs/" }
    ],
    industrySignals: [
      { label: "TensorFlow Learning Guides", url: "https://www.tensorflow.org/learn" },
      { label: "Kaggle Competitions & Datasets", url: "https://www.kaggle.com/" }
    ]
  },
  "cybersecurity-analyst": {
    title: "Cybersecurity Analyst",
    primaryReferences: [
      { label: "roadmap.sh - Cybersecurity Roadmap", url: "https://roadmap.sh/cyber-security" },
      { label: "OWASP Top 10 Security Risks", url: "https://owasp.org/" },
      { label: "Nmap Scripting & Reference Docs", url: "https://nmap.org/docs.html" }
    ],
    industrySignals: [
      { label: "SANS Institute Security Resources", url: "https://www.sans.org/" },
      { label: "CISA Cybersecurity Shields Up", url: "https://www.cisa.gov/" }
    ]
  },
  "ux-designer": {
    title: "UX Designer",
    primaryReferences: [
      { label: "Nielsen Norman Group UX Docs", url: "https://www.nngroup.com/" },
      { label: "Figma Help Center", url: "https://help.figma.com/" }
    ],
    industrySignals: [
      { label: "Interaction Design Foundation", url: "https://www.interaction-design.org/" },
      { label: "Laws of UX Guidelines", url: "https://lawsofux.com/" }
    ]
  },
  "mobile-developer": {
    title: "Mobile Developer",
    primaryReferences: [
      { label: "Android Developer Docs", url: "https://developer.android.com/" },
      { label: "Apple Developer Documentation", url: "https://developer.apple.com/documentation/" }
    ],
    industrySignals: [
      { label: "React Native API Guides", url: "https://reactnative.dev/" },
      { label: "Flutter Framework Docs", url: "https://docs.flutter.dev/" }
    ]
  },
  "qa-tester": {
    title: "QA Tester",
    primaryReferences: [
      { label: "Selenium Documentation", url: "https://www.selenium.dev/documentation/" },
      { label: "Playwright Testing Reference", url: "https://playwright.dev/" }
    ],
    industrySignals: [
      { label: "ISTQB Testing Certification Standards", url: "https://www.istqb.org/" },
      { label: "Ministry of Testing Resources", url: "https://www.ministryoftesting.com/" }
    ]
  },
  "data-analyst": {
    title: "Data Analyst",
    primaryReferences: [
      { label: "Pandas Dataframe Documentation", url: "https://pandas.pydata.org/docs/" },
      { label: "Tableau Learning Center", url: "https://www.tableau.com/learn" }
    ],
    industrySignals: [
      { label: "SQL Standards Reference", url: "https://www.iso.org/standard/63343.html" },
      { label: "Kaggle Data Analytics Guides", url: "https://www.kaggle.com/learn/data-analysis" }
    ]
  },
  "game-developer": {
    title: "Game Developer",
    primaryReferences: [
      { label: "Unity Manual & API Docs", url: "https://docs.unity3d.com/Manual/" },
      { label: "Unreal Engine Documentation", url: "https://docs.unrealengine.com/" }
    ],
    industrySignals: [
      { label: "Godot Engine Documentation", url: "https://docs.godotengine.org/" },
      { label: "Gamasutra / Game Developer Insights", url: "https://www.gamedeveloper.com/" }
    ]
  },
  "technical-writer": {
    title: "Technical Writer",
    primaryReferences: [
      { label: "Google Technical Writing Courses", url: "https://developers.google.com/tech-writing" },
      { label: "Microsoft Writing Style Guide", url: "https://learn.microsoft.com/style-guide/" }
    ],
    industrySignals: [
      { label: "Write the Docs Community Guides", url: "https://www.writethedocs.org/" },
      { label: "Society for Technical Communication", url: "https://www.stc.org/" }
    ]
  },
  "java-developer": {
    title: "Java Developer",
    primaryReferences: [
      { label: "Oracle Java SE Documentation", url: "https://docs.oracle.com/en/java/" },
      { label: "Spring Boot Reference Guide", url: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
      { label: "roadmap.sh - Java Roadmap", url: "https://roadmap.sh/java" }
    ],
    industrySignals: [
      { label: "Eclipse Foundation Projects", url: "https://www.eclipse.org/" },
      { label: "JetBrains Java Developer Report", url: "https://www.jetbrains.com/lp/devecosystem-2023/java/" }
    ]
  },
  "full-stack-developer": {
    title: "Full Stack Developer",
    primaryReferences: [
      { label: "roadmap.sh - Full Stack Roadmap", url: "https://roadmap.sh/full-stack" },
      { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
      { label: "Next.js Documentation", url: "https://nextjs.org/docs" }
    ],
    industrySignals: [
      { label: "Stack Overflow Developer Survey", url: "https://survey.stackoverflow.co/" },
      { label: "State of JS Survey", url: "https://2024.stateofjs.com/" }
    ]
  },
  "data-scientist": {
    title: "Data Scientist",
    primaryReferences: [
      { label: "roadmap.sh - Data Scientist Roadmap", url: "https://roadmap.sh/ai-data-scientist" },
      { label: "Jupyter Project Documentation", url: "https://jupyter.org/documentation" },
      { label: "Scikit-Learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html" }
    ],
    industrySignals: [
      { label: "Kaggle Competitions", url: "https://www.kaggle.com/" },
      { label: "Anaconda Data Science Survey", url: "https://www.anaconda.com/state-of-data-science" }
    ]
  }
};

export const getCareerSources = (slug: string): CareerSourceInfo | null => {
  return careerSources[slug] || null;
};
