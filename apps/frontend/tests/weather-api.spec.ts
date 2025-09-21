import { weatherForecastSchema } from "@/types/weather";
import { test, expect } from "@playwright/test";
import { z } from "zod";

const weatherResponseSchema = z.array(weatherForecastSchema);

test.describe("Weather API Feature", () => {
  test("should successfully fetch weather data from API endpoint", async ({
    request,
  }) => {
    const response = await request.get("/api/weather");

    expect(response.status()).toBe(200);

    const weatherData = await response.json();
    const validatedData = weatherResponseSchema.parse(weatherData);

    expect(validatedData.length).toBe(5);

    for (const forecast of validatedData) {
      const expectedF = Math.round(32 + forecast.temperatureC / 0.5556);
      expect(Math.abs(forecast.temperatureF - expectedF)).toBeLessThan(2);
    }
  });

  test("should display weather data on the homepage", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Pet Insurance Dashboard", level: 1 })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Weather Forecast", level: 2 })
    ).toBeVisible();

    const weatherList = page.getByRole("list", { name: "Weather forecast" });
    await expect(weatherList).toBeVisible();

    const weatherItems = weatherList.getByRole("listitem");
    await expect(weatherItems).toHaveCount(5);

    const firstWeatherItem = weatherItems.first();
    await expect(firstWeatherItem).toContainText("°C");
    await expect(firstWeatherItem).toContainText("°F");
  });

  test("should handle backend service unavailable gracefully", async ({
    request,
  }) => {
    const response = await request.get("/api/weather");

    expect([200, 500].includes(response.status())).toBe(true);

    if (response.status() === 500) {
      const errorData = await response.json();
      expect(errorData).toHaveProperty("error");
      expect(errorData.error).toBe("Failed to fetch weather data");
    } else {
      const weatherData = await response.json();
      expect(() => weatherResponseSchema.parse(weatherData)).not.toThrow();
    }
  });

  test("should return proper content-type headers", async ({ request }) => {
    const response = await request.get("/api/weather");

    expect(response.headers()["content-type"]).toContain("application/json");
  });

  test("should fetch weather data within reasonable time", async ({
    request,
  }) => {
    const startTime = Date.now();
    const response = await request.get("/api/weather");
    const endTime = Date.now();

    expect(endTime - startTime).toBeLessThan(5000);
    expect(response.status()).toBe(200);

    const weatherData = await response.json();
    expect(() => weatherResponseSchema.parse(weatherData)).not.toThrow();
  });
});
