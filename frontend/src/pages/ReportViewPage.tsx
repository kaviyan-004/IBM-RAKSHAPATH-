import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { useLocationDetail } from "@/hooks/useLocationDetail";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";
import { formatDate, formatInrLakh } from "@/utils/format";

export default function ReportViewPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLocationDetail(id);

  if (loading || !data?.location || !data.risk) return <Loader label="Generating report..." />;

  const { location, risk, cause, interventions, forecast } = data;
  const topIntervention = interventions[0];
  const generatedAt = new Date().toISOString();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/reports" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={14} /> Back to Reports
        </Link>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
          <Printer size={14} /> Print / Save as PDF
        </button>
      </div>

      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">RakshaPath</p>
            <h1 className="text-lg font-bold text-slate-900">Road Safety Decision Report</h1>
          </div>
          <span className="text-xs text-slate-400">{formatDate(generatedAt)}</span>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold text-slate-900">{location.name}</h2>
          <p className="text-sm text-slate-500">
            {location.district}, {location.state}
          </p>
        </div>

        <section className="mt-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">Executive Summary</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>
              Risk Score: <span className="font-semibold">{risk.score}/100</span> (<RiskBadgeInline level={risk.level} />)
            </li>
            {cause && <li>Major Risk Factors: {cause.topFactors.slice(0, 2).map((f) => f.factor).join(", ")}</li>}
            {topIntervention && <li>Recommended Intervention: {topIntervention.name}</li>}
            {topIntervention && (
              <li>
                Modeled Risk Reduction: {topIntervention.expectedEffectMin}% - {topIntervention.expectedEffectMax}% ({topIntervention.confidence} confidence)
              </li>
            )}
            {topIntervention && (
              <li>
                Estimated Cost: {formatInrLakh(topIntervention.estimatedCostMin)} - {formatInrLakh(topIntervention.estimatedCostMax)}
              </li>
            )}
          </ul>
        </section>

        {cause && (
          <section className="mt-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">Cause Analysis</h3>
            <p className="mt-1 text-xs italic text-slate-400">{cause.note}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {cause.topFactors.map((f) => (
                <li key={f.factor}>
                  {f.factor} — +{f.contributionPoints.toFixed(1)} pts
                </li>
              ))}
            </ul>
          </section>
        )}

        {forecast && (
          <section className="mt-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">Future Risk</h3>
            <p className="mt-1 text-sm text-slate-700">
              Trend: {forecast.trend} over a {forecast.horizonYears}-year horizon
              {forecast.isEmergingHotspot ? " — flagged as an emerging hotspot." : "."} Confidence: {Math.round(forecast.confidence * 100)}%.
            </p>
          </section>
        )}

        <section className="mt-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">Intervention Recommendations</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            {interventions.map((i) => (
              <li key={i.interventionId}>
                {i.name} — target: {i.targetCause}, cost {formatInrLakh(i.estimatedCostMin)}-{formatInrLakh(i.estimatedCostMax)}, effect {i.expectedEffectMin}%-{i.expectedEffectMax}%
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
          <p>Dataset version: {risk.datasetVersion} · Model version: {risk.modelVersion} · Predicted at: {formatDate(risk.predictedAt)}</p>
          <p className="mt-1">
            This report contains model-derived scenario estimates, not proven causal effects or guaranteed field outcomes. Field validation is
            required before binding capital allocation decisions.
          </p>
        </section>
      </div>
    </div>
  );
}

function RiskBadgeInline({ level }: { level: Parameters<typeof RiskBadge>[0]["level"] }) {
  return <RiskBadge level={level} />;
}
