from typing import List
from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import AlertItemResponse
from backend.services.alerts_service import get_all_alerts, mark_alert_as_read

router = APIRouter(prefix="/alerts", tags=["Alerts"])


@router.get("", response_model=List[AlertItemResponse])
async def list_alerts(db = Depends(get_database)):
    """Retrieve safety alerts and system notifications"""
    return await get_all_alerts(db)


@router.put("/{alert_id}/read", response_model=AlertItemResponse)
async def mark_read(alert_id: str, db = Depends(get_database)):
    """Mark an alert as read"""
    return await mark_alert_as_read(db, alert_id)
