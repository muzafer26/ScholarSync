"use client";

import { useState, useMemo } from "react";
import { careers } from "@/lib/seed-careers";
import { resources } from "@/lib/seed-resources";
import { scholarships } from "@/lib/seed-scholarships";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, BookOpen, GraduationCap, Briefcase,
  ExternalLink, Star,
  Code, BarChart3, Palette, TrendingUp, Heart, Scale, Wrench,
  Landmark, Rocket, Target, Brain, Monitor, Megaphone, Atom,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Code, BarChart3, Palette, TrendingUp, Brain, Heart, Landmark, Target,
  Rocket, Scale, Monitor, BookOpen, GraduationCap, Megaphone, Atom, Wrench,
};

type Tab = "careers" | "resources" | "scholarships";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("careers");

  const filteredCareers = useMemo(() => {
    if (!query) return careers.slice(0, 6);
    return careers.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.field.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const filteredResources = useMemo(() => {
    if (!query) return resources.slice(0, 6);
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.source.toLowerCase().includes(query.toLowerCase()) ||
        r.topics.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const filteredScholarships = useMemo(() => {
    if (!query) return scholarships.slice(0, 6);
    return scholarships.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.provider.toLowerCase().includes(query.toLowerCase()) ||
        s.fields.some((f) => f.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const counts = {
    careers: filteredCareers.length,
    resources: filteredResources.length,
    scholarships: filteredScholarships.length,
  };

  return (
    <>
      <Header />
      <div className="page-container pb-16">
        <div className="page-header">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Search Everything</h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            Find careers, resources, and scholarships — all in one place.
          </p>
        </div>

        {/* Search box */}
        <div className="relative max-w-xl mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search careers, resources, scholarships..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 rounded-2xl text-base"
            autoFocus
          />
        </div>

        {/* Tab selector */}
        <div className="flex gap-2 mb-8">
          {([
            { key: "careers", label: "Careers", icon: Briefcase },
            { key: "resources", label: "Resources", icon: BookOpen },
            { key: "scholarships", label: "Scholarships", icon: GraduationCap },
          ] as const).map((t) => (
            <Button
              key={t.key}
              variant={tab === t.key ? "default" : "outline"}
              size="sm"
              onClick={() => setTab(t.key)}
              className="rounded-lg gap-2"
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              <span className="text-xs opacity-70">({counts[t.key]})</span>
            </Button>
          ))}
        </div>

        {/* Results */}
        {tab === "careers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCareers.map((career) => {
              const Ic = iconMap[career.icon] || Monitor;
              return (
                <Link key={career.id} href={`/explore/${career.slug}`} className="group">
                  <div className="glass-card p-5 card-hover h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Ic className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {career.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{career.field}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{career.shortDescription}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {tab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((r) => (
              <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="glass-card p-5 card-hover group block">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{r.source}</span>
                  <span className={cn("quality-badge", r.qualityScore >= 90 ? "quality-high" : "quality-mid")}>
                    <Star className="h-3 w-3" /> {r.qualityScore}
                  </span>
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-medium",
                    r.level === "beginner" && "level-beginner",
                    r.level === "intermediate" && "level-intermediate",
                    r.level === "advanced" && "level-advanced"
                  )}>{r.level}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                </div>
              </a>
            ))}
          </div>
        )}

        {tab === "scholarships" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScholarships.map((s) => (
              <div key={s.id} className="glass-card p-5 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className={cn("px-2 py-0.5 rounded-md text-xs font-medium",
                    s.country === "India" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  )}>{s.country}</span>
                  {s.isActive && <span className="text-xs text-emerald-500">Active</span>}
                </div>
                <h3 className="font-semibold text-sm mb-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{s.provider} · {s.amount}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{s.description}</p>
                <Button size="sm" asChild className="w-full rounded-lg">
                  <a href={s.applyUrl} target="_blank" rel="noopener noreferrer" className="gap-1">
                    Apply <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}

        {((tab === "careers" && filteredCareers.length === 0) ||
          (tab === "resources" && filteredResources.length === 0) ||
          (tab === "scholarships" && filteredScholarships.length === 0)) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>
    </>
  );
}
