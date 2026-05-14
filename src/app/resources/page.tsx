"use client";

import { useState, useMemo, useEffect } from "react";
import { allResources } from "@/lib/search";
import { CAREER_FIELDS, RESOURCE_FORMATS, SKILL_LEVELS } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search, ExternalLink, Star, Filter, X, Bookmark, Globe, Book, Library,
  Play, FileText, GraduationCap, BookOpen, MousePointer,
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
  const [tab, setTab] = useState<"curated" | "global">("curated");

  // Global Search State (Open Library API)
  const [globalBooks, setGlobalBooks] = useState<GlobalBook[]>([]);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Video Search State (YouTube API)
  const [videos, setVideos] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const { items: wishlistItems, add: addToWishlist, remove: removeFromWishlist } = useWishlist();

  const filtered = useMemo(() => {
    return allResources
      .filter((r) => {
        const matchSearch = !search ||
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.source.toLowerCase().includes(search.toLowerCase()) ||
          r.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchField = !selectedField || r.field === selectedField;
        const matchLevel = !selectedLevel || r.level === selectedLevel;
        const matchFormat = !selectedFormat || r.format === selectedFormat;
        return matchSearch && matchField && matchLevel && matchFormat;
      })
      .sort((a, b) => b.qualityScore - a.qualityScore || b.votes - a.votes);
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

  return (
    <>
      <Header />
      <div className="page-container pt-12 pb-20" data-testid="resources-page">
        <p className="eyebrow">Resources</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">Learning Hub.</h1>
        <p className="mt-3 text-muted-foreground max-w-xl text-lg">
          Curated courses, global library books, and educational video tutorials — all in one place.
        </p>

        {/* Search & Tabs */}
        <div className="mt-8 flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap bg-secondary p-1 rounded-2xl w-fit">
            <button
              onClick={() => setTab("curated")}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all gap-2 flex items-center", tab === "curated" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <Star className="h-4 w-4" /> Curated
            </button>
            <button
              onClick={() => { setTab("global"); if (search) searchGlobal(search); }}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all gap-2 flex items-center", tab === "global" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <Library className="h-4 w-4" /> Books
            </button>
            <button
              onClick={() => { setTab("videos"); if (search) searchVideos(search); }}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all gap-2 flex items-center", tab === "videos" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <Play className="h-4 w-4" /> Videos
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 max-w-md surface flex items-center gap-3 px-4 py-2 rounded-2xl">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                placeholder={tab === "curated" ? "Search courses, topics..." : tab === "global" ? "Search free books..." : "Search educational videos..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(search);
                  }
                }}
                className="flex-1 bg-transparent outline-none text-[15px] h-8"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {tab === "curated" ? (
              <>
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn("gap-2 rounded-full h-12 w-fit", showFilters ? "bg-foreground text-background" : "bg-transparent border-border text-foreground")}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasFilters && (
                    <span className="h-5 w-5 rounded-full bg-background text-foreground text-xs flex items-center justify-center font-bold">
                      {[selectedField, selectedLevel, selectedFormat].filter(Boolean).length}
                    </span>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => handleSearch(search)} className="h-12 rounded-2xl bg-foreground text-background hover:bg-foreground/90">
                Search Database
              </Button>
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

        {/* Curated Resource Grid */}
        {tab === "curated" && (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} resource{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
              {filtered.map((r, i) => {
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
                        "absolute top-5 right-5 z-10 p-2 rounded-full transition-all",
                        isSaved ? "bg-foreground text-background" : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground opacity-0 group-hover:opacity-100"
                      )}
                    >
                      <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                    </button>

                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="surface surface-hover p-5 h-full flex flex-col block">
                      <div className="flex items-center justify-between mb-3 pr-10">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-secondary">
                            <FormatIcon className="h-3.5 w-3.5 text-foreground" />
                          </div>
                          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{r.source}</span>
                        </div>
                        <div className={cn(
                          "quality-badge",
                          r.qualityScore >= 90 ? "quality-high" : r.qualityScore >= 70 ? "quality-mid" : "quality-low"
                        )}>
                          <Star className="h-3 w-3" />
                          {r.qualityScore}
                        </div>
                      </div>

                      <h3 className="font-serif text-xl group-hover:text-primary transition-colors leading-tight mb-2">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3 flex-1">
                        {r.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {r.topics.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-secondary text-foreground font-medium">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-medium",
                            r.level === "beginner" && "level-beginner",
                            r.level === "intermediate" && "level-intermediate",
                            r.level === "advanced" && "level-advanced"
                          )}>
                            {r.level}
                          </span>
                          {r.duration && (
                            <span className="text-[11px] text-muted-foreground">{r.duration}</span>
                          )}
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
                <p className="text-muted-foreground">No resources found matching your filters.</p>
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
                            "absolute top-5 right-5 z-10 p-2 rounded-full transition-all",
                            isSaved ? "bg-foreground text-background" : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground opacity-0 group-hover:opacity-100"
                          )}
                        >
                          <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                        </button>
                        
                        <a href={book.url} target="_blank" rel="noopener noreferrer" className="surface surface-hover p-5 h-full flex flex-col block">
                          <div className="flex items-center gap-2 mb-3 pr-10">
                            <div className="p-1.5 rounded-lg bg-sky-500/10">
                              <Library className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Open Library</span>
                          </div>

                          <h3 className="font-serif text-xl group-hover:text-primary transition-colors leading-tight mb-2">
                            {book.title}
                          </h3>
                          <p className="text-sm text-muted-foreground flex-1">
                            By {book.author}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                            <span className="text-[11px] text-muted-foreground">Published: {book.year || "Unknown"}</span>
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
                <Book className="h-8 w-8 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Search millions of free educational books, textbooks, and publications.</p>
                <p className="text-xs text-muted-foreground mt-2">Powered by the global Open Library API.</p>
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
                            "absolute top-3 right-3 z-10 p-2 rounded-full transition-all",
                            isSaved ? "bg-foreground text-background" : "bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100"
                          )}
                        >
                          <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                        </button>
                        
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="surface surface-hover p-0 h-full flex flex-col block overflow-hidden">
                          <div className="relative h-40 w-full overflow-hidden">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                              YouTube
                            </div>
                          </div>

                          <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-serif text-base group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: video.title }} />
                            <p className="text-[12px] text-muted-foreground mt-auto">
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
              <div className="text-center py-16 surface p-8 max-w-xl mx-auto rounded-2xl">
                <Play className="h-8 w-8 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Search thousands of high-quality educational videos and tutorials.</p>
                <p className="text-xs text-muted-foreground mt-2">Powered by the YouTube Search API.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
