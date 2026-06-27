"use client";

import { useEffect, useState } from "react";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const limit = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/customer-reviews?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        
        const reviewsData = Array.isArray(data) ? data : (data.data || []);
        const totalP = data.totalPages || 1;
        const totalC = data.totalCount || reviewsData.length;

        setReviews(reviewsData);
        setTotalPages(totalP);
        setTotalCount(totalC);
      } catch (err) {
        console.error("Failed to fetch customer reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  if (!loading && !reviews.length) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-default-500 max-w-2xl mx-auto">
            Hear from creators, developers, and professionals who use
            AIVerse to boost their productivity.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[220px]">
          {loading ? (
            [...Array(limit)].map((_, i) => (
              <div
                key={i}
                className="border border-default-200 rounded-2xl p-6 shadow-sm animate-pulse space-y-6"
              >
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border border-default-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Rating */}
                <div className="mb-4 text-yellow-500 text-xl">
                  {"⭐".repeat(review.rating)}
                </div>

                {/* Comment */}
                <p className="text-default-600 italic mb-6">
                  {review.comment}
                </p>

                {/* User Info */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-default-500">
                    {review.email}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && !loading && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer text-default-700 dark:text-default-300 bg-transparent"
            >
              Previous
            </button>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer text-default-700 dark:text-default-300 bg-transparent"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}