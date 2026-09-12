import { Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
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
import ProfileSettingsPage from "@/pages/ProfileSettingsPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
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

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
