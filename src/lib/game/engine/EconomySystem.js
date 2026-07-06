export class EconomySystem {
  constructor(state){
    this.state = state;
  }

  changeBulkMultiplier(multiplier){
    this.state.bulkMultiplier = multiplier;
  }
}