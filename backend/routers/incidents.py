from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Incident


class IncidentCreate(BaseModel):
    title: str
    description: str
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    severity: str = "medium"
    incident_type: str = "Vehicle Collision"
    reported_by: Optional[str] = "Citizen"
    corridor_id: Optional[str] = None


class IncidentResponse(IncidentCreate):
    id: int
    status: str
    created_at: Optional[str] = None

    class Config:
        from_attributes = True


router = APIRouter(prefix="/incidents", tags=["Incidents & Hazard Reports"])


@router.get("", response_model=List[IncidentResponse])
async def list_incidents(db: Session = Depends(get_db)):
    incidents = db.query(Incident).all()
    return [
        IncidentResponse(
            id=inc.id,
            title=inc.title,
            description=inc.description,
            location=inc.location,
            latitude=inc.latitude,
            longitude=inc.longitude,
            severity=inc.severity,
            status=inc.status,
            incident_type=inc.incident_type,
            reported_by=inc.reported_by,
            corridor_id=inc.corridor_id,
            created_at=inc.created_at.isoformat() if inc.created_at else None
        )
        for inc in incidents
    ]


@router.post("", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED)
async def create_incident(data: IncidentCreate, db: Session = Depends(get_db)):
    new_inc = Incident(
        title=data.title,
        description=data.description,
        location=data.location,
        latitude=data.latitude,
        longitude=data.longitude,
        severity=data.severity,
        incident_type=data.incident_type,
        reported_by=data.reported_by,
        corridor_id=data.corridor_id,
        status="reported",
    )
    db.add(new_inc)
    db.commit()
    db.refresh(new_inc)

    return IncidentResponse(
        id=new_inc.id,
        title=new_inc.title,
        description=new_inc.description,
        location=new_inc.location,
        latitude=new_inc.latitude,
        longitude=new_inc.longitude,
        severity=new_inc.severity,
        status=new_inc.status,
        incident_type=new_inc.incident_type,
        reported_by=new_inc.reported_by,
        corridor_id=new_inc.corridor_id,
        created_at=new_inc.created_at.isoformat() if new_inc.created_at else None
    )
