"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";

export default function SavedPromptsPage() {
  const { data: session, isPending } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleRemoveBookmark = async (promptId) => {
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
      }
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  if (isPending || (loading && session?.user?.email)) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-600 border-r-transparent align-[-0.125em]" />
        <p className="mt-2 text-slate-500">Loading saved prompts...</p>
      </div>
    );
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
                  onPress={() => handleRemoveBookmark(prompt._id)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
