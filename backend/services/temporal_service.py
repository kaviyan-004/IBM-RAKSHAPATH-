from fastapi import HTTPException, status
from backend.schemas import TemporalAnalysisResponse, TemporalBucketItem


async def get_temporal_analysis(db, location_id: str) -> TemporalAnalysisResponse:
    loc = await db.locations.find_one({"location_id": location_id})
    if not loc or "temporal" not in loc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Temporal analysis for location {location_id} not found"
        )

    temp = loc["temporal"]
    hourly = [
        TemporalBucketItem(label=b["label"], accident_share=b["accident_share"])
        for b in temp.get("hourly", [])
    ]
    day_of_week = [
        TemporalBucketItem(label=b["label"], accident_share=b["accident_share"])
        for b in temp.get("day_of_week", [])
    ]

    return TemporalAnalysisResponse(
        location_id=location_id,
        peak_hour_window=temp.get("peak_hour_window", "6:00 PM - 9:00 PM"),
        peak_day_type=temp.get("peak_day_type", "Weekday evenings"),
        hourly=hourly,
        day_of_week=day_of_week,
    )
