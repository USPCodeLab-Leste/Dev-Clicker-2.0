import { gameState } from "$lib/game/state/gameState.svelte";
import { matrixManager } from "./matrixManager.svelte";

export class BoostSystem {
  active = $state([]);
  now = $state(Date.now());

  add(boost) {
    const activeBoost = this.active.find(b => b.boost.id === boost.id)
    if (activeBoost) {
      activeBoost.startedAt = Date.now();
      activeBoost.duration = boost.effect.duration;
      return;
    }

    this.active.push({
      id: crypto.randomUUID(),
      boost,
      duration: boost.effect.duration,
      startedAt: Date.now()
    })

    this.applyEffect(boost);
  }

  getProgress(boost) {
    const elapsed = this.now - boost.startedAt;
    return Math.max(0, Math.min(1, elapsed / (boost.duration * 1000)));
  }

  update(delta) {
    this.now += delta * 1000;

    for (const boost of this.active) {
      if (this.getProgress(boost) >= 1) {
        this.undoEffect(boost.boost);
        this.remove(boost.id);
        
        const lastBuff = this.active.at(-1);
        if (lastBuff) {
          matrixManager.start(lastBuff.boost.type);
        } else {
          matrixManager.clear()
        }
      }
    }
  }

  applyEffect(boost) {
    switch (boost.effect.stat) {
      case 'lpsMultiplier':
        gameState.lpsMultiplier *= boost.effect.value;
        break;
    }
  }

  undoEffect(boost) {
    switch (boost.effect.stat) {
      case 'lpsMultiplier':
        gameState.lpsMultiplier /= boost.effect.value;
        break;
    }
  }

  remove(id) {
    this.active = this.active.filter(b => b.id !== id);
  }
}

export const boostSystem = new BoostSystem();