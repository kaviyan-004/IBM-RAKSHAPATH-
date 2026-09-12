import type { RiskForecast } from "@/types";
import { mockRiskScores } from "./risks";

function buildSeries(current: number, trend: "increasing" | "decreasing" | "stable") {
  const startYear = 2023;
  const step = trend === "increasing" ? 4.2 : trend === "decreasing" ? -3.6 : 0.4;
  const base = current - step * 3;
  return Array.from({ length: 5 }).map((_, i) => {
    const risk = Math.max(5, Math.min(99, Math.round(base + step * i)));
    const spread = 4 + i * 1.5;
    return {
      year: startYear + i,
      risk,
      lowerBound: Math.max(0, Math.round(risk - spread)),
      upperBound: Math.min(100, Math.round(risk + spread)),
    };
  });
}

export const mockForecasts: Record<string, RiskForecast> = Object.fromEntries(
  mockRiskScores.map((r) => {
    const series = buildSeries(r.score, r.trend);
    const forecast: RiskForecast = {
      locationId: r.locationId,
      currentRisk: r.score,
      horizonYears: 3,
      trend: r.trend,
      isEmergingHotspot: r.isEmerging,
      confidence: r.confidence,
      series,
    };
    return [r.locationId, forecast];
  })
);

export function getForecast(locationId: string): RiskForecast | undefined {
  return mockForecasts[locationId];
}
