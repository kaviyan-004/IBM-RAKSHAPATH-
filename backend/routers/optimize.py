from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import OptimizationRequest, OptimizationResultResponse
from backend.services.optimizer_service import run_budget_optimizer

router = APIRouter(prefix="/optimize", tags=["Budget Optimization"])


@router.post("", response_model=OptimizationResultResponse)
async def optimize_portfolio(request: OptimizationRequest, db = Depends(get_database)):
    """Run knapsack portfolio optimizer to maximize safety benefit under budget constraints"""
    return await run_budget_optimizer(db, request)
