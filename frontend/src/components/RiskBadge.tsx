import type { RiskLevel } from "@/types";
import { RISK_LEVEL_META } from "@/utils/riskLevel";

const MORTH_CATEGORY: Record<RiskLevel, string> = {
  critical: "MoRTH Cat-A",
  high: "MoRTH Cat-B",
  moderate: "Cat-C Hazard",
  low: "Safe Corridor",
};

export default function RiskBadge({
  level,
  showCategory = false,
  className = "",
}: {
  level: RiskLevel;
  showCategory?: boolean;
  className?: string;
}) {
  const meta = RISK_LEVEL_META[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-bold tracking-tight shadow-2xs ${
        level === "critical"
          ? "border-red-300 bg-red-50 text-red-700"
          : level === "high"
          ? "border-orange-300 bg-orange-50 text-orange-800"
          : level === "moderate"
          ? "border-amber-300 bg-amber-50 text-amber-800"
          : "border-emerald-300 bg-emerald-50 text-emerald-800"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      <span>{meta.label} Risk</span>
      {showCategory && (
        <span className="border-l border-current/30 pl-1 text-[9.5px] opacity-80 uppercase">
          {MORTH_CATEGORY[level]}
        </span>
      )}
    </span>
  );
}

