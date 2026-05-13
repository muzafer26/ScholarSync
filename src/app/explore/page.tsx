"use client";

import { useState, useMemo } from "react";
import { allCareers } from "@/lib/search";
import { CAREER_FIELDS } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, X, Bookmark,
  Code, BarChart3, Palette, Heart, Scale, Wrench, Landmark, Rocket,
  Target, Brain, BookOpen, GraduationCap, Megaphone, Atom, Monitor, Shield, Cloud
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/wishlist-context";

const iconMap: Record<string, React.ElementType> = {
  Code, BarChart3, Palette, Brain, Heart, Landmark, Target,
  Rocket, Scale, Monitor, BookOpen, GraduationCap, Megaphone, Atom, Wrench, Shield, Cloud
};

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const { items: wishlistItems, add: addToWishlist, remove: removeFromWishlist } = useWishlist();

  const filtered = useMemo(() => {
    return allCareers.filter((c) => {
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
      <div className="page-container pt-12 pb-20" data-testid="explore-page">
        <p className="eyebrow">Explore</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Careers & Roadmaps.</h1>
        <p className="mt-3 text-muted-foreground max-w-xl text-lg">
          Visual roadmaps for modern careers. Pick a path to see the full journey — skills, resources, and milestones.
        </p>

        {/* Search & Filters */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md surface flex items-center gap-3 px-4 py-2 rounded-2xl">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              placeholder="Search careers..."
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
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant={selectedField === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedField(null)}
              className={cn("rounded-full", selectedField === null ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
            >
              All
            </Button>
            {CAREER_FIELDS.slice(0, 8).map((field) => (
              <Button
                key={field.value}
                variant={selectedField === field.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedField(selectedField === field.value ? null : field.value)}
                className={cn("rounded-full", selectedField === field.value ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
              >
                {field.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
          {filtered.map((career, i) => {
            const IconComponent = iconMap[career.icon] || Monitor;
            const isSaved = wishlistItems.some(item => item.id === career.id);
            return (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                className="relative group"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    isSaved ? removeFromWishlist(career.id) : addToWishlist({
                      id: career.id,
                      title: career.title,
                      url: `/explore/${career.slug}`,
                      type: "career"
                    });
                  }}
                  className={cn(
                    "absolute top-5 right-5 z-10 p-2 rounded-full transition-all",
                    isSaved ? "bg-foreground text-background" : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground opacity-0 group-hover:opacity-100"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                </button>

                <Link href={`/explore/${career.slug}`} className="block h-full">
                  <div className="surface surface-hover p-5 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3 pr-10">
                      <span className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                        <IconComponent className="h-4 w-4 text-foreground" />
                      </span>
                      <span
                        className={cn(
                          "pill text-[10px]",
                          career.demandTrend === "rising" ? "trend-rising" :
                          career.demandTrend === "stable" ? "trend-stable" : "trend-declining"
                        )}
                      >
                        {career.demandTrend}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl group-hover:text-primary transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-[12px] text-muted-foreground mt-1">{career.field} · {career.subfield}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3 line-clamp-2 flex-1">
                      {career.shortDescription}
                    </p>

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="text-[12px] text-muted-foreground">
                        <span className="font-mono text-foreground">{career.avgSalaryIndia}</span>
                        <span className="mx-2">·</span>
                        {career.stages.length} stages
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
            <p className="text-muted-foreground">No careers found matching your search.</p>
            <Button variant="outline" size="sm" onClick={() => setSearch("")} className="mt-4 rounded-full">
              Clear search
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
