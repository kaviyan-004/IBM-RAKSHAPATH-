import { ShieldCheck } from "lucide-react";
import AshokaEmblem from "@/components/AshokaEmblem";
import { useLanguage } from "@/context/LanguageContext";

export default function GovFooter() {
  const { t } = useLanguage();
  return (
    <footer className="shrink-0 border-t border-slate-300 bg-[#0B2540] text-slate-300 select-none">
      {/* Upper Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Portal Overview */}
          <div>
            <div className="flex items-center gap-2 text-white">
              <AshokaEmblem className="h-8 w-auto text-amber-400" />
              <div>
                <p className="text-sm font-bold leading-tight">RakshaPath | रक्षापथ</p>
                <p className="text-[11px] text-slate-400">National Road Safety Decision System</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              An AI-driven initiative under the Ministry of Road Transport and Highways (MoRTH), Government of India, for blackspot eradication and proactive citizen road safety.
            </p>
          </div>

          {/* Col 2: Useful Government Links */}
          <div className="text-xs">
            <h4 className="font-bold tracking-wider text-white uppercase">Official Portals</h4>
            <ul className="mt-3 space-y-1.5 text-slate-300">
              <li>
                <a href="https://morth.nic.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 hover:underline">
                  Ministry of Road Transport & Highways (MoRTH) ↗
                </a>
              </li>
              <li>
                <a href="https://parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 hover:underline">
                  Parivahan Sewa Portal ↗
                </a>
              </li>
              <li>
                <a href="https://nhai.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 hover:underline">
                  National Highways Authority of India (NHAI) ↗
                </a>
              </li>
              <li>
                <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 hover:underline">
                  National Portal of India (india.gov.in) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: GIGW Policies */}
          <div className="text-xs">
            <h4 className="font-bold tracking-wider text-white uppercase">Policies & Guidelines</h4>
            <ul className="mt-3 space-y-1.5 text-slate-300">
              <li><span className="cursor-pointer hover:text-amber-400 hover:underline">Terms & Conditions</span></li>
              <li><span className="cursor-pointer hover:text-amber-400 hover:underline">Privacy & Data Policy</span></li>
              <li><span className="cursor-pointer hover:text-amber-400 hover:underline">Hyperlinking Policy</span></li>
              <li><span className="cursor-pointer hover:text-amber-400 hover:underline">Copyright & Content Policy</span></li>
              <li><span className="cursor-pointer hover:text-amber-400 hover:underline">Citizen Grievance Redressal (CPGRAMS)</span></li>
            </ul>
          </div>

          {/* Col 4: Compliance & Badges */}
          <div className="text-xs">
            <h4 className="font-bold tracking-wider text-white uppercase">Compliance & Security</h4>
            <div className="mt-3 space-y-2 text-slate-400">
              <div className="flex items-center gap-2 rounded bg-[#071829] p-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>GIGW 3.0 Standard Compliant</span>
              </div>
              <p className="text-[11px]">
                Hosted on secure National Informatics Centre (NIC) Cloud Infrastructure.
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span>Total Page Visits: <strong className="text-white">1,482,920</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Disclaimer & Attribution Bar */}
        <div className="mt-6 border-t border-slate-700/80 pt-4 text-center text-[11px] text-slate-400 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>
            Content Owned, Maintained and Updated by <strong>{t.ministryName}, {t.govOfIndia}</strong>.
          </p>
          <p className="mt-2 sm:mt-0">
            {t.hostedBy} | {t.viksitBharat}
          </p>
        </div>
      </div>

      {/* Bottom Tricolor Accent */}
      <div className="tricolor-stripe w-full" />
    </footer>
  );
}
