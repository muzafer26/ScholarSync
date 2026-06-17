"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ExternalLink, MapPin, Briefcase, Globe, X, Linkedin
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="page-container pt-28 pb-20 text-center font-mono">Loading Job Telemetry...</div>}>
      <JobsPageContent />
    </Suspense>
  );
}

function JobsPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialQuery);
  const [location, setLocation] = useState("India");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="bg-background min-h-screen">
      <Header />

      {/* Search Dimming Overlay */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="page-container pt-28 pb-20" data-testid="jobs-page">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-primary" />
            <h1 className="text-[30px] font-serif font-bold text-foreground tracking-tight">Job Telemetry</h1>
          </div>
          <p className="text-[16px] text-foreground/80 font-serif leading-relaxed max-w-xl">
            Direct pipelines to live jobs databases. Avoid fake jobs and stale listings.
          </p>
        </motion.div>

        {/* Filters */}
        <div className={cn(
          "mb-10 p-5 bg-card border border-border bevel-card rounded-md transition-all duration-300",
          isSearchFocused ? "relative z-30 shadow-[0_0_20px_rgba(23,104,218,0.15)] border-primary bg-card" : "relative z-10 bg-card"
        )}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type="text"
                placeholder="Query job titles (e.g. React Developer)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-full pl-9 pr-10 py-2.5 bg-background border border-border rounded-sm text-[16px] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {["India", "Mumbai", "Pune", "Bangalore"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={cn("px-3 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono", location === loc ? "bg-secondary text-primary border-primary shadow-sm" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground")}
                >
                  {loc}
                </button>
              ))}
              <button
                onClick={() => setRemoteOnly(!remoteOnly)}
                className={cn("px-3 py-2.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono gap-1.5 flex items-center ml-1", remoteOnly ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground")}
              >
                <Globe className="h-3.5 w-3.5" /> Remote
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Job Search Pipelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
          <div className="p-6 bg-card border border-border bevel-card rounded-md hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="h-10 w-10 rounded-sm bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center mb-4">
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              </div>
              <h3 className="font-serif text-[20px] font-bold text-foreground mb-2">LinkedIn Jobs Pipeline</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-6 font-serif">
                Query LinkedIn's live recruiter index for entry-level and remote "{search || "software engineer"}" roles in {location}.
              </p>
            </div>
            <a 
              href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(search || "software engineer")}&location=${encodeURIComponent(location || "India")}${remoteOnly ? "&f_WT=2" : ""}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-primary border border-border font-sans text-[13px] font-bold rounded-sm hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-colors active:scale-95 bevel-card"
            >
              SEARCH ON LINKEDIN <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="p-6 bg-card border border-border bevel-card rounded-md hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="h-10 w-10 rounded-sm bg-[#121212]/10 border border-border flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-[20px] font-bold text-foreground mb-2">Indeed Jobs Pipeline</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-6 font-serif">
                Access Indeed's aggregator network for local and remote "{search || "software engineer"}" jobs in {location}.
              </p>
            </div>
            <a 
              href={`https://www.indeed.com/jobs?q=${encodeURIComponent(search || "software engineer")}&l=${encodeURIComponent(location || "India")}${remoteOnly ? "&sc=0kf%3Aattr(DSYS7)%3B" : ""}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-primary border border-border font-sans text-[13px] font-bold rounded-sm hover:border-primary/50 hover:bg-primary/5 transition-colors active:scale-95 bevel-card"
            >
              SEARCH ON INDEED <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="p-6 bg-card border border-border bevel-card rounded-md hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="h-10 w-10 rounded-sm bg-[#00A5EC]/10 border border-[#00A5EC]/20 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-[#00A5EC]" />
              </div>
              <h3 className="font-serif text-[20px] font-bold text-foreground mb-2">Internshala Pipeline</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-6 font-serif">
                Access fresher-focused internships and entry-level programs for "{search || "software engineer"}" roles in India.
              </p>
            </div>
            <a 
              href={`https://internshala.com/internships/keywords-${encodeURIComponent(search || "software engineer")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-primary border border-border font-sans text-[13px] font-bold rounded-sm hover:border-[#00A5EC]/50 hover:bg-[#00A5EC]/10 transition-colors active:scale-95 bevel-card"
            >
              SEARCH ON INTERNSHALA <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
