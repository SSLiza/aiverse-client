"use client";

import { useEffect, useState } from "react";
import PromptCard from "@/components/PromptCard";

const AllPromtPage = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const query = new URLSearchParams(filters).toString();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/prompts?${query}`
        );

        const data = await res.json();
        setPrompts(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        console.error("Failed to fetch prompts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [filters]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Explore AI Prompts</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Discover prompts for ChatGPT, Gemini, Claude and more.
        </p>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="mb-8 rounded-2xl border p-4">
        <div className="grid gap-4 md:grid-cols-5">
          
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search prompts..."
            className="input input-bordered w-full"
            onChange={(e) => handleChange("search", e.target.value)}
          />

          {/* CATEGORY */}
          <select
            className="select select-bordered"
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Marketing</option>
            <option>Coding</option>
            <option>Business</option>
            <option>Writing</option>
          </select>

          {/* AI TOOL */}
          <select
            className="select select-bordered"
            onChange={(e) => handleChange("aiTool", e.target.value)}
          >
            <option value="">All AI Tools</option>
            <option>ChatGPT</option>
            <option>Gemini</option>
            <option>Claude</option>
          </select>

          {/* DIFFICULTY */}
          <select
            className="select select-bordered"
            onChange={(e) => handleChange("difficulty", e.target.value)}
          >
            <option value="">Difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          {/* SORT */}
          <select
            className="select select-bordered"
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
        <div className="text-center py-10">Loading prompts...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllPromtPage;