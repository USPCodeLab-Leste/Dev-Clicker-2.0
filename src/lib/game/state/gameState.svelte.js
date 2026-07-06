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
  coffeeProb: 0.03,
  boostsActive: [],

  coffees: {
    bn1: { unlocked: true },
    bn2: { unlocked: true },
    bn3: { unlocked: true },
    bn4: { unlocked: true },
    bn5: { unlocked: true },
    bn6: { unlocked: true },
    bn7: { unlocked: true },
  },
  estruturas: {},
  upgrades: {},

  stats: {
    totalClicks: 0,
    handmadeLines: 0,
    totalCoffees: 0,
    linesGenerated: 0,
    totalCoffees: 0,
  },
})