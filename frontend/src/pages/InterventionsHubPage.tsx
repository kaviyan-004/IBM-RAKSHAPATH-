import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";

export default function InterventionsHubPage() {
  const { locations, loading } = useLocationsWithRisk();

  if (loading) return <Loader label="Loading locations..." />;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Interventions</h1>
        <p className="text-sm text-slate-500">Choose a location to view and compare its cause-linked intervention options.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Link
            key={loc.locationId}
            to={`/locations/${loc.locationId}/interventions`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300 hover:shadow-md"
          >
            <div>
              <p className="font-semibold text-slate-900">{loc.name}</p>
              <p className="text-xs text-slate-400">
                {loc.district} · {loc.roadType}
              </p>
              <RiskBadge level={loc.risk.level} className="mt-2" />
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Wrench size={16} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
