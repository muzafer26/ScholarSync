"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { HelpCircle, RefreshCw, Trophy, ArrowRight, Flame } from "lucide-react";
import { careers as allCareers } from "@/lib/seed-careers";

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
    text: "What is your current professional/academic background?",
    category: "background",
    options: [
      { label: "Technical student", description: "BCA, CS, B.Tech or related technical degree", value: "tech_edu" },
      { label: "Non-Technical background", description: "Commerce, Arts, Business Administration (BBA)", value: "non_tech_edu" },
      { label: "Already Working", description: "Looking to switch careers or specialize further", value: "professional" },
      { label: "School Student", description: "Under 18, researching modern pathways", value: "school" }
    ]
  },
  {
    id: 2,
    text: "What is your preference regarding writing code?",
    category: "coding",
    options: [
      { label: "I love coding", description: "I want to build software systems, apps, and write logic.", value: "heavy_code" },
      { label: "Moderate or light coding", description: "I like tech, but want to keep programming minimal.", value: "light_code" },
      { label: "No coding at all", description: "I want to design products, research users, or write docs.", value: "no_code" },
      { label: "Data & Systems focus", description: "I prefer working with datasets and databases over building apps.", value: "data_code" }
    ]
  },
  {
    id: 3,
    text: "How do you feel about mathematics and statistics?",
    category: "math",
    options: [
      { label: "I love mathematics", description: "I have a strong analytical background and like complex math.", value: "heavy_math" },
      { label: "I prefer basic/practical math", description: "Basic algebra and logic are fine, but no complex formulas.", value: "basic_math" },
      { label: "I hate mathematics", description: "I want to avoid math entirely in my day-to-day career.", value: "no_math" }
    ]
  },
  {
    id: 4,
    text: "What is your primary career outcome objective?",
    category: "goal",
    options: [
      { label: "Hired as fast as possible", description: "High demand, beginner friendly, fast path to market.", value: "fast_hire" },
      { label: "Maximum salary potential", description: "Willing to spend 1+ years studying for elite compensation.", value: "high_salary" },
      { label: "Creative & Visual impact", description: "Designing interfaces, graphics, or frontend layouts.", value: "creative" },
      { label: "Security & Operations", description: "Protecting systems, scaling servers, automation.", value: "security_infra" }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<{
    slug: string;
    title: string;
    score: number;
    explanation: string;
    description: string;
  }[]>([]);

  const handleSelectOption = (category: string, value: string) => {
    const nextAnswers = { ...answers, [category]: value };
    setAnswers(nextAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(nextAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, string>) => {
    const scores = allCareers.map(career => {
      let score = 0;
      let reasons: string[] = [];

      const bg = finalAnswers["background"];
      const codePref = finalAnswers["coding"];
      const mathPref = finalAnswers["math"];
      const goalPref = finalAnswers["goal"];

      // 1. Coding Rules
      if (codePref === "heavy_code") {
        if (["frontend-developer", "backend-developer", "full-stack-developer", "java-developer", "game-developer"].includes(career.slug)) {
          score += 100;
          reasons.push("Matches your desire to build systems and write code.");
        }
        if (["ux-designer", "technical-writer"].includes(career.slug)) {
          score -= 100;
        }
      } else if (codePref === "light_code") {
        if (["qa-tester", "data-analyst", "mobile-developer"].includes(career.slug)) {
          score += 80;
          reasons.push("Perfect balance of software engagement without heavy core backend development.");
        }
      } else if (codePref === "no_code") {
        if (["ux-designer", "technical-writer"].includes(career.slug)) {
          score += 150;
          reasons.push("Zero-code requirements align perfectly with your career preferences.");
        } else {
          score -= 150; // Heavily penalize coding paths
        }
      } else if (codePref === "data_code") {
        if (["data-analyst", "data-scientist", "ai-engineer", "backend-developer"].includes(career.slug)) {
          score += 100;
          reasons.push("Aligns with a focus on data, databases, and structured schemas.");
        }
      }

      // 2. Math Rules
      if (mathPref === "heavy_math") {
        if (["ai-engineer", "data-scientist"].includes(career.slug)) {
          score += 120;
          reasons.push("Leverages your strong mathematical and analytical skills.");
        }
      } else if (mathPref === "no_math") {
        if (["ai-engineer", "data-scientist"].includes(career.slug)) {
          score -= 150; // Heavy penalty
        } else if (["frontend-developer", "ux-designer", "technical-writer", "qa-tester"].includes(career.slug)) {
          score += 50;
          reasons.push("Requires absolutely zero advanced mathematics.");
        }
      }

      // 3. Goal Rules
      if (goalPref === "fast_hire") {
        if (["qa-tester", "frontend-developer", "data-analyst"].includes(career.slug)) {
          score += 90;
          reasons.push("Has high entry-level volume and a shorter path to job readiness.");
        }
      } else if (goalPref === "high_salary") {
        if (["ai-engineer", "devops-engineer", "full-stack-developer"].includes(career.slug)) {
          score += 100;
          reasons.push("Offers elite tier salary structures at senior levels.");
        }
      } else if (goalPref === "creative") {
        if (["ux-designer", "frontend-developer"].includes(career.slug)) {
          score += 100;
          reasons.push("Visual rendering, interface building, and user layout mapping.");
        }
      } else if (goalPref === "security_infra") {
        if (["cybersecurity-analyst", "devops-engineer", "backend-developer"].includes(career.slug)) {
          score += 100;
          reasons.push("Involves system security, server scaling, and continuous deployment.");
        }
      }

      // 4. Background tweaks
      if (bg === "non_tech_edu" && ["ux-designer", "technical-writer", "data-analyst"].includes(career.slug)) {
        score += 40;
        reasons.push("Very welcoming to self-taught candidates from non-CS degrees.");
      }

      return {
        slug: career.slug,
        title: career.title,
        description: career.shortDescription,
        score,
        explanation: reasons.length > 0 ? reasons.join(" ") : "Matches your balanced input preferences."
      };
    });

    const sorted = scores.sort((a, b) => b.score - a.score).slice(0, 3);
    setRecommendations(sorted);
    setQuizComplete(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizComplete(false);
    setRecommendations([]);
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
              className="bg-card border border-border rounded-md p-8 bevel-card shadow-sm"
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
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-md p-8 bevel-card shadow-sm text-center">
                <div className="inline-flex h-12 w-12 bg-primary/10 border border-primary/20 rounded-full items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-[24px] font-serif font-bold text-foreground mb-2">Recommended Career Matches</h2>
                <p className="text-[14px] text-muted-foreground font-serif max-w-md mx-auto">
                  Based on your academic profile, coding style preferences, mathematical confidence, and career targets:
                </p>
              </div>

              {/* Recommendations List */}
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <motion.div
                    key={rec.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card border border-border rounded-md p-6 bevel-card flex flex-col md:flex-row items-start justify-between gap-4 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold flex items-center justify-center border border-primary/20">
                          #{idx + 1}
                        </span>
                        <h3 className="text-[18px] font-serif font-bold text-foreground">{rec.title}</h3>
                      </div>
                      <p className="text-[14px] text-muted-foreground font-serif leading-relaxed">
                        {rec.description}
                      </p>
                      
                      {/* Personal Rationale Callout */}
                      <div className="mt-3 p-3 bg-secondary/30 border border-border/40 rounded-sm text-[13px] font-mono text-foreground/80 flex items-start gap-2">
                        <Flame className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{rec.explanation}</span>
                      </div>
                    </div>

                    <Link 
                      href={`/explore/${rec.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 h-[35px] bg-secondary text-primary border border-border font-sans text-[13px] font-bold rounded-sm hover:border-primary transition-colors shrink-0 md:mt-2"
                    >
                      View Roadmap
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleRestart} 
                  variant="outline"
                  className="flex items-center gap-2 text-[13px] font-mono"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Restart Quiz
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
