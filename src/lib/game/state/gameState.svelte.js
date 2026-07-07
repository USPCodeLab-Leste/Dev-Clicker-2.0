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
    bn8: { unlocked: true },
    bn9: { unlocked: true },
  },
  estruturas: {},
  upgrades: {},

  stats: {
    totalClicks: {
      label: 'Toques no teclado',
      value: 0,
      format: true,
    },
    handmadeLines: {
      label: 'Linhas geradas na mão',
      value: 0,
      format: true,
    },
    linesGenerated: {
      label: 'Linhas produzidas',
      value: 0,
      format: true,
    },
    linesTotal: {
      label: 'Linhas totais',
      value: 0,
      format: true,
    },
    lpsMultiplier: {
      label: 'Multiplicador LpS',
      value: 1,
      prefix: 'x',
      decimals: 2,
    },
    totalCoffees: {
      label: 'Cafés tomados',
      value: 0,
      format: true,
    },
    structuresBuilt: {
      label: 'Estruturas compradas',
      value: 0,
      format: true,
    },
  },
})