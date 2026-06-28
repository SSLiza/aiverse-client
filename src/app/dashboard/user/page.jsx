import React from "react";
import { getUserSession } from "@/lib/core/session";
import { getMyPrompts } from "@/lib/api/prompts";
import Link from "next/link";
import { Plus, Bookmark, MessageSquare, User, Sparkles, ArrowRight } from "lucide-react";

export default async function UserDashboardHomepage() {
  const user = await getUserSession();
  if (!user) return null;

  // Fetch stats data
  let promptsCount = 0;
  let bookmarksCount = 0;
  let reviewsCount = 0;

  try {
    const prompts = await getMyPrompts(user.id);
    promptsCount = prompts.length;
  } catch (err) {
    console.error("Error loading prompts count for dashboard page:", err);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookmarks/user/${user.email}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const bookmarks = await res.json();
      bookmarksCount = bookmarks.length;
    }
  } catch (err) {
    console.error("Error loading bookmarks count for dashboard page:", err);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/user/${user.email}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const reviews = await res.json();
      reviewsCount = reviews.length;
    }
  } catch (err) {
    console.error("Error loading reviews count for dashboard page:", err);
  }

  const isPremium = user.plan === "premium";

  const stats = [
    {
      label: "My Prompts",
      value: promptsCount,
      description: isPremium ? "Unlimited creation enabled" : `${promptsCount} of 3 prompts used`,
      icon: <Plus className="h-5 w-5 text-violet-500" />,
      color: "from-violet-500/5 to-indigo-500/5 border-violet-500/20",
    },
    {
      label: "Bookmarks",
      value: bookmarksCount,
      description: "Saved prompt templates",
      icon: <Bookmark className="h-5 w-5 text-emerald-500" />,
      color: "from-emerald-500/5 to-teal-500/5 border-emerald-500/20",
    },
    {
      label: "Submitted Reviews",
      value: reviewsCount,
      description: "Ratings & comments shared",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      color: "from-blue-500/5 to-cyan-500/5 border-blue-500/20",
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 sm:p-6">
      {/* Welcome banner */}
      <div className="rounded-3xl border border-violet-500/25 bg-gradient-to-r from-violet-950 via-slate-900 to-black p-6 md:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} className="animate-pulse" />
            Dashboard Overview
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user.name || "Developer"}!
          </h1>
          <p className="text-slate-350 text-sm leading-relaxed">
            Unleash your AI efficiency today. Browse popular templates, bookmarks, manage your prompt listings, and explore creators inside the AIverse dashboard.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`rounded-2xl border bg-gradient-to-br ${stat.color} p-5 flex flex-col justify-between shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-sm">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold text-foreground">{stat.value}</p>
              <p className="text-xs text-default-400 mt-1 font-medium">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Quick Actions */}
        <div className="rounded-2xl border border-default-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/dashboard/user/my-prompts/create-prompt"
              className="flex items-center justify-between p-4 rounded-xl border border-default-250 dark:border-zinc-900 hover:border-violet-500/50 bg-default-50/50 dark:bg-zinc-950/20 transition-all group cursor-pointer"
            >
              <div className="space-y-1">
                <p className="font-bold text-xs uppercase text-slate-400 dark:text-slate-500">Submit New</p>
                <p className="text-sm font-semibold text-foreground">Add Prompt</p>
              </div>
              <ArrowRight size={16} className="text-default-400 group-hover:text-violet-500 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/dashboard/user/saved-prompts"
              className="flex items-center justify-between p-4 rounded-xl border border-default-250 dark:border-zinc-900 hover:border-emerald-500/50 bg-default-50/50 dark:bg-zinc-950/20 transition-all group cursor-pointer"
            >
              <div className="space-y-1">
                <p className="font-bold text-xs uppercase text-slate-400 dark:text-slate-500">Templates</p>
                <p className="text-sm font-semibold text-foreground">Saved Prompts</p>
              </div>
              <ArrowRight size={16} className="text-default-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right: Plan Card */}
        <div className="rounded-2xl border border-default-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 flex flex-col justify-between shadow-sm">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-foreground">Membership Status</h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  isPremium
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}
              >
                {isPremium ? "Premium Pro" : "Free Member"}
              </span>
            </div>
            <p className="text-xs text-default-500 leading-relaxed">
              {isPremium
                ? "You have lifetime Pro benefits enabled. Enjoy unlimited creations, premium prompts view, and advanced bookmarks."
                : "You are on the Free membership plan. You are limited to creating a maximum of 3 prompts. Upgrade to Pro for unlimited usage."}
            </p>
          </div>

          {!isPremium && (
            <div className="mt-5">
              <Link
                href="/payment?redirect=/dashboard/user"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-violet-650 py-3 text-sm font-bold text-white hover:bg-violet-600 transition shadow-sm hover:shadow cursor-pointer"
              >
                Upgrade to Premium ($5)
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}