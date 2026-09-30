import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Filter, MapPin, Search } from "lucide-react";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useSectorBasePaths } from "@/navigation/useSectorBasePaths";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";

/** Reused as Government's Locations and Technical's Location Diagnostics. */
export default function LocationsListPage() {
  const { locations, loading } = useLocationsWithRisk();
  const { locations: basePath } = useSectorBasePaths();
  const { sector } = useAuth();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (loading) return <Loader label="Loading locations register..." />;

  const filtered = locations.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.roadType.toLowerCase().includes(search.toLowerCase()) ||
      l.district.toLowerCase().includes(search.toLowerCase())
  );

  const pageTitle = sector === "technical" ? t.navDiagnostics : t.navLocations;

  return (
    <div className="space-y-4 select-none">
      {/* Official MoRTH Header Card */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">{pageTitle}</h1>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                {filtered.length} Register Entries
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              {t.ministryName} • Standard MoRTH Crash Investigation & Blackspot Diagnostic Register
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1963bd] focus:ring-1 focus:ring-[#1963bd]"
            />
          </div>
        </div>
      </div>

      {/* Aligned Table Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-slate-200 bg-[#f8fafc] text-[11px] font-bold uppercase tracking-wider text-slate-600">
            <tr>
              <th className="px-4 py-3">Location / Road Corridor</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Risk Score</th>
              <th className="px-4 py-3">Risk Assessment</th>
              <th className="px-4 py-3">Trend</th>
              <th className="px-4 py-3">3-Yr Incidents</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((loc) => (
              <tr
                key={loc.locationId}
                className="cursor-pointer transition hover:bg-[#f0f6ff]/70"
                onClick={() => navigate(`${basePath}/${loc.locationId}`)}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">{loc.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {loc.district}, {loc.state}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-700">{loc.roadType}</td>
                <td className="px-4 py-3.5 font-bold text-slate-900 text-sm">
                  {loc.risk.score} <span className="text-[11px] text-slate-400 font-normal">/ 100</span>
                </td>
                <td className="px-4 py-3.5">
                  <RiskBadge level={loc.risk.level} />
                </td>
                <td className="px-4 py-3.5 capitalize text-slate-600">
                  <span className="font-medium">{loc.risk.trend}</span>
                  {loc.risk.isEmerging && (
                    <span className="ml-1.5 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-800">
                      Emerging
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-700">{loc.risk.accidents3yr} crashes</td>
                <td className="px-4 py-3.5 text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1963bd] hover:underline">
                    {t.viewDetails} <ArrowRight size={13} />
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-xs text-slate-500">
                  No matching locations found for "{search}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
