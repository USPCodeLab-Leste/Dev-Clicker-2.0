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
        
        if (!this.state.evilCoffeesUnlocked) {
          this.state.evilCoffeesUnlocked = true;
          this.state.coffees = {
            ...this.state.coffees,
            bn7: { unlocked: true },
            bn8: { unlocked: true },
            bn9: { unlocked: true },
          }
        }
        break;

      case 'combo':
        this.state.hasCombo = true;
        break;

      case 'buildDiscount':
        this.state.buildDiscount *= effect.value;
        break;

      case 'clickLpsPercent':
        this.state.clickLpsPercent += effect.value;
        break;

      case 'clickStructureBonus':
        this.state.clickStructureBonus += effect.value;
        break;

      case 'clickCoffeeChance':
        this.state.clickCoffeeChance += effect.chance;
        break;
    }
  }
}