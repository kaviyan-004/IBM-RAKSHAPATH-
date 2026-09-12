import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useSectorBasePaths } from "@/navigation/useSectorBasePaths";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";

/** Reused as Government's Locations and Technical's Location Diagnostics. */
export default function LocationsListPage() {
  const { locations, loading } = useLocationsWithRisk();
  const { locations: basePath } = useSectorBasePaths();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (loading) return <Loader label="Loading locations..." />;

  const filtered = locations.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.roadType.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-900">Locations</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or road type..."
          className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Road Type</th>
              <th className="px-4 py-3">Risk Score</th>
              <th className="px-4 py-3">Risk Level</th>
              <th className="px-4 py-3">Trend</th>
              <th className="px-4 py-3">Accidents (3yr)</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((loc) => (
              <tr key={loc.locationId} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate(`${basePath}/${loc.locationId}`)}>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{loc.name}</p>
                  <p className="text-xs text-slate-400">
                    {loc.district}, {loc.state}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600">{loc.roadType}</td>
                <td className="px-4 py-3 font-bold text-slate-900">{loc.risk.score}</td>
                <td className="px-4 py-3">
                  <RiskBadge level={loc.risk.level} />
                </td>
                <td className="px-4 py-3 capitalize text-slate-600">
                  {loc.risk.trend}
                  {loc.risk.isEmerging && <span className="ml-1 text-orange-600">(emerging)</span>}
                </td>
                <td className="px-4 py-3 text-slate-600">{loc.risk.accidents3yr}</td>
                <td className="px-4 py-3 text-right text-brand-600">→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
