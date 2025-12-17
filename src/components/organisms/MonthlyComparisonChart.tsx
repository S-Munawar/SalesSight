"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyComparisonChartProps {
  data: Record<string, string | number>[];
  years: number[];
  loading?: boolean;
}

const COLORS = ["#94A3B8", "#3B82F6"];

export default function MonthlyComparisonChart({
  data,
  years,
  loading,
}: MonthlyComparisonChartProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0 || years.length < 2) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Year-over-Year Comparison
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Monthly sales comparison between {years[0]} and {years[1]}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={{ stroke: "#6B7280" }}
          />
          <YAxis
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={{ stroke: "#6B7280" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${value.toLocaleString()}`,
              name,
            ]}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Bar
            dataKey={years[0].toString()}
            name={years[0].toString()}
            fill={COLORS[0]}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey={years[1].toString()}
            name={years[1].toString()}
            fill={COLORS[1]}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Growth Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {years[0]} Total
            </p>
            <p className="text-lg font-semibold text-gray-400">
              ${data
                .reduce((sum, item) => sum + (Number(item[years[0]]) || 0), 0)
                .toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {years[1]} Total
            </p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              ${data
                .reduce((sum, item) => sum + (Number(item[years[1]]) || 0), 0)
                .toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              +
              {(
                ((data.reduce(
                  (sum, item) => sum + (Number(item[years[1]]) || 0),
                  0
                ) -
                  data.reduce(
                    (sum, item) => sum + (Number(item[years[0]]) || 0),
                    0
                  )) /
                  data.reduce(
                    (sum, item) => sum + (Number(item[years[0]]) || 0),
                    0
                  )) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
