import json
from typing import List, Optional
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import Intervention


DEFAULT_INTERVENTIONS = [
    Intervention(
        interventionId="int-001",
        name="Smart Adaptive Traffic Signal & Pedestrian Crossing",
        targetCause="Pedestrian Density Conflict",
        causeMatch=0.95,
        contextMatch=0.92,
        suitableContext="High-density urban intersection",
        estimatedCostMin=1800000.0,
        estimatedCostMax=2600000.0,
        expectedEffectMin=28.0,
        expectedEffectMax=40.0,
        confidence="High",
        evidenceSource="IRC:SP:90 Guidelines on Urban Traffic Management",
        implementationConstraints="Installation scheduled during nighttime window"
    ),
    Intervention(
        interventionId="int-002",
        name="Grade-Separated Pedestrian Skywalk with Elevators",
        targetCause="Pedestrian Density Conflict",
        causeMatch=0.98,
        contextMatch=0.88,
        suitableContext="Multi-lane arterial corridor",
        estimatedCostMin=8500000.0,
        estimatedCostMax=12000000.0,
        expectedEffectMin=45.0,
        expectedEffectMax=60.0,
        confidence="High",
        evidenceSource="NHAI Road Safety Audit Manual",
        implementationConstraints="Land clearance and foundation civil work"
    ),
    Intervention(
        interventionId="int-003",
        name="Automated ANPR Speed Radar Traps & Dynamic Warning",
        targetCause="High Speed Differential & Overspeeding",
        causeMatch=0.93,
        contextMatch=0.95,
        suitableContext="High-speed expressway and bypass roads",
        estimatedCostMin=3200000.0,
        estimatedCostMax=4500000.0,
        expectedEffectMin=24.0,
        expectedEffectMax=35.0,
        confidence="High",
        evidenceSource="MoRTH Automated Speed Enforcement Guidelines",
        implementationConstraints="Power connection and fiber optic backhaul"
    )
]


def get_interventions_for_location(db: Session, location_id: str) -> List[Intervention]:
    c = db.query(Corridor).filter(Corridor.id == location_id).first()
    if not c:
        return DEFAULT_INTERVENTIONS

    try:
        raw_list = json.loads(c.interventions_json or "[]")
    except Exception:
        raw_list = []

    if raw_list:
        return [
            Intervention(
                interventionId=i.get("interventionId", f"int-{c.id}-01"),
                name=i.get("name", "Targeted Safety Measure"),
                targetCause=i.get("targetCause", c.major_risk_factors[0] if c.major_risk_factors else "Speed Differential"),
                causeMatch=i.get("causeMatch", 0.92),
                contextMatch=i.get("contextMatch", 0.90),
                suitableContext=i.get("suitableContext", "Arterial Road"),
                estimatedCostMin=i.get("estimatedCostMin", 1500000.0),
                estimatedCostMax=i.get("estimatedCostMax", 2500000.0),
                expectedEffectMin=i.get("expectedEffectMin", 25.0),
                expectedEffectMax=i.get("expectedEffectMax", 38.0),
                confidence=i.get("confidence", "High"),
                evidenceSource=i.get("evidenceSource", "IRC Guidelines"),
                implementationConstraints=i.get("implementationConstraints", "Standard civil work")
            )
            for i in raw_list
        ]
    return DEFAULT_INTERVENTIONS


def get_all_interventions(db: Session) -> List[Intervention]:
    all_res = []
    for c in db.query(Corridor).all():
        all_res.extend(get_interventions_for_location(db, c.id))
    return all_res if all_res else DEFAULT_INTERVENTIONS
