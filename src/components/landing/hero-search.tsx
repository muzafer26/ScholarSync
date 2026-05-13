"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, CornerDownLeft, Sparkles, X } from "lucide-react";
import { TRENDING_QUERIES, searchAll, type UnifiedResult } from "@/lib/search";

const ROTATE = [
  "Find AI Engineer roadmaps",
  "Search free Python courses",
  "Discover Rhodes scholarships",
  "Plan a Cybersecurity career",
  "Ask Sage about Data Science",
];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [rot, setRot] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRot((r) => (r + 1) % ROTATE.length), 2800);
    return () => clearInterval(t);
  }, []);

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
    <div className="relative w-full max-w-2xl">
      <div className="relative group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-accent/0 to-foreground/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative surface flex items-center gap-3 px-4 sm:px-5 py-3.5">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            data-testid="hero-search-input"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder={ROTATE[rot]}
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-muted-foreground"
            aria-label="Search ScholarSync"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear"
              data-testid="hero-search-clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => submit()}
            data-testid="hero-search-submit"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground border border-border rounded-md px-1.5 py-1 hover:bg-secondary"
            aria-label="Submit search"
          >
            <CornerDownLeft className="h-3 w-3" /> enter
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {open && (q.trim().length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 mt-2 surface overflow-hidden z-30"
          data-testid="hero-search-dropdown"
          onMouseLeave={() => setOpen(false)}
        >
          {results.length > 0 ? (
            <ul className="py-1.5 max-h-80 overflow-auto">
              {results.map((r) => {
                const isExternal = r.href.startsWith("http");
                const inner = (
                  <div className="flex items-start gap-3 px-4 py-2.5 hover:bg-secondary cursor-pointer">
                    <span
                      className={
                        "mt-1 inline-block h-1.5 w-1.5 rounded-full " +
                        (r.kind === "career"
                          ? "bg-accent"
                          : r.kind === "resource"
                            ? "bg-emerald-500"
                            : "bg-sky-500")
                      }
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{r.title}</div>
                      {r.subtitle && (
                        <div className="text-[11px] text-muted-foreground truncate">
                          {r.kind} · {r.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                );
                return (
                  <li key={`${r.kind}-${r.id}`}>
                    {isExternal ? (
                      <a href={r.href} target="_blank" rel="noopener noreferrer">{inner}</a>
                    ) : (
                      <Link href={r.href}>{inner}</Link>
                    )}
                  </li>
                );
              })}
              <li className="border-t border-border">
                <button
                  onClick={() => submit()}
                  className="w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary"
                >
                  See all results for <span className="text-foreground font-medium">{q}</span> →
                </button>
              </li>
            </ul>
          ) : (
            <div className="px-4 py-5">
              <p className="text-sm text-muted-foreground">
                No exact matches. Try one of the trending searches below — or{" "}
                <Link href="/sage" className="underline">ask Sage AI</Link>.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Trending pills */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-[11px] tracking-widest uppercase text-muted-foreground mr-1">
          Trending
        </span>
        {TRENDING_QUERIES.slice(0, 7).map((t) => (
          <button
            key={t}
            onClick={() => submit(t)}
            data-testid={`trending-${t.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-[12px] px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            {t}
          </button>
        ))}
        <Link
          href="/sage"
          data-testid="ask-sage-pill"
          className="text-[12px] px-3 py-1.5 rounded-full bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5"
        >
          <Sparkles className="h-3 w-3" /> Ask Sage
        </Link>
      </div>
    </div>
  );
}
