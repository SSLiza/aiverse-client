"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// ─── Star Rating Component ───────────────────────────────────
const StarRating = ({ value, onChange, readonly = false }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`text-2xl transition-colors ${
            star <= (hovered || value)
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          } ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// ─── Single Review Card ──────────────────────────────────────
const ReviewCard = ({ review }) => {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-violet-600 font-bold text-sm">
            {review.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-sm">{review.name}</p>
            <p className="text-xs text-slate-400">{review.email}</p>
          </div>
        </div>
        <div className="text-right">
          <StarRating value={review.rating} readonly />
          <p className="text-xs text-slate-400 mt-1">
            {new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

// ─── Main ReviewSection Component ───────────────────────────
const ReviewSection = ({ promptId, currentUser }) => {
  const [reviews, setReviews]     = useState([]);
  const [rating, setRating]       = useState(0);
  const [comment, setComment]     = useState("");
  const [loading, setLoading]     = useState(false);
  const [fetching, setFetching]   = useState(true);
  const [refresh, setRefresh]     = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [ratingStats, setRatingStats] = useState({
    avgRating: 0,
    starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const limit = 3;

  useEffect(() => {
    setPage(1);
  }, [promptId]);

  // fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setFetching(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${promptId}?page=${page}&limit=${limit}`
        );
        const data = await res.json();

        const reviewsData = Array.isArray(data) ? data : data.data || [];
        const fetchedPage = Number(data.currentPage ?? page) || page;
        const pageCount = Math.max(1, Number(data.totalPages ?? 1) || 1);
        const count = Number(data.totalCount ?? reviewsData.length) || 0;

        setReviews(reviewsData);
        setTotalPages(pageCount);
        setTotalCount(count);
        if (data.ratingStats) {
          setRatingStats(data.ratingStats);
        }

        if (fetchedPage !== page) {
          setPage(fetchedPage);
        }

        // check if current user already reviewed
        if (currentUser?.email) {
          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${promptId}?email=${encodeURIComponent(
              currentUser.email
            )}`
          );
          const userData = await userRes.json();
          setAlreadyReviewed(!!userData.alreadyReviewed);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchReviews();
  }, [promptId, currentUser, refresh, page]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // avg rating
  const avgRating =
    totalCount > 0 && ratingStats.avgRating > 0
      ? ratingStats.avgRating.toFixed(1)
      : null;

  // rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = ratingStats.starCounts?.[star] || 0;
    const percent = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
    return {
      star,
      count,
      percent,
    };
  });

  const handleSubmit = async () => {
    if (!rating)         return toast.error("Please select a rating");
    if (!comment.trim()) return toast.error("Please write a comment");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptId,
          name:    currentUser.name,
          email:   currentUser.email,
          rating,
          comment,
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Failed to submit");

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      setPage(1);
      setRefresh((p) => !p);
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 space-y-8">
      <h2 className="text-2xl font-bold">Reviews & Ratings</h2>

      {/* ── SUMMARY ── */}
      {reviews.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          {/* avg score */}
          <div className="flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-6xl font-bold text-yellow-400">{avgRating}</span>
            <StarRating value={Math.round(avgRating)} readonly />
            <span className="mt-1 text-sm text-slate-500">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>

          {/* distribution bars */}
          <div className="flex-1 space-y-2">
            {distribution.map(({ star, count, percent }) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-slate-500">{star}</span>
                <span className="text-yellow-400">★</span>
                <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-6 text-slate-500">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── REVIEW FORM ── */}
      {currentUser ? (
        alreadyReviewed ? (
          <div className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-4 text-sm text-green-700 dark:text-green-400">
            ✅ You have already submitted a review for this prompt.
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <h3 className="text-lg font-semibold">Write a Review</h3>

            {/* star picker */}
            <div className="space-y-1">
              <label className="text-sm text-slate-500">Your Rating</label>
              <StarRating value={rating} onChange={setRating} />
            </div>

            {/* comment */}
            <div className="space-y-1">
              <label className="text-sm text-slate-500">Your Review</label>
              <textarea
                rows={4}
                placeholder="Share your experience with this prompt..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-800 resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center text-sm text-slate-500">
          Please{" "}
          <a href="/login" className="text-violet-600 underline font-medium">
            login
          </a>{" "}
          to leave a review.
        </div>
      )}

      {/* ── REVIEWS LIST ── */}
      <div className="space-y-4">
        {fetching ? (
          // skeleton
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-1">
                  <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-2 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
              <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))
        ) : reviews.length === 0 ? (
          <p className="text-center text-slate-500 py-6">
            {totalCount === 0
              ? "No reviews yet. Be the first to review!"
              : "No reviews on this page."}
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>

      {totalPages > 1 && !fetching && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
          <p className="text-sm text-slate-500">
            Showing {Math.min((page - 1) * limit + 1, totalCount)}-
            {Math.min(page * limit, totalCount)} of {totalCount} reviews
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Previous
            </button>
            <span className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;