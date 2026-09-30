import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HelpCircle,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";
import { sectorLandingPath } from "@/navigation/sectorNavigation";
import type { Sector } from "@/types";
import SectorSlideSelector from "@/components/SectorSlideSelector";

const REMEMBER_KEY = "rakshapath.rememberedEmail";

export default function LoginPage() {
  const { login, setSector } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedSector, setSelectedSector] = useState<Sector>("government");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [fontScale, setFontScale] = useState<"small" | "normal" | "large">("normal");

  useEffect(() => {
    try {
      const remembered = localStorage.getItem(REMEMBER_KEY);
      if (remembered) {
        setEmail(remembered);
        setRememberMe(true);
      }
    } catch {
      // ignore storage access failures
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (!email.trim()) {
      setError("Please enter your official email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      setSector(selectedSector);
      try {
        if (rememberMe) localStorage.setItem(REMEMBER_KEY, email);
        else localStorage.removeItem(REMEMBER_KEY);
      } catch {
        // ignore
      }
      navigate(sectorLandingPath(selectedSector));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to sign in. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const scaleMultiplier = fontScale === "small" ? "text-[0.93rem]" : fontScale === "large" ? "text-[1.05rem]" : "text-[1rem]";

  return (
    <div
      className={`flex min-h-screen h-screen flex-col bg-white text-slate-800 ${scaleMultiplier} antialiased overflow-hidden select-none`}
      style={{ fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Top Tricolor Ribbon (india.gov.in standard) */}
      <div className="tricolor-stripe w-full shrink-0" />

      {/* =========================================================================
          TOP HEADER BAR
          ========================================================================= */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/90 bg-white px-4 sm:px-8 z-20">
        {/* Left: Ashoka Emblem + Government Title */}
        <div className="flex items-center gap-3">
          <AshokaEmblem className="h-9 w-auto text-slate-900" />
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-[12.5px] font-bold text-slate-900 tracking-tight">
              {t.govOfIndia}
            </span>
            <span className="text-[11.5px] font-medium text-slate-600">
              {t.ministryName}
            </span>
          </div>
        </div>

        {/* Right: Language, Font Resize, Help, Tagline + Tricolor Wave */}
        <div className="flex items-center gap-4 text-xs text-slate-600">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              aria-label="Language selector"
              className="appearance-none bg-transparent pr-4 text-xs font-bold text-slate-800 outline-none cursor-pointer hover:text-slate-900"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
            <span className="pointer-events-none absolute right-0 text-[10px] text-slate-500">▼</span>
          </div>

          <span className="text-slate-300 select-none">|</span>

          {/* Font Size Adjusters: A- A A+ */}
          <div className="flex items-center gap-1.5 font-medium text-slate-700" role="group" aria-label="Adjust text size">
            <button
              type="button"
              onClick={() => setFontScale("small")}
              className={`hover:text-blue-600 transition ${fontScale === "small" ? "font-bold text-blue-600" : ""}`}
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontScale("normal")}
              className={`hover:text-blue-600 transition ${fontScale === "normal" ? "font-bold text-blue-600" : ""}`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontScale("large")}
              className={`hover:text-blue-600 transition ${fontScale === "large" ? "font-bold text-blue-600" : ""}`}
            >
              A+
            </button>
          </div>

          <span className="text-slate-300 select-none">|</span>

          {/* Help link */}
          <button
            type="button"
            onClick={() => setNotice("Support helpline: 1800-ROAD-SAFE (Toll Free) or support@rakshapath.gov.in")}
            className="flex items-center gap-1 text-xs font-normal text-slate-700 hover:text-blue-600 transition"
          >
            <HelpCircle size={14} className="text-slate-600" />
            <span>Help</span>
          </button>

          {/* Tagline & Tricolor Ribbon */}
          <div className="hidden sm:flex items-center gap-2 pl-2">
            <div className="text-right leading-tight text-[11px] font-medium text-slate-800">
              <p>Safer People</p>
              <p>Stronger Bharat</p>
            </div>
            <TricolorWave className="h-6 w-8" />
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN BODY: BALANCED 2-COLUMN GOVERNMENT PORTAL CONTAINER
          ========================================================================= */}
      <main className="flex flex-1 min-h-0 w-full items-center justify-center bg-[#f0f4f9] px-4 py-4 sm:px-6 overflow-y-auto">
        <div className="w-full max-w-5xl rounded-xl border border-slate-300 bg-white shadow-gov-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto">
          {/* LEFT COLUMN: OFFICIAL RAKSHAPATH HERO GRAPHIC */}
          <section className="relative hidden lg:flex lg:col-span-6 items-center justify-center bg-[#edf4fb] border-r border-slate-200 overflow-hidden select-none">
            <img
              src="/login-hero.png"
              alt="RakshaPath — AI-Powered Road Safety Decision Intelligence Platform"
              className="w-full h-full object-contain object-center"
            />
          </section>

          {/* RIGHT COLUMN: PERFECTLY ALIGNED LOGIN FORM */}
          <section className="lg:col-span-6 bg-white p-6 sm:p-7 flex flex-col justify-center">
            <div className="w-full max-w-[420px] mx-auto">
              {/* Header Badge */}
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#1963bd] uppercase">
                <span className="flex items-center gap-1">
                  <Lock size={12} className="text-[#1963bd]" />
                  Official Single Sign-On
                </span>
                <span className="h-[1.5px] w-16 bg-[#1963bd]/40 rounded-full" />
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Welcome to <span className="text-[#1963bd]">RakshaPath</span>
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-normal">
                Sign in to access road safety intelligence and decision tools.
              </p>

              {/* Error / Notice Banners */}
              {error && (
                <div role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2 text-xs font-medium text-red-700">
                  {error}
                </div>
              )}
              {notice && (
                <div role="status" className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-2 text-xs font-medium text-blue-700">
                  {notice}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
                <div>
                  <label htmlFor="login-email" className="mb-1 block text-xs font-semibold text-slate-700">
                    Email Address / ईमेल पता *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your official email"
                      className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1963bd] focus:ring-1 focus:ring-[#1963bd]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="mb-1 block text-xs font-semibold text-slate-700">
                    Password / पासवर्ड *
                  </label>
                  <div className="relative">
                    <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1963bd] focus:ring-1 focus:ring-[#1963bd]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Sector Box with Dropdown Selector (india.gov.in style) */}
                <div>
                  <SectorSlideSelector
                    value={selectedSector}
                    onChange={setSelectedSector}
                    label="Choose Sector / अनुभाग चुनें"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-300 accent-[#1963bd]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setNotice("Please contact your department administrator to reset your credentials.")}
                    className="font-medium text-[#1963bd] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#1963bd] text-xs sm:text-sm font-bold text-white transition hover:bg-[#15529e] active:bg-[#103d75] disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
                >
                  {loading ? t.signingIn : t.signIn}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

              {/* Create an account link */}
              <p className="mt-3 text-center text-xs text-slate-500 font-normal">
                New to RakshaPath?{" "}
                <Link to="/signup" className="font-semibold text-[#1963bd] hover:underline">
                  Create an account
                </Link>
              </p>

              {/* Compact Security Note */}
              <div className="mt-3 rounded-md border border-blue-100 bg-[#f2f7fd] p-2 flex items-center gap-2 text-[11px] text-slate-600">
                <ShieldCheck size={14} className="text-[#1963bd] shrink-0" />
                <span>Authorized for Govt. Officials, Engineers & Citizens under MoRTH guidelines.</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =========================================================================
          BOTTOM FOOTER BAR
          ========================================================================= */}
      <footer className="flex h-11 shrink-0 items-center justify-between border-t border-slate-200/90 bg-white px-4 sm:px-8 text-[11px] text-slate-500 z-20">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="hover:text-slate-800 cursor-pointer">About</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Terms of Use</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Accessibility Statement</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Help</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-600 font-normal hidden sm:inline">
            Hosted by <strong>National Informatics Centre (NIC)</strong> | MoRTH
          </span>
          <TricolorWave className="h-4 w-6" />
        </div>
      </footer>
      <div className="tricolor-stripe w-full shrink-0" />
    </div>
  );
}

/* =========================================================================
   SVG ICONS & GRAPHICS
   ========================================================================= */

/**
 * State Emblem of India (Ashoka Lion Capital with Satyameva Jayate)
 */
function AshokaEmblem({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 70"
      fill="currentColor"
      className={className}
      aria-label="State Emblem of India"
    >
      {/* Lions Capital Silhouette */}
      <path d="M22 6c0-2 2-4 4-4h8c2 0 4 2 4 4v4h-16V6z" />
      {/* Left Lion */}
      <path d="M16 10c-2 0-4 2-5 5-1 3-1 7 1 10 1 2 3 3 5 3v-7c0-2 1-4 3-5-2-3-3-4-4-6z" />
      {/* Center Lion */}
      <path d="M26 8c-2 0-3 2-3 4v10h14V12c0-2-1-4-3-4h-8z" />
      {/* Right Lion */}
      <path d="M44 10c2 0 4 2 5 5 1 3 1 7-1 10-1 2-3 3-5 3v-7c0-2-1-4-3-5 2-3 3-4 4-6z" />
      {/* Chests & Manes */}
      <path d="M20 23c-2 2-3 5-3 8 0 3 2 6 5 7v-15h-2z" />
      <path d="M26 23h8v15h-8V23z" />
      <path d="M40 23c2 2 3 5 3 8 0 3-2 6-5 7v-15h2z" />
      {/* Abacus platform */}
      <path d="M12 39h36v5H12z" />
      {/* Dharma Chakra in Center */}
      <circle cx="30" cy="41.5" r="2.2" fill="#fff" />
      <circle cx="30" cy="41.5" r="1.2" fill="currentColor" />
      {/* Horse on left */}
      <circle cx="18" cy="41.5" r="1.2" fill="#fff" />
      {/* Bull on right */}
      <circle cx="42" cy="41.5" r="1.2" fill="#fff" />
      {/* Lotus Base */}
      <path d="M16 45c2 4 8 6 14 6s12-2 14-6H16z" />
      {/* Pedestal Base */}
      <path d="M14 52h32v3H14z" />
      {/* Satyameva Jayate (text styling representation) */}
      <text
        x="30"
        y="62"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="bold"
        fontFamily="'Noto Sans Devanagari', 'Noto Sans', sans-serif"
        fill="currentColor"
        letterSpacing="0.5"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}

/**
 * Indian Flag Tricolor Wave / Ribbon Accent
 */
function TricolorWave({ className = "h-5 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" fill="none" className={className} aria-hidden="true">
      {/* Saffron Wave */}
      <path
        d="M2 7 C 12 1, 24 12, 38 4 C 34 2, 22 0, 2 7 Z"
        fill="#FF9933"
      />
      <path
        d="M2 9 C 14 3, 25 14, 38 6 C 36 7, 24 15, 2 11 Z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="0.5"
      />
      {/* Green Wave */}
      <path
        d="M2 12 C 14 6, 25 17, 38 9 C 34 14, 20 18, 2 14 Z"
        fill="#138808"
      />
    </svg>
  );
}

/**
 * India Map Outline / Viksit Bharat Icon
 */
function IndiaOutlineIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Crisp map contour of India */}
      <path d="M12 2l1.2 1.8.8-.4.6.8 1.4.2.2 1.4 1 .6.2 1.2-1 .8.4 1.4-1.2 1.2 1.4 1 .2 1.6-1.2 1.4.2 1.4-1.4 2-1.2 2.6-.8-.2-.8-2.6-1.4-1.2.2-1.6-1.2-1.2.4-1.4-1-.8.2-1.2 1-.6.2-1.4 1.4-.2.6-.8.8.4L12 2z" />
    </svg>
  );
}

/**
 * Official Google G Glyph
 */
function GoogleGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
