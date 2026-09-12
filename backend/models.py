from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, ForeignKey
from datetime import datetime
import json
import enum

from backend.database import Base


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


class User(Base):
    """User account model for authentication and role-based access"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="Government Official")
    department = Column(String(100), default="Road Safety Division")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "fullName": self.full_name,
            "role": self.role,
            "department": self.department,
            "isActive": self.is_active,
            "createdAt": self.created_at.isoformat() if self.created_at else None
        }


class Corridor(Base):
    """High-risk road corridor / blackspot model with rich spatial analytics"""
    __tablename__ = "corridors"

    id = Column(String(100), primary_key=True, index=True)
    corridor_name = Column(String(255), nullable=False, index=True)
    district = Column(String(100), nullable=False, index=True)
    state = Column(String(100), default="Tamil Nadu")
    highway_number = Column(String(50), nullable=True)
    length_km = Column(Float, default=10.0)
    
    start_latitude = Column(Float, nullable=False)
    start_longitude = Column(Float, nullable=False)
    end_latitude = Column(Float, nullable=False)
    end_longitude = Column(Float, nullable=False)

    risk_score = Column(Float, default=0.0)
    risk_level = Column(String(50), default="Medium")  # critical, high, moderate, low
    predicted_incidents = Column(Integer, default=0)
    speed_limit = Column(Integer, default=60)
    avg_daily_traffic = Column(Integer, default=25000)
    historical_incidents_count = Column(Integer, default=0)
    fatal_incidents_count = Column(Integer, default=0)

    # JSON-encoded extra analytics
    major_risk_factors_json = Column(Text, default="[]")
    causes_data_json = Column(Text, default="{}")
    vulnerability_data_json = Column(Text, default="{}")
    temporal_data_json = Column(Text, default="{}")
    prediction_data_json = Column(Text, default="{}")
    interventions_json = Column(Text, default="[]")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def major_risk_factors(self):
        try:
            return json.loads(self.major_risk_factors_json or "[]")
        except Exception:
            return []

    @major_risk_factors.setter
    def major_risk_factors(self, val):
        self.major_risk_factors_json = json.dumps(val)

    def to_dict(self):
        return {
            "id": self.id,
            "corridorName": self.corridor_name,
            "district": self.district,
            "state": self.state,
            "highwayNumber": self.highway_number,
            "lengthKm": self.length_km,
            "startLatitude": self.start_latitude,
            "startLongitude": self.start_longitude,
            "endLatitude": self.end_latitude,
            "endLongitude": self.end_longitude,
            "riskScore": self.risk_score,
            "riskLevel": self.risk_level,
            "predictedIncidents": self.predicted_incidents,
            "speedLimit": self.speed_limit,
            "avgDailyTraffic": self.avg_daily_traffic,
            "historicalIncidentsCount": self.historical_incidents_count,
            "fatalIncidentsCount": self.fatal_incidents_count,
            "majorRiskFactors": self.major_risk_factors,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "updatedAt": self.updated_at.isoformat() if self.updated_at else None
        }


class Incident(Base):
    """Road safety incident / crash report model"""
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String(500), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    severity = Column(String(50), default="medium")
    status = Column(String(50), default="reported")
    incident_type = Column(String(100), nullable=False)
    reported_by = Column(String(255), nullable=True)
    corridor_id = Column(String(100), nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Alert(Base):
    """Real-time active safety alerts and early warnings"""
    __tablename__ = "alerts"

    id = Column(String(100), primary_key=True, index=True)
    corridor_id = Column(String(100), index=True, nullable=True)
    corridor_name = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    severity = Column(String(50), default="warning")
    alert_type = Column(String(100), default="risk_surge")
    status = Column(String(50), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)


class Intervention(Base):
    """Road engineering and traffic enforcement interventions"""
    __tablename__ = "interventions"

    id = Column(String(100), primary_key=True, index=True)
    corridor_id = Column(String(100), index=True, nullable=True)
    corridor_name = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), default="Engineering")
    cost_inr = Column(Float, default=0.0)
    estimated_risk_reduction_pct = Column(Float, default=0.0)
    implementation_time_days = Column(Integer, default=30)
    status = Column(String(50), default="Proposed")
    priority = Column(String(50), default="High")
    description = Column(Text, nullable=True)
    roi_score = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.utcnow)
