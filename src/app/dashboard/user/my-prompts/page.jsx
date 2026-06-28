"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { deletePrompt, getMyPrompts, updatePrompt } from "@/lib/api/prompts";
import LoadingPage from "@/components/LoadingPage";
import { toast } from "react-toastify";
import { Trash2, X, AlertTriangle, BarChart2 } from "lucide-react";

const categories = [
  "Writing",
  "Coding",
  "Marketing",
  "Business",
  "Education",
  "Design",
  "Productivity",
];

const aiTools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Copilot",
  "Midjourney",
  "Perplexity",
];

export default function MyPromptsPage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [editPrompt, setEditPrompt] = useState(null);
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [deletePromptId, setDeletePromptId] = useState(null);
  const [submittingDelete, setSubmittingDelete] = useState(false);
  const [selectedAnalyticsPrompt, setSelectedAnalyticsPrompt] = useState(null);

  const { data: session } = useSession();
  const creatorId = session?.user?.id;

  useEffect(() => {
    if (!creatorId) return;

    const fetchPrompts = async () => {
      try {
        const data = await getMyPrompts(creatorId);
        setPrompts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [creatorId]);

  const handleEditChange = (e) => {
    setEditPrompt({
      ...editPrompt,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editPrompt) return;

    setSubmittingEdit(true);
    try {
      await updatePrompt(editPrompt._id, editPrompt);
      setPrompts((prev) =>
        prev.map((p) => (p._id === editPrompt._id ? editPrompt : p))
      );
      toast.success("Prompt updated successfully!");
      setEditPrompt(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update prompt");
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletePromptId) return;

    setSubmittingDelete(true);
    try {
      await deletePrompt(deletePromptId);
      setPrompts((prev) => prev.filter((p) => p._id !== deletePromptId));
      toast.success("Prompt deleted successfully!");
      setDeletePromptId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete prompt");
    } finally {
      setSubmittingDelete(false);
    }
  };

  if (loading) {
    return <LoadingPage message="Loading your prompts..." />;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading">
          My Prompts
        </h1>

        <p className="mt-2 text-default-500">
          Manage all your created prompts.
        </p>
      </div>

      {/* Empty State */}
      {prompts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-default-200 dark:border-zinc-800 p-12 text-center bg-content1/50 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold">
            No Prompts Found
          </h2>

          <p className="mt-2 text-default-500">
            You have not created any prompts yet.
          </p>
        </div>
      )}

      {/* Desktop Table */}
      {prompts.length > 0 && (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-default-200 dark:border-zinc-800 lg:block bg-content1/50 backdrop-blur-sm">
            <table className="w-full">
              <thead className="bg-default-100/50">
                <tr>
                  <th className="p-4 text-left font-semibold text-sm">
                    Title
                  </th>

                  <th className="p-4 text-left font-semibold text-sm">
                    Category
                  </th>

                  <th className="p-4 text-left font-semibold text-sm">
                    Copies
                  </th>

                  <th className="p-4 text-left font-semibold text-sm">
                    Status
                  </th>

                  <th className="p-4 text-center font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {prompts.map((prompt) => (
                  <tr
                    key={prompt._id}
                    className="border-t border-default-250 dark:border-zinc-900 hover:bg-default-50/50 dark:hover:bg-zinc-900/10 transition-colors"
                  >
                    <td className="p-4 font-medium text-sm">
                      {prompt.title}
                    </td>

                    <td className="p-4 text-sm text-default-500">
                      {prompt.category}
                    </td>

                    <td className="p-4 text-sm">
                      {prompt.copyCount}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          prompt.status === "approved"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : prompt.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {prompt.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedAnalyticsPrompt(prompt)}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition shadow-sm hover:shadow cursor-pointer flex items-center gap-1.5"
                        >
                          <BarChart2 size={14} /> Analytics
                        </button>

                        <button
                          onClick={() => setEditPrompt(prompt)}
                          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 active:bg-violet-700 transition shadow-sm hover:shadow cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setDeletePromptId(prompt._id)}
                          className="rounded-lg bg-red-650 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 active:bg-red-750 transition shadow-sm hover:shadow cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 lg:hidden">
            {prompts.map((prompt) => (
              <div
                key={prompt._id}
                className="rounded-2xl border border-default-200 dark:border-zinc-800 p-5 bg-content1/50 backdrop-blur-sm shadow-sm"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-base">
                      {prompt.title}
                    </h3>

                    <p className="text-sm text-default-500 mt-0.5">
                      {prompt.category}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-default-500">
                      Copies
                    </span>

                    <span className="font-medium text-sm">
                      {prompt.copyCount}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-default-500">
                      Status
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        prompt.status === "approved"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : prompt.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {prompt.status}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSelectedAnalyticsPrompt(prompt)}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <BarChart2 size={14} /> Analytics
                    </button>

                    <button
                      onClick={() => setEditPrompt(prompt)}
                      className="flex-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition cursor-pointer text-center"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeletePromptId(prompt._id)}
                      className="flex-1 rounded-lg bg-red-650 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition cursor-pointer text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit Prompt Modal */}
      {editPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-4 my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditPrompt(null)}
              className="absolute top-4 right-4 text-default-400 hover:text-default-600 dark:hover:text-zinc-200 cursor-pointer p-1 rounded-lg hover:bg-default-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 pr-8">
              Edit Prompt Template
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-default-500 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editPrompt.title || ""}
                  onChange={handleEditChange}
                  required
                  className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-default-500 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editPrompt.description || ""}
                  onChange={handleEditChange}
                  required
                  rows={2}
                  className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-default-500 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={editPrompt.content || ""}
                  onChange={handleEditChange}
                  required
                  rows={6}
                  className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-default-500 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={editPrompt.category || ""}
                    onChange={handleEditChange}
                    required
                    className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-zinc-950 text-foreground">Select Category</option>
                    {categories.map((item) => (
                      <option key={item} value={item} className="bg-white dark:bg-zinc-950 text-foreground">
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-default-500 mb-1">
                    AI Tool
                  </label>
                  <select
                    name="aiTool"
                    value={editPrompt.aiTool || ""}
                    onChange={handleEditChange}
                    required
                    className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-zinc-950 text-foreground">Select AI Tool</option>
                    {aiTools.map((item) => (
                      <option key={item} value={item} className="bg-white dark:bg-zinc-950 text-foreground">
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-default-500 mb-1">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={editPrompt.difficulty || ""}
                    onChange={handleEditChange}
                    required
                    className="w-full bg-white dark:bg-zinc-950 border border-default-200 dark:border-zinc-800 rounded-xl p-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-zinc-950 text-foreground">Select Difficulty</option>
                    <option value="Beginner" className="bg-white dark:bg-zinc-950 text-foreground">
                      Beginner
                    </option>
                    <option value="Intermediate" className="bg-white dark:bg-zinc-950 text-foreground">
                      Intermediate
                    </option>
                    <option value="Advanced" className="bg-white dark:bg-zinc-950 text-foreground">
                      Advanced
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-default-100 dark:border-zinc-900/80">
                <button
                  type="button"
                  onClick={() => setEditPrompt(null)}
                  className="rounded-xl border border-default-200 dark:border-zinc-800 px-4 py-2.5 text-sm font-semibold hover:bg-default-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-foreground"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submittingEdit}
                  className="rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow transition disabled:opacity-50 cursor-pointer"
                >
                  {submittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletePromptId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Trash2 size={22} className="flex-shrink-0" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Delete Prompt</h3>
            </div>

            <p className="text-sm text-default-500 leading-relaxed">
              Are you sure you want to delete this prompt? This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeletePromptId(null)}
                className="rounded-xl border border-default-200 dark:border-zinc-800 px-4 py-2.5 text-sm font-semibold hover:bg-default-50 dark:hover:bg-zinc-900 transition text-foreground cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={submittingDelete}
                onClick={handleDeleteConfirm}
                className="rounded-xl bg-red-650 hover:bg-red-600 active:bg-red-750 px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 cursor-pointer"
              >
                {submittingDelete ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {selectedAnalyticsPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setSelectedAnalyticsPrompt(null)}
              className="absolute top-4 right-4 text-default-400 hover:text-default-600 dark:hover:text-zinc-200 cursor-pointer p-1 rounded-lg hover:bg-default-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-foreground pr-8">
              Prompt Performance Analytics
            </h3>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                <span className="text-xs text-default-400 uppercase tracking-wider font-bold">Prompt Title</span>
                <p className="text-sm font-bold text-foreground mt-1 truncate">
                  {selectedAnalyticsPrompt.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-default-200 dark:border-zinc-800 bg-default-50/50 dark:bg-zinc-950 text-center">
                  <span className="text-xs text-default-400 uppercase tracking-wider font-bold">Total Copies</span>
                  <p className="text-3xl font-extrabold text-foreground mt-2">
                    {selectedAnalyticsPrompt.copyCount || 0}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-default-200 dark:border-zinc-800 bg-default-50/50 dark:bg-zinc-950 text-center">
                  <span className="text-xs text-default-400 uppercase tracking-wider font-bold">Avg Rating</span>
                  <p className="text-3xl font-extrabold text-amber-500 mt-2 flex items-center justify-center gap-1">
                    ⭐ {selectedAnalyticsPrompt.avgRating || 0}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-default-200 dark:border-zinc-800 bg-default-50/50 dark:bg-zinc-950 text-center">
                  <span className="text-xs text-default-400 uppercase tracking-wider font-bold">Total Reviews</span>
                  <p className="text-3xl font-extrabold text-foreground mt-2">
                    {selectedAnalyticsPrompt.totalReviews || 0}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-default-200 dark:border-zinc-800 bg-default-50/50 dark:bg-zinc-950 text-center">
                  <span className="text-xs text-default-400 uppercase tracking-wider font-bold">Status</span>
                  <div className="mt-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                        selectedAnalyticsPrompt.status === "approved"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : selectedAnalyticsPrompt.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {selectedAnalyticsPrompt.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-default-200 dark:border-zinc-800 bg-default-50/50 dark:bg-zinc-950 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-default-400">AI Tool:</span>
                  <span className="font-bold text-foreground">{selectedAnalyticsPrompt.aiTool}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-400">Category:</span>
                  <span className="font-bold text-foreground">{selectedAnalyticsPrompt.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-400">Visibility:</span>
                  <span className="font-bold text-foreground uppercase">{selectedAnalyticsPrompt.visibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-400">Difficulty:</span>
                  <span className="font-bold text-foreground uppercase">{selectedAnalyticsPrompt.difficulty || "Beginner"}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedAnalyticsPrompt(null)}
                className="w-full rounded-xl bg-violet-650 py-3 text-sm font-semibold text-white hover:bg-violet-600 transition cursor-pointer"
              >
                Close Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}