"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function CreatorCharts({ stats }) {
  const monthlyPrompts = stats?.monthlyPrompts || [];
  const categoryDistribution = stats?.categoryDistribution || [];
  const prompts = stats?.prompts || [];

  const copiesData = prompts
    .map((p) => ({
      name: p.title.length > 12 ? p.title.substring(0, 12) + "..." : p.title,
      copies: p.copyCount || 0,
    }))
    .sort((a, b) => b.copies - a.copies)
    .slice(0, 5);

  const COLORS = [
    "#6366f1",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Prompt Growth */}
        <div className="rounded-3xl border p-6 shadow-sm bg-white dark:bg-[#0b0a19] border-slate-200 dark:border-slate-850">
          <h2 className="mb-2 text-xl font-bold">Prompt Growth</h2>
          <p className="mb-6 text-sm text-default-500">
            Monthly prompt publishing activity.
          </p>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPrompts}>
                <defs>
                  <linearGradient
                    id="promptGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/40" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="prompts"
                  stroke="#6366f1"
                  fill="url(#promptGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Copies per Prompt */}
        <div className="rounded-3xl border p-6 shadow-sm bg-white dark:bg-[#0b0a19] border-slate-200 dark:border-slate-850">
          <h2 className="mb-2 text-xl font-bold">Total Copies</h2>
          <p className="mb-6 text-sm text-default-500">
            Performance of top copied prompt templates.
          </p>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={copiesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/40" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="copies" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="rounded-3xl border p-6 shadow-sm bg-white dark:bg-[#0b0a19] border-slate-200 dark:border-slate-850 max-w-2xl">
        <h2 className="mb-2 text-xl font-bold">Category Distribution</h2>
        <p className="mb-6 text-sm text-default-500">
          Breakdown of your prompts by category.
        </p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}