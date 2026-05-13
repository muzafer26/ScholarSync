
"use client";

import { Bookmark, Calendar, MapPin, FileText } from "lucide-react";
import type { Resource } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/context/bookmark-context";
import { ProviderIcon } from "../icons";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import React from "react";
import { CardTitle, CardDescription, Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

function ResourceTypeBadge({ type }: { type: Resource['type'] }) {
    const typeInfo = {
        course: { label: "Course", className: "bg-blue-100 text-blue-800 border-blue-300" },
        opportunity: { label: "Opportunity", className: "bg-purple-100 text-purple-800 border-purple-300" },
        guide: { label: "Guide", className: "bg-green-100 text-green-800 border-green-300" },
    };
    const { label, className } = typeInfo[type];
    return <Badge variant="outline" className={cn("font-semibold", className)}>{label}</Badge>;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(resource.id);
  
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(resource.id);
    } else {
      addBookmark(resource.id);
    }
  };
  
  const getFooterInfo = () => {
    switch (resource.type) {
      case 'course':
        return (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{resource.duration}</span>
          </div>
        );
      case 'opportunity':
        return (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{resource.location}</span>
          </div>
        );
       case 'guide':
        return (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="capitalize">{resource.category}</span>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03, rotateX: "5deg" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="group h-full relative transition-colors duration-300 hover:!border-primary/50 glass-card">
        <div className="flex flex-col h-full">
          <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
            <span className="sr-only">View {resource.title}</span>
          </Link>
          
          <CardHeader className="flex flex-row justify-between items-start mb-0 pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground truncate">
              <ProviderIcon provider={resource.provider} className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{resource.provider}</span>
            </div>
            <ResourceTypeBadge type={resource.type} />
          </CardHeader>
          
          <CardContent className="flex-grow flex flex-col pt-0">
            <CardTitle className="text-base font-bold leading-snug mb-2 line-clamp-2 transition-colors group-hover:text-primary">
              {resource.title}
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {resource.description}
            </CardDescription>
          </CardContent>

          <CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-4 border-t mt-auto">
            <div className="truncate pr-2">
              {getFooterInfo()}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full h-8 w-8 text-muted-foreground hover:bg-secondary shrink-0 relative z-20"
              onClick={handleBookmarkToggle}
              aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark
                className={`h-5 w-5 transition-colors ${
                  bookmarked ? "fill-primary text-primary" : ""
                }`}
              />
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
