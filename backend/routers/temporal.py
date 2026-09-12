from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import TemporalAnalysis
from backend.services import temporal_service

router = APIRouter(prefix="/temporal", tags=["Temporal & Environmental"])


@router.get("/{location_id}", response_model=TemporalAnalysis)
async def get_temporal_analysis(location_id: str, db: Session = Depends(get_db)):
    return temporal_service.get_temporal_analysis(db, location_id)
