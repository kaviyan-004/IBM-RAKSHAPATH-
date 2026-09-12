import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "default" | "danger" | "warning" | "success" | "brand";
}

const TONE_STYLES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "bg-slate-100 text-slate-600",
  danger: "bg-red-50 text-red-600",
  warning: "bg-amber-50 text-amber-600",
  success: "bg-emerald-50 text-emerald-600",
  brand: "bg-brand-50 text-brand-600",
};

export default function StatCard({ label, value, icon: Icon, tone = "default" }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{label}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${TONE_STYLES[tone]}`}>
          <Icon size={16} />
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
