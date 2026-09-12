import { apiGet, apiPost } from "@/services/httpClient";

export interface MLTrainingMetrics {
  r2_score: number;
  mae: number;
  training_samples: number;
}

export interface MLModelSummary {
  model_name: string;
  trained_at: string;
  algorithm: string;
  metrics: MLTrainingMetrics;
  feature_importances: Record<string, number>;
  features: string[];
  data_sources: string[];
}

export interface MLTrainingStatus {
  status: "ready" | "untrained" | "training";
  modelSummary?: MLModelSummary;
  message?: string;
}

export interface HistoricalVsPredictedState {
  state: string;
  historicalAccidents2019: number;
  historicalRatePerLakh: number;
  trendCAGR: number;
  predictedRisk2026: number;
  predictedRisk2027: number;
  predictedRisk2028: number;
  predictedRiskLevel: string;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
}

export interface CityRiskAnalysis {
  city: string;
  populationLakh: number;
  historicalFatalities: number;
  deathRatePerLakh: number;
  predicted2026RiskIndex: number;
  riskStatus: string;
}

export interface WeatherImpactItem {
  accidents: number;
  fatalities: number;
  lethality_ratio: number;
  share_pct: number;
}

export interface VRUShareItem {
  accidents: number;
  fatalities: number;
  fatality_share_pct: number;
  case_fatality_rate: number;
}

export interface MLAnalyticsResponse {
  status: string;
  generatedAt: string;
  trainingSummary: {
    modelAlgorithm: string;
    accuracyR2: number;
    maePoints: number;
    trainingSourcesCount: number;
  };
  historicalVsPredictedStates: HistoricalVsPredictedState[];
  cityRiskAnalyses: CityRiskAnalysis[];
  weatherImpacts: Record<string, WeatherImpactItem>;
  vruShares: Record<string, VRUShareItem>;
}

export async function fetchTrainingStatus(): Promise<MLTrainingStatus> {
  return apiGet<MLTrainingStatus>("/api/train/status");
}

export async function fetchTrainingAnalytics(): Promise<MLAnalyticsResponse> {
  return apiGet<MLAnalyticsResponse>("/api/train/analytics");
}

export async function triggerModelRetraining(): Promise<{ status: string; message: string }> {
  return apiPost<{ status: string; message: string }>("/api/train", {});
}
