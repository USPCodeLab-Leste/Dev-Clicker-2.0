import { coffeeManager } from "$lib/stores/coffeeManager.svelte";

export class ClickSystem {
  constructor(state){
    this.state = state;

    this.comboTimeout = null;
  }

  click(){
    let amount = this.state.currentClickValue * this.state.comboMultiplier;

    if (this.state.clickLpsPercent) {
      amount += this.state.lpsTotal * this.state.clickLpsPercent; 
    }

    if (this.state.clickCoffeeChance) {
      if (Math.random() < this.state.clickCoffeeChance) {
        coffeeManager.spawn();
      }
    }

    if (this.state.clickStructureBonus) {
      const ownedStructures = Object.values(this.state.estruturas).reduce((acc, estrutura) => acc + (estrutura.quantidade || 0), 0);
      amount += this.state.clickStructureBonus * ownedStructures;
    }

    if (this.state.hasCombo) {
      this.state.comboMultiplier = Math.min(this.state.comboMultiplier + 0.02, 2);
      if (this.comboTimeout) {
        clearTimeout(this.comboTimeout);
      }
      this.comboTimeout = setTimeout(() => {
        this.state.comboMultiplier = 1;
        this.comboTimeout = null;
      }, 1000);
    }

    this.state.stats.totalClicks.value++;
    this.state.stats.handmadeLines.value += amount;

    return amount;
  }
}