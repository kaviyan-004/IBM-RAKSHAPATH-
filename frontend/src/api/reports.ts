import type { AuthorityReport } from "@/types";
import { mockReports } from "@/data/mock/reports";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/report (list of previously generated reports) */
export async function fetchReports(): Promise<AuthorityReport[]> {
  if (USE_MOCK) return mockDelay(mockReports);
  return apiGet<AuthorityReport[]>("/api/report");
}

/** GET /api/report/{location_id}/pdf */
export async function fetchLocationReport(locationId: string): Promise<AuthorityReport | undefined> {
  if (USE_MOCK) return mockDelay(mockReports.find((r) => r.locationId === locationId) ?? mockReports[0]);
  return apiGet<AuthorityReport>(`/api/report/${locationId}/pdf`);
}
