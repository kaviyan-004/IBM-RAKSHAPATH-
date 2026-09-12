import functools
from typing import List
from fastapi import HTTPException, status
from backend.schemas import SimulationRequest, SimulationResultResponse

CONFIDENCE_RANK = {"Low": 0, "Medium": 1, "High": 2}
RANK_TO_CONFIDENCE = ["Low", "Medium", "High"]


def weakest_confidence(levels: List[str]) -> str:
    if not levels:
        return "Medium"
    min_rank = min(CONFIDENCE_RANK.get(l, 1) for l in levels)
    return RANK_TO_CONFIDENCE[min_rank]


async def run_simulation(db, request: SimulationRequest) -> SimulationResultResponse:
    loc = await db.locations.find_one({"location_id": request.location_id})
    if not loc or "risk_score" not in loc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Location {request.location_id} has no risk score"
        )

    chosen_interventions = await db.interventions.find({
        "location_id": request.location_id,
        "intervention_id": {"$in": request.intervention_ids}
    }).to_list(100)

    if not chosen_interventions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid interventions found for the specified IDs"
        )

    baseline_risk = loc["risk_score"]["score"]
    effects_mid = [(i["expected_effect_min"] + i["expected_effect_max"]) / 2.0 / 100.0 for i in chosen_interventions]
    effects_min = [i["expected_effect_min"] / 100.0 for i in chosen_interventions]
    effects_max = [i["expected_effect_max"] / 100.0 for i in chosen_interventions]

    def combine(effects: List[float]) -> float:
        combined = 1.0 - functools.reduce(lambda acc, e: acc * (1.0 - e), effects, 1.0)
        diminishing_factor = 0.88 if len(effects) > 1 else 1.0
        return combined * diminishing_factor

    mid_reduction = combine(effects_mid)
    min_reduction = combine(effects_min)
    max_reduction = combine(effects_max)

    simulated_risk = max(1, round(baseline_risk * (1.0 - mid_reduction)))
    lower_bound = max(1, round(baseline_risk * (1.0 - max_reduction)))
    upper_bound = max(1, round(baseline_risk * (1.0 - min_reduction)))

    name = chosen_interventions[0]["name"] if len(chosen_interventions) == 1 else f"Combined ({' + '.join([i['name'] for i in chosen_interventions])})"
    confidence = weakest_confidence([i.get("confidence", "Medium") for i in chosen_interventions])

    assumptions = [
        "Effect ranges are drawn from published road-safety evidence and comparable-corridor history, not a guaranteed field outcome.",
        "Combined interventions assume partial overlap in benefit; effects are not simply additive." if len(chosen_interventions) > 1 else "Single-intervention estimate assumes the intervention is implemented to the documented specification.",
        "Field validation is required before this estimate is used for a binding capital decision.",
    ]

    return SimulationResultResponse(
        intervention_id="+".join([i["intervention_id"] for i in chosen_interventions]),
        intervention_name=name,
        baseline_risk=baseline_risk,
        simulated_risk=simulated_risk,
        risk_reduction_pct=round(mid_reduction * 1000.0) / 10.0,
        lower_bound=lower_bound,
        upper_bound=upper_bound,
        confidence=confidence,
        assumptions=assumptions,
    )
