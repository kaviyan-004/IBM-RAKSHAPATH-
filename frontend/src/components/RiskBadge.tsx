import type { RiskLevel } from "@/types";
import { RISK_LEVEL_META } from "@/utils/riskLevel";

export default function RiskBadge({ level, className = "" }: { level: RiskLevel; className?: string }) {
  const meta = RISK_LEVEL_META[level];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label} Risk
    </span>
  );
}
