"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalErrorPage({ error, reset }) {
  useEffect(() => {
    // Log the error to console or error tracker
    console.error("Uncaught runtime exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-[#0b0a19] p-8 shadow-xl text-center space-y-6">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500">
          <AlertCircle size={32} />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">
            Something went wrong!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
          {error?.message && (
            <div className="mt-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 p-3 border border-slate-100 dark:border-slate-850 text-left font-mono text-[11px] text-slate-500 dark:text-slate-400 max-h-24 overflow-y-auto break-all leading-normal">
              {error.message}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onPress={reset}
            className="flex-1 rounded-xl bg-violet-650 hover:bg-violet-750 text-white font-bold text-sm h-11"
            startContent={<RotateCcw size={16} />}
          >
            Try Again
          </Button>
          
          <Link href="/" className="flex-1">
            <Button
              variant="bordered"
              className="w-full rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 font-bold text-sm h-11"
              startContent={<Home size={16} />}
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
