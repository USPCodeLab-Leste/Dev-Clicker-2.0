import { gameEngine } from "$lib/game/engine/GameEngine";
import { randomCoord } from "$lib/utils/numbers";

class CoffeeManager {
  coffees = $state([]);

  spawn(coffeeId = null){
    const { x, y } = randomCoord(10);
    this.coffees.push({
      id: crypto.randomUUID(),
      duration: 5,
      coffeeId,
      x,
      y
    });
  }

  collect(id){
    const coffee = this.coffees.find(c => c.id === id);
    if (!coffee) return;

    gameEngine.triggerCoffeeEvent(coffee);
    this.remove(id);
  }

  remove(id){
    this.coffees = this.coffees.filter(c=>c.id !== id);
  }
}

export const coffeeManager = new CoffeeManager();