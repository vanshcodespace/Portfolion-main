import { Suspense } from "react";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <Suspense fallback={"<div>Loading about...</div>"}>
      <div className="pt-10"></div>
      <About />
    </Suspense>
  );
}
