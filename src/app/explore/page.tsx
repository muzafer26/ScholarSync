"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Briefcase, Search, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { CAREER_FIELDS } from "@/lib/constants";
import { searchCareers } from "@/lib/search";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const results = searchCareers(search);
    if (!selectedField) return results;
    return results.filter((career) => career.field === selectedField);
  }, [search, selectedField]);

  const toggleCompare = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((item) => item !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  };

  const compareHref =
    selectedSlugs.length > 0 ? `/compare?careers=${selectedSlugs.join(",")}` : "/compare";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="page-container content-reading pt-28 pb-20" data-testid="explore-page">
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h1 className="text-[30px] font-serif font-bold tracking-tight text-foreground">
              Career Roadmaps
            </h1>
          </div>
          <p className="max-w-xl font-serif text-[16px] leading-relaxed text-foreground/80">
            Browse structured IT career pathways, required skills, free resources, and practical milestones.
          </p>
        </section>

        <section className="mb-10 rounded-md border border-border bg-card p-5 bevel-card">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <input
              type="text"
              placeholder="Search careers or situations, for example 'devops' or 'I hate maths'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-sm border border-border bg-background py-2.5 pl-9 pr-10 font-sans text-[16px] text-foreground shadow-inner outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedField(null)}
              className={cn(
                "rounded-sm border px-3 py-1.5 font-mono text-[13px] font-bold uppercase tracking-[0.04em] transition-colors",
                selectedField === null
                  ? "border-primary bg-secondary text-primary shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              All
            </button>
            {CAREER_FIELDS.map((field) => (
              <button
                key={field.value}
                onClick={() => setSelectedField(selectedField === field.value ? null : field.value)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 font-mono text-[13px] font-bold uppercase tracking-[0.04em] transition-colors",
                  selectedField === field.value
                    ? "border-primary bg-secondary text-primary shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {field.label}
              </button>
            ))}
          </div>
        </section>

        {selectedSlugs.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 rounded-md border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[13px] font-bold uppercase tracking-[0.04em] text-primary">
              {selectedSlugs.length} selected for comparison
            </span>
            <Link
              href={compareHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-secondary px-4 py-2 text-[13px] font-bold text-primary transition-colors hover:border-primary"
            >
              Compare Selected <BarChart3 className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((career, index) => {
              const selected = selectedSlugs.includes(career.slug);
              return (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.24) }}
                >
                  <Link
                    href={`/explore/${career.slug}`}
                    className="group flex h-full flex-col rounded-md border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.04em] text-muted-foreground">
                          <span className="rounded-sm border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-bold text-primary">
                            {career.field}
                          </span>
                          <span>{career.subfield}</span>
                        </div>
                        <h2 className="font-serif text-[21px] font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                          {career.title}
                        </h2>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>

                    {career.matchExplanation && (
                      <div className="mb-4 rounded-sm border border-primary/20 bg-primary/5 p-3 font-mono text-[12px] text-primary">
                        {career.matchExplanation.split("\n").map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    )}

                    <p className="mb-5 line-clamp-3 flex-1 font-serif text-[16px] leading-relaxed text-foreground/80">
                      {career.shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                      <span className="font-mono text-[12px] text-muted-foreground">
                        {career.avgSalaryIndia}
                      </span>
                      <button
                        onClick={(e) => toggleCompare(career.slug, e)}
                        className={cn(
                          "rounded-sm border px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.04em] transition-colors",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-secondary text-primary hover:border-primary"
                        )}
                      >
                        {selected ? "Selected" : "Compare"}
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="mx-auto mt-8 max-w-xl rounded-md border border-dashed border-border bg-card p-10 text-center">
            <p className="font-serif text-[16px] text-muted-foreground">
              No career roadmaps match your current filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedField(null);
              }}
              className="mt-4 font-sans text-[14px] font-bold uppercase tracking-widest text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
