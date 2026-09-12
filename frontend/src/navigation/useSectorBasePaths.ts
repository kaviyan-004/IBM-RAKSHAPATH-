import { useAuth } from "@/hooks/useAuth";

export interface SectorBasePaths {
  /** Base path for the location list/detail tree, or undefined where the sector has no location-detail page (Public). */
  locations: string | undefined;
  /** Base path for the risk map page. */
  riskMap: string;
  /** Base path for the report list/detail tree, or undefined where the sector has no reports page (Public). */
  reports: string | undefined;
}

/**
 * Several pages (Location Intelligence, Interventions, Impact Simulator,
 * Reports, Risk Map) are reused across the Government and Technical sectors
 * under different URL prefixes ("/locations" vs "/location-diagnostics",
 * "/reports" vs "/technical-reports", "/risk-map" vs "/gis-risk-map").
 * This hook is the one place that maps the current sector to those prefixes,
 * so a shared page's internal links always land on a route the current
 * sector is actually allowed to visit.
 */
export function useSectorBasePaths(): SectorBasePaths {
  const { sector } = useAuth();

  if (sector === "technical") {
    return { locations: "/location-diagnostics", riskMap: "/gis-risk-map", reports: "/technical-reports" };
  }
  if (sector === "public") {
    return { locations: undefined, riskMap: "/safety-map", reports: undefined };
  }
  return { locations: "/locations", riskMap: "/risk-map", reports: "/reports" };
}
