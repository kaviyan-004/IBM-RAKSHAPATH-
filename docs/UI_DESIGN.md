# RakshaPath — UI/UX Design Reference & National Portal Specification

> **National Portal of India (india.gov.in) & Ministry of Road Transport and Highways (MoRTH) Standard**  
> *Predict • Understand • Intervene • Simulate • Save Lives*

RakshaPath is built in strict compliance with the **Guidelines for Indian Government Websites (GIGW 3.0)** and the design framework of the **National Portal of India (https://www.india.gov.in/)**. The user interface delivers single-window access to road-safety intelligence, engineering diagnostics, and citizen safety services across all levels of administration.

---

## 1. Official Color System & Design Tokens

The color palette is calibrated to match official Government of India web portals:

| Token / Color | Hex Value | Semantic Application |
|---|---|---|
| **National Deep Navy** | `#0B3B60` | Primary header bars, brand identity, authority buttons, active navigation, official borders |
| **MoRTH Primary Blue** | `#1963BD` | Primary interactive links, focus rings, callout borders, active indicators |
| **Saffron (Bhagwa)** | `#FF9933` / `#F37A1F` | Official tricolor top accent, caution badges, urgent traffic advisory tags |
| **India Green** | `#138808` | Tricolor bottom accent, verified safety badges, Grade-A safe corridors, resolved tickets |
| **Government White** | `#FFFFFF` | Primary card backgrounds, data tables, official gazette paper canvas |
| **Portal Canvas Grey** | `#F4F8FD` / `#F8FAFC` | Page background, input field backgrounds, alternating table rows |
| **Text Dark Slate** | `#0F172A` / `#1E293B` | Primary headings, table data, legal texts, metric values |
| **Muted Slate** | `#475569` / `#64748B` | Secondary descriptions, timestamps, authority subheadings |

### Critical Design Rule: Elimination of AI-Generated Pastel Icons
In conformance with official Government of India standards, all cartoonish or pastel squircle icon wrappers (e.g., light-purple or puffy square icons) have been replaced by:
- Official Gazette Dispatch Badges (`[CRITICAL ALERT]`, `[TRAFFIC CAUTION]`, `[CIVIL WORKS]`, `[OFFICIAL NOTICE]`)
- Reference dispatch codes (`MoRTH/CRIT`, `DRSC/WARN`, `PWD/WORK`, `GOI/CIRC`)
- Crisp monochrome Lucide line icons paired with bilingual authority typography
- Formal government docket stamps and Ministry seal watermarks

---

## 2. GIGW 3.0 Accessibility & Government Header Bar

Every page on RakshaPath is framed by the official **Government of India Header Bar (`GovHeaderBar.tsx`)**:

1. **National Identity**:
   - Official Ashoka Lion Capital Emblem with *Satyameva Jayate* (सत्यमेव जयते).
   - "भारत सरकार / Government of India" and "सड़क परिवहन एवं राजमार्ग मंत्रालय / Ministry of Road Transport & Highways".
2. **National Helplines**:
   - `Highway Helpline: 1033 (NHAI)`
   - `Emergency: 112 (National Emergency Response Support System)`
3. **GIGW Accessibility Controls**:
   - **Font Size Scaling**: `A-` (Small, 90%), `A` (Default, 100%), `A+` (Large, 110%) with persistent root font-size scaling.
   - **High-Contrast Toggle**: `High Contrast (उच्च कंट्रास्ट)` switch for visually impaired users.
   - **Screen Reader Skip Link**: Direct jump to `#main-content`.
4. **Multilingual Switcher**:
   - Instant language toggle between **English**, **हिन्दी (Hindi)**, and **தமிழ் (Tamil)**.
   - State persisted in `localStorage` (`rakshapath.language`) and reflected dynamically across all pages, navigation, tickers, and forms.

---

## 3. Tri-Sector Architecture (Three Wings of Governance)

RakshaPath features an interactive **Sector Slide Selector (`SectorSlideSelector.tsx`)** modeled after the National Portal of India's user-segmentation paradigm:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Choose Sector:  [ 🏛️ Government ]   [ ⚙️ Technical ]   [ 👥 Public ]   │
└────────────────────────────────────────────────────────────────────────┘
```

### Sector 1: Government (Administrative & Law Enforcement Wing)
- **Target Persona**: District Road Safety Committee (DRSC), District Magistrates/Collectors, Transport Commissioners, Traffic Police Superintendents.
- **Scope**: Executive road safety dashboards, high-level blackspot oversight, multi-year trend analytics, cross-agency budget allocation, policy gazettes, and official reports.
- **Route Namespace**: `/`, `/risk-map`, `/locations`, `/interventions`, `/budget-optimizer`, `/reports`, `/alerts`, `/settings`.

### Sector 2: Technical (Road Engineering & Audit Wing)
- **Target Persona**: Executive Engineers (NHAI / State PWD), Road Safety Auditors, IRC:SP:88-2019 Specialists, GIS Data Analysts.
- **Scope**: GIS Blackspot diagnostics, XAI (Explainable AI) cause fingerprints, SHAP feature attribution, countermeasure engineering catalogs, counterfactual what-if simulation, and field verification workflows.
- **Route Namespace**: `/dashboard`, `/gis-risk-map`, `/location-diagnostics`, `/risk-factors`, `/xai`, `/risk-forecast`, `/intervention-analysis`, `/field-verification`, `/technical-reports`.

### Sector 3: Public (Citizen Road Safety & Grievance Wing)
- **Target Persona**: General Citizens, Commuters, Commercial Fleet Drivers, Pedestrians (usable by non-technical and rural citizens).
- **Scope**:
  - **Citizen Home (`/home`)**: Clean 4-card access to essential citizen road safety services.
  - **Report Hazard (`/report-hazard`)**: CPGRAMS-integrated grievance lodging for potholes, broken crash barriers, and faulty signals with photo upload, one-click GPS coordinate capture, and 24–72 hour SLA tracking.
  - **Safer Routes (`/safer-routes`)**: AI-powered safe transit corridor planning with lighting assessments, blackspot avoidance, and printable passage clearances.
  - **Safety Updates (`/safety-updates`)**: Real-time Gazette orders, speed-limit revisions, weather warnings, and DRSC circulars with downloadable official PDFs.
  - **Safety Map (`/safety-map`)**: Simplified public risk map with clear hazard warnings.
  - **Risk Alerts (`/risk-alerts`)**: Real-time localized road alerts.

---

## 4. Complete Screen Inventory & Mapping

| # | Screen Name | Sector | Key Visual & Functional Elements | Implementation |
|---|---|---|---|---|
| 01 | **Government Login** | All | Ashoka Emblem, Bilingual Welcome, Slide Sector Selector, Official Email/Password, NIC Secure Seal, Google/Gov SSO | `frontend/src/pages/LoginPage.tsx` |
| 02 | **User Onboarding** | All | Multi-step role setup: Full Name, Official Email, Department Selection, Terms Agreement | `frontend/src/pages/SignupPage.tsx` |
| 03 | **Executive Dashboard** | Govt / Tech | MoRTH KPI Stat Cards, Top-accent borders, District Risk Overview Map, Top 5 Priority Blackspots | `frontend/src/pages/DashboardPage.tsx` |
| 04 | **GIS Risk Map** | Govt / Tech / Public | Interactive Leaflet Map, State/District filters, Risk-colored clusters, Location summary drawer | `frontend/src/pages/RiskMapPage.tsx` + `RiskMap.tsx` |
| 05 | **Locations Registry** | Govt / Tech | Searchable Blackspot tabular docket, Highway filter, Severity badges, Quick diagnostic links | `frontend/src/pages/LocationsListPage.tsx` |
| 06 | **Location Intelligence** | Govt / Tech | Risk Gauge, Cause Fingerprint (SHAP), Vulnerability distribution, Temporal heatmaps, Forecast | `frontend/src/pages/LocationIntelligencePage.tsx` |
| 07 | **Interventions Hub** | Govt / Tech | Official Countermeasure Docket, Cost-benefit assessment, Evidence grades, Actionable dispatch | `frontend/src/pages/InterventionsHubPage.tsx` |
| 08 | **What-If Simulator** | Govt / Tech | Multi-intervention selection, Counterfactual risk reduction curves, Modeled uncertainty intervals | `frontend/src/pages/ImpactSimulatorPage.tsx` |
| 09 | **Safety Budget Optimizer** | Govt | Knapsack optimization engine, INR Lakh budget constraints, Maximum life-saving portfolio allocation | `frontend/src/pages/BudgetOptimizerPage.tsx` |
| 10 | **Reports & Gazette Docket**| Govt / Tech | PDF generation preview, Executive summary, Formal stamps, Authority sign-off blocks | `frontend/src/pages/ReportsPage.tsx` + `ReportViewPage.tsx` |
| 11 | **Road Safety Alerts** | All | Official MoRTH Alert Bulletins, Gazette dispatch badges, Severity filters, Mark-all-read action | `frontend/src/pages/AlertsPage.tsx` |
| 12 | **ML Training & XAI** | Tech | Live ML model training workbench, XGBoost / Random Forest hyperparameter tuning, Confusion matrix, ROC curve | `frontend/src/pages/MLTrainingPage.tsx` |
| 13 | **Citizen Portal Home** | Public | Ashoka Header, 4 Quick Citizen Action Tiles (Grievance, Routes, Map, Gazette), Emergency 1033 | `frontend/src/pages/PublicHomePage.tsx` |
| 14 | **Lodge & Track Grievance**| Public | Photo evidence upload, Auto-detect GPS, Complaint Token Generation (`MoRTH/2026/TN/CB-XXXX`), SLA Tracker | `frontend/src/pages/ReportHazardPage.tsx` |
| 15 | **Safer Routes Navigator** | Public | Origin-Destination evaluation, Lighting & Infrastructure status, Blackspot counts, Printable clearance | `frontend/src/pages/SaferRoutesPage.tsx` |
| 16 | **Official Gazette & Orders**| Public / Govt | Government orders, Gazette Extraordinary notifications, Speed limit revisions, PDF downloads | `frontend/src/pages/SafetyUpdatesPage.tsx` |
| 17 | **Profile & Settings** | All | Official ID credentials, Security credentials, Notification subscriptions, System audit information | `frontend/src/pages/ProfileSettingsPage.tsx` |

---

## 5. Multilingual Localization System

Localization is managed centrally via `frontend/src/context/LanguageContext.tsx`:
- Supported Languages:
  - **English (`en`)**: Primary administrative and engineering language.
  - **हिन्दी (`hi`)**: Official language for Central Government and North/Central Indian States.
  - **தமிழ் (`ta`)**: Official language for Tamil Nadu and pilot corridor operations.
- Dynamic key-value dictionary covering all portal headers, sector descriptions, sidebar navigation, top bar controls, metric labels, citizen grievance forms, and footer policies.
- Automatically sets HTML document language attribute (`<html lang="hi">`).
