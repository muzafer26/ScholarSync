import { careers } from "@/lib/seed-careers";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const career = careers.find((c) => c.slug === slug);

  if (!career) {
    return { title: "Career Not Found" };
  }

  return {
    title: `${career.title} Roadmap & Career Guide`,
    description: career.description,
    openGraph: {
      title: `${career.title} Roadmap | ScholarSync`,
      description: career.description,
      type: "article",
    },
  };
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
