import PromptsTable from "@/components/dashboard/PromptsTable";

async function getPrompts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts`,
    {
      cache: "no-store",
    }
  );

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
          Approve templates, reject with feedback, or tag featured highlights.
        </p>
      </div>

      <PromptsTable prompts={prompts} />
    </div>
  );
}