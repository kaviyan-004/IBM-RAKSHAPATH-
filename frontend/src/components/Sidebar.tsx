import { NavLink } from "react-router-dom";
import { Shield, Sparkles } from "lucide-react";
import logoImg from "@/fav.io/logo.png";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { SECTOR_NAV } from "@/navigation/sectorNavigation";

export default function Sidebar() {
  const { sector } = useAuth();
  const { t } = useLanguage();
  const navItems = sector ? SECTOR_NAV[sector] : [];

  const wingTitle =
    sector === "public"
      ? t.wingCitizen
      : sector === "technical"
      ? t.wingTech
      : t.wingAdmin;

  const getLocalizedLabel = (path: string, defaultLabel: string) => {
    switch (path) {
      case "/":
      case "/dashboard":
        return t.navDashboard;
      case "/home":
        return t.navHome;
      case "/risk-map":
      case "/gis-risk-map":
        return t.navRiskMap;
      case "/safety-map":
        return t.navSafetyMap;
      case "/locations":
        return t.navLocations;
      case "/location-diagnostics":
        return t.navDiagnostics;
      case "/interventions":
      case "/intervention-analysis":
        return t.navInterventions;
      case "/budget-optimizer":
        return t.navBudget;
      case "/reports":
      case "/technical-reports":
        return t.navReports;
      case "/alerts":
      case "/risk-alerts":
        return t.navAlerts;
      case "/settings":
        return t.navSettings;
      case "/profile":
        return t.navProfile;
      case "/safer-routes":
        return t.navSaferRoutes;
      case "/report-hazard":
        return t.navReportHazard;
      case "/safety-updates":
        return t.navSafetyUpdates;
      case "/field-verification":
        return t.navFieldVerification;
      case "/risk-forecast":
        return t.navRiskForecast;
      default:
        return defaultLabel;
    }
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white shadow-xs md:flex select-none">
      {/* Sidebar Header: Sector Wing Badge */}
      <div className="border-b border-slate-200 bg-gradient-to-b from-[#0B3B60]/5 to-transparent px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-white p-1 shadow-xs">
            <img src={logoImg} alt="RakshaPath" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-[#0B3B60]">RakshaPath 075</p>
            <p className="truncate text-[10.5px] font-semibold text-amber-800">
              {wingTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        <div className="px-2 pb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          {t.chooseSector}
        </div>
        {navItems.map(({ path, label, icon: Icon, exact }) => (
          <NavLink
            key={path}
            to={path}
            end={exact}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition ${
                isActive
                  ? "border-l-4 border-amber-600 bg-[#e6f0fa] text-[#0B3B60] font-bold shadow-2xs"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  className={`shrink-0 transition ${
                    isActive ? "text-[#0B3B60]" : "text-slate-500 group-hover:text-slate-700"
                  }`}
                />
                <span className="truncate">{getLocalizedLabel(path, label)}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Authority & Trust Marks */}
      <div className="border-t border-slate-200 bg-[#f8fafc] px-4 py-3 text-[10.5px] text-slate-500">
        <div className="flex items-center gap-1.5 text-[#0B3B60] font-semibold">
          <Shield size={12} className="text-amber-600" />
          <span>MoRTH Road Safety Cell</span>
        </div>
        <p className="mt-1 text-[10px] leading-tight text-slate-400">
          Govt. of India Decision Support Engine
        </p>
        <div className="mt-2 flex items-center justify-between border-t border-slate-200/70 pt-1.5 text-[9.5px] text-slate-400">
          <span>v0.1.0-GOI</span>
          <span className="font-semibold text-emerald-700">● {t.securePortal}</span>
        </div>
      </div>
    </aside>
  );
}

