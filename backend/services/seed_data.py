import logging
from datetime import datetime
from backend.services.auth_service import get_password_hash

logger = logging.getLogger(__name__)


def get_initial_seed_data():
    """Builds the comprehensive document structure for all MongoDB collections"""
    
    # 1. Users
    users = [
        {
            "email": "t.selvam@arcas.ac.in",
            "name": "T. Selvam",
            "initials": "T.S",
            "hashed_password": get_password_hash("password123"),
            "role": "Government Official",
            "organization": "Municipal Corporation",
            "location": "Coimbatore, Tamil Nadu",
            "is_active": True,
            "created_at": datetime.utcnow().isoformat(),
        }
    ]

    # 2. Locations (Rich Embedded Document Model)
    locations = [
        {
            "location_id": "loc-peelamedu",
            "name": "Peelamedu Junction",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 11.0296,
            "longitude": 77.0266,
            "geometry": {"type": "Point", "coordinates": [77.0266, 11.0296]},
            "road_type": "Urban Intersection",
            "area_type": "Commercial",
            "risk_score": {
                "score": 87,
                "level": "critical",
                "trend": "increasing",
                "is_emerging": False,
                "confidence": 0.88,
                "data_quality": "high",
                "accidents3yr": 48,
                "fatalities3yr": 9,
                "injuries3yr": 61,
                "peak_risk_window": "7:00 PM - 10:00 PM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 87,
                "top_factors": [
                    {"factor": "Poor night-time lighting", "contribution_points": 18.4, "description": "Illumination surveys show sub-standard lux levels along the junction approach after sunset."},
                    {"factor": "High-severity accident history", "contribution_points": 14.2, "description": "Fatality-to-accident ratio at this junction exceeds the district median."},
                    {"factor": "Two-wheeler involvement (62%)", "contribution_points": 11.0, "description": "Majority of recorded accidents involve two-wheeler riders."},
                    {"factor": "Unsignalized complex geometry", "contribution_points": 9.3, "description": "Multi-approach junction without coordinated signal phasing."},
                    {"factor": "Monsoon waterlogging", "contribution_points": 6.1, "description": "Recurring waterlogging reduces effective carriageway width in the monsoon months."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Two-wheelers",
                "confidence": 0.84,
                "groups": [
                    {"group": "Two-wheelers", "involvement_share": 0.62, "fatality_share": 0.58},
                    {"group": "Pedestrians", "involvement_share": 0.18, "fatality_share": 0.27},
                    {"group": "Cars", "involvement_share": 0.14, "fatality_share": 0.10},
                    {"group": "Heavy vehicles", "involvement_share": 0.06, "fatality_share": 0.05},
                ],
            },
            "temporal": {
                "peak_hour_window": "7:00 PM - 10:00 PM",
                "peak_day_type": "Weekend evenings",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.08},
                    {"label": "3-6AM", "accident_share": 0.08},
                    {"label": "6-9AM", "accident_share": 0.08},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.08},
                    {"label": "6-9PM", "accident_share": 0.24},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 87,
                "horizon_years": 3,
                "trend": "increasing",
                "is_emerging_hotspot": False,
                "confidence": 0.88,
                "series": [
                    {"year": 2023, "risk": 74, "lower_bound": 70, "upper_bound": 78},
                    {"year": 2024, "risk": 79, "lower_bound": 73, "upper_bound": 84},
                    {"year": 2025, "risk": 83, "lower_bound": 76, "upper_bound": 90},
                    {"year": 2026, "risk": 87, "lower_bound": 79, "upper_bound": 95},
                    {"year": 2027, "risk": 91, "lower_bound": 81, "upper_bound": 100},
                ],
            },
        },
        {
            "location_id": "loc-rspuram",
            "name": "RS Puram Crossing",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 11.0055,
            "longitude": 76.9558,
            "geometry": {"type": "Point", "coordinates": [76.9558, 11.0055]},
            "road_type": "Urban Road",
            "area_type": "Residential/Commercial",
            "risk_score": {
                "score": 82,
                "level": "critical",
                "trend": "stable",
                "is_emerging": False,
                "confidence": 0.81,
                "data_quality": "high",
                "accidents3yr": 41,
                "fatalities3yr": 7,
                "injuries3yr": 52,
                "peak_risk_window": "8:30 AM - 10:00 AM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 82,
                "top_factors": [
                    {"factor": "Over-speeding on approach", "contribution_points": 16.7, "description": "Observed speeds exceed the posted limit on the eastern approach during morning peak."},
                    {"factor": "Pedestrian conflict volume", "contribution_points": 13.5, "description": "High pedestrian crossing volume without a dedicated refuge island."},
                    {"factor": "On-street parking obstruction", "contribution_points": 8.9, "description": "Informal parking reduces sightlines near the crossing."},
                    {"factor": "Peak-hour congestion", "contribution_points": 7.4, "description": "Morning congestion correlates with a higher share of rear-end collisions."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Pedestrians",
                "confidence": 0.77,
                "groups": [
                    {"group": "Pedestrians", "involvement_share": 0.41, "fatality_share": 0.48},
                    {"group": "Two-wheelers", "involvement_share": 0.39, "fatality_share": 0.35},
                    {"group": "Cars", "involvement_share": 0.15, "fatality_share": 0.12},
                    {"group": "Heavy vehicles", "involvement_share": 0.05, "fatality_share": 0.05},
                ],
            },
            "temporal": {
                "peak_hour_window": "8:30 AM - 10:00 AM",
                "peak_day_type": "Weekday mornings",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.08},
                    {"label": "3-6AM", "accident_share": 0.08},
                    {"label": "6-9AM", "accident_share": 0.24},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.08},
                    {"label": "6-9PM", "accident_share": 0.08},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 82,
                "horizon_years": 3,
                "trend": "stable",
                "is_emerging_hotspot": False,
                "confidence": 0.81,
                "series": [
                    {"year": 2023, "risk": 81, "lower_bound": 77, "upper_bound": 85},
                    {"year": 2024, "risk": 81, "lower_bound": 76, "upper_bound": 87},
                    {"year": 2025, "risk": 82, "lower_bound": 75, "upper_bound": 89},
                    {"year": 2026, "risk": 82, "lower_bound": 74, "upper_bound": 91},
                    {"year": 2027, "risk": 83, "lower_bound": 73, "upper_bound": 93},
                ],
            },
        },
        {
            "location_id": "loc-avinashi",
            "name": "Avinashi Road",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 11.0245,
            "longitude": 77.0453,
            "geometry": {"type": "Point", "coordinates": [77.0453, 11.0245]},
            "road_type": "Arterial Corridor",
            "area_type": "Commercial",
            "risk_score": {
                "score": 78,
                "level": "high",
                "trend": "stable",
                "is_emerging": False,
                "confidence": 0.79,
                "data_quality": "medium",
                "accidents3yr": 36,
                "fatalities3yr": 6,
                "injuries3yr": 44,
                "peak_risk_window": "6:00 PM - 8:00 PM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 78,
                "top_factors": [
                    {"factor": "Heavy vehicle mix on corridor", "contribution_points": 15.1, "description": "Freight and heavy-vehicle share is elevated compared to similar corridors."},
                    {"factor": "Unsafe lateral merging", "contribution_points": 12.3, "description": "Multiple uncontrolled access points along the corridor."},
                    {"factor": "Excessive corridor speed", "contribution_points": 10.6, "description": "Wide carriageway encourages higher travel speeds than posted limits."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Two-wheelers",
                "confidence": 0.75,
                "groups": [
                    {"group": "Two-wheelers", "involvement_share": 0.50, "fatality_share": 0.46},
                    {"group": "Heavy vehicles", "involvement_share": 0.22, "fatality_share": 0.31},
                    {"group": "Cars", "involvement_share": 0.20, "fatality_share": 0.16},
                    {"group": "Pedestrians", "involvement_share": 0.08, "fatality_share": 0.07},
                ],
            },
            "temporal": {
                "peak_hour_window": "6:00 PM - 8:00 PM",
                "peak_day_type": "Weekday evenings",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.08},
                    {"label": "3-6AM", "accident_share": 0.08},
                    {"label": "6-9AM", "accident_share": 0.08},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.24},
                    {"label": "6-9PM", "accident_share": 0.08},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 78,
                "horizon_years": 3,
                "trend": "stable",
                "is_emerging_hotspot": False,
                "confidence": 0.79,
                "series": [
                    {"year": 2023, "risk": 77, "lower_bound": 73, "upper_bound": 81},
                    {"year": 2024, "risk": 77, "lower_bound": 72, "upper_bound": 83},
                    {"year": 2025, "risk": 78, "lower_bound": 71, "upper_bound": 85},
                    {"year": 2026, "risk": 78, "lower_bound": 70, "upper_bound": 87},
                    {"year": 2027, "risk": 79, "lower_bound": 69, "upper_bound": 89},
                ],
            },
        },
        {
            "location_id": "loc-gandhipuram",
            "name": "Gandhipuram",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 11.0168,
            "longitude": 76.9658,
            "geometry": {"type": "Point", "coordinates": [76.9658, 11.0168]},
            "road_type": "Urban Junction",
            "area_type": "Commercial Hub",
            "risk_score": {
                "score": 74,
                "level": "high",
                "trend": "increasing",
                "is_emerging": True,
                "confidence": 0.72,
                "data_quality": "medium",
                "accidents3yr": 29,
                "fatalities3yr": 4,
                "injuries3yr": 38,
                "peak_risk_window": "5:30 PM - 7:30 PM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 74,
                "top_factors": [
                    {"factor": "Commercial-hub pedestrian density", "contribution_points": 13.8, "description": "Retail frontage draws high foot traffic across the carriageway."},
                    {"factor": "Bus-stop conflict points", "contribution_points": 10.2, "description": "Bus boarding/alighting close to the intersection stop line."},
                    {"factor": "Rising accident trend (2021-2024)", "contribution_points": 9.0, "description": "Accident count has increased year-over-year for the last three observed years."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Pedestrians",
                "confidence": 0.70,
                "groups": [
                    {"group": "Pedestrians", "involvement_share": 0.37, "fatality_share": 0.40},
                    {"group": "Two-wheelers", "involvement_share": 0.36, "fatality_share": 0.33},
                    {"group": "Cars", "involvement_share": 0.18, "fatality_share": 0.17},
                    {"group": "Heavy vehicles", "involvement_share": 0.09, "fatality_share": 0.10},
                ],
            },
            "temporal": {
                "peak_hour_window": "5:30 PM - 7:30 PM",
                "peak_day_type": "Weekday evenings",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.08},
                    {"label": "3-6AM", "accident_share": 0.08},
                    {"label": "6-9AM", "accident_share": 0.08},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.24},
                    {"label": "6-9PM", "accident_share": 0.08},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 74,
                "horizon_years": 3,
                "trend": "increasing",
                "is_emerging_hotspot": True,
                "confidence": 0.72,
                "series": [
                    {"year": 2023, "risk": 61, "lower_bound": 57, "upper_bound": 65},
                    {"year": 2024, "risk": 66, "lower_bound": 60, "upper_bound": 71},
                    {"year": 2025, "risk": 70, "lower_bound": 63, "upper_bound": 77},
                    {"year": 2026, "risk": 74, "lower_bound": 66, "upper_bound": 82},
                    {"year": 2027, "risk": 78, "lower_bound": 68, "upper_bound": 88},
                ],
            },
        },
        {
            "location_id": "loc-nh47-seg12",
            "name": "NH-47 Segment 12",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 10.9704,
            "longitude": 76.9878,
            "geometry": {"type": "Point", "coordinates": [76.9878, 10.9704]},
            "road_type": "National Highway",
            "area_type": "Semi-Urban",
            "risk_score": {
                "score": 71,
                "level": "high",
                "trend": "increasing",
                "is_emerging": True,
                "confidence": 0.69,
                "data_quality": "medium",
                "accidents3yr": 22,
                "fatalities3yr": 5,
                "injuries3yr": 27,
                "peak_risk_window": "10:00 PM - 1:00 AM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 71,
                "top_factors": [
                    {"factor": "Night-time high-speed corridor", "contribution_points": 14.9, "description": "Majority of severe accidents occur between 10 PM and 1 AM."},
                    {"factor": "Insufficient median separation", "contribution_points": 11.4, "description": "Sections of the highway lack a physical median barrier."},
                    {"factor": "Sparse street lighting on rural stretch", "contribution_points": 8.2, "description": "Extended unlit segments reduce hazard-perception distance."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Cars",
                "confidence": 0.66,
                "groups": [
                    {"group": "Cars", "involvement_share": 0.40, "fatality_share": 0.36},
                    {"group": "Two-wheelers", "involvement_share": 0.33, "fatality_share": 0.40},
                    {"group": "Heavy vehicles", "involvement_share": 0.24, "fatality_share": 0.22},
                    {"group": "Pedestrians", "involvement_share": 0.03, "fatality_share": 0.02},
                ],
            },
            "temporal": {
                "peak_hour_window": "10:00 PM - 1:00 AM",
                "peak_day_type": "Weekend nights",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.24},
                    {"label": "3-6AM", "accident_share": 0.08},
                    {"label": "6-9AM", "accident_share": 0.08},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.08},
                    {"label": "6-9PM", "accident_share": 0.08},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 71,
                "horizon_years": 3,
                "trend": "increasing",
                "is_emerging_hotspot": True,
                "confidence": 0.69,
                "series": [
                    {"year": 2023, "risk": 58, "lower_bound": 54, "upper_bound": 62},
                    {"year": 2024, "risk": 63, "lower_bound": 57, "upper_bound": 68},
                    {"year": 2025, "risk": 67, "lower_bound": 60, "upper_bound": 74},
                    {"year": 2026, "risk": 71, "lower_bound": 63, "upper_bound": 79},
                    {"year": 2027, "risk": 75, "lower_bound": 65, "upper_bound": 85},
                ],
            },
        },
        {
            "location_id": "loc-saibaba",
            "name": "Saibaba Colony Signal",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 11.0176,
            "longitude": 76.9376,
            "geometry": {"type": "Point", "coordinates": [76.9376, 11.0176]},
            "road_type": "Urban Junction",
            "area_type": "Residential",
            "risk_score": {
                "score": 52,
                "level": "moderate",
                "trend": "decreasing",
                "is_emerging": False,
                "confidence": 0.74,
                "data_quality": "medium",
                "accidents3yr": 14,
                "fatalities3yr": 1,
                "injuries3yr": 19,
                "peak_risk_window": "8:00 AM - 9:30 AM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 52,
                "top_factors": [
                    {"factor": "School-zone morning congestion", "contribution_points": 9.1, "description": "Concentrated drop-off activity increases conflict during the morning window."},
                    {"factor": "Faded lane markings", "contribution_points": 6.4, "description": "Lane discipline drops where markings have worn down."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Two-wheelers",
                "confidence": 0.68,
                "groups": [
                    {"group": "Two-wheelers", "involvement_share": 0.48, "fatality_share": 0.44},
                    {"group": "Pedestrians", "involvement_share": 0.29, "fatality_share": 0.33},
                    {"group": "Cars", "involvement_share": 0.23, "fatality_share": 0.23},
                ],
            },
            "temporal": {
                "peak_hour_window": "8:00 AM - 9:30 AM",
                "peak_day_type": "School days",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.08},
                    {"label": "3-6AM", "accident_share": 0.08},
                    {"label": "6-9AM", "accident_share": 0.24},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.08},
                    {"label": "6-9PM", "accident_share": 0.08},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 52,
                "horizon_years": 3,
                "trend": "decreasing",
                "is_emerging_hotspot": False,
                "confidence": 0.74,
                "series": [
                    {"year": 2023, "risk": 63, "lower_bound": 59, "upper_bound": 67},
                    {"year": 2024, "risk": 59, "lower_bound": 54, "upper_bound": 65},
                    {"year": 2025, "risk": 56, "lower_bound": 49, "upper_bound": 63},
                    {"year": 2026, "risk": 52, "lower_bound": 44, "upper_bound": 61},
                    {"year": 2027, "risk": 48, "lower_bound": 38, "upper_bound": 58},
                ],
            },
        },
        {
            "location_id": "loc-singanallur",
            "name": "Singanallur Bypass",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 11.0006,
            "longitude": 77.0304,
            "geometry": {"type": "Point", "coordinates": [77.0304, 11.0006]},
            "road_type": "Bypass Road",
            "area_type": "Industrial",
            "risk_score": {
                "score": 45,
                "level": "moderate",
                "trend": "stable",
                "is_emerging": False,
                "confidence": 0.66,
                "data_quality": "low",
                "accidents3yr": 11,
                "fatalities3yr": 2,
                "injuries3yr": 15,
                "peak_risk_window": "6:00 AM - 8:00 AM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 45,
                "top_factors": [
                    {"factor": "Industrial heavy-vehicle turning movements", "contribution_points": 7.8, "description": "Frequent truck turning movements near factory access roads."},
                    {"factor": "Low data coverage", "contribution_points": 4.0, "description": "Limited historical records reduce confidence in this fingerprint."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Heavy vehicles",
                "confidence": 0.55,
                "groups": [
                    {"group": "Heavy vehicles", "involvement_share": 0.34, "fatality_share": 0.38},
                    {"group": "Two-wheelers", "involvement_share": 0.34, "fatality_share": 0.30},
                    {"group": "Cars", "involvement_share": 0.32, "fatality_share": 0.32},
                ],
            },
            "temporal": {
                "peak_hour_window": "6:00 AM - 8:00 AM",
                "peak_day_type": "Weekday mornings",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.08},
                    {"label": "3-6AM", "accident_share": 0.24},
                    {"label": "6-9AM", "accident_share": 0.08},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.08},
                    {"label": "6-9PM", "accident_share": 0.08},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 45,
                "horizon_years": 3,
                "trend": "stable",
                "is_emerging_hotspot": False,
                "confidence": 0.66,
                "series": [
                    {"year": 2023, "risk": 44, "lower_bound": 40, "upper_bound": 48},
                    {"year": 2024, "risk": 44, "lower_bound": 39, "upper_bound": 50},
                    {"year": 2025, "risk": 45, "lower_bound": 38, "upper_bound": 52},
                    {"year": 2026, "risk": 45, "lower_bound": 37, "upper_bound": 54},
                    {"year": 2027, "risk": 46, "lower_bound": 36, "upper_bound": 56},
                ],
            },
        },
        {
            "location_id": "loc-ukkadam",
            "name": "Ukkadam Bus Stand Road",
            "state": "Tamil Nadu",
            "district": "Coimbatore",
            "latitude": 10.9878,
            "longitude": 76.9629,
            "geometry": {"type": "Point", "coordinates": [76.9629, 10.9878]},
            "road_type": "Urban Road",
            "area_type": "Transit Hub",
            "risk_score": {
                "score": 22,
                "level": "low",
                "trend": "decreasing",
                "is_emerging": False,
                "confidence": 0.70,
                "data_quality": "medium",
                "accidents3yr": 6,
                "fatalities3yr": 0,
                "injuries3yr": 8,
                "peak_risk_window": "5:00 PM - 6:30 PM",
                "dataset_version": "morth-2019-2023-v2",
                "model_version": "xgb-risk-v1.3",
                "predicted_at": "2026-08-01T06:00:00Z",
            },
            "cause_fingerprint": {
                "risk_score": 22,
                "top_factors": [
                    {"factor": "Transit-hub pedestrian crossings", "contribution_points": 5.2, "description": "Bus-stand foot traffic creates minor, low-severity conflict points."},
                ],
                "note": "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
            },
            "vulnerability": {
                "most_affected_group": "Pedestrians",
                "confidence": 0.60,
                "groups": [
                    {"group": "Pedestrians", "involvement_share": 0.45, "fatality_share": 0.50},
                    {"group": "Two-wheelers", "involvement_share": 0.35, "fatality_share": 0.30},
                    {"group": "Cars", "involvement_share": 0.20, "fatality_share": 0.20},
                ],
            },
            "temporal": {
                "peak_hour_window": "5:00 PM - 6:30 PM",
                "peak_day_type": "Weekday evenings",
                "hourly": [
                    {"label": "12-3AM", "accident_share": 0.08},
                    {"label": "3-6AM", "accident_share": 0.08},
                    {"label": "6-9AM", "accident_share": 0.08},
                    {"label": "9-12PM", "accident_share": 0.08},
                    {"label": "12-3PM", "accident_share": 0.08},
                    {"label": "3-6PM", "accident_share": 0.24},
                    {"label": "6-9PM", "accident_share": 0.08},
                    {"label": "9-12AM", "accident_share": 0.08},
                ],
                "day_of_week": [
                    {"label": "Mon", "accident_share": 0.13},
                    {"label": "Tue", "accident_share": 0.12},
                    {"label": "Wed", "accident_share": 0.13},
                    {"label": "Thu", "accident_share": 0.14},
                    {"label": "Fri", "accident_share": 0.17},
                    {"label": "Sat", "accident_share": 0.19},
                    {"label": "Sun", "accident_share": 0.12},
                ],
            },
            "forecast": {
                "current_risk": 22,
                "horizon_years": 3,
                "trend": "decreasing",
                "is_emerging_hotspot": False,
                "confidence": 0.70,
                "series": [
                    {"year": 2023, "risk": 33, "lower_bound": 29, "upper_bound": 37},
                    {"year": 2024, "risk": 29, "lower_bound": 24, "upper_bound": 35},
                    {"year": 2025, "risk": 26, "lower_bound": 19, "upper_bound": 33},
                    {"year": 2026, "risk": 22, "lower_bound": 14, "upper_bound": 31},
                    {"year": 2027, "risk": 18, "lower_bound": 8, "upper_bound": 28},
                ],
            },
        },
    ]

    # 3. Interventions Catalog
    interventions = [
        # Peelamedu
        {"intervention_id": "int-peelamedu-lighting", "location_id": "loc-peelamedu", "name": "Street Lighting Upgrade & High-Mast LED", "target_cause": "Poor night-time lighting", "cause_match": 0.91, "context_match": 0.86, "suitable_context": "Urban junction / dark approach", "estimated_cost_min": 1800000.0, "estimated_cost_max": 2500000.0, "expected_effect_min": 12.0, "expected_effect_max": 22.0, "confidence": "High", "evidence_source": "Published road-safety evidence; local high-mast pilot (2022)", "implementation_constraints": "Requires DISCOM approval for power connection"},
        {"intervention_id": "int-peelamedu-speed", "location_id": "loc-peelamedu", "name": "Speed-Calibrated Signage & Enforcement", "target_cause": "High-severity accident history", "cause_match": 0.78, "context_match": 0.80, "suitable_context": "Urban junction / high-speed approach", "estimated_cost_min": 400000.0, "estimated_cost_max": 900000.0, "expected_effect_min": 8.0, "expected_effect_max": 18.0, "confidence": "Medium", "evidence_source": "Traffic police enforcement history, similar junctions", "implementation_constraints": "Needs sustained enforcement capacity"},
        {"intervention_id": "int-peelamedu-median", "location_id": "loc-peelamedu", "name": "Median / Barrier Improvement", "target_cause": "Unsignalized complex geometry", "cause_match": 0.70, "context_match": 0.68, "suitable_context": "Multi-approach junction", "estimated_cost_min": 2200000.0, "estimated_cost_max": 3000000.0, "expected_effect_min": 6.0, "expected_effect_max": 15.0, "confidence": "Medium", "evidence_source": "PWD civil engineering benchmark costs", "implementation_constraints": "Requires temporary traffic diversion during construction"},
        # RS Puram
        {"intervention_id": "int-rspuram-crossing", "location_id": "loc-rspuram", "name": "Signalized Zebra Crossing & Pedestrian Refuge", "target_cause": "Pedestrian conflict volume", "cause_match": 0.88, "context_match": 0.85, "suitable_context": "High-density commercial corridor", "estimated_cost_min": 380000.0, "estimated_cost_max": 500000.0, "expected_effect_min": 10.0, "expected_effect_max": 20.0, "confidence": "High", "evidence_source": "Municipal pedestrian-safety audit", "implementation_constraints": "Signal timing coordination with adjacent junctions"},
        {"intervention_id": "int-rspuram-parking", "location_id": "loc-rspuram", "name": "Parking Enforcement & Sightline Clearance", "target_cause": "On-street parking obstruction", "cause_match": 0.72, "context_match": 0.75, "suitable_context": "Urban commercial road", "estimated_cost_min": 100000.0, "estimated_cost_max": 250000.0, "expected_effect_min": 5.0, "expected_effect_max": 12.0, "confidence": "Medium", "evidence_source": "Local enforcement pilot data", "implementation_constraints": "Requires ongoing municipal enforcement"},
        {"intervention_id": "int-rspuram-speedcalm", "location_id": "loc-rspuram", "name": "Rumble Strips & Speed Management", "target_cause": "Over-speeding on approach", "cause_match": 0.75, "context_match": 0.70, "suitable_context": "Approach road to urban junction", "estimated_cost_min": 250000.0, "estimated_cost_max": 400000.0, "expected_effect_min": 7.0, "expected_effect_max": 15.0, "confidence": "Medium", "evidence_source": "Published road-safety evidence", "implementation_constraints": "Road authority approval required"},
        # Avinashi Road
        {"intervention_id": "int-avinashi-median", "location_id": "loc-avinashi", "name": "Median Barrier & Reflective Studs", "target_cause": "Unsafe lateral merging", "cause_match": 0.84, "context_match": 0.80, "suitable_context": "Multi-lane undivided corridor", "estimated_cost_min": 2500000.0, "estimated_cost_max": 3200000.0, "expected_effect_min": 9.0, "expected_effect_max": 18.0, "confidence": "Medium", "evidence_source": "NHAI median-barrier benchmark", "implementation_constraints": "Utility relocation may be required"},
        {"intervention_id": "int-avinashi-speed", "location_id": "loc-avinashi", "name": "Corridor Speed Management System", "target_cause": "Excessive corridor speed", "cause_match": 0.79, "context_match": 0.77, "suitable_context": "High-speed commercial corridor", "estimated_cost_min": 900000.0, "estimated_cost_max": 1400000.0, "expected_effect_min": 8.0, "expected_effect_max": 16.0, "confidence": "Medium", "evidence_source": "Traffic police enforcement history", "implementation_constraints": "Requires camera + enforcement infrastructure"},
        {"intervention_id": "int-avinashi-access", "location_id": "loc-avinashi", "name": "Access-Point Consolidation", "target_cause": "Heavy vehicle mix on corridor", "cause_match": 0.66, "context_match": 0.60, "suitable_context": "Commercial arterial road", "estimated_cost_min": 1200000.0, "estimated_cost_max": 1900000.0, "expected_effect_min": 5.0, "expected_effect_max": 11.0, "confidence": "Low", "evidence_source": "Civil engineering audit recommendation", "implementation_constraints": "Requires coordination with adjoining property owners"},
        # Gandhipuram
        {"intervention_id": "int-gandhipuram-crossing", "location_id": "loc-gandhipuram", "name": "Elevated Pedestrian Crossing", "target_cause": "Commercial-hub pedestrian density", "cause_match": 0.82, "context_match": 0.78, "suitable_context": "Commercial hub junction", "estimated_cost_min": 3000000.0, "estimated_cost_max": 4200000.0, "expected_effect_min": 10.0, "expected_effect_max": 19.0, "confidence": "Medium", "evidence_source": "Municipal infrastructure proposal", "implementation_constraints": "Long construction timeline"},
        {"intervention_id": "int-gandhipuram-busbay", "location_id": "loc-gandhipuram", "name": "Dedicated Bus Bay Relocation", "target_cause": "Bus-stop conflict points", "cause_match": 0.70, "context_match": 0.72, "suitable_context": "Urban junction with transit stop", "estimated_cost_min": 600000.0, "estimated_cost_max": 900000.0, "expected_effect_min": 6.0, "expected_effect_max": 13.0, "confidence": "Medium", "evidence_source": "Transit authority coordination study", "implementation_constraints": "Requires transit authority sign-off"},
        {"intervention_id": "int-gandhipuram-signal", "location_id": "loc-gandhipuram", "name": "Adaptive Signal Retiming", "target_cause": "Rising accident trend (2021-2024)", "cause_match": 0.60, "context_match": 0.65, "suitable_context": "Dense commercial intersection", "estimated_cost_min": 350000.0, "estimated_cost_max": 550000.0, "expected_effect_min": 4.0, "expected_effect_max": 10.0, "confidence": "Low", "evidence_source": "Signal-timing pilot in comparable district", "implementation_constraints": "Needs traffic-volume study before retiming"},
        # NH-47
        {"intervention_id": "int-nh47-lighting", "location_id": "loc-nh47-seg12", "name": "Highway Segment Lighting Extension", "target_cause": "Sparse street lighting on rural stretch", "cause_match": 0.80, "context_match": 0.75, "suitable_context": "Rural/semi-urban highway segment", "estimated_cost_min": 2100000.0, "estimated_cost_max": 2800000.0, "expected_effect_min": 9.0, "expected_effect_max": 17.0, "confidence": "Medium", "evidence_source": "NHAI lighting rollout benchmark", "implementation_constraints": "Power infrastructure extension required"},
        {"intervention_id": "int-nh47-median", "location_id": "loc-nh47-seg12", "name": "Physical Median Barrier Installation", "target_cause": "Insufficient median separation", "cause_match": 0.77, "context_match": 0.74, "suitable_context": "Divided national highway", "estimated_cost_min": 3500000.0, "estimated_cost_max": 4500000.0, "expected_effect_min": 11.0, "expected_effect_max": 20.0, "confidence": "Medium", "evidence_source": "NHAI median-barrier benchmark", "implementation_constraints": "Long lead-time procurement"},
        {"intervention_id": "int-nh47-enforcement", "location_id": "loc-nh47-seg12", "name": "Night-time Speed Enforcement Corridor", "target_cause": "Night-time high-speed corridor", "cause_match": 0.73, "context_match": 0.70, "suitable_context": "High-speed national highway", "estimated_cost_min": 500000.0, "estimated_cost_max": 800000.0, "expected_effect_min": 6.0, "expected_effect_max": 14.0, "confidence": "Low", "evidence_source": "Highway patrol enforcement pilot", "implementation_constraints": "Requires 24x7 patrol capacity"},
        # Saibaba Colony
        {"intervention_id": "int-saibaba-school", "location_id": "loc-saibaba", "name": "School Zone Traffic Calming", "target_cause": "School-zone morning congestion", "cause_match": 0.75, "context_match": 0.78, "suitable_context": "Residential road near school", "estimated_cost_min": 300000.0, "estimated_cost_max": 480000.0, "expected_effect_min": 7.0, "expected_effect_max": 15.0, "confidence": "Medium", "evidence_source": "School-zone safety audit", "implementation_constraints": "Coordination with school administration"},
        {"intervention_id": "int-saibaba-marking", "location_id": "loc-saibaba", "name": "Lane Marking & Signage Refresh", "target_cause": "Faded lane markings", "cause_match": 0.60, "context_match": 0.65, "suitable_context": "Urban junction", "estimated_cost_min": 80000.0, "estimated_cost_max": 150000.0, "expected_effect_min": 3.0, "expected_effect_max": 8.0, "confidence": "Medium", "evidence_source": "Routine maintenance benchmark", "implementation_constraints": "Low; standard maintenance cycle"},
        # Singanallur
        {"intervention_id": "int-singanallur-turning", "location_id": "loc-singanallur", "name": "Dedicated Truck Turning Lane", "target_cause": "Industrial heavy-vehicle turning movements", "cause_match": 0.68, "context_match": 0.70, "suitable_context": "Industrial bypass road", "estimated_cost_min": 1500000.0, "estimated_cost_max": 2200000.0, "expected_effect_min": 6.0, "expected_effect_max": 13.0, "confidence": "Low", "evidence_source": "Industrial-corridor civil audit", "implementation_constraints": "Requires land availability at junction"},
        # Ukkadam
        {"intervention_id": "int-ukkadam-crossing", "location_id": "loc-ukkadam", "name": "Pedestrian Crossing Refresh Near Transit Hub", "target_cause": "Transit-hub pedestrian crossings", "cause_match": 0.60, "context_match": 0.62, "suitable_context": "Transit hub / bus stand road", "estimated_cost_min": 150000.0, "estimated_cost_max": 260000.0, "expected_effect_min": 4.0, "expected_effect_max": 9.0, "confidence": "Medium", "evidence_source": "Transit-hub pedestrian audit", "implementation_constraints": "Coordination with bus stand operator"},
    ]

    # 4. Alerts
    alerts = [
        {"id": "alert-1", "severity": "high-risk", "title": "High Risk Alert", "detail": "Peelamedu Junction risk increased from 74 to 87", "timestamp": "2026-08-01T05:58:00Z", "read": False},
        {"id": "alert-2", "severity": "emerging-risk", "title": "Emerging Risk", "detail": "NH-47 Segment 12 entered emerging-risk status", "timestamp": "2026-08-01T04:58:00Z", "read": False},
        {"id": "alert-3", "severity": "intervention-update", "title": "Intervention Update", "detail": "Street-light project approved for RS Puram", "timestamp": "2026-08-01T02:58:00Z", "read": True},
        {"id": "alert-4", "severity": "system", "title": "Report Ready", "detail": "Your district report is ready to download", "timestamp": "2026-07-31T23:58:00Z", "read": True},
        {"id": "alert-5", "severity": "system", "title": "System Update", "detail": "New data available for Coimbatore district", "timestamp": "2026-07-31T05:58:00Z", "read": True},
    ]

    # 5. Reports
    reports = [
        {"report_id": "rep-1", "location_id": "loc-peelamedu", "district": "Coimbatore", "title": "Peelamedu Junction - Location Report", "generated_at": "2026-08-01T00:00:00Z", "file_name": "Peelamedu_Junction_Report.pdf", "kind": "location"},
        {"report_id": "rep-2", "location_id": None, "district": "Coimbatore", "title": "Coimbatore District - Road Safety Report", "generated_at": "2026-07-31T00:00:00Z", "file_name": "Coimbatore_District_Report.pdf", "kind": "district"},
        {"report_id": "rep-3", "location_id": None, "district": "Coimbatore", "title": "Budget Optimization Report", "generated_at": "2026-07-30T00:00:00Z", "file_name": "Budget_Optimization_Report.pdf", "kind": "budget"},
    ]

    # 6. District Summary
    district_summary = {
        "district": "Coimbatore, Tamil Nadu",
        "total_locations_analyzed": 12456,
        "high_risk_locations": 348,
        "emerging_risk_locations": 86,
        "interventions_pending": 16,
        "current_safety_budget": 5000000.0,
        "last_updated": "2026-08-01T06:00:00Z",
        "top_priority_locations": [
            {"location_id": "loc-peelamedu", "name": "Peelamedu Junction", "score": 87},
            {"location_id": "loc-rspuram", "name": "RS Puram", "score": 82},
            {"location_id": "loc-avinashi", "name": "Avinashi Road", "score": 78},
            {"location_id": "loc-gandhipuram", "name": "Gandhipuram", "score": 74},
            {"location_id": "loc-nh47-seg12", "name": "NH-47 Segment 12", "score": 71},
        ],
    }

    return {
        "users": users,
        "locations": locations,
        "interventions": interventions,
        "alerts": alerts,
        "reports": reports,
        "district_summaries": [district_summary],
    }


async def seed_mongo_data(db):
    """Async MongoDB seeder: inserts seed data if collections are empty"""
    count = await db.locations.count_documents({})
    if count > 0:
        logger.info("MongoDB database already contains location data.")
        return

    logger.info("Seeding initial dataset into MongoDB collections...")
    data = get_initial_seed_data()

    if data["users"]:
        await db.users.insert_many(data["users"])
    if data["locations"]:
        await db.locations.insert_many(data["locations"])
    if data["interventions"]:
        await db.interventions.insert_many(data["interventions"])
    if data["alerts"]:
        await db.alerts.insert_many(data["alerts"])
    if data["reports"]:
        await db.reports.insert_many(data["reports"])
    if data["district_summaries"]:
        await db.district_summaries.insert_many(data["district_summaries"])

    logger.info("MongoDB initial seeding complete!")


async def create_in_memory_mongo_db():
    """Provides an asynchronous mongomock database when no external MongoDB daemon is running"""
    import mongomock
    import asyncio

    class AsyncCollectionWrapper:
        def __init__(self, sync_collection):
            self._col = sync_collection

        async def find_one(self, filter=None, *args, **kwargs):
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: self._col.find_one(filter, *args, **kwargs))

        def find(self, filter=None, *args, **kwargs):
            cursor = self._col.find(filter, *args, **kwargs)
            return AsyncCursorWrapper(cursor)

        async def count_documents(self, filter=None, **kwargs):
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: self._col.count_documents(filter or {}, **kwargs))

        async def insert_one(self, doc, **kwargs):
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: self._col.insert_one(doc, **kwargs))

        async def insert_many(self, docs, **kwargs):
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: self._col.insert_many(docs, **kwargs))

        async def update_one(self, filter, update, **kwargs):
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: self._col.update_one(filter, update, **kwargs))

        async def delete_one(self, filter, **kwargs):
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: self._col.delete_one(filter, **kwargs))

        async def create_index(self, *args, **kwargs):
            pass

    class AsyncCursorWrapper:
        def __init__(self, sync_cursor):
            self._cur = sync_cursor

        def sort(self, *args, **kwargs):
            self._cur.sort(*args, **kwargs)
            return self

        def limit(self, limit: int):
            self._cur.limit(limit)
            return self

        def skip(self, skip: int):
            self._cur.skip(skip)
            return self

        async def to_list(self, length: int = None):
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: list(self._cur)[:length] if length else list(self._cur))

        def __aiter__(self):
            self._iter = iter(self._cur)
            return self

        async def __anext__(self):
            try:
                return next(self._iter)
            except StopIteration:
                raise StopAsyncIteration

    class AsyncDatabaseWrapper:
        def __init__(self, sync_db):
            self._db = sync_db
            self._collections = {}

        def __getattr__(self, name):
            if name not in self._collections:
                self._collections[name] = AsyncCollectionWrapper(self._db[name])
            return self._collections[name]

        def __getitem__(self, name):
            return self.__getattr__(name)

    mock_client = mongomock.MongoClient()
    mock_db = mock_client["rakshapath_db"]
    async_db = AsyncDatabaseWrapper(mock_db)

    # Seed initial dataset
    await seed_mongo_data(async_db)
    return async_db
