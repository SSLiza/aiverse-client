import ReviewSection from "@/components/ReviewSection";
import PromptActions from "@/components/PromptActions";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* ACTION BUTTONS */}
      <PromptActions
        prompt={prompt}
        currentUser={currentUser}
        isLocked={isLocked}
      />

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">{prompt.title}</h1>

      {/* META */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
          {prompt.category}
        </span>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          {prompt.aiTool}
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
          {prompt.difficulty}
        </span>

        {isPrivate && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 font-medium">
            💎 Pro Template
          </span>
        )}
      </div>

      {/* COPY COUNT */}
      <p className="mt-3 text-sm text-slate-500">
        🔁 {prompt.copyCount || 0} copies
      </p>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Description</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {prompt.description}
        </p>
      </div>

      {/* CONTENT */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Prompt Content</h2>

        {isLocked ? (
          <div className="mt-2 relative rounded-xl bg-slate-150 p-6 dark:bg-slate-900/50 select-none overflow-hidden h-36 border border-slate-200 dark:border-slate-800">
            <pre className="whitespace-pre-wrap blur-[6px] opacity-40 font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200">
              This prompt content is locked for free members. Upgrade to AIverse Pro to reveal and copy this high-quality AI prompt template. This is a private premium prompt with optimized variables.
            </pre>
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 dark:bg-black/20">
              <span className="font-semibold text-sm text-violet-600 dark:text-violet-400 bg-white dark:bg-slate-950 px-4 py-2 rounded-xl border border-violet-500/20 shadow-md">
                🔒 Content Locked for Free Plan
              </span>
            </div>
          </div>
        ) : (
          <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-100 p-4 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-800 dark:text-slate-200">
            {prompt.content}
          </pre>
        )}
      </div>

      {/* TAGS */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Tags</h2>

        <div className="mt-2 flex flex-wrap gap-2">
          {prompt.tags?.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 text-slate-600 dark:text-slate-350"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* CREATOR INFO */}
      <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-850 p-5 bg-slate-50/50 dark:bg-slate-900/10">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Creator Information</h2>
        <div className="mt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold">
            {prompt.creatorName?.[0]?.toUpperCase() || "C"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {prompt.creatorName || "Anonymous Creator"}
            </p>
            <p className="text-xs text-slate-500">
              {prompt.creatorEmail || "Contact info hidden"}
            </p>
          </div>
        </div>
      </div>

      {/* USAGE INSTRUCTIONS */}
      {prompt.usageInstructions && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Usage Instructions
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {prompt.usageInstructions}
          </p>
        </div>
      )}

      {/* PREMIUM UPGRADE CALLOUT */}
      {isLocked && (
        <div className="mt-8 rounded-3xl border border-violet-500/30 bg-violet-600/5 p-8 text-center backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-4xl">💎</span>
          <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Unlock Premium Prompt Templates</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm">
            This is a private, premium prompt. Subscribe to AIverse Pro to unlock access to all premium templates, unlimited copies, and premium developer tools.
          </p>
          <div className="mt-6">
            <a
              href="/payment"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/20 hover:opacity-95 transition-all text-sm"
            >
              Subscribe to Premium for $5 🚀
            </a>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {!isLocked && (
        <ReviewSection
          promptId={prompt._id.toString()}
          currentUser={currentUser}
        />
      )}
    </section>
  );
}