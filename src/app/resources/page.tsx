"use client";

import { useState, useMemo } from "react";
import { allResources } from "@/lib/search";
import { CAREER_FIELDS, RESOURCE_FORMATS, SKILL_LEVELS } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search, ExternalLink, Star, Filter, X,
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
    return allResources
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
      <div className="page-container pt-12 pb-20" data-testid="resources-page">
        <p className="eyebrow">Resources</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Free Library.</h1>
        <p className="mt-3 text-muted-foreground max-w-xl text-lg">
          Curated collection of the best free courses, tutorials, and books — quality-ranked and always free.
        </p>

        {/* Search & Filter toggle */}
        <div className="mt-8 flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-md surface flex items-center gap-3 px-4 py-2 rounded-2xl">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              placeholder="Search resources, topics, or sources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[15px] h-8"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={cn("gap-2 rounded-full h-12 w-fit", showFilters ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasFilters && (
              <span className="h-5 w-5 rounded-full bg-background text-foreground text-xs flex items-center justify-center font-bold">
                {[selectedField, selectedLevel, selectedFormat].filter(Boolean).length}
              </span>
            )}
          </Button>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setSelectedField(null); setSelectedLevel(null); setSelectedFormat(null); }}
              className="gap-1 text-muted-foreground h-12 rounded-full"
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
            className="mb-6 surface p-6 rounded-2xl space-y-5"
          >
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">Field</p>
              <div className="flex flex-wrap gap-2">
                {CAREER_FIELDS.map((f) => (
                  <Button
                    key={f.value}
                    variant={selectedField === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedField(selectedField === f.value ? null : f.value)}
                    className={cn("rounded-full", selectedField === f.value ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">Level</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_LEVELS.map((l) => (
                  <Button
                    key={l.value}
                    variant={selectedLevel === l.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(selectedLevel === l.value ? null : l.value)}
                    className={cn("rounded-full", selectedLevel === l.value ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
                  >
                    {l.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">Format</p>
              <div className="flex flex-wrap gap-2">
                {RESOURCE_FORMATS.map((f) => (
                  <Button
                    key={f.value}
                    variant={selectedFormat === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFormat(selectedFormat === f.value ? null : f.value)}
                    className={cn("rounded-full", selectedFormat === f.value ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
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
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                className="surface surface-hover p-5 h-full flex flex-col group block"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-secondary">
                      <FormatIcon className="h-3.5 w-3.5 text-foreground" />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{r.source}</span>
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
                <h3 className="font-serif text-xl group-hover:text-primary transition-colors leading-tight mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3 flex-1">
                  {r.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {r.topics.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-secondary text-foreground font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
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
                      <span className="text-[11px] text-muted-foreground">{r.duration}</span>
                    )}
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
            <p className="text-muted-foreground">No resources found matching your filters.</p>
          </div>
        )}
      </div>
    </>
  );
}
