export default function DashboardLoading() {
  return (
    <div className="space-y-8 p-4 sm:p-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-8 w-72 rounded-xl bg-default-205 bg-slate-200 dark:bg-slate-800" />
        <div className="mt-3 h-4 w-48 rounded-xl bg-default-205 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="h-14 w-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
          >
            <div className="mb-6 space-y-3">
              <div className="h-6 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="h-[360px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
