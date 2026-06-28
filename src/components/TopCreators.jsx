"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getTopCreators } from "@/lib/actions/creators";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const limit = 4;

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const result = await getTopCreators(page, limit);
        const creatorsData = Array.isArray(result) ? result : (result.data || []);
        const totalP = result.totalPages || 1;
        const totalC = result.totalCount || creatorsData.length;

        setCreators(creatorsData);
        setTotalPages(totalP);
        setTotalCount(totalC);
      } catch (err) {
        console.error("Failed to load top creators:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, [page]);

  if (!loading && !creators.length) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">Top Creators</h2>
          <p className="mt-3 text-default-500">
            Discover the most popular prompt creators.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 min-h-[300px]">
          {loading ? (
            [...Array(limit)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border bg-content1 p-6 shadow-sm animate-pulse space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                </div>
              </div>
            ))
          ) : (
            creators.map((creator, index) => (
              <div
                key={creator._id}
                className="rounded-3xl border bg-content1 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={creator.image || "/default-avatar.png"}
                    alt={creator.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {creator.name}
                    </h3>

                    <p className="text-sm text-default-500">
                      @{creator.username}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {creator.totalPrompts}
                    </p>
                    <p className="text-xs text-default-500">Prompts</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold">
                      {creator.totalCopies}
                    </p>
                    <p className="text-xs text-default-500">Copies</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    #{((page - 1) * limit) + index + 1} Creator
                  </span>

                  <Link
                    href={`/all-prompts?search=${encodeURIComponent(creator.name || creator.email)}`}
                    className="text-primary text-sm font-medium"
                  >
                    View Prompts →
                  </Link>
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