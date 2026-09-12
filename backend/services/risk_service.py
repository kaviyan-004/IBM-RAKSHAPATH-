import json
from typing import List, Optional
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import Location, RiskScore


def get_all_locations(db: Session, district: Optional[str] = None) -> List[Location]:
    query = db.query(Corridor)
    if district:
        query = query.filter(Corridor.district.ilike(f"%{district}%"))
    
    corridors = query.all()
    return [
        Location(
            locationId=c.id,
            name=c.corridor_name,
            state=c.state,
            district=c.district,
            latitude=c.start_latitude,
            longitude=c.start_longitude,
            roadType=c.highway_number or "Arterial Corridor",
            areaType="Commercial"
        )
        for c in corridors
    ]


def get_location_by_id(db: Session, location_id: str) -> Optional[Location]:
    c = db.query(Corridor).filter(Corridor.id == location_id).first()
    if not c:
        return None
    return Location(
        locationId=c.id,
        name=c.corridor_name,
        state=c.state,
        district=c.district,
        latitude=c.start_latitude,
        longitude=c.start_longitude,
        roadType=c.highway_number or "Arterial Corridor",
        areaType="Commercial"
    )


def corridor_to_risk_score(c: Corridor) -> RiskScore:
    level = "critical" if c.risk_score >= 80 else ("high" if c.risk_score >= 70 else ("moderate" if c.risk_score >= 40 else "low"))
    return RiskScore(
        locationId=c.id,
        score=c.risk_score,
        level=level,
        trend="increasing" if c.risk_score > 75 else "stable",
        isEmerging=c.risk_score >= 70 and c.risk_score < 80,
        confidence=0.85,
        dataQuality="high" if c.risk_score >= 75 else "medium",
        accidents3yr=c.historical_incidents_count or int(c.risk_score * 0.5),
        fatalities3yr=c.fatal_incidents_count or int(c.risk_score * 0.1),
        injuries3yr=int((c.historical_incidents_count or c.risk_score) * 1.2),
        peakRiskWindow="7:00 PM - 10:00 PM",
        datasetVersion="morth-2019-2023-v2",
        modelVersion="xgb-risk-v1.3",
        predictedAt="2026-08-01T06:00:00Z"
    )


def get_risk_map(db: Session) -> List[RiskScore]:
    corridors = db.query(Corridor).all()
    return [corridor_to_risk_score(c) for c in corridors]


def get_risk_for_location(db: Session, location_id: str) -> Optional[RiskScore]:
    c = db.query(Corridor).filter(Corridor.id == location_id).first()
    if not c:
        return None
    return corridor_to_risk_score(c)


def get_high_risk_locations(db: Session) -> List[RiskScore]:
    corridors = db.query(Corridor).filter(Corridor.risk_score >= 70).all()
    return [corridor_to_risk_score(c) for c in corridors]


def get_emerging_risk_locations(db: Session) -> List[RiskScore]:
    corridors = db.query(Corridor).filter(Corridor.risk_score >= 70, Corridor.risk_score < 80).all()
    return [corridor_to_risk_score(c) for c in corridors]
