"use client";

import { Header } from "@/components/layout/header";
import { Shield, BookOpen, Target, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="page-container pt-12 pb-24 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow">About ScholarSync</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight leading-tight">
            Self-learners don't need more content. <br className="hidden md:block" />
            <span className="italic">They need better guidance.</span>
          </h1>
        </motion.div>

        <div className="mt-12 space-y-16">
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-primary" /> The Problem: Tutorial Hell
            </h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                The internet has all the answers a student needs—but they are scattered, paywalled, and overwhelming. 
                When a beginner decides to learn a skill like Frontend Development, they are immediately hit with 
                decision fatigue. 
              </p>
              <p className="mt-4">
                <em>"Do I learn React first? Which YouTube video is actually good? Is this $100 course worth it?"</em>
              </p>
              <p className="mt-4">
                This confusion leads to "Tutorial Hell"—an endless cycle of watching videos without ever building 
                projects or understanding how skills translate to employability.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" /> Why ScholarSync Exists
            </h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                ScholarSync is a <strong>Career and Learning Decision Support System</strong>. We built this platform 
                to reduce confusion and prevent decision fatigue. Instead of dumping thousands of courses on you, 
                we guide you from exploration to job-readiness through validated roadmaps.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" /> 100% Free Learning Philosophy
            </h2>
            <div className="surface p-6 rounded-2xl border-l-4 border-l-emerald-500">
              <p className="text-foreground font-medium mb-3">
                Good guidance shouldn't be a privilege.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Every recommended resource on ScholarSync is free to access.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>We do not list paid courses or bootcamps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>We do not use affiliate links.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>If a university course (like Coursera or edX) requires payment for a certificate, we strictly label it as a FREE AUDIT so there are no surprises.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" /> How Recommendations Work
            </h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-6">
              <p>
                We prioritize <strong>accuracy over quantity</strong> and <strong>guidance over information overload</strong>.
              </p>
              <p className="mt-4">
                Resources and Roadmaps are evaluated against a strict internal Validation Engine. 
                Roadmaps are checked for proper prerequisite sequencing (e.g., ensuring HTML/CSS is taught before React). 
                Resources are assigned a Quality Score based on depth, beginner-friendliness, and freshness.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col items-center text-center">
          <p className="text-lg font-medium mb-6">Ready to find your path?</p>
          <Link href="/explore" className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors">
            Explore Careers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
