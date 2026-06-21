"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PromptFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/prompts?${params.toString()}`);
  };

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-5">
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") updateQuery("search", search);
        }}
        placeholder="Search prompts..."
        className="input input-bordered w-full"
      />

      {/* CATEGORY */}
      <select
        onChange={(e) => updateQuery("category", e.target.value)}
        className="select select-bordered"
      >
        <option value="">All Categories</option>
        <option>Writing</option>
        <option>Coding</option>
        <option>Marketing</option>
      </select>

      {/* AI TOOL */}
      <select
        onChange={(e) => updateQuery("aiTool", e.target.value)}
        className="select select-bordered"
      >
        <option value="">All AI Tools</option>
        <option>ChatGPT</option>
        <option>Claude</option>
        <option>Gemini</option>
      </select>

      {/* DIFFICULTY */}
      <select
        onChange={(e) => updateQuery("difficulty", e.target.value)}
        className="select select-bordered"
      >
        <option value="">Difficulty</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Pro</option>
      </select>

      {/* SORT */}
      <select
        onChange={(e) => updateQuery("sort", e.target.value)}
        className="select select-bordered"
      >
        <option value="">Latest</option>
        <option value="mostCopied">Most Copied</option>
        <option value="mostPopular">Most Popular</option>
        <option value="latest">Latest</option>
      </select>
    </div>
  );
}