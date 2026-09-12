import type { RiskScore } from "@/types";
import { mockRiskScores, getRiskScore } from "@/data/mock/risks";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/risk/map */
export async function fetchRiskMap(): Promise<RiskScore[]> {
  if (USE_MOCK) return mockDelay(mockRiskScores);
  return apiGet<RiskScore[]>("/api/risk/map");
}

/** GET /api/risk/{location_id} */
export async function fetchRiskForLocation(locationId: string): Promise<RiskScore | undefined> {
  if (USE_MOCK) return mockDelay(getRiskScore(locationId));
  return apiGet<RiskScore>(`/api/risk/${locationId}`);
}

/** GET /api/risk/high-risk */
export async function fetchHighRiskLocations(): Promise<RiskScore[]> {
  if (USE_MOCK) return mockDelay(mockRiskScores.filter((r) => r.level === "high" || r.level === "critical"));
  return apiGet<RiskScore[]>("/api/risk/high-risk");
}

/** GET /api/risk/emerging */
export async function fetchEmergingRiskLocations(): Promise<RiskScore[]> {
  if (USE_MOCK) return mockDelay(mockRiskScores.filter((r) => r.isEmerging));
  return apiGet<RiskScore[]>("/api/risk/emerging");
}
