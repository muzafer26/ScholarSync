"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { careers } from "@/lib/seed-careers";
import { resources } from "@/lib/seed-resources";
import { scholarships } from "@/lib/seed-scholarships";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, GraduationCap, MessageSquare, Compass,
  Sparkles, Clock, Target, TrendingUp,
  Code, BarChart3, Palette, Heart, Scale, Wrench, Landmark, Rocket,
  Brain, Monitor, Megaphone, Atom,
} from "lucide-react";
import type { OnboardingAnswers } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Code, BarChart3, Palette, TrendingUp, Brain, Heart, Landmark, Target,
  Rocket, Scale, Monitor, BookOpen, GraduationCap, Megaphone, Atom, Wrench,
};

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [onboarding, setOnboarding] = useState<OnboardingAnswers | null>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem("scholarsync-onboarding");
      if (data) setOnboarding(JSON.parse(data));
    } catch {}
  }, []);

  // Recommend careers based on onboarding interests
  const recommendedCareers = careers.slice(0, 4);
  const topResources = resources.slice(0, 4);
  const upcomingScholarships = scholarships.filter((s) => s.isActive).slice(0, 3);

  const greeting = user
    ? `Welcome${user.name ? `, ${user.name}` : ""}`
    : "Welcome to ScholarSync";

  return (
    <>
      <Header />
      <div className="page-container pb-16">
        {/* Greeting */}
        <div className="pt-8 pb-6 md:pt-12 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold">{greeting}</h1>
            <p className="mt-2 text-muted-foreground text-lg">
              {onboarding
                ? "Here's your personalized learning dashboard."
                : "Start by taking the onboarding quiz to get personalized recommendations."}
            </p>
          </motion.div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { href: "/explore", icon: Compass, label: "Explore Careers", color: "text-teal-500", bg: "bg-teal-500/10" },
            { href: "/resources", icon: BookOpen, label: "Resources", color: "text-amber-500", bg: "bg-amber-500/10" },
            { href: "/scholarships", icon: GraduationCap, label: "Scholarships", color: "text-rose-500", bg: "bg-rose-500/10" },
            { href: "/sage", icon: MessageSquare, label: "Ask Sage AI", color: "text-violet-500", bg: "bg-violet-500/10" },
          ].map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <div className="glass-card p-4 card-hover text-center">
                <div className={cn("inline-flex p-2.5 rounded-xl mb-2", action.bg)}>
                  <action.icon className={cn("h-5 w-5", action.color)} />
                </div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {action.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* If no onboarding, prompt */}
        {!onboarding && (
          <div className="glass-card p-8 text-center mb-10 glow-primary">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-display font-bold mb-2">Personalize your experience</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Take a 60-second quiz and we&apos;ll create a custom career roadmap with free resources tailored to you.
            </p>
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/onboarding">
                Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* Recommended Careers */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-display font-bold">Recommended Careers</h2>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
              <Link href="/explore" className="gap-1">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedCareers.map((career) => {
              const Ic = iconMap[career.icon] || Monitor;
              return (
                <Link key={career.id} href={`/explore/${career.slug}`} className="group">
                  <div className="glass-card p-5 card-hover h-full">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                      <Ic className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{career.shortDescription}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">{career.avgSalaryIndia}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Top Resources */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-display font-bold">Top Free Resources</h2>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
              <Link href="/resources" className="gap-1">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topResources.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 card-hover group flex gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">{r.source}</span>
                    <span className={cn(
                      "quality-badge",
                      r.qualityScore >= 90 ? "quality-high" : "quality-mid"
                    )}>
                      {r.qualityScore}/100
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                </div>
                <div className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-medium h-fit",
                  r.level === "beginner" && "level-beginner",
                  r.level === "intermediate" && "level-intermediate",
                  r.level === "advanced" && "level-advanced"
                )}>
                  {r.level}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Upcoming Scholarships */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-display font-bold">Upcoming Scholarships</h2>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
              <Link href="/scholarships" className="gap-1">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingScholarships.map((s) => (
              <div key={s.id} className="glass-card p-5">
                <h3 className="font-semibold text-sm mb-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{s.provider}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" /> Deadline: {s.deadline}
                </div>
                <div className="flex items-center gap-2 text-xs font-medium mt-2">
                  <Target className="h-3 w-3 text-primary" /> {s.amount}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
