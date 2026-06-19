"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, ExternalLink, Award, FileSpreadsheet, ChevronRight, Terminal, UserMinus, ShieldCheck
} from "lucide-react";
import { careers } from "@/lib/seed-careers";
import { getCareerReality } from "@/lib/careerReality";
import { getCareerCompareInfo } from "@/lib/compareInsights";
import { getCareerSources } from "@/lib/careerSources";
import { industryData } from "@/lib/industryData";

// Custom mapping for projects & recruiter rejections per career slug
const careerHiringRealityDetails: Record<string, {
  projects: string[];
  rejections: string[];
}> = {
  "frontend-developer": {
    projects: [
      "Custom Dashboard with drag-and-drop dashboard tiles and user configuration persistence.",
      "An accessible design system implementation with reusable, fully themed UI components.",
      "A real-time workspace tool (e.g. collaborative canvas or whiteboard) utilizing canvas or SVG."
    ],
    rejections: [
      "Create-React-App default templates and boilerplate projects with no customization.",
      "Tutorial clones (e.g., Netflix clone with hardcoded static database).",
      "Missing responsive layouts (app breaks on mobile screen sizes).",
      "Low Lighthouse accessibility/performance scores (< 90)."
    ]
  },
  "backend-developer": {
    projects: [
      "A REST API with custom token rate-limiting and structured validation middleware.",
      "A secure database schema populated with 10k+ rows of structured mock data showing index optimizations.",
      "A message queue worker simulation managing async email deliveries or image crops."
    ],
    rejections: [
      "Hardcoded database credentials or environment keys in public git repositories.",
      "Zero API integration test suites or mock tests.",
      "Missing README explanation of endpoint request/response JSON schemas."
    ]
  },
  "devops-engineer": {
    projects: [
      "Dockerized microservices deployment utilizing a local reverse proxy / load balancer.",
      "A secure multi-stage CI/CD pipeline script testing, linting, and building builds.",
      "A system telemetry daemon parsing system logs and writing backup files."
    ],
    rejections: [
      "Running Docker containers as root without user constraints.",
      "Storing secrets in plain text inside public git commits.",
      "Neglecting to configure basic health check flags inside config files."
    ]
  },
  "cloud-engineer": {
    projects: [
      "A declarative Terraform plan provisioning a cloud sandbox network architecture.",
      "A serverless lambda function workflow with budget notifications and access limits.",
      "A secure VPC network configuration with private subnets and public gateways."
    ],
    rejections: [
      "S3 storage buckets configured with public access flags enabled.",
      "Excessive administrative permissions granted to standard IAM roles.",
      "No cost-monitoring alarms or billing alerts configured in scripts."
    ]
  },
  "ai-engineer": {
    projects: [
      "A Retrieval-Augmented Generation (RAG) system searching over a custom local library.",
      "A fine-tuned text model inference interface featuring custom system prompt controls.",
      "A database indexing engine linking vector embeddings to semantic search results."
    ],
    rejections: [
      "Calling public OpenAI API endpoints without error/rate handling.",
      "Training model configurations on dirty or unscrubbed local datasets.",
      "Failing to check for injection attacks or prompt override attempts."
    ]
  },
  "cybersecurity-analyst": {
    projects: [
      "An automated port-scanning parser generating network vulnerability summaries.",
      "A Linux authorization log daemon flagging repeating login failures.",
      "A mock network packet analyzer parsing protocols and security threats."
    ],
    rejections: [
      "Submitting vulnerability findings without step-by-step proof-of-concept replication rules.",
      "No code samples or scripting automation repositories on your profile.",
      "Focusing on pre-built script tools instead of showing operating system core mechanics."
    ]
  },
  "java-developer": {
    projects: [
      "A Spring Boot microservices API managing a mock retail inventory system.",
      "A transactional ledger system with custom thread safety and logging.",
      "A database connection pool benchmark optimizer comparing raw queries."
    ],
    rejections: [
      "Monolithic class structures with severe circular class dependencies.",
      "Missing Maven or Gradle configurations, forcing manual dependency imports.",
      "Zero JUnit assertions testing data operations."
    ]
  },
  "full-stack-developer": {
    projects: [
      "A collaborative rich text workspace utilizing real-time database synchronization.",
      "A multi-tenant inventory CRM complete with database transactions and secure auth.",
      "A live support portal linking user screens with admin chat boxes."
    ],
    rejections: [
      "Broken routes or 500 error outputs on the live deployment demo.",
      "Hardcoded JWT secret keys or API credentials inside frontend scripts.",
      "Tutorial clone apps with zero unique features or custom styling."
    ]
  },
  "data-scientist": {
    projects: [
      "A predictive pricing notebook utilizing clean regression algorithms.",
      "A cohort retention visualizer analyzing mock user clickstream tables.",
      "A custom feature engineering notebook cleaning and normalizing complex metrics."
    ],
    rejections: [
      "Submitting standard generic datasets (e.g. Titanic survival or MNIST numbers).",
      "No hypothesis testing explanation or statistical validation rationale.",
      "Charts and visual diagrams missing labels, scales, or legends."
    ]
  },
  "mobile-developer": {
    projects: [
      "A cross-platform mobile tracker built in React Native or Flutter.",
      "An offline-first journal caching local database logs on-device.",
      "A native application showcasing custom swipe interactions and physics layouts."
    ],
    rejections: [
      "Simulator-only projects that crash or scale terribly on physical screens.",
      "Disregarding native iOS and Android style guidelines, creating inconsistent UIs.",
      "Sluggish list scroll execution due to unoptimized image assets."
    ]
  },
  "ux-designer": {
    projects: [
      "A high-fidelity Figma design library featuring a bento grid system.",
      "A usability study detailing wireframes, user testing patterns, and visual revisions.",
      "An end-to-end checkout flow audit correcting user friction points."
    ],
    rejections: [
      "High-fidelity design files with zero documented research, wireframes, or test records.",
      "Broken auto-layout rules or inconsistent pixel grids inside Figma pages.",
      "Identical visual template duplicates containing no original problem solving."
    ]
  },
  "qa-tester": {
    projects: [
      "A comprehensive Playwright browser test suite covering dynamic form behaviors.",
      "An automated API checklist verifying CRUD status codes using Postman.",
      "A structured bug reports repository documenting replicable test failures."
    ],
    rejections: [
      "Writing tests only for successful paths, completely ignoring negative boundaries.",
      "Slow, fragile selector queries prone to timing out on small changes.",
      "Inability to explain the underlying testing architecture or frameworks."
    ]
  },
  "data-analyst": {
    projects: [
      "A clean SQL query repository solving monthly revenue growth matrices.",
      "An interactive business dashboard created in Tableau or Power BI.",
      "A business study slide deck converting database charts into executive recommendations."
    ],
    rejections: [
      "Submitting spreadsheets containing broken formulas or hardcoded calculations.",
      "Interactive dashboards with no clear takeaway recommendations for leaders.",
      "Copy-pasting SQL queries without understanding basic index plans."
    ]
  },
  "game-developer": {
    projects: [
      "A custom 3D character controller managing complex physics states.",
      "An optimized gameplay scoring loop script handling spawn pools.",
      "A playable prototype level compiled for WebGL or desktop environments."
    ],
    rejections: [
      "Submitting screenshots only without a playable game build or source repository link.",
      "Asset-store flips (using paid store meshes with no custom coding mechanics).",
      "Severe frame rate spikes due to unoptimized graphics, scripting, or physics."
    ]
  },
  "technical-writer": {
    projects: [
      "A developer installation handbook outlining foolproof local configurations.",
      "An endpoint integration guide illustrating curl commands and responses.",
      "A static documentation page built utilizing Docusaurus or GitBook."
    ],
    rejections: [
      "Grammatical errors, formatting glitches, or spelling mistakes in writing samples.",
      "Including code blocks or commands that do not run or compile locally.",
      "Vague or abstract descriptions that fail to explain practical system use cases."
    ]
  }
};

export default function JobsPage() {
  const [activeSlug, setActiveSlug] = useState("frontend-developer");

  const activeCareer = useMemo(() => {
    return careers.find(c => c.slug === activeSlug) || careers[0];
  }, [activeSlug]);

  const reality = useMemo(() => {
    return getCareerReality(activeSlug);
  }, [activeSlug]);

  const compare = useMemo(() => {
    return getCareerCompareInfo(activeSlug);
  }, [activeSlug]);

  const sources = useMemo(() => {
    return getCareerSources(activeSlug);
  }, [activeSlug]);

  const details = useMemo(() => {
    return careerHiringRealityDetails[activeSlug] || { projects: [], rejections: [] };
  }, [activeSlug]);

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="page-container pt-28 pb-20" data-testid="jobs-page">
        {/* HEADER AREA */}
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-6 h-6 text-primary animate-pulse" />
            <h1 className="text-[32px] md:text-[40px] font-serif font-bold text-foreground tracking-tight">Career Signals</h1>
          </div>
          <p className="text-[16px] text-muted-foreground font-serif leading-relaxed max-w-2xl">
            Career Signals summarizes requested skills, portfolio expectations, recruiter rejection reasons, industry trends, and career outlook for each pathway.
          </p>
        </div>

        {/* BENTO COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
        {/* LEFT SIDEBAR: CAREER PATHWAYS */}
          <div className="lg:col-span-4 bg-card border border-border bevel-card rounded-md p-4 max-h-[700px] overflow-y-auto custom-scrollbar">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-4 px-2">Select Career Pathway</span>
            <div className="space-y-1">
              {careers.map((c) => {
                const isActive = c.slug === activeSlug;
                return (
                  <button
                    key={c.slug}
                    onClick={() => setActiveSlug(c.slug)}
                    className={`w-full text-left px-3 py-2.5 rounded-sm transition-all flex items-center justify-between group font-mono text-[13px] border ${
                      isActive 
                        ? "bg-secondary text-primary border-primary/40 font-bold" 
                        : "text-foreground/80 hover:text-foreground border-transparent hover:bg-secondary/40"
                    }`}
                  >
                    <span>{c.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-0.5 text-primary" : "opacity-0 group-hover:opacity-100"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT VIEWPORT: CAREER SIGNALS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CAREER IDENTIFIER & CRITICAL METRICS */}
            <motion.div
              key={`${activeSlug}-header`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
              
            <h2 className="text-[26px] font-serif font-bold text-foreground mb-1">{activeCareer.title} career signals</h2>
              <span className="text-primary font-mono text-[12px] uppercase tracking-widest block mb-6">{activeCareer.field} · {activeCareer.subfield}</span>

              {compare && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border font-mono text-[12px]">
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">First Job Difficulty</span>
                    <span className="text-foreground font-bold">{compare.firstJobDifficulty}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">Learning Curve</span>
                    <span className="text-foreground font-bold">{compare.learningCurve}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">Portfolio Importance</span>
                    <span className="text-emerald-500 font-bold">{compare.portfolioImportance}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">Remote Option</span>
                    <span className="text-foreground font-bold">{compare.remoteOpportunities}</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* MOST REQUESTED SKILLS */}
            <motion.div
              key={`${activeSlug}-skills`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border bevel-card rounded-md p-6"
            >
              <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Requested Skills Matrix
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeCareer.skillsRequired.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-secondary text-foreground text-[12px] font-mono rounded-sm border border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* HIRING REALITY & WARNING CALLOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* HIRING REALITY */}
              <motion.div
                key={`${activeSlug}-hiring`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border bevel-card rounded-md p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Hiring Reality
                  </h3>
                  {compare && (
                    <div className="space-y-4 font-serif text-[14.5px] text-foreground/90 leading-relaxed">
                      <p>
                        <strong>Candidate Fit:</strong> {compare.whoThrives}
                      </p>
                      <p>
                        <strong>Common Bottleneck:</strong> {compare.whoStruggles}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* REJECT CRITERIA */}
              <motion.div
                key={`${activeSlug}-reject`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-destructive/5 border border-destructive/20 bevel-card rounded-md p-6"
              >
                <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-destructive mb-3 flex items-center gap-1.5">
                  <UserMinus className="w-4 h-4 text-destructive" /> What Recruiters Reject
                </h3>
                <ul className="space-y-2.5 font-serif text-[14px] text-foreground/90 leading-relaxed">
                  {details.rejections.map((rej, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-destructive font-bold text-[16px] leading-none mt-0.5">×</span>
                      <span>{rej}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* PORTFOLIO INSTRUCTIONS */}
            <motion.div
              key={`${activeSlug}-portfolio`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border bevel-card rounded-md p-6"
            >
              <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-500" /> High-Impact Portfolio Work
              </h3>
              <p className="text-[14px] text-muted-foreground mb-4 font-serif">
                Recruiters look for proof of execution. Build at least two of these from scratch, deployment included:
              </p>
              <ul className="space-y-3 font-serif text-[14.5px] text-foreground/90 leading-relaxed">
                {details.projects.map((proj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* TYPICAL RESPONSIBILITIES */}
            {reality && (
              <motion.div
                key={`${activeSlug}-responsibilities`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border bevel-card rounded-md p-6"
              >
                <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4" /> Typical Day-to-Day Duties
                </h3>
                <ul className="space-y-3 font-mono text-[12.5px] text-foreground/80 leading-relaxed">
                  {reality.dailyReality.map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-2 bg-secondary/30 rounded-sm border border-border/50">
                      <span className="text-primary font-bold">»</span>
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* MARKET SIGNALS (EXTERNAL SURVEY LINKS) */}
            {sources && (
              <motion.div
                key={`${activeSlug}-signals`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border bevel-card rounded-md p-6"
              >
                <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-primary" /> Verified Market Signals & Surveys
                </h3>
                <p className="text-[14px] text-muted-foreground mb-4 font-serif">
                  Consult these authoritative external surveys to review real tech stack distributions and salary trends:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sources.industrySignals.map((sig, idx) => (
                    <a
                      key={idx}
                      href={sig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-sm border border-border bg-secondary/50 hover:bg-primary/5 hover:border-primary/40 transition-all font-mono text-[12px] group"
                    >
                      <span className="text-foreground group-hover:text-primary font-bold">{sig.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* GLOBAL INDUSTRY TRENDS SECTION */}
        <div className="mt-16 border-t border-border pt-12 text-left">
          <div className="mb-8">
            <h2 className="text-[26px] font-serif font-bold text-foreground mb-2">Global Industry Trends</h2>
            <p className="text-[14.5px] text-muted-foreground font-serif leading-relaxed max-w-2xl">
              Curated snapshots from named external reports. Cards without source, date, or description are hidden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* GitHub Octoverse */}
            <div className="p-6 bg-card border border-border bevel-card rounded-md">
              <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">GitHub Octoverse</span>
              <h3 className="text-[18px] font-serif font-bold text-foreground mb-4">Top Programming Languages</h3>
              <div className="space-y-3 font-mono text-[12px]">
                {industryData.githubOctoverse.topLanguages.map((l, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground font-bold">{l.rank}. {l.language}</span>
                    <span className="text-muted-foreground">{l.sharePercentage}% ({l.growthYoY})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Overflow Survey */}
            <div className="p-6 bg-card border border-border bevel-card rounded-md">
              <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">Stack Overflow Survey</span>
              <h3 className="text-[18px] font-serif font-bold text-foreground mb-4">Median Salary Tiers (USD)</h3>
              <div className="space-y-3 font-mono text-[12px]">
                {industryData.stackOverflowSurvey.popularRolesAndSalaries.map((s, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground">{s.role}</span>
                    <span className="text-primary font-bold">${s.medianSalaryUSD.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* State of JS */}
            <div className="p-6 bg-card border border-border bevel-card rounded-md">
              <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">State of JS</span>
              <h3 className="text-[18px] font-serif font-bold text-foreground mb-4">Frontend Framework Usage</h3>
              <div className="space-y-3 font-mono text-[12px]">
                {industryData.stateOfJs.frontendFrameworks.map((f, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{f.name}</span>
                      <span>{f.usagePercentage}% usage</span>
                    </div>
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${f.usagePercentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kaggle Survey */}
            <div className="p-6 bg-card border border-border bevel-card rounded-md">
              <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">Kaggle Survey</span>
              <h3 className="text-[18px] font-serif font-bold text-foreground mb-4">Popular ML Frameworks</h3>
              <div className="space-y-3 font-mono text-[12px]">
                {industryData.kaggleSurvey.mlFrameworks.map((m, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground">{m.name}</span>
                    <span className="text-emerald-500 font-bold">{m.usagePercentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CNCF Cloud Native */}
            <div className="p-6 bg-card border border-border bevel-card rounded-md">
              <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">CNCF Cloud Native</span>
              <h3 className="text-[18px] font-serif font-bold text-foreground mb-4">Kubernetes & Runtime Stats</h3>
              <div className="space-y-3 font-mono text-[12px]">
                <div className="flex justify-between pb-2 border-b border-border/40">
                  <span>K8s Production Adoption</span>
                  <span className="text-primary font-bold">{industryData.cncfSurvey.kubernetesAdoptionPercentage}%</span>
                </div>
                {industryData.cncfSurvey.topContainerRuntimes.map((r, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">{r.tool} runtime</span>
                    <span className="text-foreground font-bold">{r.usagePercentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hugging Face AI Ecosystem */}
            <div className="p-6 bg-card border border-border bevel-card rounded-md">
              <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">Hugging Face AI Ecosystem</span>
              <h3 className="text-[18px] font-serif font-bold text-foreground mb-4">Deep Learning Libraries</h3>
              <div className="space-y-3 font-mono text-[12px]">
                {Object.entries(industryData.huggingFaceReports.deepLearningLibrariesShare).map(([lib, share]) => (
                  <div key={lib} className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground">{lib}</span>
                    <span className="text-primary font-bold">{share}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
