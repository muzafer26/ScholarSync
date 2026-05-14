"use client";

import { use } from "react";
import { careers } from "@/lib/seed-careers";
import { resources } from "@/lib/seed-resources";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, TrendingUp, TrendingDown, Minus, MapPin,
  ExternalLink, BookOpen, CheckCircle2, ChevronRight,
  Code, BarChart3, Palette, Heart, Scale, Wrench, Landmark, Rocket,
  Target, Brain, Monitor, GraduationCap, Megaphone, Atom, Sparkles,
  Shield, Cloud, Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  Code, BarChart3, Palette, TrendingUp, Brain, Heart, Landmark, Target,
  Rocket, Scale, Monitor, BookOpen, GraduationCap, Megaphone, Atom, Wrench,
  Shield, Cloud, Star
};

export default function CareerRoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const career = careers.find((c) => c.slug === slug);

  if (!career) {
    notFound();
  }

  const IconComponent = iconMap[career.icon] || Monitor;

  // Get related resources for this career's field
  const fieldResources = resources.filter(
    (r) => r.field === career.field || r.field === career.subfield
  ).slice(0, 6);

  const relatedCareers = careers.filter((c) => career.relatedCareers.includes(c.id));

  return (
    <>
      <Header />
      <div className="page-container pb-16">
        {/* Breadcrumb */}
        <div className="pt-6 pb-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link>
        </div>

        {/* Hero */}
        <div className="border-b border-border pb-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
              <IconComponent className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">{career.title}</h1>
              <p className="text-muted-foreground mt-1">
                {career.field} · {career.subfield}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
            {career.description}
          </p>

          {career.roadmapShUrl && (
            <div className="mb-8">
              <Button asChild variant="outline" className="rounded-full gap-2 border-primary/50 text-primary hover:bg-primary/5">
                <a href={career.roadmapShUrl} target="_blank" rel="noopener noreferrer">
                  <Sparkles className="h-4 w-4" />
                  View Authentic Roadmap on roadmap.sh
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          )}

          {/* Meta cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground mb-1">Avg Salary (India)</p>
              <p className="font-semibold">{career.avgSalaryIndia}</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground mb-1">Avg Salary (Global)</p>
              <p className="font-semibold">{career.avgSalaryGlobal}</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground mb-1">Demand Trend</p>
              <p className={cn(
                "font-semibold capitalize inline-flex items-center gap-1",
                career.demandTrend === "rising" && "text-emerald-600 dark:text-emerald-400",
                career.demandTrend === "stable" && "text-blue-600 dark:text-blue-400",
                career.demandTrend === "declining" && "text-rose-600 dark:text-rose-400"
              )}>
                {career.demandTrend === "rising" && <TrendingUp className="h-4 w-4" />}
                {career.demandTrend === "stable" && <Minus className="h-4 w-4" />}
                {career.demandTrend === "declining" && <TrendingDown className="h-4 w-4" />}
                {career.demandTrend}
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Stages</p>
              <p className="font-semibold">{career.stages.length} stages</p>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8">Your Roadmap</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {career.stages.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center z-10 flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{stage.order}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="glass-card p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="md:hidden text-xs text-primary font-bold">Stage {stage.order}</span>
                        <h3 className="text-lg font-semibold font-sans">{stage.title}</h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        <Clock className="h-3 w-3" /> {stage.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Skills to learn
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestones */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Milestones
                      </p>
                      <ul className="space-y-1.5">
                        {stage.milestones.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Resources */}
        {fieldResources.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Recommended Resources</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources" className="gap-1">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fieldResources.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-5 card-hover group block"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                      {r.source}
                    </span>
                    <span className={cn(
                      "quality-badge",
                      r.qualityScore >= 90 ? "quality-high" : r.qualityScore >= 70 ? "quality-mid" : "quality-low"
                    )}>
                      {r.qualityScore}/100
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-xs font-medium",
                      r.level === "beginner" && "level-beginner",
                      r.level === "intermediate" && "level-intermediate",
                      r.level === "advanced" && "level-advanced"
                    )}>
                      {r.level}
                    </span>
                    {r.duration && <span>· {r.duration}</span>}
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Careers */}
        {relatedCareers.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">Related Careers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedCareers.map((rc) => {
                const RcIcon = iconMap[rc.icon] || Monitor;
                return (
                  <Link key={rc.id} href={`/explore/${rc.slug}`} className="group">
                    <div className="glass-card p-5 card-hover flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                        <RcIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {rc.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{rc.field}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
