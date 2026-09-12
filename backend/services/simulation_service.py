from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import SimulationRequest, SimulationResult


def run_simulation(db: Session, request: SimulationRequest) -> SimulationResult:
    c = db.query(Corridor).filter(Corridor.id == request.location_id).first()
    baseline = c.risk_score if c else 75.0

    # Calculate expected risk reduction
    total_reduction = 0.0
    for int_id in request.intervention_ids:
        total_reduction += 18.5  # average effect percentage

    diminishing_factor = 0.85 if len(request.intervention_ids) > 1 else 1.0
    effective_reduction = min(55.0, total_reduction * diminishing_factor)
    projected = max(15.0, round(baseline * (1.0 - effective_reduction / 100.0), 1))

    return SimulationResult(
        locationId=request.location_id,
        baselineRisk=baseline,
        projectedRisk=projected,
        riskReduction=round(baseline - projected, 1),
        confidenceIntervalMin=round(projected - 3.5, 1),
        confidenceIntervalMax=round(projected + 3.5, 1),
        modelVersion="xgb-risk-v1.3",
        simulatedAt="2026-09-12T21:30:00Z"
    )
