import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const PromptCard = ({ prompt }) => {
  const { data: session } = useSession();
  if (!prompt) return null;
  return (
    <div className="group relative overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900">
      {prompt.visibility?.toLowerCase() === "private" && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm dark:bg-amber-900/70 dark:text-amber-200">
          💎 Premium
        </span>
      )}

      <img
        src={prompt.thumbnail || "/img/AIverse_Placeholder.jpg"}
        alt={prompt.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs text-violet-600">
            {prompt.category}
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600">
            {prompt.aiTool}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-semibold">
          {prompt.title}
        </h3>

        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {prompt.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {prompt.creatorName}
            </p>

            <p className="text-xs text-slate-500">
              {prompt.copyCount} copies
            </p>
          </div>

          <Link
            href={
              session
                ? `/all-prompts/${prompt._id}`
                : `/auth/signin`
            }
            className="rounded-xl bg-violet-600 px-4 py-2 text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;