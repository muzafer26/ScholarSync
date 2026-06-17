import React from "react";
import { AlertCircle, Info, Lightbulb } from "lucide-react";

interface BlockProps {
  children: React.ReactNode;
  title?: string;
}

export function CalloutBlock({ children, title }: BlockProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-md bg-secondary border border-border my-6">
      <div className="mt-0.5 flex-shrink-0 text-xl">💡</div>
      <div className="flex-1 text-sm leading-relaxed text-foreground">
        {title && <div className="font-bold mb-1">{title}</div>}
        {children}
      </div>
    </div>
  );
}

export function WarningBlock({ children, title = "Reality Check" }: BlockProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-md bg-amber-500/10 border border-amber-500/20 my-6">
      <div className="mt-0.5 flex-shrink-0 text-amber-600 text-xl">⚠</div>
      <div className="flex-1 text-sm leading-relaxed text-foreground">
        {title && <div className="font-bold text-amber-800 mb-1">{title}</div>}
        <div className="text-amber-900/90">{children}</div>
      </div>
    </div>
  );
}

export function InfoBlock({ children, title = "Recommended Path" }: BlockProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-md bg-blue-500/10 border border-blue-500/20 my-6">
      <div className="mt-0.5 flex-shrink-0 text-blue-600 text-xl">📘</div>
      <div className="flex-1 text-sm leading-relaxed text-foreground">
        {title && <div className="font-bold text-blue-800 mb-1">{title}</div>}
        <div className="text-blue-900/90">{children}</div>
      </div>
    </div>
  );
}
