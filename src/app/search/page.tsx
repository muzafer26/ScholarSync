"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search as SearchIcon, ArrowRight, ExternalLink, Sparkles,
  Briefcase, BookOpen, GraduationCap, X,
  Terminal, Monitor, FolderGit2
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  searchCareers, searchResources, searchAccuracyEngine, type EngineResult,
  TRENDING_QUERIES, getRelatedSuggestions,
} from "@/lib/search";
import { cn, getResourceConfidenceBadge } from "@/lib/utils";
import { TECH_TO_CAREER } from "@/lib/tech-to-career";
import { careers as seedCareers } from "@/lib/seed-careers";

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

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  const engineData = useMemo(() => {
    if (!q.trim()) return { intent: "General", recommended: [], results: [] };
    return searchAccuracyEngine(q);
  }, [q]);

  const recommended = engineData.recommended;
  const allResults = engineData.results;
  const rawCareers = useMemo(() => searchCareers(q), [q]);
  const rawResources = useMemo(() => searchResources(q), [q]);

  const updateUrl = (next: string) => {
    const url = next.trim() ? `/search?q=${encodeURIComponent(next)}` : "/search";
    router.replace(url);
  };

  const setQuery = (val: string) => {
    setQ(val);
    updateUrl(val);
  };

  const showFallback = q.trim().length > 0 && allResults.length === 0 && recommended.length === 0;

  const qClean = q.trim().toLowerCase();
  const matchedTechKey = qClean ? Object.keys(TECH_TO_CAREER).find(key => {
    const kLower = key.toLowerCase();
    return kLower === qClean || (qClean.length > 2 && (kLower.includes(qClean) || qClean.includes(kLower)));
  }) : null;
  const techMapping = matchedTechKey ? TECH_TO_CAREER[matchedTechKey] : null;
  const matchedCareers = techMapping 
    ? techMapping.careers.map(slug => seedCareers.find(c => c.slug === slug)).filter(Boolean)
    : [];

  // Ecosystem Categorization
  const practiceItems = rawResources.filter(r => r.topics?.some(t => t.toLowerCase() === 'practice') || r.title.toLowerCase().includes('practice') || r.title.toLowerCase().includes('exercises') || r.title.toLowerCase().includes('challenge'));
  const projectItems = rawResources.filter(r => r.topics?.some(t => t.toLowerCase() === 'projects') || r.title.toLowerCase().includes('project') || r.title.toLowerCase().includes('build your own'));
  const docsItems = rawResources.filter(r => (r.pricingType === 'OFFICIAL_DOCS' || r.format === 'text') && !projectItems.includes(r) && !practiceItems.includes(r));
  const learnItems = rawResources.filter(r => !practiceItems.includes(r) && !projectItems.includes(r) && !docsItems.includes(r));

  return (
    <>
      <Header />
      <div className="page-container pt-12 pb-20" data-testid="search-page">
        {q.trim() ? (
          <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight capitalize">{q}</h1>
        ) : (
          <>
            <p className="eyebrow">Search Accuracy Engine</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Find your next step.</h1>
          </>
        )}

        <div className="mt-8 relative max-w-2xl">
          <div className="surface flex items-center gap-3 px-5 py-3.5 border-2 focus-within:border-primary/50 transition-colors rounded-2xl">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder="Search careers, resources, skills…"
              autoFocus
              data-testid="search-input"
              className="flex-1 bg-transparent outline-none text-[16px]"
            />
            {q && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear"
                data-testid="search-clear"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {q && engineData.intent !== "General" && (
            <div className="absolute -bottom-6 right-2 text-[10px] uppercase font-bold tracking-wider text-primary">
              Detected Intent: {engineData.intent}
            </div>
          )}
        </div>

        {/* Trending */}
        {!q.trim() && (
          <div className="mt-6 flex flex-wrap gap-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground self-center mr-1">Trending</span>
            {TRENDING_QUERIES.map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t)}
                className="text-[12px] px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Results Ecosystem View */}
        {q.trim() && (
          <div className="mt-12" data-testid="search-results">
            {techMapping && matchedCareers.length > 0 && (
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl bevel-card relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 border-b border-l border-primary/20 rounded-bl-xl flex items-center justify-center font-bold text-primary text-lg">
                  ⚡
                </div>
                <h3 className="text-[18px] font-mono font-bold text-primary mb-2 uppercase tracking-wide">
                  ⚡ {matchedTechKey} is used in these careers
                </h3>
                <p className="text-[15px] font-serif text-foreground/80 mb-4 leading-relaxed">
                  {techMapping.explanation}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedCareers.map((c: any) => (
                    <Link key={c.slug} href={`/explore/${c.slug}`} className="group block">
                      <div className="p-4 bg-background border border-border rounded-lg group-hover:border-primary/50 group-hover:shadow-sm transition-all duration-300">
                        <h4 className="text-[16px] font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                          {c.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2 font-mono text-[11px] text-muted-foreground">
                          <span>{c.avgSalaryIndia}</span>
                          <span className="text-primary font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                            View Roadmap <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {showFallback ? (
              <div className="space-y-8">
                 <div className="surface p-8 rounded-md border border-dashed border-border bevel-card bg-secondary/20">
                   <h3 className="text-[20px] font-serif font-bold mb-3">No direct matches for &ldquo;{q}&rdquo;</h3>
                   
                   {/* Closest Pathways Recommendation */}
                   <div className="mt-4 mb-6">
                     <p className="text-[14px] font-mono text-primary font-bold uppercase tracking-wider mb-2">Closest Career Pathways:</p>
                     <ul className="list-disc list-inside space-y-1 text-[14px] text-muted-foreground font-serif">
                       {getRelatedSuggestions(q).slice(0, 3).map((s) => (
                         <li key={s.id}>
                           <Link href={s.href} className="underline text-foreground hover:text-primary transition-colors">
                             {s.title}
                           </Link>
                         </li>
                       ))}
                     </ul>
                     <p className="text-[13px] font-serif text-muted-foreground mt-4 italic leading-relaxed">
                       Why? Emerging titles, framework filters, and role synonyms are programmatically linked to core career pathways to ensure structured guidance.
                     </p>
                   </div>

                   <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                     <span className="text-[12px] font-mono text-muted-foreground self-center mr-1">Or search:</span>
                     {TRENDING_QUERIES.slice(0, 5).map(t => (
                       <button
                         key={t}
                         onClick={() => setQuery(t)}
                         className="px-2.5 py-1 text-[12px] font-mono bg-secondary hover:border-primary rounded-sm border border-border transition-all"
                       >
                         {t}
                       </button>
                     ))}
                   </div>
                 </div>
                 <GlobalResults query={q} />
              </div>
            ) : (
              <div className="space-y-12">
                {/* Best Starting Point */}
                {recommended.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" /> Best Starting Point
                    </h2>
                    <ResultsAll results={[recommended[0]]} isRecommended={true} />
                  </section>
                )}

                {/* Learn */}
                {learnItems.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Learn
                    </h2>
                    <ResultsResources resources={learnItems.slice(0, 6)} />
                  </section>
                )}

                {/* Documentation */}
                {docsItems.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Documentation
                    </h2>
                    <ResultsResources resources={docsItems.slice(0, 4)} />
                  </section>
                )}

                {/* Practice */}
                {practiceItems.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <Terminal className="h-4 w-4" /> Practice
                    </h2>
                    <ResultsResources resources={practiceItems.slice(0, 4)} />
                  </section>
                )}

                {/* Build */}
                {projectItems.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <FolderGit2 className="h-4 w-4" /> Build
                    </h2>
                    <ResultsResources resources={projectItems.slice(0, 4)} />
                  </section>
                )}

                {/* Related Careers */}
                {rawCareers.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Related Careers
                    </h2>
                    <ResultsCareers careers={rawCareers.slice(0, 3)} />
                  </section>
                )}

                {/* Related Jobs */}
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                    <Monitor className="h-4 w-4" /> Related Jobs
                  </h2>
                  <Link href={`/jobs?q=${encodeURIComponent(q)}`}>
                    <div className="surface surface-hover p-5 rounded-2xl border-dashed flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-primary">Search Live Jobs for "{q}"</h3>
                      </div>
                      <span className="pill text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-600 border border-blue-500/20">
                        [JOB] Search
                      </span>
                    </div>
                  </Link>
                </section>

                {/* Can't Find Your Career Recovery Block */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="surface p-6 rounded-md border border-dashed border-border bevel-card">
                    <h3 className="text-[18px] font-serif font-bold mb-2">Can't find your career?</h3>
                    <p className="text-[14px] font-serif text-muted-foreground mb-4">
                      ScholarSync matches non-traditional queries, typos, and career anxieties to standard industry roadmaps.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[12px] font-mono">
                      <span className="text-muted-foreground self-center mr-1">Try checking:</span>
                      <button onClick={() => setQuery("never coded before")} className="px-2.5 py-1 bg-secondary hover:border-primary rounded-sm border border-border transition-all">never coded before</button>
                      <button onClick={() => setQuery("i hate maths")} className="px-2.5 py-1 bg-secondary hover:border-primary rounded-sm border border-border transition-all">i hate maths</button>
                      <button onClick={() => setQuery("commerce to tech")} className="px-2.5 py-1 bg-secondary hover:border-primary rounded-sm border border-border transition-all">commerce to tech</button>
                      <button onClick={() => setQuery("highest paying tech jobs")} className="px-2.5 py-1 bg-secondary hover:border-primary rounded-sm border border-border transition-all">highest paying tech jobs</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function ResultsAll({ results, isRecommended = false }: { results: any[], isRecommended?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      {results.map((r, i) => {
        const isExternal = r.href.startsWith("http");
        const inner = (
          <div className="py-4 border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer group">
            <h3 className="text-lg font-bold text-primary group-hover:underline flex items-center gap-1.5">
              {r.title}
              {isExternal && <ExternalLink className="h-3 w-3 text-muted-foreground opacity-50" />}
            </h3>
            
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="font-bold uppercase tracking-widest text-foreground font-mono">
                {r.kind === "career" ? "CAREER" : getResourceConfidenceBadge(r.raw || r)}
              </span>
              
              {r.kind === "resource" && r.pricingType && (
                <span className="font-bold uppercase tracking-widest text-emerald-600 font-mono">
                  {r.pricingType.replace("_", " ")}
                </span>
              )}

              {r.subtitle && <span>{r.subtitle.split('·')[0].trim()}</span>}
            </div>

            {isRecommended && r.explanation && (
              <div className="mt-3 text-sm text-foreground bg-secondary px-4 py-3 border-l-2 border-primary">
                <span className="font-bold mr-2">Why recommended:</span>
                {r.explanation}
              </div>
            )}
          </div>
        );

        return isExternal ? (
           <a key={`${r.kind}-${r.id}`} href={r.href} target="_blank" rel="noopener noreferrer">{inner}</a>
        ) : (
           <Link key={`${r.kind}-${r.id}`} href={r.href}>{inner}</Link>
        );
      })}
    </div>
  );
}

function ResultsCareers({ careers }: { careers: ReturnType<typeof searchCareers> }) {
  return (
    <div className="flex flex-col gap-1">
      {careers.map((c, i) => (
        <Link key={c.id} href={`/explore/${c.slug}`}>
          <div className="py-4 border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer group">
            <h3 className="text-lg font-bold text-primary group-hover:underline">{c.title}</h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="font-bold uppercase tracking-widest text-foreground font-mono">CAREER</span>
              <span>{c.avgSalaryIndia}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ResultsResources({ resources }: { resources: ReturnType<typeof searchResources> }) {
  return (
    <div className="flex flex-col gap-1">
      {resources.map((r, i) => (
        <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer">
          <div className="py-4 border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer group">
            <h3 className="text-lg font-bold text-primary group-hover:underline flex items-center gap-1.5">
              {r.title}
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-50" />
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="font-bold uppercase tracking-widest text-foreground font-mono">{getResourceConfidenceBadge(r)}</span>
              {r.pricingType && (
                <span className="font-bold uppercase tracking-widest text-emerald-600 font-mono">{r.pricingType.replace("_", " ")}</span>
              )}
              <span>{r.source}</span>
            </div>
            {r.description && <p className="text-sm mt-2 text-foreground/80 line-clamp-2 leading-relaxed">{r.description}</p>}
          </div>
        </a>
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
