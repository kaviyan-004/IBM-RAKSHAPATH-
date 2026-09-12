import type { ConfidenceLevel, Intervention, SimulationResult } from "@/types";

const CONFIDENCE_RANK: Record<ConfidenceLevel, number> = { Low: 0, Medium: 1, High: 2 };
const RANK_TO_CONFIDENCE: ConfidenceLevel[] = ["Low", "Medium", "High"];

function weakestConfidence(levels: ConfidenceLevel[]): ConfidenceLevel {
  const rank = Math.min(...levels.map((l) => CONFIDENCE_RANK[l]));
  return RANK_TO_CONFIDENCE[rank];
}

/**
 * Mirrors the counterfactual simulation engine described in the tech spec:
 * baseline risk -> modeled after-risk -> uncertainty range -> confidence.
 * Diminishing returns are applied when multiple interventions are combined,
 * since real-world benefits are not simply additive.
 */
export function simulateInterventions(baselineRisk: number, interventions: Intervention[]): SimulationResult | undefined {
  if (interventions.length === 0) return undefined;

  const effectsMid = interventions.map((i) => (i.expectedEffectMin + i.expectedEffectMax) / 2 / 100);
  const effectsMin = interventions.map((i) => i.expectedEffectMin / 100);
  const effectsMax = interventions.map((i) => i.expectedEffectMax / 100);

  const combine = (effects: number[]) => {
    const combined = 1 - effects.reduce((acc, e) => acc * (1 - e), 1);
    const diminishingFactor = effects.length > 1 ? 0.88 : 1;
    return combined * diminishingFactor;
  };

  const midReduction = combine(effectsMid);
  const minReduction = combine(effectsMin);
  const maxReduction = combine(effectsMax);

  const simulatedRisk = Math.max(1, Math.round(baselineRisk * (1 - midReduction)));
  const lowerBound = Math.max(1, Math.round(baselineRisk * (1 - maxReduction)));
  const upperBound = Math.max(1, Math.round(baselineRisk * (1 - minReduction)));

  const name = interventions.length === 1 ? interventions[0].name : `Combined (${interventions.map((i) => i.name).join(" + ")})`;

  return {
    interventionId: interventions.map((i) => i.interventionId).join("+"),
    interventionName: name,
    baselineRisk,
    simulatedRisk,
    riskReductionPct: Math.round(midReduction * 1000) / 10,
    lowerBound,
    upperBound,
    confidence: weakestConfidence(interventions.map((i) => i.confidence)),
    assumptions: [
      "Effect ranges are drawn from published road-safety evidence and comparable-corridor history, not a guaranteed field outcome.",
      interventions.length > 1
        ? "Combined interventions assume partial overlap in benefit; effects are not simply additive."
        : "Single-intervention estimate assumes the intervention is implemented to the documented specification.",
      "Field validation is required before this estimate is used for a binding capital decision.",
    ],
  };
}
