"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

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

  // Animation variants
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-20 px-6 bg-default-50/20 dark:bg-zinc-950/10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-650 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            What Our Users Say
          </h2>
          <p className="text-default-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Hear from creators, developers, and professionals who use
            AIVerse to boost their productivity.
          </p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[220px]"
        >
          <AnimatePresence mode="popLayout">
            {loading ? (
              [...Array(limit)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="border border-default-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-950 shadow-sm animate-pulse space-y-6"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <div key={idx} className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded w-full" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded w-5/6" />
                  </div>
                  <div className="border-t border-default-100 dark:border-zinc-900/80 pt-4 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded w-1/3" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-850 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : (
              reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  layout
                  className="border border-default-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Rating */}
                    <div className="mb-4 flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < review.rating ? "fill-amber-500 text-amber-500" : "text-slate-300 dark:text-slate-800"}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-default-600 dark:text-zinc-300 italic mb-6 text-sm leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="border-t border-default-100 dark:border-zinc-900/80 pt-4">
                    <h4 className="font-bold text-sm text-foreground">{review.name}</h4>
                    <p className="text-xs text-default-400 mt-0.5 truncate">
                      {review.email}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && !loading && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="rounded-xl border border-default-200 dark:border-zinc-800 px-5 py-2.5 text-xs font-bold hover:bg-default-100 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer text-foreground bg-transparent"
            >
              Previous
            </button>

            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="rounded-xl border border-default-200 dark:border-zinc-800 px-5 py-2.5 text-xs font-bold hover:bg-default-100 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer text-foreground bg-transparent"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}