import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: {
    default: "ScholarSync — Free Career Discovery & Learning Platform",
    template: "%s | ScholarSync",
  },
  description:
    "Discover career paths, access curated free resources, get AI guidance, and find scholarships — all without paywalls. Your journey starts here.",
  keywords: [
    "career guidance",
    "free courses",
    "scholarships",
    "career roadmap",
    "AI counselor",
    "learning platform",
    "JEE prep",
    "NEET prep",
    "UPSC resources",
    "free education",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        <AuthProvider>
          <div className="relative flex min-h-dvh flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
