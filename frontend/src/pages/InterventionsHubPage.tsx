import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useSectorBasePaths } from "@/navigation/useSectorBasePaths";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";

/** Reused as Government's Interventions hub and Technical's Intervention Analysis hub. */
export default function InterventionsHubPage() {
  const { locations, loading } = useLocationsWithRisk();
  const { locations: basePath } = useSectorBasePaths();

  if (loading) return <Loader label="Loading locations..." />;

  return (
    <div className="space-y-4 select-none">
      {/* Official Government Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                सड़क सुरक्षा सुधारात्मक उपाय / Road Safety Interventions Hub
              </h1>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-900 uppercase">
                IRC:SP:88-2019
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              MoRTH Recommended Civil Engineering, Traffic Calming & Enforcement Countermeasures
            </p>
          </div>
          <span className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700">
            {locations.length} Actionable Blackspot Corridors
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Link
            key={loc.locationId}
            to={`${basePath}/${loc.locationId}/interventions`}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-2xs transition hover:border-[#1963bd]/40 hover:shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{loc.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {loc.district} • {loc.roadType}
                  </p>
                </div>
                <RiskBadge level={loc.risk.level} />
              </div>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-2.5 flex items-center justify-between text-xs font-bold text-[#1963bd]">
              <span>Inspect Countermeasures</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
