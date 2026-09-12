import { useState } from "react";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { runBudgetOptimization } from "@/api/budget";
import Loader from "@/components/Loader";
import ConfidenceBadge from "@/components/ConfidenceBadge";
import { formatInrFull, formatInrLakh } from "@/utils/format";
import type { OptimizationResult } from "@/types";
import { Link } from "react-router-dom";

export default function BudgetOptimizerPage() {
  const { locations, loading } = useLocationsWithRisk();
  const [budget, setBudget] = useState(5000000);
  const [locationsToConsider, setLocationsToConsider] = useState(10);
  const [result, setResult] = useState<OptimizationResult | undefined>();
  const [running, setRunning] = useState(false);

  const runOptimizer = async () => {
    setRunning(true);
    const scopedIds = locations.slice(0, locationsToConsider).map((l) => l.locationId);
    const res = await runBudgetOptimization({ budgetLimit: budget, locationIds: scopedIds });
    setResult(res);
    setRunning(false);
  };

  if (loading) return <Loader label="Loading locations..." />;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Safety Budget Optimizer</h1>
        <p className="text-sm text-slate-500">Select the best combination of interventions across locations under a limited budget.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Available Budget (₹)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <p className="mt-1 text-xs text-slate-400">{formatInrLakh(budget)}</p>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Locations to Consider</label>
          <input
            type="number"
            min={1}
            max={locations.length}
            value={locationsToConsider}
            onChange={(e) => setLocationsToConsider(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <p className="mt-1 text-xs text-slate-400">Top {locationsToConsider} by current risk score</p>
        </div>
        <div className="flex items-end">
          <button
            onClick={runOptimizer}
            disabled={running}
            className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {running ? "Optimizing..." : "Optimize Budget"}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <SummaryTile label="Total Budget" value={formatInrLakh(result.budgetLimit)} />
            <SummaryTile label="Allocated Cost" value={formatInrLakh(result.totalCost)} />
            <SummaryTile label="Remaining Budget" value={formatInrLakh(result.remainingBudget)} />
            <SummaryTile label="Expected Benefit" value={result.expectedBenefit.toFixed(1)} />
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-4 py-3">
              <h3 className="font-semibold text-slate-900">Optimal Intervention Plan</h3>
              <p className="text-xs text-slate-400">Portfolio maximizing total expected safety benefit within budget.</p>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Intervention</th>
                  <th className="px-4 py-2">Cost</th>
                  <th className="px-4 py-2">Modeled Benefit</th>
                  <th className="px-4 py-2">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.selected.map((c, idx) => (
                  <tr key={c.locationId}>
                    <td className="px-4 py-2.5 text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-2.5">
                      <Link to={`/locations/${c.locationId}`} className="font-medium text-brand-600 hover:underline">
                        {c.locationName}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-slate-700">{c.interventionName}</td>
                    <td className="px-4 py-2.5 text-slate-700">{formatInrFull(c.cost)}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-900">+{c.expectedBenefit.toFixed(1)}</td>
                    <td className="px-4 py-2.5">
                      <ConfidenceBadge level={c.confidence} />
                    </td>
                  </tr>
                ))}
                {result.selected.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-400">
                      No combination fits within the given budget. Try increasing it.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {result.excluded.length > 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
              <p className="text-xs font-semibold text-slate-500">
                Excluded from this budget ({result.excluded.length}): {result.excluded.map((e) => e.locationName).join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
