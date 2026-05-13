"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface BookmarkContextType {
  bookmarkedIds: Set<string>;
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem("bookmarkedResources");
      if (item) {
        setBookmarkedIds(new Set(JSON.parse(item)));
      }
    } catch (error) {
      console.warn("Could not load bookmarks from localStorage", error);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      try {
        window.localStorage.setItem("bookmarkedResources", JSON.stringify(Array.from(bookmarkedIds)));
      } catch (error) {
        console.warn("Could not save bookmarks to localStorage", error);
      }
    }
  }, [bookmarkedIds, isInitialLoad]);

  const addBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    toast({
      title: "Bookmarked!",
      description: "Resource saved for later.",
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
     toast({
      title: "Bookmark removed",
      description: "Resource removed from your list.",
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarkedIds.has(id);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
