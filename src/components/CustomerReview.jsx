"use client";

import { useEffect, useState } from "react";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/customer-reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
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
          ))}
        </div>

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="text-center text-default-500 py-10">
            No reviews available yet.
          </div>
        )}
      </div>
    </section>
  );
}