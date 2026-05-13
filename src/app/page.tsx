"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Compass, BookOpen, GraduationCap, MessageSquare, Check, ChevronDown, Star, Zap, BarChart3, Award, Sparkles, ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const pillars = [
  { icon: Compass, title: "Career Roadmaps", desc: "Visual step-by-step paths for 20+ careers with skills, milestones, and curated resources.", href: "/explore", emoji: "🗺️" },
  { icon: BookOpen, title: "55+ Free Courses", desc: "From Harvard CS50 to MIT OCW, freeCodeCamp, NPTEL — quality-ranked, always free.", href: "/resources", emoji: "📚" },
  { icon: MessageSquare, title: "Sage AI Counselor", desc: "AI career counselor powered by Gemini. Ask about careers, skills, or scholarships 24/7.", href: "/sage", emoji: "✨" },
  { icon: GraduationCap, title: "Scholarship Finder", desc: "INSPIRE, Rhodes, Fulbright, NSP — find scholarships you qualify for with eligibility filters.", href: "/scholarships", emoji: "🎓" },
];

const partners = [
  { name: "MIT OCW", url: "https://ocw.mit.edu" },
  { name: "Harvard", url: "https://cs50.harvard.edu" },
  { name: "Khan Academy", url: "https://khanacademy.org" },
  { name: "freeCodeCamp", url: "https://freecodecamp.org" },
  { name: "Coursera", url: "https://coursera.org" },
  { name: "Google", url: "https://grow.google" },
  { name: "NPTEL", url: "https://nptel.ac.in" },
  { name: "fast.ai", url: "https://fast.ai" },
  { name: "Kaggle", url: "https://kaggle.com" },
  { name: "NCERT", url: "https://ncert.nic.in" },
];

const features = [
  { icon: Zap, title: "60-Second Career Quiz", desc: "Answer 5 questions → get a personalized career roadmap instantly." },
  { icon: Sparkles, title: "AI Recommendations", desc: "Sage learns your goals and suggests the perfect free resources." },
  { icon: BarChart3, title: "Progress Dashboard", desc: "Track milestones, completed courses, and your learning journey." },
  { icon: Award, title: "Quality Rankings", desc: "Every resource is scored 0-100. Learn from the best, skip the rest." },
];

const testimonials = [
  { quote: "Went from no direction to a clear data science roadmap using only free resources. This is incredible.", name: "Arjun K.", role: "Student, Nagpur" },
  { quote: "Found three scholarships I didn't know about. Got the INSPIRE fellowship!", name: "Meera S.", role: "BSc, Chennai" },
  { quote: "Sage helped me plan my switch from dev to product management. Better than most paid counselors.", name: "Priya R.", role: "PM, Pune" },
];

const faqs = [
  { q: "Is it really free?", a: "Yes. No hidden charges, no credit card, no premium tier. Core features are free forever. We believe education guidance should be accessible to everyone — rich or poor." },
  { q: "How does Sage AI work?", a: "Sage uses Google's Gemini AI to give personalized career advice. Ask about career paths, scholarships, resource recommendations, or learning roadmaps." },
  { q: "Where do the resources come from?", a: "We curate from MIT OCW, Harvard, Khan Academy, freeCodeCamp, Coursera (audit), NPTEL, fast.ai, Google, and more. Each is quality-ranked by AI." },
  { q: "Does it cover Indian exams?", a: "Yes — JEE, NEET, UPSC, CA, CLAT, GATE roadmaps plus scholarships like NSP, INSPIRE, PMSS, KVPY." },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left group">
        <span className="text-sm font-medium pr-4 group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="page-container pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Free for everyone, forever
            </div>
            <h1 className="text-4xl md:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
              Your career journey,<br />
              <span className="text-gradient">sorted.</span>
            </h1>
            <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed">
              Career roadmaps, 55+ free courses from the world&apos;s best universities, AI guidance, and scholarships — everything to go from confused to confident.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="h-11 px-6 rounded-lg text-sm font-medium">
                <Link href="/onboarding">Take the Career Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-11 px-6 rounded-lg text-sm font-medium">
                <Link href="/explore">Browse Careers</Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div className="hidden lg:flex justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <motion.img src="/hero-illustration.png" alt="Students collaborating" className="w-full max-w-md" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <motion.section className="border-y border-border" {...fade} transition={{ duration: 0.5 }}>
        <div className="page-container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "20+", label: "Career Roadmaps" },
              { value: "55+", label: "Free Courses" },
              { value: "50+", label: "Scholarships" },
              { value: "24/7", label: "AI Guidance" },
            ].map((s, i) => (
              <motion.div key={s.label} className="text-center md:text-left" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PARTNER LOGOS */}
      <section className="border-b border-border bg-muted/30">
        <div className="page-container py-8">
          <p className="text-center text-xs text-muted-foreground mb-5 uppercase tracking-widest">Resources from the world&apos;s best institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {partners.map((p) => (
              <motion.span key={p.name} className="text-sm font-semibold text-muted-foreground/60 hover:text-foreground transition-colors cursor-default" whileHover={{ scale: 1.05 }}>
                {p.name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section">
        <div className="page-container">
          <motion.div {...fade} transition={{ duration: 0.5 }}>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">What we offer</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">Four pillars. One platform.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={p.href} className="group">
                  <div className="glass-card p-6 card-hover h-full flex gap-4">
                    <div className="text-2xl mt-0.5">{p.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-semibold text-[15px] group-hover:text-primary transition-colors">{p.title}</h3>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section bg-muted/40 border-y border-border">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade} transition={{ duration: 0.5 }} className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center"><BarChart3 className="h-4 w-4 text-primary" /></div>
                <div><p className="text-sm font-semibold">Your Progress</p><p className="text-xs text-muted-foreground">Personalized dashboard</p></div>
              </div>
              <div className="space-y-4">
                {[{ name: "Data Structures", pct: 75, c: "bg-emerald-500" }, { name: "System Design", pct: 45, c: "bg-amber-500" }, { name: "Machine Learning", pct: 30, c: "bg-primary" }].map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">{s.name}</span><span className="font-medium">{s.pct}%</span></div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden"><motion.div className={cn("h-full rounded-full", s.c)} initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-2"><Award className="h-4 w-4 text-primary" /><span className="text-xs font-medium">3 milestones completed this week</span></div>
            </motion.div>
            <motion.div {...fade} transition={{ duration: 0.5, delay: 0.2 }}>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Features</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Built for learners who mean business.</h2>
              <div className="space-y-5">
                {features.map((f, i) => (
                  <motion.div key={f.title} className="flex gap-3.5" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="p-2 rounded-lg bg-primary/10 h-fit mt-0.5"><f.icon className="h-4 w-4 text-primary" /></div>
                    <div><h4 className="font-semibold text-sm mb-0.5">{f.title}</h4><p className="text-sm text-muted-foreground">{f.desc}</p></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="page-container max-w-3xl text-center">
          <motion.div {...fade} transition={{ duration: 0.6 }}>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Our mission</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">No one should remain without guidance because of a lack of resources.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Good education exists — but it&apos;s scattered, paywalled, or hard to find. ScholarSync connects the dots.
              Whether you&apos;re a student in a tier-3 city, a first-generation college-goer, or switching careers — we&apos;re here for you. <strong>Money is not a factor.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Always free", "No ads ever", "No data selling", "Open to everyone"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm"><Check className="h-3.5 w-3.5 text-primary" />{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-muted/40 border-y border-border">
        <div className="page-container">
          <motion.div {...fade}><p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Testimonials</p><h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">Learners love it.</h2></motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} className="glass-card p-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">{t.name.charAt(0)}</div>
                  <div><p className="text-xs font-semibold">{t.name}</p><p className="text-[11px] text-muted-foreground">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="page-container max-w-2xl">
          <motion.div {...fade}><p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">FAQ</p><h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Common questions.</h2></motion.div>
          <div className="glass-card px-6 py-1 rounded-xl">{faqs.map((f) => <FAQ key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* CTA */}
      <motion.section className="page-container py-20 text-center" {...fade}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">60-second quiz → personalized roadmap → free courses. No signup required.</p>
        <Button size="lg" asChild className="h-11 px-8 rounded-lg text-sm font-medium">
          <Link href="/onboarding">Start the Career Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3"><div className="h-6 w-6 rounded bg-foreground flex items-center justify-center"><span className="text-background text-[10px] font-bold">S</span></div><span className="font-semibold text-sm">ScholarSync</span></div>
              <p className="text-xs text-muted-foreground leading-relaxed">Free career discovery for everyone, everywhere.</p>
            </div>
            {[
              { t: "Explore", l: [["Career Roadmaps", "/explore"], ["Resources", "/resources"], ["Scholarships", "/scholarships"]] },
              { t: "Tools", l: [["Sage AI", "/sage"], ["Career Quiz", "/onboarding"], ["Search", "/search"]] },
              { t: "Company", l: [["About", "/about"], ["Privacy", "/about"], ["Terms", "/about"]] },
            ].map((col) => (
              <div key={col.t}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{col.t}</h4>
                <ul className="space-y-2">{col.l.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ScholarSync</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">{["Free forever", "No ads", "No data selling"].map((t) => <span key={t} className="flex items-center gap-1"><Check className="h-3 w-3 text-primary" />{t}</span>)}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
