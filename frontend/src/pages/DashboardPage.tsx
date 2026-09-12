import { Link } from "react-router-dom";
import { AlertTriangle, MapPin, ShieldAlert, TrendingUp, Wallet } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { fetchDistrictSummary } from "@/api/dashboard";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useAuth } from "@/hooks/useAuth";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import Loader from "@/components/Loader";
import RiskMap from "@/map/RiskMap";
import { formatInrLakh, formatDate } from "@/utils/format";

/** Shared by the Government ("/") and Technical ("/dashboard") sector routes. */
export default function DashboardPage() {
  const { sector } = useAuth();
  const { data: summary, loading } = useAsync(fetchDistrictSummary, []);
  const { locations, loading: locationsLoading } = useLocationsWithRisk();

  const isTechnical = sector === "technical";
  const title = isTechnical ? "Technical Road Safety Dashboard" : "Government Road Safety Dashboard";
  const mapHref = isTechnical ? "/gis-risk-map" : "/risk-map";
  const locationHrefPrefix = isTechnical ? "/location-diagnostics" : "/locations";

  if (loading || !summary) return <Loader label="Loading district overview..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">An overview of road safety in {summary.district}</p>
        </div>
        <span className="text-xs text-slate-400">Updated {formatDate(summary.lastUpdated)}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Locations Analyzed" value={summary.totalLocationsAnalyzed.toLocaleString("en-IN")} icon={MapPin} tone="brand" />
        <StatCard label="High-Risk Locations" value={String(summary.highRiskLocations)} icon={ShieldAlert} tone="danger" />
        <StatCard label="Emerging Risk Locations" value={String(summary.emergingRiskLocations)} icon={TrendingUp} tone="warning" />
        <StatCard label="Interventions Pending" value={String(summary.interventionsPending)} icon={AlertTriangle} tone="default" />
        <StatCard label="Current Safety Budget" value={formatInrLakh(summary.currentSafetyBudget)} icon={Wallet} tone="success" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">District Risk Overview</h2>
            <Link to={mapHref} className="text-xs font-semibold text-brand-600 hover:underline">
              Open full map →
            </Link>
          </div>
          <div className="h-72">
            {locationsLoading ? <Loader label="Loading map..." /> : <RiskMap locations={locations} onSelect={() => {}} />}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Top Priority Locations</h2>
          </div>
          <ol className="space-y-3">
            {summary.topPriorityLocations.map((loc, idx) => {
              const full = locations.find((l) => l.locationId === loc.locationId);
              return (
                <li key={loc.locationId}>
                  <Link to={`${locationHrefPrefix}/${loc.locationId}`} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500">
                        {idx + 1}
                      </span>
                      {loc.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{loc.score}</span>
                      {full && <RiskBadge level={full.risk.level} />}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
