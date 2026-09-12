from fastapi import HTTPException, status
from backend.schemas import RiskForecastResponse, RiskForecastPointItem


async def get_risk_forecast(db, location_id: str) -> RiskForecastResponse:
    loc = await db.locations.find_one({"location_id": location_id})
    if not loc or "forecast" not in loc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Risk forecast for location {location_id} not found"
        )

    fc = loc["forecast"]
    series = [
        RiskForecastPointItem(
            year=p["year"],
            risk=p["risk"],
            lower_bound=p["lower_bound"],
            upper_bound=p["upper_bound"],
        )
        for p in fc.get("series", [])
    ]

    return RiskForecastResponse(
        location_id=location_id,
        current_risk=fc.get("current_risk", 50),
        horizon_years=fc.get("horizon_years", 3),
        trend=fc.get("trend", "stable"),
        is_emerging_hotspot=fc.get("is_emerging_hotspot", False),
        confidence=fc.get("confidence", 0.75),
        series=series,
    )
