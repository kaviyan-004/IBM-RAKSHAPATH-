import { Link } from "react-router-dom";
import { AlertTriangle, Flag, Map, ShieldCheck } from "lucide-react";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";

export default function PublicHomePage() {
  const { locations, loading } = useLocationsWithRisk();
  const topRisk = locations.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary-200 bg-primary-50 p-6">
        <h1 className="text-xl font-bold text-primary-900">Safer Roads — Public Safety</h1>
        <p className="mt-1 max-w-2xl text-sm text-primary-800">
          See the road-safety risk near you, get alerted to emerging hotspots, and report hazards to help your local authority act faster.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link to="/safety-map" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-primary-300">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <Map size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Safety Map</p>
            <p className="text-xs text-slate-500">Explore risk near you</p>
          </div>
        </Link>
        <Link to="/risk-alerts" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-primary-300">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <AlertTriangle size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Risk Alerts</p>
            <p className="text-xs text-slate-500">Recent safety notices</p>
          </div>
        </Link>
        <Link to="/report-hazard" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-primary-300">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <Flag size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Report a Hazard</p>
            <p className="text-xs text-slate-500">Tell us what you see</p>
          </div>
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
          <ShieldCheck size={16} className="text-primary-600" /> Highest-risk locations nearby
        </h2>
        {loading ? (
          <Loader label="Loading..." />
        ) : (
          <ul className="divide-y divide-slate-100">
            {topRisk.map((loc) => (
              <li key={loc.locationId} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium text-slate-800">{loc.name}</p>
                  <p className="text-xs text-slate-400">
                    {loc.district}, {loc.state}
                  </p>
                </div>
                <RiskBadge level={loc.risk.level} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
