import { motion } from "framer-motion";
import { Suspense } from "react";
import Experience from "@/components/Experience";

export default function ExperiencePage() {
  return (
    <Suspense fallback={<div>Loading experience...</div>}>
      <div className="pt-10"></div>
      <Experience />
    </Suspense>
  );
}
