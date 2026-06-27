"use client";

import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import {
  Eye,
  ShieldAlert,
  Trash2,
  CheckCircle,
} from "lucide-react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ReportsList({ reports }) {
  const [allReports, setAllReports] = useState(reports);
  const router = useRouter();

  const dismissReport = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Report dismissed");

      setAllReports((prev) =>
        prev.filter((r) => r._id !== id)
      );
    }
  };

  const removePrompt = async (promptId) => {
    const ok = confirm(
      "Remove this prompt permanently?"
    );

    if (!ok) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports/prompt/${promptId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Prompt removed");

      setAllReports((prev) =>
        prev.filter(
          (r) => r.promptId !== promptId
        )
      );
    }
  };

return (
  <div className="space-y-4">
    {allReports.length === 0 ? (
      <div className="rounded-2xl border p-10 text-center text-default-500">
        No reports found.
      </div>
    ) : (
      allReports.map((report) => (
        <div
          key={report._id}
          className="rounded-2xl border p-4 sm:p-6 shadow-sm"
        >
          {/* Top Section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Chip
              color="danger"
              variant="flat"
              className="w-fit"
            >
              Reason: {report.reason}
            </Chip>

            <p className="text-sm text-default-500">
              Reported on{" "}
              {new Date(
                report.reportedAt
              ).toLocaleDateString()}
            </p>
          </div>

          {/* Prompt Title */}
          <h2 className="mt-4 text-xl sm:text-2xl font-semibold break-words">
            Prompt: {report.promptTitle}
          </h2>

          {/* Report Details */}
          <div className="mt-4 rounded-xl border p-4">
            <span className="font-semibold">
              Report Details:
            </span>{" "}
            <span className="break-words">
              {report.reason}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-default-500 break-all">
              Reported by: {report.reporterEmail}
            </p>

            {/* Actions */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <Button
                variant="flat"
                startContent={<Eye size={16} />}
                onPress={() =>
                  router.push(
                    `/all-prompts/${report.promptId}`
                  )
                }
              >
                Inspect
              </Button>

              <Button
                color="success"
                variant="flat"
                startContent={
                  <CheckCircle size={16} />
                }
                onPress={() =>
                  dismissReport(report._id)
                }
              >
                Dismiss
              </Button>

              <Button
                color="warning"
                variant="flat"
                startContent={
                  <ShieldAlert size={16} />
                }
              >
                Warn Creator
              </Button>

              <Button
                color="danger"
                variant="flat"
                startContent={
                  <Trash2 size={16} />
                }
                onPress={() =>
                  removePrompt(report.promptId)
                }
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
}