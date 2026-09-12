import { useMemo } from "react";
import { useAsync } from "./useAsync";
import { fetchLocations } from "@/api/locations";
import { fetchRiskMap } from "@/api/risk";
import type { Location, RiskScore } from "@/types";

export interface LocationWithRisk extends Location {
  risk: RiskScore;
}

async function loadLocationsWithRisk(): Promise<LocationWithRisk[]> {
  const [locations, risks] = await Promise.all([fetchLocations(), fetchRiskMap()]);
  const riskByLocation = new Map(risks.map((r) => [r.locationId, r]));
  return locations
    .map((loc) => {
      const risk = riskByLocation.get(loc.locationId);
      return risk ? { ...loc, risk } : undefined;
    })
    .filter((l): l is LocationWithRisk => Boolean(l))
    .sort((a, b) => b.risk.score - a.risk.score);
}

export function useLocationsWithRisk() {
  const { data, loading, error } = useAsync(loadLocationsWithRisk, []);
  const byLevel = useMemo(() => {
    const groups: Record<string, LocationWithRisk[]> = { critical: [], high: [], moderate: [], low: [] };
    (data ?? []).forEach((l) => groups[l.risk.level].push(l));
    return groups;
  }, [data]);

  return { locations: data ?? [], byLevel, loading, error };
}
