# RakshaPath — Full Implementation Flow

## Core Idea

```
GOVERNMENT DATA → DATA ENGINE → DATABASE → RISK ANALYSIS → AI/ML ENGINE → RISK SCORE
→ CAUSE + VULNERABILITY → FUTURE PREDICTION → EMERGING RISK → INTERVENTION ENGINE
→ WHAT-IF SIMULATION → IMPACT ESTIMATION → BUDGET OPTIMIZATION → AUTHORITY DECISION → REPORT
```

## 1. Data Collection Layer

Accident records: date, time, location, state, district, accident count, fatalities, injuries, cause, vehicle type, and other available attributes. The system supports multiple datasets because different government sources use different column names/structures.

**Backend process:** CSV/Dataset → Upload/Import → Schema Detection → Column Mapping → Validation → Data Cleaning → Database.

**Important:** if a dataset does not contain weather, traffic volume, lighting, etc., RakshaPath must not invent those values.

## 2. Data Validation & Cleaning

- **Missing values:** location/cause/fatalities = NULL → identified, and the data-quality impact recorded.
- **Duplicate records:** same accident → duplicate detection → remove/flag.
- **Invalid values:** e.g. fatalities = -5, year = 2099, latitude = 500 → detected and flagged.

**Output:** Raw Dataset → Clean Dataset + Data Quality Score.

## 3. Database Layer

PostgreSQL + PostGIS (location-heavy workload).

```
datasets → accidents → (causes, vehicles) → locations → road_segments
```

Plus analytical tables: `risk_scores`, `risk_features`, `predictions`, `shap_explanations`, `interventions`, `simulations`, `optimization_runs`, `confidence_records`.

## 4. Location Processing

State → District → City → Location → Road Segment/Junction. PostGIS enables spatial operations (e.g. clustering nearby accidents into a high-risk area) that power the Risk Map.

## 5. Feature Engineering

Possible features (only when supported by the actual dataset): accident frequency, fatality frequency, injury frequency, severity index, historical trend, vehicle-type distribution, two-wheeler involvement, pedestrian involvement, time patterns, spatial density.

Example: 2019→30, 2020→34, 2021→39, 2022→47, 2023→55 accidents ⇒ derived Historical Trend = Increasing.

## 6. AI Risk Model

`Historical Data → Feature Engineering → Train/Test Split → ML Training → Validation → Model → Risk Prediction` (e.g. XGBoost), evaluated with time-aware validation where applicable.

## 7. 0–100 Risk Score

Model output → user-friendly score. Example interpretation: 0–24 LOW, 25–49 MODERATE, 50–74 HIGH, 75–100 CRITICAL (thresholds configurable and validated).

`Location → Risk Model → Risk Score → Risk Level → Confidence`. The number must come from the model/data, never be hardcoded in production.

## 8. Risk Map

All calculated locations displayed geographically (Low/Moderate/High/Critical/Emerging). Filters: State, District, Year, Risk level, Road, Time period. Clicking a location opens its complete intelligence profile.

## 9–14. Location Intelligence Profile

Branches into **WHY?** (cause fingerprint + SHAP; contribution ≠ causation), **WHO?** (vulnerability by road-user group), **WHEN?** (temporal concentration), **Future Risk Prediction** (risk, trend, bounds, confidence), and the **Emerging Risk Engine** (`Historical Risk + Recent Trend + Accident Concentration → Emerging Risk Score → Emerging Hotspot`).

## 15–19. Intervention → Simulation → Impact

Intervention Intelligence Engine draws from a knowledge base (speed management, road engineering, junction improvement, lighting, signage, enforcement, pedestrian safety). Ranking scores ≥3 alternatives by cause match, context match, cost, expected benefit, confidence, priority. What-if simulation (single and multi-intervention combinations) produces estimated after-risk, reduction range, confidence, and uncertainty — an estimate, never a guarantee.

## 20–21. Budget Optimization

Objective: maximize expected safety benefit within the available budget (e.g. ₹10,00,000). Output: optimized safety portfolio — recommended action plans across locations, total budget, expected benefit, portfolio confidence.

## 22–23. Authority Dashboard & Report

Dashboard summarizes critical/high-risk/emerging locations, top priorities, recommended budget, and expected benefit. The PDF report covers executive summary, risk map, high-risk locations, risk scores, cause analysis, vulnerability analysis, temporal analysis, future prediction, emerging risk, intervention recommendations, what-if simulation, impact estimate, budget optimization, confidence & uncertainty, data sources, and model information.

## 24–25. Complete Technical Flow

```
Government Data → Data Ingestion → Validation & Quality → Cleaning & Normalization
→ Postgres + PostGIS → ML Engine → Intelligence Services
```

```
User → React Frontend → FastAPI APIs → (PostgreSQL + PostGIS, ML Engine, Intelligence)
```

## Final Project in One Flow

```
DATA → UNDERSTAND → CLEAN → MAP → PREDICT → SCORE → EXPLAIN → IDENTIFY VULNERABILITY
→ FIND TIME PATTERNS → PREDICT FUTURE → DETECT EMERGING HOTSPOTS → RECOMMEND 3+ ACTIONS
→ SIMULATE "WHAT IF?" → ESTIMATE IMPACT → OPTIMIZE LIMITED BUDGET → GENERATE ACTION PLAN
→ GENERATE AUTHORITY REPORT
```

## Status in This Repository

| Layer | Status |
|---|---|
| Frontend (`/frontend`) | Built: all screens in `docs/UI_DESIGN.md`, wired to a mock-data API layer shaped exactly like `docs/BACKEND_SCHEMA.md` |
| Backend (`/backend`) | Pre-existing minimal FastAPI "incidents" CRUD starter — not yet the risk/cause/prediction/intervention/simulation/optimization service described above |
| Database | Not yet provisioned (target: PostgreSQL + PostGIS per `docs/BACKEND_SCHEMA.md`) |
| ML models | Not yet trained — frontend mock layer stands in until XGBoost/SHAP/DBSCAN services exist |

**Next steps to move from mock to real:** implement the FastAPI routes in `docs/BACKEND_SCHEMA.md` §4 under `/backend`, point `frontend/.env`'s `VITE_API_BASE_URL` at it, and set `VITE_USE_MOCK=false` — no frontend rewrite required since every page consumes data exclusively through `frontend/src/api/*`.
