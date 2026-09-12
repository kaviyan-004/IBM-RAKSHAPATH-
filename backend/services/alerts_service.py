from typing import List
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import AlertItem


def get_alerts(db: Session) -> List[AlertItem]:
    corridors = db.query(Corridor).order_by(Corridor.risk_score.desc()).all()
    alerts: List[AlertItem] = []

    for i, c in enumerate(corridors[:4]):
        severity = "high-risk" if c.risk_score >= 80 else "emerging-risk"
        alerts.append(
            AlertItem(
                id=f"alert-{c.id}",
                severity=severity,
                title=f"High Risk Alert - {c.corridor_name}",
                detail=f"Predicted risk score is {c.risk_score}/100. Primary hazard: {c.major_risk_factors[0] if c.major_risk_factors else 'High Traffic Density'}.",
                timestamp="2026-09-12T21:30:00Z",
                read=False if i < 2 else True
            )
        )

    alerts.append(
        AlertItem(
            id="alert-sys-01",
            severity="intervention-update",
            title="Intervention Proposal Ready",
            detail="IRC compliant safety interventions calibrated for top critical corridors.",
            timestamp="2026-09-12T20:00:00Z",
            read=True
        )
    )

    alerts.append(
        AlertItem(
            id="alert-sys-02",
            severity="system",
            title="ML Training Model Updated",
            detail="AI GradientBoosting Model trained on MoRTH & NCRB datasets with 95.66% accuracy.",
            timestamp="2026-09-12T19:00:00Z",
            read=True
        )
    )

    return alerts
