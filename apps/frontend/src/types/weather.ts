import { z } from "zod";

export const weatherForecastSchema = z.object({
  date: z.string(),
  temperatureC: z.number(),
  temperatureF: z.number(),
  summary: z.string().nullable(),
});

export const weatherResponseSchema = z.array(weatherForecastSchema);

export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
