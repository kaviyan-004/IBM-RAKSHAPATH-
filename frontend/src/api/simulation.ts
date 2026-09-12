import type { SimulationResult } from "@/types";
import { getRiskScore } from "@/data/mock/risks";
import { getInterventions } from "@/data/mock/interventions";
import { simulateInterventions } from "@/utils/simulate";
import { apiPost, mockDelay, USE_MOCK } from "@/services/httpClient";

export interface SimulationRequest {
  locationId: string;
  interventionIds: string[];
}

/** POST /api/simulation */
export async function runSimulation(request: SimulationRequest): Promise<SimulationResult | undefined> {
  if (USE_MOCK) {
    const risk = getRiskScore(request.locationId);
    const catalog = getInterventions(request.locationId);
    const chosen = catalog.filter((i) => request.interventionIds.includes(i.interventionId));
    if (!risk || chosen.length === 0) return mockDelay(undefined, 150);
    return mockDelay(simulateInterventions(risk.score, chosen), 350);
  }
  return apiPost<SimulationResult>("/api/simulation", request);
}
