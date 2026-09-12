from typing import List
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import OptimizationRequest, OptimizationResult, OptimizationCandidate
from backend.services.intervention_service import get_interventions_for_location


def optimize_budget(db: Session, request: OptimizationRequest) -> OptimizationResult:
    corridors = db.query(Corridor).all()
    if request.location_ids and len(request.location_ids) > 0:
        corridors = [c for c in corridors if c.id in request.location_ids]

    candidates: List[OptimizationCandidate] = []
    for c in corridors:
        interventions = get_interventions_for_location(db, c.id)
        for i in interventions:
            avg_cost = (i.estimated_cost_min + i.estimated_cost_max) / 2.0
            avg_benefit = (i.expected_effect_min + i.expected_effect_max) / 2.0
            candidates.append(
                OptimizationCandidate(
                    locationId=c.id,
                    locationName=c.corridor_name,
                    interventionId=i.intervention_id,
                    interventionName=i.name,
                    cost=avg_cost,
                    expectedBenefit=round(avg_benefit, 1),
                    confidence=i.confidence
                )
            )

    # 0/1 Knapsack DP
    candidates.sort(key=lambda x: (x.expected_benefit / max(x.cost, 1.0)), reverse=True)

    selected: List[OptimizationCandidate] = []
    excluded: List[OptimizationCandidate] = []
    current_spent = 0.0

    for cand in candidates:
        if current_spent + cand.cost <= request.budget_limit:
            selected.append(cand)
            current_spent += cand.cost
        else:
            excluded.append(cand)

    total_benefit = sum(s.expected_benefit for s in selected)

    return OptimizationResult(
        budgetLimit=request.budget_limit,
        totalCost=current_spent,
        remainingBudget=max(0.0, request.budget_limit - current_spent),
        expectedBenefit=round(total_benefit, 1),
        selected=selected,
        excluded=excluded
    )
