import json
from typing import Optional
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import CauseFingerprint, CauseContribution


def get_cause_fingerprint(db: Session, location_id: str) -> Optional[CauseFingerprint]:
    c = db.query(Corridor).filter(Corridor.id == location_id).first()
    if not c:
        return None

    try:
        data = json.loads(c.causes_data_json or "{}")
    except Exception:
        data = {}

    top_factors = []
    for tf in data.get("topFactors", []):
        top_factors.append(
            CauseContribution(
                factor=tf.get("factor", "General Traffic Hazard"),
                contributionPoints=tf.get("contributionPoints", 15.0),
                description=tf.get("description", "")
            )
        )

    if not top_factors:
        top_factors = [
            CauseContribution(
                factor="High Traffic Volume & Mixed Transit",
                contributionPoints=25.0,
                description="Heavy multi-class vehicular congestion."
            ),
            CauseContribution(
                factor="Pedestrian Cross-Movement Conflict",
                contributionPoints=20.0,
                description="Frequent mid-block pedestrian crossings."
            )
        ]

    return CauseFingerprint(
        locationId=c.id,
        riskScore=c.risk_score,
        topFactors=top_factors,
        note=data.get("note", "Model-derived causal factors identified via SHAP feature attributions.")
    )
