# RakshaPath — Technical Specification & Architecture

AI-Powered Road Safety Decision-Intelligence Platform • Comprehensive System Design & Architecture

## 1. Executive Summary & Product Positioning

Road accident prevention today relies heavily on lagging indicators — reacting to fatal black spots only after lives are lost. RakshaPath transforms MoRTH, NCRB, and geospatial datasets into an actionable, proactive decision-support system, answering the entire safety lifecycle: **Where → Why → When → Future Risk → What Intervention → Priority Action → What-if Impact → Budget Allocation.**

**Core value proposition:** bridges raw government tabular data and civil-engineering intervention via machine-learning risk scoring, SHAP explainability, spatial DBSCAN clustering, counterfactual what-if simulation, and 0/1 knapsack budget optimization.

## 2. End-to-End Architectural Pipeline

| Pipeline tier | Core technologies | Responsibility |
|---|---|---|
| Data Sources | MoRTH, NCRB, Data.gov.in, OpenStreetMap | Ingestion of raw accident logs, road geometry, severity metrics, demographic data |
| Pipeline & Storage | Python, Pandas, NumPy, PostgreSQL + PostGIS | Cleaning, schema standardization, spatial indexing, coordinate transformation |
| AI/ML Engine | XGBoost, Scikit-learn, SHAP, DBSCAN | Risk scoring, probability calibration, cause attribution, anomaly detection, spatial clustering |
| Intelligence Core | FastAPI, Integer Programming (Knapsack Solver) | Intervention mapping, counterfactual simulation, risk forecasting, budget portfolio allocation |
| Presentation | React.js, Vite, Leaflet, OpenStreetMap, Recharts | Authority dashboard, risk heatmaps, simulation controls, PDF report generation |

## 3. Recommended Technical Stack & Infrastructure

**Frontend & Visualization**
- Framework: React.js 18+ with Vite
- Mapping: Leaflet.js with OpenStreetMap vector tiles
- Analytics: Recharts for trend analysis & risk forecasting
- Styling & icons: Tailwind CSS with Lucide icons

**Backend & Database Infrastructure**
- API engine: Python FastAPI with async Pydantic validation
- Primary database: PostgreSQL 15 with PostGIS spatial extension
- Containerization: Docker & Docker Compose
- Deployment: Vercel (frontend CDN) & Render / AWS EC2 (backend API)

> **This repo's implementation:** the frontend (`/frontend`) follows this stack exactly — React 18 + Vite + TypeScript, Tailwind CSS, `react-leaflet` (Leaflet + OpenStreetMap tiles), Recharts, `lucide-react`. It ships with a mock-data service layer standing in for the backend until the FastAPI service below is implemented; see `frontend/.env.example`.

## 4. AI / ML Engine & Risk Scoring Algorithm

Gradient Boosted Trees (XGBoost) trained on historical accident records, road geometry features, meteorological data, and temporal variables compute raw collision probabilities, translated into a 0–100 Risk Score.

| Raw probability | Risk score | Classification | Mandatory action protocol |
|---|---|---|---|
| 0.00–0.25 | 0–25 | Low Risk | Routine monitoring, scheduled maintenance, quarterly audit |
| 0.26–0.50 | 26–50 | Moderate Risk | Scheduled inspection, signage check, vegetation clearance |
| 0.51–0.75 | 51–75 | High Risk | Targeted civil intervention review, lighting audit, speed monitoring |
| 0.76–1.00 | 76–100 | Critical Risk | Immediate engineering intervention, emergency speed restrictions, priority budget allocation |

## 5. Explainable AI (SHAP) & Root Cause Attribution

SHAP (Shapley Additive exPlanations) decomposes location risk scores into concrete, actionable contributing factors — e.g., for a Risk Score of 82/100 (Critical): night-time lighting deficiency (+18.4 pts, primary driver), historical high-severity accident frequency (+14.2), two-wheeler involvement >65% (+11.0), unsignalized complex intersection geometry (+9.3), monsoon waterlogging susceptibility (+6.1).

## 6. Emerging Risk Detection (DBSCAN Clustering)

Spatial density-based clustering (DBSCAN) plus trajectory analysis groups dense accident coordinates without pre-defining cluster counts, categorizing zones into: **Established High-Risk Black Spots** (consistently high density, multi-year), **Emerging High-Risk Zones** (moderate density with a sharp recent upward trajectory), and **Stable / Outlier Risk Segments** (isolated or plateaued).

## 7. Future Multi-Year Risk Prediction

Combines historical trend analysis with engineered temporal features and traffic-volume projections to forecast multi-year risk trajectories (e.g., 2023: 63 → 2024: 69 → 2025: 74 → 2026: 78 → 2027: 82 predicted), alerting authorities before fatal spikes occur.

## 8. Intervention Intelligence Engine

Root causes map directly to a validated civil-engineering intervention knowledge base — evidence-backed, not arbitrary LLM output.

| Cause fingerprint | Recommended intervention | Road context | Est. cost |
|---|---|---|---|
| Night-time visibility failure | Street Lighting Upgrade & High-Mast LED | Urban junction / dark highway | ₹5,00,000 |
| Excessive approach speed | Rumble Strips & Speed Management System | High-speed corridor / school zone | ₹3,00,000 |
| Unsafe lateral merging | Median Barrier & Reflective Studs | Multi-lane undivided highway | ₹7,00,000 |
| Pedestrian conflict hazard | Signalized Zebra Crossing & Refuges | High-density commercial corridor | ₹4,50,000 |

## 9. What-If Counterfactual Impact Simulation

Example at Location XYZ (baseline risk 82/100): Option A Street Lighting → 68 (17.1% reduction); Option B Speed Management → 63 (23.2%); Option C Median Barrier → 72 (12.2%); Option D Combined A+B → 52 (36.6% cumulative, reflecting diminishing returns rather than pure addition).

## 10. Budget-Constrained Portfolio Optimizer

Given a fixed capital pool, RakshaPath solves a **0/1 Knapsack** optimization to maximize total expected safety benefit across competing locations under financial constraints.

- **Inputs:** location ID, intervention type, implementation cost, expected safety-benefit delta, model confidence rating.
- **Objective:** `Maximize Σ (RiskReduction_i × Confidence_i) subject to Σ Cost_i ≤ BudgetLimit`.
- **Output:** optimal subset of interventions yielding maximum aggregate risk reduction within the financial ceiling.

## 11. Data Confidence & Vulnerability Layer

Every prediction carries a Data Confidence Index (e.g., 81% confidence, high data quality, 2019–2023 coverage). Low observation counts flag "Low Confidence" in the UI to prevent unverified capital expenditure.

## 12. FastAPI Backend & REST API Endpoints

| Endpoint | Description | Response |
|---|---|---|
| `GET /api/risk/{location_id}` | Normalized risk score & multi-year trend | JSON (score, level, trend, confidence) |
| `GET /api/causes/{location_id}` | SHAP feature contribution weights | JSON (cause fingerprint array) |
| `POST /api/simulation` | Counterfactual risk reduction model | JSON (before/after risk estimates) |
| `POST /api/optimize` | 0/1 Knapsack budget allocation | JSON (optimal intervention portfolio) |
| `GET /api/report/{location_id}` | Authority PDF safety report | JSON/Binary document stream |

## 13. Monorepo Project Structure (target)

```
RakshaPath/
├── frontend/       # React + Vite + Leaflet mapping + Recharts analytics
├── backend/app/    # FastAPI routers, database services, ML inference & optimization
├── data/           # Raw MoRTH logs, processed shapefiles, sample datasets
├── models/         # Serialized XGBoost risk models & SHAP explainer artifacts
└── docker-compose.yml
```

> This repo currently matches the mandatory `frontend/` + `backend/` + `docs/` split (see root README); `data/`, `models/`, and `docker-compose.yml` are not yet present and belong to a later implementation phase.

## 14. Hackathon Implementation Priority Roadmap

- **P0 — Must Work (Core Demo Loop):** data ingestion pipeline, Leaflet risk map, 0–100 risk score, SHAP cause analysis, future risk prediction, 3 intervention recommendations, what-if simulation, budget optimizer.
- **P1 — Important Polish:** DBSCAN emerging-risk detection, confidence scoring layer, vulnerability analysis, authority report generation.
- **P2 — Future Scale:** citizen hazard-reporting mobile app, multilingual support, post-intervention feedback loops.
