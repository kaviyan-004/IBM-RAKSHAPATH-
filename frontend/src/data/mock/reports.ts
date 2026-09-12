import type { AuthorityReport } from "@/types";

export const mockReports: AuthorityReport[] = [
  {
    reportId: "rep-1",
    locationId: "loc-peelamedu",
    title: "Peelamedu Junction - Location Report",
    generatedAt: "2026-08-01T00:00:00Z",
    fileName: "Peelamedu_Junction_Report.pdf",
    kind: "location",
  },
  {
    reportId: "rep-2",
    district: "Coimbatore",
    title: "Coimbatore District - Road Safety Report",
    generatedAt: "2026-07-31T00:00:00Z",
    fileName: "Coimbatore_District_Report.pdf",
    kind: "district",
  },
  {
    reportId: "rep-3",
    district: "Coimbatore",
    title: "Budget Optimization Report",
    generatedAt: "2026-07-30T00:00:00Z",
    fileName: "Budget_Optimization_Report.pdf",
    kind: "budget",
  },
];
