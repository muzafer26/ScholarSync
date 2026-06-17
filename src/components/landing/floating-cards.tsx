"use client";

import { motion } from "framer-motion";
import {
  Sparkles, Code, Brain, GraduationCap, Briefcase, Palette, Shield, Cloud,
} from "lucide-react";

const CARDS = [
  { icon: Code,        title: "Full-Stack Developer", meta: "Career · Rising",        tone: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",   r: -6, x: -10, y: 0 },
  { icon: Brain,       title: "AI Engineer",          meta: "Career · ₹15–60 LPA",     tone: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400", r: 4,  x: 20,  y: -10 },
  { icon: Code,        title: "DevOps Engineer",      meta: "Career · Remote",         tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",        r: -3, x: -22, y: 12 },
  { icon: Briefcase,   title: "Data Scientist",       meta: "Career · High Salary",    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",              r: 6,  x: 12,  y: 20 },
  { icon: Shield,      title: "Cybersecurity Analyst",meta: "Career · High Demand",    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",  r: -2, x: -14, y: -22 },
  { icon: Cloud,       title: "AWS Solutions Arch.",  meta: "Free · Certified",        tone: "bg-orange-500/10 text-orange-600 dark:text-orange-400",     r: 3,  x: 18,  y: 6 },
  { icon: Palette,     title: "Product Designer",     meta: "Career · ₹6–25 LPA",       tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400",            r: -5, x: -4,  y: 26 },
  { icon: Sparkles,    title: "fast.ai Deep Learning",meta: "Resource · Free",         tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",      r: 2,  x: 8,   y: -28 },
];

export function FloatingCards() {
  return (
    <div className="relative h-[420px] hidden lg:block" aria-hidden>
      <div className="absolute inset-0 rounded-3xl bg-grid mask-fade-bottom opacity-60" />

      {/* Center "Sage" pulse */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl animate-pulse" />
          <div className="relative surface px-4 py-3 rounded-2xl flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-serif text-base">ScholarSync</span>
            <span className="text-[11px] text-muted-foreground font-mono">// Live Updates</span>
          </div>
        </div>
      </div>

      {CARDS.map((c, i) => {
        const angle = (i / CARDS.length) * Math.PI * 2;
        const radius = 175;
        const cx = Math.cos(angle) * radius + c.x;
        const cy = Math.sin(angle) * radius + c.y;
        return (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={
              {
                left: `calc(50% + ${cx}px)`,
                top: `calc(50% + ${cy}px)`,
                ["--r" as string]: `${c.r}deg`,
              } as React.CSSProperties
            }
            className="absolute -translate-x-1/2 -translate-y-1/2 float-slow"
          >
            <div
              className="surface px-3 py-2 rounded-xl flex items-center gap-2.5 min-w-[200px]"
              style={{ transform: `rotate(${c.r}deg)` }}
            >
              <span className={`h-7 w-7 rounded-lg flex items-center justify-center ${c.tone}`}>
                <c.icon className="h-3.5 w-3.5" />
              </span>
              <span className="flex flex-col">
                <span className="text-[12px] font-medium leading-tight">{c.title}</span>
                <span className="text-[10px] text-muted-foreground leading-tight font-mono">{c.meta}</span>
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
