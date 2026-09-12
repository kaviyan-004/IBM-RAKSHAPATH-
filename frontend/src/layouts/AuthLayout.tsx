import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Building2,
  HelpCircle,
  Leaf,
  Users,
} from "lucide-react";

export default function AuthLayout() {
  const [fontScale, setFontScale] = useState<"small" | "normal" | "large">("normal");

  const scaleMultiplier =
    fontScale === "small" ? "text-[0.93rem]" : fontScale === "large" ? "text-[1.05rem]" : "text-[1rem]";

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

          <div className="flex items-center gap-1 text-xs font-normal text-slate-700 cursor-pointer hover:text-blue-600 transition">
            <HelpCircle size={14} className="text-slate-600" />
            <span>Help</span>
          </div>

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
          MAIN BODY: 2-COLUMN SPLIT (HERO ON LEFT, FORM ON RIGHT)
          ========================================================================= */}
      <main className="flex flex-1 min-h-0 w-full flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: HERO IMAGE & 4 PILLARS OVERLAY BAR */}
        <section className="relative hidden lg:flex lg:w-[54%] xl:w-[55%] h-full overflow-hidden bg-slate-900 select-none">
          <img
            src="/login-hero.png"
            alt="RakshaPath — AI-Powered Road Safety Decision Intelligence Platform"
            className="h-full w-full object-cover object-left-top"
          />

          {/* 4 Pillars Bottom Bar */}
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

        {/* RIGHT COLUMN: FORM OUTLET CONTAINER */}
        <section className="flex flex-1 flex-col items-center justify-center bg-[#F4F7FB] px-4 py-4 sm:px-8 overflow-y-auto">
          <div className="w-full max-w-[430px] flex flex-col items-center my-auto py-2">
            <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
              <Outlet />
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

/**
 * State Emblem of India
 */
function AshokaEmblem({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 70" fill="currentColor" className={className} aria-label="State Emblem of India">
      <path d="M22 6c0-2 2-4 4-4h8c2 0 4 2 4 4v4h-16V6z" />
      <path d="M16 10c-2 0-4 2-5 5-1 3-1 7 1 10 1 2 3 3 5 3v-7c0-2 1-4 3-5-2-3-3-4-4-6z" />
      <path d="M26 8c-2 0-3 2-3 4v10h14V12c0-2-1-4-3-4h-8z" />
      <path d="M44 10c2 0 4 2 5 5 1 3 1 7-1 10-1 2-3 3-5 3v-7c0-2-1-4-3-5 2-3 3-4 4-6z" />
      <path d="M20 23c-2 2-3 5-3 8 0 3 2 6 5 7v-15h-2z" />
      <path d="M26 23h8v15h-8V23z" />
      <path d="M40 23c2 2 3 5 3 8 0 3-2 6-5 7v-15h2z" />
      <path d="M12 39h36v5H12z" />
      <circle cx="30" cy="41.5" r="2.2" fill="#fff" />
      <circle cx="30" cy="41.5" r="1.2" fill="currentColor" />
      <circle cx="18" cy="41.5" r="1.2" fill="#fff" />
      <circle cx="42" cy="41.5" r="1.2" fill="#fff" />
      <path d="M16 45c2 4 8 6 14 6s12-2 14-6H16z" />
      <path d="M14 52h32v3H14z" />
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
 * Indian Flag Tricolor Wave
 */
function TricolorWave({ className = "h-5 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" fill="none" className={className} aria-hidden="true">
      <path d="M2 7 C 12 1, 24 12, 38 4 C 34 2, 22 0, 2 7 Z" fill="#FF9933" />
      <path d="M2 9 C 14 3, 25 14, 38 6 C 36 7, 24 15, 2 11 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
      <path d="M2 12 C 14 6, 25 17, 38 9 C 34 14, 20 18, 2 14 Z" fill="#138808" />
    </svg>
  );
}

/**
 * Viksit Bharat Icon
 */
function IndiaOutlineIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l1.2 1.8.8-.4.6.8 1.4.2.2 1.4 1 .6.2 1.2-1 .8.4 1.4-1.2 1.2 1.4 1 .2 1.6-1.2 1.4.2 1.4-1.4 2-1.2 2.6-.8-.2-.8-2.6-1.4-1.2.2-1.6-1.2-1.2.4-1.4-1-.8.2-1.2 1-.6.2-1.4 1.4-.2.6-.8.8.4L12 2z" />
    </svg>
  );
}
