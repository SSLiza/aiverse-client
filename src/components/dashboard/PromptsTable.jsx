"use client";

import { useState } from "react";

import {
  Button,
  Chip,
  Modal,
  TextArea,
} from "@heroui/react";

import {
  Eye,
  Check,
  X,
  Trash2,
  Star,
} from "lucide-react";

import { toast } from "react-toastify";

export default function PromptsTable({ prompts }) {
  const [allPrompts, setAllPrompts] = useState(prompts || []);
  const [viewPrompt, setViewPrompt] = useState(null);

  const [selectedPrompt, setSelectedPrompt] =
    useState(null);

  const [feedback, setFeedback] = useState("");

  const [isRejectOpen, setIsRejectOpen] =
    useState(false);

  const [loadingId, setLoadingId] =
    useState(null);

  // APPROVE PROMPT
  const approvePrompt = async (id) => {
    setLoadingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "approved",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to approve");
      }

      setAllPrompts((prev) =>
        prev.map((prompt) =>
          prompt._id === id
            ? {
              ...prompt,
              status: "approved",
              rejectionFeedback: "",
            }
            : prompt
        )
      );

      toast.success("Prompt approved");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // OPEN REJECT MODAL
  const openRejectModal = (prompt) => {
    setSelectedPrompt(prompt);
    setFeedback("");
    setIsRejectOpen(true);
  };

  // REJECT PROMPT
  const rejectPrompt = async () => {
    console.log("Selected Prompt:", selectedPrompt);
    console.log("Feedback:", feedback);

    if (!selectedPrompt) {
      toast.error("No prompt selected");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please provide rejection feedback");
      return;
    }

    setLoadingId(selectedPrompt._id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts/${selectedPrompt._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "rejected",
            rejectionFeedback: feedback,
          }),
        }
      );

      const data = await res.json();

      console.log("Server Response:", data);

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to reject prompt"
        );
      }

      setAllPrompts((prev) =>
        prev.map((prompt) =>
          prompt._id === selectedPrompt._id
            ? {
              ...prompt,
              status: "rejected",
              rejectionFeedback: feedback,
            }
            : prompt
        )
      );

      toast.success("Prompt rejected");

      setIsRejectOpen(false);
      setSelectedPrompt(null);
      setFeedback("");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // FEATURE / UNFEATURE
  const toggleFeature = async (id) => {
    setLoadingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts/${id}/featured`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok)
        throw new Error(
          "Failed to update feature status"
        );

      setAllPrompts((prev) =>
        prev.map((prompt) =>
          prompt._id === id
            ? {
              ...prompt,
              featured:
                !prompt.featured,
            }
            : prompt
        )
      );

      toast.success(
        "Feature status updated"
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // DELETE
  const deletePrompt = async (id) => {
    const confirmed = window.confirm(
      "Delete this prompt?"
    );

    if (!confirmed) return;

    setLoadingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/prompts/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to delete prompt"
        );
      }

      setAllPrompts((prev) =>
        prev.filter((prompt) => prompt._id !== id)
      );

      toast.success("Prompt deleted");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="rounded-2xl border">

        {/* MOBILE VIEW */}
        <div className="block md:hidden space-y-4 p-4">
          {allPrompts.length === 0 ? (
            <div className="text-center text-default-500 py-10">
              No prompts found.
            </div>
          ) : (
            allPrompts.map((prompt) => (
              <div
                key={prompt._id}
                className="rounded-2xl border p-4 space-y-4"
              >
                {/* Header */}
                <div>
                  <h3 className="font-semibold text-lg">
                    {prompt.title}
                  </h3>

                  <p className="text-sm text-default-500">
                    {prompt.category}
                  </p>
                </div>

                {/* Creator */}
                <div>
                  <p className="font-medium">
                    {prompt.creatorName}
                  </p>

                  <p className="text-sm text-default-500 break-all">
                    {prompt.creatorEmail}
                  </p>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  <Chip color="secondary">
                    {prompt.aiTool}
                  </Chip>

                  <Chip
                    color={
                      prompt.status === "approved"
                        ? "success"
                        : prompt.status === "rejected"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {prompt.status || "pending"}
                  </Chip>

                  <Chip
                    color={
                      prompt.visibility === "Public"
                        ? "success"
                        : "warning"
                    }
                  >
                    {prompt.visibility}
                  </Chip>
                </div>

                {/* Featured */}
                <Button
                  fullWidth
                  size="sm"
                  color={
                    prompt.featured
                      ? "warning"
                      : "default"
                  }
                  variant={
                    prompt.featured
                      ? "solid"
                      : "flat"
                  }
                  isLoading={loadingId === prompt._id}
                  onPress={() =>
                    toggleFeature(prompt._id)
                  }
                >
                  <Star size={14} />

                  {prompt.featured
                    ? "Featured"
                    : "Feature Prompt"}
                </Button>

                {/* Actions */}
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={() =>
                      setViewPrompt(prompt)
                    }
                  >
                    <Eye size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="success"
                    variant="flat"
                    isLoading={loadingId === prompt._id}
                    onPress={() =>
                      approvePrompt(prompt._id)
                    }
                  >
                    <Check size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    onPress={() =>
                      openRejectModal(prompt)
                    }
                  >
                    <X size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    isLoading={loadingId === prompt._id}
                    onPress={() =>
                      deletePrompt(prompt._id)
                    }
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-default-100">
              <tr>
                <th className="p-4 text-left">Template</th>
                <th className="text-left">Creator</th>
                <th className="text-left">AI Engine</th>
                <th className="text-left">Visibility</th>
                <th className="text-left">Featured</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allPrompts.map((prompt) => (
                <tr
                  key={prompt._id}
                  className="border-t"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">
                        {prompt.title}
                      </p>

                      <p className="text-sm text-default-500">
                        Category: {prompt.category}
                      </p>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p>{prompt.creatorName}</p>

                      <p className="text-sm text-default-500">
                        {prompt.creatorEmail}
                      </p>
                    </div>
                  </td>

                  <td>
                    <Chip color="secondary">
                      {prompt.aiTool}
                    </Chip>
                  </td>

                  <td>{prompt.visibility}</td>

                  <td>
                    <Button
                      size="sm"
                      color={
                        prompt.featured
                          ? "warning"
                          : "default"
                      }
                      variant={
                        prompt.featured
                          ? "solid"
                          : "flat"
                      }
                      isLoading={loadingId === prompt._id}
                      onPress={() =>
                        toggleFeature(prompt._id)
                      }
                    >
                      <Star size={14} />

                      {prompt.featured
                        ? "Featured"
                        : "Feature"}
                    </Button>
                  </td>

                  <td>
                    <Chip
                      color={
                        prompt.status === "approved"
                          ? "success"
                          : prompt.status === "rejected"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {prompt.status || "pending"}
                    </Chip>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      {/* action buttons */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}