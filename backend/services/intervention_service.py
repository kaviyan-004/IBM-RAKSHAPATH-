from typing import List
from backend.schemas import InterventionResponse


def _to_intervention_response(i: dict) -> InterventionResponse:
    return InterventionResponse(
        intervention_id=i["intervention_id"],
        name=i["name"],
        target_cause=i["target_cause"],
        cause_match=i.get("cause_match", 0.8),
        context_match=i.get("context_match", 0.8),
        suitable_context=i.get("suitable_context", ""),
        estimated_cost_min=i["estimated_cost_min"],
        estimated_cost_max=i["estimated_cost_max"],
        expected_effect_min=i["expected_effect_min"],
        expected_effect_max=i["expected_effect_max"],
        confidence=i.get("confidence", "Medium"),
        evidence_source=i.get("evidence_source", ""),
        implementation_constraints=i.get("implementation_constraints", ""),
    )


async def get_top_interventions(db, location_id: str) -> List[InterventionResponse]:
    interventions = await db.interventions.find({"location_id": location_id}).to_list(100)
    return [_to_intervention_response(i) for i in interventions]


async def get_all_interventions(db) -> List[InterventionResponse]:
    interventions = await db.interventions.find({}).to_list(1000)
    return [_to_intervention_response(i) for i in interventions]
