import { NextResponse } from "next/server";
import salesData from "@/data/sales.json";

export async function GET() {
  try {
    return NextResponse.json({
      data: salesData,
      timestamp: new Date().toISOString(),
    }, {
      status: 200,
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
