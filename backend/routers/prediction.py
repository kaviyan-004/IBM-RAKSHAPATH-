from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import RiskForecastResponse
from backend.services.prediction_service import get_risk_forecast

router = APIRouter(prefix="/prediction", tags=["Predictive Intelligence"])


@router.get("/{location_id}", response_model=RiskForecastResponse)
async def get_prediction(location_id: str, db = Depends(get_database)):
    """Retrieve multi-year forward risk forecast with lower and upper uncertainty intervals"""
    return await get_risk_forecast(db, location_id)
