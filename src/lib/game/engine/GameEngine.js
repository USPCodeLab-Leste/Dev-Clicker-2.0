import { gameState } from "$lib/game/state/gameState.svelte.js";
import { ClickSystem } from './ClickSystem';
import { EconomySystem } from "./EconomySystem";
import { EstruturaSystem } from './EstruturaSystem';
import { UpgradesSystem } from './UpgradesSystem';
import { ProductionSystem } from "./ProductionSystem";

import { floatingTexts } from "$lib/stores/floatingTexts.svelte";

import { estruturas } from '$lib/data/estruturas.js';

class GameEngine{
  constructor(){
    this.state = gameState;

    this.clickSystem = new ClickSystem(this.state);
    this.buySystem = new EconomySystem(this.state);
    this.estruturaSystem = new EstruturaSystem(this.state);
    this.upgradesSystem = new UpgradesSystem(this.state);
    this.productionSystem = new ProductionSystem(this.state);
  }

  click({ x, y }){
    const amount = this.clickSystem.click();
    floatingTexts.add({
      x: x + Math.random() * 20 - 10,
      y: y - 20,
      value: amount,
      hasCombo: this.state.hasCombo,
      combo: this.state.comboMultiplier
    })
    this.addPontos(amount);
  }

  buyEstrutura(estrutura){
    const { custo, quantidade } = this.estruturaSystem.getEstruturaCostAndQuantity(estrutura);

    if (quantidade <= 0)
      return false

    this.estruturaSystem.buyEstrutura(estrutura, quantidade);
    this.spendPontos(custo);
    return true;
  }

  buyUpgrade(upgrade){
    if (this.state.pontos < upgrade.custo)
      return false;

    this.upgradesSystem.buyUpgrade(upgrade);
    this.upgradesSystem.applyUpgradeEffect(upgrade);
    this.spendPontos(upgrade.custo);

    return true;
  }

  addPontos(amount){
    this.state.pontos += amount;
    this.checkDesbloqueio();
  }

  spendPontos(amount){
    this.state.pontos -= amount;
  }

  changeBulkMultiplier(multiplier){
    this.buySystem.changeBulkMultiplier(multiplier);
  }

  custoAtual(estrutura) {
    return this.estruturaSystem.custoAtual(estrutura);
  }

  custoTotal(estrutura, quantidade) {
    return this.estruturaSystem.custoTotal(estrutura, quantidade);
  }

  checkDesbloqueio() {
    for (const estrutura of estruturas) {
      const playerEstrutura = this.state.estruturas[estrutura.id];
      if (!playerEstrutura?.unlocked && this.state.pontos >= estrutura.custoBase) {
        this.state.estruturas[estrutura.id] = { 
          quantidade: 0,
          gerado: 0, 
          unlocked: true,
          lps: estrutura.lps
        };
      }
    }
  }

  tick(delta) {
    const totalGerado = this.productionSystem.calculateTickLps(delta);
    this.addPontos(totalGerado);
    this.state.lpsTotal = totalGerado / delta;
  }

  calcEstruturaLps(estrutura) {
    return this.estruturaSystem.calcEstruturaLps(estrutura);
  }

}

export const gameEngine = new GameEngine();