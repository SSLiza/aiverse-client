"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";

export default function PromptActions({
  prompt,
  currentUser,
  isLocked = false,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("Inappropriate Content");
  const [reportDescription, setReportDescription] = useState("");
  const [reporting, setReporting] = useState(false);

  // Check bookmark status on load
  useEffect(() => {
    if (!currentUser || !prompt) return;

    const checkBookmark = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/check?userEmail=${currentUser.email}&promptId=${prompt._id}`
        );
        const data = await res.json();
        setIsBookmarked(!!data.bookmarked);
      } catch (error) {
        console.error("Failed to check bookmark status:", error);
      }
    };

    checkBookmark();
  }, [currentUser, prompt]);

  // Toggle bookmark handler
  const handleBookmark = async () => {
    if (!currentUser) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: currentUser.email,
            promptId: prompt._id,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        if (data.status === "added") {
          setIsBookmarked(true);
          toast.success("Prompt bookmarked");
        } else {
          setIsBookmarked(false);
          toast.success("Bookmark removed");
        }
      } else {
        toast.error(data.message || "Failed to toggle bookmark");
      }
    } catch (error) {
      toast.error("Failed to toggle bookmark");
    }
  };

  // Copy prompt handler
  const handleCopy = async () => {
    if (isLocked) {
      toast.error("Private prompts require a Premium subscription.");
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt.content);

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/prompts/copy/${prompt._id}`,
        {
          method: "PATCH",
        }
      );

      toast.success("Prompt copied to clipboard!");
      // reload or increment locally if count is rendered
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  // Report handler
  const handleReport = () => {
    if (!currentUser) {
      toast.error("Please login first");
      return;
    }
    setIsReportModalOpen(true);
  };

  const submitReport = async () => {
    setReporting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promptId: prompt._id,
            reporterEmail: currentUser.email,
            reason: reportReason,
            description: reportDescription,
          }),
        }
      );

      if (res.ok) {
        toast.success("Prompt reported successfully");
        setIsReportModalOpen(false);
        setReportDescription("");
      } else {
        toast.error("Failed to submit report");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setReporting(false);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-4">
        <Button
          color="primary"
          variant={isBookmarked ? "solid" : "bordered"}
          onPress={handleBookmark}
          className="rounded-xl font-semibold"
        >
          {isBookmarked ? "⭐ Bookmarked" : "☆ Bookmark"}
        </Button>

        <Button
          color="secondary"
          onPress={handleCopy}
          className="rounded-xl font-semibold"
          isDisabled={isLocked}
        >
          📋 Copy Prompt
        </Button>

        {!isLocked && (
          <Button color="success" className="rounded-xl font-semibold text-white">
            ✍️ Review Below
          </Button>
        )}

        <Button
          color="danger"
          variant="flat"
          onPress={handleReport}
          className="rounded-xl font-semibold"
        >
          🚩 Report
        </Button>
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Report Prompt</h3>
            <p className="mt-1 text-sm text-slate-500">
              Help us moderate the marketplace. Select a reason below.
            </p>

            <div className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900 cursor-pointer text-slate-900 dark:text-slate-100"
                >
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Spam">Spam</option>
                  <option value="Copyright Violation">Copyright Violation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Description (Optional)</label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Provide additional details..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900 resize-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-900 dark:text-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={reporting}
                onClick={submitReport}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
              >
                {reporting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}