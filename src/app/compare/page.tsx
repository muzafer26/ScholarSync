"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { careers } from "@/lib/seed-careers";
import { ArrowLeftRight, X, ArrowRight, Check, Sparkles, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Career } from "@/types";

const getBestSuitedFor = (slug: string): string => {
  const SUITED: Record<string, string> = {
    "frontend-developer": "People who love visual, fast-feedback work and building interfaces.",
    "backend-developer": "People who like systems, APIs, database design, and logic.",
    "java-developer": "Enterprise software developers interested in robust, large-scale systems.",
    "full-stack-developer": "Generalists who want to build end-to-end applications from database to UI.",
    "data-scientist": "Analytically minded people who enjoy finding patterns in data and math.",
    "ai-engineer": "People comfortable with math, neural networks, and experimentation.",
    "devops-engineer": "System builders who love automation, scaling servers, and infrastructure.",
    "mobile-developer": "Developers wanting to build fast, tactile mobile applications.",
    "ux-designer": "Creative problem solvers focused on user research, wireframes, and design.",
    "cybersecurity-analyst": "Security-focused minds who enjoy threat hunting and network defense.",
    "qa-tester": "Detail-oriented testers who like automation and breaking software to improve it.",
    "data-analyst": "Business-minded people who enjoy building dashboards and querying databases.",
    "game-developer": "Creatives who love interactive stories, 3D math, and game loop design.",
    "technical-writer": "Communicators who enjoy explaining complex technologies to other developers."
  };
  return SUITED[slug] || "Aspiring builders seeking structured career roadmaps.";
};

const parseDurationToMonths = (durationStr: string): number => {
  const clean = durationStr.toLowerCase();
  const num = parseFloat(clean) || 0;
  if (clean.includes("week")) {
    return num / 4;
  }
  return num;
};

const getDurationSum = (career: Career): string => {
  let totalMonths = 0;
  career.stages.forEach(s => {
    totalMonths += parseDurationToMonths(s.duration);
  });
  if (totalMonths === 0) return "6 Months";
  if (totalMonths < 1) {
    const weeks = Math.round(totalMonths * 4);
    return `${weeks} ${weeks === 1 ? 'Week' : 'Weeks'}`;
  }
  const months = Math.round(totalMonths * 10) / 10;
  return `${months} ${months === 1 ? 'Month' : 'Months'}`;
};

const getMathIntensity = (career: Career): "Low" | "Medium" | "High" => {
  const skillsStr = career.stages.flatMap(st => st.skills).join(" ").toLowerCase();
  const descStr = career.stages.map(st => st.description).join(" ").toLowerCase() + " " + career.description.toLowerCase();
  if (
    skillsStr.includes("calculus") || skillsStr.includes("linear algebra") || skillsStr.includes("statistics") ||
    skillsStr.includes("probability") || skillsStr.includes("3d math") ||
    descStr.includes("calculus") || descStr.includes("linear algebra") || descStr.includes("statistics")
  ) {
    return "High";
  }
  if (skillsStr.includes("math") || descStr.includes("math") || skillsStr.includes("metrics") || descStr.includes("metrics")) {
    return "Medium";
  }
  return "Low";
};

export default function CareerComparePage() {
  return (
    <Suspense fallback={
      <div className="bg-background min-h-screen">
        <Header />
        <div className="page-container pt-28 pb-20 text-center">
          <div className="animate-pulse space-y-4 max-w-xl mx-auto">
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto"></div>
            <div className="h-12 bg-secondary rounded w-2/3 mx-auto"></div>
            <div className="h-6 bg-secondary rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read slugs from URL query param: careers=frontend-developer,backend-developer
  const urlSlugs = useMemo(() => {
    const param = searchParams.get("careers");
    if (!param) return ["frontend-developer", "backend-developer"];
    return param.split(",").filter(Boolean).slice(0, 3);
  }, [searchParams]);

  // Update query params when selection changes
  const updateUrl = (nextSlugs: string[]) => {
    const next = nextSlugs.filter(Boolean).slice(0, 3);
    router.replace(`/compare?careers=${next.join(",")}`);
  };

  const selectedCareers = useMemo(() => {
    return urlSlugs.map(slug => careers.find(c => c.slug === slug)).filter(Boolean) as Career[];
  }, [urlSlugs]);

  const handleCareerChange = (index: number, newSlug: string) => {
    const next = [...urlSlugs];
    next[index] = newSlug;
    updateUrl(next);
  };

  const handleRemoveCareer = (index: number) => {
    if (urlSlugs.length <= 1) return; // Must keep at least one
    const next = urlSlugs.filter((_, i) => i !== index);
    updateUrl(next);
  };

  const handleAddColumn = () => {
    if (urlSlugs.length >= 3) return;
    // Find a career not yet selected
    const remaining = careers.find(c => !urlSlugs.includes(c.slug));
    if (remaining) {
      updateUrl([...urlSlugs, remaining.slug]);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="page-container pt-28 pb-20">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-sm">
            Interactive Comparison Tool
          </span>
          <h1 className="text-[34px] font-serif font-bold text-foreground mt-4 tracking-tight">
            Compare Career Pipelines
          </h1>
          <p className="text-[15px] font-serif text-muted-foreground mt-2">
            Compare difficulty, math requirements, salaries, and typical durations side by side.
          </p>
        </div>

        {/* Selected Careers Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10 p-5 bg-card border border-border bevel-card rounded-md max-w-4xl mx-auto">
          {urlSlugs.map((slug, idx) => (
            <div key={idx} className="relative">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-2 flex justify-between">
                <span>Column {idx + 1}</span>
                {urlSlugs.length > 1 && (
                  <button 
                    onClick={() => handleRemoveCareer(idx)}
                    className="text-muted-foreground hover:text-red-500 transition-colors text-[10px]"
                  >
                    Remove
                  </button>
                )}
              </label>
              <select
                value={slug}
                onChange={(e) => handleCareerChange(idx, e.target.value)}
                className="w-full p-2.5 bg-background border border-border rounded-sm text-[14px] focus:outline-none focus:border-primary text-foreground font-sans font-medium"
              >
                {careers.map(c => (
                  <option key={c.id} value={c.slug} disabled={urlSlugs.includes(c.slug) && c.slug !== slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {urlSlugs.length < 3 && (
            <div className="flex justify-center pt-4 md:pt-6 md:col-start-3">
              <button
                onClick={handleAddColumn}
                className="text-[12px] font-mono font-bold uppercase tracking-widest text-primary hover:text-primary-hover border border-dashed border-primary/40 hover:border-primary px-4 py-2 rounded-sm transition-all"
              >
                + Add Career to Compare
              </button>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {selectedCareers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto border border-border rounded-md overflow-hidden bg-card shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="p-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground w-1/4">Metric</th>
                    {selectedCareers.map((c) => (
                      <th key={c.id} className="p-4 font-serif text-[18px] font-bold text-primary">
                        <div className="flex items-center justify-between">
                          <span>{c.title}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-serif text-[14px] text-foreground">
                  {/* Parent Field */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Parent Field</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4 font-bold">{c.field}</td>
                    ))}
                  </tr>

                  {/* Average Salary (India) */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Salary (India)</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4 font-mono font-bold text-emerald-500">{c.avgSalaryIndia}</td>
                    ))}
                  </tr>

                  {/* Average Salary (Global) */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Salary (Global)</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4 font-mono text-emerald-500">{c.avgSalaryGlobal}</td>
                    ))}
                  </tr>

                  {/* Demand Trend */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Demand Trend</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4 capitalize">
                        <span className={`px-2 py-0.5 rounded-sm font-mono text-[11px] uppercase font-bold border ${c.demandTrend === "rising" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"}`}>
                          {c.demandTrend}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Time to Job-Ready */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Time to Job-Ready</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4 font-bold text-foreground/90">{getDurationSum(c)}</td>
                    ))}
                  </tr>

                  {/* Total Roadmap Stages */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Roadmap Stages</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4 font-bold">{c.stages.length} Milestones</td>
                    ))}
                  </tr>

                  {/* Math Intensity */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Math Intensity</td>
                    {selectedCareers.map((c) => {
                      const intensity = getMathIntensity(c);
                      return (
                        <td key={c.id} className="p-4">
                          <span className={`px-2 py-0.5 rounded-sm font-mono text-[11px] uppercase font-bold border ${intensity === "High" ? "bg-red-500/10 text-red-500 border-red-500/20" : intensity === "Medium" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"}`}>
                            {intensity}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Best Suited For */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Best Suited For</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4 text-[13px] text-foreground/80 leading-relaxed font-serif">
                        {getBestSuitedFor(c.slug)}
                      </td>
                    ))}
                  </tr>

                  {/* Core Skills */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Core Skills</td>
                    {selectedCareers.map((c) => {
                      const skills = Array.from(new Set(c.stages.flatMap(st => st.skills)));
                      return (
                        <td key={c.id} className="p-4">
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {skills.slice(0, 6).map(s => (
                              <span key={s} className="px-2 py-0.5 bg-secondary text-foreground text-[11px] font-mono rounded-sm border border-border">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-4 font-mono text-[11px] uppercase text-muted-foreground">Roadmap</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id} className="p-4">
                        <Link href={`/explore/${c.slug}`} className="text-primary font-bold hover:text-primary-hover inline-flex items-center gap-1 group/btn">
                          View Roadmap <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Still Not Sure Callout */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <div className="surface p-8 rounded-xl border border-dashed border-border bevel-card bg-secondary/15">
            <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-[19px] font-serif font-bold mb-2">Still not sure which path to choose?</h3>
            <p className="text-[14px] font-serif text-muted-foreground mb-4">
              Explore our full database of career fields, compensation distributions, and skill checkpoints.
            </p>
            <Link href="/explore">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-mono text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary/95 shadow-sm transition-colors cursor-pointer">
                Back to Database Explorer <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
