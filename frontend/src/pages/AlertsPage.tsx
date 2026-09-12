import { useMemo, useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, Info, TrendingUp } from "lucide-react";
import { useAlerts } from "@/hooks/useAlerts";
import Loader from "@/components/Loader";
import { timeAgo } from "@/utils/format";
import type { AlertSeverity } from "@/types";

const FILTERS: { key: AlertSeverity | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "high-risk", label: "High Risk" },
  { key: "emerging-risk", label: "Emerging Risk" },
  { key: "intervention-update", label: "Intervention Updates" },
  { key: "system", label: "System" },
];

const ICONS: Record<AlertSeverity, { icon: typeof Bell; tone: string }> = {
  "high-risk": { icon: AlertTriangle, tone: "bg-red-50 text-red-600" },
  "emerging-risk": { icon: TrendingUp, tone: "bg-orange-50 text-orange-600" },
  "intervention-update": { icon: CheckCircle2, tone: "bg-brand-50 text-brand-600" },
  system: { icon: Info, tone: "bg-slate-100 text-slate-500" },
};

export default function AlertsPage() {
  const { alerts, loading, markAllRead, markRead } = useAlerts();
  const [filter, setFilter] = useState<AlertSeverity | "all">("all");

  const filtered = useMemo(() => (filter === "all" ? alerts : alerts.filter((a) => a.severity === filter)), [alerts, filter]);

  if (loading) return <Loader label="Loading alerts..." />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Alerts & Notifications</h1>
          <p className="text-sm text-slate-500">Stay updated with important alerts and updates.</p>
        </div>
        <button onClick={markAllRead} className="text-xs font-semibold text-brand-600 hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              filter === f.key ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.label} {f.key !== "all" && `(${alerts.filter((a) => a.severity === f.key).length})`}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filtered.map((alert) => {
          const { icon: Icon, tone } = ICONS[alert.severity];
          return (
            <li key={alert.id} className={`flex items-start gap-3 px-4 py-3 ${!alert.read ? "bg-brand-50/40" : ""}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800">{alert.title}</p>
                  <span className="shrink-0 text-xs text-slate-400">{timeAgo(alert.timestamp)}</span>
                </div>
                <p className="text-sm text-slate-500">{alert.detail}</p>
              </div>
              {!alert.read && (
                <button onClick={() => markRead(alert.id)} className="shrink-0 text-xs font-semibold text-brand-600 hover:underline">
                  Mark read
                </button>
              )}
            </li>
          );
        })}
        {filtered.length === 0 && <li className="px-4 py-8 text-center text-sm text-slate-400">No alerts in this category.</li>}
      </ul>
    </div>
  );
}
