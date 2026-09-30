import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SupportedLanguage = "en" | "hi" | "ta";

export interface TranslationDictionary {
  // Brand & Identity
  portalTitle: string;
  portalSubtitle: string;
  govOfIndia: string;
  ministryName: string;
  nationalPortalStandard: string;
  emergencyHelpline: string;
  emergency112: string;
  visionZero: string;
  viksitBharat: string;
  nicCredit: string;
  securePortal: string;

  // Sectors
  sectorGovernment: string;
  sectorTechnical: string;
  sectorPublic: string;
  chooseSector: string;
  sectorGovernmentDesc: string;
  sectorTechnicalDesc: string;
  sectorPublicDesc: string;
  wingAdmin: string;
  wingTech: string;
  wingCitizen: string;

  // Navigation Items
  navDashboard: string;
  navRiskMap: string;
  navLocations: string;
  navInterventions: string;
  navBudget: string;
  navReports: string;
  navAlerts: string;
  navSettings: string;
  navHome: string;
  navSafetyMap: string;
  navSaferRoutes: string;
  navReportHazard: string;
  navSafetyUpdates: string;
  navProfile: string;
  navDiagnostics: string;
  navFieldVerification: string;
  navRiskForecast: string;

  // Topbar & Common
  jurisdictionLabel: string;
  searchPlaceholder: string;
  roleCitizen: string;
  roleEngineer: string;
  roleOfficer: string;

  // Actions
  signIn: string;
  signingIn: string;
  reportHazardBtn: string;
  exploreMapBtn: string;
  searchBtn: string;
  filterAll: string;
  filterCritical: string;
  filterHigh: string;
  filterModerate: string;
  filterLow: string;
  viewDetails: string;
  openFullMap: string;

  // Dashboard Stats
  totalLocationsAnalyzed: string;
  highRiskLocations: string;
  emergingRiskLocations: string;
  interventionsPending: string;
  currentSafetyBudget: string;
  districtRiskOverview: string;
  topPriorityLocations: string;
  lastAuditSync: string;
  liveTelemetry: string;

  // Citizen Page
  citizenPortalTitle: string;
  citizenPortalDesc: string;
  citizenServicesHeading: string;
  citizenServicesSub: string;
  safetyMapCardTitle: string;
  safetyMapCardDesc: string;
  reportHazardCardTitle: string;
  reportHazardCardDesc: string;
  saferRoutesCardTitle: string;
  saferRoutesCardDesc: string;
  safetyBulletinsCardTitle: string;
  safetyBulletinsCardDesc: string;
  emergencyTitle: string;
  emergencyDesc: string;

  // Citizen Forms & Advisories
  lodgeGrievanceTab: string;
  trackGrievanceTab: string;
  reportHazardHeaderTitle: string;
  reportHazardHeaderDesc: string;
  submitGrievanceBtn: string;
  fetchGpsBtn: string;
  safeRoutesHeaderTitle: string;
  safeRoutesHeaderDesc: string;
  evaluateRouteBtn: string;
  bulletinsHeaderTitle: string;
  bulletinsHeaderDesc: string;
  markAllAsReadBtn: string;
  alertsHeaderTitle: string;
  alertsHeaderDesc: string;

  // Footer
  about: string;
  privacyPolicy: string;
  termsOfUse: string;
  accessibility: string;
  help: string;
  hostedBy: string;
}

const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    portalTitle: "RakshaPath",
    portalSubtitle: "National Road Safety Decision Support & Citizen Road Safety System",
    govOfIndia: "Government of India",
    ministryName: "Ministry of Road Transport & Highways",
    nationalPortalStandard: "National Portal of India Standard",
    emergencyHelpline: "Highway Helpline: 1033 (NHAI)",
    emergency112: "Emergency: 112",
    visionZero: "VISION ZERO 2030",
    viksitBharat: "Viksit Bharat @ 2047",
    nicCredit: "National Informatics Centre (NIC)",
    securePortal: "Secure Portal",

    sectorGovernment: "Government",
    sectorTechnical: "Technical",
    sectorPublic: "Public",
    chooseSector: "Choose Sector",
    sectorGovernmentDesc: "Administration & Law Enforcement",
    sectorTechnicalDesc: "Road Engineering & IRC Audits",
    sectorPublicDesc: "Citizen Grievance & Safe Transit",
    wingAdmin: "Admin Wing",
    wingTech: "Technical Wing",
    wingCitizen: "Citizen Wing",

    navDashboard: "Dashboard",
    navRiskMap: "Risk Map",
    navLocations: "Locations",
    navInterventions: "Interventions",
    navBudget: "Budget Optimizer",
    navReports: "Reports",
    navAlerts: "Alerts",
    navSettings: "Settings",
    navHome: "Citizen Home",
    navSafetyMap: "Safety Map",
    navSaferRoutes: "Safer Routes",
    navReportHazard: "Report Hazard",
    navSafetyUpdates: "Safety Updates",
    navProfile: "Profile & History",
    navDiagnostics: "Location Diagnostics",
    navFieldVerification: "Field Verification",
    navRiskForecast: "Risk Forecast",

    jurisdictionLabel: "Jurisdiction",
    searchPlaceholder: "Search NH/SH, Blackspot Code, or Junction...",
    roleCitizen: "Registered Citizen",
    roleEngineer: "Executive Engineer (PWD/NHAI)",
    roleOfficer: "District Safety Officer (DRSC)",

    signIn: "Sign In",
    signingIn: "Signing in...",
    reportHazardBtn: "Report Hazard",
    exploreMapBtn: "Explore Safety Map",
    searchBtn: "Search",
    filterAll: "All",
    filterCritical: "Critical",
    filterHigh: "High",
    filterModerate: "Moderate",
    filterLow: "Low",
    viewDetails: "View Details",
    openFullMap: "Open full map",

    totalLocationsAnalyzed: "Total Locations Analyzed",
    highRiskLocations: "High-Risk Locations",
    emergingRiskLocations: "Emerging Risk Locations",
    interventionsPending: "Interventions Pending",
    currentSafetyBudget: "Current Safety Budget",
    districtRiskOverview: "District Risk Overview",
    topPriorityLocations: "Top Priority Locations",
    lastAuditSync: "Last Audit Sync",
    liveTelemetry: "Live Telemetry & Police Crash Records Connected",

    citizenPortalTitle: "Citizen Road Safety Portal",
    citizenPortalDesc: "Check real-time road hazard levels, navigate via verified low-risk corridors, and file road defect grievances directly to the District Road Safety Committee.",
    citizenServicesHeading: "Citizen Public Services",
    citizenServicesSub: "Fast Resolution • 24x7 Tracking",
    safetyMapCardTitle: "Safety GIS Map",
    safetyMapCardDesc: "Live color-coded crash risk, blackspots, and ongoing road engineering works.",
    reportHazardCardTitle: "Report Hazard / Grievance",
    reportHazardCardDesc: "File potholes, damaged guardrails, or broken signals with photo & GPS.",
    saferRoutesCardTitle: "Safer Route Navigator",
    saferRoutesCardDesc: "Calculate lowest-risk transit corridors avoiding high-accident zones.",
    safetyBulletinsCardTitle: "Safety Bulletins & Orders",
    safetyBulletinsCardDesc: "Official Gazette notifications, speed limit revisions, and weather alerts.",
    emergencyTitle: "National Highway Emergency Response",
    emergencyDesc: "24x7 Ambulance, Crane, and Patrol on all National & State Highways.",

    // Citizen Forms & Advisories
    lodgeGrievanceTab: "Lodge Hazard / Grievance (शिकायत दर्ज करें)",
    trackGrievanceTab: "Track Grievance Status (स्थिति ट्रैक करें)",
    reportHazardHeaderTitle: "Citizen Road Hazard Grievance & Blackspot Rectification Portal",
    reportHazardHeaderDesc: "Central Road Safety Incident Redressal System — Under MoRTH & NHAI Citizen Charter",
    submitGrievanceBtn: "Submit Grievance to Authority (शिकायत प्रेषित करें)",
    fetchGpsBtn: "Capture Exact GPS Location",
    safeRoutesHeaderTitle: "National Highway Safe Passage Advisory System",
    safeRoutesHeaderDesc: "AI Risk-Avoidance Corridor Planning & Lighting Assessment",
    evaluateRouteBtn: "Evaluate Safe Corridor",
    bulletinsHeaderTitle: "Official Gazette Notifications, Orders & Safety Bulletins",
    bulletinsHeaderDesc: "Ministry Gazette Notifications, DRSC Proceedings & District Road Safety Orders",
    markAllAsReadBtn: "Mark all as read (सब पढ़ें)",
    alertsHeaderTitle: "Road Safety Alert Bulletin",
    alertsHeaderDesc: "Authorized alerts from District Road Safety Committee, Traffic Police & NHAI Control Room",

    about: "About",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    accessibility: "Accessibility Statement",
    help: "Help",
    hostedBy: "Hosted by National Informatics Centre (NIC) | MoRTH",
  },
  hi: {
    portalTitle: "रक्षापथ",
    portalSubtitle: "राष्ट्रीय सड़क सुरक्षा निर्णय समर्थन एवं नागरिक सड़क सुरक्षा प्रणाली",
    govOfIndia: "भारत सरकार",
    ministryName: "सड़क परिवहन एवं राजमार्ग मंत्रालय",
    nationalPortalStandard: "भारत का राष्ट्रीय पोर्टल मानक",
    emergencyHelpline: "राजमार्ग हेल्पलाइन: 1033 (NHAI)",
    emergency112: "आपातकालीन: 112",
    visionZero: "विज़न ज़ीरो 2030",
    viksitBharat: "विकसित भारत @ 2047",
    nicCredit: "राष्ट्रीय सूचना विज्ञान केंद्र (NIC)",
    securePortal: "सुरक्षित सरकारी पोर्टल",

    sectorGovernment: "Government (सरकारी)",
    sectorTechnical: "Technical (तकनीकी)",
    sectorPublic: "Public (नागरिक)",
    chooseSector: "अनुभाग चुनें",
    sectorGovernmentDesc: "प्रशासन एवं कानून प्रवर्तन",
    sectorTechnicalDesc: "सड़क इंजीनियरिंग एवं आईआरसी ऑडिट",
    sectorPublicDesc: "नागरिक शिकायत एवं सुरक्षित पारगमन",
    wingAdmin: "प्रशासनिक प्रभाग (Admin)",
    wingTech: "अभियांत्रिकी प्रभाग (Tech)",
    wingCitizen: "नागरिक प्रभाग (Citizen)",

    navDashboard: "डैशबोर्ड (Dashboard)",
    navRiskMap: "जोखिम मानचित्र (Risk Map)",
    navLocations: "स्थान सूची (Locations)",
    navInterventions: "हस्तक्षेप कार्य (Interventions)",
    navBudget: "बजट अनुकूलक (Budget)",
    navReports: "आधिकारिक रिपोर्ट (Reports)",
    navAlerts: "सूचनाएँ (Alerts)",
    navSettings: "सेटिंग्स (Settings)",
    navHome: "नागरिक मुख्य पृष्ठ (Home)",
    navSafetyMap: "सुरक्षा मानचित्र (Safety Map)",
    navSaferRoutes: "सुरक्षित मार्ग (Safer Routes)",
    navReportHazard: "सड़क शिकायत दर्ज करें (Report)",
    navSafetyUpdates: "सुरक्षा बुलेटिन (Bulletins)",
    navProfile: "प्रोफ़ाइल एवं इतिहास (Profile)",
    navDiagnostics: "स्थान निदान (Diagnostics)",
    navFieldVerification: "क्षेत्र सत्यापन (Verification)",
    navRiskForecast: "जोखिम पूर्वानुमान (Forecast)",

    jurisdictionLabel: "क्षेत्राधिकार",
    searchPlaceholder: "राजमार्ग, ब्लैकस्पॉट कोड, या जंक्शन खोजें...",
    roleCitizen: "पंजीकृत नागरिक (Citizen)",
    roleEngineer: "कार्यकारी अभियंता (PWD/NHAI)",
    roleOfficer: "जिला सड़क सुरक्षा अधिकारी (DRSC)",

    signIn: "प्रवेश करें (Sign In)",
    signingIn: "प्रवेश हो रहा है...",
    reportHazardBtn: "शिकायत दर्ज करें",
    exploreMapBtn: "मानचित्र देखें",
    searchBtn: "खोजें",
    filterAll: "सभी",
    filterCritical: "अति-गंभीर",
    filterHigh: "उच्च जोखिम",
    filterModerate: "मध्यम",
    filterLow: "कम जोखिम",
    viewDetails: "विवरण देखें",
    openFullMap: "पूरा मानचित्र खोलें",

    totalLocationsAnalyzed: "विश्लेषित कुल स्थान",
    highRiskLocations: "उच्च-जोखिम वाले स्थान",
    emergingRiskLocations: "उभरते जोखिम वाले स्थान",
    interventionsPending: "लंबित सुरक्षा हस्तक्षेप",
    currentSafetyBudget: "वर्तमान सड़क सुरक्षा बजट",
    districtRiskOverview: "जिला जोखिम सारांश",
    topPriorityLocations: "शीर्ष प्राथमिकता वाले स्थान",
    lastAuditSync: "अंतिम ऑडिट समन्वय",
    liveTelemetry: "लाइव टेलीमेट्री एवं पुलिस दुर्घटना रिकॉर्ड जुड़े हैं",

    citizenPortalTitle: "नागरिक सड़क सुरक्षा पोर्टल",
    citizenPortalDesc: "सड़क जोखिम स्तर देखें, सुरक्षित कॉरिडोर से यात्रा करें, और सड़क खामियों की शिकायत सीधे जिला सुरक्षा समिति को भेजें।",
    citizenServicesHeading: "नागरिक लोक सेवाएँ",
    citizenServicesSub: "त्वरित समाधान • 24x7 ट्रैकिंग",
    safetyMapCardTitle: "सुरक्षा जीआईएस मानचित्र",
    safetyMapCardDesc: "रंग-कोडित दुर्घटना जोखिम, ब्लैकस्पॉट और सक्रिय निर्माण कार्य।",
    reportHazardCardTitle: "सड़क शिकायत दर्ज करें",
    reportHazardCardDesc: "गड्ढे, क्षतिग्रस्त रेलिंग या खराब सिग्नल की फोटो एवं जीपीएस सहित शिकायत।",
    saferRoutesCardTitle: "सुरक्षित मार्ग नेविगेटर",
    saferRoutesCardDesc: "दुर्घटना संभावित क्षेत्रों से बचते हुए सबसे सुरक्षित यात्रा मार्ग चुनें।",
    safetyBulletinsCardTitle: "सुरक्षा बुलेटिन एवं राजपत्र",
    safetyBulletinsCardDesc: "आधिकारिक राजपत्र अधिसूचनाएँ, गति सीमा निर्देश और मौसम चेतावनी।",
    emergencyTitle: "राष्ट्रीय राजमार्ग आपातकालीन प्रतिक्रिया",
    emergencyDesc: "सभी राष्ट्रीय एवं राज्य राजमार्गों पर 24x7 एम्बुलेंस, क्रेन और पेट्रोलिंग सेवा।",

    // Citizen Forms & Advisories
    lodgeGrievanceTab: "सड़क सुरक्षा शिकायत दर्ज करें (Lodge)",
    trackGrievanceTab: "शिकायत की स्थिति जांचें (Track)",
    reportHazardHeaderTitle: "नागरिक सड़क सुरक्षा शिकायत एवं ब्लैकस्पॉट निवारण पोर्टल",
    reportHazardHeaderDesc: "सड़क परिवहन एवं राजमार्ग मंत्रालय (MoRTH) नागरिक चार्टर के तहत शिकायत निवारण",
    submitGrievanceBtn: "प्राधिकरण को शिकायत दर्ज करें (Submit)",
    fetchGpsBtn: "सटीक जीपीएस स्थान प्राप्त करें (GPS)",
    safeRoutesHeaderTitle: "राष्ट्रीय राजमार्ग सुरक्षित मार्ग परामर्शदाता",
    safeRoutesHeaderDesc: "एआई आधारित सुरक्षित गलियारा नियोजन एवं प्रकाश व्यवस्था मूल्यांकन",
    evaluateRouteBtn: "मार्ग सुरक्षा विश्लेषण करें (Evaluate)",
    bulletinsHeaderTitle: "सरकारी अधिसूचनाएँ, परिपत्र एवं सुरक्षा बुलेटिन",
    bulletinsHeaderDesc: "सड़क परिवहन मंत्रालय राजपत्र, जिला सड़क सुरक्षा समिति निर्णय एवं सुरक्षा आदेश",
    markAllAsReadBtn: "सब पढ़ें (Mark All Read)",
    alertsHeaderTitle: "सड़क सुरक्षा सूचना एवं चेतावनी केंद्र",
    alertsHeaderDesc: "जिला सड़क सुरक्षा समिति (DRSC), यातायात पुलिस एवं एनएचएआई नियंत्रण कक्ष अलर्ट",

    about: "हमारे बारे में",
    privacyPolicy: "गोपनीयता नीति",
    termsOfUse: "उपयोग की शर्तें",
    accessibility: "सुलभता विवरण",
    help: "सहायता",
    hostedBy: "राष्ट्रीय सूचना विज्ञान केंद्र (NIC) | सड़क परिवहन एवं राजमार्ग मंत्रालय द्वारा संचालित",
  },
  ta: {
    portalTitle: "ரக்ஷாபத்",
    portalSubtitle: "தேசிய சாலை பாதுகாப்பு முடிவு ஆதரவு மற்றும் குடிமக்கள் பாதுகாப்பு அமைப்பு",
    govOfIndia: "இந்திய அரசு",
    ministryName: "சாலைப் போக்குவரத்து மற்றும் நெடுஞ்சாலைகள் அமைச்சகம்",
    nationalPortalStandard: "இந்திய தேசிய போர்டல் தரநிலை",
    emergencyHelpline: "நெடுஞ்சாலை உதவி: 1033 (NHAI)",
    emergency112: "அவசர உதவி: 112",
    visionZero: "விஷன் ஜீரோ 2030",
    viksitBharat: "விக்சித் பாரத் @ 2047",
    nicCredit: "தேசிய தகவல் மையம் (NIC)",
    securePortal: "பாதுகாப்பான அரசு தளம்",

    sectorGovernment: "Government (அரசு)",
    sectorTechnical: "Technical (தொழில்நுட்பம்)",
    sectorPublic: "Public (பொது மக்கள்)",
    chooseSector: "பிரிவைத் தேர்ந்தெடுக்கவும்",
    sectorGovernmentDesc: "நிர்வாகம் மற்றும் சட்ட அமலாக்கம்",
    sectorTechnicalDesc: "சாலை பொறியியல் மற்றும் ஐ.ஆர்.சி தணிக்கை",
    sectorPublicDesc: "குடிமக்கள் குறைதீர்வு & பாதுகாப்பான பயணம்",
    wingAdmin: "நிர்வாகப் பிரிவு (Admin)",
    wingTech: "பொறியியல் பிரிவு (Tech)",
    wingCitizen: "குடிமக்கள் பிரிவு (Citizen)",

    navDashboard: "டாஷ்போர்டு (Dashboard)",
    navRiskMap: "ஆபத்து வரைபடம் (Risk Map)",
    navLocations: "இடங்கள் பட்டியல் (Locations)",
    navInterventions: "பாதுகாப்பு பணிகள் (Interventions)",
    navBudget: "நிதி திட்டமிடல் (Budget)",
    navReports: "அறிக்கைகள் (Reports)",
    navAlerts: "எச்சரிக்கைகள் (Alerts)",
    navSettings: "அமைப்புகள் (Settings)",
    navHome: "முகப்பு (Home)",
    navSafetyMap: "பாதுகாப்பு வரைபடம் (Safety Map)",
    navSaferRoutes: "பாதுகாப்பான பாதைகள் (Safer Routes)",
    navReportHazard: "சாலை குறைபாடு புகார் (Report)",
    navSafetyUpdates: "பாதுகாப்பு சுற்றறிக்கை (Updates)",
    navProfile: "சுயவிவரம் & வரலாறு (Profile)",
    navDiagnostics: "இடப் பகுப்பாய்வு (Diagnostics)",
    navFieldVerification: "கள சரிபார்ப்பு (Verification)",
    navRiskForecast: "ஆபத்து முன்னறிவிப்பு (Forecast)",

    jurisdictionLabel: "அதிகார எல்லை",
    searchPlaceholder: "நெடுஞ்சாலை, விபத்து பகுதி குறியீடு தேடவும்...",
    roleCitizen: "பதிவுசெய்த குடிமகன் (Citizen)",
    roleEngineer: "செயற்பொறியாளர் (PWD/NHAI)",
    roleOfficer: "மாவட்ட சாலை பாதுகாப்பு அலுவலர் (DRSC)",

    signIn: "உள்நுழைக (Sign In)",
    signingIn: "உள்நுழைகிறது...",
    reportHazardBtn: "புகார் பதிவு செய்க",
    exploreMapBtn: "வரைபடம் பார்க்க",
    searchBtn: "தேடுக",
    filterAll: "அனைத்தும்",
    filterCritical: "மிகக் கடுமையான",
    filterHigh: "அதிக ஆபத்து",
    filterModerate: "மிதமான ஆபத்து",
    filterLow: "குறைந்த ஆபத்து",
    viewDetails: "விவரங்களை காண்க",
    openFullMap: "முழு வரைபடம் பார்க்க",

    totalLocationsAnalyzed: "ஆய்வு செய்யப்பட்ட மொத்த இடங்கள்",
    highRiskLocations: "அதிக ஆபத்துள்ள இடங்கள்",
    emergingRiskLocations: "புதிதாக உயரும் ஆபத்து இடங்கள்",
    interventionsPending: "நிலுவையில் உள்ள பாதுகாப்பு பணிகள்",
    currentSafetyBudget: "தற்போதைய பாதுகாப்பு நிதி",
    districtRiskOverview: "மாவட்ட ஆபத்து சுருக்கம்",
    topPriorityLocations: "முதன்மை முன்னுரிமை இடங்கள்",
    lastAuditSync: "கடைசி தணிக்கை ஒருங்கிணைப்பு",
    liveTelemetry: "நேரலை விபத்து தரவு இணைக்கப்பட்டுள்ளது",

    citizenPortalTitle: "குடிமக்கள் சாலை பாதுகாப்பு தளம்",
    citizenPortalDesc: "நிகழ்நேர சாலை ஆபத்து நிலைகளை அறியுங்கள், பாதுகாப்பான வழிகளில் பயணியுங்கள், மற்றும் சாலை குறைபாடுகளை நேரடியாக புகார் செய்யுங்கள்.",
    citizenServicesHeading: "குடிமக்கள் பொதுச் சேவைகள்",
    citizenServicesSub: "விரைவான தீர்வு • 24x7 கண்காணிப்பு",
    safetyMapCardTitle: "பாதுகாப்பு ஜிஐஎஸ் வரைபடம்",
    safetyMapCardDesc: "விபத்து அபாய இடங்கள், பிளாக்ஸ்பாட்கள் மற்றும் பழுதுபார்க்கும் பணிகள்.",
    reportHazardCardTitle: "சாலை குறைபாடு புகார்",
    reportHazardCardDesc: "குழிகள், சேதமடைந்த தடுப்புகள் மற்றும் பழுதான சிக்னல்களை படம் மற்றும் ஜிபிஎஸ் உடன் பதிவு செய்க.",
    saferRoutesCardTitle: "பாதுகாப்பான வழித் தேடல்",
    saferRoutesCardDesc: "விபத்து பகுதிகளை தவிர்த்து மிகக் குறைந்த ஆபத்துள்ள வழியில் பயணியுங்கள்.",
    safetyBulletinsCardTitle: "பாதுகாப்பு அறிவிப்புகள்",
    safetyBulletinsCardDesc: "அதிகாரப்பூர்வ அரசு அறிவிப்புகள், வேக வரம்பு ஆணைகள் மற்றும் வானிலை எச்சரிக்கைகள்.",
    emergencyTitle: "தேசிய நெடுஞ்சாலை அவசர உதவி",
    emergencyDesc: "அனைத்து தேசிய மற்றும் மாநில நெடுஞ்சாலைகளிலும் 24x7 ஆம்புலன்ஸ், கிரேன் மற்றும் ரோந்து சேவை.",

    // Citizen Forms & Advisories
    lodgeGrievanceTab: "சாலை குறைபாடு புகார் பதிவு செய்க (Lodge)",
    trackGrievanceTab: "புகாரின் நிலையை கண்காணிக்கவும் (Track)",
    reportHazardHeaderTitle: "குடிமக்கள் சாலை குறைபாடு மற்றும் விபத்துப் பகுதி சீரமைப்பு தளம்",
    reportHazardHeaderDesc: "மத்திய சாலைப் போக்குவரத்து அமைச்சகம் (MoRTH) குடிமக்கள் சேவை தளம்",
    submitGrievanceBtn: "அரசு அதிகாரியிடம் புகாரை சமர்ப்பிக்க (Submit)",
    fetchGpsBtn: "துல்லியமான ஜிபிஎஸ் இருப்பிடத்தை பெறுக (GPS)",
    safeRoutesHeaderTitle: "தேசிய நெடுஞ்சாலை பாதுகாப்பான வழித்தட வழிகாட்டி",
    safeRoutesHeaderDesc: "செயற்கை நுண்ணறிவு அடிப்படையிலான பாதுகாப்பான பாதை மற்றும் விளக்கு வசதி பகுப்பாய்வு",
    evaluateRouteBtn: "பாதுகாப்பான பாதையை மதிப்பிடுக (Evaluate)",
    bulletinsHeaderTitle: "அரசு அரசிதழ் அறிவிப்புகள் மற்றும் பாதுகாப்பு சுற்றறிக்கைகள்",
    bulletinsHeaderDesc: "மத்திய அமைச்சக அறிவிப்புகள், மாவட்ட சாலைப் பாதுகாப்புக் குழு முடிவுகள்",
    markAllAsReadBtn: "அனைத்தையும் படித்ததாகக் குறி (Mark Read)",
    alertsHeaderTitle: "சாலை பாதுகாப்பு எச்சரிக்கை மற்றும் அறிவிப்பு மையம்",
    alertsHeaderDesc: "மாவட்ட சாலை பாதுகாப்புக் குழு (DRSC) மற்றும் நெடுஞ்சாலை ரோந்து எச்சரிக்கைகள்",

    about: "எங்களைப் பற்றி",
    privacyPolicy: "தனியுரிமைக் கொள்கை",
    termsOfUse: "பயன்பாட்டு விதிமுறைகள்",
    accessibility: "அணுகல்தன்மை அறிக்கை",
    help: "உதவி",
    hostedBy: "தேசிய தகவல் மையம் (NIC) | சாலைப் போக்குவரத்து மற்றும் நெடுஞ்சாலைகள் அமைச்சகம்",
  },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "rakshapath.language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      if (saved === "en" || saved === "hi" || saved === "ta") {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return "en";
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
