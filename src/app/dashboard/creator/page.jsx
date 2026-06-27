"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import CreatorCharts from "@/components/dashboard/CreatorCharts";
import { getStats } from "@/lib/actions/stats";

import {
  Users,
  FileText,
  MessageSquare,
  Flag,
} from "lucide-react";
import AdminCharts from "@/components/dashboard/AdminCharts";
import Loading from "@/app/loading";
import LoadingPage from "@/components/LoadingPage";

export default function CreatorHomePage() {
  const { data: session, isPending } = useSession();

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
        
  console.log(data);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);
  
  if (isPending || loadingStats) {
    return (
    <LoadingPage message="Loading your dashboard..." />
    );
  }

  const statsData = [
    {
      title: "Total Prompts",
      value: stats?.totalPrompts || 0,
      icon: FileText,
    },
    {
      title: "Total Copies",
      value: stats?.totalCopies || 0,
      icon: Flag,
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews || 0,
      icon: MessageSquare,
    },
    {
      title: "Total Bookmarks",
      value: stats?.totalBookmarks || 0,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Creator Analytics Dashboard
        </h1>

        <p className="mt-1 text-default-500">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border bg-content1 p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h3>
                </div>

                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      {stats && <AdminCharts stats={stats} />}
    </div>
  );
}