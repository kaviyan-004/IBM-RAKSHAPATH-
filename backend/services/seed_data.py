import json
import logging
import hashlib
from datetime import datetime
from sqlalchemy.orm import Session
from backend.models import User, Corridor, Incident, Alert, Intervention
from backend.services.auth_service import get_password_hash

logger = logging.getLogger(__name__)


def seed_database(db: Session):
    """Seed initial data into SQLite database from datasets & ML models"""
    logger.info("Seeding SQLite database tables...")

    # Seed users
    if db.query(User).count() == 0:
        users = [
            User(
                email="t.selvam@arcas.ac.in",
                password_hash=get_password_hash("password123"),
                full_name="Dr. T. Selvam",
                role="Chief Safety Analyst",
                department="Tamil Nadu Road Safety Authority",
                is_active=True
            ),
            User(
                email="admin@rakshapath.gov.in",
                password_hash=get_password_hash("admin123"),
                full_name="Chief Safety Commissioner",
                role="Chief Safety Analyst",
                department="Tamil Nadu Road Safety Authority",
                is_active=True
            )
        ]
        db.add_all(users)
        db.commit()

    # Seed or sync corridors / locations from all 5 datasets and trained ML model
    from backend.services.dataset_loader import build_corridors_from_datasets
    
    current_count = db.query(Corridor).count()
    if current_count < 20:
        logger.info("Ingesting full ML trained dataset corridors into SQLite database...")
        db.query(Corridor).delete()
        dataset_corridors = build_corridors_from_datasets()
        for loc in dataset_corridors:
            c = Corridor(
                id=loc["id"],
                corridor_name=loc["corridor_name"],
                district=loc["district"],
                state=loc["state"],
                highway_number=loc["highway_number"],
                length_km=loc["length_km"],
                start_latitude=loc["start_latitude"],
                start_longitude=loc["start_longitude"],
                end_latitude=loc["end_latitude"],
                end_longitude=loc["end_longitude"],
                risk_score=loc["risk_score"],
                risk_level=loc["risk_level"],
                predicted_incidents=loc["predicted_incidents"],
                speed_limit=loc["speed_limit"],
                avg_daily_traffic=loc["avg_daily_traffic"],
                historical_incidents_count=loc["historical_incidents_count"],
                fatal_incidents_count=loc["fatal_incidents_count"],
                major_risk_factors_json=loc["major_risk_factors_json"],
                causes_data_json=loc["causes_data_json"],
                vulnerability_data_json=loc["vulnerability_data_json"],
                temporal_data_json=loc["temporal_data_json"],
                prediction_data_json=loc["prediction_data_json"],
                interventions_json=loc["interventions_json"]
            )
            db.add(c)
        db.commit()
        logger.info(f"Successfully seeded {len(dataset_corridors)} ML-trained corridors into SQLite database.")

    logger.info("SQLite database seeding complete.")
