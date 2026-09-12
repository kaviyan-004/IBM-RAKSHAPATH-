from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from backend.database import get_database
from backend.schemas import LocationResponse

router = APIRouter(prefix="/locations", tags=["Locations"])


@router.get("", response_model=List[LocationResponse])
async def list_locations(db = Depends(get_database)):
    """Retrieve all monitored road locations and corridors"""
    locations = await db.locations.find({}).to_list(1000)
    return [
        LocationResponse(
            location_id=loc["location_id"],
            name=loc["name"],
            state=loc.get("state", "Tamil Nadu"),
            district=loc.get("district", "Coimbatore"),
            latitude=loc["latitude"],
            longitude=loc["longitude"],
            road_type=loc["road_type"],
            area_type=loc["area_type"],
        )
        for loc in locations
    ]


@router.get("/{location_id}", response_model=LocationResponse)
async def get_location(location_id: str, db = Depends(get_database)):
    """Retrieve details for a specific location anchor"""
    loc = await db.locations.find_one({"location_id": location_id})
    if not loc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Location with ID {location_id} not found"
        )
    return LocationResponse(
        location_id=loc["location_id"],
        name=loc["name"],
        state=loc.get("state", "Tamil Nadu"),
        district=loc.get("district", "Coimbatore"),
        latitude=loc["latitude"],
        longitude=loc["longitude"],
        road_type=loc["road_type"],
        area_type=loc["area_type"],
    )
