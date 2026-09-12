# RakshaPath — UI/UX Design Reference (12 Pages)

AI-Powered Road Safety Decision Intelligence Platform. This document records the 12-screen visual design supplied for the build (indigo/purple authority-dashboard theme, "Predict · Understand · Intervene · Simulate · Save Lives") and maps each mockup screen to its implementation in `/frontend`.

| # | Design screen | Key elements in the mockup | Implemented as |
|---|---|---|---|
| 01 | Login Page | RakshaPath logo, email/password, "Sign in with Google / Government SSO", hero image with tagline "Saving Lives. Building Safer India." | `frontend/src/pages/LoginPage.tsx` + `AuthLayout.tsx` |
| 02 | Sign Up & Role Setup | Create Account / Select Role / Complete stepper, full name, official email, password, confirm password, terms checkbox | `frontend/src/pages/SignupPage.tsx` |
| 03 | Command Dashboard | Stat cards (Total Locations Analyzed, High-Risk Locations, Emerging Risk Locations, Interventions Pending, Current Safety Budget), District Risk Overview map, Top 5 Priority Locations list | `frontend/src/pages/DashboardPage.tsx` |
| 04 | Risk Map | State/District/Road Type/Risk Level filters, search box, colored risk markers, side panel with selected-location summary + peak risk time + "View Details" | `frontend/src/pages/RiskMapPage.tsx` + `frontend/src/map/RiskMap.tsx` |
| 05 | Location Intelligence | Back-to-map link, risk score badge, tabs (Overview / Risk Factors / Why This Risk? / Forecast / Historical Trends), key facts panel | `frontend/src/pages/LocationIntelligencePage.tsx` (tabs: Overview, Why This Risk?, Who's Vulnerable?, When It Happens, Forecast) |
| 06 | Intervention Intelligence | Ranked recommended interventions (Speed Enforcement, Street Lighting, Median Improvement) with est. cost, expected impact, confidence | `frontend/src/pages/InterventionsPage.tsx` + `InterventionCard.tsx` |
| 07 | Impact Simulator | Intervention checkboxes, "Run Simulation" button, bar chart (Current Risk vs After X vs After Y vs Both Combined), "Estimated Risk Reduction ↓38%" callout | `frontend/src/pages/ImpactSimulatorPage.tsx` + `charts/ImpactBarChart.tsx` |
| 08 | Budget Optimizer | Available Budget input, Locations to Consider, Optimization Goal, "Optimize" button, Optimal Intervention Plan table with totals | `frontend/src/pages/BudgetOptimizerPage.tsx` + `utils/knapsack.ts` |
| 09 | Reports & Decision Center | Report type cards (Location / District / Intervention / Budget), filters, "Generate Report" button, Recent Reports list with download | `frontend/src/pages/ReportsPage.tsx` |
| 10 | Generated Report (PDF View) | Document-styled preview: executive summary, major risk factors, recommended intervention, modeled risk reduction, estimated cost | `frontend/src/pages/ReportViewPage.tsx` |
| 11 | Alerts & Notifications | Filter tabs (All / High Risk Alert / Emerging Risk / Intervention Updates / System), alert list with icons and relative timestamps | `frontend/src/pages/AlertsPage.tsx` |
| 12 | Profile & Settings | Avatar + "Edit Photo", Profile/Preferences/Security/System Info tabs, Quick Actions (Change Password, Manage Sessions, Notification Settings, Help & Support), Logout | `frontend/src/pages/ProfileSettingsPage.tsx` |

## Design System Notes

- **Palette:** indigo/brand-600 (`#4f46e5`) as the primary accent, slate neutrals for text/borders, semantic risk colors — emerald (low), amber (moderate), orange (high), red (critical) — defined once in `frontend/src/utils/riskLevel.ts` and reused by badges, the map, and charts.
- **Typography/spacing:** Tailwind CSS utility classes throughout (`frontend/tailwind.config.js` extends the `brand` color scale); no separate design-token file was introduced since Tailwind's scale covers the mockup's needs.
- **Icons:** `lucide-react`, matching the line-icon style in the mockup.
- **Layout shell:** a persistent left sidebar (`components/Sidebar.tsx`) with the nav items from the mockup's page 03 sidebar (Dashboard, Risk Map, Locations, Interventions, Budget Optimizer, Reports, Alerts, Settings) plus a top bar (`components/Topbar.tsx`) with search and the notification bell shown across every authenticated screen in the mockup.

## Deviations From the Literal Mockup (and why)

- **Locations page** was not a separate screen in the 12-page mockup but is a nav item in its sidebar (page 03) and a named capability in `docs/APP_FLOW.md` §6 ("Locations — search and inspect individual locations/road segments"). Implemented as `LocationsListPage.tsx`, a searchable table linking into the same Location Intelligence page as the map.
- **Interventions** as a standalone sidebar item (rather than only reachable from a specific location) needed a landing point; `InterventionsHubPage.tsx` lets the authority pick a location first, then reuses the page-06 design.
- Page 05 and page 06's tab bars appear visually identical in the mockup (`Overview | Risk Factors | Why This Risk? | Forecast | Historical Trends`), which would duplicate the same analysis across two screens. The implementation instead gives Location Intelligence the full WHY/WHO/WHEN/Forecast analysis (per `docs/APP_FLOW.md` screens 04–09) and keeps Intervention Intelligence focused purely on ranked interventions + selection for simulation, which matches the *content* of page 06 more closely than a literal tab-for-tab copy would.
