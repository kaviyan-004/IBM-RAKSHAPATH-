from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import DistrictSummaryResponse
from backend.services.dashboard_service import get_district_summary

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DistrictSummaryResponse)
async def get_summary(db = Depends(get_database)):
    """Retrieve district summary metrics and top priority risk corridors"""
    return await get_district_summary(db)
