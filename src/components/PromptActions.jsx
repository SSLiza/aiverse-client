"use client";

import { Button } from "@heroui/react";
import { toast } from "react-toastify";

export default function PromptActions({
  prompt,
  currentUser,
}) {
  const handleBookmark = async () => {
    if (!currentUser) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks`,
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
        toast.success("Prompt bookmarked");
      } else {
        toast.error(data.message || "Already bookmarked");
      }
    } catch (error) {
      toast.error("Failed to bookmark");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        prompt.content
      );

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/prompts/copy/${prompt._id}`,
        {
          method: "PATCH",
        }
      );

      toast.success("Prompt copied!");
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  const handleReport = async () => {
    if (!currentUser) {
      toast.error("Please login first");
      return;
    }

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
            reason: "Inappropriate content",
          }),
        }
      );

      if (res.ok) {
        toast.success("Prompt reported");
      } else {
        toast.error("Failed to report");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <Button color="primary" onPress={handleBookmark}>
        ⭐ Bookmark
      </Button>

      <Button color="secondary" onPress={handleCopy}>
        📋 Copy Prompt
      </Button>

      {/* Review section already exists below */}
      <Button color="success">
        ✍️ Review Below
      </Button>

      <Button color="danger" onPress={handleReport}>
        🚩 Report
      </Button>
    </div>
  );
}