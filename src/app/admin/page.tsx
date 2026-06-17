"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, Search, AlertCircle, Bookmark, RefreshCw, Trash2, ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

interface SearchLog {
  timestamp: string;
  query: string;
  resultCount: number;
  clickedResults: string[];
}

export default function AdminDashboard() {
  const [logs, setLogs] = useState<SearchLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("scholar-sync-search-analytics");
        setLogs(saved ? JSON.parse(saved) : []);
      } catch (e) {
        console.error("Failed to load logs", e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const clearLogs = () => {
    if (confirm("Are you sure you want to clear all telemetry logs?")) {
      localStorage.removeItem("scholar-sync-search-analytics");
      setLogs([]);
    }
  };

  // Metrics computation
  const totalSearches = logs.length;
  const failedSearches = logs.filter(l => l.resultCount === 0);
  const failureRate = totalSearches > 0 ? ((failedSearches.length / totalSearches) * 100).toFixed(1) : "0.0";

  // Top Searches ranking
  const searchCounts: Record<string, number> = {};
  logs.forEach(l => {
    const q = l.query.trim().toLowerCase();
    if (q) searchCounts[q] = (searchCounts[q] || 0) + 1;
  });
  const topSearches = Object.entries(searchCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Top Failed Searches ranking
  const failedCounts: Record<string, number> = {};
  failedSearches.forEach(l => {
    const q = l.query.trim().toLowerCase();
    if (q) failedCounts[q] = (failedCounts[q] || 0) + 1;
  });
  const topFailed = Object.entries(failedCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="page-container pt-28 pb-20">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3 text-emerald-500 font-mono text-[13px] font-bold uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> Administrator Console
            </div>
            <h1 className="text-[34px] font-serif font-bold tracking-tight text-foreground">
              Search Analytics & Telemetry
            </h1>
            <p className="text-[15px] font-serif text-muted-foreground mt-1">
              Real-time audit logs of student career searches, routing metrics, and resource clicks.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadLogs} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={clearLogs} className="gap-2">
              <Trash2 className="h-4 w-4" /> Clear Logs
            </Button>
          </div>
        </div>

        {/* Bento Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="surface p-6 rounded-md border border-border bevel-card flex flex-col justify-between">
            <span className="text-[12px] font-mono font-bold uppercase text-muted-foreground tracking-widest block mb-4">
              Total Searches Logged
            </span>
            <div>
              <span className="text-[36px] font-serif font-bold text-primary">{totalSearches}</span>
              <span className="text-[12px] font-mono text-muted-foreground block mt-2">Active session queries</span>
            </div>
          </div>

          <div className="surface p-6 rounded-md border border-border bevel-card flex flex-col justify-between">
            <span className="text-[12px] font-mono font-bold uppercase text-muted-foreground tracking-widest block mb-4">
              Failed Queries (Zero Results)
            </span>
            <div>
              <span className="text-[36px] font-serif font-bold text-red-500">{failedSearches.length}</span>
              <span className="text-[12px] font-mono text-muted-foreground block mt-2">Failure Rate: {failureRate}%</span>
            </div>
          </div>

          <div className="surface p-6 rounded-md border border-border bevel-card flex flex-col justify-between">
            <span className="text-[12px] font-mono font-bold uppercase text-muted-foreground tracking-widest block mb-4">
              Telemetry Status
            </span>
            <div>
              <span className="text-[20px] font-mono font-bold text-emerald-500 uppercase tracking-wide">ACTIVE</span>
              <span className="text-[12px] font-mono text-muted-foreground block mt-2">Listening on /api/search-analytics</span>
            </div>
          </div>
        </div>

        {/* Top Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Top Searches */}
          <div className="surface p-6 rounded-md border border-border bevel-card">
            <h3 className="text-[16px] font-mono font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
              <Search className="h-4 w-4" /> Top Successful Queries
            </h3>
            {topSearches.length > 0 ? (
              <div className="space-y-3 font-serif">
                {topSearches.map(([query, count], idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-border last:border-0 text-[14px]">
                    <span className="text-foreground font-bold font-mono">“{query}”</span>
                    <span className="text-muted-foreground font-mono">{count} hit{count > 1 ? "s" : ""}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-muted-foreground font-serif">No logs recorded yet. Try running queries in the main search page.</p>
            )}
          </div>

          {/* Top Failed Searches */}
          <div className="surface p-6 rounded-md border border-border bevel-card">
            <h3 className="text-[16px] font-mono font-bold uppercase tracking-wider text-red-500 mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Top Unresolved Mismatches
            </h3>
            {topFailed.length > 0 ? (
              <div className="space-y-3 font-serif">
                {topFailed.map(([query, count], idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-border last:border-0 text-[14px]">
                    <span className="text-foreground font-bold font-mono">“{query}”</span>
                    <span className="text-red-500 font-mono">{count} fail{count > 1 ? "s" : ""}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-muted-foreground font-serif">Zero failed queries registered. All user queries successfully resolved!</p>
            )}
          </div>
        </div>

        {/* Raw Logs Table */}
        <div className="surface p-6 rounded-md border border-border bevel-card">
          <h3 className="text-[16px] font-mono font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
            <BarChart2 className="h-4 w-4" /> Real-time Audit Stream
          </h3>
          {logs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[12px]">
                <thead>
                  <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
                    <th className="py-3">Timestamp</th>
                    <th className="py-3">Query</th>
                    <th className="py-3 text-right">Result Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {logs.slice().reverse().map((log, idx) => (
                    <tr key={idx} className="hover:bg-secondary/40 transition-colors">
                      <td className="py-3 text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="py-3 text-foreground font-bold">“{log.query}”</td>
                      <td className={`py-3 text-right font-bold ${log.resultCount === 0 ? "text-red-500" : "text-emerald-500"}`}>
                        {log.resultCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[14px] text-muted-foreground font-serif">No search history recorded.</p>
          )}
        </div>
      </main>
    </div>
  );
}
