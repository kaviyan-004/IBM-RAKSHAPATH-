from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import CauseFingerprintResponse
from backend.services.cause_service import get_cause_fingerprint

router = APIRouter(prefix="/causes", tags=["Cause Analysis & Explainability"])


@router.get("/{location_id}", response_model=CauseFingerprintResponse)
async def get_cause(location_id: str, db = Depends(get_database)):
    """Retrieve cause fingerprint with model feature attributions"""
    return await get_cause_fingerprint(db, location_id)


@router.get("/{location_id}/shap", response_model=CauseFingerprintResponse)
async def get_shap_explanation(location_id: str, db = Depends(get_database)):
    """Retrieve ranked SHAP feature contributions explaining why the location is risky"""
    return await get_cause_fingerprint(db, location_id)
