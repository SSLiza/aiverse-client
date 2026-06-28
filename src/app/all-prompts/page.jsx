"use client";

import { useEffect, useState } from "react";
import PromptCard from "@/components/PromptCard";
import LoadingPage from "@/components/LoadingPage";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

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
    sort: "latest",
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

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      aiTool: "",
      difficulty: "",
      sort: "latest",
    });
    setPage(1);
  };

  const aiTools = [
    "All",
    "ChatGPT",
    "Gemini",
    "Claude",
    "Midjourney",
    "Stable Diffusion",
    "Other",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <span className="text-xs font-bold tracking-wider text-violet-500 uppercase block mb-1">
            Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore Prompts
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing {totalCount} verified AI prompts
          </p>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full md:w-80 lg:w-96">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            value={filters.search}
            placeholder="Search prompt, tag, tool..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm"
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>
      </div>

      {/* TWO-COLUMN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-[#0b0a19] p-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white tracking-wide text-sm sm:text-base">
                <SlidersHorizontal className="h-4 w-4 text-violet-500" />
                FILTERS
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            {/* AI ENGINE SECTION */}
            <div>
              <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-4">
                AI Engine
              </span>
              <div className="flex flex-col gap-2">
                {aiTools.map((tool) => {
                  const toolValue = tool === "All" ? "" : tool;
                  const isActive = filters.aiTool === toolValue;
                  return (
                    <button
                      key={tool}
                      onClick={() => handleChange("aiTool", toolValue)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center border ${
                        isActive
                          ? "border-violet-600 bg-violet-600/10 text-violet-600 dark:border-violet-500 dark:bg-violet-950/20 dark:text-violet-400"
                          : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sort & Prompts Grid */}
        <div className="lg:col-span-3">
          {/* SORT BY BAR */}
          <div className="flex items-center gap-3 p-4 mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-[#0b0a19]/40 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mr-2 pl-2">
              SORT BY:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Latest", value: "latest" },
                { label: "Most Popular", value: "mostPopular" },
                { label: "Most Copied", value: "mostCopied" },
              ].map((sortItem) => {
                const isActive = filters.sort === sortItem.value;
                return (
                  <button
                    key={sortItem.value}
                    onClick={() => handleChange("sort", sortItem.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isActive
                        ? "border-violet-600 bg-violet-600/10 text-violet-600 dark:border-violet-500 dark:bg-violet-950/20 dark:text-violet-400"
                        : "border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {sortItem.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LOADING & PROMPTS GRID */}
          {loading ? (
            <LoadingPage message="Fetching prompts..." fullHeight={false} />
          ) : prompts.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-850 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10">
              <p className="text-slate-550 dark:text-slate-400 text-sm font-medium">
                No prompts found matching your criteria.
              </p>
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
                <div className="mt-12 flex items-center justify-center gap-4 border-t border-slate-200 dark:border-slate-805 pt-8">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    Previous
                  </button>

                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Page {page} of {totalPages} ({totalCount} total)
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllPromtPage;