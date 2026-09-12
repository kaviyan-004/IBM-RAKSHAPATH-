from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import DistrictSummary
from backend.services import dashboard_service

router = APIRouter(prefix="/dashboard", tags=["Executive Dashboard"])


@router.get("/summary", response_model=DistrictSummary)
async def get_dashboard_summary(db: Session = Depends(get_db)):
    return dashboard_service.get_district_summary(db)
