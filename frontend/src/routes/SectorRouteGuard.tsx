import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { sectorLandingPath } from "@/navigation/sectorNavigation";
import type { Sector } from "@/types";

interface SectorRouteGuardProps {
  sector: Sector;
}

/**
 * Blocks access to a sector's route subtree when the signed-in user's
 * active sector doesn't match — this is the enforcement layer behind the
 * sidebar's visibility filtering. A Government user typing "/xai" directly
 * into the address bar is redirected to their own landing page, not shown
 * the Technical page with a hidden link.
 */
export default function SectorRouteGuard({ sector }: SectorRouteGuardProps) {
  const { sector: currentSector } = useAuth();

  if (!currentSector) {
    return <Navigate to="/login" replace />;
  }

  if (currentSector !== sector) {
    return <Navigate to={sectorLandingPath(currentSector)} replace />;
  }

  return <Outlet />;
}
