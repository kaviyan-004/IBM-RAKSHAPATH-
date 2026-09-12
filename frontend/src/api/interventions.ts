import type { Intervention } from "@/types";
import { getInterventions } from "@/data/mock/interventions";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/interventions/{location_id}/top */
export async function fetchTopInterventions(locationId: string): Promise<Intervention[]> {
  if (USE_MOCK) return mockDelay(getInterventions(locationId));
  return apiGet<Intervention[]>(`/api/interventions/${locationId}/top`);
}
