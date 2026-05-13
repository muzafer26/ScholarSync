"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Compass, BookOpen, GraduationCap, Briefcase,
  Search, Quote, Check, ChevronRight, Brain, Code, Cloud, Shield, Rocket, Star,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/landing/hero-search";
import { FloatingCards } from "@/components/landing/floating-cards";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const PILLARS = [
  { icon: Compass,       title: "Career discovery",   desc: "Modern roadmaps for 25+ careers — from AI Engineer to Founder.",     href: "/explore",      kbd: "01" },
  { icon: BookOpen,      title: "Free resources",     desc: "MIT OCW, CS50, fast.ai, freeCodeCamp — quality-ranked.",              href: "/resources",    kbd: "02" },
  { icon: GraduationCap, title: "Scholarships",       desc: "INSPIRE, Rhodes, Fulbright, NSP, DAAD — filter by eligibility.",     href: "/scholarships", kbd: "03" },
  { icon: Briefcase,     title: "Jobs & internships", desc: "Curated live listings across remote and global roles.",               href: "/jobs",         kbd: "04" },
];

const MODERN_CAREERS = [
  { name: "AI Engineer",            icon: Brain,  slug: "ai-engineer",          salary: "₹15–60 LPA",     trend: "Rising" },
  { name: "Cybersecurity Analyst",  icon: Shield, slug: "cybersecurity-analyst",salary: "₹6–25 LPA",      trend: "Rising" },
  { name: "DevOps Engineer",        icon: Code,   slug: "devops-engineer",      salary: "₹8–30 LPA",      trend: "Rising" },
  { name: "Cloud Engineer",         icon: Cloud,  slug: "cloud-engineer",       salary: "₹10–35 LPA",     trend: "Rising" },
  { name: "Blockchain Developer",   icon: Code,   slug: "blockchain-developer", salary: "₹10–40 LPA",     trend: "Rising" },
  { name: "Game Developer",         icon: Rocket, slug: "game-developer",       salary: "₹5–22 LPA",      trend: "Rising" },
];

const SCHOLARSHIPS = [
  { name: "INSPIRE Scholarship", who: "Top 1% Science students · India", amt: "₹80,000/yr" },
  { name: "Rhodes Scholarship",  who: "Postgraduate · Oxford",            amt: "Fully Funded" },
  { name: "Fulbright-Nehru",     who: "Indian → USA · Postgrad",          amt: "Full Funding" },
  { name: "Chevening",           who: "Global → UK Master's",              amt: "£18K+ funding" },
];

const RESOURCE_FEATURES = [
  { name: "Harvard CS50x",                 src: "Harvard",     hours: "12 weeks",  level: "Beginner" },
  { name: "fast.ai Practical Deep Learning", src: "fast.ai",   hours: "7 weeks",   level: "Intermediate" },
  { name: "MIT 18.06 Linear Algebra",       src: "MIT OCW",    hours: "15 weeks",  level: "Intermediate" },
  { name: "Google ML Crash Course",         src: "Google",     hours: "15 hours",  level: "Beginner" },
  { name: "Yale Science of Well-Being",     src: "Coursera",   hours: "10 weeks",  level: "Beginner" },
  { name: "Nand2Tetris",                    src: "Coursera",   hours: "12 weeks",  level: "Intermediate" },
];

const TESTIMONIALS = [
  { quote: "Sage helped me realize I'd been ignoring my obvious next step. Two weeks later I had a fast.ai plan and a portfolio outline.", name: "Arjun K.", role: "Engineering student · Nagpur" },
  { quote: "Finally a place that treats students like adults. The roadmaps are honest, the resources are real, and it's all free.",       name: "Meera S.",  role: "BSc Stats · Chennai" },
  { quote: "I switched from dev to PM using the roadmap and free Coursera audits. Better than the paid course I bought before.",          name: "Priya R.",  role: "PM at a SaaS startup" },
];

const PHILOSOPHY = [
  "Free for every learner, forever.",
  "Quality-ranked, never paywalled.",
  "Modern careers, not just traditional ones.",
  "No accounts, no friction, no tracking.",
];

const STATS = [
  { v: "25+",  k: "Career Roadmaps" },
  { v: "55+",  k: "Quality Resources" },
  { v: "30+",  k: "Live Scholarships" },
  { v: "24/7", k: "AI Mentor" },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden bg-noise" data-testid="hero-section">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-grid mask-fade-bottom opacity-50 pointer-events-none" />
        <div className="page-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                data-testid="hero-eyebrow"
                className="inline-flex items-center gap-2 surface px-3 py-1 rounded-full text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                AI-powered · Free forever
              </div>
              <h1
                data-testid="hero-headline"
                className="mt-6 text-[2.6rem] sm:text-6xl md:text-[4.5rem] font-serif leading-[1.0] tracking-tight"
              >
                Discover your <br />
                <span className="italic">future</span>, beautifully.
              </h1>
              <p
                data-testid="hero-subtitle"
                className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                ScholarSync helps you explore careers, find scholarships, land
                internships, and learn from the world&apos;s best free courses —
                guided by Sage, your AI mentor.
              </p>

              <div className="mt-10">
                <HeroSearch />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground">
                {["No signup", "No ads", "No paywalls"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-accent" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <FloatingCards />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-secondary/40" data-testid="stats-section">
        <div className="page-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.k}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="flex flex-col"
                data-testid={`stat-${s.k.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="font-serif text-4xl md:text-5xl leading-none">{s.v}</span>
                <span className="text-[12px] text-muted-foreground mt-2 tracking-wide uppercase">{s.k}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section" data-testid="pillars-section">
        <div className="page-container">
          <motion.div {...fadeUp} className="flex items-end justify-between gap-4 mb-14">
            <div>
              <p className="eyebrow">What&apos;s inside</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-serif tracking-tight">Four pillars, one platform.</h2>
            </div>
            <Link
              href="/search"
              data-testid="explore-all-link"
              className="hidden md:inline-flex items-center gap-1 text-sm link-underline"
            >
              Explore all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              >
                <Link
                  href={p.href}
                  data-testid={`pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group block surface surface-hover p-6 h-full"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                      <p.icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">{p.kbd}</span>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1 text-[13px] text-muted-foreground group-hover:text-foreground transition-colors">
                    Open <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAGE AI SHOWCASE */}
      <section className="section bg-foreground text-background relative overflow-hidden" data-testid="sage-section">
        <div className="absolute inset-0 bg-grid opacity-[0.04]" />
        <div className="page-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fadeUp}>
              <p className="eyebrow !text-background/60">Meet Sage</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-serif leading-[1.05]">
                A mentor that actually <span className="italic">listens</span>.
              </h2>
              <p className="mt-6 text-background/70 text-base md:text-lg max-w-md leading-relaxed">
                Sage is the AI mentor we wish we&apos;d had — friendly, fast, never
                preachy. Ask anything: career switches, learning plans, scholarship
                fits. Sage replies with concrete next steps, free resources, and real talk.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  data-testid="cta-sage"
                  className="rounded-full bg-background text-foreground hover:bg-background/90 h-11 px-6"
                >
                  <Link href="/sage">
                    <Sparkles className="h-4 w-4 mr-1.5" /> Chat with Sage
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <div className="surface !bg-background/5 !border-background/15 p-6 rounded-2xl backdrop-blur">
                <div className="flex items-center gap-2 mb-5">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[11px] tracking-widest uppercase text-background/60">Sage · live</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-end">
                    <div className="bg-background/10 px-3 py-2 rounded-2xl rounded-br-md max-w-xs">
                      I&apos;m a 2nd-year CS student. Should I focus on AI or Web Dev?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-accent/15 text-background px-3 py-2 rounded-2xl rounded-bl-md max-w-md">
                      <div className="mb-1.5 font-medium">Short answer: build the AI track on top of Web Dev fundamentals.</div>
                      Spend 60 days on <span className="font-mono text-accent">CS50x → freeCodeCamp</span>. Then move to
                      <span className="font-mono text-accent"> fast.ai</span> and ship a small RAG app. That makes you hireable for both.
                    </div>
                  </div>
                  <div className="flex">
                    <div className="px-3 py-2 rounded-2xl rounded-bl-md text-background/60 flex gap-1.5 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-background/60 animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-background/60 animate-bounce [animation-delay:.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-background/60 animate-bounce [animation-delay:.3s]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="section" data-testid="careers-section">
        <div className="page-container">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow">Modern careers</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-serif">Beyond the usual paths.</h2>
            </div>
            <Link href="/explore" data-testid="all-careers-link" className="text-sm link-underline">
              All careers →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODERN_CAREERS.map((c, i) => (
              <motion.div
                key={c.slug}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              >
                <Link
                  href={`/explore/${c.slug}`}
                  data-testid={`career-card-${c.slug}`}
                  className="group block surface surface-hover p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="pill bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px]">
                      {c.trend}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.salary}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[12px] text-muted-foreground group-hover:text-foreground transition-colors">
                    View roadmap <ChevronRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS + RESOURCES SPLIT */}
      <section className="section bg-secondary/40 border-y border-border" data-testid="scholarships-resources-section">
        <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div {...fadeUp}>
            <p className="eyebrow">Scholarships</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif">Money isn&apos;t the limit.</h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              Government schemes, prestigious global awards, and field-specific funding — discoverable in seconds.
            </p>
            <ul className="mt-6 space-y-2.5">
              {SCHOLARSHIPS.map((s) => (
                <li key={s.name} className="surface px-4 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-[12px] text-muted-foreground truncate">{s.who}</p>
                  </div>
                  <span className="text-[12px] font-mono text-muted-foreground shrink-0">{s.amt}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/scholarships"
              data-testid="all-scholarships-link"
              className="mt-6 inline-flex items-center gap-1 text-sm link-underline"
            >
              Find your scholarship <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <p className="eyebrow">Free resources</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif">Learn from the best, free.</h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              MIT, Harvard, Stanford, Google — curated and quality-ranked. No watered-down content.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RESOURCE_FEATURES.map((r) => (
                <div key={r.name} className="surface px-4 py-3">
                  <p className="text-sm font-medium truncate">{r.name}</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{r.src}</span><span>·</span>
                    <span>{r.hours}</span><span>·</span>
                    <span>{r.level}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/resources"
              data-testid="all-resources-link"
              className="mt-6 inline-flex items-center gap-1 text-sm link-underline"
            >
              Browse the library <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" data-testid="testimonials-section">
        <div className="page-container">
          <motion.div {...fadeUp} className="mb-12">
            <p className="eyebrow">Learners love it</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-serif">Real stories.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="surface p-6"
              >
                <Quote className="h-4 w-4 text-accent mb-4" />
                <blockquote className="text-[15px] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-border">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[12px] text-muted-foreground">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section" data-testid="philosophy-section">
        <div className="page-container max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <p className="eyebrow">Our philosophy</p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl leading-[1.1]">
              Good guidance shouldn&apos;t be a privilege.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The internet has all the answers a student needs — just scattered, paywalled, and overwhelming.
              ScholarSync brings the signal forward, makes it searchable, and pairs it with an AI mentor.
              Free, always.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              {PHILOSOPHY.map((p) => (
                <li key={p} className="inline-flex items-center gap-2 text-muted-foreground">
                  <Star className="h-3 w-3 text-accent" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-24" data-testid="final-cta">
        <div className="page-container">
          <motion.div {...fadeUp} className="relative surface overflow-hidden p-10 md:p-16">
            <div className="absolute inset-0 bg-grid opacity-30 mask-fade-bottom pointer-events-none" />
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <p className="eyebrow">Start now</p>
                <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-tight">
                  Your next step is <span className="italic">free</span> and one search away.
                </h2>
                <p className="mt-3 text-muted-foreground max-w-md text-sm">
                  No accounts. No fluff. Just real opportunities and a mentor that talks like a friend.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild data-testid="cta-search-final" size="lg" className="rounded-full h-12 px-6 bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/search"><Search className="h-4 w-4 mr-1.5" /> Search ScholarSync</Link>
                </Button>
                <Button asChild data-testid="cta-sage-final" size="lg" variant="outline" className="rounded-full h-12 px-6">
                  <Link href="/sage"><Sparkles className="h-4 w-4 mr-1.5" /> Ask Sage</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12" data-testid="site-footer">
        <div className="page-container grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-serif">S</span>
              </div>
              <span className="font-serif text-xl">ScholarSync</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
              An AI-powered educational discovery platform. Free for every learner, forever.
            </p>
          </div>
          {[
            { t: "Explore", l: [["Careers", "/explore"], ["Resources", "/resources"], ["Scholarships", "/scholarships"], ["Jobs", "/jobs"]] },
            { t: "Tools",   l: [["Search", "/search"], ["Sage AI", "/sage"], ["Wishlist", "/wishlist"]] },
          ].map((col) => (
            <div key={col.t}>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{col.t}</p>
              <ul className="mt-3 space-y-2">
                {col.l.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="page-container mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ScholarSync. Made with care for learners everywhere.</p>
          <p className="text-xs text-muted-foreground font-mono">v2 · 2026</p>
        </div>
      </footer>
    </>
  );
}
