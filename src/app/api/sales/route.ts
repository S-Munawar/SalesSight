import { NextResponse } from "next/server";
import salesData from "@/data/sales.json";

export async function GET() {
  // Simulate API delay (optional - remove in production)
  // await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(salesData);
}
