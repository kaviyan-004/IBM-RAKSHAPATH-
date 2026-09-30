import { Link } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Flag,
  Map,
  Megaphone,
  PhoneCall,
  Route,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import AshokaEmblem from "@/components/AshokaEmblem";
import Loader from "@/components/Loader";
import RiskBadge from "@/components/RiskBadge";
import { useLocationsWithRisk } from "@/hooks/useLocationsWithRisk";
import { useLanguage } from "@/context/LanguageContext";

export default function PublicHomePage() {
  const { locations, loading } = useLocationsWithRisk();
  const { t } = useLanguage();
  const topRisk = locations.slice(0, 4);

  return (
    <div className="space-y-6 select-none">
      {/* 1. Official Ministry Citizen Banner */}
      <div className="relative overflow-hidden rounded-lg border border-[#0B3B60]/20 bg-gradient-to-r from-[#0B3B60] via-[#0D4B7A] to-[#0B3B60] p-6 text-white shadow-sm">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-300 uppercase">
              <AshokaEmblem className="h-5 w-auto text-amber-300" />
              <span>{t.ministryName} • {t.govOfIndia}</span>
            </div>
            <h1 className="text-xl font-bold sm:text-2xl">
              {t.citizenPortalTitle}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-blue-100 sm:text-sm">
              {t.citizenPortalDesc}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                to="/report-hazard"
                className="inline-flex items-center gap-2 rounded bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-amber-700"
              >
                <Flag size={14} />
                {t.reportHazardBtn}
              </Link>
              <Link
                to="/safety-map"
                className="inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xs transition hover:bg-white/20"
              >
                <Map size={14} />
                {t.exploreMapBtn}
              </Link>
            </div>
          </div>

          <div className="hidden rounded-lg border border-white/15 bg-white/5 p-4 text-center backdrop-blur-xs md:block">
            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
              {t.nationalPortalStandard}
            </span>
            <p className="mt-1 text-lg font-black tracking-tight text-white">{t.visionZero}</p>
            <p className="text-[10px] text-blue-200">Zero Fatalities on Indian Highways</p>
            <div className="mt-2.5 inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
              <ShieldCheck size={12} /> {t.securePortal}
            </div>
          </div>
        </div>
      </div>

      {/* 1.5 Live Highway Safety Advisory Moving Marquee Banner */}
      <div className="flex items-center overflow-hidden rounded-lg border border-amber-300/80 bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 p-2.5 shadow-2xs text-xs">
        <div className="flex shrink-0 items-center gap-1.5 font-bold text-amber-900 bg-amber-100/90 rounded px-2.5 py-1 text-[11px] uppercase tracking-wider border border-amber-300 z-10">
          <Megaphone size={13} className="text-amber-700 animate-pulse" />
          <span>MoRTH Live Advisory</span>
        </div>
        <div className="ml-3 flex-1 overflow-hidden relative">
          <div
            className="animate-marquee whitespace-nowrap text-amber-950 font-medium text-[11.5px] cursor-pointer"
            title="Hover to pause moving advisory"
          >
            <span className="inline-block px-4 font-semibold text-red-900">
              🚨 Speed Advisory: NH-544 / NH-48 Radar Speed Enforcement strictly active (100 km/h Cars, 80 km/h Heavy Vehicles).
            </span>
            <span className="inline-block px-3 text-amber-400">|</span>
            <span className="inline-block px-4 font-semibold text-amber-950">
              ⚠️ Thoppur Ghat & Valparai Section: Descent speed capped at 40 km/h. Runaway truck arrester beds fully operational.
            </span>
            <span className="inline-block px-3 text-amber-400">|</span>
            <span className="inline-block px-4 font-semibold text-blue-900">
              🛠️ Citizen Alert: Report road potholes, missing streetlights, or hazardous intersections directly for 48-hour DRSC inspection.
            </span>
            <span className="inline-block px-3 text-amber-400">|</span>
            <span className="inline-block px-4 font-semibold text-emerald-900">
              📞 24x7 National Highway Emergency Ambulance & Towing Helpline: Toll-Free 1033.
            </span>
            <span className="inline-block px-3 text-amber-400">★</span>

            {/* Seamless 0% to -50% loop duplicate */}
            <span className="inline-block px-4 font-semibold text-red-900">
              🚨 Speed Advisory: NH-544 / NH-48 Radar Speed Enforcement strictly active (100 km/h Cars, 80 km/h Heavy Vehicles).
            </span>
            <span className="inline-block px-3 text-amber-400">|</span>
            <span className="inline-block px-4 font-semibold text-amber-950">
              ⚠️ Thoppur Ghat & Valparai Section: Descent speed capped at 40 km/h. Runaway truck arrester beds fully operational.
            </span>
            <span className="inline-block px-3 text-amber-400">|</span>
            <span className="inline-block px-4 font-semibold text-blue-900">
              🛠️ Citizen Alert: Report road potholes, missing streetlights, or hazardous intersections directly for 48-hour DRSC inspection.
            </span>
            <span className="inline-block px-3 text-amber-400">|</span>
            <span className="inline-block px-4 font-semibold text-emerald-900">
              📞 24x7 National Highway Emergency Ambulance & Towing Helpline: Toll-Free 1033.
            </span>
            <span className="inline-block px-3 text-amber-400">★</span>
          </div>
        </div>
      </div>

      {/* 2. Quick Citizen Services Grid - Even Height Aligned Cards */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide text-slate-800 uppercase">
            {t.citizenServicesHeading}
          </h2>
          <span className="text-xs text-slate-500">{t.citizenServicesSub}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          <Link
            to="/safety-map"
            className="group flex flex-col justify-between rounded-lg border border-slate-200 border-t-4 border-t-[#0B3B60] bg-white p-4 shadow-2xs transition hover:border-slate-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-800">
                  {t.safetyMapCardTitle}
                </h3>
                <Map size={18} className="text-[#0B3B60] shrink-0" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {t.safetyMapCardDesc}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0B3B60]">
              <span>{t.viewDetails}</span>
              <ChevronRight size={13} className="transition group-hover:translate-x-0.5" />
            </div>
          </Link>

          <Link
            to="/report-hazard"
            className="group flex flex-col justify-between rounded-lg border border-slate-200 border-t-4 border-t-red-600 bg-white p-4 shadow-2xs transition hover:border-slate-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-700">
                  {t.reportHazardCardTitle}
                </h3>
                <Flag size={18} className="text-red-600 shrink-0" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {t.reportHazardCardDesc}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-700">
              <span>{t.reportHazardBtn}</span>
              <ChevronRight size={13} className="transition group-hover:translate-x-0.5" />
            </div>
          </Link>

          <Link
            to="/safer-routes"
            className="group flex flex-col justify-between rounded-lg border border-slate-200 border-t-4 border-t-emerald-600 bg-white p-4 shadow-2xs transition hover:border-slate-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">
                  {t.saferRoutesCardTitle}
                </h3>
                <Route size={18} className="text-emerald-700 shrink-0" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {t.saferRoutesCardDesc}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-800">
              <span>{t.navSaferRoutes}</span>
              <ChevronRight size={13} className="transition group-hover:translate-x-0.5" />
            </div>
          </Link>

          <Link
            to="/safety-updates"
            className="group flex flex-col justify-between rounded-lg border border-slate-200 border-t-4 border-t-amber-500 bg-white p-4 shadow-2xs transition hover:border-slate-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800">
                  {t.safetyBulletinsCardTitle}
                </h3>
                <Megaphone size={18} className="text-amber-700 shrink-0" />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {t.safetyBulletinsCardDesc}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-800">
              <span>{t.navSafetyUpdates}</span>
              <ChevronRight size={13} className="transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Official MoRTH Blackspots List & Emergency Quick-Dial */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Blackspots list */}
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldAlert size={17} className="text-red-600" />
                उच्च जोखिम वाले स्थल / Priority Blackspots in Coimbatore
              </h2>
              <p className="text-xs text-slate-500">
                MoRTH Protocol Identified High-Accident Zones requiring caution
              </p>
            </div>
            <Link to="/safety-map" className="text-xs font-bold text-[#0B3B60] hover:underline">
              View All 24 Blackspots →
            </Link>
          </div>

          {loading ? (
            <Loader label="Loading official hazard register..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase">
                    <th className="py-2.5 px-3">Location & Jurisdiction</th>
                    <th className="py-2.5 px-3">Road Category</th>
                    <th className="py-2.5 px-3">Risk Assessment</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {topRisk.map((loc) => (
                    <tr key={loc.locationId} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900">{loc.name}</p>
                        <p className="text-[10.5px] text-slate-400">
                          {loc.district}, {loc.state} • PS Jurisdiction: East Coimbatore
                        </p>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] font-semibold text-slate-600">
                        {loc.locationId.includes("1") ? "NH-544 (National Highway)" : "SH-17 (State Highway)"}
                      </td>
                      <td className="py-3 px-3">
                        <RiskBadge level={loc.risk.level} showCategory />
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          to="/report-hazard"
                          className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Report Defect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 1 Col: Emergency Helplines & Safe Driving Rules */}
        <div className="space-y-4">
          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 shadow-2xs">
            <h3 className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wide">
              <PhoneCall size={14} className="text-red-700" />
              आपातकालीन हेल्पलाइन / 24x7 Emergency Helplines
            </h3>
            <p className="mt-1 text-[11px] text-red-700">Toll-free emergency numbers for Indian highways</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded bg-white p-2 text-xs border border-red-100 shadow-2xs">
                <div>
                  <p className="font-bold text-slate-900">1033</p>
                  <p className="text-[10px] text-slate-500">NHAI Highway Emergency & Crane Support</p>
                </div>
                <a href="tel:1033" className="rounded bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-red-700">
                  Call
                </a>
              </div>
              <div className="flex items-center justify-between rounded bg-white p-2 text-xs border border-red-100 shadow-2xs">
                <div>
                  <p className="font-bold text-slate-900">112</p>
                  <p className="text-[10px] text-slate-500">National Emergency Response (Police / Fire)</p>
                </div>
                <a href="tel:112" className="rounded bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-red-700">
                  Call
                </a>
              </div>
              <div className="flex items-center justify-between rounded bg-white p-2 text-xs border border-red-100 shadow-2xs">
                <div>
                  <p className="font-bold text-slate-900">108</p>
                  <p className="text-[10px] text-slate-500">Free Medical Ambulance Service</p>
                </div>
                <a href="tel:108" className="rounded bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-red-700">
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-2xs">
            <h3 className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide">
              <Award size={14} className="text-amber-600" />
              सड़क सुरक्षा नियम / 5 Golden Rules
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Always wear certified BIS helmets on two-wheelers & seatbelts in cars.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Never use mobile phones while operating any motor vehicle.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Maintain designated speed limits on NH-544 (Max 80 km/h in urban stretch).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Give uninterrupted right of way to emergency ambulances.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

