"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Heart, Globe, BookOpen, Users, Shield, ArrowRight,
  GraduationCap, Code, Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="page-container pb-16">
        {/* Hero */}
        <div className="page-header max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            About ScholarSync
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            We believe no one should remain without guidance because of a lack of access to
            resources. ScholarSync is a free, AI-powered learning and career discovery platform
            built for everyone — everywhere.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="glass-card p-8 md:p-12 max-w-3xl">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-4">Our Mission</h2>
            <blockquote className="text-lg text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-6">
              &ldquo;No one should remain illiterate because of a lack of access to guidance or
              resources.&rdquo;
            </blockquote>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Good career guidance and world-class learning resources exist — but they&apos;re
              scattered, paywalled, or hard to navigate. ScholarSync connects the dots.
              We aggregate the best free resources globally, provide AI-powered personalized
              guidance, and build career roadmaps that anyone can follow — whether you&apos;re
              a 16-year-old in a tier-3 Indian town, a career-switcher in Europe, or a
              first-generation college student anywhere in the world.
            </p>
          </div>
        </section>

        {/* What we provide */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8">What we provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code, title: "Career Roadmaps", desc: "Step-by-step visual roadmaps for 200+ careers across tech, finance, medicine, law, design, civil services, and more." },
              { icon: BookOpen, title: "Free Resources", desc: "AI-curated library of the best free courses from MIT OCW, Khan Academy, freeCodeCamp, OSSU, and many more." },
              { icon: Sparkles, title: "AI Counselor", desc: "Sage, our AI career counselor, provides 24/7 personalized guidance — career advice, resource recommendations, and roadmap planning." },
              { icon: GraduationCap, title: "Scholarships", desc: "Comprehensive database of scholarships — from Indian government schemes (NSP, INSPIRE) to global awards (Rhodes, Chevening)." },
              { icon: Users, title: "Community", desc: "Connect with peers, mentors, and professionals through field-based forums and mentorship sessions." },
              { icon: Shield, title: "Always Free", desc: "Core features are free forever. No paywalls, no ads, no selling of user data. Free for everyone, everywhere." },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-3">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-display font-bold mb-6">Our Principles</h2>
          <div className="space-y-4">
            {[
              { title: "Free forever", desc: "Core features will never be paywalled. Education is a right, not a privilege." },
              { title: "No data selling", desc: "We never sell user data. Your information is yours." },
              { title: "Quality over quantity", desc: "Every resource is quality-ranked by AI. We'd rather list 100 great resources than 10,000 mediocre ones." },
              { title: "Global + local", desc: "We serve learners worldwide while providing India-specific resources (JEE, NEET, UPSC, government scholarships)." },
              { title: "Accessible", desc: "Mobile-first, WCAG 2.1 AA compliant, and designed for learners with limited internet access." },
            ].map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-display font-bold mb-4">Ready to start?</h2>
          <p className="text-muted-foreground mb-6">
            Take a 60-second quiz and get your personalized career roadmap.
          </p>
          <Button size="lg" asChild className="rounded-xl h-12 px-8">
            <Link href="/onboarding">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </>
  );
}
