import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import RiskMap from "@/map/RiskMap";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";
import { RISK_LEVEL_META } from "@/utils/riskLevel";
import type { RiskLevel } from "@/types";

const LEVEL_FILTERS: (RiskLevel | "all")[] = ["all", "critical", "high", "moderate", "low"];

export default function RiskMapPage() {
  const { locations, loading } = useLocationsWithRisk();
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

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search location, road or landmark..."
          className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <div className="flex items-center gap-1.5">
          {LEVEL_FILTERS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                levelFilter === lvl ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {lvl === "all" ? "All" : RISK_LEVEL_META[lvl].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2" style={{ minHeight: 420 }}>
          <RiskMap locations={filtered} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm" style={{ maxHeight: 560 }}>
          {selected ? (
            <div>
              <p className="text-xs text-slate-400">
                {selected.district}, {selected.state}
              </p>
              <h3 className="text-lg font-bold text-slate-900">{selected.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{selected.risk.score}</span>
                <span className="text-sm text-slate-400">/100</span>
                <RiskBadge level={selected.risk.level} />
              </div>
              {selected.risk.isEmerging && (
                <p className="mt-1 text-xs font-semibold text-orange-600">⚠ Emerging risk trajectory</p>
              )}
              <p className="mt-3 text-xs text-slate-500">Peak risk window</p>
              <p className="text-sm font-medium text-slate-800">{selected.risk.peakRiskWindow}</p>
              <button
                onClick={() => navigate(`/locations/${selected.locationId}`)}
                className="mt-4 w-full rounded-lg bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                View Details
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Select a location on the map to see its risk summary.</p>
          )}

          <div className="mt-2 border-t border-slate-100 pt-3">
            <p className="mb-2 text-xs font-semibold text-slate-500">
              {filtered.length} location{filtered.length !== 1 ? "s" : ""} shown
            </p>
            <ul className="space-y-1">
              {filtered.map((l) => (
                <li key={l.locationId}>
                  <button
                    onClick={() => setSelectedId(l.locationId)}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm hover:bg-slate-50 ${
                      l.locationId === selectedId ? "bg-brand-50" : ""
                    }`}
                  >
                    <span className="truncate">{l.name}</span>
                    <span className="ml-2 shrink-0 font-semibold text-slate-700">{l.risk.score}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
