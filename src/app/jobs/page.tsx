"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search, ExternalLink, MapPin, Briefcase, Building2, Globe, Clock, X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Job {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.data || []);
      } catch (err) {
        setError("Could not load jobs at this time. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = !search || 
      job.title.toLowerCase().includes(search.toLowerCase()) || 
      job.company_name.toLowerCase().includes(search.toLowerCase());
    const matchRemote = !remoteOnly || job.remote;
    return matchSearch && matchRemote;
  });

  return (
    <>
      <Header />
      <div className="page-container pt-12 pb-20" data-testid="jobs-page">
        <p className="eyebrow">Job Board</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Tech & Remote Jobs.</h1>
        <p className="mt-3 text-muted-foreground max-w-xl text-lg">
          Live job listings updated daily. Powered by Arbeitnow API.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md surface flex items-center gap-3 px-4 py-2 rounded-2xl">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              placeholder="Search roles or companies..."
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
              variant={remoteOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={cn("rounded-full gap-1.5 h-12", remoteOnly ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
            >
              <Globe className="h-4 w-4" /> Remote Only
            </Button>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="surface p-6 h-48 rounded-2xl animate-pulse flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-secondary rounded" />
                  <div className="h-6 w-48 bg-secondary rounded" />
                  <div className="h-4 w-32 bg-secondary rounded" />
                </div>
                <div className="h-10 w-full bg-secondary rounded-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filteredJobs.length} live job{filteredJobs.length !== 1 ? "s" : ""} found
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
              {filteredJobs.map((job, i) => (
                <motion.div
                  key={job.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.4) }}
                >
                  <div className="surface surface-hover p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg leading-tight">{job.title}</h3>
                          <p className="text-[12px] text-muted-foreground font-medium mt-0.5">{job.company_name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-5 mt-2">
                      <div className="flex items-center gap-2 text-[13px]">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[13px]">
                        <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground capitalize">{job.job_types.join(", ").replace("_", " ")}</span>
                      </div>
                      {job.remote && (
                        <div className="flex items-center gap-2 text-[13px]">
                          <Globe className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-emerald-500 font-medium">Remote Available</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {job.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[10px] rounded-md bg-secondary text-foreground font-medium uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button asChild className="w-full rounded-full mt-auto bg-foreground text-background hover:bg-foreground/90">
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                        Apply on Arbeitnow <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
                <p className="text-muted-foreground">No jobs found matching your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
