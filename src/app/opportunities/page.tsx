
"use client";

import { useState } from "react";
import { allResources } from "@/lib/data";
import { ResourceCard } from "@/components/dashboard/resource-card";
import { InteractiveDoor } from "@/components/interactive-door";
import { AnimatePresence, motion } from "framer-motion";

export default function OpportunitiesPage() {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const opportunityResources = allResources.filter(r => r.type === 'opportunity');

  const handleOpenRequest = () => {
    if (!isDoorOpen) {
      setIsDoorOpen(true);
    }
  };

  const handleDoorAnimationComplete = () => {
    setShowContent(true);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="door-section"
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5, delay: 0.3 } }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-primary font-sans mb-4">
              Knock on the Door to Opportunity
            </h1>
            <p className="mt-2 text-lg max-w-2xl text-muted-foreground mb-12">
              Click the door to swing it open and reveal a world of internships, fellowships, and scholarships.
            </p>
            <InteractiveDoor
              isOpen={isDoorOpen}
              onToggle={handleOpenRequest}
              onOpened={handleDoorAnimationComplete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content-section"
            initial="hidden"
            animate="visible"
            className="w-full text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              className="text-4xl sm:text-5xl font-bold text-primary font-sans mb-2"
            >
              Opportunities Unlocked
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}
              className="mt-2 text-lg text-muted-foreground mb-12"
            >
              Explore internships, fellowships, and scholarships to launch your career.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {opportunityResources.map((resource, i) => (
                <motion.div key={resource.id} custom={i} variants={cardVariants}>
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
