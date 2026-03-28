export function chooseDifficulty(accuracy) {

  if (accuracy < 0.4) return "Easy"

  if (accuracy < 0.7) return "Medium"

  return "Hard"

}

export function weightedDifficulty() {

  const rand = Math.random()

  if (rand < 0.35) return "Easy"

  if (rand < 0.75) return "Medium"

  return "Hard"

}