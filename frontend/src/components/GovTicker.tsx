import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function GovTicker() {
  const { language } = useLanguage();

  const advisories: Record<string, { badge: string; items: string[]; linkText: string }> = {
    en: {
      badge: "National Advisory:",
      items: [
        "[MoRTH Bulletin] Road Safety Month 2026 active across NH-544 & NH-48 National Highway corridors.",
        "Special engineering audit underway at Peelamedu, RS Puram, and Thoppur Ghat blackspots.",
        "Citizens may report hazardous road stretches directly via the Citizen Grievance Portal.",
        "24x7 National Highway Ambulance & Breakdown Assistance: Dial Toll-Free 1033.",
      ],
      linkText: "View All Bulletins →",
    },
    hi: {
      badge: "राष्ट्रीय सूचना:",
      items: [
        "[सड़क परिवहन मंत्रालय बुलेटिन] NH-544 एवं NH-48 राष्ट्रीय राजमार्ग गलियारों पर सड़क सुरक्षा माह 2026 सक्रिय।",
        "पीलामेडू, आर.एस. पुरम और थोप्पूर घाट ब्लैकस्पॉट पर विशेष तकनीकी सुरक्षा ऑडिट जारी।",
        "नागरिक सीधे सड़क शिकायत निवारण पोर्टल से गड्ढों व समस्याओं की सूचना दर्ज करें।",
        "24x7 राष्ट्रीय राजमार्ग एम्बुलेंस व क्रेन सहायता: टोल-फ्री 1033 डायल करें।",
      ],
      linkText: "सभी परिपत्र देखें →",
    },
    ta: {
      badge: "தேசிய அறிவிப்பு:",
      items: [
        "[மத்திய நெடுஞ்சாலை அமைச்சக சுற்றறிக்கை] NH-544 மற்றும் NH-48 நெடுஞ்சாலைகளில் சாலை பாதுகாப்பு மாதம் 2026 நடைமுறையில் உள்ளது.",
        "பீளமேடு, ஆர்.எஸ். புரம் மற்றும் தொப்பூர் கணவாய் விபத்து பகுதிகளில் சிறப்பு பாதுகாப்பு தணிக்கை நடக்கிறது.",
        "சாலை குறைபாடுகளை பொதுமக்கள் குடிமக்கள் புகார் தளத்தில் நேரடியாக பதிவு செய்யலாம்.",
        "24 மணி நேர தேசிய நெடுஞ்சாலை அவசர உதவி & ஆம்புலன்ஸ் சேவை: 1033 என்ற எண்ணை அழைக்கவும்.",
      ],
      linkText: "அனைத்து சுற்றறிக்கைகள் →",
    },
  };

  const current = advisories[language] || advisories.en;
  const advisoryTickerText = current.items.join("   ★   ");

  return (
    <div className="flex h-8 items-center overflow-hidden border-y border-amber-200 bg-amber-50/95 px-4 text-xs select-none">
      <div className="flex shrink-0 items-center gap-1.5 font-bold text-amber-900 border-r border-amber-300/80 pr-2.5 z-10 bg-amber-50/95">
        <Megaphone size={14} className="text-amber-700 animate-pulse" />
        <span className="uppercase tracking-wider text-[11px]">{current.badge}</span>
      </div>

      {/* Smooth Continuous Moving Marquee */}
      <div className="ml-2.5 flex-1 overflow-hidden relative">
        <div
          className="animate-marquee whitespace-nowrap text-amber-950 text-[11px] sm:text-xs font-medium cursor-pointer py-0.5"
          title="Hover to pause marquee"
        >
          <span className="inline-block px-6">{advisoryTickerText}</span>
          <span className="inline-block px-4 text-amber-400">★</span>
          <span className="inline-block px-6">{advisoryTickerText}</span>
          <span className="inline-block px-4 text-amber-400">★</span>
        </div>
      </div>

      <div className="hidden shrink-0 items-center gap-3 sm:flex z-10 pl-2 bg-amber-50/95 border-l border-amber-300/80">
        <Link to="/safety-updates" className="text-[11px] font-bold text-blue-800 hover:underline">
          {current.linkText}
        </Link>
      </div>
    </div>
  );
}
