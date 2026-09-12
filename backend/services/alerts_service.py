from typing import List
from fastapi import HTTPException, status
from backend.schemas import AlertItemResponse


def _to_alert_response(a: dict) -> AlertItemResponse:
    return AlertItemResponse(
        id=a["id"],
        severity=a["severity"],
        title=a["title"],
        detail=a["detail"],
        timestamp=a.get("timestamp", ""),
        read=a.get("read", False),
    )


async def get_all_alerts(db) -> List[AlertItemResponse]:
    alerts = await db.alerts.find({}).sort("timestamp", -1).to_list(100)
    return [_to_alert_response(a) for a in alerts]


async def mark_alert_as_read(db, alert_id: str) -> AlertItemResponse:
    result = await db.alerts.find_one_and_update(
        {"id": alert_id},
        {"$set": {"read": True}},
        return_document=True
    )
    if not result:
        # Fallback query
        alert = await db.alerts.find_one({"id": alert_id})
        if not alert:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Alert with id {alert_id} not found"
            )
        await db.alerts.update_one({"id": alert_id}, {"$set": {"read": True}})
        alert["read"] = True
        return _to_alert_response(alert)

    return _to_alert_response(result)
