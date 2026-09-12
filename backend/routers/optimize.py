from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import OptimizationRequest, OptimizationResult
from backend.services import optimizer_service

router = APIRouter(prefix="/optimize", tags=["Budget Optimizer"])


@router.post("", response_model=OptimizationResult)
async def optimize_budget(
    request: OptimizationRequest,
    db: Session = Depends(get_db)
):
    return optimizer_service.optimize_budget(db, request)
