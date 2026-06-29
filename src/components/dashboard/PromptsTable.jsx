"use client";

import { useState } from "react";

import {
  Button,
  ButtonGroup,
  Chip,
} from "@heroui/react";

import {
  Eye,
  Check,
  X,
  Trash2,
  Star,
  Copy,
} from "lucide-react";

import { toast } from "react-toastify";

export default function PromptsTable({ prompts }) {
  const promptsArray = Array.isArray(prompts) ? prompts : (prompts && Array.isArray(prompts.data) ? prompts.data : []);
  const [allPrompts, setAllPrompts] = useState(promptsArray);
  const [viewPrompt, setViewPrompt] = useState(null);

  const [selectedPrompt, setSelectedPrompt] =
    useState(null);

  const [feedback, setFeedback] = useState("");

  const [isRejectOpen, setIsRejectOpen] =
    useState(false);

  const [deletePromptId, setDeletePromptId] = useState(null);

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

  // TRIGGER DELETE MODAL
  const triggerDelete = (id) => {
    setDeletePromptId(id);
  };

  // CONFIRM AND EXECUTE DELETE
  const confirmDeletePrompt = async () => {
    if (!deletePromptId) return;
    const id = deletePromptId;
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
      setDeletePromptId(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-hidden">

        {/* MOBILE VIEW */}
        <div className="block md:hidden space-y-4 p-4">
          {allPrompts.length === 0 ? (
            <div className="text-center text-default-500 py-10 text-sm">
              No prompts found.
            </div>
          ) : (
            allPrompts.map((prompt) => (
              <div
                key={prompt._id}
                className="rounded-2xl border border-slate-200 dark:border-slate-850 p-4 space-y-4 bg-slate-50/30 dark:bg-slate-900/10 shadow-sm"
              >
                {/* Header */}
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                    {prompt.title}
                  </h3>

                  <p className="text-sm text-default-500">
                    Category: <span className="font-medium text-slate-700 dark:text-slate-350">{prompt.category}</span>
                  </p>
                </div>

                {/* Creator */}
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                    {prompt.creatorName}
                  </p>

                  <p className="text-xs text-slate-500 break-all font-mono">
                    {prompt.creatorEmail}
                  </p>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  <Chip color="secondary" size="sm" variant="flat">
                    {prompt.aiTool}
                  </Chip>

                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      prompt.status === "approved"
                        ? "success"
                        : prompt.status === "rejected"
                          ? "danger"
                          : "warning"
                    }
                    className="capitalize"
                  >
                    {prompt.status || "pending"}
                  </Chip>

                  <Chip
                    size="sm"
                    variant="flat"
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
                  className="rounded-xl font-medium h-9"
                >
                  <Star size={14} className={prompt.featured ? "fill-current" : ""} />

                  {prompt.featured
                    ? "Featured"
                    : "Feature Prompt"}
                </Button>

                {/* Actions */}
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    onPress={() =>
                      setViewPrompt(prompt)
                    }
                    className="rounded-xl"
                  >
                    <Eye size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="success"
                    variant="flat"
                    size="sm"
                    isLoading={loadingId === prompt._id}
                    onPress={() =>
                      approvePrompt(prompt._id)
                    }
                    className="rounded-xl"
                  >
                    <Check size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    size="sm"
                    onPress={() =>
                      openRejectModal(prompt)
                    }
                    className="rounded-xl"
                  >
                    <X size={16} />
                  </Button>

                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    size="sm"
                    isLoading={loadingId === prompt._id}
                    onPress={() =>
                      triggerDelete(prompt._id)
                    }
                    className="rounded-xl"
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
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-default-200">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Template</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Creator</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Engine</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Visibility</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Featured</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {allPrompts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-default-500 text-sm">
                    No prompt templates found.
                  </td>
                </tr>
              ) : (
                allPrompts.map((prompt) => (
                  <tr
                    key={prompt._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors"
                  >
                    <td className="p-4 align-middle">
                      <div className="space-y-1">
                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                          {prompt.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          Category: <span className="font-medium text-slate-700 dark:text-slate-350">{prompt.category}</span>
                        </p>
                      </div>
                    </td>

                    <td className="p-4 align-middle">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{prompt.creatorName}</p>
                        <p className="text-xs text-slate-500 font-mono">
                          {prompt.creatorEmail}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 align-middle">
                      <Chip color="secondary" size="sm" variant="flat">
                        {prompt.aiTool}
                      </Chip>
                    </td>

                    <td className="p-4 align-middle">
                      <span className={`text-xs font-semibold uppercase ${prompt.visibility === "Public"
                        ? "text-green-600 dark:text-green-400"
                        : "text-amber-600 dark:text-amber-400"
                        }`}>
                        {prompt.visibility}
                      </span>
                    </td>

                    <td className="p-4 align-middle">
                      <Button
                        size="sm"
                        color={prompt.featured ? "warning" : "default"}
                        variant={prompt.featured ? "solid" : "flat"}
                        isLoading={loadingId === prompt._id}
                        onPress={() => toggleFeature(prompt._id)}
                        className="h-8 font-medium rounded-xl"
                      >
                        <Star size={13} className={prompt.featured ? "fill-current" : ""} />
                        {prompt.featured ? "Featured" : "Feature"}
                      </Button>
                    </td>

                    <td className="p-4 align-middle">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          prompt.status === "approved"
                            ? "success"
                            : prompt.status === "rejected"
                              ? "danger"
                              : "warning"
                        }
                        className="capitalize font-medium"
                      >
                        {prompt.status || "pending"}
                      </Chip>
                    </td>

                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        {/* View */}
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          onPress={() => setViewPrompt(prompt)}
                          title="View Details"
                          className="h-8 w-8 min-w-8 rounded-xl"
                        >
                          <Eye size={15} />
                        </Button>

                        {/* Approve */}
                        {prompt.status !== "approved" && (
                          <Button
                            isIconOnly
                            color="success"
                            variant="flat"
                            size="sm"
                            isLoading={loadingId === prompt._id}
                            onPress={() => approvePrompt(prompt._id)}
                            title="Approve Prompt"
                            className="h-8 w-8 min-w-8 rounded-xl"
                          >
                            <Check size={15} />
                          </Button>
                        )}

                        {/* Reject */}
                        {prompt.status !== "rejected" && (
                          <Button
                            isIconOnly
                            color="danger"
                            variant="flat"
                            size="sm"
                            onPress={() => openRejectModal(prompt)}
                            title="Reject Prompt"
                            className="h-8 w-8 min-w-8 rounded-xl"
                          >
                            <X size={15} />
                          </Button>
                        )}

                        {/* Delete */}
                        <Button
                          isIconOnly
                          color="danger"
                          variant="flat"
                          size="sm"
                          isLoading={loadingId === prompt._id}
                          onPress={() => triggerDelete(prompt._id)}
                          title="Delete Prompt"
                          className="h-8 w-8 min-w-8 rounded-xl"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Prompt Details Modal */}
      {viewPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 md:p-8 shadow-2xl space-y-6 overflow-y-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-850 pb-4">
              <div>
                <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {viewPrompt.category}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                  {viewPrompt.title}
                </h3>
              </div>
              <button
                onClick={() => setViewPrompt(null)}
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5">
              {/* Creator & Meta Info */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-900">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Creator</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{viewPrompt.creatorName}</p>
                  <p className="text-xs text-slate-500 break-all font-mono">{viewPrompt.creatorEmail}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Engine & Specs</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className="text-[11px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded">
                      {viewPrompt.aiTool}
                    </span>
                    <span className="text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded capitalize">
                      {viewPrompt.difficulty || "Medium"}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${viewPrompt.visibility === "Public"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                      {viewPrompt.visibility}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</p>
                <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed bg-white dark:bg-transparent">
                  {viewPrompt.description || "No description provided."}
                </p>
              </div>

              {/* Prompt Content */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Prompt Instructions</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(viewPrompt.content);
                      toast.success("Prompt copied to clipboard!");
                    }}
                    className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:underline cursor-pointer font-semibold"
                  >
                    <Copy size={12} />
                    Copy Content
                  </button>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 py-2 text-slate-500 dark:text-slate-400 text-xs">
                    <span className="font-mono">prompt_content.txt</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-2 py-0.5 rounded">Instructions</span>
                  </div>
                  <pre className="p-4 bg-slate-50/50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-200 text-xs font-mono whitespace-pre-wrap break-words leading-relaxed max-h-[220px] overflow-y-auto">
                    {viewPrompt.content}
                  </pre>
                </div>
              </div>

              {/* Tags */}
              {viewPrompt.tags && (
                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(viewPrompt.tags)
                      ? viewPrompt.tags
                      : typeof viewPrompt.tags === "string"
                        ? viewPrompt.tags.split(",").map(t => t.trim())
                        : []
                    ).filter(Boolean).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-850 text-slate-650 dark:text-slate-350 px-2.5 py-1 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rejection Feedback (if exists) */}
              {viewPrompt.status === "rejected" && viewPrompt.rejectionFeedback && (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100/60 dark:border-red-900/50 text-red-800 dark:text-red-400 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider">Rejection Reason</p>
                  <p className="text-sm leading-relaxed">{viewPrompt.rejectionFeedback}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                Status:
                <span className={`font-semibold capitalize ${viewPrompt.status === "approved" ? "text-green-600" : viewPrompt.status === "rejected" ? "text-red-600" : "text-amber-600"
                  }`}>
                  {viewPrompt.status || "pending"}
                </span>
              </span>

              <div className="flex gap-2">
                {/* Approve */}
                {viewPrompt.status !== "approved" && (
                  <Button
                    color="success"
                    size="sm"
                    className="font-semibold text-white rounded-xl"
                    isLoading={loadingId === viewPrompt._id}
                    onPress={async () => {
                      await approvePrompt(viewPrompt._id);
                      setViewPrompt(prev => ({ ...prev, status: "approved", rejectionFeedback: "" }));
                    }}
                  >
                    <Check size={14} className="mr-1" /> Approve
                  </Button>
                )}

                {/* Reject */}
                {viewPrompt.status !== "rejected" && (
                  <Button
                    color="danger"
                    size="sm"
                    className="font-semibold text-white rounded-xl"
                    onPress={() => {
                      setViewPrompt(null);
                      openRejectModal(viewPrompt);
                    }}
                  >
                    <X size={14} className="mr-1" /> Reject
                  </Button>
                )}

                {/* Close */}
                <button
                  onClick={() => setViewPrompt(null)}
                  className="rounded-xl border border-slate-200 dark:border-slate-850 px-4 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Feedback Modal */}
      {isRejectOpen && selectedPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reject Prompt</h3>
              <p className="mt-1 text-xs text-slate-500">
                Please provide detailed feedback explaining why this prompt template is being rejected. This will be visible to the creator.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Rejection Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="e.g. The prompt instructions are too brief or contain placeholder values that are not clearly defined..."
                rows={4}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-900 resize-none text-slate-900 dark:text-slate-100 leading-relaxed placeholder-slate-400 dark:placeholder-slate-600 animate-fadeIn"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsRejectOpen(false);
                  setSelectedPrompt(null);
                  setFeedback("");
                }}
                className="rounded-xl border border-slate-200 dark:border-slate-850 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>

              <Button
                color="danger"
                className="font-semibold text-white px-4 h-10 rounded-xl"
                isLoading={loadingId === selectedPrompt._id}
                onPress={rejectPrompt}
              >
                Submit Rejection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletePromptId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Template</h3>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Are you sure you want to delete this prompt template? This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
              <button
                type="button"
                onClick={() => setDeletePromptId(null)}
                className="rounded-xl border border-slate-200 dark:border-slate-850 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>

              <Button
                color="danger"
                className="font-semibold text-white px-4 h-10 rounded-xl"
                isLoading={loadingId === deletePromptId}
                onPress={confirmDeletePrompt}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}