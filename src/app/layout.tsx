import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { WishlistProvider } from "@/context/wishlist-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://scholarsync.app"),
  title: {
    default: "ScholarSync — Discover your future, beautifully.",
    template: "%s · ScholarSync",
  },
  description:
    "An AI-powered educational discovery platform — careers, scholarships, internships, and free learning resources. Free for every learner, forever.",
  keywords: [
    "scholarsync", "educational discovery", "career guidance",
    "free courses", "scholarships", "internships",
    "Sage AI", "AI mentor", "career roadmap",
  ],
  openGraph: {
    title: "ScholarSync — Discover your future, beautifully.",
    description:
      "AI-powered educational discovery for careers, scholarships, internships, and learning resources. Free for every learner.",
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
        <WishlistProvider>
          <div className="relative flex min-h-dvh flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </WishlistProvider>
      </body>
    </html>
  );
}
