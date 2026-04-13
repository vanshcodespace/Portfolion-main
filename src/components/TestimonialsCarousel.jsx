"use client";

import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  User,
  Briefcase,
  Building,
  MessageSquare,
  Quote,
  Star,
  LogOut,
  RefreshCw,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ReviewWall() {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    content: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData((prev) => ({
          ...prev,
          name: prev.name || currentUser.displayName || "",
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchActiveTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          where("status", "==", "active"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchActiveTestimonials();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const handleSwitchAccount = async () => {
    try {
      await signOut(auth);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      toast.error("Error switching account");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please sign in first");

    setLoading(true);
    try {
      await addDoc(collection(db, "testimonials"), {
        ...formData,
        email: user.email,
        photoURL: user.photoURL,
        status: "pending",
        createdAt: new Date(),
      });
      toast.success("Submitted! I'll review it soon. ✨");
      setShowModal(false);
      setFormData({ name: "", designation: "", company: "", content: "" });
    } catch (error) {
      toast.error("Submission failed");
    }
    setLoading(false);
  };

  const isMarqueeActive = testimonials.length > 2;

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto relative overflow-hidden bg-white dark:bg-[#050505]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Star size={14} fill="currentColor" /> Review Wall
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Wall of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                Feedback.
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
              Hear from the people I've collaborated with.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="group relative px-6 py-3 md:px-8 md:py-4 bg-white dark:bg-black rounded-2xl text-gray-900 dark:text-white font-bold shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
              Leave a Review{" "}
              <Sparkles
                className="group-hover:rotate-12 transition-transform"
                size={18}
              />
            </span>
            <div className="absolute inset-0 bg-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </motion.button>
        </div>

        {/* Carousel Container */}
        <div
          className={`relative flex py-4 ${
            isMarqueeActive ? "overflow-hidden mask-fade" : "justify-center"
          }`}
        >
          {testimonials.length > 0 ? (
            <div
              className={`flex gap-6 md:gap-8 ${
                isMarqueeActive
                  ? "animate-marquee whitespace-nowrap"
                  : "flex-wrap justify-center"
              }`}
            >
              {(isMarqueeActive
                ? [...testimonials, ...testimonials]
                : testimonials
              ).map((t, i) => (
                <TestimonialCard key={`${t.id}-${i}`} t={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 w-full border border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem]">
              <Sparkles
                className="mx-auto mb-4 text-blue-500 opacity-50"
                size={32}
              />
              <h3 className="text-xl font-bold dark:text-white">
                The wall is waiting...
              </h3>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm px-4">
                Be the first to share your experience working with me.
              </p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white dark:bg-[#0a0a0a] w-full max-w-lg rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Write a Review
                </h3>
                <div className="flex items-center gap-2">
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                      title="Logout"
                    >
                      <LogOut size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {!user ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500 mb-6">
                    Please sign in to prevent spam. I only use your name and
                    profile picture.
                  </p>
                  <button
                    onClick={() => signInWithPopup(auth, googleProvider)}
                    className="w-full py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-3 font-bold hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                  >
                    <Image
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      width={20}
                      height={20}
                      alt="G"
                    />{" "}
                    Sign in with Google
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Image
                        src={user.photoURL}
                        alt="pfp"
                        width={36}
                        height={36}
                        className="rounded-full border border-gray-200 dark:border-gray-700"
                      />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">
                          Posting as
                        </span>
                        <span className="text-xs font-semibold dark:text-white truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSwitchAccount}
                      className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold text-blue-500 hover:text-blue-600 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg"
                    >
                      <RefreshCw size={12} /> Switch
                    </button>
                  </div>

                  <FormInput
                    label="Full Name"
                    icon={<User size={16} />}
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Designation"
                      icon={<Briefcase size={16} />}
                      value={formData.designation}
                      onChange={(v) =>
                        setFormData({ ...formData, designation: v })
                      }
                    />
                    <FormInput
                      label="Company"
                      icon={<Building size={16} />}
                      value={formData.company}
                      onChange={(v) => setFormData({ ...formData, company: v })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                      Message
                    </label>
                    <div className="relative group">
                      <MessageSquare
                        className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                      />
                      <textarea
                        rows={4}
                        placeholder="How would you describe this portfolio?"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:text-white text-sm"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Post to Wall"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .mask-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="w-[280px] md:w-[400px] bg-white dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-gray-800 p-5 md:p-7 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500 flex flex-col relative group shrink-0 whitespace-normal">
      <div className="relative mb-6 px-4 py-5 rounded-2xl bg-gray-50/50 dark:bg-white/5">
        <Quote className="absolute -top-2 -left-2 text-blue-500/20 w-6 h-6 rotate-180" />
        <p className="text-gray-700 dark:text-gray-200 text-sm md:text-[15px] leading-relaxed italic line-clamp-6">
          {t.content}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-auto border-t border-gray-100 dark:border-gray-800 pt-5">
        <div className="relative shrink-0">
          <Image
            src={t.photoURL || `https://ui-avatars.com/api/?name=${t.name}`}
            alt={t.name}
            width={40}
            height={40}
            unoptimized
            className="rounded-full border-2 border-white dark:border-gray-700 object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base truncate leading-tight">
            {t.name}
          </h4>
          <p className="text-[10px] md:text-[11px] font-medium text-gray-500 dark:text-blue-400 truncate uppercase tracking-wider mt-0.5">
            {t.designation} @ {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, icon, value, onChange }) {
  return (
    <div className="space-y-1 text-left">
      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-2xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white text-sm"
        />
      </div>
    </div>
  );
}
