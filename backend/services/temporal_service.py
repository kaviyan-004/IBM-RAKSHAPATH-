import json
from typing import Optional
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import TemporalAnalysis, TemporalBucket


def get_temporal_analysis(db: Session, location_id: str) -> Optional[TemporalAnalysis]:
    c = db.query(Corridor).filter(Corridor.id == location_id).first()
    if not c:
        return None

    try:
        data = json.loads(c.temporal_data_json or "{}")
    except Exception:
        data = {}

    hourly = [
        TemporalBucket(
            label=h.get("label", "18:00 - 21:00"),
            accidentShare=h.get("accidentShare", 0.25)
        )
        for h in data.get("hourly", [])
    ]

    dow = [
        TemporalBucket(
            label=d.get("label", "Friday"),
            accidentShare=d.get("accidentShare", 0.20)
        )
        for d in data.get("dayOfWeek", [])
    ]

    if not hourly:
        hourly = [
            TemporalBucket(label="06:00 - 09:00", accidentShare=0.15),
            TemporalBucket(label="09:00 - 12:00", accidentShare=0.12),
            TemporalBucket(label="12:00 - 15:00", accidentShare=0.10),
            TemporalBucket(label="15:00 - 18:00", accidentShare=0.18),
            TemporalBucket(label="18:00 - 21:00", accidentShare=0.32),
            TemporalBucket(label="21:00 - 00:00", accidentShare=0.13)
        ]

    if not dow:
        dow = [
            TemporalBucket(label="Monday", accidentShare=0.14),
            TemporalBucket(label="Tuesday", accidentShare=0.12),
            TemporalBucket(label="Wednesday", accidentShare=0.13),
            TemporalBucket(label="Thursday", accidentShare=0.14),
            TemporalBucket(label="Friday", accidentShare=0.22),
            TemporalBucket(label="Saturday", accidentShare=0.15),
            TemporalBucket(label="Sunday", accidentShare=0.10)
        ]

    return TemporalAnalysis(
        locationId=c.id,
        peakHourWindow=data.get("peakHourWindow", "7:00 PM - 10:00 PM"),
        peakDayType=data.get("peakDayType", "Friday & Weekend Evenings"),
        hourly=hourly,
        dayOfWeek=dow
    )
