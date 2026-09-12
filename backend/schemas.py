from datetime import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

from backend.models import SeverityLevel, IncidentStatus


class CamelBaseModel(BaseModel):
    """Base model that automatically converts python snake_case to JSON camelCase and allows population by field name."""
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
        protected_namespaces=(),
    )


# --- Location Schemas ---
class LocationBase(CamelBaseModel):
    location_id: str
    name: str
    state: str
    district: str
    latitude: float
    longitude: float
    road_type: str
    area_type: str


class LocationCreate(LocationBase):
    pass


class LocationResponse(LocationBase):
    pass


# --- Risk Score Schemas ---
class RiskScoreResponse(CamelBaseModel):
    location_id: str
    score: int
    level: Literal["low", "moderate", "high", "critical"]
    trend: Literal["increasing", "decreasing", "stable"]
    is_emerging: bool
    confidence: float
    data_quality: Literal["high", "medium", "low"]
    accidents3yr: int = Field(..., alias="accidents3yr")
    fatalities3yr: int = Field(..., alias="fatalities3yr")
    injuries3yr: int = Field(..., alias="injuries3yr")
    peak_risk_window: str
    dataset_version: str
    model_version: str
    predicted_at: str


# --- Cause Analysis Schemas ---
class CauseContribution(CamelBaseModel):
    factor: str
    contribution_points: float
    description: str


class CauseFingerprintResponse(CamelBaseModel):
    location_id: str
    risk_score: int
    top_factors: List[CauseContribution]
    note: str


# --- Vulnerability Schemas ---
class VulnerabilityGroupItem(CamelBaseModel):
    group: str
    involvement_share: float
    fatality_share: float


class VulnerabilityAnalysisResponse(CamelBaseModel):
    location_id: str
    most_affected_group: str
    groups: List[VulnerabilityGroupItem]
    confidence: float


# --- Temporal Analysis Schemas ---
class TemporalBucketItem(CamelBaseModel):
    label: str
    accident_share: float


class TemporalAnalysisResponse(CamelBaseModel):
    location_id: str
    peak_hour_window: str
    peak_day_type: str
    hourly: List[TemporalBucketItem]
    day_of_week: List[TemporalBucketItem] = Field(..., alias="dayOfWeek")


# --- Future Forecast Schemas ---
class RiskForecastPointItem(CamelBaseModel):
    year: int
    risk: int
    lower_bound: int
    upper_bound: int


class RiskForecastResponse(CamelBaseModel):
    location_id: str
    current_risk: int
    horizon_years: int
    trend: Literal["increasing", "decreasing", "stable"]
    is_emerging_hotspot: bool
    confidence: float
    series: List[RiskForecastPointItem]


# --- Intervention Schemas ---
class InterventionResponse(CamelBaseModel):
    intervention_id: str
    name: str
    target_cause: str
    cause_match: float
    context_match: float
    suitable_context: str
    estimated_cost_min: float
    estimated_cost_max: float
    expected_effect_min: float
    expected_effect_max: float
    confidence: Literal["High", "Medium", "Low"]
    evidence_source: str
    implementation_constraints: str


# --- Simulation Schemas ---
class SimulationRequest(CamelBaseModel):
    location_id: str
    intervention_ids: List[str]


class SimulationResultResponse(CamelBaseModel):
    intervention_id: str
    intervention_name: str
    baseline_risk: int
    simulated_risk: int
    risk_reduction_pct: float
    lower_bound: int
    upper_bound: int
    confidence: Literal["High", "Medium", "Low"]
    assumptions: List[str]


# --- Budget Optimization Schemas ---
class OptimizationCandidateItem(CamelBaseModel):
    location_id: str
    location_name: str
    intervention_id: str
    intervention_name: str
    cost: int
    expected_benefit: float
    confidence: Literal["High", "Medium", "Low"]


class OptimizationRequest(CamelBaseModel):
    budget_limit: float
    location_ids: Optional[List[str]] = None
    max_interventions: Optional[int] = None


class OptimizationResultResponse(CamelBaseModel):
    budget_limit: float
    total_cost: float
    remaining_budget: float
    expected_benefit: float
    selected: List[OptimizationCandidateItem]
    excluded: List[OptimizationCandidateItem]


# --- District Summary Schemas ---
class PriorityLocationItem(CamelBaseModel):
    location_id: str
    name: str
    score: int


class DistrictSummaryResponse(CamelBaseModel):
    district: str
    total_locations_analyzed: int
    high_risk_locations: int
    emerging_risk_locations: int
    interventions_pending: int
    current_safety_budget: float
    last_updated: str
    top_priority_locations: List[PriorityLocationItem]


# --- Alert Schemas ---
class AlertItemResponse(CamelBaseModel):
    id: str
    severity: Literal["high-risk", "emerging-risk", "intervention-update", "system"]
    title: str
    detail: str
    timestamp: str
    read: bool


# --- Report Schemas ---
class AuthorityReportResponse(CamelBaseModel):
    report_id: str
    location_id: Optional[str] = None
    district: Optional[str] = None
    title: str
    generated_at: str
    file_name: str
    kind: Literal["location", "district", "budget"]


# --- Auth & User Schemas ---
class UserProfileResponse(CamelBaseModel):
    name: str
    initials: str
    role: str
    organization: str
    location: str
    email: str


class LoginRequest(CamelBaseModel):
    email: str
    password: str


class SignupRequest(CamelBaseModel):
    full_name: str = Field(..., alias="fullName")
    email: str
    password: str


# --- Incident Schemas (Legacy Starter Compatibility) ---
class IncidentBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    location: str = Field(..., min_length=1, max_length=500)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    severity: SeverityLevel = SeverityLevel.MEDIUM
    incident_type: str = Field(..., min_length=1, max_length=100)
    reported_by: Optional[str] = None


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(BaseModel):
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
    id: int
    status: IncidentStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
