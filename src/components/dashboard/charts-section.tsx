"use client";

import { mockFinancialData } from "@/lib/mock-data";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatDay(day: string) {
  return day.slice(5);
}

export function ChartsSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? "#e2e8f0" : "#334155";
  const gridColor = isDark
    ? "rgba(148, 163, 184, 0.2)"
    : "rgba(100, 116, 139, 0.2)";
  const tooltipStyle = {
    backgroundColor: isDark
      ? "rgba(2, 6, 23, 0.8)"
      : "rgba(255, 255, 255, 0.85)",
    border: isDark
      ? "1px solid rgba(255,255,255,0.15)"
      : "1px solid rgba(15,23,42,0.12)",
    borderRadius: "12px",
    backdropFilter: "blur(8px)",
  };

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <article className="rounded-2xl border border-glass-border bg-glass/60 p-5 backdrop-blur-md shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Kategoriye Göre Harcama
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={mockFinancialData.charts.expenseByCategory}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={3}
              >
                {mockFinancialData.charts.expenseByCategory.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-2xl border border-glass-border bg-glass/60 p-5 backdrop-blur-md shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Günlük Nakit Akışı
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <BarChart data={mockFinancialData.charts.dailyCashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="day"
                tickFormatter={formatDay}
                stroke={axisColor}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar
                dataKey="income"
                fill="#10b981"
                name="Gelir"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                fill="#ef4444"
                name="Gider"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
