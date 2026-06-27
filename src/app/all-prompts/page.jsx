"use client";

import { useEffect, useState } from "react";
import PromptCard from "@/components/PromptCard";
import LoadingPage from "@/components/LoadingPage";

const AllPromtPage = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    aiTool: "",
    difficulty: "",
    sort: "",
  });

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          ...filters,
          page: page.toString(),
          limit: "6",
        }).toString();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/prompts?${params}`
        );

        const result = await res.json();
        if (result && result.data) {
          setPrompts(result.data);
          setTotalPages(result.totalPages || 1);
          setTotalCount(result.totalCount || 0);
        } else {
          setPrompts(Array.isArray(result) ? result : []);
          setTotalPages(1);
          setTotalCount(Array.isArray(result) ? result.length : 0);
        }
      } catch (err) {
        console.error("Failed to fetch prompts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [filters, page]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to page 1 on filters change
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Explore AI Prompts</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Discover optimized prompt templates for ChatGPT, Gemini, Claude and more.
        </p>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="mb-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-6 backdrop-blur-md">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          
          {/* SEARCH */}
          <input
            type="text"
            value={filters.search}
            placeholder="Search prompts..."
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 w-full"
            onChange={(e) => handleChange("search", e.target.value)}
          />

          {/* CATEGORY */}
          <select
            value={filters.category}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Marketing</option>
            <option>Coding</option>
            <option>Business</option>
            <option>Writing</option>
            <option>Education</option>
            <option>Design</option>
            <option>Productivity</option>
          </select>

          {/* AI TOOL */}
          <select
            value={filters.aiTool}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            onChange={(e) => handleChange("aiTool", e.target.value)}
          >
            <option value="">All AI Tools</option>
            <option>ChatGPT</option>
            <option>Gemini</option>
            <option>Claude</option>
            <option>Midjourney</option>
            <option>Copilot</option>
            <option>Perplexity</option>
          </select>

          {/* DIFFICULTY */}
          <select
            value={filters.difficulty}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            onChange={(e) => handleChange("difficulty", e.target.value)}
          >
            <option value="">Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Pro">Pro</option>
          </select>

          {/* SORT */}
          <select
            value={filters.sort}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            onChange={(e) => handleChange("sort", e.target.value)}
          >
            <option value="">Latest</option>
            <option value="mostCopied">Most Copied</option>
            <option value="mostPopular">Most Popular</option>
            <option value="latest">Latest</option>
          </select>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <LoadingPage message="Fetching prompts..." fullHeight={false} />
      ) : prompts.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-3xl">
          <p className="text-slate-500">No prompts found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} />
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
              >
                Previous
              </button>

              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Page {page} of {totalPages} ({totalCount} total)
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AllPromtPage;