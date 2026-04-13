import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="w-full relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-600 dark:selection:text-blue-400">
      <Hero />
      <About />
      <Experience />
      <Projects />
      
      <Contact />
    </div>
  );
}
