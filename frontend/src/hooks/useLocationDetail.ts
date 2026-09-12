import { useAsync } from "./useAsync";
import { fetchLocationById } from "@/api/locations";
import { fetchRiskForLocation } from "@/api/risk";
import { fetchCauseFingerprint, fetchVulnerability, fetchTemporal } from "@/api/causes";
import { fetchForecast } from "@/api/prediction";
import { fetchTopInterventions } from "@/api/interventions";
import type { CauseFingerprint, Intervention, Location, RiskForecast, RiskScore, TemporalAnalysis, VulnerabilityAnalysis } from "@/types";

export interface LocationDetailBundle {
  location: Location | undefined;
  risk: RiskScore | undefined;
  cause: CauseFingerprint | undefined;
  vulnerability: VulnerabilityAnalysis | undefined;
  temporal: TemporalAnalysis | undefined;
  forecast: RiskForecast | undefined;
  interventions: Intervention[];
}

async function loadLocationDetail(locationId: string): Promise<LocationDetailBundle> {
  const [location, risk, cause, vulnerability, temporal, forecast, interventions] = await Promise.all([
    fetchLocationById(locationId),
    fetchRiskForLocation(locationId),
    fetchCauseFingerprint(locationId),
    fetchVulnerability(locationId),
    fetchTemporal(locationId),
    fetchForecast(locationId),
    fetchTopInterventions(locationId),
  ]);
  return { location, risk, cause, vulnerability, temporal, forecast, interventions };
}

export function useLocationDetail(locationId: string | undefined) {
  const { data, loading, error } = useAsync(() => loadLocationDetail(locationId ?? ""), [locationId]);
  return { data, loading: loading || !locationId, error };
}
