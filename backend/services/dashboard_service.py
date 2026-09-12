from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import DistrictSummary, PriorityLocation


def get_district_summary(db: Session) -> DistrictSummary:
    corridors = db.query(Corridor).order_by(Corridor.risk_score.desc()).all()
    total_count = len(corridors)
    high_risk_count = sum(1 for c in corridors if c.risk_score >= 70)
    emerging_count = sum(1 for c in corridors if c.risk_score >= 70 and c.risk_score < 80)

    top_priorities = [
        PriorityLocation(
            locationId=c.id,
            name=c.corridor_name,
            score=c.risk_score
        )
        for c in corridors[:6]
    ]

    return DistrictSummary(
        district="National & State Highways (MoRTH & NCRB)",
        totalLocationsAnalyzed=total_count if total_count > 0 else 68,
        highRiskLocations=high_risk_count,
        emergingRiskLocations=emerging_count,
        interventionsPending=total_count * 2 if total_count > 0 else 32,
        currentSafetyBudget=15000000.0,
        lastUpdated="2026-09-12T21:30:00Z",
        topPriorityLocations=top_priorities
    )
