export class ClickSystem {
  constructor(state){
    this.state = state;
  }

  click(){
    const amount = this.state.currentClickValue * this.state.comboMultiplier;

    this.state.stats.totalClicks++;
    this.state.stats.handmadeLines += amount;

    return amount;
  }
}