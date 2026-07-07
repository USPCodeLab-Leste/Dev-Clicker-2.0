import { sumPG } from '$lib/utils/numbers.js';

export class EstruturaSystem {
  constructor(state){
    this.state = state;
  }

  custoAtual(estrutura) {
    let estruturaQuantidade = this.state.estruturas[estrutura.id]?.quantidade || 0;
    return Math.floor(estrutura.custoBase * Math.pow(1.15, estruturaQuantidade));
  }

  custoTotal(estrutura, quantidade) {
    let estruturaQuantidade = this.state.estruturas[estrutura.id]?.quantidade || 0;
    return Math.round(sumPG(this.custoAtual(estrutura), 1.15, quantidade));
  }

  getEstruturaCostAndQuantity(estrutura) {
    let custo = 0;
    let quantidade = 0;

    custo = this.custoTotal(estrutura, this.state.bulkMultiplier);
    
    if (this.state.pontos >= custo) {
      quantidade = this.state.bulkMultiplier;
    } else {
      // Se não tiver pontos para o bulkBuy, calcula quantas estruturas é possível comprar
      for (let i = this.state.bulkMultiplier; i >= 1; i--) {
        const custoParcial = this.custoTotal(estrutura, i);
        if (this.state.pontos >= custoParcial) {
          quantidade = i;
          custo = custoParcial;
          break;
        }
      }
    }

    return { custo, quantidade }
  }

  buyEstrutura(estrutura, quantidade) {
    if (quantidade <= 0 || !this.state.estruturas[estrutura.id]?.unlocked)
      return false;

    if (this.state.estruturas[estrutura.id]) {
      this.state.estruturas[estrutura.id].quantidade += quantidade;
    } else {
      this.state.estruturas[estrutura.id] = { quantidade, gerado: 0, unlocked: true, lps: estrutura.lps };
    }
    return true;
  }

  calcEstruturaLps(estrutura) {
    const playerEstrutura = this.state.estruturas[estrutura.id];
    if (!playerEstrutura) return 0;

    return estrutura.lps * this.state.lpsMultiplier;
  }
}