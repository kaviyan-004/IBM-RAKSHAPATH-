# RakshaPath — Backend Technical Schema & Architecture

Comprehensive engineering specification: data pipeline, ML inference engine, intelligence services & database schemas.

## 1. Recommended Backend Architecture

RakshaPath is an end-to-end **Where → Why → When → Future Risk → Intervention → Impact → Budget** decision-intelligence pipeline rather than a standard accident dashboard. Built on FastAPI, PostgreSQL/PostGIS, XGBoost, SHAP, and DBSCAN.

- **API Layer:** FastAPI routing for Risk, Causes, Simulation, Optimization, and Reports.
- **ML/Data Layer:** Python (Pandas/NumPy), XGBoost for probability estimation, SHAP for explainability, DBSCAN for spatial clustering.
- **Intelligence Layer:** Cause mapping, counterfactual simulation, and budget portfolio optimization.

## 2. Backend Folder Structure

```
backend/app/
├── main.py, core/ (config, database, security, exceptions)
├── api/ (router.py, routes: health, locations, risk, causes, prediction,
│         emerging_risk, interventions, simulation, optimization,
│         vulnerability, confidence, reports)
├── models/ (SQLAlchemy ORM: location, road_segment, accident, cause, vehicle,
│            risk, prediction, cluster, intervention, simulation,
│            optimization, confidence, dataset)
├── schemas/ (Pydantic validation schemas)
├── services/ (business logic layers)
├── ml/ (preprocessing/, risk/, explainability/shap_engine,
│        clustering/dbscan_engine, forecasting/)
├── intelligence/ (cause_mapper, intervention_engine, counterfactual_engine,
│                  portfolio_optimizer)
├── repositories/ (data access layer)
└── utils/ (geo, scoring, metrics)
```

> **Note (this repo):** the backend currently checked in under `/backend` is a minimal FastAPI + SQLAlchemy "incidents" CRUD starter (see root `README.md`). It has **not** been rewritten to this target schema; this document is the target specification the backend should grow into. The frontend under `/frontend` is built against this specification via a mock-data-backed API layer (`frontend/src/api/*`), so wiring up real endpoints later requires no frontend rewrite — only flipping `VITE_USE_MOCK=false` and implementing the routes below.

## 3. Core PostgreSQL / PostGIS Database Schema

**Datasets & Locations**
- `datasets` — ingestion lineage from MoRTH/NCRB/Data.gov.in. Fields: `id` (UUID PK), `name`, `source`, `dataset_type`, `status`, `quality_score`, `row_count`.
- `locations` — geospatial anchor points. Fields: `id` (UUID PK), `state`, `district`, `latitude`, `longitude`, `geometry` (GEOMETRY(Point, 4326)).
- `road_segments` — segment-level granularity. Fields: `id` (UUID PK), `location_id` (FK), `road_name`, `geometry` (GEOMETRY(LineString, 4326)), `speed_limit`.

**Accidents & Feature Snapshot**
- `accidents` — primary fact table. Fields: `id` (UUID PK), `dataset_id`, `location_id`, `accident_date`, `severity`, `fatalities`, `geometry`.
- `risk_scores` & `risk_features` — ML outputs. Risk levels: 0-25 LOW, 26-50 MODERATE, 51-75 HIGH, 76-100 CRITICAL.
- `shap_explanations` — root-cause attribution mapping feature contributions and ranking for explainable AI outputs.

**Spatial & Intelligence Tables**

| Table | Key columns | Purpose |
|---|---|---|
| `risk_clusters` | `cluster_id`, `geometry` (Polygon), `density_score`, `trend_score` | DBSCAN black-spot and emerging-hotspot clustering |
| `interventions` & `evidence` | `name`, `category`, `target_cause`, `expected_effect_min/max` | Evidence-backed countermeasure catalog |
| `simulations` | `simulation_id`, `baseline_risk`, `intervention_ids` | What-if counterfactual simulation tracking |
| `optimization_runs` | `budget_limit`, `total_cost`, `expected_benefit`, `remaining_budget` | Optimal safety portfolio allocation runs |

## 4. Complete REST API Schema

**Core & Risk**
- `GET /api/health`
- `GET /api/locations`
- `GET /api/locations/{id}/segments` (filtered by state, district, risk level)
- `GET /api/risk/map`
- `GET /api/risk/{location_id}`
- `GET /api/risk/high-risk`
- `GET /api/risk/emerging`
- `GET /api/causes/{location_id}`
- `GET /api/causes/{location_id}/shap` — ranked contributing features with point attribution

**Intelligence & Decision**
- `GET /api/interventions/{location_id}/top`
- `POST /api/simulation` — what-if scenario testing; returns baseline vs simulated post-intervention risk
- `POST /api/optimize` — payload `{ budget_limit, locations[] }`; returns optimal intervention portfolio maximizing safety benefit within budget
- `GET /api/report/{location_id}/pdf` — compiles location profile, risk scores, trends, SHAP factors, and recommended interventions into an authority PDF

**Additional endpoints implied by the app flow / used by the frontend mock layer** (not in the original PDF, added here for consistency with `frontend/src/api/*`):
- `GET /api/vulnerability/{location_id}`
- `GET /api/temporal/{location_id}`
- `GET /api/prediction/{location_id}`
- `GET /api/dashboard/summary`
- `GET /api/alerts`
- `POST /api/auth/login`, `POST /api/auth/signup`

## 5. Critical Spatial Database Indexes

```sql
CREATE INDEX idx_locations_geometry ON locations USING GIST (geometry);
CREATE INDEX idx_road_segments_geometry ON road_segments USING GIST (geometry);
CREATE INDEX idx_accidents_geometry ON accidents USING GIST (geometry);
CREATE INDEX idx_risk_location ON risk_scores(location_id);
CREATE INDEX idx_risk_score ON risk_scores(risk_score);
```

## 6. Backend Service & Intelligence Workflows

**Risk Inference Flow:**
`Frontend → GET /api/risk/{id} → RiskService → Database Feature Builder → XGBoost Model Inference → Probability Calibration (0-100 Score) → Confidence Service → JSON Response`

**Intervention Flow:**
`SHAP Cause Fingerprint → Top Contributing Causes → Cause-to-Intervention Mapping Database → Road Context Matching → Cost & Evidence Filtering → Top 3 Recommendations`

**Budget Optimization Objective:**
`Maximize Σ (RiskReduction × Confidence) subject to Σ Cost ≤ BudgetLimit`

*(Mirrored client-side in `frontend/src/utils/knapsack.ts` and `frontend/src/api/budget.ts` for the mock-data mode.)*

## 7. MVP Implementation Priorities

| Tier | Core components | Scope |
|---|---|---|
| 🔴 P0 (Must Work) | Dataset ingestion, PostGIS DB, accident processing, feature engineering, XGBoost, risk score (0-100), SHAP, predictions, intervention engine, simulation, optimizer, REST APIs | Core hackathon deliverables & primary intelligence loop |
| 🟠 P1 (Enhanced) | DBSCAN clustering, emerging risk detection, confidence engine, vulnerability analysis, authority PDF report generation | Advanced spatial analysis & reporting polish |
| 🟢 P2 (Future) | Citizen reporting module, multilingual support, post-intervention feedback loops | Post-hackathon production roadmap |

**Summary:** RakshaPath's architecture strictly avoids hardcoded heuristics for AI predictions and calculations, ensuring rigorous mathematical alignment with the technical specification.
