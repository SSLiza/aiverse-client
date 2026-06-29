"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import LoadingPage from "@/components/LoadingPage";
import { Trash2 } from "lucide-react";

export default function SavedPromptsPage() {
  const { data: session, isPending } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePromptId, setDeletePromptId] = useState(null);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  const fetchSavedPrompts = async () => {
    if (!session?.user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/user/${session.user.email}`
      );
      const data = await res.json();
      setPrompts(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load saved prompts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchSavedPrompts();
    }
  }, [session]);

  const confirmRemoveBookmark = async (promptId) => {
    setSubmittingDelete(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session.user.email,
            promptId,
          }),
        }
      );
      if (res.ok) {
        toast.success("Bookmark removed");
        setPrompts((prev) => prev.filter((p) => p._id !== promptId));
        setDeletePromptId(null);
      }
    } catch (error) {
      toast.error("Failed to remove bookmark");
    } finally {
      setSubmittingDelete(false);
    }
  };

  if (isPending || (loading && session?.user?.email)) {
    return <LoadingPage message="Loading saved prompts..." />;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Saved Prompts</h1>
        <p className="text-slate-500">Access templates you have bookmarked for quick use.</p>
      </div>

      {prompts.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
          <p className="text-slate-500">You haven't bookmarked any prompts yet.</p>
          <Link
            href="/all-prompts"
            className="mt-4 inline-block text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl shadow transition"
          >
            Explore Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <Card
              key={prompt._id}
              className="p-5 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col justify-between shadow-sm rounded-2xl"
            >
              <div>
                <div className="flex gap-2 mb-3">
                  <Chip size="sm" color="secondary" className="font-medium">
                    {prompt.aiTool}
                  </Chip>
                  <Chip size="sm" variant="flat" className="font-medium text-slate-600 dark:text-slate-350 bg-slate-100 dark:bg-slate-800">
                    {prompt.category}
                  </Chip>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-850 dark:text-white">
                  {prompt.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                  {prompt.description}
                </p>
              </div>

              <div className="flex gap-3 mt-4 border-t border-slate-100 dark:border-slate-850 pt-4">
                <Link href={`/all-prompts/${prompt._id}`} className="flex-1">
                  <Button size="sm" className="w-full font-semibold rounded-xl bg-violet-600 hover:bg-violet-750 text-white">
                    View Details
                  </Button>
                </Link>
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  className="font-semibold rounded-xl hover:bg-red-50"
                  onPress={() => setDeletePromptId(prompt._id)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletePromptId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-655 dark:text-red-500">
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Trash2 size={22} className="flex-shrink-0" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Remove Bookmark</h3>
            </div>

            <p className="text-sm text-default-500 leading-relaxed">
              Are you sure you want to remove this bookmark?
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                disabled={submittingDelete}
                onClick={() => setDeletePromptId(null)}
                className="rounded-xl border border-default-200 dark:border-zinc-800 px-4 py-2.5 text-sm font-semibold hover:bg-default-50 dark:hover:bg-zinc-900 transition text-foreground cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={submittingDelete}
                onClick={() => confirmRemoveBookmark(deletePromptId)}
                className="rounded-xl bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                {submittingDelete ? "Removing..." : "Confirm Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
