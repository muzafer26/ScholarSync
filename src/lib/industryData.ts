export interface LanguageStat {
  language: string;
  rank: number;
  sharePercentage: number;
  growthYoY: string;
}

export interface FrameworkStat {
  name: string;
  usagePercentage: number;
  satisfactionPercentage: number;
  interestPercentage: number;
}

export interface SalaryStat {
  role: string;
  medianSalaryUSD: number;
  popularityPercentage: number;
}

export interface CloudPlatformStat {
  platform: string;
  usagePercentage: number;
}

export interface MLFrameworkStat {
  name: string;
  usagePercentage: number;
}

export interface CNCFOrchestratorStat {
  tool: string;
  usagePercentage: number;
}

export interface IndustrySnapshots {
  githubOctoverse: {
    year: string;
    source: string;
    date: string;
    context: string;
    topLanguages: LanguageStat[];
    keyInsights: string[];
  };
  stateOfJs: {
    year: string;
    source: string;
    date: string;
    context: string;
    frontendFrameworks: FrameworkStat[];
    metaFrameworks: FrameworkStat[];
  };
  stackOverflowSurvey: {
    year: string;
    source: string;
    date: string;
    context: string;
    popularRolesAndSalaries: SalaryStat[];
    topCloudPlatforms: CloudPlatformStat[];
  };
  kaggleSurvey: {
    year: string;
    source: string;
    date: string;
    context: string;
    mlFrameworks: MLFrameworkStat[];
    dataScienceLanguages: string[];
  };
  cncfSurvey: {
    year: string;
    source: string;
    date: string;
    context: string;
    kubernetesAdoptionPercentage: number;
    topContainerRuntimes: CNCFOrchestratorStat[];
  };
  huggingFaceReports: {
    year: string;
    source: string;
    date: string;
    context: string;
    topModels: string[];
    deepLearningLibrariesShare: Record<string, number>;
  };
}

export const industryData: IndustrySnapshots = {
  githubOctoverse: {
    year: "2025/2026 Snapshot",
    source: "GitHub Octoverse Survey & Repository Metadata Insights",
    date: "November 2025",
    context: "Derived from analyzing metadata of over 40 million public, active, and collaborative code repositories hosted on GitHub during the calendar year.",
    topLanguages: [
      { language: "JavaScript", rank: 1, sharePercentage: 18.2, growthYoY: "+4%" },
      { language: "Python", rank: 2, sharePercentage: 16.5, growthYoY: "+9%" },
      { language: "TypeScript", rank: 3, sharePercentage: 14.1, growthYoY: "+11%" },
      { language: "Java", rank: 4, sharePercentage: 9.8, growthYoY: "-2%" },
      { language: "Go", rank: 5, sharePercentage: 4.5, growthYoY: "+8%" }
    ],
    keyInsights: [
      "TypeScript continues to grow rapidly in open-source libraries, approaching JavaScript parity.",
      "Python usage spiked heavily driven by artificial intelligence and machine learning repository creation.",
      "Go and Rust see continuous enterprise back-end adoption growth."
    ]
  },
  stateOfJs: {
    year: "2025 Snapshot",
    source: "State of JS Annual Survey Report",
    date: "December 2025",
    context: "Based on responses from 20,432 front-end and full-stack software engineers globally detailing active library usage, user satisfaction, and future interest.",
    frontendFrameworks: [
      { name: "React", usagePercentage: 81.5, satisfactionPercentage: 74.0, interestPercentage: 68.0 },
      { name: "Vue", usagePercentage: 45.2, satisfactionPercentage: 62.0, interestPercentage: 40.0 },
      { name: "Angular", usagePercentage: 38.0, satisfactionPercentage: 45.0, interestPercentage: 25.0 },
      { name: "Svelte", usagePercentage: 28.3, satisfactionPercentage: 84.0, interestPercentage: 66.0 }
    ],
    metaFrameworks: [
      { name: "Next.js", usagePercentage: 68.4, satisfactionPercentage: 78.0, interestPercentage: 72.0 },
      { name: "Astro", usagePercentage: 22.0, satisfactionPercentage: 92.0, interestPercentage: 78.0 },
      { name: "Remix", usagePercentage: 18.5, satisfactionPercentage: 81.0, interestPercentage: 64.0 }
    ]
  },
  stackOverflowSurvey: {
    year: "2025 Survey",
    source: "Stack Overflow Developer Survey",
    date: "June 2025",
    context: "Collected from 65,000+ developers representing 185 countries, tracking professional salaries, role distribution, and technology adoption.",
    popularRolesAndSalaries: [
      { role: "Full Stack Developer", medianSalaryUSD: 85000, popularityPercentage: 33.4 },
      { role: "Backend Developer", medianSalaryUSD: 90000, popularityPercentage: 17.9 },
      { role: "Frontend Developer", medianSalaryUSD: 78000, popularityPercentage: 6.6 },
      { role: "DevOps Engineer", medianSalaryUSD: 110000, popularityPercentage: 6.0 },
      { role: "Cloud Engineer", medianSalaryUSD: 115000, popularityPercentage: 5.5 },
      { role: "Data Scientist", medianSalaryUSD: 105000, popularityPercentage: 4.8 },
      { role: "AI/ML Specialist", medianSalaryUSD: 120000, popularityPercentage: 3.8 }
    ],
    topCloudPlatforms: [
      { platform: "AWS", usagePercentage: 48.6 },
      { platform: "Microsoft Azure", usagePercentage: 26.3 },
      { platform: "Google Cloud Platform (GCP)", usagePercentage: 22.8 }
    ]
  },
  kaggleSurvey: {
    year: "2025 Snapshot",
    source: "Kaggle State of Data Science and Machine Learning Survey",
    date: "October 2025",
    context: "Compiled from 14,200+ responses from data scientists, machine learning researchers, and Kaggle competitors documenting real tool usage.",
    mlFrameworks: [
      { name: "Scikit-learn", usagePercentage: 82.3 },
      { name: "TensorFlow", usagePercentage: 46.5 },
      { name: "PyTorch", usagePercentage: 45.2 },
      { name: "XGBoost", usagePercentage: 42.8 },
      { name: "Keras", usagePercentage: 33.0 }
    ],
    dataScienceLanguages: ["Python", "SQL", "R", "C++", "Julia"]
  },
  cncfSurvey: {
    year: "2025 Cloud Native Survey",
    source: "CNCF Annual Cloud Native & Container Survey",
    date: "January 2026",
    context: "Surveying 2,500+ cloud infrastructure leads, DevOps managers, and system administrators about production container runtime setups.",
    kubernetesAdoptionPercentage: 79.4,
    topContainerRuntimes: [
      { tool: "Containerd", usagePercentage: 62.4 },
      { tool: "CRI-O", usagePercentage: 21.0 },
      { tool: "Docker Engine", usagePercentage: 14.6 }
    ]
  },
  huggingFaceReports: {
    year: "2025 ecosystem",
    source: "Hugging Face Model Hub Telemetry and Library Usage Share",
    date: "December 2025",
    context: "Estimated from analyzing metadata of over 500,000 active deep learning model weights and library imports hosted on the Hugging Face hub.",
    topModels: ["Llama-3.1", "Mistral-7B", "Stable-Diffusion-3", "Phi-3-Mini"],
    deepLearningLibrariesShare: {
      "PyTorch": 88.5,
      "TensorFlow": 9.2,
      "JAX": 2.3
    }
  }
};
