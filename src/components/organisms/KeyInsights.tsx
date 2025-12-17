"use client";

import { SalesInsights } from "@/hooks/useSalesData";

interface KeyInsightsProps {
  insights: SalesInsights | null;
  loading?: boolean;
}

interface InsightItemProps {
  type: "positive" | "negative" | "neutral" | "info";
  title: string;
  description: string;
  metric?: string;
}

const InsightItem = ({ type, title, description, metric }: InsightItemProps) => {
  const styles = {
    positive: {
      bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      icon: "text-green-500",
      iconBg: "bg-green-100 dark:bg-green-900/50",
    },
    negative: {
      bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      icon: "text-red-500",
      iconBg: "bg-red-100 dark:bg-red-900/50",
    },
    neutral: {
      bg: "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600",
      icon: "text-gray-500",
      iconBg: "bg-gray-100 dark:bg-gray-700",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      icon: "text-blue-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
    },
  };

  const icons = {
    positive: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    negative: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    neutral: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const style = styles[type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${style.bg}`}>
      <div className={`p-2 rounded-lg ${style.iconBg} ${style.icon}`}>
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
          {metric && (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
              {metric}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default function KeyInsights({ insights, loading }: KeyInsightsProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  const generateInsights = (): InsightItemProps[] => {
    const items: InsightItemProps[] = [];

    // Growth Analysis
    if (insights.avgGrowthRate > 20) {
      items.push({
        type: "positive",
        title: "Strong Growth Momentum",
        description: `Your sales have been growing at an impressive ${insights.avgGrowthRate.toFixed(1)}% year-over-year average. This indicates excellent market traction and effective sales strategies.`,
        metric: `+${insights.avgGrowthRate.toFixed(1)}% YoY`,
      });
    } else if (insights.avgGrowthRate > 10) {
      items.push({
        type: "positive",
        title: "Healthy Growth Rate",
        description: `Sales growing at ${insights.avgGrowthRate.toFixed(1)}% annually. Consider scaling successful strategies to accelerate growth further.`,
        metric: `+${insights.avgGrowthRate.toFixed(1)}% YoY`,
      });
    } else if (insights.avgGrowthRate > 0) {
      items.push({
        type: "neutral",
        title: "Moderate Growth",
        description: `Growth rate of ${insights.avgGrowthRate.toFixed(1)}% is positive but below industry averages. Review pricing and marketing strategies.`,
        metric: `+${insights.avgGrowthRate.toFixed(1)}% YoY`,
      });
    } else {
      items.push({
        type: "negative",
        title: "Sales Decline Detected",
        description: `Sales are declining at ${Math.abs(insights.avgGrowthRate).toFixed(1)}% annually. Immediate attention required to identify root causes.`,
        metric: `${insights.avgGrowthRate.toFixed(1)}% YoY`,
      });
    }

    // Best Performing Period
    items.push({
      type: "info",
      title: `Best Year: ${insights.bestYear.year}`,
      description: `${insights.bestYear.year} achieved the highest sales at $${insights.bestYear.sales.toLocaleString()}. Analyze what worked well during this period to replicate success.`,
      metric: `$${(insights.bestYear.sales / 1000).toFixed(1)}K`,
    });

    // Best Month Analysis
    if (insights.bestMonth) {
      items.push({
        type: "positive",
        title: `Peak Month: ${insights.bestMonth.month}`,
        description: `${insights.bestMonth.month} consistently shows strong performance ($${insights.bestMonth.value.toLocaleString()}). Consider increasing marketing spend and inventory during this period.`,
        metric: `$${insights.bestMonth.value.toLocaleString()}`,
      });
    }

    // Worst Month Analysis
    if (insights.worstMonth) {
      items.push({
        type: "neutral",
        title: `Opportunity Month: ${insights.worstMonth.month}`,
        description: `${insights.worstMonth.month} shows lower sales ($${insights.worstMonth.value.toLocaleString()}). Consider seasonal promotions or targeted campaigns to boost performance.`,
        metric: `$${insights.worstMonth.value.toLocaleString()}`,
      });
    }

    // Revenue Target Analysis
    const projectedNextYear = insights.totalRevenue * (1 + insights.avgGrowthRate / 100);
    items.push({
      type: "info",
      title: "2025 Projection",
      description: `Based on current trends, projected 2025 revenue is $${projectedNextYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}. Set targets 10-15% above projection to drive performance.`,
      metric: `~$${(projectedNextYear / 1000).toFixed(0)}K`,
    });

    return items;
  };

  const insightItems = generateInsights();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
          <svg
            className="w-5 h-5 text-amber-600 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Key Insights & Recommendations
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            AI-powered analysis of your sales performance
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {insightItems.map((item, index) => (
          <InsightItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
