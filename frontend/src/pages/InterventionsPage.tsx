import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocationDetail } from "@/hooks/useLocationDetail";
import Loader from "@/components/Loader";
import InterventionCard from "@/components/InterventionCard";
import RiskBadge from "@/components/RiskBadge";

export default function InterventionsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLocationDetail(id);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  if (loading || !data?.location || !data.risk) return <Loader label="Loading interventions..." />;

  const { location, risk, interventions } = data;

  const toggle = (interventionId: string) => {
    setSelected((prev) => (prev.includes(interventionId) ? prev.filter((i) => i !== interventionId) : [...prev, interventionId]));
  };

  const goToSimulator = () => {
    const query = selected.length > 0 ? `?ids=${selected.join(",")}` : "";
    navigate(`/locations/${id}/simulator${query}`);
  };

  return (
    <div className="space-y-4">
      <Link to={`/locations/${id}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Back to {location.name}
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Intervention Intelligence</h1>
          <p className="text-sm text-slate-500">
            Based on risk factors at {location.name} <RiskBadge level={risk.level} className="ml-2" />
          </p>
        </div>
        <button
          onClick={goToSimulator}
          disabled={selected.length === 0}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
        >
          Simulate Selected ({selected.length})
        </button>
      </div>

      {interventions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-400">
          No evidence-backed interventions are catalogued for this location yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {interventions.map((intervention, idx) => (
            <InterventionCard
              key={intervention.interventionId}
              rank={idx + 1}
              intervention={intervention}
              selected={selected.includes(intervention.interventionId)}
              onToggle={() => toggle(intervention.interventionId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
