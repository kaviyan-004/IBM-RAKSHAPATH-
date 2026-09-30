import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { Sector } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface SectorDropdownSelectorProps {
  value: Sector;
  onChange: (sector: Sector) => void;
  label?: string;
  variant?: "form" | "compact";
}

/**
 * Official Indian Government Portal Dropdown Selector
 * Designed in the exact style of https://www.india.gov.in (National Portal of India)
 * with a clean bordered box, chevron indicator, and sliding dropdown menu.
 */
export default function SectorSlideSelector({
  value,
  onChange,
  label,
  variant = "form",
}: SectorDropdownSelectorProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sectorOptions: { value: Sector; label: string }[] = [
    { value: "government", label: t.sectorGovernment },
    { value: "technical", label: t.sectorTechnical },
    { value: "public", label: t.sectorPublic },
  ];

  const selectedOption =
    sectorOptions.find((opt) => opt.value === value) || sectorOptions[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (sectorValue: Sector) => {
    onChange(sectorValue);
    setIsOpen(false);
  };

  const isCompact = variant === "compact";

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Optional Form Field Label */}
      {!isCompact && label && (
        <label className="mb-1 block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}

      {/* Main Trigger Box (india.gov.in style) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between bg-white text-left transition outline-none ${
          isCompact
            ? "h-9 rounded-md border border-slate-300 px-3 text-xs font-medium text-slate-800 hover:border-slate-400"
            : "h-11 rounded-lg border-2 border-slate-800 px-3.5 text-sm font-medium text-slate-900 shadow-2xs hover:border-[#1963bd] focus:border-[#1963bd]"
        } ${isOpen ? "border-[#1963bd] ring-1 ring-[#1963bd]" : ""}`}
      >
        <span className="truncate font-semibold text-slate-800">
          {selectedOption.label}
        </span>
        <ChevronDown
          size={isCompact ? 14 : 17}
          className={`shrink-0 text-slate-600 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#1963bd]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu (Sliding down directly below the box like india.gov.in) */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-md border border-slate-300 bg-white shadow-lg transition-all duration-150 animate-in fade-in slide-in-from-top-1`}
        >
          <ul className="divide-y divide-slate-100 py-0 text-xs sm:text-sm">
            {sectorOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left transition ${
                      isSelected
                        ? "bg-[#1963bd] font-bold text-white"
                        : "text-slate-700 hover:bg-[#f2f7fd] hover:text-[#0A274B]"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={15} className="text-white shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
