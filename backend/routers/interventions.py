from typing import List
from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import InterventionResponse
from backend.services.intervention_service import get_top_interventions, get_all_interventions

router = APIRouter(prefix="/interventions", tags=["Interventions"])


@router.get("", response_model=List[InterventionResponse])
async def list_interventions(db = Depends(get_database)):
    """List all available evidence-backed safety interventions"""
    return await get_all_interventions(db)


@router.get("/{location_id}/top", response_model=List[InterventionResponse])
async def get_top_recommendations(location_id: str, db = Depends(get_database)):
    """Retrieve prioritized interventions for a specific high-risk location"""
    return await get_top_interventions(db, location_id)
