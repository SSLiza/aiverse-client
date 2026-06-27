"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
  // Fallback to empty array if categoryDistribution doesn't exist yet
  const categoryDistribution = stats?.categoryDistribution || [];

  const COLORS = [
    "#6366f1",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Prompt Growth */}
      <div className="rounded-3xl border p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold">Prompt Growth</h2>
        <p className="mb-6 text-default-500">
          Monthly prompt publishing activity.
        </p>
        <div className="h-[360px]">
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
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

      {/* Category Distribution */}
      <div className="rounded-3xl border p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold">Category Distribution</h2>
        <p className="mb-6 text-default-500">
          Breakdown of your prompts by category.
        </p>
        <div className="h-[360px]">
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
                outerRadius={100}
                fill="#8884d8"
                dataKey="value" // Maps to the numerical amount in your data
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