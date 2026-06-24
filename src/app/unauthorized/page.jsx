"use client";

import Link from "next/link";
import { Lock } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f] px-4">
            <div className="max-w-md w-full text-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161616] p-10 shadow-lg">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                    <Lock className="h-10 w-10 text-red-600" />
                </div>

                {/* Error Code */}
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
                    401
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Unauthorized Access
                </h2>

                {/* Description */}
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                    Sorry, you don't have permission to access this page.
                    Please sign in with the correct account or contact an administrator.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}