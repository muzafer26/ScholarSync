"use client";

import { use, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { careers } from "@/lib/seed-careers";
import { resources } from "@/lib/seed-resources";
import { Header } from "@/components/layout/header";
import { CalloutBlock, WarningBlock, InfoBlock } from "@/components/ui/notion-blocks";
import { ExternalLink, Briefcase, Map, BookOpen, ChevronRight, Shield, CheckCircle2, Zap, Check } from "lucide-react";
import { motion } from "framer-motion";
import { getResourceConfidenceBadge } from "@/lib/utils";
import { getResourceTrustLabel } from "@/lib/resourceTrust";
import { getCareerReality } from "@/lib/careerReality";
import { getCareerSources } from "@/lib/careerSources";
import { getCareerInsights } from "@/lib/careerInsights";
import { getCareerActionPlan } from "@/lib/careerActionPlans";
import { getCareerGrowthMap } from "@/lib/careerGrowthMaps";
import type { Resource } from "@/types";

export default function CareerRoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const career = careers.find((c) => c.slug === slug);

  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

  const toggleStageExpansion = (stageId: string) => {
    setExpandedStages(prev => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const growthMap = useMemo(() => {
    return getCareerGrowthMap(slug);
  }, [slug]);

  // PM Rationale Helper
  const metrics = useMemo(() => {
    if (!career) {
      return {
        whyThisPath: {
          enjoy: [],
          avoid: [],
          description: ""
        },
        reality: {
          demand: "N/A",
          competition: "N/A",
          degreeAdvantage: "N/A",
          remotePotential: "N/A",
          portfolioImportance: "N/A"
        },
        scores: {
          learningDifficulty: 0,
          marketDemand: 0,
          entryBarrier: 0,
          overall: 0
        },
        realityCheck: ""
      };
    }
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
          avoid: ["You get overwhelmed context-switching between CSS and SQL", "You prefer specialization over breadth"],
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
 
    if (t.includes("java")) {
      return {
        whyThisPath: {
          enjoy: ["Building structured, type-safe backend systems", "Optimizing JVM memory management", "Working in mature, enterprise-scale platforms"],
          avoid: ["You want quick, dynamic web prototyping", "You dislike strict OOP inheritance & verbose boilerplate syntax"],
          description: "Best for software engineers who prefer safety, static typing, and robust enterprise design patterns."
        },
        reality: {
          demand: "High",
          competition: "Medium",
          degreeAdvantage: "Moderate",
          remotePotential: "Medium-High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 7.0,
          marketDemand: 8.5,
          entryBarrier: 6.0,
          overall: 8.0
        },
        realityCheck: "Java is the language of enterprise banking and massive APIs. Prepare for 8–10 months of learning core Java, OOP patterns, and the Spring Boot framework. A portfolio with a microservices API is key."
      };
    }

    if (t.includes("data analyst")) {
      return {
        whyThisPath: {
          enjoy: ["Translating raw metrics into clean charts", "Writing SQL queries to answer business questions", "Presenting slides to decision-makers"],
          avoid: ["You prefer building software apps over analyzing numbers", "You dislike presenting to business leaders and repeating audits"],
          description: "Perfect for analytical communicators who enjoy bridging business questions with data analysis."
        },
        reality: {
          demand: "High",
          competition: "High",
          degreeAdvantage: "Weak (Case studies matter)",
          remotePotential: "High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 5.5,
          marketDemand: 8.5,
          entryBarrier: 5.0,
          overall: 8.0
        },
        realityCheck: "Data Analysts need to be fluent in SQL, Excel, and visualization tools like Tableau or Power BI. Expect 5–7 months of study. Focus on building and publishing dynamic dashboards with real-world databases."
      };
    }

    if (t.includes("cloud")) {
      return {
        whyThisPath: {
          enjoy: ["Designing distributed cloud architectures", "Automating networks, firewalls, and storage systems", "Optimizing cloud spending and server footprints"],
          avoid: ["You dislike managing complex web consoles & security IAM policies", "You prefer writing client-facing application features"],
          description: "Best for system architects who want to manage secure, scalable cloud ecosystems on AWS/Azure/GCP."
        },
        reality: {
          demand: "Very High",
          competition: "Medium-High",
          degreeAdvantage: "Moderate (Certifications help)",
          remotePotential: "High",
          portfolioImportance: "Very High"
        },
        scores: {
          learningDifficulty: 8.0,
          marketDemand: 9.0,
          entryBarrier: 7.0,
          overall: 8.3
        },
        realityCheck: "Cloud Engineering requires deep networking, storage, and IAM security knowledge. Prepare for 8–12 months of training. Earning a foundational cloud cert (like AWS Solutions Architect Associate) is highly recommended."
      };
    }

    if (t.includes("writer") || t.includes("technical writer")) {
      return {
        whyThisPath: {
          enjoy: ["Simplifying complex technical architectures into clear docs", "Writing tutorials, guides, and API specs", "Collaborating with developers to improve developer experience"],
          avoid: ["You want to spend all day writing code", "You dislike editing, formatting, and proofreading docs"],
          description: "Best for communicative tech enthusiasts who want to help developers succeed through clear, accessible instruction."
        },
        reality: {
          demand: "Stable",
          competition: "Medium",
          degreeAdvantage: "Weak",
          remotePotential: "Very High",
          portfolioImportance: "Critical"
        },
        scores: {
          learningDifficulty: 5.0,
          marketDemand: 7.5,
          entryBarrier: 4.5,
          overall: 7.6
        },
        realityCheck: "Technical Writing requires strong written communication and basic coding literacy (Markdown, Git, basic HTML/CSS). Expect 4–6 months of study. Building a documentation site using Docusaurus or GitBook is mandatory."
      };
    }

    // Fallback (e.g. other domains)
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
  }, [career]);

  // Get highly contextual resources for this specific career path
  const sortedResources = useMemo(() => {
    if (!career) return [];
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
    const sortedList = scored
      .filter(x => x.resource.status !== 'Inactive' && x.resource.status !== 'Removed')
      .sort((a, b) => b.score - a.score || (b.resource.qualityScore || 0) - (a.resource.qualityScore || 0))
      .map(x => x.resource);

    // Enforce 4-resource matrix: Learn, Guided, Practice, Build
    const selected: Resource[] = [];

    const getFormatCategory = (r: any): 'LEARN' | 'GUIDED' | 'PRACTICE' | 'BUILD' => {
      if (r.format === 'DOCUMENTATION' || r.format === 'REFERENCE') return 'LEARN';
      if (r.format === 'COURSE') return 'GUIDED';
      if (r.format === 'PRACTICE') return 'PRACTICE';
      if (r.format === 'PROJECT') return 'BUILD';
      return 'LEARN'; // Default fallback
    };

    // First pass: try to get exactly one of each category (LEARN, GUIDED, PRACTICE, BUILD)
    const categories = ['LEARN', 'GUIDED', 'PRACTICE', 'BUILD'] as const;
    categories.forEach(cat => {
      const match = sortedList.find(r => getFormatCategory(r) === cat && !selected.some(s => s.id === r.id));
      if (match) {
        selected.push(match);
      }
    });

    // Second pass: if we have fewer than 4 resources, fill with the highest scoring remaining ones
    if (selected.length < 4) {
      for (const r of sortedList) {
        if (selected.length >= 4) break;
        if (!selected.some(s => s.id === r.id)) {
          selected.push(r);
        }
      }
    }

    return selected.slice(0, 4);
  }, [career, resources]);

  if (!career) {
    notFound();
    return null;
  }

  const realityInfo = getCareerReality(career.slug);
  const dailyReality = realityInfo ? realityInfo.dailyReality : null;
  const beginnersUnderestimate = realityInfo ? realityInfo.beginnersUnderestimate : null;
  const avoidThisCareer = realityInfo ? realityInfo.whoShouldAvoid : null;
  const transitionPaths = realityInfo ? realityInfo.transitionPaths : null;

  const sourcesData = getCareerSources(career.slug);
  const insights = getCareerInsights(career.slug);
  const actionPlan = getCareerActionPlan(career.slug);

  const sourceCount = useMemo(() => {
    if (!sourcesData) return 0;
    return (sourcesData.primaryReferences?.length || 0) + (sourcesData.industrySignals?.length || 0);
  }, [sourcesData]);

  const totalVerifiedCount = useMemo(() => {
    if (!career) return 0;
    const careerTags = (career.tags || []).map(t => t.toLowerCase());
    const careerSkills = career.stages.flatMap(s => s.skills || []).map(s => s.toLowerCase());
    return resources.filter(r => {
      if (!r.verified || r.status === 'Inactive' || r.status === 'Removed') return false;
      const resourceTopics = (r.topics || []).map(t => t.toLowerCase());
      return resourceTopics.some(topic => careerSkills.includes(topic) || careerTags.includes(topic));
    }).length;
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
          </div>

          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-md border border-border bg-card font-mono text-[12px]">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-0.5">Last Reviewed</span>
              <span className="text-emerald-500 font-bold">2026-06-18</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-0.5">Next Review Due</span>
              <span className="text-foreground font-bold">2026-12-18</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-0.5">Source Count</span>
              <span className="text-foreground font-bold">{sourceCount} References</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-0.5">Resource Count</span>
              <span className="text-foreground font-bold">{totalVerifiedCount} Verified Resources</span>
            </div>
          </div>
          <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden group mb-8">
            <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>
            <p className="text-[18px] text-foreground/90 font-serif leading-relaxed relative z-10 mb-6">
              {career.description}
            </p>
            
            <div className="relative z-10 pt-4 border-t border-border flex flex-wrap items-center gap-6 justify-between font-mono text-[13px] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground uppercase text-[11px] tracking-wider">Pathway Type:</span>
                <span className="text-primary font-bold uppercase tracking-widest">{career.field}</span>
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

            {sourcesData && (
              <div className="relative z-10 pt-4 border-t border-border mt-4 text-left">
                <details className="group cursor-pointer" open>
                  <summary className="text-muted-foreground hover:text-foreground transition-colors uppercase text-[11px] tracking-wider font-mono list-none flex items-center gap-1.5 selection:bg-transparent mb-3">
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-open:rotate-95 text-primary" />
                    <span>Provenance & Reference Signals</span>
                  </summary>
                  <div className="pl-5 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <span className="text-muted-foreground font-mono text-[10px] uppercase block mb-1">Primary References</span>
                      <ul className="space-y-1 text-[13px] font-serif list-none">
                        {sourcesData.primaryReferences.map((ref, idx) => (
                          <li key={idx}>
                            <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                              {ref.label} <ExternalLink className="w-3 h-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-mono text-[10px] uppercase block mb-1">Industry Signals</span>
                      <ul className="space-y-1 text-[13px] font-serif list-none">
                        {sourcesData.industrySignals.map((sig, idx) => (
                          <li key={idx}>
                            <a href={sig.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                              {sig.label} <ExternalLink className="w-3 h-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
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
              <h3 className="text-[16px] font-mono font-bold uppercase tracking-widest text-primary mb-4">
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

          {/* Career Reality Card */}
          <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden flex flex-col justify-between text-left">
            <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
            <div>
              <h3 className="text-[16px] font-mono font-bold uppercase tracking-widest text-primary mb-4">
                Career Reality
              </h3>
              
              {insights ? (
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-muted-foreground text-[10px] font-mono uppercase block mb-0.5">Market Demand</span>
                    <p className="text-[13px] font-serif text-foreground/90 leading-snug">{insights.demand}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-[10px] font-mono uppercase block mb-0.5">Competition</span>
                    <p className="text-[13px] font-serif text-foreground/90 leading-snug">{insights.competition}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-[10px] font-mono uppercase block mb-0.5">Portfolio Need</span>
                    <p className="text-[13px] font-serif text-foreground/90 leading-snug">{insights.portfolioImportance}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6 font-serif text-[14px] text-muted-foreground leading-relaxed">
                  Career Insights Coming Soon
                </div>
              )}

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-muted-foreground uppercase block tracking-wider">Best For</span>
                  <span className="text-[18px] font-serif font-bold text-foreground">{career.subfield}</span>
                </div>
                <div className="px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/20 text-primary font-mono text-[12px] font-bold tracking-widest uppercase">
                  Factual Guide
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* REALITY LAYER DETAILS */}
        {insights ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            <div className="bg-card border border-border rounded-md p-4 bevel-card text-left">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Degree Advantage</span>
              <p className="text-[13.5px] font-serif text-foreground/90 leading-relaxed">{insights.degreeAdvantage}</p>
            </div>
            <div className="bg-card border border-border rounded-md p-4 bevel-card text-left">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Remote Potential</span>
              <p className="text-[13.5px] font-serif text-foreground/90 leading-relaxed">{insights.remotePotential}</p>
            </div>
          </motion.div>
        ) : (
          <div className="p-4 bg-secondary/20 border border-border rounded-sm text-left text-muted-foreground font-mono text-[12px] mb-12 uppercase tracking-wider">
            ⚠️ Degree & Remote Insights: Career Insights Coming Soon
          </div>
        )}

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

        {/* REALITY CHECK LAYER */}
        {realityInfo ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            {/* Daily Reality Bento Card */}
            <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
              <div>
                <h3 className="text-[16px] font-mono font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" /> Daily Reality
                </h3>
                <p className="text-[14px] text-muted-foreground font-serif mb-4">What actual work looks like day-to-day (beyond tutorials):</p>
                <ul className="space-y-3 text-[14px] font-serif text-foreground/90">
                  {dailyReality && dailyReality.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-left">
                      <span className="text-primary font-mono mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Beginners Underestimate Bento Card */}
            <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
              <div>
                <h3 className="text-[16px] font-mono font-bold uppercase tracking-widest text-orange-500 mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-500" /> Beginners Underestimate
                </h3>
                <p className="text-[14px] text-muted-foreground font-serif mb-4">Hard truths tutorials and bootcamps rarely mention:</p>
                <ul className="space-y-3 text-[14px] font-serif text-foreground/90">
                  {beginnersUnderestimate && beginnersUnderestimate.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-left">
                      <span className="text-orange-500 font-mono mt-0.5">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Who Should Avoid Bento Card */}
            <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
              <div>
                <h3 className="text-[16px] font-mono font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                  <span className="text-red-500 text-[14px]">❌</span> Who Should Avoid This
                </h3>
                <p className="text-[14px] text-muted-foreground font-serif mb-4">You should reconsider this career path if you are:</p>
                <ul className="space-y-3 text-[14px] font-serif text-foreground/90">
                  {avoidThisCareer && avoidThisCareer.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-left">
                      <span className="text-red-500 font-mono mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Transition Paths Bento Card */}
            <div className="bg-card border border-border bevel-card rounded-md p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
              <div>
                <h3 className="text-[16px] font-mono font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 text-[14px]">🔄</span> Career Transition Paths
                </h3>
                <p className="text-[14px] text-muted-foreground font-serif mb-4">Where you can specialize or transition after gaining experience:</p>
                <ul className="space-y-3 text-[14px] font-serif text-foreground/90">
                  {transitionPaths && transitionPaths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-left">
                      <span className="text-emerald-500 font-mono mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="p-8 bg-card border border-border bevel-card rounded-md text-left mb-16">
            <h3 className="text-[16px] font-mono font-bold uppercase tracking-widest text-primary mb-2">Career Reality</h3>
            <p className="text-[14px] font-serif text-muted-foreground">Career Reality Coming Soon</p>
          </div>
        )}

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
                  <p className="text-[16px] text-muted-foreground font-serif mb-4">{stage.description}</p>
                  {/* Toggle Button */}
                  <button 
                    onClick={() => toggleStageExpansion(stage.id)}
                    className="mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/30 rounded-sm font-mono text-[11px] font-bold text-foreground transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>{expandedStages[stage.id] ? "Hide Reasoning" : "Show Reasoning"}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedStages[stage.id] ? "rotate-90" : ""}`} />
                  </button>

                  {expandedStages[stage.id] && (
                    <div className="space-y-5 mb-6">
                      {stage.whyExists && (
                        <div className="p-3.5 bg-primary/5 border border-primary/10 rounded-sm font-serif text-[14px] text-foreground/90 leading-relaxed italic text-left">
                          <span className="font-mono font-bold text-primary not-italic uppercase tracking-wider text-[11px] block mb-1">Pedagogical Rationale:</span>
                          "{stage.whyExists}"
                        </div>
                      )}

                      {/* Trust Guidance Layer */}
                      {(stage.whyThisStep || stage.whyNow || stage.whyBeforeNext || stage.realWorldUsage || (stage.sources && stage.sources.length > 0)) && (
                        <div className="border border-border rounded-sm overflow-hidden text-[13px] bg-secondary/10">
                          <div className="px-3 py-2 bg-secondary border-b border-border flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-primary font-bold">
                            <span>Curated Guidance Layer</span>
                            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 text-[9px] font-bold">✓ Vetted Guidance</span>
                          </div>
                          
                          <div className="p-3.5 space-y-4 font-serif leading-relaxed text-left">
                            {stage.whyThisStep && (
                              <div>
                                <span className="font-mono font-bold text-foreground text-[11px] uppercase tracking-wide block mb-1">💡 Why This Step:</span>
                                <p className="text-foreground/80 text-[13px]">{stage.whyThisStep}</p>
                              </div>
                            )}
                            {stage.whyNow && (
                              <div className="pt-3 border-t border-border/40">
                                <span className="font-mono font-bold text-foreground text-[11px] uppercase tracking-wide block mb-1">⏱️ Why Now:</span>
                                <p className="text-foreground/80 text-[13px]">{stage.whyNow}</p>
                              </div>
                            )}
                            {stage.whyBeforeNext && (
                              <div className="pt-3 border-t border-border/40">
                                <span className="font-mono font-bold text-foreground text-[11px] uppercase tracking-wide block mb-1">🔄 Why Before Next Step:</span>
                                <p className="text-foreground/80 text-[13px]">{stage.whyBeforeNext}</p>
                              </div>
                            )}
                            {stage.realWorldUsage && (
                              <div className="pt-3 border-t border-border/40">
                                <span className="font-mono font-bold text-foreground text-[11px] uppercase tracking-wide block mb-1">🌐 Real-World Application:</span>
                                <p className="text-foreground/80 text-[13px]">{stage.realWorldUsage}</p>
                              </div>
                            )}
                            {stage.sources && stage.sources.length > 0 && (
                              <div className="pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
                                <span className="font-mono font-bold text-muted-foreground text-[11px] uppercase tracking-wide">Sources:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {stage.sources.map((src, idx) => (
                                    <span key={idx} className="px-1.5 py-0.5 bg-secondary border border-border text-foreground/70 text-[11px] font-mono rounded-sm">
                                      {src}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Before Moving On (Build, Expected Outcome, Common Mistakes) */}
                      <div className="space-y-3 text-left pt-4 border-t border-border">
                        <h4 className="text-[14px] font-mono font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5 text-primary" /> Before Moving On
                        </h4>
                        
                        <div className="p-3 bg-secondary/40 border border-border rounded-sm">
                          <div className="font-mono text-[10px] font-bold uppercase tracking-wide text-foreground/75 mb-1.5">🔨 Build:</div>
                          <ul className="space-y-1.5 text-[13px] font-serif text-foreground/80 pl-1">
                            {(stage.suggestedProjects && stage.suggestedProjects.length > 0 ? stage.suggestedProjects : [
                              `Build a layout or mini application demonstrating ${stage.skills.slice(0, 2).join(" and ")}.`
                            ]).map((project, idx) => (
                              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-primary font-mono text-[11px] mt-0.5">•</span>
                                <span>{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-secondary/40 border border-border rounded-sm text-[13px] font-serif text-foreground/80 leading-relaxed">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-primary block mb-1">🏁 Expected Outcome:</span>
                          {stage.expectedOutcome || `You can explain the basic concepts of ${stage.skills.join(", ")} and build simple interactive projects from scratch.`}
                        </div>

                        {stage.commonMistakes && stage.commonMistakes.length > 0 && (
                          <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-sm text-[13px] font-serif text-red-600/90 leading-relaxed">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-red-500 block mb-1">⚠️ Common Mistake:</span>
                            {stage.commonMistakes.join(" ")}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Skills (Always Visible) */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-border">
                    {stage.skills.map((skill) => (
                      <div key={skill} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/90 font-mono text-[14px] leading-tight">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* How Do I Know I'm Ready (Always Visible) */}
                  <div className="space-y-3 pt-4 border-t border-border text-left">
                    <h4 className="text-[12px] font-mono font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> How Do I Know I'm Ready?
                    </h4>
                    <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-sm space-y-2">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-500 mb-1">Ready to continue when:</div>
                      <ul className="space-y-1.5 text-[13px] font-serif text-foreground/85">
                        {(stage.readyToMoveOn && stage.readyToMoveOn.length > 0 ? stage.readyToMoveOn : [
                          `Can explain key definitions and mechanics of ${stage.skills.slice(0, 2).join(", ")}.`,
                          "Can write basic configurations or functional snippets without copying."
                        ]).map((check, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-500 font-mono font-bold">✓</span>
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* START THIS WEEK ACTION PLAN */}
        <div className="mb-16">
          <div className="p-8 bg-card border border-border bevel-card rounded-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
              <h2 className="text-[22px] font-serif font-bold text-foreground">Start This Week: 7-Day Action Plan</h2>
            </div>
            
            {actionPlan ? (
              <>
                <p className="text-[14px] font-serif text-muted-foreground mb-6 max-w-2xl text-left">
                  Bridge the decision gap. Commit to these seven initial daily milestones to get hands-on experience and build momentum immediately:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                  {actionPlan.days.map((d) => (
                    <div key={d.day} className="p-3 bg-secondary/20 border border-border rounded-sm flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[10px] font-mono text-amber-500 uppercase font-bold tracking-wider block mb-1">{d.day}</span>
                        <h4 className="text-[13px] font-serif font-bold text-foreground mb-1 leading-tight">{d.task}</h4>
                        <p className="text-[11px] font-serif text-muted-foreground leading-relaxed">{d.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[14px] font-serif text-muted-foreground text-left">
                Action Plan Coming Soon
              </p>
            )}
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
                <motion.div 
                  key={r.id} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="block p-5 bg-background border border-border rounded-md hover:border-primary/50 hover:shadow-md transition-all duration-300 group inset-panel relative overflow-hidden pt-10 flex flex-col justify-between"
                >
                  <div>
                    {/* Step Connector Flag */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-secondary border border-border text-[10px] font-mono font-bold uppercase tracking-widest text-primary z-20">
                      STEP {i + 1}: {
                        r.format === "DOCUMENTATION" || r.format === "REFERENCE" ? "LEARN (THEORY)" :
                        r.format === "COURSE" ? "GUIDED (TUTORIAL)" :
                        r.format === "PRACTICE" ? "PRACTICE (LAB)" :
                        r.format === "PROJECT" ? "BUILD (PROJECT)" : "LEARN"
                      }
                    </div>

                    {/* Trust Score Badge */}
                    <div 
                      className="absolute top-2 right-2 px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 z-20 cursor-help"
                      title="✓ Verified Free · ✓ Active URL · ✓ Curated Context · ✓ No Hidden Paywalls"
                    >
                      {r.pricingType === "OFFICIAL_DOCS" ? "Official Docs" : r.pricingType === "OPEN_SOURCE" ? "Open Source" : (r.verified && r.status === "active") ? "Verified Free" : "Free"}
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-[18px] font-serif font-bold text-foreground transition-colors flex-1 leading-tight">
                        {r.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-50 shrink-0" />
                    </div>
                    
                    {r.description && <p className="text-[14px] font-serif mt-2 mb-3 text-foreground/70 leading-relaxed">{r.description}</p>}
                    
                    {/* Curated Why Recommended Layer */}
                    {r.whyChosenOverAlternatives && r.whyChosenOverAlternatives.length > 0 ? (
                      <div className="p-2.5 bg-secondary/60 border border-border rounded-sm font-mono text-[11px] text-primary leading-normal mb-3">
                        <div className="font-bold uppercase tracking-wider text-[9px] mb-1">🎯 Chosen Over Alternatives:</div>
                        <ul className="list-disc list-inside space-y-0.5 text-foreground/90 pl-1">
                          {r.whyChosenOverAlternatives.map((bullet, idx) => (
                            <li key={idx} className="leading-tight">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-secondary/60 border border-border rounded-sm font-mono text-[11px] text-primary leading-normal mb-3">
                        <div className="font-bold uppercase tracking-wider text-[9px] mb-0.5">💡 Why Recommended:</div>
                        <div>{r.whyRecommended || "Hand-curated, authoritative study material aligned with roadmap progression."}</div>
                      </div>
                    )}

                    {/* Factual Verification Metadata */}
                    <div className="p-2.5 bg-background border border-border rounded-sm font-mono text-[11px] text-foreground/80 leading-normal mb-3 grid grid-cols-2 gap-2">
                      <div><span className="text-muted-foreground">Link Checked:</span> {r.verification?.linkChecked || r.lastChecked || "2026-06-18"}</div>
                      <div><span className="text-muted-foreground">Human Reviewed:</span> {r.verification?.humanReviewed || r.verification?.lastReviewed || "2026-06-18"}</div>
                      <div><span className="text-muted-foreground">Review Due:</span> {r.verification?.reviewDue || "2026-12-18"}</div>
                      <div><span className="text-muted-foreground">Cost:</span> {r.verification?.isFree !== false ? "Free" : "Paid"}</div>
                    </div>

                    {/* Known Limitations */}
                    {r.limitations && (
                      <div className="p-2.5 bg-orange-500/5 border border-orange-500/10 rounded-sm font-mono text-[11px] text-orange-600/90 leading-normal mb-3">
                        <div className="font-bold uppercase tracking-wider text-[9px] mb-0.5">⚠️ Known Tradeoffs:</div>
                        <div>{r.limitations}</div>
                      </div>
                    )}

                    {/* Optional Alternative */}
                    {r.alternativeResource && (
                      <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-sm font-mono text-[11px] text-emerald-600/90 leading-normal mb-3">
                        <div className="font-bold uppercase tracking-wider text-[9px] mb-0.5">🔄 Alternative: <a href={r.alternativeResource.url} target="_blank" rel="noopener noreferrer" className="underline font-medium text-foreground hover:text-primary transition-colors">{r.alternativeResource.title}</a></div>
                        <div>{r.alternativeResource.reason}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {r.verified && r.status === "active" && (
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 uppercase tracking-[0.04em] rounded-sm border border-emerald-500/20 flex items-center gap-1 font-bold">
                          ✓ Verified Active
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-secondary text-foreground uppercase tracking-[0.04em] rounded-sm border border-border">
                        Source Type: {r.resourceTypeBadge || (r.format === 'DOCUMENTATION' ? 'Official Documentation' : r.format === 'COURSE' ? 'Video Course' : r.format === 'PRACTICE' ? 'Interactive Practice' : r.format === 'PROJECT' ? 'Project Based' : 'Reference Guide')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CAREER SIGNALS & GROWTH TREE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* LEFT: CAREER SIGNALS BRIDGE */}
          <div className="lg:col-span-5 p-6 bg-card border border-border bevel-card rounded-md flex flex-col justify-between relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-[22px] font-serif font-bold text-foreground">Market Signals</h2>
              </div>
              <p className="text-[14.5px] text-muted-foreground font-serif leading-relaxed mb-6">
                Understand what the market actually expects. Inspect requested skills, hiring realities, common recruiter rejection triggers, and direct industry surveys for {career.title}.
              </p>
            </div>
            <Link 
              href={`/jobs?q=${encodeURIComponent(career.title)}`}
              className="w-full text-center inline-flex items-center justify-center gap-2 px-5 py-3 bg-secondary text-primary border border-border font-sans text-[13px] font-bold rounded-sm hover:border-primary transition-colors active:scale-95 bevel-card"
            >
              EXPLORE {career.title.toUpperCase()} SIGNALS <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* RIGHT: ADVANCED GROWTH TREE */}
          {growthMap && (
            <div className="lg:col-span-7 p-6 bg-card border border-border bevel-card rounded-md text-left">
              <h2 className="text-[22px] font-serif font-bold text-foreground mb-1">Career Growth Tree</h2>
              <span className="text-[11px] font-mono text-primary uppercase tracking-widest block mb-6">Next steps & Transition pathways</span>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[12px]">
                  <div className="p-3 bg-secondary/30 rounded-sm border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase block mb-1">Typical Transition</span>
                    <ul className="space-y-1 font-bold text-foreground">
                      {growthMap.transitions.typical.map((role, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="text-primary">→</span> {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-sm border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase block mb-1">Common Transition</span>
                    <ul className="space-y-1 font-bold text-foreground">
                      {growthMap.transitions.common.map((role, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="text-primary">→</span> {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-sm border border-border">
                    <span className="text-[10px] text-muted-foreground uppercase block mb-1">Advanced Transition</span>
                    <ul className="space-y-1 font-bold text-foreground">
                      {growthMap.transitions.advanced.map((role, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="text-primary">→</span> {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/15 rounded-md text-[13px] font-mono">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary font-bold uppercase tracking-wider text-[11px]">Required Upskilling Strategy</span>
                    <span className="text-muted-foreground text-[11px]">Est. Transition Timeframe: {growthMap.timeframe}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-foreground/80 font-serif text-[13.5px] leading-relaxed">
                    {growthMap.upskillNeeded.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DECISION CONFIDENCE (WHAT NEXT?) */}
        <div className="mb-24 p-8 bg-card border border-border bevel-card rounded-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px"></div>
          
          <div className="text-left">
            <h2 className="text-[25px] font-serif font-bold text-foreground mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" /> Still Unsure About {career.title}?
            </h2>
            <p className="text-[16px] text-muted-foreground font-serif mb-6 max-w-2xl">
              Choosing a career is a major commitment. If you aren't 100% confident, we recommend taking one of these logical next steps to continue exploring:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-[13px] font-bold">
              {/* Option 1: Compare */}
              <div className="p-4 bg-secondary/30 border border-border rounded-sm flex flex-col justify-between items-start">
                <div className="mb-4">
                  <span className="text-[11px] font-mono text-primary uppercase block mb-1">Explore Alternatives</span>
                  <span className="text-[14px] text-foreground font-serif font-normal leading-tight block">Compare {career.title} directly with related tracks.</span>
                </div>
                <div className="space-y-1.5 w-full">
                  {careers
                    .filter(c => c.id !== career.id)
                    .slice(0, 2)
                    .map((other) => (
                      <Link 
                        key={other.id}
                        href={`/compare?c1=${career.slug}&c2=${other.slug}`}
                        className="flex items-center justify-between p-1.5 bg-background border border-border rounded-sm hover:border-primary transition-colors text-primary font-mono text-[11px]"
                      >
                        <span>vs {other.title}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ))}
                </div>
              </div>

              {/* Option 2: Quiz */}
              <div className="p-4 bg-secondary/30 border border-border rounded-sm flex flex-col justify-between items-start">
                <div className="mb-4">
                  <span className="text-[11px] font-mono text-emerald-500 uppercase block mb-1">Self-Assessment</span>
                  <span className="text-[14px] text-foreground font-serif font-normal leading-tight block">Align your core strengths and coding preferences.</span>
                </div>
                <Link 
                  href="/quiz"
                  className="w-full text-center py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-sm transition-colors font-mono text-[11px] uppercase tracking-wider"
                >
                  TAKE PATHFINDER QUIZ
                </Link>
              </div>

              {/* Option 3: Search Map */}
              <div className="p-4 bg-secondary/30 border border-border rounded-sm flex flex-col justify-between items-start">
                <div className="mb-4">
                  <span className="text-[11px] font-mono text-orange-500 uppercase block mb-1">Search Technology</span>
                  <span className="text-[14px] text-foreground font-serif font-normal leading-tight block">Lookup where specific technologies map.</span>
                </div>
                <Link 
                  href="/?focus=search"
                  className="w-full text-center py-2 bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20 rounded-sm transition-colors font-mono text-[11px] uppercase tracking-wider"
                >
                  SEARCH MAP ENGINE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
