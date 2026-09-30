# RakshaPath (रक्षापथ)

**National Road Safety Decision Support & Citizen Road Safety System**  
*Predict • Understand • Intervene • Simulate • Save Lives*

![Government of India Standard](https://img.shields.io/badge/Standard-National%20Portal%20of%20India%20(india.gov.in)-0B3B60?style=for-the-badge)
![GIGW 3.0 Compliant](https://img.shields.io/badge/GIGW%203.0-Compliant-138808?style=for-the-badge)
![Multilingual](https://img.shields.io/badge/Languages-English%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80%20%7C%20%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AF%8D-FF9933?style=for-the-badge)

Built for the **Ministry of Road Transport and Highways (MoRTH)**, State Transport Departments, NHAI, District Road Safety Committees (DRSC), and the Citizens of India.

---

## 🏛️ Project Overview

RakshaPath is a next-generation **AI-Powered Road Safety Decision Intelligence & Public Service Ecosystem** designed in strict adherence to the **Guidelines for Indian Government Websites (GIGW 3.0)** and the UI/UX architecture of the **National Portal of India (https://www.india.gov.in/)**.

It turns historical crash data and IRC:SP:88-2019 road safety audit standards into a comprehensive 3-sector governance platform:

1. **🏛️ Government Wing (Administrative & Law Enforcement)**:
   - High-level executive KPI dashboards for District Road Safety Committees (DRSC).
   - District-wide blackspot identification and emerging risk prediction.
   - Constrained safety budget optimizer allocating funds to maximize lives saved.
   - Official Gazette dispatch dockets and formal PDF reports.

2. **⚙️ Technical Wing (Road Engineering & Audit)**:
   - GIS risk map with road-geometry diagnostics.
   - Explainable AI (XAI) with SHAP cause fingerprints and vulnerable road user breakdowns.
   - Counterfactual what-if simulation testing combinations of civil countermeasures.
   - Live interactive Machine Learning training and evaluation suite.

3. **👥 Public Wing (Citizen Safety & Grievance Redressal)**:
   - Accessible to all citizens (including non-technical and rural populations).
   - **Report Road Hazard (`/report-hazard`)**: Lodge grievances for potholes, damaged crash barriers, and broken signals with one-click GPS capture, photo evidence, and 24–72h SLA tracking.
   - **Safer Routes Navigator (`/safer-routes`)**: Evaluate low-risk transit corridors with illumination levels, blackspot avoidance, and printable passage clearances.
   - **Safety Updates (`/safety-updates`)**: Real-time access to Ministry Gazette orders, speed-limit revisions, and weather alerts with PDF downloads.

---

## 🎨 Design & GIGW 3.0 Compliance

- **Official Color System**: National Deep Navy (`#0B3B60`), MoRTH Primary Blue (`#1963BD`), Saffron (`#FF9933` / `#F37A1F`), and India Green (`#138808`).
- **National Identity**: Official Ashoka Lion Capital Emblem with *Satyameva Jayate*.
- **Accessibility Toolbar**: Text resizing (`A-` / `A` / `A+`), High-Contrast Mode toggle, and Screen Reader Skip-to-Content navigation link.
- **Tri-Sector Slide Selector**: Smooth segmented sector switch at login and across portal navigation.
- **Multilingual Support**: Real-time localization in **English**, **हिन्दी (Hindi)**, and **தமிழ் (Tamil)** with persistent storage.
- **Zero AI-Generated Pastel Icons**: Strictly styled using official MoRTH Gazette Dispatch Badges (`[CRITICAL ALERT]`, `[TRAFFIC CAUTION]`, `[CIVIL WORKS]`, `[OFFICIAL NOTICE]`), reference codes, and high-contrast monochrome icons.

---

## 📚 Documentation Index

Complete specifications and architectural blueprints live in [`docs/`](docs/):

- [`docs/UI_DESIGN.md`](docs/UI_DESIGN.md) — National Portal of India UI/UX standards, design tokens, GIGW 3.0 compliance, and screen inventory.
- [`docs/APP_FLOW.md`](docs/APP_FLOW.md) — Tri-sector user journey, citizen grievance redressal flow, and corridor evaluation flows.
- [`docs/PRD.md`](docs/PRD.md) — Comprehensive product requirements, persona profiles, and functional acceptance criteria.
- [`docs/TECH_STACK.md`](docs/TECH_STACK.md) — Architecture and technology selections across frontend, backend, and AI models.
- [`docs/BACKEND_SCHEMA.md`](docs/BACKEND_SCHEMA.md) — MongoDB collections, database schema, and REST API specification.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — End-to-end build roadmap and verification milestones.

---

## 📁 Repository Structure

```
RakshaPath075/
├── frontend/     # React 18 + Vite + TypeScript (GIGW 3.0 Government Portal UI)
├── backend/      # FastAPI + Motor (Async MongoDB) decision-intelligence service
├── docs/         # Product, design, and engineering specifications
└── README.md     # Primary documentation entry point
```

---

## 🚀 Quick Start Guide

### 1. Frontend Setup (React + Vite + TypeScript)

```bash
cd frontend
npm install
npm run dev       # Launches on http://localhost:5173
```

- **Build verification**: `npm run build` (`tsc && vite build`)
- **Language Switching**: Toggle between English, Hindi, and Tamil in the top right header.
- **Sector Switcher**: Toggle between Government, Technical, and Public modes.

### 2. Backend Setup (FastAPI + MongoDB)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

- **API Base**: http://localhost:8000
- **Interactive Swagger Documentation**: http://localhost:8000/docs
- **Automated Test Suite**: `python -m pytest backend/test_backend.py`

---

## 🛡️ License & Attributions

- Hosted by **National Informatics Centre (NIC)** for the Ministry of Road Transport and Highways (MoRTH), Government of India.
- Designed in conformance with **GIGW 3.0** guidelines and **IRC:SP:88-2019** Road Safety Audit standards.
