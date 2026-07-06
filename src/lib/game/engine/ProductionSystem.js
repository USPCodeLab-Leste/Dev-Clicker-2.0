import { estruturas } from '$lib/data/estruturas.js';

export class ProductionSystem {
  constructor(state){
    this.state = state;
  }

  calculateTickLps(delta) {
    let totalGerado = 0;

    for (const estrutura of estruturas) {
      if (!this.state.estruturas[estrutura.id]?.unlocked) {
        continue;
      }

      const gerado = estrutura.lps * this.state.estruturas[estrutura.id].quantidade * delta * this.state.lpsMultiplier;
      this.state.estruturas[estrutura.id].gerado += gerado;
      totalGerado += gerado;
    }

    return totalGerado;
  }
}