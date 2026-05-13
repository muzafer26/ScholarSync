"use client";

import { PageIntro } from "@/components/ui/page-intro";

import { useState, useMemo } from "react";
import { careers } from "@/lib/seed-careers";
import { CAREER_FIELDS } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, TrendingUp, TrendingDown, Minus, ArrowRight, Filter,
  Code, BarChart3, Palette, Heart, Scale, Wrench, Landmark, Rocket,
  Target, Brain, BookOpen, GraduationCap, Megaphone, Atom, Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Code, BarChart3, Palette, TrendingUp, Brain, Heart, Landmark, Target,
  Rocket, Scale, Monitor, BookOpen, GraduationCap, Megaphone, Atom, Wrench,
};

const trendIcon = {
  rising: <TrendingUp className="h-3.5 w-3.5" />,
  stable: <Minus className="h-3.5 w-3.5" />,
  declining: <TrendingDown className="h-3.5 w-3.5" />,
};

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return careers.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchField = !selectedField || c.field === selectedField;
      return matchSearch && matchField;
    });
  }, [search, selectedField]);

  return (
    <>
      <Header />
      <PageIntro emoji="🚀" text="Launching career explorer...">
      <div className="page-container">
        {/* Page header */}
        <div className="page-header">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Explore Careers</h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            Visual roadmaps for every career path. Pick one to see the full journey — skills,
            resources, and milestones.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search careers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedField === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedField(null)}
              className="rounded-lg"
            >
              All
            </Button>
            {CAREER_FIELDS.slice(0, 8).map((field) => (
              <Button
                key={field.value}
                variant={selectedField === field.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedField(selectedField === field.value ? null : field.value)}
                className="rounded-lg"
              >
                {field.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
          {filtered.map((career, i) => {
            const IconComponent = iconMap[career.icon] || Monitor;
            return (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/explore/${career.slug}`} className="group block h-full">
                  <div className="glass-card p-6 h-full card-hover flex flex-col">
                    {/* Icon + Field */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                          career.demandTrend === "rising" && "trend-rising",
                          career.demandTrend === "stable" && "trend-stable",
                          career.demandTrend === "declining" && "trend-declining"
                        )}
                      >
                        {trendIcon[career.demandTrend]}
                        {career.demandTrend}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-semibold font-sans mb-1 group-hover:text-primary transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{career.field} · {career.subfield}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {career.shortDescription}
                    </p>

                    {/* Salary & Stages */}
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{career.avgSalaryIndia}</span>
                        <span className="mx-1">·</span>
                        {career.stages.length} stages
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No careers found matching your search.</p>
          </div>
        )}
      </div>
      </PageIntro>
    </>
  );
}
