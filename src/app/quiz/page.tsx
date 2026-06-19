"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { HelpCircle, RefreshCw, Trophy, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { careers as allCareers } from "@/lib/seed-careers";
import { getQuizExplanation } from "@/lib/quizExplanations";

interface Question {
  id: number;
  text: string;
  category: string;
  options: {
    label: string;
    description: string;
    value: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which of the following activities sounds most enjoyable to you?",
    category: "enjoyable",
    options: [
      { label: "Designing interfaces & visual widgets", description: "Polishing layout spacing, CSS alignment, and component visuals.", value: "visuals" },
      { label: "Writing server routing & scaling databases", description: "Designing database models, system APIs, and logic structures.", value: "systems" },
      { label: "Orchestrating stats & training model scripts", description: "Managing data flows, tuning parameters, and prompting LLMs.", value: "data_models" },
      { label: "Configuring servers & deployment pipelines", description: "Setting up CI/CD workflows, VM clusters, and networking protocols.", value: "infrastructure" }
    ]
  },
  {
    id: 2,
    text: "What frustrations or tasks would you want to avoid most?",
    category: "frustrates",
    options: [
      { label: "Wrangling CSS layouts & Safari rendering quirks", description: "I hate adjusting margins, typography spacing, and styling rules.", value: "styling_css" },
      { label: "Silent database locks & missing API payloads", description: "I don't want to debug database locks, connection leaks, and server errors.", value: "silent_db" },
      { label: "Complex mathematical theories & statistical modeling", description: "Linear algebra, advanced probability, and tuning weights sound exhausting.", value: "heavy_math" },
      { label: "Midnight server alerts & on-call operations duty", description: "I hate managing live system warnings, YAML configs, and system crashes.", value: "server_ops" }
    ]
  },
  {
    id: 3,
    text: "How much coding (writing code files) do you want in your day-to-day?",
    category: "coding",
    options: [
      { label: "Heavy coding — I want to live in code files", description: "Writing application logic, algorithms, or complex hooks.", value: "heavy" },
      { label: "Moderate coding — mix of scripting, config, and tools", description: "Writing scripts and configurations, but not building full apps.", value: "moderate" },
      { label: "Zero coding — I prefer design, docs, or manual processes", description: "Working visually in Figma or writing developer documentation.", value: "zero" }
    ]
  },
  {
    id: 4,
    text: "How much advanced mathematics are you willing to tolerate?",
    category: "math",
    options: [
      { label: "High tolerance — I like linear algebra & statistics", description: "Required for advanced AI modelling and statistical analyses.", value: "high" },
      { label: "Basic/Practical math — algebra & logic gates only", description: "Standard programming loops and comparison operators.", value: "basic" },
      { label: "Zero tolerance — I want absolutely no math", description: "Prefer to focus strictly on text, design, or configs.", value: "none" }
    ]
  },
  {
    id: 5,
    text: "If you had to build one piece of a modern application, which would you pick?",
    category: "buildTarget",
    options: [
      { label: "Visual layouts, interactive buttons, and styles", description: "Creating the user interface (Frontend).", value: "visuals" },
      { label: "Secure APIs, logical routes, and database pipelines", description: "Creating the background logic (Backend).", value: "systems" },
      { label: "Data charts, prediction models, and prompt checks", description: "Setting up prediction models (AI Engineering).", value: "data_models" },
      { label: "Deployment scripts, automated builds, and networks", description: "Automating cloud deployment (DevOps / Infrastructure).", value: "infrastructure" }
    ]
  }
];

interface QuizResults {
  recommendedSlug: string;
  secondSlug: string;
  eliminatedSlugs: string[];
  selectionSummary: string[];
  reasoning: string;
  explanationData: {
    recommendedReason: string;
    secondReason: string;
    eliminatedReason: string;
  };
}

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);

  const handleSelectOption = (category: string, value: string) => {
    const nextAnswers = { ...answers, [category]: value };
    setAnswers(nextAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      processDecisionEngine(nextAnswers);
    }
  };

  const processDecisionEngine = (finalAnswers: Record<string, string>) => {
    const enjoyable = finalAnswers["enjoyable"];
    const frustrates = finalAnswers["frustrates"];
    const coding = finalAnswers["coding"];
    const math = finalAnswers["math"];
    const buildTarget = finalAnswers["buildTarget"];

    // Initialize scores for our key tracks
    const scores: Record<string, number> = {
      "frontend-developer": 0,
      "backend-developer": 0,
      "devops-engineer": 0,
      "cloud-engineer": 0,
      "ai-engineer": 0,
      "cybersecurity-analyst": 0
    };

    // Keep track of explicit elimination flags
    const eliminated: string[] = [];

    // 1. Question 1 (Enjoyable) mapping
    if (enjoyable === "visuals") {
      scores["frontend-developer"] += 3;
    } else if (enjoyable === "systems") {
      scores["backend-developer"] += 3;
    } else if (enjoyable === "data_models") {
      scores["ai-engineer"] += 3;
    } else if (enjoyable === "infrastructure") {
      scores["devops-engineer"] += 3;
      scores["cloud-engineer"] += 3;
    }

    // 2. Question 2 (Frustrates) mapping -> HARD ELIMINATION
    if (frustrates === "styling_css") {
      eliminated.push("frontend-developer");
      scores["frontend-developer"] -= 10;
    } else if (frustrates === "silent_db") {
      eliminated.push("backend-developer");
      scores["backend-developer"] -= 10;
    } else if (frustrates === "heavy_math") {
      eliminated.push("ai-engineer");
      scores["ai-engineer"] -= 10;
    } else if (frustrates === "server_ops") {
      eliminated.push("devops-engineer");
      eliminated.push("cloud-engineer");
      scores["devops-engineer"] -= 10;
      scores["cloud-engineer"] -= 10;
    }

    // 3. Question 3 (Coding) mapping
    if (coding === "heavy") {
      scores["frontend-developer"] += 2;
      scores["backend-developer"] += 2;
      scores["ai-engineer"] += 2;
      scores["devops-engineer"] += 1;
    } else if (coding === "moderate") {
      scores["devops-engineer"] += 3;
      scores["cloud-engineer"] += 3;
      scores["cybersecurity-analyst"] += 2;
      scores["frontend-developer"] -= 1;
      scores["backend-developer"] -= 1;
    } else if (coding === "zero") {
      eliminated.push("frontend-developer");
      eliminated.push("backend-developer");
      eliminated.push("ai-engineer");
      scores["frontend-developer"] -= 15;
      scores["backend-developer"] -= 15;
      scores["ai-engineer"] -= 15;
      scores["devops-engineer"] -= 5;
    }

    // 4. Question 4 (Math) mapping
    if (math === "high") {
      scores["ai-engineer"] += 3;
    } else if (math === "basic") {
      scores["frontend-developer"] += 1;
      scores["backend-developer"] += 1;
      scores["devops-engineer"] += 1;
      scores["cloud-engineer"] += 1;
      scores["cybersecurity-analyst"] += 1;
      scores["ai-engineer"] -= 1;
    } else if (math === "none") {
      eliminated.push("ai-engineer");
      scores["ai-engineer"] -= 15;
      scores["frontend-developer"] += 2;
      scores["cybersecurity-analyst"] += 1;
    }

    // 5. Question 5 (Build Target) mapping
    if (buildTarget === "visuals") {
      scores["frontend-developer"] += 3;
    } else if (buildTarget === "systems") {
      scores["backend-developer"] += 3;
    } else if (buildTarget === "data_models") {
      scores["ai-engineer"] += 3;
    } else if (buildTarget === "infrastructure") {
      scores["devops-engineer"] += 3;
      scores["cloud-engineer"] += 3;
      scores["cybersecurity-analyst"] += 2;
    }

    // Summary of choices for review
    const selectionSummary: string[] = [];
    if (enjoyable) {
      const q = QUESTIONS[0].options.find(o => o.value === enjoyable);
      if (q) selectionSummary.push(`✓ Prefers: ${q.label}`);
    }
    if (frustrates) {
      const q = QUESTIONS[1].options.find(o => o.value === frustrates);
      if (q) selectionSummary.push(`✓ Avoids: ${q.label}`);
    }
    if (coding) {
      const q = QUESTIONS[2].options.find(o => o.value === coding);
      if (q) selectionSummary.push(`✓ Coding density: ${q.label}`);
    }
    if (math) {
      const q = QUESTIONS[3].options.find(o => o.value === math);
      if (q) selectionSummary.push(`✓ Math level: ${q.label}`);
    }

    // Process arrays into sorted recommendations
    const scoredCareers = Object.entries(scores).map(([slug, score]) => ({
      slug,
      score,
      isEliminated: eliminated.includes(slug)
    }));

    const survived = scoredCareers.filter(c => !c.isEliminated && c.score >= 0);
    const sortedSurvived = survived.sort((a, b) => b.score - a.score);

    let recommendedSlug = "frontend-developer";
    let secondSlug = "backend-developer";
    const finalEliminated = Array.from(new Set(scoredCareers.filter(c => c.isEliminated || c.score < 0).map(c => c.slug)));

    if (sortedSurvived.length > 0) {
      recommendedSlug = sortedSurvived[0].slug;
      if (sortedSurvived.length > 1) {
        secondSlug = sortedSurvived[1].slug;
      } else {
        const remaining = scoredCareers.filter(c => c.slug !== recommendedSlug).sort((a, b) => b.score - a.score);
        secondSlug = remaining[0]?.slug || "backend-developer";
      }
    } else {
      const fallbackSorted = scoredCareers.sort((a, b) => b.score - a.score);
      recommendedSlug = fallbackSorted[0].slug;
      secondSlug = fallbackSorted[1].slug;
    }

    const explanationData = getQuizExplanation(recommendedSlug, secondSlug, finalEliminated[0] || "ai-engineer");

    setResults({
      recommendedSlug,
      secondSlug,
      eliminatedSlugs: finalEliminated.length > 0 ? finalEliminated : ["ai-engineer"],
      selectionSummary,
      reasoning: explanationData.recommendedReason,
      explanationData
    });
    setQuizComplete(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizComplete(false);
    setResults(null);
  };

  const getCareerTitle = (slug: string): string => {
    return allCareers.find(c => c.slug === slug)?.title || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="page-container py-20 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!quizComplete ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-card border border-border rounded-md p-8 bevel-card shadow-sm text-left"
            >
              {/* Quiz Header Progress */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4.5 w-4.5 text-primary" />
                  <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {QUESTIONS.length}
                  </span>
                </div>
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Text */}
              <h2 className="text-[20px] font-serif font-bold text-foreground mb-6 leading-snug">
                {QUESTIONS[currentQuestionIndex].text}
              </h2>

              {/* Options Stack */}
              <div className="space-y-3">
                {QUESTIONS[currentQuestionIndex].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(QUESTIONS[currentQuestionIndex].category, opt.value)}
                    className="w-full text-left p-4 rounded-sm border border-border bg-background hover:bg-secondary/40 hover:border-primary/40 active:scale-[0.99] transition-all group relative overflow-hidden"
                  >
                    <div className="font-bold text-[15px] text-foreground group-hover:text-primary transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-[13px] text-muted-foreground mt-1 font-serif">
                      {opt.description}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-left"
              >
                <div className="bg-card border border-border rounded-md p-8 bevel-card shadow-sm text-center">
                  <div className="inline-flex h-12 w-12 bg-primary/10 border border-primary/20 rounded-full items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-[24px] font-serif font-bold text-foreground mb-2">Recommended Career Matches</h2>
                  <p className="text-[14px] text-muted-foreground font-serif max-w-md mx-auto">
                    We mapped your responses to find surviving pathways and filter out structural misfits.
                  </p>
                </div>

                {/* Why We Matched You Panel */}
                <div className="bg-card border border-border rounded-md p-6 bevel-card text-left space-y-4">
                  <h3 className="text-[18px] font-serif font-bold text-foreground">Why We Matched You</h3>
                  
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">You selected:</span>
                    <ul className="space-y-1.5 text-[13px] font-mono text-foreground/80">
                      {results.selectionSummary.map((sel, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span> {sel.replace("✓ ", "").replace("Prefers: ", "").replace("Avoids: ", "").replace("Coding density: ", "").replace("Math level: ", "")}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/60 space-y-2">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">Decision Engine Trace:</span>
                    <ul className="space-y-2.5 text-[13px] font-serif text-foreground/85 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-mono font-bold mt-0.5">✓</span>
                        <span><strong>{getCareerTitle(results.recommendedSlug)}</strong> survived. {results.explanationData.recommendedReason}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-mono font-bold mt-0.5">✓</span>
                        <span><strong>{getCareerTitle(results.secondSlug)}</strong> survived. {results.explanationData.secondReason}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-mono font-bold mt-0.5">✗</span>
                        <span><strong>{getCareerTitle(results.eliminatedSlugs[0] || "ai-engineer")}</strong> was eliminated or ranked lower. {results.explanationData.eliminatedReason}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Recommended Section Card */}
                <div className="bg-card border border-border rounded-md p-6 bevel-card relative overflow-hidden border-l-4 border-l-primary">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-primary uppercase font-bold tracking-widest block mb-1">Recommended Pathway</span>
                      <h3 className="text-[20px] font-serif font-bold text-foreground mb-3">{getCareerTitle(results.recommendedSlug)}</h3>
                      <p className="text-[14px] text-muted-foreground font-serif leading-relaxed">
                        Learn details, daily scenarios, and verify top curated free resources for this role.
                      </p>
                    </div>
                    <Link 
                      href={`/explore/${results.recommendedSlug}`}
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-primary text-primary-foreground font-mono text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-primary/95 transition-colors cursor-pointer shrink-0 mt-6"
                    >
                      Start Learning <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={handleRestart} 
                    variant="outline"
                    className="flex items-center gap-2 text-[13px] font-mono"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Restart Decision Engine
                  </Button>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
