import type { ConfidenceLevel } from "@/types";

const STYLES: Record<ConfidenceLevel, string> = {
  High: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  return <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium ${STYLES[level]}`}>{level} confidence</span>;
}
