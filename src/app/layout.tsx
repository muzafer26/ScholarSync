import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://scholarsync.app"),
  title: {
    default: "ScholarSync — Discover your future, beautifully.",
    template: "%s · ScholarSync",
  },
  description:
    "A premium Career Decision Engine — mapping careers, skills, and verified free learning resources. Free for every student, forever.",
  keywords: [
    "scholarsync", "educational discovery", "career guidance",
    "free courses", "scholarships", "internships",
    "Career Decision Engine", "career discovery", "career roadmap",
  ],
  openGraph: {
    title: "ScholarSync — Discover your future, beautifully.",
    description:
      "Premium Career Decision Engine for discoverability of careers, skills, and verified free learning resources.",
    siteName: "ScholarSync",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="relative flex min-h-dvh flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
