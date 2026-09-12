import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_01_root_and_health():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "online"

    res_h = client.get("/health")
    assert res_h.status_code == 200
    assert res_h.json()["status"] == "healthy"


def test_02_auth_login_and_signup():
    login_payload = {"email": "t.selvam@arcas.ac.in", "password": "password123"}
    res_login = client.post("/api/auth/login", json=login_payload)
    assert res_login.status_code == 200
    data = res_login.json()
    assert "email" in data
    assert "role" in data

    signup_payload = {
        "fullName": "Test Traffic Commissioner",
        "email": "test.commissioner@gov.in",
        "password": "securepassword123"
    }
    res_signup = client.post("/api/auth/signup", json=signup_payload)
    assert res_signup.status_code in [200, 400]


def test_03_locations():
    res = client.get("/api/locations")
    assert res.status_code == 200
    locations = res.json()
    assert isinstance(locations, list)
    assert len(locations) >= 10

    loc_id = locations[0]["locationId"]
    res_single = client.get(f"/api/locations/{loc_id}")
    assert res_single.status_code == 200
    assert res_single.json()["locationId"] == loc_id


def test_04_risk_map():
    res = client.get("/api/risk/map")
    assert res.status_code == 200
    scores = res.json()
    assert isinstance(scores, list)
    assert len(scores) >= 10

    res_high = client.get("/api/risk/high-risk")
    assert res_high.status_code == 200
    assert isinstance(res_high.json(), list)

    res_emerging = client.get("/api/risk/emerging")
    assert res_emerging.status_code == 200
    assert isinstance(res_emerging.json(), list)


def test_05_causes_and_shap():
    res_causes = client.get("/api/causes/loc-peelamedu")
    assert res_causes.status_code == 200
    data = res_causes.json()
    assert data["locationId"] == "loc-peelamedu"
    assert len(data["topFactors"]) > 0


def test_06_vulnerability():
    res = client.get("/api/vulnerability/loc-peelamedu")
    assert res.status_code == 200
    data = res.json()
    assert data["locationId"] == "loc-peelamedu"
    assert len(data["groups"]) > 0


def test_07_temporal():
    res = client.get("/api/temporal/loc-peelamedu")
    assert res.status_code == 200
    data = res.json()
    assert data["locationId"] == "loc-peelamedu"
    assert len(data["hourly"]) > 0


def test_08_prediction():
    res = client.get("/api/prediction/loc-peelamedu")
    assert res.status_code == 200
    data = res.json()
    assert data["locationId"] == "loc-peelamedu"
    assert len(data["series"]) >= 3


def test_09_interventions():
    res_all = client.get("/api/interventions")
    assert res_all.status_code == 200
    assert isinstance(res_all.json(), list)

    res_loc = client.get("/api/interventions?location_id=loc-peelamedu")
    assert res_loc.status_code == 200
    assert len(res_loc.json()) > 0


def test_10_simulation():
    payload = {
        "locationId": "loc-peelamedu",
        "interventionIds": ["int-peelamedu-01"]
    }
    res = client.post("/api/simulation", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "projectedRisk" in data
    assert "riskReduction" in data


def test_11_optimizer():
    payload = {
        "budgetLimit": 5000000.0,
        "locationIds": ["loc-peelamedu"]
    }
    res = client.post("/api/optimize", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "totalCost" in data
    assert "selected" in data


def test_12_dashboard_summary():
    res = client.get("/api/dashboard/summary")
    assert res.status_code == 200
    data = res.json()
    assert "totalLocationsAnalyzed" in data
    assert "topPriorityLocations" in data


def test_13_alerts():
    res = client.get("/api/alerts")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert len(res.json()) > 0


def test_14_reports():
    res = client.get("/api/report")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert len(res.json()) > 0


def test_15_ml_training_status():
    res = client.get("/api/train/status")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] in ["ready", "untrained"]
