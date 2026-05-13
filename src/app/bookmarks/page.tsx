
"use client";

import { useMemo } from "react";
import { useBookmarks } from "@/context/bookmark-context";
import { allResources } from "@/lib/data";
import { ResourceCard } from "@/components/dashboard/resource-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarkedIds } = useBookmarks();

  const bookmarkedResources = useMemo(() => {
    return allResources.filter((resource) => bookmarkedIds.has(resource.id));
  }, [bookmarkedIds]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-sans text-4xl font-bold text-primary">
          Your Bookmarks
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your saved courses and opportunities for future reference.
        </p>
      </div>

      {bookmarkedResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg max-w-lg mx-auto">
          <Frown className="mx-auto h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-2xl font-sans font-semibold">
            No bookmarks yet!
          </h3>
          <p className="mt-2 text-muted-foreground">
            Start exploring and save resources you find interesting.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Explore Resources</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
