import { useMemo, useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, Info, TrendingUp } from "lucide-react";
import { useAlerts } from "@/hooks/useAlerts";
import Loader from "@/components/Loader";
import { timeAgo } from "@/utils/format";
import { useLanguage } from "@/context/LanguageContext";
import type { AlertSeverity } from "@/types";

const FILTERS: { key: AlertSeverity | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "high-risk", label: "High Risk" },
  { key: "emerging-risk", label: "Emerging Risk" },
  { key: "intervention-update", label: "Intervention Updates" },
  { key: "system", label: "System" },
];

const SEVERITY_TAGS: Record<AlertSeverity, { label: string; badgeClass: string; code: string }> = {
  "high-risk": {
    label: "CRITICAL ALERT",
    badgeClass: "bg-red-700 text-white border-red-800",
    code: "MoRTH/CRIT",
  },
  "emerging-risk": {
    label: "TRAFFIC CAUTION",
    badgeClass: "bg-amber-600 text-white border-amber-700",
    code: "DRSC/WARN",
  },
  "intervention-update": {
    label: "CIVIL WORKS",
    badgeClass: "bg-[#0B3B60] text-white border-[#082847]",
    code: "PWD/WORK",
  },
  system: {
    label: "OFFICIAL NOTICE",
    badgeClass: "bg-slate-700 text-white border-slate-800",
    code: "GOI/CIRC",
  },
};

export default function AlertsPage() {
  const { t } = useLanguage();
  const { alerts, loading, markAllRead, markRead } = useAlerts();
  const [filter, setFilter] = useState<AlertSeverity | "all">("all");

  const filtered = useMemo(() => (filter === "all" ? alerts : alerts.filter((a) => a.severity === filter)), [alerts, filter]);

  if (loading) return <Loader label="Loading alerts..." />;

  return (
    <div className="space-y-4 select-none">
      {/* Official Government Advisory Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                {t.alertsHeaderTitle}
              </h1>
              <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-900 uppercase">
                Official MoRTH Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.alertsHeaderDesc}
            </p>
          </div>
          <button
            onClick={markAllRead}
            className="rounded border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#0B3B60] hover:bg-slate-100 transition"
          >
            {t.markAllAsReadBtn}
          </button>
        </div>

        {/* Filter Pills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded px-3 py-1 text-xs font-semibold transition ${
                filter === f.key
                  ? "bg-[#0B3B60] text-white shadow-2xs"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {f.label} {f.key !== "all" && `(${alerts.filter((a) => a.severity === f.key).length})`}
            </button>
          ))}
        </div>
      </div>

      <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        {filtered.map((alert) => {
          const tag = SEVERITY_TAGS[alert.severity];
          return (
            <li
              key={alert.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 transition hover:bg-slate-50/80 ${
                !alert.read ? "bg-[#f4f8fd] border-l-4 border-l-[#1963bd]" : ""
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {/* Official Government Dispatch Tag (No AI pastel squircle!) */}
                <div className="shrink-0 flex flex-col items-center">
                  <span
                    className={`rounded-sm border px-2 py-0.5 text-[9.5px] font-black tracking-wider uppercase shadow-2xs ${tag.badgeClass}`}
                  >
                    {tag.label}
                  </span>
                  <span className="mt-1 font-mono text-[9px] font-semibold text-slate-400">
                    {tag.code}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {alert.title}
                    </p>
                    {!alert.read && (
                      <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9.5px] font-bold text-blue-800">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{alert.detail}</p>
                  <p className="mt-1.5 text-[10.5px] text-slate-400 font-mono">
                    Time: {timeAgo(alert.timestamp)} • Ref: MoRTH-CBE-2026
                  </p>
                </div>
              </div>

              {!alert.read && (
                <button
                  onClick={() => markRead(alert.id)}
                  className="self-end sm:self-center shrink-0 rounded border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-bold text-[#0B3B60] hover:bg-slate-100 transition shadow-2xs"
                >
                  Mark read
                </button>
              )}
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-4 py-12 text-center text-xs text-slate-400">
            No official alerts found in this category.
          </li>
        )}
      </ul>
    </div>
  );
}
