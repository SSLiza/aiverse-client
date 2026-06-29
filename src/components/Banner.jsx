"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, X, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

const TAGS_POOL = [
  "ChatGPT",
  "Midjourney",
  "Claude",
  "Gemini",
  "Stable Diffusion",
  "Automation",
  "Productivity",
  "Coding",
  "Marketing",
  "SEO Optimization",
  "Copywriting",
  "UI Design",
  "React Helper",
  "Email Templates",
  "Social Media",
];

export default function Banner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingTags, setTrendingTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Load random trending tags on client mount to avoid SSR hydration mismatch
  useEffect(() => {
    const shuffled = [...TAGS_POOL].sort(() => 0.5 - Math.random());
    setTrendingTags(shuffled.slice(0, 6));
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/all-prompts?search=${encodeURIComponent(query)}`);
    } else {
      router.push(`/all-prompts`);
    }
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Helper to determine hover accent colors for tags
  const getTagHoverClass = (tag) => {
    const t = tag.toLowerCase();
    if (t.includes("chatgpt")) {
      return "hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:border-emerald-400 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-400";
    }
    if (t.includes("midjourney")) {
      return "hover:border-pink-500 hover:bg-pink-500/10 hover:text-pink-500 dark:hover:border-pink-400 dark:hover:bg-pink-400/10 dark:hover:text-pink-400";
    }
    if (t.includes("claude")) {
      return "hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-500 dark:hover:border-orange-400 dark:hover:bg-orange-400/10 dark:hover:text-orange-400";
    }
    if (t.includes("gemini")) {
      return "hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:bg-blue-400/10 dark:hover:text-blue-400";
    }
    if (t.includes("stable diffusion")) {
      return "hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-500 dark:hover:border-purple-400 dark:hover:bg-purple-400/10 dark:hover:text-purple-400";
    }
    return "hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-500 dark:hover:border-violet-400 dark:hover:bg-violet-400/10 dark:hover:text-violet-400";
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20 bg-slate-50 dark:bg-[#030014]">
      {/* Background Grids & Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Orbs */}
        <div className="absolute left-1/4 top-10 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px] dark:bg-violet-500/15" />
        <div className="absolute right-1/4 bottom-10 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px] dark:bg-cyan-500/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-fuchsia-600/5 blur-[120px] dark:bg-fuchsia-500/10" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-violet-600 dark:text-violet-400 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="h-4 w-4 animate-pulse text-violet-500" />
            <span>Discover the Power of Prompt Engineering</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900 dark:text-white"
          >
            Elevate Your AI with{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Precision Prompts
            </span>
          </motion.h1>

          {/* Subheading Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400"
          >
            Boost your productivity, creativity, and automation. Explore, copy, and share premium
            vetted prompts for ChatGPT, Midjourney, Claude, Gemini, and more.
          </motion.p>

          {/* Glassmorphic Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <form
              onSubmit={handleSearch}
              className={`relative flex items-center p-1.5 rounded-2xl border transition-all duration-300 shadow-lg backdrop-blur-md ${
                isFocused
                  ? "border-violet-500 ring-2 ring-violet-500/20 bg-white dark:bg-slate-900"
                  : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60"
              }`}
            >
              <div className="pl-4 pr-2 text-slate-400 dark:text-slate-500">
                <Search className="h-5 w-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search prompt templates, tools, categories..."
                className="flex-1 bg-transparent py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none text-sm sm:text-base"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={handleClear}
                    className="p-1 mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition duration-200 shadow-md hover:shadow-violet-500/20 flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          {/* Trending Prompt Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <TrendingUp className="h-3.5 w-3.5 text-violet-500" />
                Trending:
              </span>
              {trendingTags.length > 0 ? (
                trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm ${getTagHoverClass(
                      tag
                    )}`}
                  >
                    #{tag}
                  </button>
                ))
              ) : (
                // Skeleton tags
                <div className="flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-6 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-6 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Call To Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/all-prompts"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-violet-700 shadow-md shadow-violet-600/10 hover:shadow-violet-600/20 hover:-translate-y-0.5"
            >
              <span>Explore All Prompts</span>
              <ArrowRight className="h-4.5 w-4.5 transition duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <Zap className="h-4.5 w-4.5 text-violet-500" />
              <span>Share a Prompt</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}