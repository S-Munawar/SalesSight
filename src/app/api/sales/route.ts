import { NextResponse } from "next/server";
import baseSalesData from "@/data/sales.json";

// Simulate real-time data variations
function getRealtimeSalesData() {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();
  
  // Deep clone the base data
  const data = JSON.parse(JSON.stringify(baseSalesData));
  
  // Add current year data if not present
  const hasCurrentYear = data.some((d: { year: number }) => d.year === currentYear);
  
  if (!hasCurrentYear && currentYear > 2024) {
    // Generate current year data based on growth trends
    const lastYear = data[data.length - 1];
    const growthRate = 1.15 + (Math.random() * 0.1 - 0.05); // 10-20% growth with variance
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthly = monthNames.map((month, idx) => {
      const baseValue = lastYear.monthly[idx].value * growthRate;
      // Add real-time variance for current and recent months
      const variance = idx <= currentMonth ? (Math.random() * 0.1 - 0.05) : 0;
      return {
        month,
        value: Math.round(baseValue * (1 + variance))
      };
    });
    
    // Only include data up to current month
    const yearToDateMonthly = monthly.slice(0, currentMonth + 1);
    const yearToDateSales = yearToDateMonthly.reduce((sum, m) => sum + m.value, 0);
    
    data.push({
      year: currentYear,
      sales: yearToDateSales,
      monthly: yearToDateMonthly,
      topProduct: "Widget Ultra Pro",
      topRegion: "West",
      isPartialYear: true
    });
  }
  
  // Add small real-time variance to the latest data point to simulate live updates
  const latestYear = data[data.length - 1];
  if (latestYear.monthly && latestYear.monthly.length > 0) {
    const lastMonthIdx = latestYear.monthly.length - 1;
    const variance = Math.round((Math.random() * 200) - 100); // ±$100 variance
    latestYear.monthly[lastMonthIdx].value += variance;
    latestYear.sales += variance;
  }
  
  return data;
}

export async function GET() {
  try {
    const realtimeData = getRealtimeSalesData();
    
    return NextResponse.json({
      data: realtimeData,
      timestamp: new Date().toISOString(),
      isLive: true
    }, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    );
  }
}

// POST endpoint for adding new sales data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, this would save to a database
    // For now, we just validate and return success
    if (!body.year || !body.sales) {
      return NextResponse.json(
        { error: "Year and sales are required" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Sales data received",
      data: body,
      timestamp: new Date().toISOString()
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process sales data" },
      { status: 500 }
    );
  }
}
