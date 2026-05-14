"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search as SearchIcon, ArrowRight, ExternalLink, Sparkles,
  Briefcase, BookOpen, GraduationCap, X,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  searchAll, searchCareers, searchResources, searchScholarships,
  TRENDING_QUERIES, getRelatedSuggestions,
} from "@/lib/search";
import { cn } from "@/lib/utils";

type Tab = "all" | "careers" | "resources" | "scholarships";

import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="page-container pt-12 pb-20">
        <div className="h-8 w-32 bg-secondary rounded-lg animate-pulse mb-3" />
        <div className="h-12 w-64 bg-secondary rounded-lg animate-pulse" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [tab, setTab] = useState<Tab>("all");

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  const all = useMemo(() => searchAll(q, 60), [q]);
  const careers = useMemo(() => searchCareers(q).slice(0, 30), [q]);
  const resources = useMemo(() => searchResources(q).slice(0, 30), [q]);
  const scholarships = useMemo(() => searchScholarships(q).slice(0, 30), [q]);

  const updateUrl = (next: string) => {
    const url = next.trim() ? `/search?q=${encodeURIComponent(next)}` : "/search";
    router.replace(url);
  };

  const setQuery = (val: string) => {
    setQ(val);
    updateUrl(val);
  };

  const counts = {
    all: all.length,
    careers: careers.length,
    resources: resources.length,
    scholarships: scholarships.length,
  };

  const showFallback = q.trim().length > 0 && all.length === 0;
  const related = showFallback ? getRelatedSuggestions(q, 6) : [];

  return (
    <>
      <Header />
      <div className="page-container pt-12 pb-20" data-testid="search-page">
        <p className="eyebrow">Search</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Find your next step.</h1>

        <div className="mt-8 relative max-w-2xl">
          <div className="surface flex items-center gap-3 px-5 py-3.5">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search careers, resources, scholarships…"
              autoFocus
              data-testid="search-input"
              className="flex-1 bg-transparent outline-none text-[15px]"
            />
            {q && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear"
                data-testid="search-clear"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Trending */}
        {!q.trim() && (
          <div className="mt-6 flex flex-wrap gap-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground self-center mr-1">Trending</span>
            {TRENDING_QUERIES.map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t)}
                data-testid={`search-trending-${t.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[12px] px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2" data-testid="search-tabs">
          {([
            { key: "all",          label: "All",         icon: SearchIcon,    n: counts.all },
            { key: "careers",      label: "Careers",     icon: Briefcase,     n: counts.careers },
            { key: "resources",    label: "Resources",   icon: BookOpen,      n: counts.resources },
            { key: "scholarships", label: "Scholarships",icon: GraduationCap, n: counts.scholarships },
          ] as const).map((t) => (
            <button
              key={t.key}
              data-testid={`search-tab-${t.key}`}
              onClick={() => setTab(t.key)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] border transition-colors",
                tab === t.key
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              )}
            >
              <t.icon className="h-3.5 w-3.5" /> {t.label}
              <span className={cn("text-[10px] font-mono", tab === t.key ? "opacity-70" : "opacity-60")}>
                {t.n}
              </span>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-8" data-testid="search-results">
          {showFallback ? (
            <GlobalResults query={q} />
          ) : tab === "all" ? (
            <ResultsAll results={all} />
          ) : tab === "careers" ? (
            <ResultsCareers careers={careers} />
          ) : tab === "resources" ? (
            <ResultsResources resources={resources} />
          ) : (
            <ResultsScholarships scholarships={scholarships} />
          )}
        </div>
      </div>
    </>
  );
}

function ResultsAll({ results }: { results: ReturnType<typeof searchAll> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {results.map((r, i) => {
        const isExternal = r.href.startsWith("http");
        const card = (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.4) }}
            className="surface surface-hover p-5 h-full"
            data-testid={`result-${r.kind}-${r.id}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={cn(
                "pill text-[10px] uppercase tracking-widest",
                r.kind === "career" ? "bg-secondary text-foreground" :
                r.kind === "resource" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" :
                "bg-sky-500/10 text-sky-700 dark:text-sky-400"
              )}>{r.kind}</span>
              {isExternal && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
            </div>
            <h3 className="font-serif text-lg leading-tight line-clamp-2">{r.title}</h3>
            {r.subtitle && <p className="text-[12px] text-muted-foreground mt-1">{r.subtitle}</p>}
            {r.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{r.description}</p>
            )}
          </motion.div>
        );
        return isExternal ? (
          <a key={`${r.kind}-${r.id}`} href={r.href} target="_blank" rel="noopener noreferrer">{card}</a>
        ) : (
          <Link key={`${r.kind}-${r.id}`} href={r.href}>{card}</Link>
        );
      })}
    </div>
  );
}

function ResultsCareers({ careers }: { careers: ReturnType<typeof searchCareers> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {careers.map((c, i) => (
        <Link key={c.id} href={`/explore/${c.slug}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.4) }}
            className="surface surface-hover p-5 h-full"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="pill bg-secondary text-foreground text-[10px] uppercase">career</span>
              <span className={cn(
                "pill text-[10px]",
                c.demandTrend === "rising" ? "trend-rising" :
                c.demandTrend === "stable" ? "trend-stable" : "trend-declining"
              )}>{c.demandTrend}</span>
            </div>
            <h3 className="font-serif text-lg">{c.title}</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">{c.field} · {c.subfield}</p>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.shortDescription}</p>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[12px]">
              <span className="font-mono text-muted-foreground">{c.avgSalaryIndia}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

function ResultsResources({ resources }: { resources: ReturnType<typeof searchResources> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {resources.map((r, i) => (
        <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.4) }}
            className="surface surface-hover p-5 h-full"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-muted-foreground">{r.source}</span>
              <span className={cn(
                "quality-badge",
                r.qualityScore >= 90 ? "quality-high" : r.qualityScore >= 70 ? "quality-mid" : "quality-low"
              )}>{r.qualityScore}/100</span>
            </div>
            <h3 className="font-serif text-lg leading-tight line-clamp-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.description}</p>
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-[11px]">
              <span className={cn(
                "px-2 py-0.5 rounded-md",
                r.level === "beginner" ? "level-beginner" :
                r.level === "intermediate" ? "level-intermediate" : "level-advanced"
              )}>{r.level}</span>
              {r.duration && <span className="text-muted-foreground">· {r.duration}</span>}
              <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
            </div>
          </motion.div>
        </a>
      ))}
    </div>
  );
}

function ResultsScholarships({ scholarships }: { scholarships: ReturnType<typeof searchScholarships> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {scholarships.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(i * 0.03, 0.4) }}
          className="surface p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="pill bg-sky-500/10 text-sky-700 dark:text-sky-400 text-[10px]">{s.country}</span>
            {s.isActive && <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Active</span>}
          </div>
          <h3 className="font-serif text-lg">{s.name}</h3>
          <p className="text-[12px] text-muted-foreground">{s.provider} · {s.amount}</p>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.description}</p>
          <div className="mt-4 flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">Deadline: <span className="text-foreground">{s.deadline}</span></span>
            <Button asChild size="sm" className="rounded-full">
              <a href={s.applyUrl} target="_blank" rel="noopener noreferrer">Apply <ExternalLink className="h-3 w-3 ml-1" /></a>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function GlobalResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobal = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search/global?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchGlobal();
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <p className="eyebrow">Global Education Search</p>
        <h2 className="mt-3 font-serif text-2xl md:text-3xl">Results for &ldquo;{query}&rdquo;</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          No local results found. Showing relevant educational resources from across the web.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="surface h-32 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((r, i) => (
            <motion.a
              key={i}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="surface surface-hover p-5 block h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{r.source}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{r.snippet}</p>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="surface p-10 text-center rounded-2xl border-dashed">
          <p className="text-muted-foreground">No global results found for this topic. Try a broader search term.</p>
        </div>
      )}
    </div>
  );
}
