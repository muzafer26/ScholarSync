"use client";

import { useState, useMemo, useEffect } from "react";
import { allResources } from "@/lib/search";
import { calculateResourceScore, type ScoreResult } from "@/lib/resourceScoring";
import { CAREER_FIELDS, RESOURCE_FORMATS, SKILL_LEVELS } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ExternalLink, Star, Filter, X, Bookmark, Globe, Book, Library,
  Play, FileText, GraduationCap, BookOpen, MousePointer, Shield, CheckCircle2, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/wishlist-context";

const formatIcons: Record<string, React.ElementType> = {
  video: Play,
  text: FileText,
  course: GraduationCap,
  book: BookOpen,
  interactive: MousePointer,
};

interface GlobalBook {
  id: string;
  title: string;
  author: string;
  year: number;
  url: string;
}

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [tab, setTab] = useState<"curated" | "global" | "videos">("curated");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Global Search State (Open Library API)
  const [globalBooks, setGlobalBooks] = useState<GlobalBook[]>([]);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Video Search State (YouTube API)
  const [videos, setVideos] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const { items: wishlistItems, add: addToWishlist, remove: removeFromWishlist } = useWishlist();

const SEARCH_ALIASES: Record<string, string[]> = {
  'ml': ['machine learning', 'deep learning', 'neural'],
  'ai': ['artificial intelligence', 'machine learning', 'deep learning'],
  'js': ['javascript', 'node', 'react', 'next'],
  'ts': ['typescript'],
  'cs': ['computer science', 'programming'],
  'ds': ['data science', 'data analysis'],
  'ui': ['design', 'figma', 'ux'],
  'db': ['database', 'sql', 'mongodb'],
  'devops': ['docker', 'kubernetes', 'ci/cd', 'jenkins'],
  'web': ['html', 'css', 'javascript', 'react', 'next.js'],
  'python': ['python', 'django', 'flask', 'fastapi'],
  'react': ['react', 'next.js', 'redux'],
};

const expandQuery = (query: string): string[] => {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  const aliases = SEARCH_ALIASES[q] || [];
  return [q, ...aliases];
};

  const filtered = useMemo(() => {
    return allResources
      .map(r => {
        const scoreData = calculateResourceScore(r, allResources);
        return { ...r, ...scoreData };
      })
      .filter((r: any) => {
        let matchSearch = true;
        if (search) {
          const terms = expandQuery(search);
          const searchable = [
            r.title,
            r.description || '',
            r.source || '',
            r.field || '',
            ...(r.topics || []),
            ...(r.tags || []),
          ].join(' ').toLowerCase();
          
          matchSearch = terms.some(term => searchable.includes(term));
        }

        const matchField = !selectedField || r.field === selectedField;
        const matchLevel = !selectedLevel || r.level === selectedLevel;
        const matchFormat = !selectedFormat || r.format === selectedFormat;
        return matchSearch && matchField && matchLevel && matchFormat;
      })
      .sort((a: any, b: any) => b.qualityScore - a.qualityScore);
  }, [search, selectedField, selectedLevel, selectedFormat]);

  const hasFilters = selectedField || selectedLevel || selectedFormat;

  const searchGlobal = async (query: string) => {
    setLoadingGlobal(true);
    setGlobalError(null);
    try {
      const q = query || "educational books";
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=12`);
      if (!res.ok) throw new Error("Failed to fetch books from Open Library");
      const data = await res.json();
      setGlobalBooks(data.docs.map((doc: any) => ({
        id: doc.key,
        title: doc.title,
        author: doc.author_name?.[0] || "Unknown Author",
        year: doc.first_publish_year,
        url: `https://openlibrary.org${doc.key}`
      })));
    } catch (e: any) {
      console.error(e);
      setGlobalError(e.message || "Something went wrong fetching books.");
    } finally {
      setLoadingGlobal(false);
    }
  };

  const searchVideos = async (query: string) => {
    setLoadingVideos(true);
    setVideoError(null);
    try {
      const q = query || "educational tutorials";
      const res = await fetch(`/api/resources/youtube?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to fetch videos from YouTube");
      }
      
      setVideos(data.data || []);
    } catch (e: any) {
      console.error(e);
      setVideoError(e.message || "Something went wrong fetching videos.");
    } finally {
      setLoadingVideos(false);
    }
  };

  // Initial load for Global and Videos if tab is switched
  useEffect(() => {
    if (tab === "global" && globalBooks.length === 0 && !loadingGlobal) {
      searchGlobal(search);
    }
    if (tab === "videos" && videos.length === 0 && !loadingVideos) {
      searchVideos(search);
    }
  }, [tab]);

  const handleSearch = (query: string) => {
    if (tab === "global") searchGlobal(query);
    if (tab === "videos") searchVideos(query);
  };

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
      if (tab === "global") searchGlobal(search);
      if (tab === "videos") searchVideos(search);
    }, 650);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [search]);

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

      <div className="page-container pt-28 pb-20" data-testid="resources-page">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Library className="w-5 h-5 text-primary" />
            <h1 className="text-[30px] font-serif font-bold text-foreground tracking-tight">Resource Archives</h1>
          </div>
          <p className="text-[16px] text-foreground/80 font-serif leading-relaxed max-w-xl">
            Access curated courses, global library books, and educational video telemetry.
          </p>
        </motion.div>

        {/* Search & Tabs */}
        <div className={cn(
          "mb-10 p-5 bg-card border border-border bevel-card rounded-md transition-all duration-300",
          isSearchFocused ? "relative z-30 shadow-[0_0_20px_rgba(23,104,218,0.15)] border-primary bg-card" : "relative z-10 bg-card"
        )}>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setTab("curated")}
              className={cn("px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono gap-1.5 flex items-center", tab === "curated" ? "bg-secondary text-primary border-primary shadow-sm" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground")}
            >
              <Star className="h-3.5 w-3.5" /> Curated
            </button>
            <button
              onClick={() => { setTab("global"); if (search) searchGlobal(search); }}
              className={cn("px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono gap-1.5 flex items-center", tab === "global" ? "bg-secondary text-primary border-primary shadow-sm" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground")}
            >
              <Library className="h-3.5 w-3.5" /> Books
            </button>
            <button
              onClick={() => { setTab("videos"); if (search) searchVideos(search); }}
              className={cn("px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono gap-1.5 flex items-center", tab === "videos" ? "bg-secondary text-primary border-primary shadow-sm" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground")}
            >
              <Play className="h-3.5 w-3.5" /> Videos
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 relative">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type="text"
                placeholder={tab === "curated" ? "Query curated resources..." : tab === "global" ? "Search free books..." : "Search video feeds..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(search);
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
            
            {tab === "curated" ? (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn("px-4 py-2.5 flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.04em] rounded-sm border transition-colors font-mono", showFilters ? "bg-secondary text-primary border-primary shadow-sm" : "bg-background text-muted-foreground border-border hover:border-primary/50")}
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
                {hasFilters && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-sm bg-primary text-primary-foreground text-[12px]">
                    {[selectedField, selectedLevel, selectedFormat].filter(Boolean).length}
                  </span>
                )}
              </button>
            ) : (
              <button onClick={() => handleSearch(search)} className="px-5 py-2.5 bg-secondary text-primary border border-border font-sans text-[14px] font-bold rounded-sm hover:border-primary transition-colors active:scale-95 bevel-card">
                EXECUTE
              </button>
            )}
          </div>
        </div>

        {/* Filters panel (Curated only) */}
        {tab === "curated" && showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 surface p-6 rounded-2xl space-y-5"
          >
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">Field</p>
              <div className="flex flex-wrap gap-2">
                {CAREER_FIELDS.map((f) => (
                  <Button
                    key={f.value}
                    variant={selectedField === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedField(selectedField === f.value ? null : f.value)}
                    className={cn("rounded-full", selectedField === f.value ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">Level</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_LEVELS.map((l) => (
                  <Button
                    key={l.value}
                    variant={selectedLevel === l.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(selectedLevel === l.value ? null : l.value)}
                    className={cn("rounded-full", selectedLevel === l.value ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
                  >
                    {l.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">Format</p>
              <div className="flex flex-wrap gap-2">
                {RESOURCE_FORMATS.map((f) => (
                  <Button
                    key={f.value}
                    variant={selectedFormat === f.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFormat(selectedFormat === f.value ? null : f.value)}
                    className={cn("rounded-full", selectedFormat === f.value ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

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
                <span>Scanning resource archives database</span>
              </div>
              <div className={cn("flex items-center gap-2.5 transition-all duration-200", scanStep >= 3 ? "opacity-100 text-foreground" : "opacity-30")}>
                <span className="text-primary">{scanStep >= 3 ? "✓" : "☐"}</span>
                <span>Verifying resource matrices & quality tiers</span>
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
                <span>✓ Compiled resources ready.</span>
                <span className="animate-pulse">Rendering telemetry...</span>
              </motion.div>
            )}
          </div>
        ) : (
          <>
            {/* Curated Resource Grid */}
            {tab === "curated" && (
              <>
            <div className="flex justify-end mb-6">
              <p className="text-[14px] font-mono text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {filtered.length} live resource{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            
            {/* Best Resource Selector (Priority 4) */}
            {search && filtered.length > 0 && (
              <div className="mb-8">
                <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-md p-6 relative overflow-hidden bevel-card">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 border-b border-l border-emerald-500/30 rounded-bl-md -mr-px -mt-px flex items-center justify-center">
                    <Star className="h-5 w-5 text-emerald-500 opacity-80" />
                  </div>
                  <h2 className="text-[13px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Optimal Starting Point
                  </h2>
                  <h3 className="text-[25px] font-serif font-bold mb-2 text-foreground">{filtered[0].title}</h3>
                  <p className="text-[16px] font-serif text-muted-foreground mb-6 max-w-2xl leading-relaxed">{filtered[0].description}</p>
                  
                  <div className="bg-background/80 border border-emerald-500/20 rounded-sm p-4 inline-block mb-6 inset-panel">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-600 mb-3">Recommendation Matrix</p>
                    <ul className="space-y-2">
                      <li className="text-[13px] font-mono flex items-center gap-2 text-foreground/80"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Beginner Friendly & Verified</li>
                      <li className="text-[13px] font-mono flex items-center gap-2 text-foreground/80"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Elite Quality Score ({filtered[0].qualityScore}/100)</li>
                      <li className="text-[13px] font-mono flex items-center gap-2 text-foreground/80"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Complete Curriculum</li>
                    </ul>
                  </div>
                  
                  <div>
                    <a 
                      href={filtered[0].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-primary-foreground border border-emerald-600 font-sans text-[14px] font-bold rounded-sm hover:bg-emerald-600 transition-colors active:scale-95 bevel-card"
                    >
                      EXECUTE RESOURCE <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
              {filtered.slice(search ? 1 : 0).map((r, i) => {
                const FormatIcon = formatIcons[r.format] || FileText;
                const isSaved = wishlistItems.some(item => item.id === r.id);
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.4) }}
                    className="relative group"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        isSaved ? removeFromWishlist(r.id) : addToWishlist({
                          id: r.id,
                          title: r.title,
                          url: r.url,
                          type: "resource"
                        });
                      }}
                      className={cn(
                        "absolute top-5 right-5 z-20 p-2 rounded-sm transition-all border",
                        isSaved ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-primary opacity-0 group-hover:opacity-100"
                      )}
                    >
                      <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
                    </button>

                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="h-full p-5 bg-background border border-border rounded-md bevel-card hover:border-primary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden block">
                      
                      {/* Decorative Tech Corner */}
                      <div className="absolute top-0 right-0 w-6 h-6 bg-muted border-b border-l border-border rounded-bl-sm -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>

                      <div className="flex items-center justify-between mb-3 pr-10 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-sm bg-secondary border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                            <FormatIcon className="h-3.5 w-3.5 text-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <span className="text-[13px] font-mono text-muted-foreground uppercase tracking-[0.04em]">{r.source}</span>
                        </div>
                        <div className={cn(
                          "quality-badge font-mono text-[12px] font-bold uppercase tracking-[0.04em] flex items-center gap-1.5 px-2 py-1 rounded-sm border",
                          r.qualityTier === 'Elite' ? "bg-accent/10 text-accent-foreground border-accent/30" :
                          r.qualityTier === 'Excellent' ? "bg-primary/10 text-primary border-primary/30" :
                          r.qualityTier === 'Good' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" :
                          "bg-muted text-muted-foreground border-border"
                        )}>
                          <Shield className="h-3 w-3" />
                          {r.qualityTier} {r.qualityScore}
                        </div>
                      </div>

                      <h3 className="font-serif text-[21px] font-bold group-hover:text-primary transition-colors leading-tight mb-2 flex items-center gap-2 relative z-10 text-foreground">
                        {r.title}
                        {r.verified && (
                          <span title="Verified Resource" className="text-primary bg-primary/10 p-0.5 rounded-sm border border-primary/20 flex-shrink-0">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </h3>
                      <p className="text-[16px] text-foreground/80 font-serif line-clamp-2 leading-relaxed mb-3 flex-1 relative z-10">
                        {r.description}
                      </p>

                      {r.whyRecommended && (
                        <div className="p-2 bg-secondary/80 border border-border rounded-sm font-mono text-[11px] text-primary leading-normal mb-4 relative z-10">
                          <strong className="uppercase tracking-wider">Why Recommended:</strong> {r.whyRecommended}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
                        {r.topics.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[12px] rounded-sm bg-secondary text-foreground font-mono font-medium border border-border">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-4 relative z-10">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        <span>Last Checked: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                        <span className="text-emerald-500 font-bold uppercase tracking-wider text-[9px]">Active</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto relative z-10">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded-sm text-[12px] font-mono font-bold uppercase tracking-[0.04em] border",
                            r.level === "beginner" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                            r.level === "intermediate" ? "bg-primary/10 text-primary border-primary/20" :
                            "bg-accent/10 text-accent-foreground border-accent/20"
                          )}>
                            {r.level}
                          </span>
                          
                          {r.duration && (
                            <span className="flex items-center gap-1 text-[13px] font-mono text-muted-foreground">
                              <Clock className="h-3 w-3" /> {r.duration}
                            </span>
                          )}
                          
                          <span className="flex items-center gap-1 text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-sm text-[12px] font-mono font-bold uppercase tracking-[0.04em] ml-1">
                            {r.source.includes("Coursera") || r.source.includes("edX") ? "FREE AUDIT" : 
                             r.source.includes("MDN") || r.source.includes("React") ? "OFFICIAL DOCS" : 
                             r.source.includes("OSSU") ? "OPEN SOURCE" : "FREE"}
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl border-dashed">
                <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">No exact matches</h3>
                <p className="text-muted-foreground mb-6 text-sm">We couldn't find any resources matching your current search or filters.</p>
                <div className="flex flex-col gap-2 max-w-xs mx-auto">
                  {(search || hasFilters) && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSearch("");
                        setSelectedField(null);
                        setSelectedLevel(null);
                        setSelectedFormat(null);
                      }}
                    >
                      Clear all filters
                    </Button>
                  )}
                  <div className="text-xs text-muted-foreground mt-4 text-left">
                    <p className="font-semibold mb-2 uppercase tracking-wider">Popular Searches:</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setSearch("python")} className="bg-secondary px-2 py-1 rounded text-foreground hover:bg-muted transition-colors">Python</button>
                      <button onClick={() => setSearch("react")} className="bg-secondary px-2 py-1 rounded text-foreground hover:bg-muted transition-colors">React</button>
                      <button onClick={() => setSearch("frontend")} className="bg-secondary px-2 py-1 rounded text-foreground hover:bg-muted transition-colors">Frontend</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Global Resource Grid */}
        {tab === "global" && (
          <>
            {loadingGlobal ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                   <div key={i} className="surface p-5 h-40 rounded-2xl animate-pulse flex flex-col justify-between">
                     <div className="h-6 w-3/4 bg-secondary rounded" />
                     <div className="h-4 w-1/2 bg-secondary rounded mt-2" />
                     <div className="h-10 w-full bg-secondary rounded-xl mt-4" />
                   </div>
                 ))}
               </div>
            ) : globalError ? (
              <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl border-destructive/20 border">
                <X className="h-8 w-8 text-destructive mx-auto mb-4 opacity-50" />
                <p className="text-foreground font-medium">Unable to load books</p>
                <p className="text-sm text-muted-foreground mt-2">{globalError}</p>
                <Button variant="outline" size="sm" onClick={() => searchGlobal(search)} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : globalBooks.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {globalBooks.length} global resources found via Open Library API
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
                  {globalBooks.map((book, i) => {
                    const isSaved = wishlistItems.some(item => item.id === book.id);
                    return (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.4) }}
                        className="relative group"
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            isSaved ? removeFromWishlist(book.id) : addToWishlist({
                              id: book.id,
                              title: book.title,
                              url: book.url,
                              type: "resource"
                            });
                          }}
                          className={cn(
                            "absolute top-5 right-5 z-20 p-2 rounded-sm transition-all border",
                            isSaved ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-primary opacity-0 group-hover:opacity-100"
                          )}
                        >
                          <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
                        </button>
                        
                        <a href={book.url} target="_blank" rel="noopener noreferrer" className="h-full p-5 bg-background border border-border rounded-md bevel-card hover:border-primary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden block group">
                          {/* Decorative Tech Corner */}
                          <div className="absolute top-0 right-0 w-6 h-6 bg-muted border-b border-l border-border rounded-bl-sm -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>

                          <div className="flex items-center gap-2 mb-3 pr-10 relative z-10">
                            <div className="p-1.5 rounded-sm bg-secondary border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                              <Library className="h-3.5 w-3.5 text-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-[13px] font-mono text-muted-foreground uppercase tracking-[0.04em]">Open Library</span>
                          </div>

                          <h3 className="font-serif text-[21px] font-bold group-hover:text-primary transition-colors leading-tight mb-2 relative z-10 text-foreground">
                            {book.title}
                          </h3>
                          <p className="text-[16px] text-foreground/80 font-serif flex-1 relative z-10">
                            By {book.author}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-border mt-4 relative z-10">
                            <span className="text-[13px] font-mono text-muted-foreground">Published: {book.year || "Unknown"}</span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-card border border-border p-8 max-w-xl mx-auto rounded-md inset-panel">
                <Book className="h-8 w-8 text-primary mx-auto mb-4 opacity-80" />
                <p className="text-[16px] font-serif text-foreground/80">Search millions of free educational books, textbooks, and publications.</p>
                <p className="text-[13px] font-mono text-muted-foreground mt-2 uppercase tracking-widest">Powered by Open Library API.</p>
              </div>
            )}
          </>
        )}

        {/* Video Resource Grid */}
        {tab === "videos" && (
          <>
            {loadingVideos ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                   <div key={i} className="surface p-0 h-64 rounded-2xl animate-pulse flex flex-col">
                     <div className="h-36 w-full bg-secondary rounded-t-2xl" />
                     <div className="p-4 space-y-2">
                        <div className="h-4 w-3/4 bg-secondary rounded" />
                        <div className="h-3 w-1/2 bg-secondary rounded" />
                     </div>
                   </div>
                 ))}
               </div>
            ) : videoError ? (
              <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl border-destructive/20 border">
                <X className="h-8 w-8 text-destructive mx-auto mb-4 opacity-50" />
                <p className="text-foreground font-medium">Unable to load videos</p>
                <p className="text-sm text-muted-foreground mt-2">{videoError}</p>
                <p className="text-xs text-muted-foreground mt-4">Tip: Ensure your YOUTUBE_API_KEY is correctly set in the environment.</p>
                <Button variant="outline" size="sm" onClick={() => searchVideos(search)} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : videos.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {videos.length} educational videos found via YouTube API
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
                  {videos.map((video, i) => {
                    const isSaved = wishlistItems.some(item => item.id === video.id);
                    return (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.4) }}
                        className="relative group"
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            isSaved ? removeFromWishlist(video.id) : addToWishlist({
                              id: video.id,
                              title: video.title,
                              url: video.url,
                              type: "resource"
                            });
                          }}
                          className={cn(
                            "absolute top-3 right-3 z-20 p-2 rounded-sm transition-all border",
                            isSaved ? "bg-primary border-primary text-primary-foreground" : "bg-background/80 border-border text-foreground hover:border-primary/50 hover:text-primary opacity-0 group-hover:opacity-100"
                          )}
                        >
                          <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
                        </button>
                        
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="h-full p-0 bg-background border border-border rounded-md bevel-card hover:border-primary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden block group">
                          <div className="relative h-40 w-full overflow-hidden border-b border-border">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            <div className="absolute bottom-2 right-2 bg-secondary border border-border text-foreground text-[12px] px-1.5 py-0.5 rounded-sm font-mono font-bold uppercase tracking-widest shadow-sm">
                              YouTube
                            </div>
                          </div>

                          <div className="p-4 flex flex-col flex-1 relative z-10">
                            <h3 className="font-serif text-[18px] font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: video.title }} />
                            <p className="text-[14px] font-mono text-muted-foreground mt-auto">
                              {video.channel}
                            </p>
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-card border border-border p-8 max-w-xl mx-auto rounded-md inset-panel">
                <Play className="h-8 w-8 text-primary mx-auto mb-4 opacity-80" />
                <p className="text-[16px] font-serif text-foreground/80">Search thousands of high-quality educational videos and tutorials.</p>
                <p className="text-[13px] font-mono text-muted-foreground mt-2 uppercase tracking-widest">Powered by YouTube Data API.</p>
              </div>
            )}
          </>
        )}
          </>
        )}
      </div>
    </div>
  );
}
