import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  HelpCircle,
  Leaf,
  Lock,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { sectorLandingPath } from "@/navigation/sectorNavigation";
import type { Sector } from "@/types";

const REMEMBER_KEY = "rakshapath.rememberedEmail";

export default function LoginPage() {
  const { login, setSector } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
      // Default to government sector for seamless landing experience
      const userSector: Sector = "government";
      setSector(userSector);
      try {
        if (rememberMe) localStorage.setItem(REMEMBER_KEY, email);
        else localStorage.removeItem(REMEMBER_KEY);
      } catch {
        // ignore
      }
      navigate(sectorLandingPath(userSector));
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
      {/* =========================================================================
          TOP HEADER BAR
          ========================================================================= */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/90 bg-white px-4 sm:px-8 z-20">
        {/* Left: Ashoka Emblem + Government Title */}
        <div className="flex items-center gap-3">
          <AshokaEmblem className="h-9 w-auto text-slate-900" />
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-[12.5px] font-semibold text-slate-900 tracking-tight">
              Building Safer Roads
            </span>
            <span className="text-[11.5px] font-normal text-slate-600">
              for a Developed India
            </span>
          </div>
        </div>

        {/* Right: Language, Font Resize, Help, Tagline + Tricolor Wave */}
        <div className="flex items-center gap-4 text-xs text-slate-600">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <select
              defaultValue="en"
              aria-label="Language selector"
              className="appearance-none bg-transparent pr-4 text-xs font-normal text-slate-700 outline-none cursor-pointer hover:text-slate-900"
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
          MAIN BODY: 2-COLUMN SPLIT (HERO ON LEFT, LOGIN ON RIGHT)
          ========================================================================= */}
      <main className="flex flex-1 min-h-0 w-full flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: HERO IMAGE & 4 PILLARS OVERLAY BAR */}
        <section className="relative hidden lg:flex lg:w-[54%] xl:w-[55%] h-full overflow-hidden bg-slate-900 select-none">
          <img
            src="/login-hero.png"
            alt="RakshaPath — AI-Powered Road Safety Decision Intelligence Platform"
            className="h-full w-full object-cover object-left-top"
          />

          {/* 4 Pillars Bottom Bar (Safer Citizens, Smarter Cities, Sustainable Mobility, Viksit Bharat) */}
          <div className="absolute bottom-0 inset-x-0 z-10 grid grid-cols-4 border-t border-white/20 bg-[#162739]/85 backdrop-blur-[3px] py-2.5 text-center text-white">
            <div className="flex flex-col items-center justify-center gap-1 border-r border-white/15 px-2">
              <Users size={19} className="text-white/95" />
              <span className="text-[11.5px] font-medium tracking-wide text-white/95">Safer Citizens</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-white/15 px-2">
              <Building2 size={19} className="text-white/95" />
              <span className="text-[11.5px] font-medium tracking-wide text-white/95">Smarter Cities</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-white/15 px-2">
              <Leaf size={19} className="text-white/95" />
              <span className="text-[11.5px] font-medium tracking-wide text-white/95">Sustainable Mobility</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-2">
              <IndiaOutlineIcon className="h-5 w-5 text-white/95" />
              <span className="text-[11.5px] font-medium tracking-wide text-white/95">Viksit Bharat</span>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: LOGIN FORM & AUTHORIZED ACCESS CARD */}
        <section className="flex flex-1 flex-col items-center justify-center bg-[#F4F7FB] px-4 py-4 sm:px-8 overflow-y-auto">
          <div className="w-full max-w-[430px] flex flex-col items-center my-auto py-2">
            {/* White Sign-in Card */}
            <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
              {/* Header: SECURE ACCESS with Cyan/Blue horizontal line */}
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#0066cc] uppercase">
                <span className="flex items-center gap-1">
                  <Lock size={12} className="text-[#0066cc]" />
                  Secure Access
                </span>
                <span className="h-[1.5px] w-24 bg-[#66a3e0]/50 rounded-full" />
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-[23px] sm:text-[25px] font-bold text-slate-800 tracking-tight leading-snug">
                Welcome to <span className="text-[#1976D2]">RakshaPath</span>
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-normal leading-relaxed">
                Sign in to access road safety intelligence and decision tools.
              </p>

              {/* Error / Notice Banners */}
              {error && (
                <div role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs font-medium text-red-700">
                  {error}
                </div>
              )}
              {notice && (
                <div role="status" className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-2.5 text-xs font-medium text-blue-700">
                  {notice}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5" noValidate>
                <div>
                  <label htmlFor="login-email" className="mb-1 block text-xs font-semibold text-slate-700">
                    Email Address
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
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="mb-1 block text-xs font-semibold text-slate-700">
                    Password
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
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2]"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-300 accent-[#1976D2]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setNotice("Please contact your department administrator to reset your credentials.")}
                    className="font-medium text-[#1976D2] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1976D2] text-xs sm:text-sm font-semibold text-white transition hover:bg-[#1565C0] active:bg-[#0D47A1] disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

              {/* OR Divider */}
              <div className="my-3.5 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                <span className="h-px flex-1 bg-slate-200" />
                OR
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={() => setNotice("Single Sign-On (SSO) with Google Workspace is restricted to authorized departments.")}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:bg-slate-100"
              >
                <GoogleGlyph />
                Continue with Google
              </button>

              {/* Create an account link */}
              <p className="mt-4 text-center text-xs text-slate-500 font-normal">
                New to RakshaPath?{" "}
                <Link to="/signup" className="font-semibold text-[#1976D2] hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            {/* Blue Notice Box: Authorized access only */}
            <div className="mt-3.5 w-full rounded-xl border border-[#D3E3F8] bg-[#EBF3FC] p-3.5 flex items-start gap-2.5 text-slate-700">
              <div className="mt-0.5 shrink-0">
                <ShieldCheck size={18} className="text-[#1976D2]" />
              </div>
              <div className="leading-snug">
                <p className="text-xs font-bold text-slate-900">Authorized access only</p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  This system is for authorized users from Government Departments, Traffic Police, Road Safety Authorities, Researchers and other permitted users.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          BOTTOM FOOTER BAR
          ========================================================================= */}
      <footer className="flex h-11 shrink-0 items-center justify-between border-t border-slate-200/90 bg-white px-4 sm:px-8 text-[11px] text-slate-500 z-20">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="hover:text-slate-800 cursor-pointer">About</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Terms of Use</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Accessibility</span>
          <span className="text-slate-300">|</span>
          <span className="hover:text-slate-800 cursor-pointer">Contact Us</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-slate-600 font-normal">
            A Safer India Initiative <span className="text-slate-300 mx-1">|</span> Made for a Better Tomorrow
          </span>
          <TricolorWave className="h-4 w-6" />
        </div>
      </footer>
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
