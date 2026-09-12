import type { RiskLevel } from "@/types";

export const RISK_LEVEL_META: Record<RiskLevel, { label: string; badge: string; dot: string; hex: string }> = {
  low: { label: "Low", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", hex: "#10b981" },
  moderate: { label: "Moderate", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-500", hex: "#f59e0b" },
  high: { label: "High", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-500", hex: "#f97316" },
  critical: { label: "Critical", badge: "bg-red-100 text-red-700", dot: "bg-red-500", hex: "#ef4444" },
};

export function scoreToLevel(score: number): RiskLevel {
  if (score >= 76) return "critical";
  if (score >= 51) return "high";
  if (score >= 26) return "moderate";
  return "low";
}
