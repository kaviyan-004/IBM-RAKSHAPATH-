import enum
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class SeverityLevel(str, enum.Enum):
    """Incident severity levels"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class IncidentStatus(str, enum.Enum):
    """Incident status"""
    REPORTED = "reported"
    INVESTIGATING = "investigating"
    RESOLVED = "resolved"
    CLOSED = "closed"


# Typed MongoDB Document Structures
class MongoLocationDocument(BaseModel):
    location_id: str
    name: str
    state: str = "Tamil Nadu"
    district: str = "Coimbatore"
    latitude: float
    longitude: float
    geometry: Optional[Dict[str, Any]] = None  # GeoJSON: { "type": "Point", "coordinates": [lng, lat] }
    road_type: str
    area_type: str
    risk_score: Optional[Dict[str, Any]] = None
    cause_fingerprint: Optional[Dict[str, Any]] = None
    vulnerability: Optional[Dict[str, Any]] = None
    temporal: Optional[Dict[str, Any]] = None
    forecast: Optional[Dict[str, Any]] = None


class MongoUserDocument(BaseModel):
    email: str
    name: str
    initials: str
    hashed_password: str
    role: str = "Government Official"
    organization: str = "Municipal Corporation"
    location: str = "Coimbatore, Tamil Nadu"
    is_active: bool = True


class MongoInterventionDocument(BaseModel):
    intervention_id: str
    location_id: str
    name: str
    target_cause: str
    cause_match: float
    context_match: float
    suitable_context: str
    estimated_cost_min: float
    estimated_cost_max: float
    expected_effect_min: float
    expected_effect_max: float
    confidence: str
    evidence_source: str
    implementation_constraints: str
