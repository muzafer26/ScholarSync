"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export type WishlistItemType = "career" | "resource" | "scholarship" | "job";

export interface WishlistItem {
  id: string;
  type: WishlistItemType;
  title: string;
  href?: string;
  meta?: string;
  addedAt: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  ids: Set<string>;
  add: (item: Omit<WishlistItem, "addedAt">) => void;
  remove: (id: string) => void;
  toggle: (item: Omit<WishlistItem, "addedAt">) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const STORAGE_KEY = "scholarsync.wishlist.v1";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const ids = new Set(items.map((i) => i.id));

  const add: WishlistContextType["add"] = (item) => {
    if (ids.has(item.id)) return;
    setItems((prev) => [{ ...item, addedAt: new Date().toISOString() }, ...prev]);
    toast({ title: "Saved", description: `${item.title} added to your wishlist.` });
  };

  const remove: WishlistContextType["remove"] = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggle: WishlistContextType["toggle"] = (item) => {
    if (ids.has(item.id)) remove(item.id);
    else add(item);
  };

  const has = (id: string) => ids.has(id);
  const clear = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, ids, add, remove, toggle, has, clear }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
