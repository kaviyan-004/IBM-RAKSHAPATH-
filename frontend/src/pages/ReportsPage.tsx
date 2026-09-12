import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { fetchReports } from "@/api/reports";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useSectorBasePaths } from "@/navigation/useSectorBasePaths";
import Loader from "@/components/Loader";
import { formatDate } from "@/utils/format";

/** Reused as Government's Reports and Technical's Technical Reports. */
export default function ReportsPage() {
  const { data: reports, loading } = useAsync(fetchReports, []);
  const { locations } = useLocationsWithRisk();
  const { reports: basePath } = useSectorBasePaths();
  const [locationId, setLocationId] = useState("");
  const navigate = useNavigate();

  const generate = () => {
    if (!locationId || !basePath) return;
    navigate(`${basePath}/${locationId}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Reports & Decision Center</h1>
        <p className="text-sm text-slate-500">Generate and download authority-ready road safety reports.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-slate-500">Location</label>
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="">Select a location...</option>
            {locations.map((l) => (
              <option key={l.locationId} value={l.locationId}>
                {l.name} — Risk {l.risk.score}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={generate} disabled={!locationId} className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40">
            Generate Report
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h3 className="font-semibold text-slate-900">Recent Reports</h3>
        </div>
        {loading ? (
          <Loader label="Loading reports..." />
        ) : (
          <ul className="divide-y divide-slate-100">
            {reports?.map((r) => (
              <li key={r.reportId} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    <FileText size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{r.title}</p>
                    <p className="text-xs text-slate-400">Generated on {formatDate(r.generatedAt)}</p>
                  </div>
                </div>
                <Link to={r.locationId && basePath ? `${basePath}/${r.locationId}` : "#"} className="text-xs font-semibold text-brand-600 hover:underline">
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
