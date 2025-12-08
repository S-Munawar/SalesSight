import { useCallback } from "react";
import { SalesData } from "../components/organisms/SalesChart";

// Hook for fetching sales data - ready for API integration
export function useSalesData() {
  // Currently returns mock data, but can be easily switched to API fetch
  const fetchSalesData = useCallback(async (): Promise<SalesData[]> => {
    // For API integration, uncomment below:
    // const response = await fetch('/api/sales');
    // if (!response.ok) throw new Error('Failed to fetch sales data');
    // return response.json();

    // Mock data import (current implementation)
    const data = await import("@/data/sales.json");
    return data.default as SalesData[];
  }, []);

  return { fetchSalesData };
}
