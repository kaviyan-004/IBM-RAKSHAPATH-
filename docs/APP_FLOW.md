# RakshaPath — Complete Application Flow

*Predict • Understand • Intervene • Simulate • Save Lives*

From government accident data to risk intelligence, intervention recommendations, what-if simulation, budget optimization, and authority-ready reporting.

## 1. Product Vision

RakshaPath is a decision-intelligence application rather than a dashboard-only system. It guides an authority from identifying a risky location through understanding causes, predicting future risk, selecting interventions, estimating impact, and deciding where to spend a limited safety budget.

**Core decision chain:**
`WHERE → WHY → WHO → WHEN → FUTURE RISK → WHAT TO CHANGE → WHICH ACTION FIRST → WHAT-IF IMPACT → WHERE TO SPEND`

## 2. Complete High-Level App Flow

```
RAKSHA PATH
  → LANDING PAGE
  → SELECT DISTRICT / AREA
  → RISK MAP
  → SELECT HIGH-RISK OR EMERGING LOCATION
  → LOCATION PROFILE
      → WHY? (Cause)  |  WHO? (Vulnerability)  |  WHEN? (Time Pattern)
  → FUTURE RISK PREDICTION
  → EMERGING RISK DETECTION
  → INTERVENTION RECOMMENDATION
  → COMPARE INTERVENTIONS
  → WHAT-IF SIMULATION
  → IMPACT + CONFIDENCE + UNCERTAINTY
  → ENTER SAFETY BUDGET
  → BUDGET OPTIMIZER
  → BEST INTERVENTION PORTFOLIO
  → AUTHORITY DECISION DASHBOARD
  → GENERATE PDF REPORT
```

## 3. Screen-by-Screen Application Flow

**01 — Landing Page.** Introduces RakshaPath and routes into the dashboard. Elements: logo/tagline, short explanation, "Explore Risk Map," "Decision Dashboard," "View Analytics." Primary action: Explore Risk Map. *(Mapped in this repo to the Login/Signup screens plus the Dashboard as the landing view.)*

**02 — Area / District Selection.** Flow: State → District → City / Area → Road or Location. Selected geography becomes the context for all subsequent risk/prediction/cause/intervention results.

**03 — Risk Map.** Map layers: Low / Moderate / High / Critical / Emerging risk. Controls: State/District, Year, Time period, Risk level, Road/location. Clicking a location opens its Location Profile.

**04 — Location Profile.** Displays Risk Score (0–100), Risk Level, current trend, confidence, data quality, accident count, fatalities, injuries, historical coverage. Branches into WHY / WHO / WHEN.

**05 — WHY? Cause Analysis.** Cause fingerprint, cause distribution, model feature contributions, SHAP explanation, major contributing factors. **Important:** model contribution must not be presented as proven causation.

**06 — WHO? Vulnerability Analysis.** Categories only when supported by the dataset: Two-wheelers, Pedestrians, Cars, Heavy vehicles, Other. Shows involvement, severity and fatality patterns with confidence.

**07 — WHEN? Temporal Risk.** Hour/time period, day of week, weekday vs weekend, month, year, day vs night — only variables actually available in the source data are displayed.

**08 — Future Risk Prediction.** Current risk, future predicted risk, trend direction, lower/upper uncertainty bounds, confidence, prediction horizon. Uncertainty must be visible, never a guaranteed outcome.

**09 — Emerging Risk.** Logic: historical risk → recent trend → spatial concentration → emerging-risk signal → "EMERGING HOTSPOT." One of RakshaPath's major preventive-intelligence capabilities.

**10 — Intervention Recommendation.** ≥3 alternatives where evidence/context exist. Each contains: intervention name, target cause, cause match, context match, estimated cost, expected benefit range, confidence, implementation constraints, evidence summary.

**11 — Intervention Comparison.** Compare: Cost | Expected benefit | Cause match | Context match | Confidence | Constraints. Primary action: Simulate Impact.

**12 — What-If Simulation.** Per intervention: before risk → modeled after-risk → estimated reduction → uncertainty range → confidence. Shows assumptions and evidence; never implies a guaranteed result.

**13 — Safety Budget Optimizer.** Input: available budget. Considers Location + Risk + Intervention + Cost + Expected Benefit + Confidence. Objective: maximize expected safety benefit subject to budget and implementation constraints.

**14 — Best Intervention Portfolio.** Selected locations, selected interventions, cost per action, total allocation, remaining budget, expected benefit, confidence, priority rank — converts recommendations into an authority-level action plan.

**15 — Authority Decision Dashboard.** Critical/emerging/high-risk locations, top priorities, recommended interventions, budget allocation, expected impact, confidence/uncertainty — supports a quick authority decision.

**16 — Authority Report.** Sections: Executive Summary, High-Risk Locations, Risk Map, Risk Scores, Cause Analysis, Vulnerability Analysis, Future Risk, Emerging Risk, Intervention Recommendations, What-If Simulation, Budget Optimization, Expected Impact, Confidence & Uncertainty, Data Sources, Model Information.

## 4. Detailed User Journey

```
OPEN RAKSHA PATH → SELECT DISTRICT → OPEN RISK MAP → CLICK CRITICAL LOCATION
→ VIEW 0–100 RISK SCORE → ASK "WHY IS IT RISKY?" → CAUSE FINGERPRINT + SHAP
→ ASK "WHO IS VULNERABLE?" → VULNERABILITY ANALYSIS → ASK "WHEN IS RISK HIGHEST?"
→ TEMPORAL ANALYSIS → ASK "WHAT HAPPENS NEXT?" → FUTURE RISK PREDICTION
→ EMERGING RISK CHECK → ASK "WHAT SHOULD WE DO?" → 3+ INTERVENTION OPTIONS
→ COMPARE OPTIONS → ASK "WHAT IF WE IMPLEMENT THIS?" → WHAT-IF SIMULATION
→ SHOW IMPACT + UNCERTAINTY → ENTER SAFETY BUDGET → OPTIMIZE PORTFOLIO
→ VIEW BEST ACTION PLAN → GENERATE AUTHORITY REPORT
```

## 5. Frontend ↔ Backend Flow

```
USER → REACT FRONTEND (District Selection, Risk Map, Location Profile, Cause Analysis,
        Vulnerability, Prediction, Interventions, Simulation, Optimization, Reports)
     → FASTAPI BACKEND (Location API, Risk API, Cause API, Prediction API,
        Intervention API, Simulation API, Optimization API, Report API)
     → INTELLIGENCE SERVICES (Data Processing, Feature Engineering, Risk Model, SHAP,
        Forecasting, Emerging Risk, Intervention Engine, Simulation Engine, Portfolio Optimizer)
     → POSTGRESQL + POSTGIS
     → GOVERNMENT / APPROVED DATASETS
```

## 6. Main Navigation Structure

| Navigation | Purpose |
|---|---|
| Dashboard | Overall road-safety summary for selected geography |
| Risk Map | Explore spatial risk and emerging hotspots |
| Locations | Search and inspect individual locations / road segments |
| Cause Analysis | Understand model-associated risk factors |
| Vulnerability | Analyze vulnerable road-user groups |
| Predictions | View future risk and trend |
| Interventions | View and compare recommended actions |
| Simulation | Run what-if intervention scenarios |
| Budget Optimizer | Choose the best portfolio under budget constraints |
| Reports | Generate and view authority-ready reports |

*(In this repo, Cause Analysis / Vulnerability / Predictions are consolidated as tabs on the Location Intelligence page rather than separate top-level nav items, to match the 12-screen UI design while keeping the sidebar compact.)*

## 7. Hackathon Demo Flow — 5 Minutes

| Time | Demo action |
|---|---|
| 0:00–0:30 | Open RakshaPath → select pilot district |
| 0:30–1:00 | Show Risk Map → identify critical and emerging locations |
| 1:00–1:40 | Open location → show 0–100 score, trend and confidence |
| 1:40–2:20 | Show WHY / WHO / WHEN analysis |
| 2:20–2:50 | Show future prediction and emerging-risk signal |
| 2:50–3:30 | Show three intervention recommendations |
| 3:30–4:10 | Run what-if simulation and show uncertainty |
| 4:10–4:40 | Enter safety budget → run optimizer → show best portfolio |
| 4:40–5:00 | Generate authority report → finish with decision-intelligence USP |

## 8. Data-to-Decision Flow

```
GOVERNMENT ACCIDENT DATA → DATA INGESTION → VALIDATION + QUALITY CHECK
→ CLEANING + NORMALIZATION → GEOSPATIAL PROCESSING → FEATURE ENGINEERING
→ RISK MODEL → 0–100 RISK SCORE → CAUSE / SHAP → VULNERABILITY → TEMPORAL PATTERNS
→ FUTURE PREDICTION → EMERGING RISK → INTERVENTION KNOWLEDGE BASE → 3+ RECOMMENDATIONS
→ WHAT-IF SIMULATION → IMPACT RANGE + CONFIDENCE → BUDGET OPTIMIZATION → BEST PORTFOLIO
→ AUTHORITY DECISION → REPORT / ACTION
```

## 9. Product Rules That Must Be Preserved

- Actual risk scores, predictions, SHAP values, simulation results and optimizer outputs must be generated from real data/model execution — not hardcoded. *(The current frontend uses a mock data + service-layer abstraction exactly so the real model outputs can be swapped in without UI changes — see the root README and `.env` / `VITE_USE_MOCK`.)*
- Do not display weather, traffic, lighting, road-condition or other contextual factors unless genuinely supported by the selected dataset.
- Cause analysis communicates model association/contribution, not proven causation.
- Impact estimates are modeled scenarios and must include uncertainty, assumptions and confidence.
- Intervention recommendations must contain evidence, feasibility/context matching and cost/benefit ranges where available.
- All important analytical outputs retain dataset version, feature version, model version and prediction timestamp.
- Confidence and data quality are visible throughout the decision flow.
- Field validation is required before real-world operational decisions.

## 10. RakshaPath's Core USP

> "RakshaPath doesn't just tell authorities where accidents happen. It tells them why the location is risky, who is vulnerable, when risk peaks, how that risk may evolve, what interventions can be used, what could happen if they are implemented, and where a limited safety budget should be spent first."

## 11. Final App Architecture in One View

```
RAKSHA PATH → USER / AUTHORITY → RISK MAP → LOCATION PROFILE
  → WHY? / WHO? / WHEN?
  → FUTURE RISK → EMERGING RISK → INTERVENTIONS → WHAT-IF ENGINE → IMPACT ESTIMATE
  → BUDGET OPTIMIZER → BEST PORTFOLIO → DECISION DASHBOARD → AUTHORITY REPORT
```
