"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added these
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";

const navItems = [
  { name: "About", href: "#About", icon: User },
  { name: "Experience", href: "#Experience", icon: Briefcase },
  { name: "Projects", href: "#Projects", icon: Code },
  // { name: "Testimonials", href: "#Testimonials", icon: Briefcase },
  { name: "Contact", href: "#Contact", icon: Mail },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname(); // Get current route
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If we are NOT on the homepage, allow default Link behavior (routing to /#Section)
    if (pathname !== "/") {
      setIsMenuOpen(false);
      return;
    }

    // If we ARE on the homepage, prevent default and use Lenis smooth scroll
    e.preventDefault();

    if (lenis) {
      if (href === "/" || href === "") {
        lenis.scrollTo(0);
        setIsMenuOpen(false);
        setActiveTab("");
      } else {
        const target = document.querySelector(href) as HTMLElement | null;
        if (target) {
          lenis.scrollTo(target);
          setIsMenuOpen(false);
          setActiveTab(href.replace("#", ""));
        }
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`
          relative flex items-center justify-between transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "py-2 px-4 bg-white/80 dark:bg-black/80"
              : "py-3 px-6 bg-white/70 dark:bg-[#1a1a1a]/70"
          }
          backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl md:rounded-full 
          ${
            isMenuOpen
              ? "rounded-2xl flex-col w-full max-w-sm"
              : "w-auto max-w-2xl"
          }
        `}
      >
        <div
          className={`flex items-center justify-between w-full ${
            isMenuOpen ? "mb-4" : "gap-4"
          }`}
        >
          {/* Home Link */}
          <Link
            href="/"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:scale-110 transition-transform"
            onClick={(e) => handleScroll(e, "/")}
          >
            <Home size={20} />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={`/${item.href}`} // Change: Prepend / so it works from any page
                onClick={(e) => handleScroll(e, item.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors"
              >
                {activeTab === item.name && (
                  <motion.div
                    layoutId="pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full -z-10"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeTab === item.name
                      ? "text-gray-900 dark:text-white"
                      : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-3xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden w-full overflow-hidden flex flex-col gap-2"
            >
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  href={`/${item.href}`} // Prepend / for routing from other pages
                  onClick={(e) => handleScroll(e, item.href)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
