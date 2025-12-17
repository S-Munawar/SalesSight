"use client";

import { Heading, InsightCard, TrendDirection } from "@/components/atoms";
import { SalesChart, KeyInsights, MonthlyComparisonChart } from "@/components/organisms";
import { useSalesData } from "@/hooks/useSalesData";

// Icons for insight cards
const RevenueIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GrowthIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const AverageIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Real-time status indicator component
const LiveIndicator = ({ isLive, isPolling, lastUpdated, onToggle, onRefresh }: {
  isLive: boolean;
  isPolling: boolean;
  lastUpdated: Date | null;
  onToggle: () => void;
  onRefresh: () => void;
}) => (
  <div className="flex items-center gap-4 flex-wrap">
    {/* Live status badge */}
    <div className="flex items-center gap-2">
      <span className={`relative flex h-3 w-3 ${isLive && isPolling ? '' : 'opacity-50'}`}>
        {isLive && isPolling && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive && isPolling ? 'bg-green-500' : 'bg-gray-400'}`}></span>
      </span>
      <span className={`text-sm font-medium ${isLive && isPolling ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
        {isLive && isPolling ? 'Live' : 'Paused'}
      </span>
    </div>

    {/* Last updated time */}
    {lastUpdated && (
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Updated: {lastUpdated.toLocaleTimeString()}
      </span>
    )}

    {/* Control buttons */}
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
          isPolling 
            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400' 
            : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
        }`}
      >
        {isPolling ? 'Pause' : 'Resume'}
      </button>
      <button
        onClick={onRefresh}
        className="p-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 transition-colors"
        title="Refresh now"
      >
        <RefreshIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function DashboardPage() {
  const { 
    salesData, 
    loading, 
    insights, 
    comparisonData,
    lastUpdated,
    isLive,
    isPolling,
    togglePolling,
    refetch
  } = useSalesData(5000); // Poll every 5 seconds

  // Determine trend direction based on growth rate
  const getTrendDirection = (rate: number): TrendDirection => {
    if (rate > 5) return "up";
    if (rate < -5) return "down";
    return "neutral";
  };

  // Get the two most recent years for comparison
  const comparisonYears = salesData.length >= 2
    ? [salesData[salesData.length - 2].year, salesData[salesData.length - 1].year]
    : [];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Heading level={1} className="text-gray-900 dark:text-white">
                Sales Dashboard
              </Heading>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Real-time sales performance tracking
              </p>
            </div>
            <LiveIndicator 
              isLive={isLive}
              isPolling={isPolling}
              lastUpdated={lastUpdated}
              onToggle={togglePolling}
              onRefresh={refetch}
            />
          </div>
        </header>

        {/* KPI Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InsightCard
            title="Total Revenue"
            value={loading ? "Loading..." : `$${insights?.totalRevenue.toLocaleString() || 0}`}
            subtitle="2022-2024 combined"
            trend={
              insights
                ? {
                    direction: getTrendDirection(insights.revenueGrowth),
                    value: `${insights.revenueGrowth.toFixed(1)}%`,
                    label: "total growth",
                  }
                : undefined
            }
            icon={<RevenueIcon />}
            variant="default"
          />
          
          <InsightCard
            title="Average Growth"
            value={loading ? "Loading..." : `${insights?.avgGrowthRate.toFixed(1) || 0}%`}
            subtitle="Year over year"
            trend={
              insights
                ? {
                    direction: getTrendDirection(insights.avgGrowthRate),
                    value: insights.avgGrowthRate > 0 ? "Growing" : "Declining",
                  }
                : undefined
            }
            icon={<GrowthIcon />}
            variant="success"
          />
          
          <InsightCard
            title="Best Year"
            value={loading ? "Loading..." : insights?.bestYear.year.toString() || "-"}
            subtitle={insights ? `$${insights.bestYear.sales.toLocaleString()} in sales` : ""}
            icon={<TrophyIcon />}
            variant="info"
          />
          
          <InsightCard
            title="Avg. Yearly Sales"
            value={loading ? "Loading..." : `$${Math.round(insights?.avgYearlySales || 0).toLocaleString()}`}
            subtitle="Per year average"
            trend={
              insights && insights.yearOverYearGrowth.length > 0
                ? {
                    direction: getTrendDirection(
                      insights.yearOverYearGrowth[insights.yearOverYearGrowth.length - 1].growth
                    ),
                    value: `${insights.yearOverYearGrowth[insights.yearOverYearGrowth.length - 1].growth.toFixed(1)}%`,
                    label: "latest YoY",
                  }
                : undefined
            }
            icon={<AverageIcon />}
            variant="warning"
          />
        </section>

        {/* Dashboard Grid */}
        <div className="grid gap-8">
          {/* Main Chart Section */}
          <section className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SalesChart
                title="Annual Sales Overview"
                subtitle="Sales performance data from 2022-2024"
                data={salesData}
                loading={loading}
              />
            </div>
            
            {/* Key Insights Panel */}
            <div className="lg:col-span-1">
              <KeyInsights insights={insights} loading={loading} />
            </div>
          </section>

          {/* Year-over-Year Comparison */}
          {comparisonYears.length >= 2 && (
            <section>
              <MonthlyComparisonChart
                data={comparisonData}
                years={comparisonYears}
                loading={loading}
              />
            </section>
          )}

          {/* Performance Breakdown */}
          <section className="grid md:grid-cols-2 gap-6">
            {/* Growth Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Year-over-Year Growth Breakdown
              </h3>
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {insights?.yearOverYearGrowth.map((item, index) => (
                    <div
                      key={item.year}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.previousYear} → {item.year}
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Sales growth transition
                        </p>
                      </div>
                      <div
                        className={`text-lg font-bold ${
                          item.growth >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.growth >= 0 ? "+" : ""}
                        {item.growth.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Monthly Trends Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Monthly Performance Patterns
              </h3>
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {insights?.monthlyTrends.slice(0, 6).map((month) => {
                    const maxValue = Math.max(
                      ...insights.monthlyTrends.map((m) => m.avgValue)
                    );
                    const percentage = (month.avgValue / maxValue) * 100;
                    
                    return (
                      <div key={month.month} className="flex items-center gap-3">
                        <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                          {month.month}
                        </span>
                        <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-16 text-right">
                          ${Math.round(month.avgValue).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              {insights && insights.monthlyTrends.length > 6 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Showing top 6 months • {insights.monthlyTrends.length - 6} more available
                </p>
              )}
            </div>
          </section>

          {/* Quick Stats Summary */}
          <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">📊 Quick Performance Summary</h3>
              {isLive && isPolling && (
                <span className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  Real-time
                </span>
              )}
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              <div>
                <p className="text-blue-200 text-sm">Best Month</p>
                <p className="text-2xl font-bold">
                  {insights?.bestMonth ? `${insights.bestMonth.month} ${insights.bestMonth.year}` : "-"}
                </p>
                <p className="text-blue-200 text-sm">
                  {insights?.bestMonth ? `$${insights.bestMonth.value.toLocaleString()}` : ""}
                </p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Improvement Area</p>
                <p className="text-2xl font-bold">
                  {insights?.worstMonth ? insights.worstMonth.month : "-"}
                </p>
                <p className="text-blue-200 text-sm">
                  {insights?.worstMonth ? `$${insights.worstMonth.value.toLocaleString()} lowest` : ""}
                </p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Total Growth</p>
                <p className="text-2xl font-bold">
                  {insights ? `${insights.revenueGrowth.toFixed(0)}%` : "-"}
                </p>
                <p className="text-blue-200 text-sm">Since 2022</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Data Points</p>
                <p className="text-2xl font-bold">{salesData.reduce((sum, y) => sum + (y.monthly?.length || 0), 0)}</p>
                <p className="text-blue-200 text-sm">Monthly records</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Years Tracked</p>
                <p className="text-2xl font-bold">{salesData.length}</p>
                <p className="text-blue-200 text-sm">
                  {salesData.length > 0 ? `${salesData[0].year} - ${salesData[salesData.length - 1].year}` : ""}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
