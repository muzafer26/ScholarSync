"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Map, Rocket, Terminal, Search, Cpu, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { HeroSearch } from "@/components/landing/hero-search";

const POPULAR_CAREERS = [
  { name: "Frontend Developer", slug: "frontend-developer" },
  { name: "Backend Engineer", slug: "backend-engineer" },
  { name: "Data Analyst", slug: "data-analyst" },
  { name: "AI Engineer", slug: "ai-ml-engineer" },
  { name: "Cybersecurity", slug: "cybersecurity-analyst" },
];

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />

      {/* PODCUBE RETRO-FUTURIST HERO */}
      <section className="relative pt-32 pb-24 border-b border-border bg-background bg-dot-pattern overflow-hidden" data-testid="hero-section">
        {/* Subtle top blur for depth */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
        
        <div className="page-container content-reading relative z-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            {/* Status Telemetry Badge */}
            <motion.div variants={item} className="mb-6 flex items-center justify-center gap-2 px-4 py-1.5 bg-card bevel-card rounded-sm border border-border shadow-sm text-[13px] font-mono text-primary font-bold tracking-[0.04em] uppercase">
              <span className="w-1.5 h-1.5 bg-accent-warm rounded-sm animate-pulse"></span>
              System Version: V1 Beta
            </motion.div>

            <motion.h1 variants={item} className="text-[32px] md:text-[48px] font-serif font-bold text-foreground tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              Stop guessing. <br />
              <span className="italic font-light opacity-80">Start building.</span>
            </motion.h1>
            
            <motion.p variants={item} className="text-[16px] md:text-[18px] text-foreground/80 mb-10 max-w-xl font-serif">
              An open-source intelligence engine that maps your intent to exact learning roadmaps, skills, and free resources.
            </motion.p>
            
            {/* Control Panel Search Input */}
            <motion.div variants={item} className="w-full mb-8 relative p-3 bg-card border border-border bevel-card rounded-md shadow-sm">
              <HeroSearch />
            </motion.div>

            {/* Quick Access Tabs */}
            <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-6">
              <span className="text-[14px] font-bold font-mono text-muted-foreground mr-2">Telemetry:</span>
              {POPULAR_CAREERS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/explore/${c.slug}`}
                  className="px-3 py-1.5 bg-background border border-border rounded-sm text-[14px] font-medium font-sans text-foreground hover:bg-secondary hover:text-primary hover:border-primary/50 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MECHANICAL FEATURE PANELS */}
      <section className="py-24 bg-card border-b border-border relative inset-panel">
        <div className="page-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="text-[30px] font-serif font-bold tracking-tight text-foreground mb-4">The Standard Journey is Broken.</h2>
            <p className="text-foreground/80 text-[18px] font-serif">We replaced tutorial hell with an opinionated, structural taxonomy of tech careers.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Block 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="group bg-background border border-border p-6 rounded-md bevel-card hover:border-primary/50 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center mb-5 border border-primary shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <Map className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-[21px] font-serif font-bold mb-2">Intent-Driven Roadmaps</h3>
              <p className="text-foreground/80 text-[16px] font-serif leading-relaxed">Search "I hate maths" or "Quickest tech job". Our engine maps human intent directly to the most viable technical pathway.</p>
            </motion.div>

            {/* Block 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group bg-background border border-border p-6 rounded-md bevel-card hover:border-primary/50 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center mb-5 border border-primary shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-[21px] font-serif font-bold mb-2">Curated Free Resources</h3>
              <p className="text-foreground/80 text-[16px] font-serif leading-relaxed">No paywalls. No Udemy fluff. We index only official documentation, interactive labs, and high-quality open-source curriculums.</p>
            </motion.div>

            {/* Block 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="group bg-background border border-border p-6 rounded-md bevel-card hover:border-primary/50 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-muted border-b border-l border-border rounded-bl-md -mr-px -mt-px group-hover:bg-primary/10 transition-colors"></div>
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center mb-5 border border-primary shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <Terminal className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-[21px] font-serif font-bold mb-2">Build & Deploy</h3>
              <p className="text-foreground/80 text-[16px] font-serif leading-relaxed">Theory is useless without execution. Every career path forces you to build real-world projects that actually get you hired.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / DIAGRAM */}
      <section className="py-16 md:py-24 bg-card border-t border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <div className="page-container content-reading relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[25px] md:text-[30px] font-serif font-bold text-foreground mb-4">System Architecture</h2>
            <p className="text-[16px] font-serif text-muted-foreground">How we translate human intent into technical roadmaps.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 max-w-4xl mx-auto">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center flex-1 w-full"
            >
              <div className="w-16 h-16 bg-background border-2 border-primary rounded-md bevel-card flex items-center justify-center mb-4 relative z-10 shadow-[0_0_15px_rgba(23,104,218,0.2)]">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono text-[13px] font-bold uppercase tracking-widest mb-2 text-foreground">1. User Intent</h3>
              <div className="bg-secondary border border-border p-3 rounded-sm text-center">
                <p className="font-serif text-[14px] text-muted-foreground">"I hate maths, what job can I do?"</p>
              </div>
            </motion.div>

            {/* Connector */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="hidden md:block w-16 h-px bg-primary/50 origin-left"
            ></motion.div>
            <div className="md:hidden h-8 w-px bg-primary/50"></div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center flex-1 w-full"
            >
              <div className="w-20 h-20 bg-primary border-2 border-primary-foreground rounded-md inset-panel flex items-center justify-center mb-4 relative z-10 shadow-[0_0_20px_rgba(23,104,218,0.4)]">
                <Cpu className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-mono text-[13px] font-bold uppercase tracking-widest mb-2 text-primary">2. Taxonomy Engine</h3>
              <div className="bg-background border border-primary/30 p-3 rounded-sm text-center inset-panel w-full">
                <p className="font-mono text-[12px] text-foreground uppercase tracking-widest">Processing Alias...</p>
                <p className="font-serif text-[14px] text-primary mt-1 font-bold">Matches: UX Designer</p>
              </div>
            </motion.div>

            {/* Connector */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden md:block w-16 h-px bg-primary/50 origin-left"
            ></motion.div>
            <div className="md:hidden h-8 w-px bg-primary/50"></div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center flex-1 w-full"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-md bevel-card flex items-center justify-center mb-4 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-mono text-[13px] font-bold uppercase tracking-widest mb-2 text-foreground">3. Execution Plan</h3>
              <div className="bg-secondary border border-border p-3 rounded-sm text-center">
                <p className="font-serif text-[14px] text-muted-foreground">Generates exact skills & free resources</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 bg-background text-center border-t border-border">
        <div className="page-container content-reading">
          <h2 className="text-[25px] font-serif font-bold mb-6 text-foreground">Ready to begin?</h2>
          <Link 
            href="/explore" 
            className="inline-flex items-center justify-center gap-2 px-5 py-2 h-[35px] bg-secondary text-primary border border-border font-sans text-[14px] font-bold rounded-sm hover:border-primary transition-colors active:scale-95 group bevel-card"
          >
            INITIALIZE EXPLORER
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
