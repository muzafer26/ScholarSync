
"use client";

import { useState } from "react";
import { allResources } from "@/lib/data";
import { ResourceCard } from "@/components/dashboard/resource-card";
import { InteractiveTreasureChest } from "@/components/interactive-treasure-chest";
import { AnimatePresence, motion } from "framer-motion";

export default function GuidesPage() {
  const [chestOpened, setChestOpened] = useState(false);
  const guideResources = allResources.filter((r) => r.type === "guide");

  const handleChestOpen = () => {
    setChestOpened(true);
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
    <div className="container mx-auto px-4 py-8 overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!chestOpened ? (
          <motion.div
            key="chest"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-primary font-sans">
              Unlock Ancient Wisdom
            </h1>
            <p className="mt-4 text-lg text-muted-foreground mb-8">
              Tap the treasure chest to reveal curated guides and career insights.
            </p>
            <InteractiveTreasureChest onChestOpen={handleChestOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="guides"
            initial="hidden"
            animate="visible"
            className="text-center"
          >
             <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                className="text-4xl sm:text-5xl font-bold text-primary font-sans mb-2"
              >
                Wisdom Unlocked
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}
              className="mt-2 text-lg text-muted-foreground mb-12"
            >
                Explore curated guides, industry insights, and career roadmaps to accelerate your journey.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {guideResources.map((resource, i) => (
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
