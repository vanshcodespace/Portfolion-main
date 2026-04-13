"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  MapPin,
  Copy,
  Check,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  // --- 3D TILT & SPOTLIGHT LOGIC ---
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- FORM HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("sanglesumedh15@gmail.com");
    setCopied(true);
    toast.success("Email copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API delay (Replace with real fetch call)
    setTimeout(() => {
      setStatus("success");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

      // Reset button after delay
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <section
      id="Contact"
      className="py-20 relative overflow-hidden bg-gray-50/20 dark:bg-black/20 perspective-1000"
    >
      {/* --- ANIMATED BACKGROUND GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating Blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT SIDE: TEXT & SOCIALS --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                extraordinary.
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Have an idea? I'm always open to discussing new projects, creative
              visions, or opportunities to be part of your team.
            </p>

            {/* Interactive Contact Card */}
            <div className="p-6 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl space-y-4">
              <div
                onClick={copyEmail}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-black/20 border border-transparent hover:border-blue-500/30 cursor-pointer transition-all group"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    vanshsingla009@gmail.com
                  </p>
                </div>
                {copied ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Copy
                    size={18}
                    className="text-gray-400 group-hover:text-blue-500"
                  />
                )}
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-black/20">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Base
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Yamunanagar, Haryana
                  </p>
                </div>
              </div>
            </div>

            {/* Social Orbs */}
            <div className="flex items-center gap-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/vanshcodespace/",
                  color: "hover:bg-gray-900 hover:text-white",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/vanshsingla01",
                  color: "hover:bg-[#0077b5] hover:text-white",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com/vanshaggrwal",
                  color:
                    "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 text-gray-500 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: THE 3D FORM --- */}
          <div className="perspective-1000 relative">
            <motion.div
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
              {/* SPOTLIGHT EFFECT */}
              <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-0 dark:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      650px circle at ${xSpring.get() * 100 + 50}% ${
                    ySpring.get() * 100 + 50
                  }%,
                      rgba(59, 130, 246, 0.15),
                      transparent 80%
                    )
                  `,
                }}
              />

              <div className="relative z-10 transform-style-3d">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  Send a message{" "}
                  <span className="text-2xl animate-pulse">✨</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inputs with floating focus rings */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Name
                    </label>
                    <div className="relative group">
                      <User
                        className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Email
                    </label>
                    <div className="relative group">
                      <Mail
                        className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Message
                    </label>
                    <div className="relative group">
                      <MessageSquare
                        className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Tell me about your project..."
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* THE BLAST OFF BUTTON */}
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 overflow-hidden relative transition-all duration-300
                      ${
                        status === "success"
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-[1.02]"
                      }
                    `}
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : status === "success" ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          Message Sent!
                        </motion.span>
                      ) : (
                        <>
                          Let's Talk
                          {/* Flying Plane Animation */}
                          <motion.div
                            animate={
                              status === "success"
                                ? { x: 100, y: -100, opacity: 0 }
                                : { x: 0, y: 0, opacity: 1 }
                            }
                            transition={{ duration: 0.5 }}
                          >
                            <Send size={18} />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
