import { Suspense } from "react";
import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading contact...</div>}>
      <div className="pt-10"></div>
      <Contact />
    </Suspense>
  );
}
