"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useWishlist } from "@/context/wishlist-context";
import { Bookmark, ExternalLink, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist();

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="page-container pt-28 pb-20" data-testid="wishlist-page">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bookmark className="w-5 h-5 text-primary fill-primary" />
              <h1 className="text-[30px] font-serif font-bold text-foreground tracking-tight">Saved Telemetry</h1>
            </div>
            <p className="text-[16px] text-foreground/80 font-serif leading-relaxed max-w-xl">
              Locally stored index. Review your bookmarked resources, global data, and career pathways.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clear}
              data-testid="wishlist-clear"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] rounded-sm border border-destructive/20 text-destructive bg-destructive/5 hover:bg-destructive hover:text-destructive-foreground transition-colors font-mono mb-1"
            >
              <Trash2 className="h-3.5 w-3.5" /> Purge Index
            </button>
          )}
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-card border border-border p-8 max-w-xl mx-auto rounded-md inset-panel" 
            data-testid="wishlist-empty"
          >
            <Bookmark className="h-8 w-8 text-primary mx-auto mb-4 opacity-80" />
            <h2 className="text-[21px] font-serif font-bold text-foreground mb-2">No telemetry stored.</h2>
            <p className="text-[16px] font-serif text-foreground/80 mb-6">
              Tap the bookmark icon on careers or resources to index them here.
            </p>
            <Link href="/explore" className="inline-flex items-center justify-center gap-2 px-5 py-2 h-[35px] bg-secondary text-primary border border-border font-sans text-[14px] font-bold rounded-sm hover:border-primary transition-colors active:scale-95 bevel-card">
              INITIALIZE EXPLORER <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((it, i) => {
              const isExternal = it.href?.startsWith("http");
              const meta = `${it.type}${it.meta ? ` · ${it.meta}` : ""}`;
              const card = (
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.4) }}
                  className="h-full p-5 bg-background border border-border rounded-md bevel-card hover:border-primary/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden block group"
                >
                  {/* Decorative Tech Corner */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-muted border-b border-l border-border rounded-bl-sm -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>

                  <div className="flex items-center justify-between mb-4 pr-6 relative z-10">
                    <span className="px-2 py-0.5 bg-secondary text-foreground text-[12px] font-mono uppercase tracking-[0.04em] rounded-sm border border-border">
                      {it.type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        remove(it.id);
                      }}
                      aria-label="Remove"
                      data-testid={`wishlist-remove-${it.id}`}
                      className="text-muted-foreground hover:text-destructive absolute right-0 top-0 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h3 className="font-serif text-[18px] font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2 relative z-10 line-clamp-2">
                    {it.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 relative z-10 flex flex-col gap-2">
                    <p className="text-[13px] font-mono text-muted-foreground">{meta}</p>
                    
                    {it.href && (
                      <div className="flex items-center gap-1.5 text-[13px] font-mono font-bold uppercase tracking-widest text-primary border-t border-border pt-3 mt-1">
                        EXECUTE LINK {isExternal ? <ExternalLink className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                      </div>
                    )}
                  </div>
                </motion.div>
              );

              if (!it.href) return <div key={it.id}>{card}</div>;
              return isExternal ? (
                <a key={it.id} href={it.href} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a>
              ) : (
                <Link key={it.id} href={it.href} className="block h-full">{card}</Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
