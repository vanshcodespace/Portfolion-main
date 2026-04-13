"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useWillChange,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  FileText,
  ArrowRight,
  Code2,
  Terminal,
  Database,
  Cloud,
  MapPin,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const floatingIcons = [
  { icon: Code2, color: "text-blue-500", x: -120, y: -50 },
  { icon: Terminal, color: "text-green-500", x: 140, y: -20 },
  { icon: Database, color: "text-purple-500", x: 100, y: 120 },
  { icon: Cloud, color: "text-pink-500", x: -100, y: 100 },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = useMemo(
    () => [ "Frontend Developer", "Full Stack Developer"],
    []
  );

  const { scrollY } = useScroll();
  const willChange = useWillChange();

  // Optimized transform: Use smaller ranges to reduce calculation frequency
  const y1 = useTransform(scrollY, [0, 400], [0, 100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-5 transform-gpu">
      {/* --- BACKGROUND --- 
          Optimization: Replaced Framer Motion with CSS keyframes for background blobs to save main-thread JS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-blob"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* --- LEFT CONTENT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Software Engineer | Full Stack
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 transform-gpu">
             Vansh Singla
            </span>
          </h1>

          {/* Typewriter Optimization: Using AnimatePresence and fixed height to prevent Layout Shift (CLS) */}
          <div className="h-10 mb-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center lg:justify-start gap-2 overflow-hidden">
            <span>I am a</span>
            <div className="relative h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-900 dark:text-white font-bold border-b-2 border-cyan-400 whitespace-nowrap"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
           Full Stack Developer specializing in React.js and Firebase, building scalable web applications with real-time data and authentication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="#Projects"
              className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <a
              href="/Vansh.pdf"
              download
              className="px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 font-semibold transition-all hover:bg-blue-50/50 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> Resume
            </a>
          </div>

          {/* Location & Socials */}
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Yamunanagar, Haryana</span>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT VISUAL --- */}
        <motion.div
          style={{ y: y1, willChange }}
          className="relative flex justify-center items-center order-1 lg:order-2 transform-gpu"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-2xl opacity-60 scale-110" />

          <div className="relative w-72 h-72 md:w-96 md:h-96 z-10">
            {/* Optimization: CSS animation for the rotation to avoid JS execution */}
            <div className="absolute -inset-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-full animate-spin-slow" />

            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="Vansh Singla"
                fill
                className="object-cover"
                priority
                fetchPriority="high" // Critical for LCP
                sizes="(max-width: 768px) 288px, 384px" // Precise sizes prevents over-fetching
              />
            </div>

            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className={`absolute p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 ${item.color}`}
                initial={{ x: item.x, y: item.y }}
                animate={{ y: [item.y - 10, item.y + 10, item.y - 10] }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + index,
                  ease: "easeInOut",
                }}
                style={{
                  willChange: "transform",
                  top: "50%",
                  left: "50%",
                  marginTop: "-24px",
                  marginLeft: "-24px",
                }}
              >
                <item.icon className="w-6 h-6" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
