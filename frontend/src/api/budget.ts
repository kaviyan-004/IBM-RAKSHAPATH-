import type { ConfidenceLevel, OptimizationCandidate, OptimizationResult } from "@/types";
import { mockRiskScores } from "@/data/mock/risks";
import { mockLocations } from "@/data/mock/locations";
import { getInterventions } from "@/data/mock/interventions";
import { knapsack } from "@/utils/knapsack";
import { apiPost, mockDelay, USE_MOCK } from "@/services/httpClient";

const CONFIDENCE_WEIGHT: Record<ConfidenceLevel, number> = { High: 1, Medium: 0.7, Low: 0.45 };

export interface OptimizationRequest {
  budgetLimit: number;
  locationIds?: string[];
  maxInterventions?: number;
}

function buildCandidates(locationIds?: string[]): OptimizationCandidate[] {
  const scope = locationIds && locationIds.length > 0 ? locationIds : mockRiskScores.map((r) => r.locationId);

  return scope
    .map((locationId) => {
      const location = mockLocations.find((l) => l.locationId === locationId);
      const interventions = getInterventions(locationId);
      if (!location || interventions.length === 0) return undefined;

      // Pick the single best-value intervention per location (highest benefit-per-cost)
      // so the portfolio compares distinct locations, matching the authority-facing UI.
      const best = interventions.reduce((top, current) => {
        const currentBenefit = ((current.expectedEffectMin + current.expectedEffectMax) / 2) * CONFIDENCE_WEIGHT[current.confidence];
        const topBenefit = ((top.expectedEffectMin + top.expectedEffectMax) / 2) * CONFIDENCE_WEIGHT[top.confidence];
        const currentRatio = currentBenefit / ((current.estimatedCostMin + current.estimatedCostMax) / 2);
        const topRatio = topBenefit / ((top.estimatedCostMin + top.estimatedCostMax) / 2);
        return currentRatio > topRatio ? current : top;
      });

      const cost = Math.round((best.estimatedCostMin + best.estimatedCostMax) / 2);
      const expectedBenefit = Math.round(((best.expectedEffectMin + best.expectedEffectMax) / 2) * CONFIDENCE_WEIGHT[best.confidence] * 10) / 10;

      const candidate: OptimizationCandidate = {
        locationId,
        locationName: location.name,
        interventionId: best.interventionId,
        interventionName: best.name,
        cost,
        expectedBenefit,
        confidence: best.confidence,
      };
      return candidate;
    })
    .filter((c): c is OptimizationCandidate => Boolean(c));
}

function computeOptimization(request: OptimizationRequest): OptimizationResult {
  const candidates = buildCandidates(request.locationIds);

  const { selectedIds, totalCost, totalValue } = knapsack(
    candidates.map((c) => ({ id: c.locationId, cost: c.cost, value: c.expectedBenefit })),
    request.budgetLimit
  );

  const selectedSet = new Set(selectedIds);
  const selected = candidates.filter((c) => selectedSet.has(c.locationId));
  const excluded = candidates.filter((c) => !selectedSet.has(c.locationId));

  return {
    budgetLimit: request.budgetLimit,
    totalCost,
    remainingBudget: Math.max(0, request.budgetLimit - totalCost),
    expectedBenefit: totalValue,
    selected,
    excluded,
  };
}

/** POST /api/optimize */
export async function runBudgetOptimization(request: OptimizationRequest): Promise<OptimizationResult> {
  if (USE_MOCK) return mockDelay(computeOptimization(request), 400);
  return apiPost<OptimizationResult>("/api/optimize", request);
}
