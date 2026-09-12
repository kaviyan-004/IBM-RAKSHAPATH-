import type { AlertItem } from "@/types";
import { mockAlerts } from "@/data/mock/alerts";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/alerts */
export async function fetchAlerts(): Promise<AlertItem[]> {
  if (USE_MOCK) return mockDelay(mockAlerts);
  return apiGet<AlertItem[]>("/api/alerts");
}
