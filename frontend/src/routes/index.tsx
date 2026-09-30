import { Route, Routes } from "react-router-dom";
import { BrainCircuit, ClipboardCheck, Flag, Megaphone, Route as RouteIcon, SlidersHorizontal, TrendingUp } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import SectorRouteGuard from "@/routes/SectorRouteGuard";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import RiskMapPage from "@/pages/RiskMapPage";
import LocationsListPage from "@/pages/LocationsListPage";
import LocationIntelligencePage from "@/pages/LocationIntelligencePage";
import InterventionsPage from "@/pages/InterventionsPage";
import InterventionsHubPage from "@/pages/InterventionsHubPage";
import ImpactSimulatorPage from "@/pages/ImpactSimulatorPage";
import BudgetOptimizerPage from "@/pages/BudgetOptimizerPage";
import ReportsPage from "@/pages/ReportsPage";
import ReportViewPage from "@/pages/ReportViewPage";
import AlertsPage from "@/pages/AlertsPage";
import MLTrainingPage from "@/pages/MLTrainingPage";
import ProfileSettingsPage from "@/pages/ProfileSettingsPage";
import PublicHomePage from "@/pages/PublicHomePage";
import ReportHazardPage from "@/pages/ReportHazardPage";
import SaferRoutesPage from "@/pages/SaferRoutesPage";
import SafetyUpdatesPage from "@/pages/SafetyUpdatesPage";
import SectorPlaceholderPage from "@/pages/SectorPlaceholderPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login has its own full-page layout (see LoginPage.tsx) so its redesign
          stays isolated from Signup, which keeps using the shared AuthLayout. */}
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<AppLayout />}>
        {/* ---------------- Government ---------------- */}
        <Route element={<SectorRouteGuard sector="government" />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/ml-training" element={<MLTrainingPage />} />
          <Route path="/risk-map" element={<RiskMapPage />} />
          <Route path="/locations" element={<LocationsListPage />} />
          <Route path="/locations/:id" element={<LocationIntelligencePage />} />
          <Route path="/locations/:id/interventions" element={<InterventionsPage />} />
          <Route path="/locations/:id/simulator" element={<ImpactSimulatorPage />} />
          <Route path="/interventions" element={<InterventionsHubPage />} />
          <Route path="/budget-optimizer" element={<BudgetOptimizerPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:id" element={<ReportViewPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/settings" element={<ProfileSettingsPage />} />
        </Route>

        {/* ---------------- Technical ---------------- */}
        <Route element={<SectorRouteGuard sector="technical" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/gis-risk-map" element={<RiskMapPage />} />
          <Route path="/location-diagnostics" element={<LocationsListPage />} />
          <Route path="/location-diagnostics/:id" element={<LocationIntelligencePage />} />
          <Route path="/location-diagnostics/:id/interventions" element={<InterventionsPage />} />
          <Route path="/location-diagnostics/:id/simulator" element={<ImpactSimulatorPage />} />
          <Route
            path="/risk-factors"
            element={
              <SectorPlaceholderPage
                title="Risk Factors"
                description="A cross-location view of the strongest model-associated risk contributors. Drill into an individual location under Location Diagnostics for its full cause fingerprint."
                icon={SlidersHorizontal}
              />
            }
          />
          <Route path="/xai" element={<MLTrainingPage />} />
          <Route
            path="/risk-forecast"
            element={
              <SectorPlaceholderPage
                title="Risk Forecast"
                description="A district-wide forecast rollup is planned here. Per-location forecasts with uncertainty bounds are already available under Location Diagnostics → Forecast."
                icon={TrendingUp}
              />
            }
          />
          <Route path="/intervention-analysis" element={<InterventionsHubPage />} />
          <Route
            path="/field-verification"
            element={
              <SectorPlaceholderPage
                title="Field Verification"
                description="Workflow for engineers to confirm modeled risk factors and intervention feasibility on-site is planned here."
                icon={ClipboardCheck}
              />
            }
          />
          <Route path="/technical-reports" element={<ReportsPage />} />
          <Route path="/technical-reports/:id" element={<ReportViewPage />} />
        </Route>

        {/* ---------------- Public ---------------- */}
        <Route element={<SectorRouteGuard sector="public" />}>
          <Route path="/home" element={<PublicHomePage />} />
          <Route path="/safety-map" element={<RiskMapPage />} />
          <Route path="/risk-alerts" element={<AlertsPage />} />
          <Route path="/safer-routes" element={<SaferRoutesPage />} />
          <Route path="/report-hazard" element={<ReportHazardPage />} />
          <Route path="/safety-updates" element={<SafetyUpdatesPage />} />
          <Route path="/profile" element={<ProfileSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
