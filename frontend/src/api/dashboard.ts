import type { DistrictSummary } from "@/types";
import { mockDistrictSummary } from "@/data/mock/district";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/dashboard/summary */
export async function fetchDistrictSummary(): Promise<DistrictSummary> {
  if (USE_MOCK) return mockDelay(mockDistrictSummary);
  return apiGet<DistrictSummary>("/api/dashboard/summary");
}
