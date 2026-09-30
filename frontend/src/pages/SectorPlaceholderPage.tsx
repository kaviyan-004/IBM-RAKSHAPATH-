import type { LucideIcon } from "lucide-react";
import { Clock, Cpu, ShieldCheck } from "lucide-react";
import AshokaEmblem from "@/components/AshokaEmblem";

interface SectorPlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function SectorPlaceholderPage({ title, description, icon: Icon }: SectorPlaceholderPageProps) {
  return (
    <div className="space-y-6">
      {/* Official Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <AshokaEmblem className="h-8 w-auto text-[#0B3B60]" />
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
              MoRTH Technical & Engineering Wing • NIC Digital Platform
            </span>
            <h1 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h1>
          </div>
        </div>
      </div>

      {/* Docket Card */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-16 text-center shadow-2xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-[#0B3B60] shadow-2xs">
          <Icon size={26} />
        </div>
        <h2 className="mt-4 text-base font-bold text-slate-900">{title}</h2>
        <p className="mt-2 max-w-lg text-xs leading-relaxed text-slate-600">{description}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900">
            <Clock size={12} /> Under Staging Deployment (Phase-II Implementation)
          </span>
          <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">
            <Cpu size={12} /> Model Standard: IRC:SP:88-2019
          </span>
        </div>

        <p className="mt-4 text-[10.5px] text-slate-400">
          Authorized for Coimbatore District Jurisdiction • National Road Safety Council
        </p>
      </div>
    </div>
  );
}

