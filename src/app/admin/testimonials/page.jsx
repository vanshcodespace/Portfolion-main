"use client";

import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  Check,
  X,
  Trash2,
  Edit3,
  Save,
  ShieldCheck,
  LogOut,
  Lock,
  ChevronLeft,
  AlertTriangle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const ADMIN_EMAIL = "sanglesumedh15@gmail.com";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [authLoading, setAuthLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        fetchAll();
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAll = async () => {
    const q = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email !== ADMIN_EMAIL) {
        toast.error(
          `Access Denied: ${result.user.email} is not an authorized admin.`
        );
        await signOut(auth);
      } else {
        toast.success("Welcome back, Admin.");
      }
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user")
        toast.error("Login failed.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setTestimonials([]);
    toast.success("Logged out");
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { status: newStatus });
      toast.success(`Testimonial is now ${newStatus}`);
      fetchAll();
    } catch (err) {
      toast.error("Unauthorized Action");
    }
  };

  const handleEditSave = async (id) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { ...editData });
      setEditingId(null);
      toast.success("Updated successfully");
      fetchAll();
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, "testimonials", deleteId));
      toast.success("Removed from database");
      setDeleteId(null);
      fetchAll();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (authLoading)
    return (
      <div className="h-screen flex items-center justify-center dark:bg-[#050505] text-blue-500 animate-pulse font-mono">
        Authenticating...
      </div>
    );

  if (!user || !isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#050505] px-6">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors font-bold text-sm"
        >
          <ChevronLeft size={20} /> Back to Portfolio
        </Link>
        <div className="w-full max-w-md p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] shadow-2xl text-center">
          <Lock className="text-blue-500 mx-auto mb-6" size={32} />
          <h1 className="text-2xl font-bold mb-2 dark:text-white">
            Admin Access
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {user ? "Unauthorized account" : "Please sign in to proceed."}
          </p>
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              width={20}
              height={20}
              alt="G"
            />{" "}
            Sign in as Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-[#050505] min-h-screen pt-24 text-gray-900 dark:text-white relative">
      <div className="max-w-6xl mx-auto">
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all font-bold group"
          >
            <div className="p-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-xl group-hover:border-blue-500/30 shadow-sm">
              <ChevronLeft size={18} />
            </div>
            <span>Back to Home</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all font-bold text-sm"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* PAGE TITLE */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-blue-500/10 rounded-2xl">
            <ShieldCheck className="text-blue-500" size={36} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold uppercase tracking-tighter">
              Control Center
            </h1>
            <p className="text-sm text-blue-500 font-mono font-bold mt-1 tracking-tight">
              {user.email}
            </p>
          </div>
        </div>

        {/* MAIN LIST / EMPTY STATE */}
        <div className="grid gap-6">
          {testimonials.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem] backdrop-blur-sm"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                <div className="relative p-6 bg-blue-500/10 rounded-full text-blue-500 border border-blue-500/20">
                  <MessageSquare size={48} strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-2 -right-2 p-2 bg-yellow-500/20 text-yellow-500 rounded-full border border-yellow-500/30"
                >
                  <Sparkles size={16} />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-2">No Testimonials Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                Once users start leaving reviews on your portfolio, they will
                appear here for your approval.
              </p>
              <Link
                href="/"
                className="mt-8 px-6 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-blue-500 hover:text-white rounded-xl transition-all font-bold text-sm border border-gray-200 dark:border-gray-800"
              >
                Go to Portfolio to Test
              </Link>
            </motion.div>
          ) : (
            testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-start justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex gap-5 flex-1">
                  <div className="relative shrink-0">
                    <Image
                      src={
                        t.photoURL ||
                        `https://ui-avatars.com/api/?name=${t.name}`
                      }
                      alt="pfp"
                      width={56}
                      height={56}
                      unoptimized
                      className="rounded-full border-2 border-gray-100 dark:border-gray-800 object-cover"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#0a0a0a] ${
                        t.status === "active"
                          ? "bg-green-500"
                          : t.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    {editingId === t.id ? (
                      <div className="space-y-3">
                        <input
                          className="bg-gray-100 dark:bg-black p-3 rounded-2xl w-full outline-none focus:ring-2 ring-blue-500 border border-transparent dark:border-gray-800"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                        />
                        <textarea
                          className="bg-gray-100 dark:bg-black p-3 rounded-2xl w-full text-sm italic outline-none focus:ring-2 ring-blue-500 border border-transparent dark:border-gray-800"
                          rows={3}
                          value={editData.content}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              content: e.target.value,
                            })
                          }
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-xl">{t.name}</h4>
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest ${
                              t.status === "active"
                                ? "bg-green-500/10 text-green-500"
                                : t.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mb-3">
                          {t.designation} @ {t.company}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                          "{t.content}"
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 shrink-0 self-end md:self-center">
                  {editingId === t.id ? (
                    <button
                      onClick={() => handleEditSave(t.id)}
                      className="p-4 bg-green-600 text-white rounded-2xl shadow-lg hover:scale-105 transition-all"
                    >
                      <Save size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(t.id);
                        setEditData(t);
                      }}
                      className="p-4 bg-gray-100 dark:bg-white/10 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      updateStatus(
                        t.id,
                        t.status === "active" ? "inactive" : "active"
                      )
                    }
                    className={`p-4 rounded-2xl transition-all shadow-sm ${
                      t.status === "active"
                        ? "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500 hover:text-white"
                        : "text-green-500 bg-green-500/10 hover:bg-green-500 hover:text-white"
                    }`}
                  >
                    {t.status === "active" ? (
                      <X size={20} />
                    ) : (
                      <Check size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteId(t.id)}
                    className="p-4 bg-gray-100 dark:bg-white/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#0a0a0a] w-full max-w-sm rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-2xl relative z-10 text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Confirm Delete
              </h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Are you sure you want to remove this testimonial? This action
                cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 font-bold text-gray-500 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
