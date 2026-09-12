import type { Location } from "@/types";
import { mockLocations } from "@/data/mock/locations";
import { apiGet, mockDelay, USE_MOCK } from "@/services/httpClient";

/** GET /api/locations */
export async function fetchLocations(): Promise<Location[]> {
  if (USE_MOCK) return mockDelay(mockLocations);
  return apiGet<Location[]>("/api/locations");
}

/** GET /api/locations/{id} (convenience lookup; backed by the same collection) */
export async function fetchLocationById(locationId: string): Promise<Location | undefined> {
  if (USE_MOCK) return mockDelay(mockLocations.find((l) => l.locationId === locationId));
  return apiGet<Location>(`/api/locations/${locationId}`);
}
