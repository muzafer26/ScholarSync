"use client";

import { use, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { careers } from "@/lib/seed-careers";
import { resources } from "@/lib/seed-resources";
import { Header } from "@/components/layout/header";
import { CalloutBlock, WarningBlock, InfoBlock } from "@/components/ui/notion-blocks";
import { ExternalLink, CheckSquare, Briefcase, Map, BookOpen, ChevronRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { getResourceConfidenceBadge } from "@/lib/utils";

export default function CareerRoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const career = careers.find((c) => c.slug === slug);

  if (!career) {
    notFound();
  }

  const [score, setScore] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("scholar-sync-resource-feedback");
    if (saved) {
      try { setFeedback(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const handleFeedback = (resId: string, type: string) => {
    const nextState = { ...feedback, [resId]: type };
    setFeedback(nextState);
    localStorage.setItem("scholar-sync-resource-feedback", JSON.stringify(nextState));

    // Post to remote telemetry endpoint
    fetch("/api/resource-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resId,
        feedbackType: type,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {});
  };

  useEffect(() => {
    const saved = localStorage.getItem(`scholar-sync-roadmap-${career.slug}`);
    if (saved) {
      try {
        setCompletedSteps(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, [career.slug]);

  const toggleStep = (stepId: string) => {
    const nextState = { ...completedSteps, [stepId]: !completedSteps[stepId] };
    setCompletedSteps(nextState);
    localStorage.setItem(`scholar-sync-roadmap-${career.slug}`, JSON.stringify(nextState));
  };

  const targetScore = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < career.title.length; i++) {
      sum += career.title.charCodeAt(i);
    }
    return 85 + (sum % 11); // 85% to 95%
  }, [career.title]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= targetScore) {
        setScore(targetScore);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [targetScore]);

  // PM Rationale Helper
  const metrics = useMemo(() => {
    const t = career.title.toLowerCase();
    
    if (t.includes("frontend")) {
      return {
        whyThisPath: {
          enjoy: ["Visual work & seeing results immediately", "Designing & optimizing user interfaces", "Fast feedback loops"],
          avoid: ["You dislike cross-browser CSS debugging", "You prefer mathematical/architectural data mapping"],
          description: "Best for developers who love craft, design, and direct user interaction."
        },
        reality: {
          demand: "Very High",
          competition: "High (Entry-level)",
          degreeAdvantage: "Weak (Portfolio-first)",
          remotePotential: "Very High",
          portfolioImportance: "Critical"
        },
        scores: {
          learningDifficulty: 5,
          marketDemand: 9,
          entryBarrier: 4,
          overall: 8.5
        },
        realityCheck: "Most beginners need 6–8 months of consistent study to build a job-ready frontend portfolio. Don't just learn HTML/CSS—focus on mastering vanilla JavaScript and a framework like React."
      };
    }
    
    if (t.includes("backend")) {
      return {
        whyThisPath: {
          enjoy: ["Solving complex logic puzzles", "Designing database schemas & API routes", "System scaling and efficiency"],
          avoid: ["You want instant visual gratification", "You dislike complex error handling & server monitoring"],
          description: "Best for logical, structured thinkers who enjoy building the engine room of applications."
        },
        reality: {
          demand: "High",
          competition: "Medium-High",
          degreeAdvantage: "Moderate",
          remotePotential: "High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 7,
          marketDemand: 9.5,
          entryBarrier: 6,
          overall: 8.2
        },
        realityCheck: "Backend requires solid comprehension of databases, APIs, and basic security. Expect 7-9 months of preparation to build a competitive portfolio of live, deployed servers."
      };
    }
 
    if (t.includes("full stack")) {
      return {
        whyThisPath: {
          enjoy: ["Having absolute control over whole projects", "Bridging UX and server-side systems", "Rapid prototyping"],
          avoid: ["You get overwhelmed context-switching between CSS and SQL", "You prefer deep specialization over breadth"],
          description: "Ideal for future tech founders and product-focused engineers who want to build end-to-end apps."
        },
        reality: {
          demand: "Critical",
          competition: "High (Broad range)",
          degreeAdvantage: "Weak",
          remotePotential: "Very High",
          portfolioImportance: "Critical"
        },
        scores: {
          learningDifficulty: 9,
          marketDemand: 10,
          entryBarrier: 8,
          overall: 8.0
        },
        realityCheck: "Full Stack requires mastering two complete environments (frontend + backend). Expect 9-12 months of structured study. A stellar single-page application with database integration is mandatory for hiring."
      };
    }
 
    if (t.includes("ai") || t.includes("machine") || t.includes("deep learning")) {
      return {
        whyThisPath: {
          enjoy: ["Working with math, statistics, and neural nets", "Training systems to learn from massive datasets", "Pushing boundary tech"],
          avoid: ["You want a fast, easy job-ready outcome in 3 months", "You dislike reading academic papers & debugging tensors"],
          description: "Perfect for research-oriented engineers who thrive on advanced algorithms and statistical math."
        },
        reality: {
          demand: "Extreme",
          competition: "Very High (Skill-bound)",
          degreeAdvantage: "Strong (Masters/PhD)",
          remotePotential: "High",
          portfolioImportance: "Critical"
        },
        scores: {
          learningDifficulty: 9.5,
          marketDemand: 10,
          entryBarrier: 9.5,
          overall: 7.8
        },
        realityCheck: "AI Engineering is mathematically intense. Prepare for 12-18 months of studying deep learning, RAG systems, LLMs, and deployment. You need a portfolio displaying fine-tuned or custom-prompted systems with real-world utility."
      };
    }
 
    if (t.includes("data scientist") || t.includes("data science")) {
      return {
        whyThisPath: {
          enjoy: ["Finding trends in massive tabular datasets", "Applying statistics to business operations", "Visualizing complex charts"],
          avoid: ["You dislike statistics and linear algebra", "You want to build consumer-facing software applications"],
          description: "Best for math-loving data analysts who want to design predictive models and run experiments."
        },
        reality: {
          demand: "High",
          competition: "High",
          degreeAdvantage: "Strong",
          remotePotential: "Medium-High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 8.5,
          marketDemand: 8.5,
          entryBarrier: 8,
          overall: 7.5
        },
        realityCheck: "Data Science requires strong foundations in statistics and linear algebra. Expect 8-12 months of preparation. Next steps usually include transitioning to ML Engineer, Analytics Engineer, BI Lead, or Research Scientist."
      };
    }
 
    if (t.includes("devops") || t.includes("infra")) {
      return {
        whyThisPath: {
          enjoy: ["Automating deployments and cloud servers", "Optimizing scaling, speed, and latency", "Ensuring systems never crash"],
          avoid: ["You dislike CLI terminals and shell scripting", "You want to build visual user interfaces"],
          description: "Best for systems thinkers who love automation, scripting, and cloud architecture."
        },
        reality: {
          demand: "Very High",
          competition: "Medium (High skill barrier)",
          degreeAdvantage: "Moderate",
          remotePotential: "High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 8,
          marketDemand: 9.5,
          entryBarrier: 7.5,
          overall: 8.4
        },
        realityCheck: "DevOps is not an entry-level role. Beginners usually need 10–15 months of consistent study to master infrastructure, networking, and code, whereas existing developers can make the transition in 6–8 months."
      };
    }
 
    if (t.includes("cybersecurity") || t.includes("security") || t.includes("hacker")) {
      return {
        whyThisPath: {
          enjoy: ["Ethical hacking & system testing", "Securing firewalls & defending networks", "Analyzing security logs"],
          avoid: ["You expect to break into banks in week 1", "You dislike intense compliance documentation & auditing"],
          description: "Best for naturally curious defenders who enjoy investigating anomalies and secure system designs."
        },
        reality: {
          demand: "Very High",
          competition: "Medium",
          degreeAdvantage: "Moderate (Certifications matter)",
          remotePotential: "Medium-High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 7.5,
          marketDemand: 9,
          entryBarrier: 7,
          overall: 8.0
        },
        realityCheck: "Cybersecurity requires operating system and networking mastery. Plan for 9-12 months of studies and focus on earning industry certs (like CompTIA Security+) and publishing writeups of hackable test boxes."
      };
    }
 
    if (t.includes("ux") || t.includes("design")) {
      return {
        whyThisPath: {
          enjoy: ["Conducting user interviews & studying behavior", "Creating interactive Figma prototypes", "Aesthetic layout alignment"],
          avoid: ["You want to write React/HTML code", "You dislike constant feedback loops & redesigning based on telemetry"],
          description: "Perfect for creative, empathetic designers who want to shape digital product experiences."
        },
        reality: {
          demand: "High",
          competition: "High",
          degreeAdvantage: "Weak (Case studies rule)",
          remotePotential: "High",
          portfolioImportance: "Critical"
        },
        scores: {
          learningDifficulty: 6,
          marketDemand: 8,
          entryBarrier: 5,
          overall: 7.8
        },
        realityCheck: "Figma skills alone are not enough to get hired. Success requires a portfolio with at least 3 detailed case studies, proving you can run user interviews, identify real friction, and iterate prototypes."
      };
    }
 
    if (t.includes("mobile") || t.includes("android") || t.includes("ios") || t.includes("app")) {
      return {
        whyThisPath: {
          enjoy: ["Building apps people open daily on their phones", "Creating high-performance mobile animations", "Cross-platform engineering (Flutter/React Native)"],
          avoid: ["You dislike dealing with App Store review delays", "You prefer server-side database work"],
          description: "Best for developers focused on consumer-centric app experiences and responsive touch interfaces."
        },
        reality: {
          demand: "High",
          competition: "Medium",
          degreeAdvantage: "Weak",
          remotePotential: "High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 6.5,
          marketDemand: 8.5,
          entryBarrier: 5.5,
          overall: 8.1
        },
        realityCheck: "Mobile development requires testing across different screen sizes and operating systems. Expect 6-8 months of preparation, ending with at least one fully deployed application on the App Store or Play Store."
      };
    }
 
    if (t.includes("qa") || t.includes("test")) {
      return {
        whyThisPath: {
          enjoy: ["Finding bugs and breaking software", "Writing automated scripts to run tests", "Detail-oriented validation"],
          avoid: ["You dislike repetitive test cases", "You only want to write new features from scratch"],
          description: "Lower technical barrier than most engineering paths; focuses on code assurance, reliability, and automation."
        },
        reality: {
          demand: "High",
          competition: "High (Low entry)",
          degreeAdvantage: "Weak",
          remotePotential: "Medium-High",
          portfolioImportance: "High"
        },
        scores: {
          learningDifficulty: 4.5,
          marketDemand: 8.0,
          entryBarrier: 3.5,
          overall: 8.7
        },
        realityCheck: "While QA has a lower technical barrier than other paths, automation skills (Selenium, Cypress) are essential to stand out. Plan for 5-7 months to build robust automated test suites."
      };
    }

    if (t.includes("game")) {
      return {
        whyThisPath: {
          enjoy: ["Creating interactive 3D worlds & game mechanics", "Working with physics, visual rendering, and sound", "Writing gameplay scripts (C# or C++)"],
          avoid: ["You expect quick, simple web projects", "You expect high pay relative to standard software development roles"],
          description: "Ideal for passionate creators who want to merge coding with art and interactive storytelling."
        },
        reality: {
          demand: "Medium",
          competition: "Very High",
          degreeAdvantage: "Weak (Game demos rule)",
          remotePotential: "Medium-High",
          portfolioImportance: "Critical"
        },
        scores: {
          learningDifficulty: 8.5,
          marketDemand: 7.0,
          entryBarrier: 7.5,
          overall: 7.2
        },
        realityCheck: "Game development is extremely competitive, and portfolios/playable game demos matter more than anything. Be aware that average salaries in games are often 20-30% lower than standard software engineering, and crunch cycles are common."
      };
    }
 
    // Fallback (e.g. Data Analyst, Java Developer, Cloud Engineer, etc)
    return {
      whyThisPath: {
        enjoy: ["Solving structured engineering problems", "Applying logic to optimize pipelines", "Working on enterprise scale code"],
        avoid: ["You dislike long-term project planning", "You prefer fast, lightweight scripting only"],
        description: "Best for structured developers who enjoy programming enterprise-ready, robust services."
      },
      reality: {
        demand: "High",
        competition: "Medium-High",
        degreeAdvantage: "Moderate",
        remotePotential: "Medium-High",
        portfolioImportance: "Very High"
      },
      scores: {
        learningDifficulty: 6.5,
        marketDemand: 8.8,
        entryBarrier: 6.0,
        overall: 8.0
      },
      realityCheck: "This pathway demands structured engineering practices and solid portfolio verification. Plan for 6-9 months of consistent learning to build robust projects that recruiters will trust."
    };
  }, [career.title]);

  // Get highly contextual resources for this specific career path
  const sortedResources = useMemo(() => {
    const careerTags = (career.tags || []).map(t => t.toLowerCase());
    const careerTitleWords = career.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const careerSkills = career.stages.flatMap(s => s.skills || []).map(s => s.toLowerCase());

    const scored = resources.map(r => {
      let score = 0;
      const titleLower = r.title.toLowerCase();
      const descLower = r.description.toLowerCase();
      const resourceTopics = (r.topics || []).map(t => t.toLowerCase());

      // 1. Explicit attachment boost
      if (career.recommendedResourceIds?.includes(r.id)) {
        score += 1000;
      }

      // 2. Stage skills overlap
      const matchingSkills = resourceTopics.filter(topic => careerSkills.includes(topic));
      score += matchingSkills.length * 50;

      // 3. Career tags overlap
      const matchingTags = resourceTopics.filter(topic => careerTags.includes(topic));
      score += matchingTags.length * 30;

      // 4. Title word matching
      const matchingTitleWords = careerTitleWords.filter(word => titleLower.includes(word) || descLower.includes(word));
      score += matchingTitleWords.length * 40;

      // 5. Generic penalty system (Python, CS50, Git) for non-relevant careers
      const isGenericTopic = resourceTopics.includes('python') || resourceTopics.includes('git') || resourceTopics.includes('github') || titleLower.includes('cs50');
      
      const careerIsPythonRelated = careerTags.includes('python') || careerSkills.includes('python') || career.title.toLowerCase().includes('python') || career.title.toLowerCase().includes('data science') || career.title.toLowerCase().includes('ai') || career.title.toLowerCase().includes('data analyst');
      
      const careerIsGitRelated = careerTags.includes('git') || careerSkills.includes('git');

      if (isGenericTopic) {
        if (resourceTopics.includes('python') && !careerIsPythonRelated) {
          score -= 500; // Demote python resources to bottom on non-python paths
        }
        if ((resourceTopics.includes('git') || resourceTopics.includes('github')) && !careerIsGitRelated) {
          score -= 100; // Demote Git guides as low-priority fallbacks
        }
      }

      return { resource: r, score };
    });

    // Sort descending by score, resolve ties by quality score
    return scored
      .sort((a, b) => b.score - a.score || (b.resource.qualityScore || 0) - (a.resource.qualityScore || 0))
      .map(x => x.resource)
      .slice(0, 5);
  }, [career, resources]);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="page-container content-reading pt-28 pb-20" data-testid="career-page">
        {/* BREADCRUMB */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-[13px] font-mono font-bold uppercase tracking-[0.04em] text-muted-foreground"
        >
          <Link href="/explore" className="hover:text-primary transition-colors flex items-center gap-1">
            <Map className="w-3.5 h-3.5" /> Exploration
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-foreground">{career.title}</span>
        </motion.div>

        {/* TITLE & OVERVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-[32px] md:text-[42px] font-serif font-bold tracking-tight leading-tight text-foreground">{career.title}</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-500">
              Last Reviewed: June 2026
            </span>
          </div>
          <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden group mb-8">
            <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>
            <p className="text-[18px] text-foreground/90 font-serif leading-relaxed relative z-10 mb-6">
              {career.description}
            </p>
            
            <div className="relative z-10 pt-4 border-t border-border flex flex-wrap items-center gap-6 justify-between font-mono text-[13px] mb-4">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground uppercase text-[11px] tracking-wider">Confidence Telemetry:</span>
                <span className="text-primary font-bold">{score}%</span>
                <div className="w-24 md:w-32 bg-secondary border border-border h-2.5 rounded-sm overflow-hidden flex items-center p-[1px]">
                  <motion.div 
                    className="bg-primary h-full rounded-sm" 
                    style={{ width: `${score}%` }} 
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground uppercase text-[11px] tracking-wider">Demand Trend:</span>
                <span className="text-emerald-500 font-bold uppercase tracking-widest">{career.demandTrend}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground uppercase text-[11px] tracking-wider">Global Salary:</span>
                <span className="text-foreground font-bold">{career.avgSalaryGlobal}</span>
              </div>
            </div>

            {career.aliases && career.aliases.length > 0 && (
              <div className="relative z-10 pt-4 border-t border-border mt-4">
                <span className="text-muted-foreground uppercase text-[11px] tracking-wider font-mono block mb-2">Industry Aliases & Specializations:</span>
                <div className="flex flex-wrap gap-1.5">
                  {career.aliases.map((alias, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-secondary text-foreground text-[12px] font-mono rounded-sm border border-border">
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* WHY THIS PATH & METRICS BENTO */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Why This Path Card */}
          <div className="lg:col-span-2 bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
            <div>
              <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary mb-4">
                Why this path?
              </h3>
              <p className="text-[16px] text-foreground font-serif leading-relaxed mb-6">
                {metrics.whyThisPath.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[12px] font-mono font-bold uppercase tracking-wider text-emerald-500 mb-3">✓ You will enjoy this if:</h4>
                  <ul className="space-y-2 text-[14px] font-serif text-foreground/85">
                    {metrics.whyThisPath.enjoy.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-mono mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] font-mono font-bold uppercase tracking-wider text-primary mb-3">⚠ Avoid this path if:</h4>
                  <ul className="space-y-2 text-[14px] font-serif text-foreground/85">
                    {metrics.whyThisPath.avoid.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-destructive font-mono mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Opportunity Score Card */}
          <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
            <div>
              <h3 className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary mb-4">
                Opportunity Telemetry
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-[13px] font-mono mb-1.5">
                    <span className="text-muted-foreground">Learning Difficulty</span>
                    <span className="text-foreground font-bold">{metrics.scores.learningDifficulty}/10</span>
                  </div>
                  <div className="w-full bg-secondary h-1.5 rounded-sm overflow-hidden">
                    <div className="bg-primary h-full rounded-sm" style={{ width: `${metrics.scores.learningDifficulty * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[13px] font-mono mb-1.5">
                    <span className="text-muted-foreground">Market Demand</span>
                    <span className="text-foreground font-bold">{metrics.scores.marketDemand}/10</span>
                  </div>
                  <div className="w-full bg-secondary h-1.5 rounded-sm overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-sm" style={{ width: `${metrics.scores.marketDemand * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[13px] font-mono mb-1.5">
                    <span className="text-muted-foreground">Entry Barrier</span>
                    <span className="text-foreground font-bold">{metrics.scores.entryBarrier}/10</span>
                  </div>
                  <div className="w-full bg-secondary h-1.5 rounded-sm overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-sm" style={{ width: `${metrics.scores.entryBarrier * 10}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-muted-foreground uppercase block tracking-wider">Overall Fit Score</span>
                  <span className="text-[32px] font-mono font-bold text-foreground">{(metrics.scores.overall).toFixed(1)}<span className="text-[16px] text-muted-foreground">/10</span></span>
                </div>
                <div className="px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/20 text-primary font-mono text-[12px] font-bold tracking-widest uppercase">
                  {metrics.scores.overall >= 8.2 ? "HIGH TIER" : "RECOMMENDED"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* REALITY LAYER DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12"
        >
          <div className="bg-card border border-border rounded-md p-4 bevel-card text-center">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Demand</span>
            <span className="text-[15px] font-serif font-bold text-foreground">{metrics.reality.demand}</span>
          </div>
          <div className="bg-card border border-border rounded-md p-4 bevel-card text-center">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Competition</span>
            <span className="text-[15px] font-serif font-bold text-foreground">{metrics.reality.competition}</span>
          </div>
          <div className="bg-card border border-border rounded-md p-4 bevel-card text-center">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Degree Advantage</span>
            <span className="text-[15px] font-serif font-bold text-foreground">{metrics.reality.degreeAdvantage}</span>
          </div>
          <div className="bg-card border border-border rounded-md p-4 bevel-card text-center">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Remote Potential</span>
            <span className="text-[15px] font-serif font-bold text-foreground">{metrics.reality.remotePotential}</span>
          </div>
          <div className="bg-card border border-border rounded-md p-4 bevel-card text-center">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Portfolio</span>
            <span className="text-[15px] font-serif font-bold text-foreground">{metrics.reality.portfolioImportance}</span>
          </div>
        </motion.div>

        {/* REALITY CHECK BLOCKS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 space-y-4"
        >
          <WarningBlock title="Reality Check">
            {metrics.realityCheck || "Most beginners need 6–12 months of consistent study. Do not rely on clickbait numbers."} The average packages in India are standardly listed as <strong className="text-foreground font-mono">{career.avgSalaryIndia}</strong>, depending heavily on your portfolio and location.
          </WarningBlock>
          
          <CalloutBlock title="Before You Start">
            You do not need a degree to begin learning {career.title.toLowerCase()}. However, you will need to build a strong portfolio of projects to prove your skills to employers.
          </CalloutBlock>
          
          <InfoBlock title="Recommended Path">
            Learn theory from free university courses or documentation → Practice interactively → Build your own projects from scratch.
          </InfoBlock>
        </motion.div>

        <hr className="border-border my-16 opacity-50" />

        {/* ROADMAP CHECKLIST */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Map className="w-5 h-5 text-primary" />
            <h2 className="text-[25px] font-serif font-bold text-foreground">Execution Roadmap</h2>
          </div>
          
          <div className="space-y-6 relative">
            {/* Animated Timeline Progress Line */}
            <div className="absolute inset-y-0 left-5 md:left-1/2 md:-translate-x-1/2 w-0.5 pointer-events-none">
              <div className="absolute inset-0 bg-border opacity-20 h-full w-full" />
              <motion.div 
                className="absolute top-0 left-0 bg-primary w-full"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>

            {career.stages.map((stage, i) => (
              <motion.div 
                key={stage.id} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-sm border-2 border-primary bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(23,104,218,0.2)] z-10 mx-auto">
                  <span className="font-mono text-[14px] font-bold text-primary">{i + 1}</span>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-card border border-border rounded-md bevel-card hover:border-primary/50 transition-colors relative">
                  <div className="absolute top-0 right-0 w-4 h-4 bg-muted border-b border-l border-border rounded-bl-sm -mr-px -mt-px transition-colors group-hover:bg-primary/10"></div>
                  <h3 className="font-serif text-[18px] font-bold mb-2 text-foreground">{stage.title}</h3>
                  <p className="text-[16px] text-muted-foreground font-serif mb-5">{stage.description}</p>
                  
                  <div className="space-y-2.5 mb-6">
                    {stage.skills.map((skill) => (
                      <div key={skill} className="flex items-start gap-2.5">
                        <CheckSquare className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/90 font-mono text-[14px] leading-tight">{skill}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border space-y-4">
                    <h4 className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary mb-1 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5" /> Anti-Tutorial-Hell Checklist
                    </h4>
                    <div className="space-y-3 font-mono text-[13px]">
                      <div className="flex items-start gap-2.5 p-2.5 bg-secondary/30 border border-border rounded-sm">
                        <input 
                          type="checkbox" 
                          checked={!!completedSteps[`${stage.id}-learn`]}
                          onChange={() => toggleStep(`${stage.id}-learn`)}
                          className="rounded-sm border-border text-primary focus:ring-primary h-4 w-4 shrink-0 mt-0.5 cursor-pointer" 
                        />
                        <div>
                          <span className="text-emerald-500 font-bold">1. LEARN:</span> Study {stage.skills.slice(0, 2).join(", ")} theory and concepts.
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2.5 bg-secondary/30 border border-border rounded-sm">
                        <input 
                          type="checkbox" 
                          checked={!!completedSteps[`${stage.id}-practice`]}
                          onChange={() => toggleStep(`${stage.id}-practice`)}
                          className="rounded-sm border-border text-primary focus:ring-primary h-4 w-4 shrink-0 mt-0.5 cursor-pointer" 
                        />
                        <div>
                          <span className="text-primary font-bold">2. PRACTICE:</span> Run coding exercises & solve mini lab checks.
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2.5 bg-secondary/30 border border-border rounded-sm">
                        <input 
                          type="checkbox" 
                          checked={!!completedSteps[`${stage.id}-build`]}
                          onChange={() => toggleStep(`${stage.id}-build`)}
                          className="rounded-sm border-border text-primary focus:ring-primary h-4 w-4 shrink-0 mt-0.5 cursor-pointer" 
                        />
                        <div>
                          <span className="text-orange-500 font-bold">3. BUILD:</span> {stage.milestones[0] || "Create portfolio checkpoint project."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RESOURCES LIST */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-[25px] font-serif font-bold text-foreground">Indexed Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedResources.map((r, i) => {
              const isInactive = r.status === 'Inactive' || r.status === 'Removed';
              
              if (isInactive) {
                // FALLBACK CARD
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="block p-5 bg-destructive/5 border border-destructive/20 rounded-md inset-panel relative overflow-hidden pt-10"
                  >
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-destructive/10 border border-destructive/20 text-[10px] font-mono font-bold uppercase tracking-widest text-destructive z-20">
                      ⚠ Resource Offline
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-[18px] font-serif font-bold text-foreground/60 leading-tight">
                        {r.title}
                      </h3>
                      <p className="text-[13px] font-serif text-muted-foreground mt-2">
                        This resource is currently offline or undergoing validation.
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/60 space-y-2">
                      <span className="text-[11px] font-mono uppercase text-primary font-bold block tracking-wider">Recommended Alternatives:</span>
                      <div className="space-y-1.5 font-mono text-[12px]">
                        {resources
                          .filter(alt => alt.id !== r.id && alt.status !== 'Inactive' && alt.status !== 'Removed' && alt.topics.some(t => r.topics.includes(t)))
                          .slice(0, 2)
                          .map((alt) => (
                            <a
                              key={alt.id}
                              href={alt.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors underline decoration-dotted"
                            >
                              <span>•</span>
                              <span>{alt.title}</span>
                              <span className="text-muted-foreground text-[10px]">({alt.source})</span>
                            </a>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // STANDARD HEALTHY CARD
              return (
                <motion.a 
                  key={r.id} 
                  href={r.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="block p-5 bg-background border border-border rounded-md hover:border-primary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group inset-panel relative overflow-hidden pt-10"
                >
                  {/* Step Connector Flag */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-secondary border border-border text-[10px] font-mono font-bold uppercase tracking-widest text-primary z-20">
                    STEP {i + 1}: {r.format === "course" ? "LEARN" : r.format === "video" ? "WATCH" : r.format === "book" ? "READ" : r.format === "text" ? "DOCS" : "PRACTICE"}
                  </div>

                  {/* Trust Score Badge */}
                  <div 
                    className="absolute top-2 right-2 px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 z-20 cursor-help"
                    title="✓ Verified Free · ✓ Active URL · ✓ Curated Context · ✓ No Hidden Paywalls"
                  >
                    Trust: {r.qualityScore || 96}%
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-[18px] font-serif font-bold text-foreground group-hover:text-primary transition-colors flex-1 leading-tight">
                      {r.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-50 shrink-0 group-hover:text-primary" />
                  </div>
                  
                  {r.description && <p className="text-[14px] font-serif mt-2 mb-3 text-foreground/70 line-clamp-2 leading-relaxed">{r.description}</p>}
                  
                  {r.whyRecommended && (
                    <div className="p-2 bg-secondary/80 border border-border rounded-sm font-mono text-[11px] text-primary leading-normal mb-4">
                      <strong className="uppercase tracking-wider">Why Recommended:</strong> {r.whyRecommended}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-border">
                    <span className="px-2 py-0.5 bg-secondary text-foreground text-[12px] font-mono uppercase tracking-[0.04em] rounded-sm border border-border">
                      {getResourceConfidenceBadge(r)}
                    </span>
                    {r.pricingType && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[12px] font-mono uppercase tracking-[0.04em] rounded-sm border border-primary/20">
                        {r.pricingType.replace("_", " ")}
                      </span>
                    )}
                    <span className="text-[12px] font-mono text-muted-foreground uppercase tracking-widest mr-auto">{r.source}</span>
                    <span className="text-[11px] font-mono text-emerald-500 font-bold uppercase tracking-wider">
                      Checked: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Feedback layer */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50 text-[11px] font-mono relative z-30">
                    <span className="text-muted-foreground mr-1">Was this useful?</span>
                    {feedback[r.id] ? (
                      <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Feedback Recorded!</span>
                    ) : (
                      <>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleFeedback(r.id, 'helpful'); }}
                          className="px-1.5 py-0.5 bg-secondary hover:bg-emerald-500/10 hover:text-emerald-500 rounded border border-border transition-colors active:scale-95"
                        >
                          👍 Helpful
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleFeedback(r.id, 'outdated'); }}
                          className="px-1.5 py-0.5 bg-secondary hover:bg-orange-500/10 hover:text-orange-500 rounded border border-border transition-colors active:scale-95"
                        >
                          👎 Outdated
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleFeedback(r.id, 'broken'); }}
                          className="px-1.5 py-0.5 bg-secondary hover:bg-destructive/10 hover:text-destructive rounded border border-border transition-colors active:scale-95"
                        >
                          ⚠ Broken
                        </button>
                      </>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* JOBS LIST */}
        <div className="mb-16">
          <div className="p-8 bg-card border border-border bevel-card rounded-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>
             
             <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-[25px] font-serif font-bold text-foreground">Live Telemetry</h2>
              </div>
              <p className="text-[16px] text-muted-foreground font-serif max-w-lg">View real-time job openings, skill gaps, and active hiring locations for this career path.</p>
            </div>
            
            <Link 
              href={`/jobs?q=${encodeURIComponent(career.title)}`}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary border border-border font-sans text-[14px] font-bold rounded-sm hover:border-primary transition-colors active:scale-95 bevel-card relative z-10"
            >
              INITIALIZE JOB SEARCH <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* RECRUITER PORTFOLIO ACTION PANEL */}
        <div className="grid md:grid-cols-2 gap-4 mb-24">
          <div className="p-6 bg-card border border-border bevel-card rounded-md text-center">
            <h3 className="text-[18px] font-serif font-bold text-foreground mb-2">Compare Career Tracks</h3>
            <p className="text-[14px] text-muted-foreground font-serif mb-4">Compare {career.title} difficulty, salaries, and timelines with other tech domains.</p>
            <Link 
              href="/compare"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-primary border border-border text-[13px] font-bold rounded-sm hover:border-primary transition-all"
            >
              Open Comparison Matrix
            </Link>
          </div>
          <div className="p-6 bg-card border border-border bevel-card rounded-md text-center">
            <h3 className="text-[18px] font-serif font-bold text-foreground mb-2">Not sure if this fits you?</h3>
            <p className="text-[14px] text-muted-foreground font-serif mb-4">Take our 2-Minute Career Quiz to align your skills and learning preferences.</p>
            <Link 
              href="/quiz"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-primary border border-border text-[13px] font-bold rounded-sm hover:border-primary transition-all"
            >
              Take Profiler Quiz
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
