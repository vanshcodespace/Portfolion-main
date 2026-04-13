"use client";

import { motion, useWillChange } from "framer-motion";
import {
  GraduationCap,
  Code2,
  Database,
  Layout,
  Server,
  Cpu,
  Award,
} from "lucide-react";

export default function About() {
  const willChange = useWillChange();

  // Helper: Handles both local images and CDN icons
  const getIconUrl = (icon) => {
    // If it starts with "/", it's a local file in /public
    if (icon.startsWith("/")) {
      return icon;
    }
    // Otherwise, fetch from Simple Icons CDN
    return `https://cdn.simpleicons.org/${icon}`;
  };

  const skillCategories = [
    {
      title: "Frontend & Design",
      icon: Layout,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      skills: [
        { name: "React.js", icon: "react" },
        { name: "Next.js", icon: "nextdotjs" },
        { name: "Tailwind", icon: "tailwindcss" },
        { name: "JavaScript", icon: "javascript" },
       
        { name: "HTML5", icon: "html5" },
        { name: "CSS3", icon: "css" },
      ],
    },
    {
      title: "Backend & Cloud",
      icon: Server,
      color: "text-green-500",
      bg: "bg-green-500/10",
      skills: [
        { name: "Node.js", icon: "nodedotjs" },
        { name: "Express", icon: "express" },
        { name: "AWS", icon: "/aws.png" },
        { name: "Cloudinary", icon: "cloudinary" },
      ],
    },
    {
      title: "Database",
      icon: Database,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      skills: [
        { name: "MongoDB", icon: "mongodb" },
        { name: "Firebase Firestore", icon: "firebase" },
       
      ],
    },
    {
      title: "Core & Tools",
      icon: Cpu,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      skills: [
        { name: "Java", icon: "openjdk" },
        { name: "C++", icon: "cplusplus" },
        { name: "Python", icon: "python" },
        { name: "Git", icon: "git" },
        // UPDATED: Using your local image
        { name: "VS Code", icon: "/vscode.png" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="About"
      className="py-20 relative overflow-hidden bg-gray-50/20 dark:bg-black/10"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ willChange }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400  to-blue-500 ">
              About Me
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-base">
            A glimpse into my journey, education, and the technical arsenal I
            use to build digital products.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* 1. Summary Card (Top Row, Spans 2) */}
          <motion.div
            variants={itemVariants}
            style={{ willChange }}
            className="md:col-span-2 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                <Code2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Who am I?
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              Frontend-Focused Full-Stack Software Engineer specializing in React.js and Firebase, building responsive, user-centric, and data-driven web applications. Final-year B.E. Computer Engineering student (CGPA 8.88), currently interning at Gryphon Academy, contributing to frontend development, API integration, and production-ready features.
            </p>
          </motion.div>

          {/* 2. Education Card (Top Row, Spans 1) */}
          <motion.div
            variants={itemVariants}
            style={{ willChange }}
            className="md:col-span-1 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg flex flex-col justify-evenly"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Education
                </h3>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                B.E. Computer Engineering
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                Chitkara University
              </p>
            </div>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-end">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  CGPA
                </span>
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  8.88
                </span>
              </div>
            </div>
          </motion.div>

          {/* 3. Skills Cards (Middle Rows) */}
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              style={{ willChange }}
              className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-xl ${category.bg} ${category.color}`}
                >
                  <category.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-default group"
                  >
                    {/* CDN Icon Image */}
                    <img
                      src={getIconUrl(skill.icon)}
                      alt={skill.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* 4. Certifications (Bottom Row) */}
          <motion.div
            variants={itemVariants}
            style={{ willChange }}
            className="md:col-span-2 bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-600 dark:text-yellow-500">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Certifications & Extra
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "Full Stack Development",
                "Git & GitHub",
                "Responsive Web Design",
                
              ].map((cert, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
