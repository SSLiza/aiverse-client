import { getUserSession } from "@/lib/core/session";
import { getMyPrompts } from "@/lib/api/prompts";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserProfilePage() {
  const sessionUser = await getUserSession();
  if (!sessionUser) {
    return redirect("/auth/signin?redirect=/dashboard/user/profile");
  }

  // Fetch count of prompts created by this user
  let totalPrompts = 0;
  try {
    const myPrompts = await getMyPrompts(sessionUser.id);
    totalPrompts = myPrompts.length;
  } catch (error) {
    console.error("Failed to fetch user prompts for profile:", error);
  }

  const isPremium = sessionUser.plan === "premium";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          My Account Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your account plan, credentials, and settings.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-850">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {sessionUser.image ? (
              <img
                src={sessionUser.image}
                alt={sessionUser.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              sessionUser.name?.[0]?.toUpperCase() || "U"
            )}
          </div>

          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {sessionUser.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {sessionUser.email}
            </p>
            <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
              <span className="rounded-full bg-violet-100 dark:bg-violet-900/30 px-3 py-1 text-xs text-violet-600 dark:text-violet-400 font-semibold uppercase tracking-wider">
                Role: {sessionUser.role || "User"}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  isPremium
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}
              >
                Plan: {isPremium ? "Premium Pro" : "Free Member"}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="grid md:grid-cols-2 gap-6 pt-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-400">Total Created Prompts</h3>
              <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
                {totalPrompts}
              </p>
              <p className="mt-1.5 text-xs text-slate-500">
                {!isPremium ? `${totalPrompts} of 3 templates used` : "Unlimited prompt creation enabled"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-400">Registered On</h3>
              <p className="mt-1 text-base font-medium text-slate-900 dark:text-white">
                {sessionUser.createdAt ? new Date(sessionUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) : "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {isPremium ? "💎 AIverse Pro Active" : "🚀 Upgrade to Pro"}
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isPremium
                  ? "Thank you for supporting AIverse! You have lifetime access to all premium templates, unlimited prompt creations, and copy features."
                  : "Unlock private prompts, double your creation limits, and get priority support. Join developers and marketers using AIverse Pro for a one-time fee."}
              </p>
            </div>

            {!isPremium && (
              <div className="mt-4">
                <Link
                  href="/payment"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-semibold text-sm shadow-md transition-all duration-200"
                >
                  Upgrade to Premium ($5)
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
