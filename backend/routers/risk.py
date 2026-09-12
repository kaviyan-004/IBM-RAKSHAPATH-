from typing import List
from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import RiskScoreResponse
from backend.services.risk_service import (
    get_all_risk_scores,
    get_risk_score_by_location,
    get_high_risk_scores,
    get_emerging_risk_scores,
)

router = APIRouter(prefix="/risk", tags=["Risk Intelligence"])


@router.get("/map", response_model=List[RiskScoreResponse])
async def get_risk_map(db = Depends(get_database)):
    """Fetch 0-100 calibrated risk scores for all map layers"""
    return await get_all_risk_scores(db)


@router.get("/high-risk", response_model=List[RiskScoreResponse])
async def get_high_risk(db = Depends(get_database)):
    """Fetch locations with High (51-75) or Critical (76-100) risk score"""
    return await get_high_risk_scores(db)


@router.get("/emerging", response_model=List[RiskScoreResponse])
async def get_emerging_risk(db = Depends(get_database)):
    """Fetch newly emerging risk hotspots"""
    return await get_emerging_risk_scores(db)


@router.get("/{location_id}", response_model=RiskScoreResponse)
async def get_risk_by_location(location_id: str, db = Depends(get_database)):
    """Fetch detailed risk scoring breakdown for a specific location"""
    return await get_risk_score_by_location(db, location_id)
