"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useWishlist } from "@/context/wishlist-context";
import { Bookmark, ExternalLink, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist();

  return (
    <>
      <Header />
      <div className="page-container pt-12 pb-20" data-testid="wishlist-page">
        <p className="eyebrow">Your Wishlist</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Saved for later.</h1>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              data-testid="wishlist-clear"
              className="text-xs text-muted-foreground rounded-full"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Clear all
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-12 surface p-10 text-center max-w-xl mx-auto" data-testid="wishlist-empty">
            <div className="inline-flex p-3 rounded-2xl bg-secondary mb-4">
              <Bookmark className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl">Nothing saved yet.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the bookmark icon on careers, scholarships, or resources to save them here. Stored locally — never sent to a server.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button asChild size="sm" className="rounded-full"><Link href="/explore">Explore careers <ArrowRight className="h-3 w-3 ml-1" /></Link></Button>
              <Button asChild size="sm" variant="outline" className="rounded-full"><Link href="/sage"><Sparkles className="h-3 w-3 mr-1" /> Ask Sage</Link></Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((it) => {
              const isExternal = it.href?.startsWith("http");
              const meta = `${it.type}${it.meta ? ` · ${it.meta}` : ""}`;
              const card = (
                <div className="surface surface-hover p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="pill bg-secondary text-foreground text-[10px] uppercase tracking-widest">{it.type}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        remove(it.id);
                      }}
                      aria-label="Remove"
                      data-testid={`wishlist-remove-${it.id}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <h3 className="font-serif text-lg leading-tight line-clamp-2">{it.title}</h3>
                  <p className="text-[12px] text-muted-foreground mt-1">{meta}</p>
                  {it.href && (
                    <div className="mt-4 pt-3 border-t border-border flex items-center gap-1 text-[12px] text-muted-foreground">
                      Open {isExternal ? <ExternalLink className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                    </div>
                  )}
                </div>
              );

              if (!it.href) return <div key={it.id}>{card}</div>;
              return isExternal ? (
                <a key={it.id} href={it.href} target="_blank" rel="noopener noreferrer">{card}</a>
              ) : (
                <Link key={it.id} href={it.href}>{card}</Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
