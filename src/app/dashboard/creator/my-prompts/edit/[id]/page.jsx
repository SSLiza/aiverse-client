"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updatePrompt } from "@/lib/api/prompts";
import { toast } from "react-toastify";
import LoadingPage from "@/components/LoadingPage";

const categories = [
  "Writing",
  "Coding",
  "Marketing",
  "Business",
  "Education",
  "Design",
  "Productivity",
];

const aiTools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Copilot",
  "Midjourney",
  "Perplexity",
];

export default function EditPromptPage() {
  const { id } = useParams();
  const router = useRouter();

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/prompts/${id}`
        );

        const data = await res.json();
        setPrompt(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPrompt();
  }, [id]);

  const handleChange = (e) => {
    setPrompt({
      ...prompt,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePrompt(id, prompt);

      toast.success("Prompt updated successfully!");
      router.push("/dashboard/creator/my-prompts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update prompt");
    }
  };

  if (loading) {
    return <LoadingPage message="Fetching prompt details..." />;
  }

  return (
    <div className="max-w-3xl p-6 mx-auto rounded-2xl border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl backdrop-blur-xl relative">
      {/* Ambient Background Glow Effect (Subtle in light mode) */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[250px] bg-gradient-to-b from-violet-500/10 to-transparent blur-3xl pointer-events-none opacity-70 dark:opacity-40" />

      <h1 className="mb-6 text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 relative z-10">
        Edit Prompt
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 relative z-10"
      >
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={prompt?.title || ""}
            onChange={handleChange}
            className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Description
          </label>

          <textarea
            name="description"
            value={prompt?.description || ""}
            onChange={handleChange}
            className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Content
          </label>

          <textarea
            name="content"
            value={prompt?.content || ""}
            onChange={handleChange}
            className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 font-mono"
            rows={8}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Category
          </label>

          <select
            name="category"
            value={prompt?.category || ""}
            onChange={handleChange}
            className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-zinc-950 text-foreground">Select Category</option>
            {categories.map((item) => (
              <option key={item} value={item} className="bg-white dark:bg-zinc-950 text-foreground">
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            AI Tool
          </label>

          <select
            name="aiTool"
            value={prompt?.aiTool || ""}
            onChange={handleChange}
            className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-zinc-950 text-foreground">Select AI Tool</option>
            {aiTools.map((item) => (
              <option key={item} value={item} className="bg-white dark:bg-zinc-950 text-foreground">
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Difficulty
          </label>

          <select
            name="difficulty"
            value={prompt?.difficulty || ""}
            onChange={handleChange}
            className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-zinc-950 text-foreground">Select Difficulty</option>
            <option value="Beginner" className="bg-white dark:bg-zinc-950 text-foreground">
              Beginner
            </option>
            <option value="Intermediate" className="bg-white dark:bg-zinc-950 text-foreground">
              Intermediate
            </option>
            <option value="Pro" className="bg-white dark:bg-zinc-950 text-foreground">
              Pro
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          Update Prompt
        </button>
      </form>
    </div>
  );
}