
import { allResources } from "@/lib/data";
import { InteractiveCourseBook } from "@/components/interactive-course-book";
import { type Course } from "@/lib/types";

export default function CoursesPage() {
  const courseResources = allResources.filter(r => r.type === 'course') as Course[];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary font-sans">
          The Scholar's Codex
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Click on the pages to flip through the catalog.
        </p>
      </div>
      <InteractiveCourseBook items={courseResources} />
    </div>
  );
}
