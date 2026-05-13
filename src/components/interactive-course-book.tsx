
"use client";

import React, { useState, useMemo } from 'react';
import type { Course } from '@/lib/types';
import { ProviderIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export function InteractiveCourseBook({ items }: { items: Course[] }) {
  // Track flipped state of leaves (pairs of pages)
  const [flippedLeaves, setFlippedLeaves] = useState<Set<number>>(new Set());

  const handleLeafFlip = (leafIndex: number, e: React.MouseEvent) => {
    // CRITICAL: If a link was clicked, do not flip the page.
    const target = e.target as HTMLElement;
    if (target.closest('a')) {
      return;
    }

    setFlippedLeaves(prev => {
      const newSet = new Set(prev);
      if (newSet.has(leafIndex)) {
        // Unflip this leaf and all subsequent leaves to maintain realistic book order
        for (let i = leafIndex; i < totalLeaves; i++) {
          newSet.delete(i);
        }
      } else {
        // Flip this leaf and all previous leaves
        for (let i = 0; i <= leafIndex; i++) {
          newSet.add(i);
        }
      }
      return newSet;
    });
  };

  const pageSpreads = useMemo(() => {
    const spreads = [];
    
    // Spread 0: Cover
    spreads.push({
      front: (
        <div className="page page-cover">
          <div className="cover-content">
            <h1 className="cover-title">ScholarSync</h1>
            <div className="cover-separator"></div>
            <p className="cover-subtitle">A Catalog of Knowledge</p>
          </div>
        </div>
      ),
      back: <div className="page bg-card border-r-0" />
    });

    // Spreads for Course Content
    for (let i = 0; i < items.length; i += 2) {
      const course1 = items[i];
      const course2 = items[i + 1];

      spreads.push({
        front: (
          <div className="page-content">
            {course1 && (
              <>
                <div className="provider-info">
                  <ProviderIcon provider={course1.provider} className="w-5 h-5" />
                  <span className="truncate">{course1.provider}</span>
                </div>
                <h3 className="line-clamp-3">{course1.title}</h3>
                <p className="line-clamp-5">{course1.description}</p>
                <a 
                  href={course1.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto pt-4 text-primary font-bold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Start Course
                </a>
              </>
            )}
          </div>
        ),
        back: (
          <div className="page-content">
            {course2 ? (
              <>
                <div className="provider-info">
                  <ProviderIcon provider={course2.provider} className="w-5 h-5" />
                  <span className="truncate">{course2.provider}</span>
                </div>
                <h3 className="line-clamp-3">{course2.title}</h3>
                <p className="line-clamp-5">{course2.description}</p>
                <a 
                  href={course2.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto pt-4 text-primary font-bold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Start Course
                </a>
              </>
            ) : <div className="flex items-center justify-center h-full text-muted-foreground italic">End of Catalog</div>}
          </div>
        )
      });
    }

    // Penultimate Spread: Quote
    spreads.push({
      front: (
        <div className="quote-page">
          <blockquote>
            &ldquo;The future belongs to those who learn more skills and combine them in creative ways.&rdquo;
            <footer>- Robert Greene</footer>
          </blockquote>
        </div>
      ),
      back: <div className="page page-cover-back" />
    });

    // Final Spread: Back Cover
    spreads.push({
      front: <div className="page page-cover-back" />,
      back: <div className="page page-cover-back" />
    });

    return spreads;
  }, [items]);

  const totalLeaves = pageSpreads.length;

  return (
    <div className="book">
      <div className="pages">
        {pageSpreads.map((spread, leafIndex) => {
          const isFlipped = flippedLeaves.has(leafIndex);
          
          return (
            <div
              key={leafIndex}
              className={cn('page', { 'flipped': isFlipped })}
              style={{ zIndex: totalLeaves - leafIndex }}
              onClick={(e) => handleLeafFlip(leafIndex, e)}
            >
              {/* Face of the leaf (Visible when not flipped) */}
              <div className="absolute inset-0 backface-hidden z-10">
                {spread.front}
              </div>
              {/* Back of the leaf (Visible when flipped) */}
              <div 
                className="absolute inset-0 backface-hidden" 
                style={{ transform: 'rotateY(180deg)' }}
              >
                {spread.back}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
