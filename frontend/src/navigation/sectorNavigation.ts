import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Bell,
  BrainCircuit,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  Flag,
  FlaskConical,
  Globe,
  Home,
  LayoutDashboard,
  Map,
  MapPin,
  Megaphone,
  PiggyBank,
  Route,
  Settings,
  SlidersHorizontal,
  Stethoscope,
  TrendingUp,
  UserCircle,
  Wrench,
} from "lucide-react";
import type { Sector } from "@/types";

export interface SectorNavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  /** Matches only this exact path (used for root "/") instead of a path + nested-route prefix. */
  exact?: boolean;
}

/**
 * Single source of truth for sector-scoped navigation. The same array drives
 * the sidebar (visibility) and the route guard (access control), so a page
 * can never be reachable without also being a visible nav item and vice versa.
 */
export const SECTOR_NAV: Record<Sector, SectorNavItem[]> = {
  government: [
    { label: "Dashboard", path: "/", icon: LayoutDashboard, exact: true },
    { label: "Risk Map", path: "/risk-map", icon: Map },
    { label: "Locations", path: "/locations", icon: MapPin },
    { label: "Interventions", path: "/interventions", icon: Wrench },
    { label: "Budget Optimizer", path: "/budget-optimizer", icon: PiggyBank },
    { label: "Reports", path: "/reports", icon: FileText },
    { label: "Alerts", path: "/alerts", icon: AlertTriangle },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
  technical: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, exact: true },
    { label: "GIS Risk Map", path: "/gis-risk-map", icon: Globe },
    { label: "Location Diagnostics", path: "/location-diagnostics", icon: Stethoscope },
    { label: "Risk Factors", path: "/risk-factors", icon: SlidersHorizontal },
    { label: "SHAP / XAI Analysis", path: "/xai", icon: BrainCircuit },
    { label: "Risk Forecast", path: "/risk-forecast", icon: TrendingUp },
    { label: "Intervention Analysis", path: "/intervention-analysis", icon: FlaskConical },
    { label: "Field Verification", path: "/field-verification", icon: ClipboardCheck },
    { label: "Technical Reports", path: "/technical-reports", icon: FileSpreadsheet },
  ],
  public: [
    { label: "Home", path: "/home", icon: Home, exact: true },
    { label: "Safety Map", path: "/safety-map", icon: Map },
    { label: "Risk Alerts", path: "/risk-alerts", icon: Bell },
    { label: "Safer Routes", path: "/safer-routes", icon: Route },
    { label: "Report a Hazard", path: "/report-hazard", icon: Flag },
    { label: "Safety Updates", path: "/safety-updates", icon: Megaphone },
    { label: "Profile", path: "/profile", icon: UserCircle },
  ],
};

export const SECTOR_LABELS: Record<Sector, string> = {
  government: "Government",
  technical: "Technical",
  public: "Public",
};

/** Where a user lands immediately after choosing this sector at login. */
export function sectorLandingPath(sector: Sector): string {
  if (sector === "technical") return "/dashboard";
  if (sector === "public") return "/home";
  return "/";
}

/**
 * True if `pathname` belongs to `sector` — either it's exactly one of the
 * sector's nav paths, or it's a nested detail route under one of them
 * (e.g. "/locations/:id" is allowed because "/locations" is a government
 * nav item). This is the single check used by both the sidebar's active
 * state and the SectorRouteGuard, so hiding a link and blocking its route
 * can never drift out of sync.
 */
export function isPathAllowedForSector(pathname: string, sector: Sector): boolean {
  return SECTOR_NAV[sector].some((item) => {
    if (item.exact) return pathname === item.path;
    return pathname === item.path || pathname.startsWith(`${item.path}/`);
  });
}
