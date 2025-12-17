import { useCallback, useMemo, useState, useEffect, useRef } from "react";

// Types for sales data
export interface MonthlyData {
  month: string;
  value: number;
}

export interface SalesData {
  year: number;
  sales: number;
  monthly?: MonthlyData[];
  topProduct?: string;
  topRegion?: string;
  isPartialYear?: boolean;
  [key: string]: string | number | boolean | MonthlyData[] | undefined;
}

export interface ApiResponse {
  data: SalesData[];
  timestamp: string;
  isLive: boolean;
}

export interface SalesInsights {
  totalRevenue: number;
  avgYearlySales: number;
  avgGrowthRate: number;
  bestYear: { year: number; sales: number };
  worstYear: { year: number; sales: number };
  bestMonth: { month: string; value: number; year: number } | null;
  worstMonth: { month: string; value: number; year: number } | null;
  yearOverYearGrowth: { year: number; growth: number; previousYear: number }[];
  monthlyTrends: { month: string; avgValue: number }[];
  revenueGrowth: number;
}

// Calculate insights from sales data
function calculateInsights(data: SalesData[]): SalesInsights | null {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  // Total and average
  const totalRevenue = sortedData.reduce((sum, item) => sum + item.sales, 0);
  const avgYearlySales = totalRevenue / sortedData.length;

  // Best and worst years
  const bestYear = sortedData.reduce(
    (best, item) => (item.sales > best.sales ? { year: item.year, sales: item.sales } : best),
    { year: sortedData[0].year, sales: sortedData[0].sales }
  );
  const worstYear = sortedData.reduce(
    (worst, item) => (item.sales < worst.sales ? { year: item.year, sales: item.sales } : worst),
    { year: sortedData[0].year, sales: sortedData[0].sales }
  );

  // Year over year growth
  const yearOverYearGrowth = sortedData.slice(1).map((item, index) => {
    const previousYear = sortedData[index];
    const growth = ((item.sales - previousYear.sales) / previousYear.sales) * 100;
    return { year: item.year, growth, previousYear: previousYear.year };
  });

  // Average growth rate
  const avgGrowthRate =
    yearOverYearGrowth.length > 0
      ? yearOverYearGrowth.reduce((sum, item) => sum + item.growth, 0) / yearOverYearGrowth.length
      : 0;

  // Revenue growth (first to last year)
  const revenueGrowth =
    sortedData.length > 1
      ? ((sortedData[sortedData.length - 1].sales - sortedData[0].sales) / sortedData[0].sales) * 100
      : 0;

  // Monthly analysis
  let bestMonth: { month: string; value: number; year: number } | null = null;
  let worstMonth: { month: string; value: number; year: number } | null = null;
  const monthlyTotals: Record<string, { total: number; count: number }> = {};

  sortedData.forEach((yearData) => {
    if (yearData.monthly) {
      yearData.monthly.forEach((monthData) => {
        if (!monthlyTotals[monthData.month]) {
          monthlyTotals[monthData.month] = { total: 0, count: 0 };
        }
        monthlyTotals[monthData.month].total += monthData.value;
        monthlyTotals[monthData.month].count += 1;

        // Track best/worst month
        if (!bestMonth || monthData.value > bestMonth.value) {
          bestMonth = { month: monthData.month, value: monthData.value, year: yearData.year };
        }
        if (!worstMonth || monthData.value < worstMonth.value) {
          worstMonth = { month: monthData.month, value: monthData.value, year: yearData.year };
        }
      });
    }
  });

  // Monthly trends (average per month)
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyTrends = monthOrder
    .filter((month) => monthlyTotals[month])
    .map((month) => ({
      month,
      avgValue: monthlyTotals[month].total / monthlyTotals[month].count,
    }));

  return {
    totalRevenue,
    avgYearlySales,
    avgGrowthRate,
    bestYear,
    worstYear,
    bestMonth,
    worstMonth,
    yearOverYearGrowth,
    monthlyTrends,
    revenueGrowth,
  };
}

// Hook for fetching sales data - real-time API integration
export function useSalesData(pollInterval: number = 5000) {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isPolling, setIsPolling] = useState(true);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch data function - now uses API
  const fetchSalesData = useCallback(async (): Promise<SalesData[]> => {
    const response = await fetch('/api/sales', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }
    
    const result: ApiResponse = await response.json();
    setLastUpdated(new Date(result.timestamp));
    setIsLive(result.isLive);
    return result.data;
  }, []);

  // Load data function
  const loadData = useCallback(async (showLoading: boolean = false) => {
    try {
      if (showLoading) setLoading(true);
      const data = await fetchSalesData();
      setSalesData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [fetchSalesData]);

  // Initial load
  useEffect(() => {
    loadData(true);
  }, [loadData]);

  // Polling for real-time updates
  useEffect(() => {
    if (!isPolling || pollInterval <= 0) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      return;
    }

    pollIntervalRef.current = setInterval(() => {
      loadData(false); // Silent refresh without loading state
    }, pollInterval);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [isPolling, pollInterval, loadData]);

  // Toggle polling
  const togglePolling = useCallback(() => {
    setIsPolling(prev => !prev);
  }, []);

  // Manual refresh
  const refetch = useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  // Calculate insights when data changes
  const insights = useMemo(() => calculateInsights(salesData), [salesData]);

  // Get formatted monthly data for charts
  const monthlyChartData = useMemo(() => {
    if (salesData.length === 0) return [];
    
    const latestYear = salesData[salesData.length - 1];
    if (!latestYear.monthly) return [];
    
    return latestYear.monthly.map((m) => ({
      name: m.month,
      sales: m.value,
      year: latestYear.year,
    }));
  }, [salesData]);

  // Comparison data for YoY analysis
  const comparisonData = useMemo(() => {
    if (salesData.length < 2) return [];
    
    const lastTwo = salesData.slice(-2);
    const [previous, current] = lastTwo;
    
    if (!previous.monthly || !current.monthly) return [];
    
    return current.monthly.map((currentMonth, idx) => ({
      month: currentMonth.month,
      [current.year]: currentMonth.value,
      [previous.year]: previous.monthly?.[idx]?.value || 0,
    }));
  }, [salesData]);

  return {
    salesData,
    loading,
    error,
    insights,
    monthlyChartData,
    comparisonData,
    lastUpdated,
    isLive,
    isPolling,
    togglePolling,
    refetch,
  };
}

