from typing import List
from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import AuthorityReportResponse
from backend.services.reports_service import get_all_reports, get_location_report

router = APIRouter(prefix="/report", tags=["Reports"])


@router.get("", response_model=List[AuthorityReportResponse])
async def list_reports(db = Depends(get_database)):
    """Retrieve list of generated authority reports"""
    return await get_all_reports(db)


@router.get("/{location_id}/pdf", response_model=AuthorityReportResponse)
async def generate_location_report_pdf(location_id: str, db = Depends(get_database)):
    """Fetch/generate authority report PDF metadata for a specific location"""
    return await get_location_report(db, location_id)
