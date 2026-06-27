import {
    Users,
    FileText,
    MessageSquare,
    Flag,
    Sparkles,
} from "lucide-react";
import AdminCharts from "@/components/dashboard/AdminCharts";
import { serverFetch } from "@/lib/server-fetch";

async function getStats() {
    const res = await serverFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stats`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}

export default async function AdminDashboardHomePage() {
    const stats = await getStats();

    const statsData = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: Users,
        },
        {
            title: "Total Prompts",
            value: stats.totalPrompts,
            icon: FileText,
        },
        {
            title: "Reviews",
            value: stats.totalReviews,
            icon: MessageSquare,
        },
        {
            title: "Total Copies",
            value: stats.totalCopies,
            icon: Flag,
        },
    ];

    return (
        <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
                {/* Welcome Banner */}
                <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 sm:p-8 lg:p-10 text-white">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Welcome Back, Admin 👋
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80">
                        Monitor platform activity, manage users, review reports,
                        and keep AIVerse growing.
                    </p>
                </section>

                {/* Statistics Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                    {statsData.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border bg-background p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-sm text-default-500 truncate">
                                        {item.title}
                                    </p>

                                    <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
                                        {item.value}
                                    </h2>
                                </div>

                                <div className="flex-shrink-0 rounded-2xl bg-primary/10 p-3 sm:p-4">
                                    <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Highlights */}
                <section className="rounded-3xl border p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <Sparkles className="text-yellow-500 h-6 w-6" />

                        <h2 className="text-xl sm:text-2xl font-bold">
                            Todays Highlights
                        </h2>
                    </div>

                    <p className="mt-4 text-sm sm:text-base text-default-500">
                        View important platform activities and recent trends.
                    </p>
                </section>

            {/* Charts */}
            <section className="w-full overflow-hidden rounded-3xl border p-2 sm:p-4">
                <AdminCharts stats={stats} />
            </section>
        </div>
    );
}