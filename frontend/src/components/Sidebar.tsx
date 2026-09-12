import { NavLink } from "react-router-dom";
import logoImg from "@/fav.io/logo.png";
import { useAuth } from "@/hooks/useAuth";
import { SECTOR_LABELS, SECTOR_NAV } from "@/navigation/sectorNavigation";

export default function Sidebar() {
  const { sector } = useAuth();
  const navItems = sector ? SECTOR_NAV[sector] : [];

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
        <img src={logoImg} alt="RakshaPath" className="h-9 w-9 object-contain" />
        <div>
          <p className="text-sm font-bold leading-tight text-slate-900">RakshaPath</p>
          <p className="text-[11px] leading-tight text-slate-400">
            {sector ? `${SECTOR_LABELS[sector]} Sector` : "Safer Roads. Smarter Tomorrow."}
          </p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ path, label, icon: Icon, exact }) => (
          <NavLink
            key={path}
            to={path}
            end={exact}
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
