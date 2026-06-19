"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, CornerDownLeft, X } from "lucide-react";
import { TRENDING_QUERIES, searchAll, type UnifiedResult } from "@/lib/search";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo<UnifiedResult[]>(() => {
    if (!q.trim()) return [];
    return searchAll(q, 6);
  }, [q]);

  const submit = (val?: string) => {
    const target = (val ?? q).trim();
    if (!target) return router.push("/search");
    router.push(`/search?q=${encodeURIComponent(target)}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="relative bg-background border border-border hover:border-muted-foreground/30 focus-within:border-primary transition-colors rounded-2xl flex items-center gap-3 px-5 py-4">
          <Search className="h-6 w-6 text-muted-foreground flex-shrink-0" />
          <input
            data-testid="hero-search-input"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit();
                (e.target as HTMLInputElement).blur();
              }
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="What do you want to learn?"
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground"
            aria-label="Search ScholarSync"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="text-muted-foreground hover:text-foreground mr-2"
              aria-label="Clear"
              data-testid="hero-search-clear"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => submit()}
            data-testid="hero-search-submit"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border rounded-md px-3 py-1.5 hover:bg-secondary"
            aria-label="Submit search"
          >
             Search
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {open && (q.trim().length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-30"
          data-testid="hero-search-dropdown"
          onMouseLeave={() => setOpen(false)}
        >
          {results.length > 0 ? (
            <ul className="py-2 max-h-[400px] overflow-auto">
              {results.map((r) => {
                const isExternal = r.href.startsWith("http");
                const inner = (
                  <div className="flex items-center gap-4 px-5 py-3 hover:bg-secondary/50 cursor-pointer">
                    <span
                      className={
                        "inline-block h-2 w-2 rounded-full flex-shrink-0 " +
                        (r.kind === "career"
                          ? "bg-primary"
                          : r.kind === "resource"
                            ? "bg-emerald-500"
                            : "bg-sky-500")
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-base font-bold truncate text-foreground">{r.title}</div>
                      {r.subtitle && (
                        <div className="text-xs font-medium text-muted-foreground truncate uppercase tracking-widest mt-1">
                          {r.kind} · {r.subtitle}
                        </div>
                      )}
                    </div>
                    <CornerDownLeft className="h-4 w-4 text-muted-foreground/30 flex-shrink-0" />
                  </div>
                );
                return (
                  <li key={`${r.kind}-${r.id}`} className="border-b border-border/50 last:border-0">
                    {isExternal ? (
                      <a href={r.href} target="_blank" rel="noopener noreferrer">{inner}</a>
                    ) : (
                      <Link href={r.href}>{inner}</Link>
                    )}
                  </li>
                );
              })}
              <li className="border-t border-border bg-secondary/20">
                <button
                  onClick={() => submit()}
                  className="w-full text-left px-5 py-4 text-sm font-bold text-primary hover:bg-secondary"
                >
                  See all structured results for "{q}" →
                </button>
              </li>
            </ul>
          ) : (
            <div className="px-5 py-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No exact matches. Try one of the trending searches below.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Trending pills */}
      <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
        <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mr-2">
          Examples
        </span>
        {TRENDING_QUERIES.slice(0, 5).map((t) => (
          <button
            key={t}
            onClick={() => submit(t)}
            data-testid={`trending-${t.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-xs px-3 py-1.5 rounded-sm bg-secondary text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/30 transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
