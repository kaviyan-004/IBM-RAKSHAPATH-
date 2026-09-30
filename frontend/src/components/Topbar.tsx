import { Bell, MapPin, Search, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAlerts } from "@/hooks/useAlerts";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

export default function Topbar() {
  const { unreadCount } = useAlerts();
  const { user, sector } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const alertsPath = sector === "public" ? "/risk-alerts" : sector === "technical" ? undefined : "/alerts";
  const profilePath = sector === "public" ? "/profile" : sector === "technical" ? undefined : "/settings";

  const roleLabel =
    sector === "public"
      ? t.roleCitizen
      : sector === "technical"
      ? t.roleEngineer
      : t.roleOfficer;

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 select-none">
      {/* Jurisdiction display */}
      <div className="flex items-center gap-2 text-xs">
        <MapPin size={14} className="text-amber-600 shrink-0" />
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="hidden font-semibold text-slate-800 lg:inline">{t.jurisdictionLabel}:</span>
          <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-800">
            {user?.location ?? "Coimbatore, Tamil Nadu"}
          </span>
          <span className="hidden text-[11px] text-slate-400 sm:inline">(Zone: Southern | Dist Code: TN-38)</span>
        </div>
      </div>

      {/* Official Gov Search */}
      <div className="hidden max-w-md flex-1 items-center gap-2 rounded-md border border-slate-300 bg-[#f8fafc] px-3 py-1.5 sm:flex">
        <Search size={14} className="text-slate-400" />
        <input
          placeholder={t.searchPlaceholder}
          className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
        />
        <kbd className="hidden rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[9px] font-mono text-slate-400 md:inline">
          Ctrl+K
        </kbd>
      </div>

      {/* Right controls: Alerts & Profile */}
      <div className="flex items-center gap-3">
        {alertsPath && (
          <button
            onClick={() => navigate(alertsPath)}
            className="relative rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Official Notifications"
            title="Official Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* Profile / Official Identity */}
        {profilePath ? (
          <Link
            to={profilePath}
            className="flex items-center gap-2.5 rounded-md border border-slate-200 bg-[#f8fafc] px-2.5 py-1 hover:bg-slate-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded bg-[#0B3B60] text-xs font-bold text-white">
              {user?.initials ?? "T.S"}
            </span>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold leading-tight text-slate-800">{user?.name ?? "Govt. Official"}</p>
              <p className="text-[10px] text-amber-700 font-medium leading-tight">{roleLabel}</p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-2.5 rounded-md border border-slate-200 bg-[#f8fafc] px-2.5 py-1">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-[#0B3B60] text-xs font-bold text-white">
              {user?.initials ?? "T.S"}
            </span>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold leading-tight text-slate-800">{user?.name ?? "Govt. Official"}</p>
              <p className="text-[10px] text-amber-700 font-medium leading-tight">{roleLabel}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
