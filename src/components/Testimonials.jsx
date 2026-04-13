import TestimonialsCarousel from "./TestimonialsCarousel";
import { Suspense } from "react";

export default function Testimonials() {
  return (
    <Suspense fallback={<div>Loading testimonials...</div>}>
      <div id="Testimonials" className="">
        <TestimonialsCarousel />
      </div>
    </Suspense>
  );
}
