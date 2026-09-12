export type RiskLevel = "low" | "moderate" | "high" | "critical";

export type TrendDirection = "increasing" | "decreasing" | "stable";

export interface Location {
  locationId: string;
  name: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  roadType: string;
  areaType: string;
}

export interface RiskScore {
  locationId: string;
  score: number; // 0-100
  level: RiskLevel;
  trend: TrendDirection;
  isEmerging: boolean;
  confidence: number; // 0-1
  dataQuality: "high" | "medium" | "low";
  accidents3yr: number;
  fatalities3yr: number;
  injuries3yr: number;
  peakRiskWindow: string;
  datasetVersion: string;
  modelVersion: string;
  predictedAt: string;
}

export interface CauseContribution {
  factor: string;
  contributionPoints: number; // SHAP-style points toward the risk score
  description: string;
}

export interface CauseFingerprint {
  locationId: string;
  riskScore: number;
  topFactors: CauseContribution[];
  note: string;
}

export interface VulnerabilityGroup {
  group: string;
  involvementShare: number; // 0-1
  fatalityShare: number; // 0-1
}

export interface VulnerabilityAnalysis {
  locationId: string;
  mostAffectedGroup: string;
  groups: VulnerabilityGroup[];
  confidence: number;
}

export interface TemporalBucket {
  label: string;
  accidentShare: number; // 0-1
}

export interface TemporalAnalysis {
  locationId: string;
  peakHourWindow: string;
  peakDayType: string;
  hourly: TemporalBucket[];
  dayOfWeek: TemporalBucket[];
}

export interface RiskForecastPoint {
  year: number;
  risk: number;
  lowerBound: number;
  upperBound: number;
}

export interface RiskForecast {
  locationId: string;
  currentRisk: number;
  horizonYears: number;
  trend: TrendDirection;
  isEmergingHotspot: boolean;
  confidence: number;
  series: RiskForecastPoint[];
}

export type ConfidenceLevel = "High" | "Medium" | "Low";

export interface Intervention {
  interventionId: string;
  name: string;
  targetCause: string;
  causeMatch: number; // 0-1
  contextMatch: number; // 0-1
  suitableContext: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  expectedEffectMin: number; // % risk reduction
  expectedEffectMax: number;
  confidence: ConfidenceLevel;
  evidenceSource: string;
  implementationConstraints: string;
}

export interface SimulationResult {
  interventionId: string;
  interventionName: string;
  baselineRisk: number;
  simulatedRisk: number;
  riskReductionPct: number;
  lowerBound: number;
  upperBound: number;
  confidence: ConfidenceLevel;
  assumptions: string[];
}

export interface OptimizationCandidate {
  locationId: string;
  locationName: string;
  interventionId: string;
  interventionName: string;
  cost: number;
  expectedBenefit: number; // modeled risk-reduction benefit units
  confidence: ConfidenceLevel;
}

export interface OptimizationResult {
  budgetLimit: number;
  totalCost: number;
  remainingBudget: number;
  expectedBenefit: number;
  selected: OptimizationCandidate[];
  excluded: OptimizationCandidate[];
}

export interface DistrictSummary {
  district: string;
  totalLocationsAnalyzed: number;
  highRiskLocations: number;
  emergingRiskLocations: number;
  interventionsPending: number;
  currentSafetyBudget: number;
  lastUpdated: string;
  topPriorityLocations: { locationId: string; name: string; score: number }[];
}

export type AlertSeverity = "high-risk" | "emerging-risk" | "intervention-update" | "system";

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  detail: string;
  timestamp: string;
  read: boolean;
}

export interface AuthorityReport {
  reportId: string;
  locationId?: string;
  district?: string;
  title: string;
  generatedAt: string;
  fileName: string;
  kind: "location" | "district" | "budget";
}

export interface UserProfile {
  name: string;
  initials: string;
  role: string;
  organization: string;
  location: string;
  email: string;
}
