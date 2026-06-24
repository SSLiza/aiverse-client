import ReviewSection from "@/components/ReviewSection";
import PromptActions from "@/components/PromptActions";
import { notFound } from "next/navigation";
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

  // Fetch prompt
  const prompt = await getPrompt(id);

  if (!prompt) return notFound();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* ACTION BUTTONS */}
      <PromptActions
        prompt={prompt}
        currentUser={currentUser}
      />

      {/* TITLE */}
      <h1 className="text-4xl font-bold">{prompt.title}</h1>

      {/* META */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-600">
          {prompt.category}
        </span>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
          {prompt.aiTool}
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
          {prompt.difficulty}
        </span>
      </div>

      {/* COPY COUNT */}
      <p className="mt-3 text-sm text-slate-500">
        🔁 {prompt.copyCount || 0} copies
      </p>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {prompt.description}
        </p>
      </div>

      {/* CONTENT */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Prompt Content</h2>

        <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
          {prompt.content}
        </pre>
      </div>

      {/* TAGS */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Tags</h2>

        <div className="mt-2 flex flex-wrap gap-2">
          {prompt.tags?.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* CREATOR INFO */}
      <div className="mt-6 rounded-xl border p-4">
        <h2 className="text-xl font-semibold">Creator</h2>

        <p className="text-sm text-slate-600">
          {prompt.creatorName || "Anonymous"}
        </p>
      </div>

      {/* USAGE INSTRUCTIONS */}
      {prompt.usageInstructions && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Usage Instructions
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {prompt.usageInstructions}
          </p>
        </div>
      )}

      {/* REVIEWS */}
      <ReviewSection
        promptId={prompt._id.toString()}
        currentUser={currentUser}
      />
    </section>
  );
}