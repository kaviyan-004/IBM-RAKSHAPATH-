import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import GovHeaderBar from "@/components/GovHeaderBar";
import GovTicker from "@/components/GovTicker";
import GovFooter from "@/components/GovFooter";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  const { isAuthenticated, sector } = useAuth();
  const [fontScale, setFontScale] = useState<"small" | "normal" | "large">("normal");

  // A sector is required to resolve navigation/route access, so an
  // authenticated session missing one (e.g. a pre-sector-feature session)
  // is treated the same as being signed out.
  if (!isAuthenticated || !sector) {
    return <Navigate to="/login" replace />;
  }

  const scaleClass =
    fontScale === "small" ? "text-[0.93rem]" : fontScale === "large" ? "text-[1.05rem]" : "text-[1rem]";

  return (
    <div className={`flex h-screen w-full flex-col overflow-hidden bg-[#f4f6f9] ${scaleClass}`}>
      {/* 1. Official National Identity & Accessibility Top Bar */}
      <GovHeaderBar fontScale={fontScale} setFontScale={setFontScale} />

      {/* 2. Official Highway & Hazard Advisory Ticker */}
      <GovTicker />

      {/* 3. Main Operational Window (Sidebar + Content Area) */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar />
          <div className="flex-1 overflow-y-auto">
            <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
              <Outlet />
            </main>
            <GovFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

