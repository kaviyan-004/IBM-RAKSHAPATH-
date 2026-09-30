import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Layers, MapPin, Search, ShieldAlert } from "lucide-react";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useSectorBasePaths } from "@/navigation/useSectorBasePaths";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import RiskMap from "@/map/RiskMap";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";
import type { RiskLevel } from "@/types";

const LEVEL_FILTERS: (RiskLevel | "all")[] = ["all", "critical", "high", "moderate", "low"];

/** Reused as Government's Risk Map, Technical's GIS Risk Map, and Public's Safety Map. */
export default function RiskMapPage() {
  const { locations, loading } = useLocationsWithRisk();
  const { locations: locationsBasePath } = useSectorBasePaths();
  const { sector } = useAuth();
  const { t } = useLanguage();
  const [levelFilter, setLevelFilter] = useState<RiskLevel | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return locations.filter((l) => {
      const matchesLevel = levelFilter === "all" || l.risk.level === levelFilter;
      const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [locations, levelFilter, search]);

  const selected = locations.find((l) => l.locationId === selectedId);

  if (loading) return <Loader label="Loading risk map..." />;

  const pageTitle =
    sector === "public"
      ? t.safetyMapCardTitle
      : sector === "technical"
      ? t.navRiskMap
      : t.navRiskMap;

  const getFilterLabel = (lvl: RiskLevel | "all") => {
    switch (lvl) {
      case "all":
        return t.filterAll;
      case "critical":
        return t.filterCritical;
      case "high":
        return t.filterHigh;
      case "moderate":
        return t.filterModerate;
      case "low":
        return t.filterLow;
    }
  };

  return (
    <div className="space-y-4 select-none">
      {/* Official Government Map Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">{pageTitle}</h1>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-900 uppercase">
                GIS Live Telemetry
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              {t.ministryName} • Interactive Geospatial Risk Classification & Blackspot Corridors
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-56 sm:w-64">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1963bd] focus:ring-1 focus:ring-[#1963bd]"
              />
            </div>

            {/* Severity Filter Buttons */}
            <div className="flex items-center gap-1">
              {LEVEL_FILTERS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                    levelFilter === lvl
                      ? "bg-[#1963bd] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {getFilterLabel(lvl)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aligned 2-Column Grid: Map + Detail Drawer */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-stretch">
        {/* Map Container */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-8 min-h-[460px] flex flex-col">
          <RiskMap locations={filtered} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        {/* Selected Location Details Panel */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4 min-h-[460px]">
          {selected ? (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10.5px] font-bold text-[#1963bd] uppercase tracking-wider">
                  Selected Blackspot Node
                </span>
                <h3 className="mt-1 text-base font-bold text-slate-900">{selected.name}</h3>
                <p className="text-xs text-slate-500">
                  {selected.district}, {selected.state} • {selected.roadType}
                </p>
              </div>

              <div className="rounded-lg border border-slate-100 bg-[#f8fafc] p-3">
                <p className="text-[11px] font-medium text-slate-500">MoRTH Severity Rating</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">{selected.risk.score}</span>
                  <span className="text-xs text-slate-400 font-medium">/ 100</span>
                  <RiskBadge level={selected.risk.level} />
                </div>
                {selected.risk.isEmerging && (
                  <p className="mt-2 text-xs font-bold text-orange-700">
                    ⚠ Emerging Risk Trajectory Identified
                  </p>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Peak Hazard Window:</span>
                  <span className="font-bold text-slate-800">{selected.risk.peakRiskWindow}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">3-Year Recorded Crashes:</span>
                  <span className="font-bold text-slate-800">{selected.risk.accidents3yr} accidents</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500">Jurisdiction Police Station:</span>
                  <span className="font-bold text-slate-800">East Traffic Division</span>
                </div>
              </div>

              {locationsBasePath && (
                <button
                  onClick={() => navigate(`${locationsBasePath}/${selected.locationId}`)}
                  className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#1963bd] text-xs font-bold text-white transition hover:bg-[#15529e] shadow-xs"
                >
                  {t.viewDetails} <ArrowRight size={14} />
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center p-6 text-slate-400">
              <MapPin size={32} className="text-slate-300 mb-2" />
              <p className="text-xs font-semibold text-slate-600">Select any location pin on the map</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                Click a blackspot on the map to inspect full MoRTH risk score, road category, and diagnostic logs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
