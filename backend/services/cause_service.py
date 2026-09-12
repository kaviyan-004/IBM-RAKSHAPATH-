from fastapi import HTTPException, status
from backend.schemas import CauseFingerprintResponse, CauseContribution


async def get_cause_fingerprint(db, location_id: str) -> CauseFingerprintResponse:
    loc = await db.locations.find_one({"location_id": location_id})
    if not loc or "cause_fingerprint" not in loc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cause analysis for location {location_id} not found"
        )
    
    cause = loc["cause_fingerprint"]
    top_factors = [
        CauseContribution(
            factor=f["factor"],
            contribution_points=f["contribution_points"],
            description=f["description"],
        )
        for f in cause.get("top_factors", [])
    ]

    return CauseFingerprintResponse(
        location_id=location_id,
        risk_score=cause.get("risk_score", 0),
        top_factors=top_factors,
        note=cause.get("note", ""),
    )
