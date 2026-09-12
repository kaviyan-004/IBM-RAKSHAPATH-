import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Lock as LockSmall, ShieldCheck, ShieldHalf } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SectorSelector from "@/components/SectorSelector";
import { sectorLandingPath } from "@/navigation/sectorNavigation";
import type { Sector } from "@/types";

const REMEMBER_KEY = "rakshapath.rememberedEmail";

const FONT_SCALES = [0.9, 1, 1.1] as const;

export default function LoginPage() {
  const { login, setSector } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSector, setSelectedSector] = useState<Sector | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sectorError, setSectorError] = useState("");
  const [notice, setNotice] = useState("");
  const [fontScaleIdx, setFontScaleIdx] = useState<0 | 1 | 2>(1);

  useEffect(() => {
    try {
      const remembered = localStorage.getItem(REMEMBER_KEY);
      if (remembered) {
        setEmail(remembered);
        setRememberMe(true);
      }
    } catch {
      // ignore storage access failures (private browsing, etc.)
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    // Sector is required and validated before the existing email/password
    // authentication runs — the backend contract stays exactly { email,
    // password }; sector is frontend-only navigation context.
    if (!selectedSector) {
      setSectorError("Please select your sector to continue.");
      return;
    }
    setSectorError("");
    setLoading(true);
    try {
      await login({ email, password });
      setSector(selectedSector);
      try {
        if (rememberMe) localStorage.setItem(REMEMBER_KEY, email);
        else localStorage.removeItem(REMEMBER_KEY);
      } catch {
        // ignore storage access failures
      }
      navigate(sectorLandingPath(selectedSector));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-primary-50 text-loginNeutral-900"
      style={{ fontFamily: "'Noto Sans', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Top utility bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-secondary-200 bg-white px-4 py-3 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-900 text-white">
            <ShieldHalf size={19} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-primary-900">RakshaPath</p>
            <p className="text-[11px] text-secondary-500">Building Safer Roads for a Developed India</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-secondary-600">
          <label className="flex items-center gap-1">
            <span className="sr-only">Select language</span>
            <select
              defaultValue="en"
              className="rounded-md border border-secondary-200 bg-white px-2 py-1 text-xs text-secondary-700 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="en">English</option>
            </select>
          </label>

          <div className="hidden items-center gap-1 sm:flex" role="group" aria-label="Adjust text size">
            {(["A-", "A", "A+"] as const).map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => setFontScaleIdx(idx as 0 | 1 | 2)}
                aria-pressed={fontScaleIdx === idx}
                className={`rounded-md border px-1.5 py-0.5 font-semibold transition ${
                  fontScaleIdx === idx ? "border-primary-500 bg-primary-50 text-primary-700" : "border-secondary-200 text-secondary-500 hover:bg-secondary-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button type="button" className="font-medium text-secondary-600 hover:text-primary-600" title="Contact your system administrator for support">
            Help
          </button>
        </div>
      </header>

      {/* Main two-column area */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row" style={{ fontSize: `${FONT_SCALES[fontScaleIdx]}rem` }}>
        {/* Left — brand & hero visual */}
        <section className="relative hidden overflow-hidden lg:flex lg:w-[55%]">
          <img
            src="/login-hero.png"
            alt="RakshaPath — AI-powered road safety decision intelligence platform. Data-driven insights, safer roads, smarter interventions, and stronger communities, on the way to a safer road network."
            className="h-full w-full object-cover"
          />
        </section>

        {/* Right — sign-in form */}
        <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 lg:w-[45%]">
          <div className="w-full max-w-md">
            <div className="mb-5 flex items-center gap-2 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-900 text-white">
                <ShieldHalf size={18} />
              </span>
              <p className="text-base font-bold text-primary-900">RakshaPath</p>
            </div>

            <div className="rounded-xl border border-secondary-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="mb-1 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-accent-600">
                <span className="flex items-center gap-1.5">
                  <LockSmall size={13} />
                  Secure Access
                </span>
                <span className="h-px flex-1 bg-secondary-200" />
              </div>
              <h2 className="text-2xl font-bold text-primary-900">
                Welcome to <span className="text-primary-600">RakshaPath</span>
              </h2>
              <p className="mt-1 text-sm text-secondary-500">Sign in to access road safety intelligence and decision tools.</p>

              {error && (
                <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                  {error}
                </div>
              )}
              {notice && (
                <div role="status" className="mt-4 rounded-lg border border-primary-200 bg-primary-50 p-3 text-xs font-medium text-primary-700">
                  {notice}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                <div>
                  <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-loginNeutral-800">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your official email"
                      className="h-11 w-full rounded-lg border border-secondary-200 bg-white pl-9 pr-3 text-sm text-loginNeutral-900 outline-none transition placeholder:text-secondary-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-loginNeutral-800">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-lg border border-secondary-200 bg-white pl-9 pr-10 text-sm text-loginNeutral-900 outline-none transition placeholder:text-secondary-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <SectorSelector value={selectedSector} onChange={(s) => { setSelectedSector(s); setSectorError(""); }} error={sectorError} />

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-secondary-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded accent-primary-500"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setNotice("Please contact your system administrator to reset your password.")}
                    className="font-semibold text-primary-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-500 text-sm font-semibold text-white transition hover:bg-primary-600 active:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs text-secondary-400">
                <span className="h-px flex-1 bg-secondary-200" />
                OR
                <span className="h-px flex-1 bg-secondary-200" />
              </div>

              <button
                type="button"
                onClick={() => setNotice("Google sign-in is not configured for this environment yet.")}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-secondary-200 bg-white text-sm font-semibold text-loginNeutral-800 transition hover:bg-secondary-50"
              >
                <GoogleGlyph />
                Continue with Google
              </button>

              <p className="mt-6 text-center text-sm text-secondary-500">
                New to RakshaPath?{" "}
                <Link to="/signup" className="font-semibold text-primary-600 hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-primary-200 bg-primary-100/60 p-3.5 text-xs text-primary-900">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary-600" />
              <p>
                <span className="font-semibold">Authorized access only.</span> This platform is intended for transport authorities, traffic police, road
                safety committees, and other approved personnel.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-secondary-200 bg-white px-4 py-3 text-[11px] text-secondary-500 sm:px-8">
        <span>About • Privacy Policy • Terms of Use • Accessibility • Contact Us</span>
        <span>A Safer Roads Initiative</span>
      </footer>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

