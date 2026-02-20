interface ScoreInput {
  budget: number;
  description: string;
  completenessMultiplier: number;
}

export function calculateLeadScore({
  budget,
  description,
  completenessMultiplier,
}: ScoreInput): number {
  let budgetScore = 0;

  if (budget > 500000) budgetScore = 100;
  else if (budget > 100000) budgetScore = 80;
  else if (budget > 50000) budgetScore = 60;
  else if (budget > 10000) budgetScore = 40;
  else if (budget > 0) budgetScore = 20;

  const normalizedDesc = description.toLowerCase();
  let keywordBonus = 0;
  let keywordMultiplier = 1;

  if (normalizedDesc.includes("urgent")) {
    keywordBonus += 15;
    keywordMultiplier *= 1.2;
  }

  if (normalizedDesc.includes("enterprise")) {
    keywordBonus += 20;
    keywordMultiplier *= 1.3;
  }

  if (normalizedDesc.includes("migration")) {
    keywordBonus += 25;
    keywordMultiplier *= 1.4;
  }

  if (normalizedDesc.includes("api")) {
    keywordBonus += 10;
  }

  if (normalizedDesc.includes("integration")) {
    keywordBonus += 10;
  }

  if (normalizedDesc.includes("custom")) {
    keywordBonus += 5;
  }

  const baseScore = (budgetScore + keywordBonus) * keywordMultiplier;
  const finalScore = baseScore * completenessMultiplier;

  return Math.min(Math.round(finalScore), 100);
}