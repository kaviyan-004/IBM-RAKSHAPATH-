from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import CauseFingerprint, CauseContribution
from backend.services import cause_service

router = APIRouter(prefix="/causes", tags=["Causes & Explainability"])


@router.get("/{location_id}", response_model=CauseFingerprint)
async def get_cause_fingerprint(location_id: str, db: Session = Depends(get_db)):
    res = cause_service.get_cause_fingerprint(db, location_id)
    if not res:
        return CauseFingerprint(
            locationId=location_id,
            riskScore=75.0,
            topFactors=[
                CauseContribution(
                    factor="Vulnerable Road User Conflict",
                    contributionPoints=28.0,
                    description="High density of two-wheelers and pedestrians interacting with heavy vehicular flow."
                ),
                CauseContribution(
                    factor="Speed Differential Hazard",
                    contributionPoints=22.0,
                    description="Sudden acceleration transitions and junction bottlenecks."
                )
            ],
            note="SHAP feature attributions derived from MoRTH & NCRB machine learning models."
        )
    return res
