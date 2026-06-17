
"use client";

import { BotMessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function MentorSection() {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center mb-8"
      >
        <div className="flex items-end gap-4">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-full mb-4">
                    <BotMessageSquare className="w-16 h-16 text-primary" />
                </div>
            </motion.div>
            <motion.div
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
                <h1 className="text-4xl sm:text-5xl font-bold text-primary font-sans">
                    Wisdom from the Mentor
                </h1>
                <p className="mt-4 text-lg max-w-2xl text-muted-foreground">
                    Explore curated guides, industry insights, and career roadmaps to accelerate your journey.
                </p>
            </motion.div>
        </div>
      </motion.div>
    );
}
