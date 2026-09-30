import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, PhoneCall, ShieldAlert, Sparkles } from "lucide-react";
import AshokaEmblem from "@/components/AshokaEmblem";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";
import { SECTOR_LABELS, sectorLandingPath } from "@/navigation/sectorNavigation";
import type { Sector } from "@/types";
import SectorSlideSelector from "@/components/SectorSlideSelector";

interface GovHeaderBarProps {
  fontScale: "small" | "normal" | "large";
  setFontScale: (scale: "small" | "normal" | "large") => void;
}

export default function GovHeaderBar({ fontScale, setFontScale }: GovHeaderBarProps) {
  const { sector, setSector } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      };
      setCurrentDateTime(new Intl.DateTimeFormat("en-IN", options).format(now) + " IST");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSectorSwitch = (newSector: Sector) => {
    setSector(newSector);
    navigate(sectorLandingPath(newSector));
  };

  return (
    <div className="w-full shrink-0 select-none border-b border-slate-200 bg-white shadow-xs">
      {/* 1. Indian Tricolor Ribbon Strip */}
      <div className="tricolor-stripe w-full" />

      {/* 2. Top GIGW Utility Strip */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-[#f8fafc] px-3 py-1 text-[11px] text-slate-600 sm:px-6">
        {/* Left: Ministry & Govt of India identity */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">{t.govOfIndia}</span>
          <span className="text-slate-300">|</span>
          <span className="hidden text-slate-600 sm:inline">{t.ministryName}</span>
        </div>

        {/* Right: Helpline, Font Resizing, Language, Clock */}
        <div className="flex items-center gap-3">
          {/* Emergency helpline badge */}
          <div className="hidden items-center gap-1.5 rounded-sm bg-red-50 px-2 py-0.5 text-red-700 sm:flex">
            <PhoneCall size={11} className="text-red-600" />
            <span className="font-bold">1033 (NHAI)</span>
            <span className="text-slate-300">|</span>
            <span>{t.emergency112}</span>
          </div>

          <span className="hidden text-slate-300 sm:inline">|</span>

          {/* Font Resize Accessibility */}
          <div className="flex items-center gap-1 font-semibold text-slate-700" title="Text Resizing (GIGW Accessibility)">
            <button
              type="button"
              onClick={() => setFontScale("small")}
              className={`px-1 hover:text-blue-700 ${fontScale === "small" ? "font-bold text-blue-700 underline" : ""}`}
              aria-label="Decrease text size"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontScale("normal")}
              className={`px-1 hover:text-blue-700 ${fontScale === "normal" ? "font-bold text-blue-700 underline" : ""}`}
              aria-label="Normal text size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontScale("large")}
              className={`px-1 hover:text-blue-700 ${fontScale === "large" ? "font-bold text-blue-700 underline" : ""}`}
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          <span className="text-slate-300">|</span>

          {/* Language toggle */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
            <Globe size={11} className="text-slate-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="cursor-pointer bg-transparent text-[11px] font-bold text-slate-800 outline-none hover:text-blue-800"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          <span className="hidden text-slate-300 md:inline">|</span>

          {/* Live Date-Time */}
          <span className="hidden font-mono text-[10.5px] text-slate-500 md:inline">
            {currentDateTime}
          </span>
        </div>
      </div>

      {/* 3. Main Official Header Bar */}
      <div className="flex items-center justify-between px-3 py-2.5 sm:px-6">
        {/* Left: Ashoka Emblem + Bilingual Portal Title */}
        <div className="flex items-center gap-3">
          <AshokaEmblem className="h-10 w-auto text-slate-900 drop-shadow-xs" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-[#0B3B60] sm:text-lg">
                रक्षापथ <span className="text-slate-400 font-light">|</span> RakshaPath
              </span>
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-900 uppercase">
                GOI PORTAL
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-600 sm:text-xs">
              {t.portalSubtitle}
            </p>
            <p className="hidden text-[10px] text-slate-400 sm:block">
              {t.ministryName}, {t.govOfIndia}
            </p>
          </div>
        </div>

        {/* Right: Sector Switcher Sliding Bar & Digital India mark */}
        <div className="flex items-center gap-3">
          {/* Sector dropdown selector */}
          {sector && (
            <div className="w-[155px] sm:w-[175px]">
              <SectorSlideSelector
                value={sector}
                onChange={handleSectorSwitch}
                variant="compact"
              />
            </div>
          )}

          {/* Digital India Badge / Motto */}
          <div className="hidden flex-col items-end text-right lg:flex">
            <span className="text-[11px] font-extrabold tracking-wider text-orange-600 uppercase">
              Digital India
            </span>
            <span className="text-[10px] text-slate-500">Power to Empower</span>
          </div>
        </div>
      </div>
    </div>
  );
}
