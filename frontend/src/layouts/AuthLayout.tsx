import { Outlet } from "react-router-dom";
import { ShieldHalf } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-950 p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-900 to-slate-950 opacity-95" />
        <div className="relative flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <ShieldHalf size={22} />
          </span>
          <div>
            <p className="text-lg font-bold">RakshaPath</p>
            <p className="text-xs text-brand-200">AI-Powered Road Safety Decision Intelligence</p>
          </div>
        </div>
        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight">Saving Lives.<br />Building Safer India.</h2>
          <p className="mt-3 max-w-sm text-sm text-brand-200">
            Predict where risk is emerging, understand why, and decide where the next safety rupee should go.
          </p>
        </div>
        <p className="relative text-xs text-brand-300">Predict · Understand · Intervene · Simulate · Save Lives</p>
      </div>
      <div className="flex w-full flex-1 items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
