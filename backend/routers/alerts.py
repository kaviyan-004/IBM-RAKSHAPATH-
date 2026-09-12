from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import AlertItem
from backend.services import alerts_service

router = APIRouter(prefix="/alerts", tags=["Early Warnings & Alerts"])


@router.get("", response_model=List[AlertItem])
async def list_alerts(db: Session = Depends(get_db)):
    return alerts_service.get_alerts(db)
