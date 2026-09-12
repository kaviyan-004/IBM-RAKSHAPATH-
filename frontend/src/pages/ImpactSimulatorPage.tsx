import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocationDetail } from "@/hooks/useLocationDetail";
import { useSectorBasePaths } from "@/navigation/useSectorBasePaths";
import { runSimulation } from "@/api/simulation";
import Loader from "@/components/Loader";
import ConfidenceBadge from "@/components/ConfidenceBadge";
import ImpactBarChart, { type ImpactBar } from "@/charts/ImpactBarChart";
import type { SimulationResult } from "@/types";

export default function ImpactSimulatorPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { data, loading } = useLocationDetail(id);
  const { locations: basePath } = useSectorBasePaths();
  const [selected, setSelected] = useState<string[]>([]);
  const [individualResults, setIndividualResults] = useState<SimulationResult[]>([]);
  const [combinedResult, setCombinedResult] = useState<SimulationResult | undefined>();
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const preselected = searchParams.get("ids");
    if (preselected) setSelected(preselected.split(","));
  }, [searchParams]);

  const interventions = data?.interventions ?? [];

  const toggle = (interventionId: string) => {
    setSelected((prev) => (prev.includes(interventionId) ? prev.filter((i) => i !== interventionId) : [...prev, interventionId]));
    setIndividualResults([]);
    setCombinedResult(undefined);
  };

  const runAll = async () => {
    if (!id || selected.length === 0) return;
    setRunning(true);
    const singles = await Promise.all(selected.map((interventionId) => runSimulation({ locationId: id, interventionIds: [interventionId] })));
    setIndividualResults(singles.filter((r): r is SimulationResult => Boolean(r)));

    if (selected.length > 1) {
      const combined = await runSimulation({ locationId: id, interventionIds: selected });
      setCombinedResult(combined);
    } else {
      setCombinedResult(undefined);
    }
    setRunning(false);
  };

  const bars: ImpactBar[] = useMemo(() => {
    if (!data?.risk) return [];
    const items: ImpactBar[] = [{ label: "Current Risk", value: data.risk.score }];
    individualResults.forEach((r) => items.push({ label: `After ${shorten(r.interventionName)}`, value: r.simulatedRisk }));
    if (combinedResult) items.push({ label: "Combined", value: combinedResult.simulatedRisk, highlight: true });
    return items;
  }, [data?.risk, individualResults, combinedResult]);

  if (loading || !data?.location || !data.risk) return <Loader label="Loading simulator..." />;

  const headline = combinedResult ?? individualResults[0];

  return (
    <div className="space-y-4">
      <Link to={`${basePath}/${id}/interventions`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Back to Interventions
      </Link>

      <div>
        <h1 className="text-xl font-bold text-slate-900">What-If Simulation</h1>
        <p className="text-sm text-slate-500">Compare interventions for {data.location.name} and estimate potential risk reduction.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 font-semibold text-slate-900">Select Interventions</h3>
          <div className="space-y-2">
            {interventions.map((intervention) => (
              <label key={intervention.interventionId} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-slate-50">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-brand-600"
                  checked={selected.includes(intervention.interventionId)}
                  onChange={() => toggle(intervention.interventionId)}
                />
                {intervention.name}
              </label>
            ))}
          </div>
          <button
            onClick={runAll}
            disabled={selected.length === 0 || running}
            className="mt-4 w-full rounded-lg bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            {running ? "Running..." : "Run Simulation"}
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h3 className="mb-3 font-semibold text-slate-900">Simulation Results</h3>
          {bars.length <= 1 ? (
            <p className="py-10 text-center text-sm text-slate-400">Select one or more interventions and run the simulation to see modeled impact.</p>
          ) : (
            <>
              <ImpactBarChart bars={bars} />
              {headline && (
                <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-xs font-medium text-emerald-700">Estimated Risk Reduction</p>
                  <p className="text-3xl font-extrabold text-emerald-700">↓ {headline.riskReductionPct}%</p>
                  <p className="mt-1 text-xs text-emerald-600">
                    Scenario estimate ({headline.lowerBound}-{headline.upperBound} range) · not a guaranteed real-world outcome
                  </p>
                  <div className="mt-2 flex justify-center">
                    <ConfidenceBadge level={headline.confidence} />
                  </div>
                </div>
              )}
              {headline && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-500">Assumptions</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-slate-500">
                    {headline.assumptions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function shorten(name: string): string {
  return name.length > 22 ? `${name.slice(0, 22)}…` : name;
}
