import {
    Users,
    FileText,
    MessageSquare,
    Flag,
    TrendingUp,
    Sparkles,
} from "lucide-react";

async function getStats() {
    const res = await fetch(
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
            title: "Reports",
            value: stats.totalReports,
            icon: Flag,
        },
    ];

    return (
        <div className="space-y-8 p-6">
            {/* Welcome Banner */}
            <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white">
                <h1 className="text-4xl font-bold">
                    Welcome Back, Admin 👋
                </h1>

                <p className="mt-3 max-w-2xl text-white/80">
                    Monitor platform activity, manage users,
                    review reports, and keep AIVerse growing.
                </p>
            </section>

            {/* Statistics */}
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {statsData.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-3xl border bg-background p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-default-500">
                                    {item.title}
                                </p>

                                <h2 className="mt-2 text-4xl font-bold">
                                    {item.value}
                                </h2>
                            </div>

                            <div className="rounded-2xl bg-primary/10 p-4">
                                <item.icon className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Quick Actions */}
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border p-6">
                    <Users className="mb-4 h-8 w-8 text-primary" />

                    <h3 className="text-xl font-semibold">
                        User Management
                    </h3>

                    <p className="mt-2 text-default-500">
                        Manage users, roles, and account status.
                    </p>
                </div>

                <div className="rounded-3xl border p-6">
                    <Flag className="mb-4 h-8 w-8 text-red-500" />

                    <h3 className="text-xl font-semibold">
                        Review Reports
                    </h3>

                    <p className="mt-2 text-default-500">
                        Check reported prompts and moderate content.
                    </p>
                </div>

                <div className="rounded-3xl border p-6">
                    <TrendingUp className="mb-4 h-8 w-8 text-green-500" />

                    <h3 className="text-xl font-semibold">
                        Platform Growth
                    </h3>

                    <p className="mt-2 text-default-500">
                        Track prompt engagement and platform usage.
                    </p>
                </div>
            </section>

            {/* Announcement Panel */}
            <section className="rounded-3xl border p-8">
                <div className="flex items-center gap-3">
                    <Sparkles className="text-yellow-500" />

                    <h2 className="text-2xl font-bold">
                        Todays Highlights
                    </h2>
                </div>

                <ul className="mt-6 space-y-3 text-default-600">
                    <li>• 10 new prompts were submitted today.</li>
                    <li>• 3 prompts have been reported.</li>
                    <li>• 15 new users joined this week.</li>
                    <li>• Most used AI tool: ChatGPT.</li>
                </ul>
            </section>
        </div>
    );
}