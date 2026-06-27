"use client";

import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />

        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/10 bg-background/70 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>

          {/* 404 */}
          <h1 className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-8xl font-black text-transparent sm:text-9xl">
            404
          </h1>

          {/* Text */}
          <h2 className="mt-6 text-3xl font-bold">
            Page Not Found
          </h2>

          <p className="mt-4 max-w-md text-default-500">
            The page you are trying to reach doesnot exist,
            may have been removed, or the URL might be
            incorrect.
          </p>

          {/* Decorative line */}
          <div className="my-8 h-px w-full max-w-sm bg-gradient-to-r from-transparent via-default-300 to-transparent" />

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-medium transition hover:bg-default-100"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>

          {/* Small helper text */}
          <p className="mt-8 text-sm text-default-400">
            Lost? Start again from the homepage and explore
            AI prompts.
          </p>
        </div>
      </div>
    </div>
  );
}