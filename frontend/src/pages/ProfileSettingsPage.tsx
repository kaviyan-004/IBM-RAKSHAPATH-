import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Key, LogOut, Monitor, ShieldQuestion } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type TabKey = "profile" | "preferences" | "security" | "system";

const TABS: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "preferences", label: "Preferences" },
  { key: "security", label: "Security" },
  { key: "system", label: "System Info" },
];

export default function ProfileSettingsPage() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<TabKey>("profile");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Profile & Settings</h1>
        <p className="text-sm text-slate-500">Manage your account and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
              {user?.initials ?? "T.S"}
            </span>
            <button className="mt-2 text-xs font-semibold text-brand-600 hover:underline">Edit Photo</button>
            <p className="mt-3 font-semibold text-slate-900">{user?.name ?? "T. Selvam"}</p>
            <p className="text-xs text-slate-400">{user?.role ?? "Government Official"}</p>
          </div>
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
            <QuickAction icon={Key} label="Change Password" />
            <QuickAction icon={Monitor} label="Manage Sessions" />
            <QuickAction icon={Bell} label="Notification Settings" />
            <QuickAction icon={ShieldQuestion} label="Help & Support" />
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="flex gap-1 border-b border-slate-200">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`border-b-2 px-3 py-2 text-sm font-medium ${
                  tab === t.key ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="pt-4">
            {tab === "profile" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ReadonlyField label="Full Name" value={user?.name ?? "T. Selvam"} />
                <ReadonlyField label="Role" value={user?.role ?? "Government Official"} />
                <ReadonlyField label="Organization" value={user?.organization ?? "Municipal Corporation"} />
                <ReadonlyField label="Location" value={user?.location ?? "Coimbatore, Tamil Nadu"} />
                <ReadonlyField label="Email" value={user?.email ?? "t.selvam@arcas.ac.in"} />
              </div>
            )}
            {tab === "preferences" && (
              <div className="space-y-3 text-sm text-slate-600">
                <PreferenceToggle label="Email me high-risk alerts" defaultChecked />
                <PreferenceToggle label="Email me weekly district summaries" defaultChecked />
                <PreferenceToggle label="Show emerging-risk locations on dashboard" defaultChecked />
              </div>
            )}
            {tab === "security" && (
              <div className="space-y-3 text-sm text-slate-600">
                <p>Two-factor authentication and session management would live here in a production deployment.</p>
              </div>
            )}
            {tab === "system" && (
              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  Frontend: RakshaPath web client · Data mode: <span className="font-semibold">Mock (offline demo data)</span>
                </p>
                <p>Backend API base: {import.meta.env.VITE_API_BASE_URL ?? "not configured"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label }: { icon: typeof Key; label: string }) {
  return (
    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-slate-600 hover:bg-slate-50">
      <Icon size={15} /> {label}
    </button>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function PreferenceToggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
      {label}
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-brand-600" />
    </label>
  );
}
