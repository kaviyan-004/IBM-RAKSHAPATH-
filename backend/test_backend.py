"""
Comprehensive Automated Test Suite for RakshaPath Backend (MongoDB Edition)
Tests all 14 endpoints matching the frontend requirements against MongoDB.
"""

import time
import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"

    res_api = client.get("/api/health")
    assert res_api.status_code == 200


def test_locations():
    res = client.get("/api/locations")
    assert res.status_code == 200
    locations = res.json()
    assert len(locations) >= 8
    assert any(l["locationId"] == "loc-peelamedu" for l in locations)

    # Test single location
    res_single = client.get("/api/locations/loc-peelamedu")
    assert res_single.status_code == 200
    data = res_single.json()
    assert data["locationId"] == "loc-peelamedu"
    assert data["name"] == "Peelamedu Junction"
    assert "roadType" in data
    assert "areaType" in data


def test_risk():
    res_map = client.get("/api/risk/map")
    assert res_map.status_code == 200
    scores = res_map.json()
    assert len(scores) >= 8

    res_single = client.get("/api/risk/loc-peelamedu")
    assert res_single.status_code == 200
    peelamedu = res_single.json()
    assert peelamedu["score"] == 87
    assert peelamedu["level"] == "critical"
    assert "peakRiskWindow" in peelamedu
    assert "accidents3yr" in peelamedu
    assert "fatalities3yr" in peelamedu
    assert "injuries3yr" in peelamedu

    res_high = client.get("/api/risk/high-risk")
    assert res_high.status_code == 200
    for r in res_high.json():
        assert r["level"] in ["high", "critical"]

    res_emerging = client.get("/api/risk/emerging")
    assert res_emerging.status_code == 200
    for r in res_emerging.json():
        assert r["isEmerging"] is True


def test_causes_and_shap():
    res_cause = client.get("/api/causes/loc-peelamedu")
    assert res_cause.status_code == 200
    data = res_cause.json()
    assert data["locationId"] == "loc-peelamedu"
    assert len(data["topFactors"]) > 0
    assert "contributionPoints" in data["topFactors"][0]
    assert "description" in data["topFactors"][0]
    assert "note" in data

    res_shap = client.get("/api/causes/loc-peelamedu/shap")
    assert res_shap.status_code == 200
    assert len(res_shap.json()["topFactors"]) > 0


def test_vulnerability():
    res = client.get("/api/vulnerability/loc-peelamedu")
    assert res.status_code == 200
    data = res.json()
    assert data["locationId"] == "loc-peelamedu"
    assert data["mostAffectedGroup"] == "Two-wheelers"
    assert len(data["groups"]) > 0
    assert "involvementShare" in data["groups"][0]
    assert "fatalityShare" in data["groups"][0]


def test_temporal():
    res = client.get("/api/temporal/loc-peelamedu")
    assert res.status_code == 200
    data = res.json()
    assert data["locationId"] == "loc-peelamedu"
    assert "peakHourWindow" in data
    assert "peakDayType" in data
    assert len(data["hourly"]) == 8
    assert len(data["dayOfWeek"]) == 7


def test_prediction():
    res = client.get("/api/prediction/loc-peelamedu")
    assert res.status_code == 200
    data = res.json()
    assert data["locationId"] == "loc-peelamedu"
    assert data["currentRisk"] == 87
    assert len(data["series"]) == 5
    assert "lowerBound" in data["series"][0]
    assert "upperBound" in data["series"][0]


def test_interventions():
    res_top = client.get("/api/interventions/loc-peelamedu/top")
    assert res_top.status_code == 200
    interventions = res_top.json()
    assert len(interventions) >= 3
    first = interventions[0]
    assert "interventionId" in first
    assert "targetCause" in first
    assert "estimatedCostMin" in first
    assert "expectedEffectMax" in first
    assert "confidence" in first


def test_simulation():
    payload = {
        "locationId": "loc-peelamedu",
        "interventionIds": ["int-peelamedu-lighting", "int-peelamedu-speed"]
    }
    res = client.post("/api/simulation", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["baselineRisk"] == 87
    assert data["simulatedRisk"] < 87
    assert data["riskReductionPct"] > 0
    assert len(data["assumptions"]) > 0
    assert "confidence" in data


def test_budget_optimizer():
    payload = {
        "budgetLimit": 5000000,
        "locationIds": ["loc-peelamedu", "loc-rspuram", "loc-avinashi"]
    }
    res = client.post("/api/optimize", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["budgetLimit"] == 5000000
    assert data["totalCost"] <= 5000000
    assert data["remainingBudget"] >= 0
    assert len(data["selected"]) > 0
    assert "confidence" in data["selected"][0]


def test_dashboard_summary():
    res = client.get("/api/dashboard/summary")
    assert res.status_code == 200
    data = res.json()
    assert "Coimbatore" in data["district"]
    assert data["totalLocationsAnalyzed"] > 0
    assert len(data["topPriorityLocations"]) > 0
    assert "score" in data["topPriorityLocations"][0]


def test_alerts():
    res = client.get("/api/alerts")
    assert res.status_code == 200
    alerts = res.json()
    assert len(alerts) >= 5
    first = alerts[0]
    assert "severity" in first
    assert "title" in first
    assert "detail" in first


def test_reports():
    res_list = client.get("/api/report")
    assert res_list.status_code == 200
    reports = res_list.json()
    assert len(reports) >= 3

    res_loc = client.get("/api/report/loc-peelamedu/pdf")
    assert res_loc.status_code == 200
    assert res_loc.json()["locationId"] == "loc-peelamedu"


def test_auth():
    # Login
    login_payload = {"email": "t.selvam@arcas.ac.in", "password": "password123"}
    res_login = client.post("/api/auth/login", json=login_payload)
    assert res_login.status_code == 200
    data_login = res_login.json()
    assert data_login["name"] == "T. Selvam"
    assert data_login["initials"] == "T.S"
    assert data_login["email"] == "t.selvam@arcas.ac.in"

    # Signup
    unique_email = f"officer.{int(time.time() * 1000)}@tn.gov.in"
    signup_payload = {
        "fullName": "Kavitha Raman",
        "email": unique_email,
        "password": "securepassword"
    }
    res_signup = client.post("/api/auth/signup", json=signup_payload)
    assert res_signup.status_code == 200
    data_signup = res_signup.json()
    assert data_signup["name"] == "Kavitha Raman"
    assert data_signup["initials"] == "KR"
    assert data_signup["email"] == unique_email


if __name__ == "__main__":
    print("Running RakshaPath MongoDB API Verification Test Suite...")
    test_health()
    print("[PASS] Health Check Passed")
    test_locations()
    print("[PASS] Locations API Passed")
    test_risk()
    print("[PASS] Risk Scoring & High/Emerging Risk API Passed")
    test_causes_and_shap()
    print("[PASS] Cause Fingerprint & SHAP Explainability API Passed")
    test_vulnerability()
    print("[PASS] Vulnerability Distribution API Passed")
    test_temporal()
    print("[PASS] Temporal Analysis API Passed")
    test_prediction()
    print("[PASS] Predictive Forecasting API Passed")
    test_interventions()
    print("[PASS] Interventions Catalog API Passed")
    test_simulation()
    print("[PASS] What-If Simulation Engine Passed")
    test_budget_optimizer()
    print("[PASS] Knapsack Budget Portfolio Optimizer Passed")
    test_dashboard_summary()
    print("[PASS] Dashboard Summary API Passed")
    test_alerts()
    print("[PASS] Alerts API Passed")
    test_reports()
    print("[PASS] Reports Center API Passed")
    test_auth()
    print("[PASS] Auth (Login/Signup) API Passed")
    print("\nSUCCESS: ALL MONGODB TESTS PASSED! Backend is 100% matched with Frontend!")
