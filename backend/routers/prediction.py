from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import RiskForecast
from backend.services import prediction_service

router = APIRouter(prefix="/prediction", tags=["Predictive Forecasting"])


@router.get("/{location_id}", response_model=RiskForecast)
async def get_risk_forecast(location_id: str, db: Session = Depends(get_db)):
    return prediction_service.get_forecast_analysis(db, location_id)
