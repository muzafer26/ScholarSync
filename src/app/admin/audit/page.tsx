"use client";

import { allResources, allCareers, allJobs, TRENDING_QUERIES } from "@/lib/search";
import { validateRoadmap } from "@/lib/roadmapValidation";
import { Header } from "@/components/layout/header";
import { AlertTriangle, CheckCircle2, Shield, Activity, FileText, Briefcase, Search } from "lucide-react";

export default function AdminAuditPage() {
  const verifiedResources = allResources.filter(r => r.verified).length;
  const unverifiedResources = allResources.length - verifiedResources;
  const eliteResources = allResources.filter(r => r.qualityScore >= 90).length;

  const validCareers = allCareers.filter(c => validateRoadmap(c).isPacedCorrectly).length;
  const invalidCareers = allCareers.length - validCareers;

  return (
    <>
      <Header />
      <div className="page-container py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-display font-bold flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            System Audit Dashboard
          </h1>
          <p className="text-muted-foreground">Internal tool for tracking platform health and trust metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Resources Audit */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-4 border-b border-border pb-3">
              <FileText className="h-5 w-5 text-blue-500" />
              Resources
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Total</span>
                <span className="font-bold">{allResources.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Verified
                </span>
                <span className="font-bold text-emerald-500">{verifiedResources}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-500" /> Unverified
                </span>
                <span className="font-bold text-rose-500">{unverifiedResources}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-muted-foreground text-sm">Elite Quality (90+)</span>
                <span className="font-bold text-amber-500">{eliteResources}</span>
              </div>
            </div>
          </div>

          {/* Careers Audit */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Activity className="h-5 w-5 text-purple-500" />
              Careers & Roadmaps
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Total Careers</span>
                <span className="font-bold">{allCareers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Validated
                </span>
                <span className="font-bold text-emerald-500">{validCareers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Needs Review
                </span>
                <span className="font-bold text-amber-500">{invalidCareers}</span>
              </div>
            </div>
          </div>

          {/* Jobs Audit */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Briefcase className="h-5 w-5 text-emerald-500" />
              Jobs
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Active Jobs</span>
                <span className="font-bold text-emerald-500">{allJobs.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-500" /> Expired (&gt;30d)
                </span>
                <span className="font-bold text-rose-500">0</span>
              </div>
            </div>
          </div>

          {/* Search Audit */}
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Search className="h-5 w-5 text-rose-500" />
              Search Trends
            </h2>
            <div className="space-y-2">
              {TRENDING_QUERIES.slice(0, 4).map((q, i) => (
                <div key={q} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}.</span>
                  <span className="text-sm font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invalid Roadmaps List */}
        {invalidCareers > 0 && (
          <div className="glass-card p-6 border border-rose-500/20">
            <h2 className="font-semibold text-lg flex items-center gap-2 mb-4 text-rose-500">
              <AlertTriangle className="h-5 w-5" />
              Roadmaps Requiring Immediate Fix
            </h2>
            <div className="space-y-4">
              {allCareers.filter(c => !validateRoadmap(c).isPacedCorrectly).map(c => {
                const validation = validateRoadmap(c);
                return (
                  <div key={c.id} className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                    <h3 className="font-bold mb-2 flex items-center justify-between">
                      {c.title}
                      <span className="text-xs bg-rose-500/20 text-rose-500 px-2 py-1 rounded-md">Score: {validation.confidenceScore}%</span>
                    </h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {validation.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
