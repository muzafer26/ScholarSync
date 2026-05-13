"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Search, MapPin, Building2, ExternalLink, Briefcase, Clock, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Job {
  id: string; title: string; company: string; logo: string | null;
  location: string; type: string; remote: boolean; url: string;
  posted: string; description: string;
}

export default function JobsPage() {
  const [query, setQuery] = useState("software engineer intern");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => { setTimeout(() => setShowIntro(false), 2500); }, []);

  const searchJobs = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/jobs?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      setJobs(json.data || []);
    } catch { setJobs([]); }
    setLoading(false);
  };

  return (
    <>
      <Header />

      {/* Plane animation overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div className="fixed inset-0 z-50 bg-background flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.div initial={{ x: -200, y: 50, rotate: -10 }} animate={{ x: 300, y: -100, rotate: 5 }} transition={{ duration: 2, ease: "easeInOut" }}>
              <Plane className="h-16 w-16 text-primary" />
            </motion.div>
            <motion.p className="absolute bottom-1/3 text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              ✈️ Flying you to opportunities...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-container py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}>
          <div className="page-header">
            <h1 className="text-3xl md:text-4xl font-bold">Jobs & Internships</h1>
            <p className="text-muted-foreground mt-2">Live job listings powered by JSearch. Find your next opportunity.</p>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="e.g. data analyst, product designer, intern..." className="pl-10 h-11" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchJobs()} />
            </div>
            <Button onClick={searchJobs} className="h-11 px-6" disabled={loading}>
              {loading ? "Searching..." : "Search Jobs"}
            </Button>
          </div>

          {/* Results */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse"><div className="h-4 bg-muted rounded w-3/4 mb-3" /><div className="h-3 bg-muted rounded w-1/2 mb-2" /><div className="h-3 bg-muted rounded w-full" /></div>
              ))}
            </div>
          )}

          {!loading && searched && jobs.length === 0 && (
            <div className="text-center py-16"><Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No jobs found. Try a different search term.</p></div>
          )}

          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job, i) => (
                <motion.a key={job.id} href={job.url} target="_blank" rel="noopener noreferrer" className="glass-card p-5 card-hover block group" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex items-start gap-3">
                    {job.logo ? (
                      <img src={job.logo} alt="" className="h-10 w-10 rounded-lg object-contain bg-muted p-1" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="h-5 w-5 text-primary" /></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">{job.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{job.location}</span>
                    {job.type && <span className="pill bg-muted text-muted-foreground text-[10px]">{job.type}</span>}
                    {job.remote && <span className="pill bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px]">Remote</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{job.description}</p>
                </motion.a>
              ))}
            </div>
          )}

          {!searched && !loading && (
            <div className="text-center py-16">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.6 }}>
                <Briefcase className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground mb-1 font-medium">Search for jobs & internships</p>
                <p className="text-sm text-muted-foreground">Try &ldquo;data analyst&rdquo;, &ldquo;product designer&rdquo;, or &ldquo;marketing intern&rdquo;</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
