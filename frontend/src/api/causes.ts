import type { CauseFingerprint, VulnerabilityAnalysis, TemporalAnalysis } from "@/types";
import { getCauseFingerprint } from "@/data/mock/causes";
import { getVulnerability } from "@/data/mock/vulnerability";
import { getTemporal } from "@/data/mock/temporal";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/causes/{location_id} */
export async function fetchCauseFingerprint(locationId: string): Promise<CauseFingerprint | undefined> {
  if (USE_MOCK) return mockDelay(getCauseFingerprint(locationId));
  return apiGet<CauseFingerprint>(`/api/causes/${locationId}`);
}

/** GET /api/causes/{location_id}/shap (returned as the same fingerprint shape in mock mode) */
export async function fetchShapExplanation(locationId: string): Promise<CauseFingerprint | undefined> {
  if (USE_MOCK) return mockDelay(getCauseFingerprint(locationId));
  return apiGet<CauseFingerprint>(`/api/causes/${locationId}/shap`);
}

/** GET /api/vulnerability/{location_id} */
export async function fetchVulnerability(locationId: string): Promise<VulnerabilityAnalysis | undefined> {
  if (USE_MOCK) return mockDelay(getVulnerability(locationId));
  return apiGet<VulnerabilityAnalysis>(`/api/vulnerability/${locationId}`);
}

/** GET /api/temporal/{location_id} */
export async function fetchTemporal(locationId: string): Promise<TemporalAnalysis | undefined> {
  if (USE_MOCK) return mockDelay(getTemporal(locationId));
  return apiGet<TemporalAnalysis>(`/api/temporal/${locationId}`);
}
