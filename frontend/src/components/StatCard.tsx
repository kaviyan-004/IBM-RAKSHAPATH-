import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "default" | "danger" | "warning" | "success" | "brand";
}

const TONE_STYLES: Record<NonNullable<StatCardProps["tone"]>, { iconColor: string; topBorder: string; badge: string }> = {
  default: { iconColor: "text-slate-600", topBorder: "border-t-slate-400", badge: "DRSC" },
  danger: { iconColor: "text-red-700", topBorder: "border-t-red-600", badge: "HIGH RISK" },
  warning: { iconColor: "text-amber-700", topBorder: "border-t-amber-500", badge: "CAUTION" },
  success: { iconColor: "text-emerald-700", topBorder: "border-t-emerald-600", badge: "ALLOCATED" },
  brand: { iconColor: "text-[#0B3B60]", topBorder: "border-t-[#0B3B60]", badge: "TOTAL" },
};

export default function StatCard({ label, value, icon: Icon, tone = "default" }: StatCardProps) {
  const styles = TONE_STYLES[tone];
  return (
    <div className={`relative rounded-lg border border-slate-200 border-t-4 ${styles.topBorder} bg-white p-4 shadow-2xs select-none flex flex-col justify-between`}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-tight">{label}</span>
        <Icon size={16} className={`shrink-0 ${styles.iconColor}`} />
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {styles.badge}
        </span>
      </div>
    </div>
  );
}

