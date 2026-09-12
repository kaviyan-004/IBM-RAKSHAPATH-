import type { Intervention } from "@/types";
import ConfidenceBadge from "./ConfidenceBadge";
import { formatInrLakh, formatPercent } from "@/utils/format";

interface InterventionCardProps {
  rank: number;
  intervention: Intervention;
  selected?: boolean;
  onToggle?: () => void;
  onSimulate?: () => void;
}

export default function InterventionCard({ rank, intervention, selected, onToggle, onSimulate }: InterventionCardProps) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm transition ${selected ? "border-brand-500 ring-1 ring-brand-200 bg-brand-50/40" : "border-slate-200 bg-white"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{rank}</span>
          <h4 className="font-semibold text-slate-900">{intervention.name}</h4>
        </div>
        {onToggle && (
          <input type="checkbox" className="h-4 w-4 accent-brand-600" checked={Boolean(selected)} onChange={onToggle} aria-label={`Select ${intervention.name}`} />
        )}
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Target cause: <span className="font-medium text-slate-700">{intervention.targetCause}</span>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-slate-400">Est. Cost</p>
          <p className="font-semibold text-slate-800">
            {formatInrLakh(intervention.estimatedCostMin)} - {formatInrLakh(intervention.estimatedCostMax)}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Expected Impact</p>
          <p className="font-semibold text-slate-800">
            {formatPercent(intervention.expectedEffectMin)} - {formatPercent(intervention.expectedEffectMax)}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Cause Match</p>
          <p className="font-semibold text-slate-800">{formatPercent(intervention.causeMatch * 100)}</p>
        </div>
        <div>
          <p className="text-slate-400">Context Match</p>
          <p className="font-semibold text-slate-800">{formatPercent(intervention.contextMatch * 100)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <ConfidenceBadge level={intervention.confidence} />
        {onSimulate && (
          <button onClick={onSimulate} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
            View details →
          </button>
        )}
      </div>
    </div>
  );
}
