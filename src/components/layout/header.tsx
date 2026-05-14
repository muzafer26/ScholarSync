"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";

const NAV = [
  { href: "/explore", label: "Careers" },
  { href: "/resources", label: "Resources" },
  { href: "/jobs", label: "Jobs" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useWishlist();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass-nav border-b border-border/80" : "bg-transparent"
      )}
    >
      <div className="page-container flex h-16 items-center justify-between">
        <Link
          href="/"
          data-testid="logo-link"
          className="flex items-center gap-2.5 group"
          aria-label="ScholarSync home"
        >
          <div className="relative h-7 w-7 rounded-lg bg-foreground flex items-center justify-center shadow-sm">
            <span className="text-background font-serif text-base leading-none">S</span>
          </div>
          <span className="font-serif text-xl leading-none">ScholarSync</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[13px] tracking-tight transition-colors",
                  active
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            data-testid="nav-wishlist"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label={`Wishlist (${items.length})`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Wishlist</span>
            {items.length > 0 && (
              <span className="ml-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground text-background">
                {items.length}
              </span>
            )}
          </Link>

          <Button
            asChild
            data-testid="cta-search"
            size="sm"
            className="hidden md:inline-flex h-9 px-4 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium"
          >
            <Link href="/search">Search</Link>
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-secondary"
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background" data-testid="mobile-menu">
          <div className="page-container py-3 space-y-0.5">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm hover:bg-secondary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm hover:bg-secondary transition-colors"
            >
              Wishlist {items.length > 0 && `(${items.length})`}
            </Link>
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm hover:bg-secondary transition-colors font-medium"
            >
              Search →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
