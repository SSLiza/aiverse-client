import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const PromptCard = ({ prompt }) => {
  const { data: session } = useSession();
  if (!prompt) return null;

  const isPrivatePrompt = prompt.visibility?.toLowerCase() === 'private';

  const getToolBadgeStyle = (tool) => {
    const t = tool?.toLowerCase() || "";
    if (t.includes("chatgpt")) {
      return "bg-emerald-50 text-emerald-600 border-emerald-250 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60";
    }
    if (t.includes("gemini")) {
      return "bg-blue-50 text-blue-600 border-blue-250 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/60";
    }
    if (t.includes("claude")) {
      return "bg-orange-50 text-orange-655 border-orange-250 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/60";
    }
    if (t.includes("midjourney")) {
      return "bg-pink-50 text-pink-600 border-pink-250 dark:bg-pink-950/40 dark:text-pink-400 dark:border-pink-900/60";
    }
    if (t.includes("stable diffusion")) {
      return "bg-cyan-50 text-cyan-600 border-cyan-250 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-900/60";
    }
    return "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800";
  };

  const getDifficultyBadgeStyle = (difficulty) => {
    const d = difficulty?.toLowerCase() || "";
    if (d.includes("beginner")) {
      return "bg-slate-105 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/60";
    }
    if (d.includes("intermediate")) {
      return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60";
    }
    if (d.includes("pro")) {
      return "bg-red-50 text-red-650 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60";
    }
    return "bg-slate-105 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/60";
  };

  const getVisibilityBadgeStyle = (visibility) => {
    const v = visibility?.toLowerCase() || "";
    if (v.includes("private") || v.includes("premium")) {
      return "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900/60";
    }
    return "bg-teal-50 text-teal-650 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-900/60";
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-[#0b0a19] transition-all hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <img
          src={prompt.thumbnail || "/img/AIverse_Placeholder.jpg"}
          alt={prompt.title}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isPrivatePrompt && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white shadow-md">
            💎 Premium
          </span>
        )}
      </div>

      {/* Info Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Badges row */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border uppercase ${getToolBadgeStyle(prompt.aiTool)}`}>
              {prompt.aiTool}
            </span>
            <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border uppercase ${getDifficultyBadgeStyle(prompt.difficulty || "Beginner")}`}>
              {prompt.difficulty || "Beginner"}
            </span>
            <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border uppercase ${getVisibilityBadgeStyle(prompt.visibility || "Public")}`}>
              {prompt.visibility || "Public"}
            </span>
          </div>

          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {prompt.title}
          </h3>

          <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* Footer info & button */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-200">
              {prompt.creatorName}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
              {prompt.copyCount || 0} copies
            </p>
          </div>

          <Link
            href={
              session
                ? `/all-prompts/${prompt._id}`
                : `/auth/signin?redirect=${encodeURIComponent(`/all-prompts/${prompt._id}`)}`
            }
            className="rounded-xl bg-violet-600 hover:bg-violet-750 text-white text-xs font-bold px-4 py-2.5 transition cursor-pointer shadow-sm shadow-violet-500/20"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;