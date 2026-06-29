"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { Trash2, MessageSquare, Star, Calendar } from "lucide-react";
import LoadingPage from "@/components/LoadingPage";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [submittingDelete, setSubmittingDelete] = useState(false);
  const { data: session } = useSession();
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const fetchReviews = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`${apiBaseUrl}/reviews/user/${session.user.email}`);
      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await res.json();
      const reviewsArray = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);
      setReviews(reviewsArray);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchReviews();
    }
  }, [session, apiBaseUrl]);

  const confirmDeleteReview = async (id) => {
    setSubmittingDelete(true);

    try {
      const res = await fetch(`${apiBaseUrl}/reviews/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Review deleted successfully!");
        setReviews((prev) => prev.filter((r) => r._id !== id));
        setDeleteReviewId(null);
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review");
    } finally {
      setSubmittingDelete(false);
    }
  };

  if (loading && session?.user?.email) {
    return <LoadingPage message="Loading your reviews..." />;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="text-violet-500 h-8 w-8" />
          My Reviews
        </h1>
        <p className="text-slate-500 mt-1">
          Review history for prompts you've tried.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-default-200 dark:border-zinc-800 p-12 text-center bg-content1/50 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold">No Reviews Found</h2>
          <p className="mt-2 text-default-500">
            You haven't submitted any reviews yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm space-y-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-100 dark:border-zinc-900 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    Prompt Title
                  </span>
                  <h3 className="text-base font-bold text-foreground">
                    {review.promptTitle || review.title || "AI Prompt Template"}
                  </h3>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < review.rating ? "fill-amber-500 text-amber-500" : "text-slate-300 dark:text-slate-800"}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-default-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Your Review
                </span>
                <p className="mt-1 text-sm text-default-600 dark:text-zinc-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/all-prompts/${review.promptId}`}
                  className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  View Original Prompt →
                </Link>

                <button
                  onClick={() => setDeleteReviewId(review._id)}
                  className="rounded-lg border border-red-200 dark:border-red-950/40 px-3 py-1.5 text-xs font-bold text-red-655 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={13} /> Delete Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteReviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-655 dark:text-red-500">
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Trash2 size={22} className="flex-shrink-0" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Delete Review</h3>
            </div>

            <p className="text-sm text-default-500 leading-relaxed">
              Are you sure you want to delete this review? This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                disabled={submittingDelete}
                onClick={() => setDeleteReviewId(null)}
                className="rounded-xl border border-default-200 dark:border-zinc-800 px-4 py-2.5 text-sm font-semibold hover:bg-default-50 dark:hover:bg-zinc-900 transition text-foreground cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={submittingDelete}
                onClick={() => confirmDeleteReview(deleteReviewId)}
                className="rounded-xl bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                {submittingDelete ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}