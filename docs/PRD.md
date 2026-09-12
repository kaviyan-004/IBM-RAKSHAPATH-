# RakshaPath — Product Requirements Document (PRD)

**AI-Powered Road Safety Decision-Intelligence Platform**
*"Predict • Understand • Intervene • Simulate • Save Lives"*

IBM BOB National Hackathon • Problem Statement #3 — Transport: RoadSafe India

| Document control | Value |
|---|---|
| Version | PRD v1.0 — Hackathon MVP |
| Product | RakshaPath |
| Problem Statement | #3 — Transport: RoadSafe India |
| Primary platform | Responsive web application |
| Primary users | Transport / highway authorities, traffic police, district road-safety teams |
| Build horizon | 8-hour hackathon MVP |
| Status | Implementation-ready product specification |

**Core product promise:** Move road safety from "Where did accidents happen?" to "Where is risk emerging, why is it high, what can we change, which action should come first, and how should a limited safety budget be allocated?"

## 1. Product Overview

RakshaPath is a web-based road-safety decision-intelligence platform for authorities. It transforms historical accident and contextual data into an actionable workflow that connects risk mapping, a normalized 0–100 risk score, cause analysis, future risk prediction, intervention recommendation and scenario-based impact estimation.

The product is a decision-support layer on top of existing accident-data, black-spot and road-safety programs. The primary innovation is the intervention decision layer: compare alternatives, estimate potential benefit with visible uncertainty, and prioritize a portfolio of location + intervention pairs under a constrained budget.

### 1.1 IBM PS3 Requirement Traceability

| IBM mandatory output | RakshaPath capability | MVP acceptance target |
|---|---|---|
| 1. Risk Map | Interactive geospatial risk map | User can identify and select high-risk locations |
| 2. Risk Score (0–100) | Location/segment risk score | Every supported location displays 0–100 score + category |
| 3. Cause Analysis | Location-specific cause fingerprint | Top supported risk contributors shown with explanation |
| 4. Prediction | Future risk trajectory + emerging-risk indicator | User can see current vs future modeled risk |
| 5. Intervention Recommendation | Intervention Intelligence Engine | At least 3 cause-linked options per selected location |
| 6. Impact Estimate | What-if impact simulator | A/B/C scenarios show modeled change + uncertainty + assumptions |

**Requirement rule:** The six IBM outputs are mandatory product requirements. Budget optimization, evidence/confidence, and emerging-risk intelligence are differentiation layers that strengthen those outputs.

## 2. Problem Definition

### 2.1 User problem

Road authorities can have a large volume of historical accident information, but data alone does not answer the operational decision questions that matter most. A district may contain dozens of risky locations while funding, engineering crews, enforcement capacity and implementation time are limited.

- Authorities need to know where risk is concentrated, not only where past accidents were recorded.
- They need to understand the dominant factors associated with risk at a specific location.
- They need to know how risk may change over time and which locations are emerging as higher-risk zones.
- They need multiple feasible interventions, not one generic recommendation.
- They need to compare alternatives rather than select an intervention blindly.
- They need to allocate a finite safety budget across many locations, not simply rank locations by risk.
- They need uncertainty and assumptions to be visible because modeled impact is not the same as proven causal effect.

### 2.2 Problem framing

**Decision problem:** Given a set of risky locations, available intervention choices, implementation constraints and a finite budget, select the combination with the highest expected safety benefit while preserving transparency and uncertainty information.

## 3. Product Goals & Objectives

### 3.1 Primary goals

1. Provide a single operational view of road risk through an interactive map.
2. Standardize location risk into an interpretable 0–100 score.
3. Explain why risk is high at a selected location using supported data features.
4. Forecast how risk may evolve and flag emerging-risk trajectories.
5. Generate at least three context-appropriate interventions for a selected location.
6. Estimate relative intervention impact through scenario-based comparison.
7. Select a budget-constrained portfolio across multiple locations.
8. Make model evidence, assumptions and uncertainty visible to decision-makers.

### 3.2 Secondary objectives

- Create an auditable data-processing pipeline with normalization, missing-data handling and quality flags.
- Design the system so that additional states/cities can use configurable data adapters.
- Capture post-intervention outcomes in future versions to recalibrate impact estimates.

### 3.3 Non-goals for the 8-hour MVP

- A consumer navigation app or full driver-alert product.
- Live CCTV/telemetry integrations requiring external approvals.
- Nationwide production deployment.
- Automated civil-engineering decisions without human validation.
- A claim that simulated intervention impact is guaranteed to occur in the field.
- Full multilingual citizen reporting in the hackathon build; this remains a Phase 2 feature.

## 4. Users, Personas & Jobs-to-be-Done

| Persona | Primary need | Key product action |
|---|---|---|
| State / UT transport authority | Prioritize safety investment across a network | Review risk map, compare interventions, run budget portfolio |
| Highway authority / NHAI / PWD | Decide which road segments need attention | Inspect segment risk, causes and future trajectory |
| Traffic police | Plan enforcement and patrol priorities | Review time/location/vehicle-specific risk and intervention priority |
| District Road Safety Committee | Coordinate safety interventions | Compare options and produce an authority-ready report |
| Municipal / urban planning body | Improve high-risk junctions and corridors | Select location and intervention portfolio |
| Safety consultant / engineering partner | Support evidence-based audit and planning | Use cause fingerprint, intervention evidence and assumptions |

### 4.1 Primary user journey

1. Open district-level RoadSafe dashboard.
2. Identify a critical or emerging-risk location on the map.
3. Inspect the 0–100 score, trend and vulnerability context.
4. Review the top causes driving the risk.
5. Review current vs future modeled risk.
6. Compare at least three cause-linked interventions.
7. Run what-if scenarios and inspect impact ranges.
8. Set a sample district budget and run the portfolio optimizer.
9. Review the recommended location + intervention portfolio.
10. Export a concise authority report with evidence and assumptions.

## 5. Functional Requirements

**FR-01 — Risk Map:** Interactive geospatial map of supported high-risk locations. Markers/segments/grid cells, risk categories (Low/Moderate/High/Critical), click-to-drill, current risk + trend on detail panel, filters for state/district/road type/time. *Acceptance:* a judge can select a location from the map and reach its complete risk profile in two interactions or fewer.

**FR-02 — Risk Score (0–100):** Normalized risk index from validated model outputs (not hand-picked). Numeric + categorical display, data-coverage/confidence context, consistent score definition within a deployment.

**FR-03 — Cause Analysis:** Strongest supported contributing factors per location via model explainability (e.g., SHAP) + interpretable check. Distinguishes model contribution from causal proof. Only shows features present/reliable in the dataset. Produces a human-readable "cause fingerprint."

**FR-04 — Prediction:** Current vs future risk over a forecast window, trend direction (stable/increasing/decreasing), emerging-risk flag, time-aware features and geospatial aggregation, exposure-adjusted risk where traffic-volume data is reliable.

**FR-05 — Intervention Recommendation:** ≥3 interventions per selected high-risk location, each linked to identified risk causes, road-context aware, with cost range/evidence source/expected-effect range/constraints, ranked for the location.

**FR-06 — Impact Estimate / What-if Simulation:** Baseline vs scenario risk per candidate intervention, A/B/C side-by-side comparison, uncertainty/confidence range, visible assumptions, clearly labeled as scenario-based unless field evidence exists.

**FR-07 — Budget-Constrained Portfolio Optimization:** Accepts a total sample budget and candidate location+intervention pairs (cost + impact estimates); selects the combination maximizing modeled safety benefit within budget; returns selected set, total cost, expected modeled benefit, and a visible rationale.

**FR-08 — Data Quality:** Normalizes incompatible state/year schemas into a consistent internal schema, handles missing values with a visible data-confidence flag, detects duplicates/outliers before model input, keeps raw-to-clean lineage for auditability.

**FR-09 — Reporting:** Generates a concise location report and a district-level budget recommendation report, including risk, causes, forecast, interventions, selected portfolio, assumptions and confidence.

## 6. User Experience Requirements

### 6.1 UX principles

- Decision-first: every major screen should help the authority answer "what should I do next?"
- Progressive disclosure: show the high-level decision first, evidence/model details on demand.
- Explainable by default: never show a risk score without a reason/evidence panel.
- Uncertainty visible: estimates must never look like guarantees.
- Map as an entry point, not the entire product.
- Authority-oriented language: "risk," "cause," "intervention," "budget," "confidence" — avoid academic jargon.

### 6.2 Recommended information architecture

| Screen | Purpose | Primary content |
|---|---|---|
| Dashboard / Overview | District-level situation awareness | KPI cards, risk map, emerging-risk list, budget summary |
| Location Detail | Understand one road/junction | 0–100 score, trend, causes, vulnerable groups, peak periods |
| Interventions | Compare possible actions | 3+ intervention cards, cost, rationale, evidence, confidence |
| Impact Simulator | Test scenarios | Baseline vs A/B/C, estimated change, uncertainty, assumptions |
| Budget Optimizer | Choose what to fund | Budget input, selected portfolio, expected benefit, trade-offs |
| Reports | Communicate decisions | Exportable authority summary |

### 6.3 Key location-detail card

Risk score (0–100 + category) · Risk trend (current → future) · Emerging-risk status · Top causes / cause fingerprint · Most exposed road-user group(s) · Peak risk time / context · Three intervention options · Scenario impact + uncertainty · Recommended action.

## 7. Data Requirements

### 7.1 Initial dataset family

| Dataset / source | Intended use | Key data concept |
|---|---|---|
| MoRTH — Road Accidents in India | Trend and state/UT-level benchmarking | Accidents, fatalities, injuries and derived rates |
| Road Accidents in India 2019 (Data.gov.in) | Historical accident comparison | State/UT accident counts and derived rate measures |
| ADSI 2023 (Data.gov.in) | Recent state/UT/city context | Accidental deaths and classifications |
| Cause-of-accident resources (Data.gov.in) | Cause fingerprint | Cause distributions |
| Mode-of-transport resources (Data.gov.in) | Vulnerability analysis | Transport-mode related fatality patterns |

### 7.2 Known dataset structure

Supplied sample data includes state/UT-wise accident counts by year (2016–2019), 2019 rank, share of total accidents, accidents per lakh population, accidents per 10,000 vehicles, and accidents per 10,000 km of roads.

**Important implementation note:** This sample is strong for state-level benchmarking but does not by itself provide road-segment coordinates. Segment-level mapping requires a dataset with reliable coordinates or a join to a geospatial road network.

### 7.3 Canonical internal schema (MVP)

| Field | Type | Purpose |
|---|---|---|
| location_id | string | Stable key for state/district/road segment/grid |
| state | string | Geographic hierarchy |
| district | string/null | District hierarchy where available |
| latitude / longitude | float/null | Map coordinate |
| road_type | string/null | Road classification |
| year | integer | Observation year |
| accidents / fatalities / injuries | integer/float | Counts |
| cause | string/null | Accident cause category |
| vehicle_mode | string/null | Vehicle/transport mode |
| traffic_exposure | float/null | Traffic flow/volume when available |
| weather_context | string/null | Weather condition when available |
| risk_score | float | Model-derived 0–100 score |
| risk_confidence | float/string | Confidence/data-quality indicator |

## 8. AI / ML Requirements

| AI component | Responsibility | MVP approach |
|---|---|---|
| Risk model | Estimate present location risk | XGBoost / scikit-learn baseline |
| Explainability | Identify strongest model contributors | SHAP + interpretable check |
| Forecasting | Estimate future risk trajectory | Time-aware regression/forecasting baseline |
| Emerging-risk logic | Detect increasing-risk locations | Trend + threshold/probability rule |
| Intervention scoring | Estimate relative scenario benefit | Evidence/rule + calibrated scoring |
| Portfolio optimizer | Select best set under budget | Knapsack / integer-style optimization |

**Model honesty requirements:** never call feature importance causal evidence; never present scenario estimates as guaranteed field outcomes; display uncertainty and data coverage; use model-derived percentages in the final build (illustrative values only in mockups, clearly labeled); keep professional road-safety judgment in the loop.

## 9. Intervention Intelligence Specification

Recommendations are traceable and come from a structured knowledge base filtered by the location's dominant risk factors and context — never invented ad hoc by a language model.

**Intervention knowledge object:** Intervention ID · Intervention · Dominant cause(s) · Suitable context · Estimated cost range · Evidence source · Expected-effect range · Implementation constraints · Confidence (High/Medium/Low).

## 10. Budget-Constrained Portfolio Optimization

The optimizer is the main differentiation layer beyond the six IBM requirements — it treats the district as a portfolio of possible interventions rather than optimizing one location at a time.

- Input: total budget; eligible location + intervention pairs (cost, modeled impact, confidence, constraints).
- Objective: maximize total expected safety benefit within the budget.
- Optional constraint: maximum number of interventions / limited crew capacity.
- Output: selected portfolio, total cost, expected benefit, excluded alternatives, rationale.

**Judge-facing value:** the product does not automatically spend the budget on the single highest-risk road — it selects the combination of actions expected to generate the highest total benefit under the stated constraints.

## 11. Success Metrics

| Metric | Target for MVP |
|---|---|
| IBM requirement coverage | 6/6 mandatory outputs demonstrable |
| Location selection | Map → full profile in ≤2 interactions |
| Risk score coverage | 100% of displayed supported locations have a 0–100 score |
| Cause explanation coverage | Top contributing factors available for supported high-risk locations |
| Intervention count | ≥3 candidate interventions for selected locations |
| Scenario comparison | A/B/C intervention scenarios shown side by side |
| Budget optimization | One working district-level sample budget run |
| Report generation | One concise authority report generated from the selected scenario |

Model metrics: precision/recall/F1/ROC-AUC or MAE/RMSE as appropriate; calibration (not only ranking); forecasting vs held-out future period; false-negative rate tracked explicitly; data-sufficiency coverage.

## 12. Non-Functional Requirements

Performance (responsive, no unnecessary blocking work) · Usability (fast first-time comprehension) · Explainability (supporting factors + assumptions always shown) · Reliability (warn on missing/low-quality data, no silent failure) · Security (minimize unnecessary PII) · Auditability (dataset/preprocessing/model version recorded) · Accessibility (contrast, labels, keyboard use) · Licensing (list permitted OSS deps) · Scalability (configurable schemas for new geographies).

## 13. Technical Boundaries for the Hackathon

**Build during 8 hours:** data cleaning + one pilot geography; risk model + 0–100 normalization; cause fingerprint; future risk trajectory; 3 interventions + scenario scoring; budget optimizer; decision dashboard + report.

**Do not spend hackathon time on:** nationwide data integration; multiple competing model architectures; complex causal-inference research; long-horizon forecasting research; real infrastructure deployment; enterprise procurement/SaaS billing; full citizen application / multilingual workflow.

## 14. Risks, Assumptions & Mitigations

| Risk / assumption | Impact | Mitigation |
|---|---|---|
| Data lacks coordinates | Cannot provide true segment-level map | Use supported geography level or join to a permitted geospatial dataset |
| Different state schemas | Model inconsistency | Normalize into canonical schema + data-quality flags |
| Missing traffic exposure | Raw counts may distort comparisons | Make exposure-adjusted risk optional; disclose limitation |
| Impact estimates are observational | Potential overclaiming | Scenario estimates, effect ranges, visible assumptions |
| Intervention cost data unavailable | Optimizer unrealistic | Clearly labeled sample costs for demo; replace with validated local costs later |
| Model overfits one geography | Poor generalization | Pilot one/two districts, recalibrate by geography |
| Judge asks for causality | Credibility risk | Explain MVP estimates scenarios, not causal guarantees |
| Too much scope | Demo failure | Freeze to six core MVP capabilities |

## 15. End-to-End Acceptance Criteria

- A selected pilot location opens from the map and displays a 0–100 score.
- The location detail screen explains the strongest supported factors behind the risk.
- Current and future modeled risk are shown, including an emerging-risk indicator when supported.
- At least three relevant interventions are displayed, with rationale and (where available) cost/evidence/confidence.
- The what-if simulator compares candidate interventions and shows modeled risk change plus uncertainty.
- The portfolio optimizer accepts a sample budget and returns a selected set of location + intervention pairs.
- An authority report is produced containing evidence, assumptions and the recommendation.
- The UI never labels an illustrative or scenario estimate as a measured real-world result.

## 16. 5-Minute Judge Demo Story

**Hook:** "Don't wait for a road to become a black spot. Predict it, understand it, and decide where the next safety rupee should go."

1. Risk Map — open the pilot district, select an emerging high-risk location.
2. Risk Score — show the 0–100 score and category.
3. Cause — show the cause fingerprint and vulnerable user/time context.
4. Prediction — show the risk trajectory and emerging-risk status.
5. Intervention — present three interventions tied to identified causes.
6. Impact — run the what-if simulator, compare modeled outcomes with uncertainty.
7. Budget — set a sample district budget, run the portfolio optimizer.
8. Decision — show which location + intervention combinations were selected and why.
9. Evidence — open assumptions/evidence/confidence.
10. Report — generate the authority report.

## 17. Roadmap Beyond the Hackathon

| Phase | Capabilities |
|---|---|
| Phase 1 — Hackathon | Six IBM outputs + emerging-risk indicator + intervention comparison + sample budget optimizer |
| Phase 2 — Pilot | Validated intervention cost/effect data, real traffic exposure, post-intervention feedback |
| Phase 3 — State rollout | Modular ingestion adapters, geographic recalibration, broader road classes |
| Phase 4 — Multi-state | Regional models, stronger governance, enterprise deployment |
| Phase 5 — Real-time enrichment | CCTV, traffic sensors, telematics where authorized |
| Phase 2+ citizen layer | Tamil/Hindi/English hazard reporting with photo + geotag, abuse filtering and privacy safeguards |

## 18. Development Handoff Notes

This PRD is the source document for: (1) Design Document, (2) Technical Stack Document — see `TECH_STACK.md`, (3) App Flow Document — see `APP_FLOW.md`, (4) Backend Schema — see `BACKEND_SCHEMA.md`, (5) Implementation Plan.

## 19. Source Basis

Grounded in the supplied IBM BOB RoadSafe India PS3, the team's RakshaPath product/innovation documents, the supplied road-accident dataset sample, and three supplied research papers (Sobhana et al. 2023 GMM-SVM blackspot detection; Vinoth et al. 2024 MLPNN accident forecasting; Garg et al. 2025 WICRS context/weather/time/two-wheeler risk analysis).

**Product principle:** The IBM six requirements are mandatory. The team's innovation is the decision layer around them: emerging-risk intelligence, cause-linked intervention comparison, what-if impact estimation, budget-constrained portfolio optimization, and evidence/confidence transparency.
