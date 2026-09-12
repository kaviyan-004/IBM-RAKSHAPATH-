from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import TemporalAnalysisResponse
from backend.services.temporal_service import get_temporal_analysis

router = APIRouter(prefix="/temporal", tags=["Temporal Patterns"])


@router.get("/{location_id}", response_model=TemporalAnalysisResponse)
async def get_temporal(location_id: str, db = Depends(get_database)):
    """Retrieve temporal risk distributions by hour of day and day of week"""
    return await get_temporal_analysis(db, location_id)
