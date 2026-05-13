"use client";

import { PageIntro } from "@/components/ui/page-intro";

import { useState, useMemo } from "react";
import { resources } from "@/lib/seed-resources";
import { CAREER_FIELDS, RESOURCE_FORMATS, SKILL_LEVELS } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search, ExternalLink, Star, ThumbsUp, Filter, X,
  Play, FileText, GraduationCap, BookOpen, MousePointer,
} from "lucide-react";
import { cn } from "@/lib/utils";

const formatIcons: Record<string, React.ElementType> = {
  video: Play,
  text: FileText,
  course: GraduationCap,
  book: BookOpen,
  interactive: MousePointer,
};

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return resources
      .filter((r) => {
        const matchSearch = !search ||
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.source.toLowerCase().includes(search.toLowerCase()) ||
          r.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchField = !selectedField || r.field === selectedField;
        const matchLevel = !selectedLevel || r.level === selectedLevel;
        const matchFormat = !selectedFormat || r.format === selectedFormat;
        return matchSearch && matchField && matchLevel && matchFormat;
      })
      .sort((a, b) => b.qualityScore - a.qualityScore || b.votes - a.votes);
  }, [search, selectedField, selectedLevel, selectedFormat]);

  const hasFilters = selectedField || selectedLevel || selectedFormat;

  return (
    <>
      <Header />
      <PageIntro emoji="📚" text="Opening the library...">
      <div className="page-container">
        <div className="page-header">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Free Resource Library</h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            Curated collection of the best free courses, tutorials, and books — quality-ranked and always free.
          </p>
        </div>

        {/* Search & Filter toggle */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources, topics, or sources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2 rounded-lg h-11 w-fit"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasFilters && (
              <span className="h-5 w-5 rounded-full bg-primary-foreground text-primary text-xs flex items-center justify-center font-bold">
                {[selectedField, selectedLevel, selectedFormat].filter(Boolean).length}
              </span>
            )}
          </Button>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setSelectedField(null); setSelectedLevel(null); setSelectedFormat(null); }}
              className="gap-1 text-muted-foreground h-11"
            >
              <X className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 glass-card p-4 space-y-4"
          >
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Field</p>
              <div className="flex flex-wrap gap-1.5">
                {CAREER_FIELDS.map((f) => (
                  <Button
                    key={f.value}
                    variant={selectedField === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedField(selectedField === f.value ? null : f.value)}
                    className="rounded-lg text-xs h-8"
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Level</p>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_LEVELS.map((l) => (
                  <Button
                    key={l.value}
                    variant={selectedLevel === l.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(selectedLevel === l.value ? null : l.value)}
                    className="rounded-lg text-xs h-8"
                  >
                    {l.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Format</p>
              <div className="flex flex-wrap gap-1.5">
                {RESOURCE_FORMATS.map((f) => (
                  <Button
                    key={f.value}
                    variant={selectedFormat === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFormat(selectedFormat === f.value ? null : f.value)}
                    className="rounded-lg text-xs h-8"
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} resource{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
          {filtered.map((r, i) => {
            const FormatIcon = formatIcons[r.format] || FileText;
            return (
              <motion.a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card p-5 card-hover group block"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-muted">
                      <FormatIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{r.source}</span>
                  </div>
                  <div className={cn(
                    "quality-badge",
                    r.qualityScore >= 90 ? "quality-high" : r.qualityScore >= 70 ? "quality-mid" : "quality-low"
                  )}>
                    <Star className="h-3 w-3" />
                    {r.qualityScore}
                  </div>
                </div>

                {/* Title & description */}
                <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {r.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {r.topics.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-muted text-muted-foreground font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-medium",
                      r.level === "beginner" && "level-beginner",
                      r.level === "intermediate" && "level-intermediate",
                      r.level === "advanced" && "level-advanced"
                    )}>
                      {r.level}
                    </span>
                    {r.duration && (
                      <span className="text-[10px] text-muted-foreground">{r.duration}</span>
                    )}
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No resources found matching your filters.</p>
          </div>
        )}
      </div>
      </PageIntro>
    </>
  );
}
