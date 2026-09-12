from typing import List
from backend.schemas import (
    OptimizationRequest, OptimizationResultResponse, OptimizationCandidateItem
)

CONFIDENCE_WEIGHT = {"High": 1.0, "Medium": 0.7, "Low": 0.45}


def knapsack(items: List[dict], budget: float, unit: int = 25000):
    capacity = max(0, int(budget // unit))
    weights = [max(1, round(item["cost"] / unit)) for item in items]
    values = [item["value"] for item in items]

    n = len(items)
    dp = [[0.0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        w = weights[i - 1]
        v = values[i - 1]
        for c in range(capacity + 1):
            dp[i][c] = dp[i - 1][c]
            if w <= c:
                dp[i][c] = max(dp[i][c], dp[i - 1][c - w] + v)

    selected_ids = []
    c = capacity
    for i in range(n, 0, -1):
        if dp[i][c] != dp[i - 1][c]:
            selected_ids.append(items[i - 1]["id"])
            c -= weights[i - 1]

    selected_set = set(selected_ids)
    total_cost = sum(item["cost"] for item in items if item["id"] in selected_set)
    total_value = sum(item["value"] for item in items if item["id"] in selected_set)

    return selected_ids, total_cost, total_value


async def run_budget_optimizer(db, request: OptimizationRequest) -> OptimizationResultResponse:
    if request.location_ids and len(request.location_ids) > 0:
        locations = await db.locations.find({
            "location_id": {"$in": request.location_ids}
        }).to_list(1000)
    else:
        locations = await db.locations.find({}).to_list(1000)
        locations.sort(key=lambda l: l.get("risk_score", {}).get("score", 0), reverse=True)

    if request.max_interventions and request.max_interventions > 0:
        locations = locations[:request.max_interventions]

    candidates: List[OptimizationCandidateItem] = []

    for loc in locations:
        loc_id = loc["location_id"]
        interventions = await db.interventions.find({"location_id": loc_id}).to_list(100)
        if not interventions:
            continue

        best = None
        best_ratio = -1.0
        best_cost = 0
        best_benefit = 0.0

        for cur in interventions:
            conf = cur.get("confidence", "Medium")
            weight = CONFIDENCE_WEIGHT.get(conf, 0.7)
            benefit = ((cur["expected_effect_min"] + cur["expected_effect_max"]) / 2.0) * weight
            cost = (cur["estimated_cost_min"] + cur["estimated_cost_max"]) / 2.0
            ratio = benefit / cost if cost > 0 else 0

            if ratio > best_ratio:
                best_ratio = ratio
                best = cur
                best_cost = round(cost)
                best_benefit = round(benefit * 10.0) / 10.0

        if best:
            candidates.append(
                OptimizationCandidateItem(
                    location_id=loc_id,
                    location_name=loc["name"],
                    intervention_id=best["intervention_id"],
                    intervention_name=best["name"],
                    cost=best_cost,
                    expected_benefit=best_benefit,
                    confidence=best.get("confidence", "Medium"),
                )
            )

    items = [{"id": c.location_id, "cost": c.cost, "value": c.expected_benefit} for c in candidates]
    selected_ids, total_cost, total_value = knapsack(items, request.budget_limit)

    selected_set = set(selected_ids)
    selected = [c for c in candidates if c.location_id in selected_set]
    excluded = [c for c in candidates if c.location_id not in selected_set]

    return OptimizationResultResponse(
        budget_limit=request.budget_limit,
        total_cost=total_cost,
        remaining_budget=max(0.0, request.budget_limit - total_cost),
        expected_benefit=round(total_value * 10.0) / 10.0,
        selected=selected,
        excluded=excluded,
    )
