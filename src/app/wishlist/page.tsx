"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { careers } from "@/lib/seed-careers";
import { allResources } from "@/lib/search";
import { getResourceConfidenceBadge } from "@/lib/utils";
import { Trash2, ExternalLink, Bookmark, Map, BookOpen, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState<"careers" | "resources">("careers");
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [savedResources, setSavedResources] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const careersData = JSON.parse(localStorage.getItem("savedCareers") || "[]");
      const resourcesData = JSON.parse(localStorage.getItem("savedResources") || "[]");
      setSavedCareers(careersData);
      setSavedResources(resourcesData);
    }
  }, []);

  const removeCareer = (slug: string) => {
    const updated = savedCareers.filter(s => s !== slug);
    setSavedCareers(updated);
    localStorage.setItem("savedCareers", JSON.stringify(updated));
  };

  const removeResource = (id: string) => {
    const updated = savedResources.filter(rId => rId !== id);
    setSavedResources(updated);
    localStorage.setItem("savedResources", JSON.stringify(updated));
  };

  const filteredCareers = useMemo(() => {
    return careers.filter(c => savedCareers.includes(c.slug));
  }, [savedCareers]);

  const filteredResources = useMemo(() => {
    return allResources.filter(r => savedResources.includes(r.id));
  }, [savedResources]);

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="page-container pt-28 pb-20 max-w-5xl mx-auto">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[13px] font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-sm">
            Saved Hub
          </span>
          <h1 className="text-[34px] font-serif font-bold text-foreground mt-4 tracking-tight">
            My Learning Wishlist
          </h1>
          <p className="text-[15px] font-serif text-muted-foreground mt-2">
            Your personal collection of saved career roadmaps and vetted learning resources.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-secondary/40 p-1 rounded-sm border border-border flex gap-1 font-mono text-xs uppercase tracking-wider font-bold">
            <button
              onClick={() => setActiveTab("careers")}
              className={`px-4 py-2 rounded-sm transition-all cursor-pointer ${
                activeTab === "careers"
                  ? "bg-card text-foreground border border-border shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Saved Careers ({savedCareers.length})
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-4 py-2 rounded-sm transition-all cursor-pointer ${
                activeTab === "resources"
                  ? "bg-card text-foreground border border-border shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Saved Resources ({savedResources.length})
            </button>
          </div>
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === "careers" ? (
            <motion.div
              key="careers-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredCareers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCareers.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 bg-card border border-border rounded-md hover:border-primary/40 bevel-card relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <span className="text-xs font-mono text-primary uppercase font-bold tracking-widest">{c.field}</span>
                          <button
                            onClick={() => removeCareer(c.slug)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                            title="Remove career"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <h3 className="text-[19px] font-serif font-bold text-foreground mb-2">{c.title}</h3>
                        <p className="text-[14px] text-muted-foreground font-serif leading-relaxed mb-4 line-clamp-2">
                          {c.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">Salary: {c.avgSalaryIndia}</span>
                        <Link
                          href={`/explore/${c.slug}`}
                          className="inline-flex items-center gap-1 text-[13px] font-mono text-primary font-bold hover:text-primary-hover"
                        >
                          View Roadmap <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-border rounded-md bg-secondary/10 max-w-xl mx-auto p-6">
                  <Map className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-[17px] font-serif font-bold mb-1">No Saved Careers</h3>
                  <p className="text-sm font-serif text-muted-foreground mb-4">
                    Explore career paths and click "Save Roadmap" to organize your choices.
                  </p>
                  <Link href="/explore">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-mono text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary/95 transition-colors cursor-pointer">
                      Browse Careers <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="resources-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredResources.length > 0 ? (
                <div className="space-y-4">
                  {filteredResources.map((r) => (
                    <div
                      key={r.id}
                      className="p-5 bg-card border border-border rounded-md bevel-card flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1 text-left">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
                            Link Verified
                          </span>
                          <span className="text-xs font-mono text-muted-foreground uppercase">{r.source}</span>
                          <span className="text-xs font-mono text-muted-foreground">•</span>
                          <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                            {getResourceConfidenceBadge(r)}
                          </span>
                        </div>
                        <h3 className="text-[18px] font-serif font-bold text-foreground mb-1">{r.title}</h3>
                        <p className="text-sm text-muted-foreground font-serif leading-relaxed line-clamp-1">{r.description}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => removeResource(r.id)}
                          className="p-2 border border-border rounded-sm hover:text-red-500 hover:border-red-500/30 transition-all bg-background cursor-pointer"
                          title="Remove resource"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-mono text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-primary/95 transition-colors cursor-pointer"
                        >
                          Go to Resource <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-border rounded-md bg-secondary/10 max-w-xl mx-auto p-6">
                  <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-[17px] font-serif font-bold mb-1">No Saved Resources</h3>
                  <p className="text-sm font-serif text-muted-foreground mb-4">
                    Bookmark resources in the archives or roadmaps to find them here later.
                  </p>
                  <Link href="/resources">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-mono text-[12px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary/95 transition-colors cursor-pointer">
                      Browse Resource Archives <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
