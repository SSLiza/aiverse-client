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
  const reportsArray = Array.isArray(reports) ? reports : (reports && Array.isArray(reports.data) ? reports.data : []);
  const [allReports, setAllReports] = useState(reportsArray);
  const [dismissId, setDismissId] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [warnReport, setWarnReport] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const router = useRouter();

  const handleDismiss = async () => {
    if (!dismissId) return;
    const id = dismissId;
    setLoadingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Report dismissed");
        setAllReports((prev) => prev.filter((r) => r._id !== id));
        setDismissId(null);
      } else {
        throw new Error("Failed to dismiss report");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleRemove = async () => {
    if (!removeId) return;
    const promptId = removeId;
    setLoadingId(promptId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports/prompt/${promptId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Prompt removed");
        setAllReports((prev) => prev.filter((r) => r.promptId !== promptId));
        setRemoveId(null);
      } else {
        throw new Error("Failed to remove prompt");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleSendWarning = async () => {
    if (!warnReport) return;
    if (!warningMessage.trim()) {
      toast.error("Please enter a warning message");
      return;
    }

    setLoadingId(warnReport._id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/reports/warn-creator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creatorEmail: warnReport.creatorEmail,
            message: warningMessage,
            promptId: warnReport.promptId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Warning sent to creator");
        setWarnReport(null);
        setWarningMessage("");
      } else {
        throw new Error(data.message || "Failed to send warning");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
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
                    setDismissId(report._id)
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
                  onPress={() => {
                    setWarnReport(report);
                    setWarningMessage("");
                  }}
                >
                  Warn Creator
                </Button>

                <Button
                  color="danger"
                  variant="flat"
                  className="text-red-600 hover:bg-red-600 hover:text-white"
                  startContent={
                    <Trash2 size={16} />
                  }
                  onPress={() =>
                    setRemoveId(report.promptId)
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
      {/* Dismiss Report Confirmation Modal */}
      {dismissId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-green-600 dark:text-green-500">
              <div className="p-2 rounded-xl bg-green-50 dark:bg-green-950/30">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dismiss Report</h3>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Are you sure you want to dismiss this report? The template status will remain unchanged and the report will be resolved.
            </p>

            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
              <button
                type="button"
                onClick={() => setDismissId(null)}
                className="rounded-xl border border-slate-200 dark:border-slate-850 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>

              <Button
                color="success"
                className="font-semibold text-white px-4 h-10 rounded-xl"
                isLoading={loadingId === dismissId}
                onPress={handleDismiss}
              >
                Confirm Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Prompt Confirmation Modal */}
      {removeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Remove Template</h3>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Are you sure you want to remove this prompt permanently from the platform? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
              <button
                type="button"
                onClick={() => setRemoveId(null)}
                className="rounded-xl border border-slate-200 dark:border-slate-850 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-850 dark:text-slate-250 cursor-pointer"
              >
                Cancel
              </button>

              <Button
                color="danger"
                className="font-semibold text-red-950 dark:text-red-50 px-4 h-10 rounded-xl"
                isLoading={loadingId === removeId}
                onPress={handleRemove}
              >
                Confirm Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Warn Creator Modal */}
      {warnReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl space-y-4">
            <div>
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-50">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Warn Creator</h3>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Send a formal warning to the creator (<span className="font-semibold">{warnReport.creatorEmail}</span>) regarding the template <span className="font-semibold">"{warnReport.promptTitle}"</span>.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Warning Message</label>
              <textarea
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                placeholder="e.g. Your prompt template violates our community standards by using misleading tags. Please update the tags to match the core functionality..."
                rows={4}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-900 resize-none text-slate-900 dark:text-slate-100 leading-relaxed placeholder-slate-400 dark:placeholder-slate-600"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setWarnReport(null);
                  setWarningMessage("");
                }}
                className="rounded-xl border border-slate-200 dark:border-slate-850 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>

              <Button
                color="warning"
                className="font-semibold text-amber-950 dark:text-amber-50 px-4 h-10 rounded-xl"
                isLoading={loadingId === warnReport._id}
                onPress={handleSendWarning}
              >
                Send Warning
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}