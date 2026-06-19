'use client';

import { useSession } from '@/lib/auth-client';

const CreatorHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Creator Analytics Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="text-sm text-muted-foreground">
            Total Prompts
          </h3>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-sm text-muted-foreground">
            Total Copies
          </h3>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h3 className="text-sm text-muted-foreground">
            Total Bookmarks
          </h3>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="rounded-xl border p-6">
        Analytics Chart Here
      </div>
    </div>
  );
};

export default CreatorHomePage;