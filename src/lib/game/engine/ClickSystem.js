export class ClickSystem {
  constructor(state){
    this.state = state;

    this.comboTimeout = null;
  }

  click(){
    const amount = this.state.currentClickValue * this.state.comboMultiplier;

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