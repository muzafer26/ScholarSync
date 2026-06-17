"use client";

import { useState, useMemo, useEffect } from "react";
import { searchCareers } from "@/lib/search";
import { CAREER_FIELDS } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Search, X, ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const toggleCompare = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSlugs(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 careers at once.");
        return prev;
      }
      return [...prev, slug];
    });
  };

  const [careersCount, setCareersCount] = useState(0);
  const [milestonesCount, setMilestonesCount] = useState(0);
  const [freeRatio, setFreeRatio] = useState(0);

  useEffect(() => {
    const duration = 800;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);

      setCareersCount(Math.floor(ease * 12));
      setMilestonesCount(Math.floor(ease * 50));
      setFreeRatio(Math.floor(ease * 100));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const filtered = useMemo(() => {
    const results = searchCareers(search);
    if (!selectedField) return results;
    return results.filter((c) => c.field === selectedField);
  }, [search, selectedField]);

  useEffect(() => {
    if (!search) {
      setIsScanning(false);
      return;
    }
    
    setIsScanning(true);
    setScanStep(0);
    
    const timer1 = setTimeout(() => setScanStep(1), 100);
    const timer2 = setTimeout(() => setScanStep(2), 220);
    const timer3 = setTimeout(() => setScanStep(3), 340);
    const timer4 = setTimeout(() => setScanStep(4), 460);
    const timer5 = setTimeout(() => {
      setIsScanning(false);
    }, 650);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [search]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

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

      <main className="page-container content-reading pt-28 pb-20" data-testid="explore-page">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-primary" />
            <h1 className="text-[30px] font-serif font-bold text-foreground tracking-tight">Database Scanner</h1>
          </div>
          <p className="text-[16px] text-foreground/80 font-serif leading-relaxed max-w-xl">
            Access technical telemetry, skill requirements, and structured training protocols for major IT pathways.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-6 max-w-md font-mono text-[13px]">
            <div className="p-3 bg-card border border-border bevel-card rounded-sm text-center">
              <div className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Careers</div>
              <div className="text-primary font-bold text-[20px]">{careersCount}+</div>
            </div>
            <div className="p-3 bg-card border border-border bevel-card rounded-sm text-center">
              <div className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Milestones</div>
              <div className="text-primary font-bold text-[20px]">{milestonesCount}+</div>
            </div>
            <div className="p-3 bg-card border border-border bevel-card rounded-sm text-center">
              <div className="text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Resource Cost</div>
              <div className="text-primary font-bold text-[20px]">{freeRatio}% Free</div>
            </div>
          </div>
        </motion.div>

        {/* PodCube Explorer Controls */}
        <div className={cn(
          "mb-10 p-5 bg-card border border-border bevel-card rounded-md transition-all duration-300",
          isSearchFocused ? "relative z-30 shadow-[0_0_20px_rgba(23,104,218,0.15)] border-primary bg-card" : "relative z-10 bg-card"
        )}>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Query database (e.g. 'devops', 'I hate maths')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-9 pr-10 py-2.5 bg-background border border-border rounded-sm text-[16px] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedField(null)}
              className={cn(
                "px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono",
                selectedField === null 
                  ? "bg-secondary text-primary border-primary shadow-sm" 
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              All Data
            </button>
            {CAREER_FIELDS.map((field) => (
              <button
                key={field.value}
                onClick={() => setSelectedField(selectedField === field.value ? null : field.value)}
                className={cn(
                  "px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono",
                  selectedField === field.value 
                    ? "bg-secondary text-primary border-primary shadow-sm" 
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                {field.label}
              </button>
            ))}
          </div>
        </div>

        {/* PodCube Data Panels */}
        {isScanning ? (
          <div className="mb-8 p-6 bg-card border border-border rounded-md bevel-card font-mono text-[14px] relative overflow-hidden z-10">
            <div className="absolute top-0 right-0 w-8 h-8 bg-primary/5 border-b border-l border-border rounded-bl-sm flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            </div>
            <div className="flex items-center gap-2 mb-4 text-primary font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span>RUNNING SCHOLARSYNC INTENT PROTOCOL...</span>
            </div>
            <div className="space-y-2.5">
              <div className={cn("flex items-center gap-2.5 transition-all duration-200", scanStep >= 1 ? "opacity-100 text-foreground" : "opacity-30")}>
                <span className="text-primary">{scanStep >= 1 ? "✓" : "☐"}</span>
                <span>Analysing intent query database: "{search}"</span>
              </div>
              <div className={cn("flex items-center gap-2.5 transition-all duration-200", scanStep >= 2 ? "opacity-100 text-foreground" : "opacity-30")}>
                <span className="text-primary">{scanStep >= 2 ? "✓" : "☐"}</span>
                <span>Scanning career taxonomy matches</span>
              </div>
              <div className={cn("flex items-center gap-2.5 transition-all duration-200", scanStep >= 3 ? "opacity-100 text-foreground" : "opacity-30")}>
                <span className="text-primary">{scanStep >= 3 ? "✓" : "☐"}</span>
                <span>Verifying resource matrices & practice channels</span>
              </div>
              <div className={cn("flex items-center gap-2.5 transition-all duration-200", scanStep >= 4 ? "opacity-100 text-foreground" : "opacity-30")}>
                <span className="text-primary">{scanStep >= 4 ? "✓" : "☐"}</span>
                <span>Verifying project checkpoints & real-world tasks</span>
              </div>
            </div>
            {scanStep >= 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 pt-4 border-t border-border flex items-center justify-between text-primary font-bold text-[12px] uppercase tracking-widest"
              >
                <span>✓ Compiled learning path ready.</span>
                <span className="animate-pulse">Rendering telemetry...</span>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-4"
          >
            {filtered.map((career) => (
              <motion.div variants={item} key={career.id} className="h-full">
                <Link href={`/explore/${career.slug}`} className="group block h-full">
                  <div className="h-full p-5 bg-background border border-border rounded-md bevel-card hover:border-primary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden">
                    
                    {/* Decorative Tech Corner */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-muted border-b border-l border-border rounded-bl-sm -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3 relative z-10">
                      <h3 className="text-[21px] font-serif font-bold text-foreground group-hover:text-primary transition-colors">{career.title}</h3>
                      <div className="flex items-center gap-2 text-[14px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm border border-border">
                        <span>{career.avgSalaryIndia}</span>
                      </div>
                    </div>
                    
                    {career.matchExplanation && (
                      <div className="mb-4 p-3 bg-secondary/80 border border-border rounded-sm text-[14px] font-sans shadow-inner relative z-10">
                        <p className="font-bold text-primary mb-1 flex items-center gap-2 uppercase tracking-widest text-[12px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse"></span>
                          {career.matchExplanation.split('\n')[0]}
                        </p>
                        <p className="text-foreground/80">{career.matchExplanation.split('\n')[1]}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-[13px] font-mono text-muted-foreground mb-4 relative z-10">
                      <span className="font-bold uppercase tracking-[0.04em] text-primary bg-primary/10 px-1.5 py-0.5 rounded-sm border border-primary/20">{career.field}</span>
                      <span>{career.subfield}</span>
                    </div>
                    
                    <p className="text-[16px] text-foreground/80 line-clamp-2 font-serif leading-relaxed relative z-10 mt-auto">
                      {career.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-8 p-10 border border-border bg-card rounded-md text-center inset-panel"
          >
            <p className="text-muted-foreground text-[16px] font-serif">No telemetry found matching your criteria.</p>
            <button onClick={() => setSearch("")} className="mt-4 text-primary text-[14px] font-bold font-sans uppercase tracking-widest hover:underline">
              Clear filters
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
