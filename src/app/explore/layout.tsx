import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Careers & Roadmaps",
  description: "Browse step-by-step career roadmaps for Software Engineering, Data Science, Design, and more. Find the skills and resources you need to get hired.",
  openGraph: {
    title: "Explore Careers & Roadmaps | ScholarSync",
    description: "Visual roadmaps for modern careers. Pick a path to see the full journey — skills, resources, and milestones.",
    type: "website",
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
