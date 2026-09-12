import json
from typing import Optional
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import RiskForecast, RiskForecastPoint


def get_forecast_analysis(db: Session, location_id: str) -> Optional[RiskForecast]:
    c = db.query(Corridor).filter(Corridor.id == location_id).first()
    if not c:
        return None

    try:
        data = json.loads(c.prediction_data_json or "{}")
    except Exception:
        data = {}

    series = [
        RiskForecastPoint(
            year=p.get("year", 2026),
            risk=p.get("risk", c.risk_score),
            lowerBound=p.get("lowerBound", c.risk_score - 5.0),
            upperBound=p.get("upperBound", c.risk_score + 5.0)
        )
        for p in data.get("series", [])
    ]

    if not series:
        series = [
            RiskForecastPoint(year=2024, risk=c.risk_score - 5.0, lowerBound=c.risk_score - 9.0, upperBound=c.risk_score - 1.0),
            RiskForecastPoint(year=2025, risk=c.risk_score - 2.0, lowerBound=c.risk_score - 6.0, upperBound=c.risk_score + 2.0),
            RiskForecastPoint(year=2026, risk=c.risk_score, lowerBound=c.risk_score - 4.0, upperBound=c.risk_score + 4.0),
            RiskForecastPoint(year=2027, risk=c.risk_score + 3.0, lowerBound=c.risk_score - 2.0, upperBound=c.risk_score + 8.0),
            RiskForecastPoint(year=2028, risk=c.risk_score + 5.0, lowerBound=c.risk_score, upperBound=c.risk_score + 10.0)
        ]

    return RiskForecast(
        locationId=c.id,
        currentRisk=c.risk_score,
        horizonYears=data.get("horizonYears", 3),
        trend=data.get("trend", "increasing" if c.risk_score > 75 else "stable"),
        isEmergingHotspot=data.get("isEmergingHotspot", c.risk_score >= 70 and c.risk_score < 80),
        confidence=data.get("confidence", 0.85),
        series=series
    )
