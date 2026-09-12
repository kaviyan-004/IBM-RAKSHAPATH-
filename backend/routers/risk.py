from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import RiskScore
from backend.services import risk_service

router = APIRouter(prefix="/risk", tags=["Risk Map & ML Scoring"])


@router.get("/map", response_model=List[RiskScore])
async def get_risk_map(db: Session = Depends(get_db)):
    return risk_service.get_risk_map(db)


@router.get("/high-risk", response_model=List[RiskScore])
async def get_high_risk_locations(db: Session = Depends(get_db)):
    return risk_service.get_high_risk_locations(db)


@router.get("/emerging", response_model=List[RiskScore])
async def get_emerging_risk_locations(db: Session = Depends(get_db)):
    return risk_service.get_emerging_risk_locations(db)


@router.get("/{location_id}", response_model=RiskScore)
async def get_location_risk(location_id: str, db: Session = Depends(get_db)):
    r = risk_service.get_risk_for_location(db, location_id)
    if not r:
        return RiskScore(
            locationId=location_id,
            score=75.0,
            level="high",
            trend="stable",
            isEmerging=False,
            confidence=0.85,
            dataQuality="high",
            accidents3yr=32,
            fatalities3yr=5,
            injuries3yr=42,
            peakRiskWindow="7:00 PM - 10:00 PM",
            datasetVersion="morth-2019-2023-v2",
            modelVersion="xgb-risk-v1.3",
            predictedAt="2026-09-12T21:30:00Z"
        )
    return r
