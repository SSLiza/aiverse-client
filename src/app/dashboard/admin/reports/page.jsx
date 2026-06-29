import ReportsList from "@/components/dashboard/ReportsList";
import { serverFetch } from "@/lib/server-fetch";

async function getReports() {
  const res = await serverFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reports");
  }

  return res.json();
}

export default async function AdminReportsPage() {
  const reports = await getReports();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Reported Prompts Moderation Queue
        </h1>

        <p className="text-default-500">
          Review community warnings, dismiss complaints,
          or remove harmful prompts.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-16 text-center">
          <h2 className="text-2xl font-semibold">
            No Reports Found
          </h2>

          <p className="mt-2 text-default-500">
            Great! There are currently no reported prompts to review.
          </p>
        </div>
      ) : (
        <ReportsList reports={reports} />
      )}
    </div>
  );
}