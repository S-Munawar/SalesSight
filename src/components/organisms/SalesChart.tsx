"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTitle, FilterInput, ChartTypeSelector } from "../molecules";
import { SalesData } from "@/hooks/useSalesData";

type ChartType = "bar" | "line" | "pie";

interface SalesChartProps {
  title?: string;
  subtitle?: string;
  data?: SalesData[];
  loading?: boolean;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
const HIGHLIGHT_COLOR = "#EF4444";
const DEFAULT_COLOR = "#3B82F6";

export default function SalesChart({
  title = "Annual Sales Overview",
  subtitle = "Sales data from 2022-2024",
  data = [],
  loading = false,
}: SalesChartProps) {
  const [salesData, setSalesData] = useState<SalesData[]>(data);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState<string>("");

  useEffect(() => {
    setSalesData(data);
  }, [data]);

  const thresholdValue = threshold ? parseFloat(threshold) : null;

  const getBarColor = (sales: number) => {
    if (thresholdValue && sales > thresholdValue) {
      return HIGHLIGHT_COLOR;
    }
    return DEFAULT_COLOR;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="year"
                tick={{ fill: "#6B7280" }}
                tickLine={{ stroke: "#6B7280" }}
              />
              <YAxis
                tick={{ fill: "#6B7280" }}
                tickLine={{ stroke: "#6B7280" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Sales",
                ]}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar dataKey="sales" name="Sales" radius={[4, 4, 0, 0]}>
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.sales)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="year"
                tick={{ fill: "#6B7280" }}
                tickLine={{ stroke: "#6B7280" }}
              />
              <YAxis
                tick={{ fill: "#6B7280" }}
                tickLine={{ stroke: "#6B7280" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Sales",
                ]}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ payload, percent }) =>
                  `${payload?.year}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="sales"
                nameKey="year"
              >
                {salesData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Sales",
                ]}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <ChartTitle title={title} subtitle={subtitle} />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <ChartTypeSelector selectedType={chartType} onTypeChange={setChartType} />
        <FilterInput
          value={threshold}
          onChange={setThreshold}
          placeholder="e.g., 60000"
        />
      </div>

      {thresholdValue && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Highlighting sales above{" "}
          <span className="font-semibold text-red-500">
            ${thresholdValue.toLocaleString()}
          </span>
        </p>
      )}

      {renderChart()}
    </div>
  );
}
