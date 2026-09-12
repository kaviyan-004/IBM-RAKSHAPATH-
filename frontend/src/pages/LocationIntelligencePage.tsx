import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocationDetail } from "@/hooks/useLocationDetail";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";
import RiskGauge from "@/charts/RiskGauge";
import TrendChart from "@/charts/TrendChart";

type TabKey = "overview" | "why" | "who" | "when" | "forecast";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "why", label: "Why This Risk?" },
  { key: "who", label: "Who's Vulnerable?" },
  { key: "when", label: "When It Happens" },
  { key: "forecast", label: "Forecast" },
];

export default function LocationIntelligencePage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLocationDetail(id);
  const [tab, setTab] = useState<TabKey>("overview");
  const navigate = useNavigate();

  if (loading || !data?.location || !data.risk) return <Loader label="Loading location intelligence..." />;

  const { location, risk, cause, vulnerability, temporal, forecast } = data;

  return (
    <div className="space-y-4">
      <Link to="/risk-map" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Back to Map
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs text-slate-400">
            {location.district}, {location.state}
          </p>
          <h1 className="text-xl font-bold text-slate-900">{location.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <RiskBadge level={risk.level} />
            {risk.isEmerging && <span className="text-xs font-semibold text-orange-600">Emerging risk</span>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiskGauge score={risk.score} />
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate(`/locations/${id}/interventions`)}
              className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700"
            >
              View Interventions
            </button>
            <button
              onClick={() => navigate(`/locations/${id}/simulator`)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              What-If Simulator
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition ${
              tab === t.key ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
          <Field label="Road Type" value={location.roadType} />
          <Field label="Area Type" value={location.areaType} />
          <Field label="Accidents (3yr)" value={String(risk.accidents3yr)} />
          <Field label="Fatalities (3yr)" value={String(risk.fatalities3yr)} />
          <Field label="Injuries (3yr)" value={String(risk.injuries3yr)} />
          <Field label="Peak Risk Window" value={risk.peakRiskWindow} />
          <Field label="Data Quality" value={risk.dataQuality} />
          <Field label="Confidence" value={`${Math.round(risk.confidence * 100)}%`} />
          <Field label="Trend" value={risk.trend} />
        </div>
      )}

      {tab === "why" && cause && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-slate-900">Cause Fingerprint</h3>
          <p className="mt-1 text-xs text-slate-500">{cause.note}</p>
          <div className="mt-4 space-y-3">
            {cause.topFactors.map((f) => (
              <div key={f.factor}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">{f.factor}</span>
                  <span className="font-semibold text-brand-600">+{f.contributionPoints.toFixed(1)} pts</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-brand-500" style={{ width: `${Math.min(100, f.contributionPoints * 4)}%` }} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "who" && vulnerability && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-slate-900">Vulnerability Analysis</h3>
          <p className="mt-1 text-xs text-slate-500">
            Most affected group: <span className="font-semibold text-slate-800">{vulnerability.mostAffectedGroup}</span> ·{" "}
            {Math.round(vulnerability.confidence * 100)}% confidence
          </p>
          <div className="mt-4 space-y-3">
            {vulnerability.groups.map((g) => (
              <div key={g.group}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">{g.group}</span>
                  <span className="text-slate-500">
                    Involvement {Math.round(g.involvementShare * 100)}% · Fatality {Math.round(g.fatalityShare * 100)}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-orange-500" style={{ width: `${g.involvementShare * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "when" && temporal && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-slate-900">Temporal Risk Pattern</h3>
          <p className="mt-1 text-xs text-slate-500">
            Peak window: <span className="font-semibold text-slate-800">{temporal.peakHourWindow}</span> · {temporal.peakDayType}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500">By time of day</p>
              <div className="space-y-1.5">
                {temporal.hourly.map((h) => (
                  <div key={h.label} className="flex items-center gap-2 text-xs">
                    <span className="w-16 shrink-0 text-slate-500">{h.label}</span>
                    <div className="h-2 flex-1 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-brand-500" style={{ width: `${h.accidentShare * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500">By day of week</p>
              <div className="space-y-1.5">
                {temporal.dayOfWeek.map((d) => (
                  <div key={d.label} className="flex items-center gap-2 text-xs">
                    <span className="w-16 shrink-0 text-slate-500">{d.label}</span>
                    <div className="h-2 flex-1 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${d.accidentShare * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "forecast" && forecast && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold text-slate-900">Future Risk Prediction</h3>
            {forecast.isEmergingHotspot && (
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">🔺 Emerging Hotspot</span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {forecast.horizonYears}-year horizon · trend {forecast.trend} · {Math.round(forecast.confidence * 100)}% confidence
          </p>
          <TrendChart series={forecast.series} />
          <p className="text-xs text-slate-400">
            Shaded band shows the modeled uncertainty range. This is a scenario estimate, not a guaranteed outcome.
          </p>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-semibold capitalize text-slate-800">{value}</p>
    </div>
  );
}
