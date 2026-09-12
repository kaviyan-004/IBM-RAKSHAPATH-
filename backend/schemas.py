from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

from backend.models import SeverityLevel, IncidentStatus


class IncidentBase(BaseModel):
    """Base incident schema"""
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    location: str = Field(..., min_length=1, max_length=500)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    severity: SeverityLevel = SeverityLevel.MEDIUM
    incident_type: str = Field(..., min_length=1, max_length=100)
    reported_by: Optional[str] = None


class IncidentCreate(IncidentBase):
    """Schema for creating an incident"""
    pass


class IncidentUpdate(BaseModel):
    """Schema for updating an incident"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, min_length=1)
    location: Optional[str] = Field(None, min_length=1, max_length=500)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    severity: Optional[SeverityLevel] = None
    status: Optional[IncidentStatus] = None
    incident_type: Optional[str] = Field(None, min_length=1, max_length=100)
    reported_by: Optional[str] = None


class IncidentResponse(IncidentBase):
    """Schema for incident response"""
    id: int
    status: IncidentStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
