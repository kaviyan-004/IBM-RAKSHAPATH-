import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, MapPin, ShieldAlert, TrendingUp, Wallet } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { fetchDistrictSummary } from "@/api/dashboard";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import Loader from "@/components/Loader";
import RiskMap from "@/map/RiskMap";
import { formatInrLakh, formatDate } from "@/utils/format";

/** Shared by the Government ("/") and Technical ("/dashboard") sector routes. */
export default function DashboardPage() {
  const { sector } = useAuth();
  const { t } = useLanguage();
  const { data: summary, loading } = useAsync(fetchDistrictSummary, []);
  const { locations, loading: locationsLoading } = useLocationsWithRisk();

  const isTechnical = sector === "technical";
  const mapHref = isTechnical ? "/gis-risk-map" : "/risk-map";
  const locationHrefPrefix = isTechnical ? "/location-diagnostics" : "/locations";

  if (loading || !summary) return <Loader label="Loading district overview..." />;

  const pageTitle = isTechnical ? t.navDiagnostics : t.navDashboard;
  const wingBadge = isTechnical ? t.wingTech : t.wingAdmin;

  return (
    <div className="space-y-5 select-none">
      {/* Official Government Executive Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                  {pageTitle}
                </h1>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-900 uppercase">
                  {wingBadge}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.ministryName} • {t.jurisdictionLabel}: <strong>{summary.district} District, Tamil Nadu</strong>
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span>{t.lastAuditSync}: <strong>{formatDate(summary.lastUpdated)}</strong></span>
            <p className="text-emerald-700 font-semibold">● {t.liveTelemetry}</p>
          </div>
        </div>
      </div>

      {/* Aligned 5-Metric Government KPI Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label={t.totalLocationsAnalyzed} value={summary.totalLocationsAnalyzed.toLocaleString("en-IN")} icon={MapPin} tone="brand" />
        <StatCard label={t.highRiskLocations} value={String(summary.highRiskLocations)} icon={ShieldAlert} tone="danger" />
        <StatCard label={t.emergingRiskLocations} value={String(summary.emergingRiskLocations)} icon={TrendingUp} tone="warning" />
        <StatCard label={t.interventionsPending} value={String(summary.interventionsPending)} icon={AlertTriangle} tone="default" />
        <StatCard label={t.currentSafetyBudget} value={formatInrLakh(summary.currentSafetyBudget)} icon={Wallet} tone="success" />
      </div>

      {/* Balanced 2-Column Section: District Risk Map & Top Priority Locations */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-stretch">
        {/* Left: GIS Map Card (8 Cols) */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between lg:col-span-8">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.districtRiskOverview}</h2>
              <p className="text-[11px] text-slate-500">Coimbatore District Road Network & Crash Clusters</p>
            </div>
            <Link to={mapHref} className="inline-flex items-center gap-1 text-xs font-bold text-[#1963bd] hover:underline">
              {t.openFullMap} <ArrowRight size={13} />
            </Link>
          </div>
          <div className="h-[360px] rounded-lg overflow-hidden border border-slate-200">
            {locationsLoading ? <Loader label="Loading map..." /> : <RiskMap locations={locations} onSelect={() => {}} />}
          </div>
        </div>

        {/* Right: Priority Locations Card (4 Cols) */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between lg:col-span-4">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.topPriorityLocations}</h2>
              <p className="text-[11px] text-slate-500">Ranked by MoRTH severity index</p>
            </div>
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-800">
              URGENT
            </span>
          </div>

          <div className="h-[360px] overflow-y-auto space-y-2 pr-1">
            {summary.topPriorityLocations.map((loc, idx) => {
              const full = locations.find((l) => l.locationId === loc.locationId);
              return (
                <Link
                  key={loc.locationId}
                  to={`${locationHrefPrefix}/${loc.locationId}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-[#f8fafc] p-2.5 transition hover:border-[#1963bd]/40 hover:bg-white hover:shadow-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0B3B60] text-[11px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-900">{loc.name}</p>
                      <p className="text-[10px] text-slate-400">Score: {loc.score} / 100</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {full && <RiskBadge level={full.risk.level} />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
