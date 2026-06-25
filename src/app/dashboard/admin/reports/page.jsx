import ReportsList from "@/components/dashboard/ReportsList";

async function getReports() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function AdminReportsPage() {
  const reports = await getReports();
  console.log(reports);

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

      <ReportsList reports={reports} />
    </div>
  );
}