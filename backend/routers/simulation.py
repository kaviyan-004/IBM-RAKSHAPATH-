from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import SimulationRequest, SimulationResultResponse
from backend.services.simulation_service import run_simulation

router = APIRouter(prefix="/simulation", tags=["What-If Simulation"])


@router.post("", response_model=SimulationResultResponse)
async def simulate(request: SimulationRequest, db = Depends(get_database)):
    """Run counterfactual what-if simulation to estimate post-intervention risk reduction"""
    return await run_simulation(db, request)
