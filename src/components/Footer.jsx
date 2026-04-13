"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  ArrowUp,
  Mail,
  MapPin,
  Check,
  Copy,
  Shield, // Added for the Admin icon
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("vanshsingla009@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/vanshcodespace/", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/vanshsingla01",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/vanshaggrwal",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#0a0a0a] pt-20 pb-10 overflow-hidden border-t border-gray-200 dark:border-gray-800">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Desc */}
          <div className="col-span-1 md:col-span-2  space-y-4">
            <Link
              href="/"
              onClick={scrollToTop}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-600 dark:to-blue-600"
            >
              Vansh Singla
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
              Crafting scalable digital experiences with code and creativity.
              Let&apos;s build something amazing together.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <MapPin size={16} />
                <span>Yamunanagar, Haryana, India</span>
              </div>

              {/* ADMIN LINK - Discreetly placed under location */}
              {/* <Link
                href="/admin/testimonials"
                className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-widest group"
              >
                <Shield size={12} className="group-hover:animate-pulse" />
                Are you Admin?
              </Link> */}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="space-y-2">
              {["About", "Experience","Testimonials", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Socials & Email Copy */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            <button
              onClick={copyEmail}
              className="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all mt-2 bg-transparent border-none p-0 cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-500/10 transition-colors">
                {copied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Mail size={14} className="group-hover:text-blue-500" />
                )}
              </div>
              <span className="font-medium tracking-tight">
                vanshsingla009@gmail.com
              </span>
              {!copied && (
                <Copy
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/admin/testimonials"
            className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-widest group"
          >
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-left">
              © {currentYear} Vansh Singla. All rights reserved.
            </p>
          </Link>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors"
          >
            Back to Top <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
