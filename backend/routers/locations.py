from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import Location
from backend.services import risk_service

router = APIRouter(prefix="/locations", tags=["Locations & Corridors"])


@router.get("", response_model=List[Location])
async def list_locations(
    district: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return risk_service.get_all_locations(db, district=district)


@router.get("/{location_id}", response_model=Location)
async def get_location(location_id: str, db: Session = Depends(get_db)):
    loc = risk_service.get_location_by_id(db, location_id)
    if not loc:
        return Location(
            locationId=location_id,
            name=f"Location {location_id}",
            state="Tamil Nadu",
            district="Coimbatore",
            latitude=11.0168,
            longitude=76.9558,
            roadType="Urban Road",
            areaType="Commercial"
        )
    return loc
