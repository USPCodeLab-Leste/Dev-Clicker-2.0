export class UpgradesSystem {
  constructor(state){
    this.state = state;
  }

  buyUpgrade(upgrade) {
    if (this.state.pontos < upgrade.custo || !this.state.upgrades[upgrade.id]?.unlocked || this.state.upgrades[upgrade.id]?.purchased) {
      return false;
    }

    this.state.upgrades[upgrade.id].purchased = true;
    return true
  }

  applyUpgradeEffect(upgrade) {
    const effect = upgrade.effect;
    switch (effect.type) {
      case 'lpsMultiplier':
        this.state.lpsMultiplier *= effect.value;
        break;

      case 'clickMultiplier':
        this.state.currentClickValue *= effect.value;
        break;

      case 'coffeeProb':
        this.state.coffeeProb *= effect.value;
        break;

      case 'combo':
        this.state.hasCombo = true;
        break;
    }
  }
}