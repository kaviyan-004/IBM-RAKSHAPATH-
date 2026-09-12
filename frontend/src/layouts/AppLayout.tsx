import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  const { isAuthenticated, sector } = useAuth();

  // A sector is required to resolve navigation/route access, so an
  // authenticated session missing one (e.g. a pre-sector-feature session)
  // is treated the same as being signed out.
  if (!isAuthenticated || !sector) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
