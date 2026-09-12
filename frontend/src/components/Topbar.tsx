import { Bell, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAlerts } from "@/hooks/useAlerts";
import { useAuth } from "@/hooks/useAuth";

export default function Topbar() {
  const { unreadCount } = useAlerts();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="font-semibold text-slate-800">{user?.location ?? "Coimbatore, Tamil Nadu"}</span>
      </div>
      <div className="hidden max-w-md flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex">
        <Search size={15} className="text-slate-400" />
        <input
          placeholder="Search location, road or landmark..."
          className="w-full bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/alerts")} className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
        <Link to="/settings" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
            {user?.initials ?? "T.S"}
          </span>
          <span className="hidden text-sm font-medium text-slate-700 sm:block">{user?.name ?? "Govt. Official"}</span>
        </Link>
      </div>
    </header>
  );
}
