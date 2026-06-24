"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  const tags = [
    "ChatGPT",
    "Midjourney",
    "Claude",
    "Gemini",
    "Automation",
    "Marketing",
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="text-center">

          {/* Badge */}
          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-500">
            🚀 Discover Powerful AI Prompts
          </span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold"
          >
            Premium AI Prompts for Every Need
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg"
          >
            Explore, create, and share premium AI prompts.
          </motion.p>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Explore thousands of prompts for ChatGPT, Gemini, Claude,
            Midjourney and more. Boost creativity, productivity, and
            automation with community-driven AI solutions.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <input
                type="text"
                placeholder="Search prompts..."
                className="flex-1 bg-transparent px-5 py-4 outline-none"
              />
              <button className="bg-violet-600 px-6 text-white hover:bg-violet-700">
                Search
              </button>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm hover:border-violet-500 hover:text-violet-500 dark:border-slate-700"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/prompts"
              className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700"
            >
              Explore Prompts
            </Link>

            <Link
              href="/dashboard/add-prompt"
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:border-violet-500 dark:border-slate-700"
            >
              Create Prompt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}