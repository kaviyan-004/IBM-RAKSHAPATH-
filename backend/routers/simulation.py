from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import SimulationRequest, SimulationResult
from backend.services import simulation_service

router = APIRouter(prefix="/simulation", tags=["Counterfactual Simulation"])


@router.post("", response_model=SimulationResult)
async def simulate_interventions(
    request: SimulationRequest,
    db: Session = Depends(get_db)
):
    return simulation_service.run_simulation(db, request)
