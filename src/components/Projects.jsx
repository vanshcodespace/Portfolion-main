"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Building2,
  Code2,
  X,
  Server,
  Database,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// --- DATA ---
// (Keeping your data exactly as is, it was excellent)
const workProjects = [
{
  title: "Certificate ERP System",
  role: "Internship @ Gryphon Academy",
  description:
    "A role-based certificate management system designed to streamline academic workflows across institutions, enabling centralized control for super admins, operational visibility for colleges, and transparent result access for students.",
  highlights: [
    "Implemented a multi-role architecture (Super Admin, College Admin, Student) with clear access control and workflow separation.",
    "Enabled Super Admins to onboard colleges, creating a scalable multi-tenant system structure.",
    "Built College Admin workflows to add students, create certificates, enroll candidates, and declare results efficiently.",
    "Designed enrollment and result pipelines to track student progress across certificates with status mapping (Enrolled, Passed, Failed).",
    "Developed analytics dashboards for College Admins to monitor certificate-wise student counts and performance distribution.",
    "Provided students with a personalized dashboard to view enrolled certificates and final results in real-time.",
  ],
  tech: ["REST API", "Next.js", "Firebase", "MongoDB"],
  link: "#",
  image: "/projects/certificate.png",
  color: "from-indigo-500/20 to-blue-500/5",
},
  {
  title: "CET Examination & Result System",
  role: "Internship @ Gryphon Academy",
  description:
    "A web-based centralized examination platform designed to manage candidate registration, test workflows, and result processing efficiently, with a focus on scalability, structured data handling, and real-time result access.",
  highlights: [
    "Built a complete examination workflow including candidate registration, test participation, and result declaration.",
    "Designed structured dashboards for managing exam data, candidate details, and performance insights.",
    "Implemented real-time result visibility, enabling students to instantly check their scores and qualification status.",
    "Handled dynamic data rendering and state management for seamless user experience across multiple roles.",
    "Optimized frontend performance and routing using Next.js deployed on Vercel for fast global delivery.",
    "Ensured scalable backend integration for handling concurrent users during exam and result windows."
  ],
  tech: ["Next.js", "React.js", "Firebase / MongoDB", "REST API", "Vercel"],
  link: "#",
  image: "/projects/cet.png",
  color: "from-purple-500/20 to-pink-500/5"
},
 {
  title: "Gryphon Academy Website",
  role: "Internship @ Gryphon Academy",
  description:
    "A modern, responsive institutional website built to showcase Gryphon Academy’s programs, faculty, and student success stories, designed to bridge the gap between academia and industry through a strong digital presence.",
  highlights: [
    "Developed a fully responsive and visually engaging website to present academy offerings, courses, and placement success.",
    "Structured multiple sections including programs, leadership, testimonials, blogs, and contact for a complete institutional experience.",
    "Designed dynamic course display pages highlighting aviation and hospitality training programs with career outcomes.",
    "Integrated student testimonials and success stories to build credibility and improve user trust.",
    "Implemented modern UI/UX with smooth navigation, animations, and optimized performance using Next.js.",
    "Built scalable component-based architecture to support future content expansion and multi-page routing."
  ],
  tech: ["Next.js", "React.js", "Tailwind CSS", "Vercel"],
  link: "3",
  image: "/projects/gryphon.png",
  color: "from-blue-500/20 to-indigo-500/5"
}
];

const engineeringProjects = [
  {
    title: "BlindSpark - Real-Time Video Matching Platform",
    badge: "Real-Time Communication",
    description:
      "A peer-to-peer video communication platform that connects users by shared interests with low-latency WebRTC sessions and seamless peer transitions.",
    highlights: [
      "Built WebRTC + Socket.io signaling workflows for queueing, session transitions, and smooth peer switching.",
      "Implemented moderation with reporting, evidence capture, and ban enforcement using Firebase Firestore and Cloudinary.",
      "Improved network reliability with ICE candidate exchange and STUN/TURN integration across restrictive NAT environments.",
      "Repos: Frontend - github.com/sanglesumedh/blindspark_frontend, Backend - github.com/sanglesumedh/blindspark.",
    ],
    tech: [
      "WebRTC",
      "Socket.io",
      "Firebase Firestore",
      "Cloudinary",
      "ICE/STUN/TURN",
      "Secure Auth",
    ],
    link: "https://blindspark.sumedhsangle.space",
    github: "https://github.com/sanglesumedh/blindspark_frontend",
    image: "/NoImage.png",
    icon: <Server size={18} />,
  },
  {
    title: "CodeMailer - Cold Email Automation Platform",
    badge: "Full Stack Automation",
    description:
      "A full-stack outreach system for personalized bulk email campaigns with SMTP, template rendering, and scalable backend processing.",
    highlights: [
      "Implemented batch email workflows with dynamic template variables to improve deliverability and prevent rate limiting.",
      "Built recipient import pipelines for Excel/JSON datasets and attachment management for targeted outreach.",
      "Added Firebase Firestore analytics for sent mail, replies, and engagement trends with secure client-side SMTP credential encryption.",
    ],
    tech: [
      "Next.js App Router",
      "SMTP",
      "Firebase Firestore",
      "Serverless API Routes",
      "Excel/JSON Processing",
      "Client-Side Encryption",
    ],
    link: "https://mails.sumedhsangle.space",
    github: "https://github.com/sanglesumedh/codemailer",
    image: "/NoImage.png",
    icon: <ShieldCheck size={18} />,
  },
  {
    title: "DebugDen Q&A Platform",
    badge: "Full Stack Social",
    description:
      "A developer community platform featuring reputation systems and AI-assisted answers.",
    highlights: [
      "Modeled complex relational data (Questions -> Answers -> Comments).",
      "Implemented reputation-based voting logic similar to StackOverflow.",
      "Integrated AI for automated answer suggestions.",
    ],
    tech: ["Next.js", "Appwrite", "Zustand", "Tailwind"],
    link: "https://debug-den.vercel.app",
    github: "https://github.com/SangleSumedh/DebugDen",
    image: "/projects/Debug.webp",
    icon: <Database size={18} />,
  },
  {
    title: "NextJS Secure Auth Template",
    badge: "Security & DevOps",
    description:
      "A production-ready authentication boilerplate implementing industry standard security patterns.",
    highlights: [
      "Implemented robust JWT Access/Refresh token rotation.",
      "Designed secure session persistence and protected route barriers.",
      "Reusable modular architecture for rapid SaaS deployment.",
    ],
    tech: [
      "JWT Access/Refresh Tokens",
      "Session Persistence",
      "Route Protection",
      "Security Patterns",
    ],
    github: "https://github.com/SangleSumedh/Next-Auth",
    link: "#",
    image: "/projects/NextAuth.png",
    icon: <ShieldCheck size={18} />,
  },
];

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section
      id="Projects"
      className="py-8 relative bg-gray-50 dark:bg-[#0a0a0a] text-[#111] dark:text-[#e5e5e5]"
    >
      <div className="container mx-auto max-w-5xl px-5">

        <div className="flex flex-col">
        {/* --- SECTION 1: ENTERPRISE (The "Rows") --- */}
        <div className="order-2 mt-24">
          <div className="flex flex-col  gap-3 mb-12 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-3 ">
              <Building2
                className="text-blue-600 dark:text-blue-400"
                size={24}
              />
              <h3 className="text-xl font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Enterprise & Internship{" "}
              </h3>
            </div>
            <span className="text-xs text-gray-400">
              Focus: Backend architecture & data consistency
            </span>
          </div>

          <div className="flex flex-col gap-20">
            {workProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* IMAGE COLUMN 
                   (Takes 5/12 columns on desktop)
                */}
                <div
                  className="md:col-span-5 relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg cursor-pointer border border-gray-200 dark:border-gray-800"
                  onClick={() => setSelectedImage(project.image)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                </div>

                {/* CONTENT COLUMN 
                   (Takes 7/12 columns on desktop)
                */}
                <div className="md:col-span-7 flex flex-col h-full justify-center">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wide uppercase mb-2 block">
                      {project.role}
                    </span>
                    <h3 className="text-3xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6 bg-gray-50 dark:bg-white/5 rounded-xl p-5 border border-gray-100 dark:border-white/5">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <Code2 size={16} /> Key Engineering
                    </h5>
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      {project.link !== "#" && (
                        <Link
                          href={project.link}
                          target="_blank"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900 text-nowrap dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          Visit Project <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="relative max-w-6xl w-full max-h-[90vh] rounded-lg overflow-hidden bg-black border border-white/10 shadow-2xl">
              <button className="absolute top-4 right-4 text-white hover:text-red-400 z-10 p-2 bg-black/50 rounded-full transition-colors">
                <X size={24} />
              </button>
              <Image
                src={selectedImage}
                alt="Project Preview"
                width={1600}
                height={900}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
