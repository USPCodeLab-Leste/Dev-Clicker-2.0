import { gameState } from "$lib/game/state/gameState.svelte.js";
import { ClickSystem } from './ClickSystem';
import { EconomySystem } from "./EconomySystem";
import { EstruturaSystem } from './EstruturaSystem';
import { UpgradesSystem } from './UpgradesSystem';
import { ProductionSystem } from "./ProductionSystem";
import { CoffeeSystem } from "./CoffeeSystem";

import { estruturas } from '$lib/data/estruturas.js';
import { formatarNumero } from "$lib/utils/numbers";

import { floatingTexts } from "$lib/stores/floatingTexts.svelte";
import { bonusAlertManager } from "$lib/stores/bonusAlertManager.svelte";
import { codeEditor } from "$lib/stores/codeEditor.svelte";
import { boostSystem } from "$lib/stores/boostSystem.svelte";
import { matrixManager } from "$lib/stores/matrixManager.svelte";
import { upgrades } from "$lib/data/upgrades";

class GameEngine{
  constructor(){
    this.state = gameState;

    this.clickSystem = new ClickSystem(this.state);
    this.buySystem = new EconomySystem(this.state);
    this.estruturaSystem = new EstruturaSystem(this.state);
    this.upgradesSystem = new UpgradesSystem(this.state);
    this.productionSystem = new ProductionSystem(this.state);
    this.coffeeSystem = new CoffeeSystem(this.state);
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
    this.state.stats.structuresBuilt.value += quantidade;
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
    this.state.stats.linesTotal.value += amount;
    this.checkDesbloqueio();

    if (amount > 0) {
      codeEditor.addProgress(Math.min(amount, 30));
    }
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
    this.coffeeSystem.tick(delta);
    boostSystem.update(delta);
    matrixManager.update(delta);

    const totalGerado = this.productionSystem.calculateTickLps(delta);
    this.addPontos(totalGerado);
    this.state.stats.linesGenerated.value += totalGerado;
    this.state.stats.lpsMultiplier.value = this.state.lpsMultiplier;
    this.state.lpsTotal = totalGerado / delta;
  }

  calcLpsTotal() {
    return this.state.lpsTotal;
  }

  calcEstruturaLps(estrutura) {
    return this.estruturaSystem.calcEstruturaLps(estrutura);
  }

  calcEstruturaTotalLps(estrutura) {
    return this.state.estruturas[estrutura.id]?.quantidade * this.calcEstruturaLps(estrutura) || 0;
  }

  calcEstruturaPercentageLps(estrutura) {
    const totalLps = this.calcEstruturaTotalLps(estrutura);
    return totalLps > 0 ? ((totalLps / this.calcLpsTotal()) * 100).toFixed(2) : 0;
  }

  calcUpgradesPercentage() {
    const totalUpgrades = Object.keys(this.state.upgrades).length;
    const totalAvailableUpgrades = upgrades.length;
    return ((totalUpgrades / totalAvailableUpgrades) * 100).toFixed(2);
  }

  triggerCoffeeEvent(coffee) {
    const { coffee: chosenCoffee, position } = this.coffeeSystem.chooseCoffeeEvent(coffee);

    const effect = chosenCoffee.effect;
    let message = 'teste'

    switch (effect.type) {
      case 'gain_percent_points':
        const bonusPoints = Math.floor(this.state.pontos * effect.percent) + effect.bonus;
        this.addPontos(bonusPoints);
        message = `Ganhou ${formatarNumero(bonusPoints)} linhas!`;
        break;

      case 'coffee_storm':
        this.coffeeSystem.startCoffeeStorm(effect.duration, effect.interval);
        message = `Café para todo lado!`;
        break;

      case 'gain_lps':
        const lpsBonus = this.calcLpsTotal() * 60 * effect.minutes;
        this.addPontos(lpsBonus);
        message = `Ganhou ${formatarNumero(lpsBonus)} linhas! (${effect.minutes} min das LpS)`;
        break;

      case `buff`:
        switch (effect.stat) {
          case 'lpsMultiplier':
            message = `LpS x${effect.value} por ${effect.duration} segundos${chosenCoffee.type == 'evil' ? '...' : '!!!'}`;
            break;
        }

        boostSystem.add(chosenCoffee, message);
        matrixManager.start(chosenCoffee.type);
        break;

      case 'nothing':
        message = `Literalmente nada... Absolutamente nada...`;
        break;
    }

    this.state.stats.totalCoffees.value++;
    bonusAlertManager.spawn(chosenCoffee, { x: coffee.x, y: coffee.y }, message);
  }

}

export const gameEngine = new GameEngine();