import { useState } from "react";
import {
  AlertCircle,
  Calendar,
  Download,
  ExternalLink,
  FileCheck,
  FileText,
  Filter,
  Megaphone,
  Search,
  Shield,
} from "lucide-react";
import AshokaEmblem from "@/components/AshokaEmblem";
import { useLanguage } from "@/context/LanguageContext";

interface BulletinItem {
  id: string;
  orderNumber: string;
  title: string;
  hindiTitle: string;
  category: "Gazette Notification" | "Speed Limit Order" | "Blackspot Rectification" | "Weather Warning";
  date: string;
  issuingAuthority: string;
  summary: string;
  fileSize: string;
}

const BULLETINS: BulletinItem[] = [
  {
    id: "morth-ord-2026-04",
    orderNumber: "MoRTH/RS-2026/TN-CB/412",
    title: "Revision of Maximum Permissible Speed Limits on NH-544 (Avinashi Corridor)",
    hindiTitle: "राष्ट्रीय राजमार्ग 544 पर अधिकतम गति सीमा का संशोधन",
    category: "Speed Limit Order",
    date: "08-Sep-2026",
    issuingAuthority: "Ministry of Road Transport and Highways (MoRTH), New Delhi",
    summary:
      "Designated maximum speed limit revised to 80 km/h for four-wheelers and 60 km/h for heavy commercial vehicles on the Peelamedu - Karumathampatti stretch under Section 112 of the Motor Vehicles Act, 1988.",
    fileSize: "PDF (420 KB)",
  },
  {
    id: "drsc-circ-2026-19",
    orderNumber: "DRSC/CBE/MINUTES/2026-08",
    title: "District Road Safety Committee (DRSC) Monthly Review & Blackspot Clearance Status",
    hindiTitle: "जिला सड़क सुरक्षा समिति मासिक समीक्षा बैठक एवं ब्लैकस्पॉट निवारण",
    category: "Blackspot Rectification",
    date: "01-Sep-2026",
    issuingAuthority: "District Collectorate, Coimbatore, Govt. of Tamil Nadu",
    summary:
      "Action taken report on 14 identified blackspots. Rs. 4.2 Crore sanctioned for pedestrian subways, rumble strips, and illuminated cat-eyes at RS Puram Crossing and Saravanampatti Junction.",
    fileSize: "PDF (1.2 MB)",
  },
  {
    id: "imd-morth-adv-2026-02",
    orderNumber: "IMD-MoRTH/CLIM-HAZ/2026-09",
    title: "Monsoon Road Safety Advisory & Ghat Section Restrictions (Pollachi - Valparai SH-78)",
    hindiTitle: "मानसून सड़क सुरक्षा परामर्श एवं घाट खंड यातायात प्रतिबंध",
    category: "Weather Warning",
    date: "28-Aug-2026",
    issuingAuthority: "Joint Disaster Management Cell & Highway Patrol, Coimbatore",
    summary:
      "Precautionary speed reduction and restriction of heavy multi-axle freight vehicles during night hours (20:00 - 06:00) due to localized landslide vulnerability and reduced visibility.",
    fileSize: "PDF (310 KB)",
  },
  {
    id: "morth-gaz-2026-01",
    orderNumber: "EXTRAORDINARY-PART-II-SEC-3(i)",
    title: "Mandatory Automatic Emergency Braking & Blind Spot Detection Systems for Commercial Fleets",
    hindiTitle: "व्यावसायिक वाहनों के लिए स्वचालित आपातकालीन ब्रेकिंग एवं सुरक्षा मानक",
    category: "Gazette Notification",
    date: "15-Aug-2026",
    issuingAuthority: "The Gazette of India, Published by Authority",
    summary:
      "Central Motor Vehicles (Fifth Amendment) Rules, 2026 mandating advanced driver assistance safety standards across all M2 and M3 category commercial transport vehicles registered from October 2026.",
    fileSize: "PDF (850 KB)",
  },
];

export default function SafetyUpdatesPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filtered = BULLETINS.filter((b) => {
    const matchesFilter = filter === "all" || b.category === filter;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.summary.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <AshokaEmblem className="h-9 w-auto text-[#0B3B60]" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                  {t.bulletinsHeaderTitle}
                </h1>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-900 uppercase">
                  Official Gazette
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {t.bulletinsHeaderDesc}
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span>Authentication: <strong>Digital India Certified</strong></span>
            <p className="text-amber-800 font-semibold">Government of India e-Gazette System</p>
          </div>
        </div>

        {/* Filter and search */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "All Bulletins (सभी परिपत्र)" },
              { id: "Speed Limit Order", label: "Speed Limit Orders" },
              { id: "Blackspot Rectification", label: "Blackspot Works" },
              { id: "Weather Warning", label: "Weather Warnings" },
              { id: "Gazette Notification", label: "Gazette Notifications" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`rounded px-3 py-1.5 font-semibold transition ${
                  filter === cat.id
                    ? "bg-[#0B3B60] text-white shadow-2xs"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search circulars, order numbers..."
              className="rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-700"
            />
          </div>
        </div>
      </div>

      {/* Bulletin List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 border-l-4 border-l-[#0B3B60] bg-white p-5 shadow-2xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0B3B60] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {item.orderNumber}
                </span>
                <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={13} className="text-slate-400" />
                <span>Date of Issue: <strong>{item.date}</strong></span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#0B3B60]">{item.hindiTitle}</p>
              <h2 className="text-sm font-bold text-slate-900 sm:text-base mt-0.5">{item.title}</h2>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Issuing Wing: {item.issuingAuthority}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-slate-700 bg-slate-50 p-3 rounded border border-slate-100">
              {item.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
              <span className="text-[11px] text-slate-400">Verified by National Road Safety Council Secretariate</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert(`Downloading official notification ${item.orderNumber} (${item.fileSize})`)}
                  className="inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
                >
                  <Download size={13} />
                  Download Official Order ({item.fileSize})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
