# RakshaPath — Complete Application Flow & Sector Architecture

> **Predict • Understand • Intervene • Simulate • Save Lives**  
> Built for the Ministry of Road Transport and Highways (MoRTH), State Transport Departments, NHAI, and the Citizens of India.

From government road-accident data and IRC:SP:88-2019 engineering standards to predictive risk intelligence, intervention recommendations, what-if simulation, budget optimization, and citizen grievance redressal.

---

## 1. Product Vision & Multi-Sector Model

RakshaPath is an end-to-end **Road Safety Decision Intelligence & Public Service Ecosystem**. Unlike single-audience dashboards, RakshaPath structures operations across three dedicated sectors aligned with the National Portal of India:

1. **Government Wing (Administration & Enforcement)**: Focuses on district-wide blackspot prioritization, inter-agency safety budget allocation, and executive reporting.
2. **Technical Wing (Road Engineering & Audit)**: Focuses on IRC engineering countermeasures, XAI/SHAP cause diagnostics, GIS road audits, and counterfactual simulation.
3. **Public Wing (Citizen Safety & Redressal)**: Focuses on citizen grievance lodging (potholes, damaged barriers, broken signals), safe route advisories, and official gazette notifications.

---

## 2. Global High-Level Flow

```
                                  RAKSHAPATH PORTAL
                                          │
                         GIGW 3.0 Government Header Bar
                    (Emblem, Helplines 1033/112, Font A-/A/A+,
                     High Contrast, Language: EN / हिन्दी / தமிழ்)
                                          │
                                 AUTHENTICATION
                    (Login with Email/Gov SSO or Public Access)
                                          │
                         INTERACTIVE SECTOR SLIDE SELECTOR
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        ▼                                 ▼                                 ▼
1. GOVERNMENT WING                2. TECHNICAL WING                 3. PUBLIC CITIZEN WING
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│ Executive Dashboard     │       │ Engineering Dashboard   │       │ Citizen Home Portal     │
│  - Total Locations      │       │ GIS Blackspot Map       │       │  - 4 Priority Services  │
│  - High/Emerging Risk   │       │ Location Diagnostics    │       │ Public Safety Map       │
│  - Allocated Budget     │       │  - Cause Fingerprint    │       │  - Color-coded Hazards  │
│ GIS Risk Map            │       │  - Vulnerability (WHO)  │       │ Report Road Hazard      │
│ Locations Registry      │       │  - Temporal (WHEN)      │       │  - Photo Evidence       │
│ Interventions Hub       │       │  - Future Forecast      │       │  - One-Click GPS        │
│ Budget Optimizer        │       │ XAI & Model Training    │       │  - SLA Token Tracker    │
│  - Knapsack Allocation  │       │ What-If Simulator       │       │ Safer Route Navigator   │
│  - Expected Life Saved  │       │ Countermeasures Catalog │       │  - Lighting & Clearance │
│ Official MoRTH Reports  │       │ Technical Reports       │       │ Gazette & Bulletins     │
│ Alert Bulletins         │       │ Field Verification      │       │  - Orders & Speed Limit │
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
```

---

## 3. Sector-by-Sector Navigation & Routes

### Sector 1: Government (Administrative Wing)
*Route Guard Sector: `government`*

| Route | Page / Component | Key Actions & Workflows |
|---|---|---|
| `/` | `DashboardPage.tsx` | District KPI overview, blackspot count, emergency budget allocation, priority road list |
| `/risk-map` | `RiskMapPage.tsx` | Geographic visualizer of critical, high, moderate, and emerging risk clusters |
| `/locations` | `LocationsListPage.tsx` | Filterable tabular registry of identified blackspots with risk badges |
| `/locations/:id` | `LocationIntelligencePage.tsx` | Deep-dive location profile with 0–100 risk score, cause factors, and temporal trends |
| `/locations/:id/interventions` | `InterventionsPage.tsx` | Ranked engineering & enforcement countermeasures with estimated costs and IRC grades |
| `/locations/:id/simulator` | `ImpactSimulatorPage.tsx` | Counterfactual impact simulator testing combined intervention packages |
| `/interventions` | `InterventionsHubPage.tsx` | Comprehensive catalog of approved MoRTH & IRC countermeasures |
| `/budget-optimizer` | `BudgetOptimizerPage.tsx` | Knapsack optimization engine allocating limited district funds across multiple blackspots |
| `/reports` | `ReportsPage.tsx` | Authority decision dockets and gazette report generation |
| `/reports/:id` | `ReportViewPage.tsx` | Formal printable PDF docket view with authority sign-off seals |
| `/alerts` | `AlertsPage.tsx` | Official MoRTH Alert Bulletins with dispatch codes (`MoRTH/CRIT`, `DRSC/WARN`) |
| `/settings` | `ProfileSettingsPage.tsx` | Official security credentials, jurisdiction settings, and audit logs |

### Sector 2: Technical (Road Engineering & Audit Wing)
*Route Guard Sector: `technical`*

| Route | Page / Component | Key Actions & Workflows |
|---|---|---|
| `/dashboard` | `DashboardPage.tsx` | Engineering-focused rollup of audited road stretches and blackspot rectifications |
| `/gis-risk-map` | `RiskMapPage.tsx` | Detailed GIS map with layer toggles for road geometry, speed violations, and lighting |
| `/location-diagnostics` | `LocationsListPage.tsx` | Technical road segment directory with IRC classification (NH, SH, MDR) |
| `/location-diagnostics/:id` | `LocationIntelligencePage.tsx` | Full diagnostic suite: SHAP feature contributions, vulnerable user split, hourly curves |
| `/location-diagnostics/:id/interventions` | `InterventionsPage.tsx` | Detailed civil engineering specifications (rumble strips, crash barriers, pedestrian underpasses) |
| `/location-diagnostics/:id/simulator` | `ImpactSimulatorPage.tsx` | Technical impact modeling with statistical confidence intervals and variance estimates |
| `/risk-factors` | `SectorPlaceholderPage.tsx` | Cross-location statistical analysis of top crash determinants |
| `/xai` | `MLTrainingPage.tsx` | Live interactive Machine Learning training suite: hyperparameter tuning, ROC curves |
| `/risk-forecast` | `SectorPlaceholderPage.tsx` | Multi-year predictive forecast rollups for district road networks |
| `/intervention-analysis` | `InterventionsHubPage.tsx` | Cost-effectiveness analysis and historical audit performance of installed countermeasures |
| `/field-verification` | `SectorPlaceholderPage.tsx` | On-site engineer verification portal confirming geometric defects |
| `/technical-reports` | `ReportsPage.tsx` | Detailed engineering audit documentation |

### Sector 3: Public (Citizen Road Safety & Redressal Wing)
*Route Guard Sector: `public`*

| Route | Page / Component | Key Actions & Workflows |
|---|---|---|
| `/home` | `PublicHomePage.tsx` | Welcome landing for citizens with single-click cards to Grievance, Routes, Map, and Bulletins |
| `/safety-map` | `RiskMapPage.tsx` | Citizen-friendly road safety map showing blackspots and construction alerts |
| `/report-hazard` | `ReportHazardPage.tsx` | Citizen hazard reporting form: GPS auto-detect, photo upload, complaint token generation, 24–72h SLA tracker |
| `/safer-routes` | `SaferRoutesPage.tsx` | Safe transit corridor planner: distance, travel time, lighting status, blackspot count, printable safe passage advisory |
| `/safety-updates` | `SafetyUpdatesPage.tsx` | Official Ministry Gazette notifications, speed limit revisions, and weather alerts with PDF downloads |
| `/risk-alerts` | `AlertsPage.tsx` | Real-time traffic advisories and emergency road closures |
| `/profile` | `ProfileSettingsPage.tsx` | Citizen profile and grievance history |

---

## 4. Citizen Grievance Redressal Flow (`/report-hazard`)

```
CITIZEN IDENTIFIES HAZARD (Pothole / Broken Barrier / Signal Failure)
  │
  ├─► Selects Road Category (NH / SH / City Road)
  ├─► Clicks "📍 Auto-Detect GPS" (Captures latitude/longitude ±3m)
  ├─► Uploads Geo-tagged Photo Evidence
  ├─► Selects Hazard Severity (Critical / High / Moderate)
  ├─► Agrees to Good-Faith Citizen Declaration
  │
  ▼
SUBMITS GRIEVANCE TO MoRTH / NHAI / STATE HIGHWAYS
  │
  ├─► System generates Official Tracking Token (e.g. `MoRTH/2026/TN/CB-78192`)
  ├─► Routes ticket to responsible authority (NHAI PIU or State PWD)
  ├─► Citizen tracks progress: "Under Review" → "Inspected" → "Work In Progress" → "Resolved"
  └─► Resolution SLA guaranteed under Citizen Charter: 24 to 72 Hours
```

---

## 5. Safe Corridor Appraisal Flow (`/safer-routes`)

```
CITIZEN PLANS TRIP (e.g. Gandhipuram to Airport / KMCH)
  │
  ├─► Enters Origin and Destination
  ├─► Clicks "Evaluate Safe Corridor"
  │
  ▼
AI-POWERED CORRIDOR SAFETY ENGINE
  │
  ├─► Analyzes historical crash densities along candidate routes
  ├─► Verifies street lighting infrastructure (e.g. High-mast LED coverage %)
  ├─► Computes Blackspots Encountered & Advisory Speed Limits
  ├─► Assigns Safety Grade:
  │     - Grade A: Verified Safe (>80% Safety Score)
  │     - Grade B: Moderate Caution (60-80%)
  │     - Grade C: Hazard Prone (<60%)
  │
  ▼
CITIZEN PRINTS OR STORES OFFICIAL SAFE PASSAGE ADVISORY
```

---

## 6. Budget Optimization Decision Flow (`/budget-optimizer`)

```
GOVERNMENT AUTHORITY SETS ANNUAL DISTRICT SAFETY BUDGET (e.g. ₹50,00,000)
  │
  ├─► Selects Candidate High-Risk Blackspots (Top N)
  ├─► Clicks "Optimize Budget"
  │
  ▼
0/1 KNAPSACK / DYNAMIC PROGRAMMING ALGORITHM
  │
  ├─► Evaluates cost of civil countermeasures against modeled risk reduction
  ├─► Maximizes aggregate lives saved without exceeding budgetary ceiling
  │
  ▼
RECOMMENDED ACTION PORTFOLIO
  │
  ├─► Total Budget Allocated vs Remaining Funds
  ├─► Priority Table of Funded Interventions
  └─► 1-Click Export into Official District Road Safety Committee Docket
```

---

## 7. Multilingual Architecture & Dynamic Localization

```
                                  USER SELECTS LANGUAGE
                              (English / हिन्दी / தமிழ்)
                                          │
                                 LanguageContext.tsx
                                          │
             ┌────────────────────────────┼────────────────────────────┐
             ▼                            ▼                            ▼
      en (English)                 hi (हिन्दी)                  ta (தமிழ்)
  - Administrative Terms       - केंद्रीय राजभाषा मानक          - தமிழ்நாடு சாலைப் பாதுகாப்பு
  - IRC Standards              - राष्ट्रीय पोर्टल शब्दावली      - வட்டார மொழி பயன்பாடு
             │                            │                            │
             └────────────────────────────┼────────────────────────────┘
                                          │
                             Persistent `localStorage`
                       (`rakshapath.language` = en|hi|ta)
                                          │
                            Automatic DOM lang update
                             (`<html lang="...">`)
                                          │
                    Dynamic translation applied across:
     - Government Header Bar & Ticker
     - Slide Sector Selector
     - Sidebar & Topbar
     - KPI Stat Cards & Badges
     - Hazard Grievance Form & SLA Tracker
     - Safe Routes Navigator
     - Official Gazette Bulletins
