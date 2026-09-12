import type { AlertItem } from "@/types";

export const mockAlerts: AlertItem[] = [
  {
    id: "alert-1",
    severity: "high-risk",
    title: "High Risk Alert",
    detail: "Peelamedu Junction risk increased from 74 to 87",
    timestamp: "2026-08-01T05:58:00Z",
    read: false,
  },
  {
    id: "alert-2",
    severity: "emerging-risk",
    title: "Emerging Risk",
    detail: "NH-47 Segment 12 entered emerging-risk status",
    timestamp: "2026-08-01T04:58:00Z",
    read: false,
  },
  {
    id: "alert-3",
    severity: "intervention-update",
    title: "Intervention Update",
    detail: "Street-light project approved for RS Puram",
    timestamp: "2026-08-01T02:58:00Z",
    read: true,
  },
  {
    id: "alert-4",
    severity: "system",
    title: "Report Ready",
    detail: "Your district report is ready to download",
    timestamp: "2026-07-31T23:58:00Z",
    read: true,
  },
  {
    id: "alert-5",
    severity: "system",
    title: "System Update",
    detail: "New data available for Coimbatore district",
    timestamp: "2026-07-31T05:58:00Z",
    read: true,
  },
];
