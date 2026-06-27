"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminCharts({ stats }) {
  const platformData = [
    {
      metric: "Users",
      value: stats.totalUsers,
    },
    {
      metric: "Prompts",
      value: stats.totalPrompts,
    },
    {
      metric: "Reviews",
      value: stats.totalReviews,
    },
    {
      metric: "Reports",
      value: stats.totalReports,
    },
    {
      metric: "Copies",
      value: stats.totalCopies,
    },
  ];

  const moderationData = [
    {
      name: "Reviews",
      value: stats.totalReviews,
    },
    {
      name: "Reports",
      value: stats.totalReports,
    },
  ];

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Platform Overview */}
      <div className="rounded-3xl border p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold">
          Platform Overview
        </h2>

        <p className="mb-6 text-default-500">
          Overall activity across the platform.
        </p>

        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={platformData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="metric" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                fill="#6366f1"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Community Health */}
      <div className="rounded-3xl border p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold">
          Community Health
        </h2>

        <p className="mb-6 text-default-500">
          Reviews compared with reported content.
        </p>

        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={moderationData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                innerRadius={70}
                label
              >
                {moderationData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}