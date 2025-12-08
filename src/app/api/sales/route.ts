import { NextResponse } from "next/server";
import salesData from "@/data/sales.json";

export async function GET() {
  try {
    return NextResponse.json(salesData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    );
  }
}
