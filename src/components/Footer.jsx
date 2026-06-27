"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-8 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              AI<span className="text-violet-500">Verse</span>
            </h2>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Discover, create and share premium AI prompts for ChatGPT,
              Gemini, Claude, Midjourney and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-600 hover:text-violet-500 dark:text-slate-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/prompts" className="text-slate-600 hover:text-violet-500 dark:text-slate-400">
                  All Prompts
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="text-slate-600 hover:text-violet-500 dark:text-slate-400">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
              Resources
            </h3>

            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-600 hover:text-violet-500 dark:text-slate-400">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="text-slate-600 hover:text-violet-500 dark:text-slate-400">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="#" className="text-slate-600 hover:text-violet-500 dark:text-slate-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
              Newsletter
            </h3>

            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-l-lg border border-slate-300 bg-transparent px-4 py-3 outline-none dark:border-slate-700"
              />

              <button className="rounded-r-lg bg-violet-600 px-5 text-white hover:bg-violet-700">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 md:flex-row">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} PromptHub. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-slate-600 transition hover:text-violet-500 dark:text-slate-400"
            >
              GitHub
            </Link>

            <Link
              href="#"
              className="text-slate-600 transition hover:text-violet-500 dark:text-slate-400"
            >
              LinkedIn
            </Link>

            <Link
              href="#"
              className="text-slate-600 transition hover:text-violet-500 dark:text-slate-400"
            >
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}