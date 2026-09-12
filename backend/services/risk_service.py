from typing import List
from fastapi import HTTPException, status
from backend.schemas import RiskScoreResponse


def _format_risk_response(location_id: str, risk: dict) -> RiskScoreResponse:
    return RiskScoreResponse(
        location_id=location_id,
        score=risk["score"],
        level=risk["level"],
        trend=risk["trend"],
        is_emerging=risk.get("is_emerging", False),
        confidence=risk.get("confidence", 0.8),
        data_quality=risk.get("data_quality", "medium"),
        accidents3yr=risk.get("accidents3yr", 0),
        fatalities3yr=risk.get("fatalities3yr", 0),
        injuries3yr=risk.get("injuries3yr", 0),
        peak_risk_window=risk.get("peak_risk_window", "6:00 PM - 9:00 PM"),
        dataset_version=risk.get("dataset_version", "morth-2019-2023-v2"),
        model_version=risk.get("model_version", "xgb-risk-v1.3"),
        predicted_at=risk.get("predicted_at", ""),
    )


async def get_all_risk_scores(db) -> List[RiskScoreResponse]:
    locations = await db.locations.find({"risk_score": {"$exists": True}}).to_list(1000)
    return [_format_risk_response(loc["location_id"], loc["risk_score"]) for loc in locations]


async def get_risk_score_by_location(db, location_id: str) -> RiskScoreResponse:
    loc = await db.locations.find_one({"location_id": location_id})
    if not loc or "risk_score" not in loc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Risk score for location {location_id} not found"
        )
    return _format_risk_response(loc["location_id"], loc["risk_score"])


async def get_high_risk_scores(db) -> List[RiskScoreResponse]:
    locations = await db.locations.find({
        "risk_score.level": {"$in": ["high", "critical"]}
    }).to_list(1000)
    return [_format_risk_response(loc["location_id"], loc["risk_score"]) for loc in locations]


async def get_emerging_risk_scores(db) -> List[RiskScoreResponse]:
    locations = await db.locations.find({
        "risk_score.is_emerging": True
    }).to_list(1000)
    return [_format_risk_response(loc["location_id"], loc["risk_score"]) for loc in locations]
