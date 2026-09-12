from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import AuthorityReport
from backend.services import reports_service

router = APIRouter(prefix="/report", tags=["Official Audit Reports"])


@router.get("", response_model=List[AuthorityReport])
async def list_reports(
    district: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return reports_service.get_reports(db, district=district)
