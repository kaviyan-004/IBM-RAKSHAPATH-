export interface KnapsackItem {
  id: string;
  cost: number;
  value: number;
}

export interface KnapsackResult {
  selectedIds: string[];
  totalCost: number;
  totalValue: number;
}

/**
 * Standard 0/1 knapsack DP: maximize total value subject to total cost <= budget.
 * Costs are bucketed to `unit` so the DP table stays a manageable size for
 * rupee-scale budgets (matches the "Maximize Σ RiskReduction × Confidence
 * subject to Σ Cost ≤ BudgetLimit" objective from the tech spec).
 */
export function knapsack(items: KnapsackItem[], budget: number, unit = 25000): KnapsackResult {
  const capacity = Math.max(0, Math.floor(budget / unit));
  const weights = items.map((i) => Math.max(1, Math.round(i.cost / unit)));

  const dp: number[][] = Array.from({ length: items.length + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= items.length; i++) {
    const w = weights[i - 1];
    const v = items[i - 1].value;
    for (let c = 0; c <= capacity; c++) {
      dp[i][c] = dp[i - 1][c];
      if (w <= c) {
        dp[i][c] = Math.max(dp[i][c], dp[i - 1][c - w] + v);
      }
    }
  }

  const selectedIds: string[] = [];
  let c = capacity;
  for (let i = items.length; i > 0; i--) {
    if (dp[i][c] !== dp[i - 1][c]) {
      selectedIds.push(items[i - 1].id);
      c -= weights[i - 1];
    }
  }

  const selectedSet = new Set(selectedIds);
  const totalCost = items.filter((i) => selectedSet.has(i.id)).reduce((sum, i) => sum + i.cost, 0);
  const totalValue = items.filter((i) => selectedSet.has(i.id)).reduce((sum, i) => sum + i.value, 0);

  return { selectedIds, totalCost, totalValue };
}
