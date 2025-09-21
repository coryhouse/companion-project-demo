import { weatherResponseSchema } from "@/types/weather";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:5257/WeatherForecast", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Backend API error! status: ${response.status}`);
    }

    const data = weatherResponseSchema.parse(await response.json());

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch weather from backend:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
