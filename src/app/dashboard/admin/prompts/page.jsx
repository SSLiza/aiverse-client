import PromptsTable from "@/components/dashboard/PromptsTable";
import { serverFetch } from "@/lib/server-fetch";

async function getPrompts() {
  const res = await serverFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch prompts");
  }

  return res.json();
}

export default async function AdminPromptsPage() {
  const prompts = await getPrompts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Prompt Template Submissions Moderation
        </h1>

        <p className="text-default-500">
          Approve templates, reject with feedback,
          or tag featured highlights.
        </p>
      </div>

      <PromptsTable prompts={prompts} />
    </div>
  );
}