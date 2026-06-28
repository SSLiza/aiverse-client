import ReviewSection from "@/components/ReviewSection";
import PromptActions from "@/components/PromptActions";
import CopyPromptButton from "@/components/CopyPromptButton";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Sparkles, Terminal, BookOpen, Flame } from "lucide-react";

async function getPrompt(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/prompts/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json?.data ?? json;
}

export default async function PromptDetailsPage({ params }) {
  const { id } = await params;

  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = session?.user ?? null;

  // Redirect to login if user is not logged in
  if (!currentUser) {
    return redirect(`/auth/signin?redirect=/all-prompts/${id}`);
  }

  // Fetch prompt
  const prompt = await getPrompt(id);

  if (!prompt) return notFound();

  // Premium lock check: visible but content locked if visibility is Private and user is not premium and not the creator
  const isPrivate = prompt.visibility?.toLowerCase() === "private";
  const isPremiumUser = currentUser?.plan === "premium";
  const isCreator = prompt.creatorEmail === currentUser?.email;
  const isLocked = isPrivate && !isPremiumUser && !isCreator;

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
    return "bg-slate-50 text-slate-650 border-slate-200 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800";
  };

  const getDifficultyBadgeStyle = (difficulty) => {
    const d = difficulty?.toLowerCase() || "";
    if (d.includes("beginner")) {
      return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/60";
    }
    if (d.includes("intermediate")) {
      return "bg-amber-50 text-amber-650 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60";
    }
    if (d.includes("pro")) {
      return "bg-red-50 text-red-655 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60";
    }
    return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/60";
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Link */}
      <Link
        href="/all-prompts"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Prompts
      </Link>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Details, Description, Content, Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Thumbnail Banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-850 shadow-sm bg-slate-100 dark:bg-slate-900">
            <img
              src={prompt.thumbnail || "/img/AIverse_Placeholder.jpg"}
              alt={prompt.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Header Info Card */}
          <div className="p-6 sm:p-8 bg-white dark:bg-[#0b0a19] rounded-3xl border border-slate-205 dark:border-slate-850 shadow-sm">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border uppercase ${getToolBadgeStyle(prompt.aiTool)}`}>
                {prompt.aiTool}
              </span>
              <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border uppercase ${getDifficultyBadgeStyle(prompt.difficulty || "Beginner")}`}>
                {prompt.difficulty || "Beginner"}
              </span>
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border border-slate-200 dark:border-slate-850 bg-slate-55 dark:bg-slate-905 text-slate-550 dark:text-slate-400 uppercase">
                {prompt.category}
              </span>
              {isPrivate && (
                <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border border-violet-500/25 bg-violet-600/10 text-violet-600 dark:text-violet-400 uppercase flex items-center gap-1">
                  💎 Pro Template
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-2">
              {prompt.title}
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <span>By {prompt.creatorName || "Anonymous"}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-500/10" />
                {prompt.copyCount || 0} copies
              </span>
            </p>
          </div>

          {/* Description Section */}
          <div className="p-6 sm:p-8 bg-white dark:bg-[#0b0a19] rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-violet-500" />
              Description
            </h2>
            <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
              {prompt.description}
            </p>
          </div>

          {/* Prompt Content Section (Locked/Unlocked) */}
          <div className="p-6 sm:p-8 bg-white dark:bg-[#0b0a19] rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm overflow-hidden relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="h-4 w-4 text-violet-500" />
                Prompt Content
              </h2>
              {!isLocked && (
                <CopyPromptButton content={prompt.content} />
              )}
            </div>

            {isLocked ? (
              <div className="relative rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-5 select-none overflow-hidden h-44 border border-slate-100 dark:border-slate-800">
                <pre className="whitespace-pre-wrap blur-[5px] opacity-35 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                  This prompt content is locked for free members. Upgrade to AIverse Pro to reveal and copy this high-quality AI prompt template. This is a private premium prompt with optimized variables.
                  Here is some fake text to look like a template code block that is locked for non-paying users.
                </pre>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/20 dark:bg-black/35 backdrop-blur-[2px] p-4">
                  <span className="font-bold text-xs text-violet-650 dark:text-violet-400 bg-white dark:bg-slate-950 px-4.5 py-2.5 rounded-xl border border-violet-500/20 shadow-md flex items-center gap-1.5 mb-2">
                    🔒 Premium Content Locked
                  </span>
                  <p className="text-[10px] text-slate-700 dark:text-slate-400 font-semibold max-w-[240px] text-center">
                    Please upgrade to Pro to unlock this optimized AI prompt template.
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <pre className="whitespace-pre-wrap rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-100 dark:border-slate-850 font-mono text-xs leading-relaxed text-slate-850 dark:text-slate-200 overflow-x-auto">
                  {prompt.content}
                </pre>
              </div>
            )}
          </div>

          {/* Usage Instructions Section */}
          {prompt.usageInstructions && (
            <div className="p-6 sm:p-8 bg-white dark:bg-[#0b0a19] rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-violet-500" />
                Usage Instructions
              </h2>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                {prompt.usageInstructions}
              </p>
            </div>
          )}

          {/* Tags */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="p-6 sm:p-8 bg-white dark:bg-[#0b0a19] rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Review Section */}
          {!isLocked && (
            <div id="reviews-section" className="scroll-mt-6">
              <ReviewSection
                promptId={prompt._id.toString()}
                currentUser={currentUser}
              />
            </div>
          )}
        </div>

        {/* Right Column: Actions, Creator Profile, Premium Upgrade */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          {/* Actions Sidebar Box */}
          <div className="p-6 bg-white dark:bg-[#0b0a19] rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 pl-1">
              Prompt Actions
            </h3>
            <PromptActions
              prompt={prompt}
              currentUser={currentUser}
              isLocked={isLocked}
            />
          </div>

          {/* Premium Upgrade Callout Card */}
          {isLocked && (
            <div className="p-6 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 relative overflow-hidden shadow-sm backdrop-blur-md">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-center">
                <span className="text-3xl mb-3 block">💎</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Upgrade to Pro</h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Unlock access to premium optimized developer prompts, unlimited copying, bookmarks, and developer tools.
                </p>
                <div className="mt-5">
                  <a
                    href={`/payment?redirect=${encodeURIComponent(`/all-prompts/${id}`)}`}
                    className="w-full inline-flex justify-center items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-655 px-4 py-3 text-xs font-bold text-white shadow-md shadow-violet-500/10 hover:opacity-95 transition-all"
                  >
                    Subscribe for $5/mo 🚀
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Creator Information Card */}
          <div className="p-6 bg-white dark:bg-[#0b0a19] rounded-3xl border border-slate-200 dark:border-slate-850 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 pl-1">
              Creator
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 font-black text-sm">
                {prompt.creatorName?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-850 dark:text-slate-250 truncate">
                  {prompt.creatorName || "Anonymous Creator"}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                  {prompt.creatorEmail || "Email hidden"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}