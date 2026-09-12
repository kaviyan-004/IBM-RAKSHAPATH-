import type { DistrictSummary } from "@/types";

export const mockDistrictSummary: DistrictSummary = {
  district: "Coimbatore, Tamil Nadu",
  totalLocationsAnalyzed: 12456,
  highRiskLocations: 348,
  emergingRiskLocations: 86,
  interventionsPending: 16,
  currentSafetyBudget: 5000000,
  lastUpdated: "2026-08-01T06:00:00Z",
  topPriorityLocations: [
    { locationId: "loc-peelamedu", name: "Peelamedu Junction", score: 87 },
    { locationId: "loc-rspuram", name: "RS Puram", score: 82 },
    { locationId: "loc-avinashi", name: "Avinashi Road", score: 78 },
    { locationId: "loc-gandhipuram", name: "Gandhipuram", score: 74 },
    { locationId: "loc-nh47-seg12", name: "NH-47 Segment 12", score: 71 },
  ],
};
