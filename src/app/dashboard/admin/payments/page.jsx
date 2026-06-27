import PaymentsTable from "@/components/dashboard/Paymentstable";
import { serverFetch } from "@/lib/server-fetch";

async function getPayments() {
  const res = await serverFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/payments`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }

  return res.json();
}

export default async function AdminPaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          All Payments
        </h1>

        <p className="text-default-500">
          Show all payments data in a tabular format.
        </p>
      </div>

      <PaymentsTable payments={payments} />
    </div>
  );
}