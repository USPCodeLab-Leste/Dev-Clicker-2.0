export const gameState = $state({
  company: "",
  pontos: 0,
  currentClickValue: 1,
  lpsTotal: 0,

  lpsMultiplier: 1,
  bulkMultiplier: 1,
  comboMultiplier: 1,
  estruturaMultiplier: 1,

  hasCombo: false,
  coffeeProb: .03,
  boostsActive: [],
  estruturas: {},
  upgrades: {},
  stats: {
    totalClicks: 0,
    handmadeLines: 0,
    totalCoffees: 0,
    linesGenerated: 0,
  },
  lpsHighest: 0
})