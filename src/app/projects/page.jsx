import { Suspense } from "react";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects",
  description:
    "Selected backend and full stack projects by Sumedh Sangle, including enterprise systems and open-source work.",
};

export default function ProjectPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="pt-10"></div>
      <Projects />
    </Suspense>
  );
}

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin" />
    </div>
  );
}
