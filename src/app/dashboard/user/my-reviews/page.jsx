"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const { data: session } = useSession();
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${apiBaseUrl}/reviews/user/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
    }
  }, [session, apiBaseUrl]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-xl p-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Prompt reviewed</p>
                  <a
                    href={`/all-prompts/${review.promptId}`}
                    className="text-lg font-semibold text-violet-600 hover:text-violet-800"
                  >
                    {review.title || "Prompt details"}
                  </a>
                </div>

                <div className="text-right">
                  <p className="font-semibold">Rating: ⭐ {review.rating}/5</p>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-slate-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}