"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useWillChange,
} from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const experiences = [
  {
    id: 1,
    role: "Software Developer Intern",
    company: "Gryphon Academy Pvt Ltd",
    location: "Baner, Pune",
    period: "Feb 2026 - Present",
    description: [
      "Built a responsive mock test web application with timed exams and real-time result analysis using React and Firebase.",
      "Developed an ERP-based certification system with role-based dashboards (Super Admin,College Admin, Student)",
      "Implemented features for college onboarding, student management, certification enrollment, and progress tracking.",
      "Enhanced UI/UX and added form validations for a seamless user experience.",
    ],
    tech: ["React.js", "Firebase", "Tailwind CSS", "Vite"],
    image: "/gryphonlogo.png",
  },
  {
    id: 2,
    role: "Associate System Analyst",
    company: "Aurus",
    location: "Pune, Maharashtra",
    period: "Oct 2025 - Jan 2026",
    description: [
      "Analyse Production issues and system logs to ensure smooth transaction processing",
      "Monitor platform performance and assist in validating payment workflows.",
      "Collaborate with cross functional teams to resolve incidents and improve system reliability",
    ],
    tech: ["Node.js", "MongoDB", "REST APIs", "Next.js"],
    image: "/aurus-logo.png",
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "Datagami Technologies services Pvt. Ltd",
    location: "Remote",
    period: "Jan 2025 - Sept 2025",
    description: [
      "Developed and enhanced production features for the company website using React.js and Next.js",
      "Implemented Responsive login and registration flows with form validation.",
      "Improved UI responsiveness and accessibility across devices.",
      
    ],
    tech: ["Node.js", "MongoDB", "REST APIs", "Next.js"],
    image: "/datagamilogo.webp",
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const willChange = useWillChange(); // Optimizes animation performance

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll to top percentage
  const top = useTransform(scrollY, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="Experience"
      className="py-20 overflow-hidden bg-gray-50/50 dark:bg-black/20 transform-gpu"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey in building scalable software solutions.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* --- THE SCROLLING INDICATOR --- */}
          <motion.div
            style={{ top, willChange }}
            className="absolute left-4 md:left-1/2 z-20 -translate-y-1/2 md:-translate-x-1/2 transform-gpu"
          >
            <div className="relative w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Your Favicon/Icon back in the center */}
              <Image
                src="/favicon.ico"
                alt="Scroll Indicator"
                width={24}
                height={24}
                className="object-contain"
                priority // Small file, safe to prioritize
              />

              {/* Subtle Glow behind the icon */}
              <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20 -z-10 animate-pulse" />
            </div>
          </motion.div>

          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-center transform-gpu ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="ml-10 md:ml-0 md:w-1/2 w-full">
                  <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 shadow-lg group relative overflow-hidden transform-gpu">
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20">
                          <Briefcase size={14} />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-gray-500">
                          <Calendar size={12} />
                          {exp.period}
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                        <MapPin size={12} />
                        {exp.location}
                      </div>

                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                          >
                            <span className="mt-1.5 min-w-[5px] h-1.25 rounded-full bg-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-[10px] font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Component with sizing optimization */}
                <div className="hidden md:block md:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative h-[280px] w-full rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl transform-gpu bg-white dark:bg-white flex items-center justify-center"
                  >
                    <Image
                      src={exp.image}
                      alt={`${exp.company} Work`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-contain p-8"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
