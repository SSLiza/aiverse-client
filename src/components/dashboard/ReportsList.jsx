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
      {allReports.map((report) => (
        <div
          key={report._id}
          className="rounded-2xl border p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <Chip color="danger" variant="flat">
              Reason: {report.reason}
            </Chip>

            <p className="text-sm text-default-500">
              Reported on{" "}
              {new Date(
                report.reportedAt
              ).toLocaleDateString()}
            </p>
          </div>

          <h2 className="mt-4 text-2xl font-semibold">
            Prompt: {report.promptTitle}
          </h2>

          <div className="mt-4 rounded-xl border p-4">
            <span className="font-semibold">
              Report Details:
            </span>{" "}
            {report.reason}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-default-500">
              Reported by: {report.reporterEmail}
            </p>

            <div className="flex flex-wrap gap-2">
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
                Remove Prompt
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}