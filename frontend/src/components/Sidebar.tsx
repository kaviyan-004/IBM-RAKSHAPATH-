import { NavLink } from "react-router-dom";
import { AlertTriangle, LayoutDashboard, Map, MapPin, PiggyBank, Settings, ShieldHalf, Wrench, FileText } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/risk-map", label: "Risk Map", icon: Map },
  { to: "/locations", label: "Locations", icon: MapPin },
  { to: "/interventions", label: "Interventions", icon: Wrench },
  { to: "/budget-optimizer", label: "Budget Optimizer", icon: PiggyBank },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/alerts", label: "Alerts", icon: AlertTriangle },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <ShieldHalf size={20} />
        </span>
        <div>
          <p className="text-sm font-bold leading-tight text-slate-900">RakshaPath</p>
          <p className="text-[11px] leading-tight text-slate-400">Safer Roads. Smarter Tomorrow.</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? "bg-brand-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-100 px-5 py-4 text-[11px] text-slate-400">
        Predict · Understand · Intervene · Simulate · Save Lives
      </div>
    </aside>
  );
}
