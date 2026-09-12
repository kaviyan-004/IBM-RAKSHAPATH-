from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import Intervention
from backend.services import intervention_service

router = APIRouter(prefix="/interventions", tags=["Interventions"])


@router.get("", response_model=List[Intervention])
async def list_interventions(
    location_id: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    if location_id:
        return intervention_service.get_interventions_for_location(db, location_id)
    return intervention_service.get_all_interventions(db)
