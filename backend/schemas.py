from datetime import datetime
from typing import List, Optional, Literal, Dict, Any
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
class Location(CamelBaseModel):
    location_id: str
    name: str
    state: str = "Tamil Nadu"
    district: str = "Coimbatore"
    latitude: float
    longitude: float
    road_type: str = "Arterial Corridor"
    area_type: str = "Commercial"

LocationResponse = Location
LocationBase = Location


# --- Risk Score Schemas ---
class RiskScore(CamelBaseModel):
    location_id: str
    score: float
    level: str  # low, moderate, high, critical
    trend: str = "stable"  # increasing, decreasing, stable
    is_emerging: bool = False
    confidence: float = 0.85
    data_quality: str = "high"
    accidents3yr: int = 30
    fatalities3yr: int = 5
    injuries3yr: int = 38
    peak_risk_window: str = "7:00 PM - 10:00 PM"
    dataset_version: str = "morth-2019-2023-v2"
    model_version: str = "xgb-risk-v1.3"
    predicted_at: str = "2026-09-12T21:30:00Z"

RiskScoreResponse = RiskScore


# --- Cause Analysis Schemas ---
class CauseContribution(CamelBaseModel):
    factor: str
    contribution_points: float
    description: str = ""


class CauseFingerprint(CamelBaseModel):
    location_id: str
    risk_score: float
    top_factors: List[CauseContribution]
    note: str = ""

CauseFingerprintResponse = CauseFingerprint


# --- Vulnerability Schemas ---
class VulnerabilityGroup(CamelBaseModel):
    group: str
    involvement_share: float
    fatality_share: float

VulnerabilityGroupItem = VulnerabilityGroup


class VulnerabilityAnalysis(CamelBaseModel):
    location_id: str
    most_affected_group: str
    groups: List[VulnerabilityGroup]
    confidence: float = 0.88

VulnerabilityAnalysisResponse = VulnerabilityAnalysis


# --- Temporal Analysis Schemas ---
class TemporalBucket(CamelBaseModel):
    label: str
    accident_share: float

TemporalBucketItem = TemporalBucket


class TemporalAnalysis(CamelBaseModel):
    location_id: str
    peak_hour_window: str = "7:00 PM - 10:00 PM"
    peak_day_type: str = "Friday & Weekend Evenings"
    hourly: List[TemporalBucket] = []
    day_of_week: List[TemporalBucket] = Field(default=[], alias="dayOfWeek")

TemporalAnalysisResponse = TemporalAnalysis


# --- Future Forecast Schemas ---
class RiskForecastPoint(CamelBaseModel):
    year: int
    risk: float
    lower_bound: float
    upper_bound: float

RiskForecastPointItem = RiskForecastPoint


class RiskForecast(CamelBaseModel):
    location_id: str
    current_risk: float
    horizon_years: int = 3
    trend: str = "stable"
    is_emerging_hotspot: bool = False
    confidence: float = 0.85
    series: List[RiskForecastPoint] = []

RiskForecastResponse = RiskForecast


# --- Intervention Schemas ---
class Intervention(CamelBaseModel):
    intervention_id: str
    name: str
    target_cause: str
    cause_match: float = 0.90
    context_match: float = 0.90
    suitable_context: str = "Arterial Corridor"
    estimated_cost_min: float = 1500000.0
    estimated_cost_max: float = 2500000.0
    expected_effect_min: float = 25.0
    expected_effect_max: float = 38.0
    confidence: str = "High"
    evidence_source: str = "IRC Guidelines"
    implementation_constraints: str = "Standard civil work"

InterventionResponse = Intervention


# --- Simulation Schemas ---
class SimulationRequest(CamelBaseModel):
    location_id: str
    intervention_ids: List[str] = []


class SimulationResult(CamelBaseModel):
    location_id: str
    baseline_risk: float
    projected_risk: float
    risk_reduction: float
    confidence_interval_min: float
    confidence_interval_max: float
    model_version: str = "xgb-risk-v1.3"
    simulated_at: str = "2026-09-12T21:30:00Z"

SimulationResultResponse = SimulationResult


# --- Budget Optimization Schemas ---
class OptimizationCandidate(CamelBaseModel):
    location_id: str
    location_name: str
    intervention_id: str
    intervention_name: str
    cost: float
    expected_benefit: float
    confidence: str = "High"

OptimizationCandidateItem = OptimizationCandidate


class OptimizationRequest(CamelBaseModel):
    budget_limit: float = 5000000.0
    location_ids: Optional[List[str]] = None
    max_interventions: Optional[int] = None


class OptimizationResult(CamelBaseModel):
    budget_limit: float
    total_cost: float
    remaining_budget: float
    expected_benefit: float
    selected: List[OptimizationCandidate] = []
    excluded: List[OptimizationCandidate] = []

OptimizationResultResponse = OptimizationResult


# --- District Summary Schemas ---
class PriorityLocation(CamelBaseModel):
    location_id: str
    name: str
    score: float

PriorityLocationItem = PriorityLocation


class DistrictSummary(CamelBaseModel):
    district: str = "National & State Network"
    total_locations_analyzed: int = 68
    high_risk_locations: int = 15
    emerging_risk_locations: int = 8
    interventions_pending: int = 30
    current_safety_budget: float = 15000000.0
    last_updated: str = "2026-09-12T21:30:00Z"
    top_priority_locations: List[PriorityLocation] = []

DistrictSummaryResponse = DistrictSummary


# --- Alert Schemas ---
class AlertItem(CamelBaseModel):
    id: str
    severity: str = "high-risk"  # high-risk, emerging-risk, intervention-update, system
    title: str
    detail: str
    timestamp: str
    read: bool = False

AlertItemResponse = AlertItem


# --- Report Schemas ---
class AuthorityReport(CamelBaseModel):
    report_id: str
    location_id: Optional[str] = None
    district: Optional[str] = None
    title: str
    generated_at: str
    file_name: str
    kind: str = "location"  # location, district, budget

AuthorityReportResponse = AuthorityReport


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
