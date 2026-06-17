import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ScholarSync's mission to provide free, high-trust career guidance and educational resources without overwhelming beginners.",
  openGraph: {
    title: "About ScholarSync | Mission & Philosophy",
    description: "Discover why ScholarSync exists and our commitment to 100% free educational resources and validated career roadmaps.",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
