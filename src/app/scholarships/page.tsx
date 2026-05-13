"use client";

import { PageIntro } from "@/components/ui/page-intro";

import { useState, useMemo } from "react";
import { scholarships } from "@/lib/seed-scholarships";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search, ExternalLink, Calendar, MapPin, GraduationCap,
  Globe, IndianRupee, Award, ChevronRight, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScholarshipsPage() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return scholarships.filter((s) => {
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
      <PageIntro emoji="💰" text="Finding your scholarships...">
      <div className="page-container">
        <div className="page-header">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Scholarships & Opportunities</h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            Find scholarships you&apos;re eligible for — from government schemes to prestigious international awards.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search scholarships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCountry === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(null)}
              className="rounded-lg gap-1"
            >
              All Regions
            </Button>
            <Button
              variant={selectedCountry === "India" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(selectedCountry === "India" ? null : "India")}
              className="rounded-lg gap-1"
            >
              <IndianRupee className="h-3 w-3" /> India
            </Button>
            <Button
              variant={selectedCountry === "Global" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(selectedCountry === "Global" ? null : "Global")}
              className="rounded-lg gap-1"
            >
              <Globe className="h-3 w-3" /> Global
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeLabels).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedType === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(selectedType === key ? null : key)}
                className="rounded-lg text-xs"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} scholarship{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-16">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="glass-card p-6 h-full card-hover flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2 rounded-lg",
                      s.country === "India" ? "bg-amber-500/10" : "bg-blue-500/10"
                    )}>
                      {s.country === "India"
                        ? <IndianRupee className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        : <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      }
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-xs font-medium",
                      s.type === "merit" && "bg-violet-500/10 text-violet-600 dark:text-violet-400",
                      s.type === "need" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      s.type === "government" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      s.type === "field-specific" && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                    )}>
                      {typeLabels[s.type]}
                    </span>
                  </div>
                  {s.isActive && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold font-sans mb-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{s.provider}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {s.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">{s.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Deadline: {s.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{s.country}</span>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                    Eligibility
                  </p>
                  <ul className="space-y-1">
                    {s.eligibility.map((e) => (
                      <li key={e} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button asChild className="w-full rounded-xl mt-auto">
                  <a href={s.applyUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                    Apply Now <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No scholarships found matching your filters.</p>
          </div>
        )}
      </div>
      </PageIntro>
    </>
  );
}
