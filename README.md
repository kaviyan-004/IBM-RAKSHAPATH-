# RakshaPath

**AI-Powered Road Safety Decision-Intelligence Platform**
*Predict • Understand • Intervene • Simulate • Save Lives*

RakshaPath turns historical road-accident data into an actionable authority workflow: an interactive risk map, a normalized 0–100 risk score, cause analysis, future-risk prediction, cause-linked intervention recommendations, what-if impact simulation, and a budget-constrained portfolio optimizer. Built for IBM BOB National Hackathon — Problem Statement #3 (Transport: RoadSafe India).

Full product/technical background lives in [`docs/`](docs/):

- [`docs/PRD.md`](docs/PRD.md) — product requirements
- [`docs/APP_FLOW.md`](docs/APP_FLOW.md) — screen-by-screen application flow
- [`docs/TECH_STACK.md`](docs/TECH_STACK.md) — architecture & technology choices
- [`docs/BACKEND_SCHEMA.md`](docs/BACKEND_SCHEMA.md) — database schema & REST API spec
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — end-to-end build flow and current status
- [`docs/UI_DESIGN.md`](docs/UI_DESIGN.md) — the 12-screen UI design and its mapping to the frontend

## Repository Structure

```
RakshaPath075/
├── frontend/     # React + Vite + TypeScript app (all UI code)
├── backend/      # FastAPI service (all API/data/model code)
├── docs/         # Product & technical documentation
└── README.md
```

Frontend and backend are independently runnable and communicate only over HTTP. Neither imports the other's source code.

## Frontend

Stack: React 18 + Vite + TypeScript, Tailwind CSS, React Router, `react-leaflet` (risk map), Recharts (trend/impact charts), `lucide-react` icons.

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

The frontend currently runs against **mock data** so every one of the 12 designed screens (login, dashboard, risk map, location intelligence, interventions, impact simulator, budget optimizer, reports, alerts, profile/settings — see `docs/UI_DESIGN.md`) is fully interactive without a backend. All data access goes through `frontend/src/api/*`, which either serves `frontend/src/data/mock/*` or calls the real backend, controlled by `frontend/.env`:

```bash
cp frontend/.env.example frontend/.env
# VITE_USE_MOCK=true   -> use bundled mock data (default, no backend needed)
# VITE_USE_MOCK=false  -> call VITE_API_BASE_URL per docs/BACKEND_SCHEMA.md
```

Because every page consumes data exclusively through that API layer, plugging in the real backend later requires no UI rewrite.

Frontend source layout:

```
frontend/src/
├── api/          # one module per backend domain (locations, risk, causes, prediction,
│                    interventions, simulation, budget, reports, alerts, auth, dashboard)
├── components/   # shared UI (Sidebar, Topbar, RiskBadge, InterventionCard, ...)
├── charts/       # Recharts wrappers (trend line, impact bars, risk gauge)
├── map/          # Leaflet risk map
├── data/mock/    # mock dataset standing in for the backend (see Mock Data Rule below)
├── hooks/        # useAuth, useAsync, useLocationsWithRisk, useLocationDetail, useAlerts
├── layouts/      # AppLayout (sidebar+topbar shell), AuthLayout (login/signup)
├── pages/        # one component per screen in docs/UI_DESIGN.md
├── routes/       # route table
├── services/     # low-level HTTP client + mock/real switch
├── types/        # shared TypeScript types mirroring docs/BACKEND_SCHEMA.md
└── utils/        # risk-level formatting, knapsack optimizer, counterfactual simulation math
```

## Backend (MongoDB Edition)

The backend under `/backend` is a production-grade FastAPI service using **MongoDB** (`motor` async driver) implementing the complete RakshaPath architecture described in [`docs/BACKEND_SCHEMA.md`](docs/BACKEND_SCHEMA.md) and [`docs/APP_FLOW.md`](docs/APP_FLOW.md).

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

- API: http://localhost:8000
- Interactive Swagger docs: http://localhost:8000/docs
- Run automated MongoDB test suite: `python -m pytest backend/test_backend.py`

### MongoDB Collections Architecture

| Collection | Schema / Features |
|---|---|
| `locations` | Embedded documents containing coordinates (`geometry` 2dsphere index), `risk_score` (0–100), `cause_fingerprint` (SHAP factors), `vulnerability` (groups), `temporal` (hourly/day distributions), and `forecast` (multi-year series with uncertainty bounds). |
| `interventions` | Catalog of countermeasures with min/max costs, expected effect ranges, and confidence levels. |
| `users` | Authority official credentials with SHA-256 salted hashing and JWT tokens. |
| `alerts` | High-risk and emerging risk notifications. |
| `reports` | Generated authority decision reports & metadata. |
| `district_summaries` | District-wide KPI rollups and priority corridors. |
| `incidents` | Incident management CRUD records. |

Environment variables (`backend/.env`, see `.env.example`):
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=rakshapath_db
SECRET_KEY=rakshapath-safety-secret-key-production-change-me
ALLOWED_ORIGINS=["http://localhost:3000","http://localhost:5173","http://localhost:8000"]
```
*(Supports local MongoDB Community Server on port 27017 or remote MongoDB Atlas connection strings; includes an automatic in-memory collection cache if no local daemon is running).*

## Development Notes

- Frontend and backend each keep their own dependency manifest (`frontend/package.json`, `backend/requirements.txt`) and their own `.env`. Never commit either `.env` file.
- Mock data lives only in `frontend/src/data/mock/` and is consumed through the same `frontend/src/api/*` abstraction the real backend will use — UI components never import mock data directly.
- Model-honesty rules from the PRD apply throughout the UI: cause analysis is always labeled as model association (not causation), simulation/impact numbers always show a confidence level and uncertainty range, and nothing is presented as a guaranteed real-world outcome.
