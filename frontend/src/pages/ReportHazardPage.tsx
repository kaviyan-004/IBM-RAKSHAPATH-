import { FormEvent, useState } from "react";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck,
  FileText,
  Flag,
  MapPin,
  QrCode,
  Search,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import AshokaEmblem from "@/components/AshokaEmblem";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

interface GrievanceRecord {
  id: string;
  hazardType: string;
  location: string;
  roadCategory: string;
  date: string;
  status: "Under Review" | "Inspected" | "Work In Progress" | "Resolved";
  assignedTo: string;
  sla: string;
}

const SAMPLE_GRIEVANCES: GrievanceRecord[] = [
  {
    id: "MoRTH/2026/TN/CB-78192",
    hazardType: "Deep Pothole & Surface Collapse",
    location: "Avinashi Road near Peelamedu Flyover",
    roadCategory: "NH-544 (National Highway)",
    date: "10-Sep-2026",
    status: "Work In Progress",
    assignedTo: "NHAI Project Implementation Unit (PIU), Coimbatore",
    sla: "Resolution SLA: 72 Hours (In Progress)",
  },
  {
    id: "MoRTH/2026/TN/CB-64019",
    hazardType: "Damaged Steel Crash Barrier",
    location: "Trichy Road (SH-18) Singanallur Curve",
    roadCategory: "SH-18 (State Highway)",
    date: "04-Sep-2026",
    status: "Resolved",
    assignedTo: "State Highways Dept (Divisional Engineer, Coimbatore)",
    sla: "Resolved within 48 Hours with photo evidence",
  },
  {
    id: "MoRTH/2026/TN/CB-52904",
    hazardType: "Non-functional Traffic Signal & Blinker",
    location: "RS Puram Crossing, DB Road",
    roadCategory: "City Arterial Road",
    date: "28-Aug-2026",
    status: "Resolved",
    assignedTo: "Coimbatore City Traffic Police / Corporation",
    sla: "Resolved within 24 Hours",
  },
];

export default function ReportHazardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"lodge" | "track">("lodge");

  // Form states
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState("9842100000");
  const [locationName, setLocationName] = useState("");
  const [roadCategory, setRoadCategory] = useState("NH-544 (National Highway)");
  const [hazardType, setHazardType] = useState("Pothole / Road Surface Damage");
  const [severity, setSeverity] = useState("Critical / Accident Prone");
  const [description, setDescription] = useState("");
  const [gpsCoordinates, setGpsCoordinates] = useState("11.0168° N, 76.9558° E (Coimbatore)");
  const [gpsCaptured, setGpsCaptured] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(false);
  const [agree, setAgree] = useState(false);

  // Submission state
  const [submittedReceipt, setSubmittedReceipt] = useState<GrievanceRecord | null>(null);

  // Track search state
  const [searchToken, setSearchToken] = useState("");
  const [trackedRecord, setTrackedRecord] = useState<GrievanceRecord | null>(SAMPLE_GRIEVANCES[0]);

  const handleCaptureGps = () => {
    setGpsCaptured(true);
    setGpsCoordinates("11.0315° N, 77.0182° E (Peelamedu, Coimbatore Accuracy ±3m)");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const token = `MoRTH/2026/TN/CB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecord: GrievanceRecord = {
      id: token,
      hazardType,
      location: locationName || "Peelamedu Jn, Coimbatore",
      roadCategory,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Under Review",
      assignedTo: roadCategory.includes("National")
        ? "NHAI Project Implementation Unit (PIU), Coimbatore"
        : "State Highways & PWD Road Safety Sub-division",
      sla: "Resolution SLA: 72 Hours under Citizen Charter",
    };
    setSubmittedReceipt(newRecord);
  };

  const handleSearchTrack = (e: FormEvent) => {
    e.preventDefault();
    if (!searchToken.trim()) return;
    const match = SAMPLE_GRIEVANCES.find((g) =>
      g.id.toLowerCase().includes(searchToken.toLowerCase().trim())
    );
    if (match) {
      setTrackedRecord(match);
    } else {
      setTrackedRecord({
        id: searchToken.trim(),
        hazardType: "Road Surface Hazard",
        location: "Coimbatore District Jurisdiction",
        roadCategory: "State Highway",
        date: "Today",
        status: "Under Review",
        assignedTo: "District Road Safety Cell",
        sla: "Verification in progress",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Official Grievance Header Banner */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <AshokaEmblem className="h-9 w-auto text-[#0B3B60]" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                  {t.reportHazardHeaderTitle}
                </h1>
                <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800 uppercase">
                  CPGRAMS Integrated
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {t.reportHazardHeaderDesc}
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span>Citizen Charter SLA: <strong>24 to 72 Hours</strong></span>
            <p className="text-amber-700 font-semibold">Toll-free Assistance: 1033</p>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => {
              setActiveTab("lodge");
              setSubmittedReceipt(null);
            }}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-bold transition ${
              activeTab === "lodge"
                ? "bg-[#0B3B60] text-white shadow-2xs"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Flag size={14} />
            {t.lodgeGrievanceTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("track")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-bold transition ${
              activeTab === "track"
                ? "bg-[#0B3B60] text-white shadow-2xs"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Search size={14} />
            {t.trackGrievanceTab}
          </button>
        </div>
      </div>

      {/* Tab 1: Lodge Grievance Form */}
      {activeTab === "lodge" && (
        <>
          {submittedReceipt ? (
            /* Success Acknowledgement Receipt */
            <div className="rounded-lg border-2 border-emerald-500 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      शिकायत सफलतापूर्वक पंजीकृत / Grievance Registered Successfully
                    </h2>
                    <p className="text-xs text-slate-500">
                      Official Acknowledgement Receipt — Government of India MoRTH Citizen Cell
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="rounded border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Print Receipt 🖨️
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-slate-500">Grievance Registration Number:</span>
                  <p className="font-mono text-sm font-black text-blue-900">{submittedReceipt.id}</p>
                </div>
                <div>
                  <span className="text-slate-500">Filing Date & Time:</span>
                  <p className="font-semibold text-slate-800">{submittedReceipt.date} (IST)</p>
                </div>
                <div>
                  <span className="text-slate-500">Hazard Reported:</span>
                  <p className="font-semibold text-slate-800">{submittedReceipt.hazardType}</p>
                </div>
                <div>
                  <span className="text-slate-500">Road Corridor & Category:</span>
                  <p className="font-semibold text-slate-800">{submittedReceipt.roadCategory}</p>
                </div>
                <div>
                  <span className="text-slate-500">Assigned Competent Authority:</span>
                  <p className="font-semibold text-amber-800">{submittedReceipt.assignedTo}</p>
                </div>
                <div>
                  <span className="text-slate-500">Current Status & SLA:</span>
                  <p className="font-bold text-emerald-700">{submittedReceipt.status} • {submittedReceipt.sla}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded bg-blue-50/70 p-3 text-xs text-blue-900">
                <p>
                  An SMS and Email notification with tracking instructions has been dispatched to your registered mobile.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedReceipt(null);
                    setLocationName("");
                    setDescription("");
                    setPhotoSelected(false);
                  }}
                  className="rounded bg-[#0B3B60] px-3 py-1.5 font-bold text-white hover:bg-blue-900"
                >
                  File Another Hazard
                </button>
              </div>
            </div>
          ) : (
            /* Lodge Form */
            <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Step 1: Complainant Details (शिकायतकर्ता का विवरण)
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700">Full Name / पूरा नाम *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kaviya / T. Selvam"
                      className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800 outline-none focus:border-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700">Mobile Number (For SMS Tracking) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800 outline-none focus:border-blue-700"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Step 2: Hazard & Road Location (जोखिम स्थल एवं विवरण)
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700">Road Hierarchy / सड़क वर्गीकरण *</label>
                    <select
                      value={roadCategory}
                      onChange={(e) => setRoadCategory(e.target.value)}
                      className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800 outline-none focus:border-blue-700 bg-white"
                    >
                      <option value="NH-544 (National Highway - Salem to Cochin)">NH-544 (National Highway - Salem-Coimbatore Corridor)</option>
                      <option value="NH-83 (National Highway - Dindigul-Coimbatore)">NH-83 (National Highway - Pollachi Corridor)</option>
                      <option value="SH-17 (State Highway - Sathyamangalam Rd)">SH-17 (State Highway - Sathyamangalam Road)</option>
                      <option value="SH-18 (State Highway - Trichy Road)">SH-18 (State Highway - Trichy Road)</option>
                      <option value="Major District Road (MDR - Thadagam Rd)">Major District Road (MDR - Thadagam Road)</option>
                      <option value="City Urban Corridor (Corporation Road)">City Urban Corridor (Corporation Road)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700">Specific Location / Landmark *</label>
                    <input
                      type="text"
                      required
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      placeholder="e.g. Avinashi Road, Near KMCH / Peelamedu Junction"
                      className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800 outline-none focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700">Type of Road Defect / Hazard Type *</label>
                    <select
                      value={hazardType}
                      onChange={(e) => setHazardType(e.target.value)}
                      className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800 outline-none focus:border-blue-700 bg-white"
                    >
                      <option value="Pothole / Road Surface Damage">Pothole / Deep Road Surface Damage (गड्ढा)</option>
                      <option value="Damaged Crash Barrier / Guardrail">Broken Crash Barrier / Missing Guardrail (टूटा क्रैश बैरियर)</option>
                      <option value="Non-functional Traffic Signal / Blinker">Signal Malfunction / Blinker Failure (सिग्नल खराबी)</option>
                      <option value="Severe Waterlogging / Drainage Jam">Severe Waterlogging / Flooded Carriageway (जलभराव)</option>
                      <option value="Missing Highway Signboards / Warning Boards">Missing Warning Signboards (संकेत बोर्ड का अभाव)</option>
                      <option value="Unauthorized Median Cut / Barricade">Unauthorized Median Opening / Illegal Cut (अवैध कट)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700">Severity Assessment *</label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800 outline-none focus:border-blue-700 bg-white"
                    >
                      <option value="Critical / Accident Prone">Critical — Severe Risk of Fatal Accidents (Immediate Intervention)</option>
                      <option value="High Risk">High Risk — Impedes Flow, Causes Sudden Braking</option>
                      <option value="Moderate Risk">Moderate Risk — Requires Scheduled Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700">
                    GPS Coordinates Verification (जीपीएस स्थिति)
                  </label>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="flex-1 rounded border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-700">
                      <MapPin size={13} className="inline mr-1.5 text-red-600" />
                      {gpsCoordinates}
                    </div>
                    <button
                      type="button"
                      onClick={handleCaptureGps}
                      className="rounded border border-blue-700 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-900 hover:bg-blue-100"
                    >
                      {gpsCaptured ? "✓ GPS Verified" : `📍 ${t.fetchGpsBtn}`}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700">
                    Hazard Description & Observations (जोखिम का विवरण) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the defect, approximate length/depth, whether two-wheelers are skidding, and exact direction (e.g. towards Airport)..."
                    className="mt-1 w-full rounded border border-slate-300 p-2 text-xs text-slate-800 outline-none focus:border-blue-700"
                  />
                </div>

                {/* Photo Upload Simulator */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-700">
                    Upload Defect Photograph (तस्वीर संलग्न करें) - Optional but Recommended
                  </label>
                  <div className="mt-1.5 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setPhotoSelected(!photoSelected)}
                      className="inline-flex items-center gap-2 rounded border border-dashed border-slate-400 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      <Camera size={15} className="text-slate-500" />
                      {photoSelected ? "✓ pothole_avinashi_rd.jpg (2.4 MB Attached)" : "Choose File or Take Photo"}
                    </button>
                    {photoSelected && (
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        Image geotag verified (11.0315° N, 77.0182° E)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Citizen Declaration */}
              <div className="border-t border-slate-100 pt-4 text-xs">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 rounded text-blue-800 focus:ring-0"
                  />
                  <span className="text-slate-600">
                    I declare that this grievance is submitted in good faith and public safety interest under the Ministry of Road Transport & Highways guidelines. I understand that submitting false grievances is prohibited.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!agree}
                  className="inline-flex items-center gap-2 rounded bg-[#0B3B60] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-blue-900 disabled:opacity-50"
                >
                  <Send size={14} />
                  {t.submitGrievanceBtn}
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {/* Tab 2: Track Status */}
      {activeTab === "track" && (
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Track Grievance / शिकायत की स्थिति खोजें
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Enter your MoRTH Grievance Tracking Number (e.g. MoRTH/2026/TN/CB-78192)
            </p>
            <form onSubmit={handleSearchTrack} className="mt-3 flex gap-2 max-w-lg">
              <input
                type="text"
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
                placeholder="Enter Token (e.g. MoRTH/2026/TN/CB-78192)..."
                className="flex-1 rounded border border-slate-300 px-3 py-2 text-xs font-mono text-slate-800 outline-none focus:border-blue-700"
              />
              <button
                type="submit"
                className="rounded bg-[#0B3B60] px-4 py-2 text-xs font-bold text-white hover:bg-blue-900"
              >
                Search
              </button>
            </form>
          </div>

          {trackedRecord && (
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs text-slate-400">Grievance Docket No:</span>
                  <p className="font-mono text-base font-black text-[#0B3B60]">{trackedRecord.id}</p>
                </div>
                <div className="text-right">
                  <span className="rounded bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                    Status: {trackedRecord.status}
                  </span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                  Official Redressal Timeline (निवारण प्रगति)
                </h4>
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 text-xs">
                  <div className="relative pl-6">
                    <span className="absolute -left-2.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                      ✓
                    </span>
                    <p className="font-bold text-slate-900">1. Grievance Filed & Token Generated</p>
                    <p className="text-slate-500">Registered through Citizen Portal on {trackedRecord.date}</p>
                  </div>

                  <div className="relative pl-6">
                    <span className="absolute -left-2.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                      ✓
                    </span>
                    <p className="font-bold text-slate-900">2. Dispatched to {trackedRecord.assignedTo}</p>
                    <p className="text-slate-500">Site engineer assigned for engineering inspection</p>
                  </div>

                  <div className="relative pl-6">
                    <span className="absolute -left-2.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                      ●
                    </span>
                    <p className="font-bold text-blue-900">3. Physical Inspection & Rectification Work</p>
                    <p className="text-slate-600">{trackedRecord.sla}</p>
                  </div>

                  <div className="relative pl-6 opacity-60">
                    <span className="absolute -left-2.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-white">
                      ○
                    </span>
                    <p className="font-bold text-slate-600">4. Field Verification & Final Closure</p>
                    <p className="text-slate-400">Post-rectification photo uploaded & citizen SMS closure</p>
                  </div>
                </div>
              </div>

              {/* Summary Table */}
              <div className="rounded border border-slate-100 bg-[#f8fafc] p-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400">Hazard Type:</span>
                    <p className="font-semibold text-slate-800">{trackedRecord.hazardType}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Road Corridor:</span>
                    <p className="font-semibold text-slate-800">{trackedRecord.roadCategory}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Reported Location:</span>
                    <p className="font-semibold text-slate-800">{trackedRecord.location}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Jurisdiction Officer:</span>
                    <p className="font-semibold text-slate-800">{trackedRecord.assignedTo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
