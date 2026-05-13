"use client";

import { useState, useMemo } from "react";
import { allScholarships } from "@/lib/search";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search, ExternalLink, Calendar, MapPin,
  Globe, IndianRupee, Award, ChevronRight, X, Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/wishlist-context";

export default function ScholarshipsPage() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { items: wishlistItems, add: addToWishlist, remove: removeFromWishlist } = useWishlist();

  const filtered = useMemo(() => {
    return allScholarships.filter((s) => {
      const matchSearch = !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.provider.toLowerCase().includes(search.toLowerCase()) ||
        s.fields.some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchCountry = !selectedCountry || s.country === selectedCountry;
      const matchType = !selectedType || s.type === selectedType;
      return matchSearch && matchCountry && matchType;
    });
  }, [search, selectedCountry, selectedType]);

  const typeLabels: Record<string, string> = {
    merit: "Merit-based",
    need: "Need-based",
    "field-specific": "Field-specific",
    government: "Government",
  };

  return (
    <>
      <Header />
      <div className="page-container pt-12 pb-20" data-testid="scholarships-page">
        <p className="eyebrow">Scholarships</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Grants & Funding.</h1>
        <p className="mt-3 text-muted-foreground max-w-xl text-lg">
          Find scholarships you're eligible for — from government schemes to prestigious international awards.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md surface flex items-center gap-3 px-4 py-2 rounded-2xl">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              placeholder="Search scholarships..."
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
              variant={selectedCountry === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(null)}
              className={cn("rounded-full gap-1", selectedCountry === null ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
            >
              All Regions
            </Button>
            <Button
              variant={selectedCountry === "India" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(selectedCountry === "India" ? null : "India")}
              className={cn("rounded-full gap-1.5", selectedCountry === "India" ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
            >
              <IndianRupee className="h-3 w-3" /> India
            </Button>
            <Button
              variant={selectedCountry === "Global" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(selectedCountry === "Global" ? null : "Global")}
              className={cn("rounded-full gap-1.5", selectedCountry === "Global" ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
            >
              <Globe className="h-3 w-3" /> Global
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(typeLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedType === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(selectedType === key ? null : key)}
              className={cn("rounded-full text-xs", selectedType === key ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
            >
              {label}
            </Button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} scholarship{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
          {filtered.map((s, i) => {
            const isSaved = wishlistItems.some(item => item.id === s.id);
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                className="relative group"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    isSaved ? removeFromWishlist(s.id) : addToWishlist({
                      id: s.id,
                      title: s.name,
                      url: s.applyUrl,
                      type: "scholarship"
                    });
                  }}
                  className={cn(
                    "absolute top-6 right-6 z-10 p-2 rounded-full transition-all",
                    isSaved ? "bg-foreground text-background" : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground opacity-0 group-hover:opacity-100"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                </button>

                <div className="surface surface-hover p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 pr-10">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2 rounded-lg",
                      s.country === "India" ? "bg-amber-500/10" : "bg-sky-500/10"
                    )}>
                      {s.country === "India"
                        ? <IndianRupee className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        : <Globe className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      }
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide uppercase",
                      s.type === "merit" && "bg-violet-500/10 text-violet-700 dark:text-violet-400",
                      s.type === "need" && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                      s.type === "government" && "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                      s.type === "field-specific" && "bg-sky-500/10 text-sky-700 dark:text-sky-400",
                    )}>
                      {typeLabels[s.type]}
                    </span>
                  </div>
                  {s.isActive && (
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif mb-1 leading-tight">{s.name}</h3>
                <p className="text-[12px] text-muted-foreground mb-3 font-medium uppercase tracking-wider">{s.provider}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {s.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-[13px]">
                    <Award className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-mono text-foreground">{s.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px]">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Deadline: {s.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px]">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{s.country}</span>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-5 p-4 rounded-xl bg-secondary/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-2">
                    Eligibility
                  </p>
                  <ul className="space-y-1.5">
                    {s.eligibility.map((e) => (
                      <li key={e} className="text-[13px] text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button asChild className="w-full rounded-full mt-auto bg-foreground text-background hover:bg-foreground/90">
                  <a href={s.applyUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                    Apply Now <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
            <p className="text-muted-foreground">No scholarships found matching your filters.</p>
          </div>
        )}
      </div>
    </>
  );
}
