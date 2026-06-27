"use client";

export default function PaymentsTable({ payments }) {
  if (payments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-10 sm:p-16 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold">
          No Payments Found
        </h2>

        <p className="mt-2 text-default-500">
          No premium subscriptions have been purchased yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border overflow-hidden">

      {/* MOBILE VIEW */}
      <div className="block md:hidden p-4 space-y-4">
        {payments.map((payment, index) => (
          <div
            key={payment._id}
            className="rounded-2xl border p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Payment #{index + 1}
              </h3>

              <span className="rounded-full bg-success/10 px-3 py-1 text-sm text-success">
                Premium
              </span>
            </div>

            <div>
              <p className="text-xs text-default-500">
                Email
              </p>

              <p className="break-all">
                {payment.email}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-default-500">
                  Amount
                </p>

                <p className="font-medium">$5</p>
              </div>

              <div>
                <p className="text-xs text-default-500">
                  Date
                </p>

                <p>
                  {new Date(
                    payment.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-default-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="text-left">Email</th>
              <th className="text-left">Plan</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-t"
              >
                <td className="p-4">
                  {index + 1}
                </td>

                <td>{payment.email}</td>

                <td>Premium</td>

                <td>$5</td>

                <td>
                  {new Date(
                    payment.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}