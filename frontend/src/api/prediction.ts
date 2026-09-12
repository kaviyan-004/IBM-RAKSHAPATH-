import type { RiskForecast } from "@/types";
import { getForecast } from "@/data/mock/forecasts";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/prediction/{location_id} */
export async function fetchForecast(locationId: string): Promise<RiskForecast | undefined> {
  if (USE_MOCK) return mockDelay(getForecast(locationId));
  return apiGet<RiskForecast>(`/api/prediction/${locationId}`);
}
