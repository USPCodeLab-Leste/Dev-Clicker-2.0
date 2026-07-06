import { coffees } from "$lib/data/coffees";
import { coffeeManager } from "$lib/stores/coffeeManager.svelte";

export class CoffeeSystem {
  constructor(state){
    this.state = state;
  }

  interval = 2.0;
  spawnTimer = 0.0;
  initialCooldown = 10.0;


  tick(delta) {
    if (this.initialCooldown > 0) {
      this.initialCooldown -= delta;
      return;
    }

    this.spawnTimer += delta;
    if (this.spawnTimer >= this.interval) {
      this.spawnTimer -= this.interval;
      
      this.trySpawnCoffee()
    }

    if (this.stormDuration > 0) {
      this.stormTimer += delta;
      this.stormDuration -= delta;

      if (this.stormTimer >= this.stormInterval) {
        this.stormTimer -= this.stormInterval;
        coffeeManager.spawn('bn6');
      }
    }
  }

  trySpawnCoffee() {
    if (Math.random() < this.state.coffeeProb) {
      coffeeManager.spawn();
    }
  }

  chooseCoffeeEvent(coffee) {
    const chosenCoffee = coffees.find(c => c.id === coffee.coffeeId) || this.chooseWithWeight();

    return {
      coffee: chosenCoffee,
      position: { x: coffee.x, y: coffee.y }
    }
  }

  chooseWithWeight() {
    const unlockedCoffees = coffees.filter(coffee => this.state.coffees[coffee.id]?.unlocked && coffee.peso > 0);
    const totalWeight = unlockedCoffees.reduce((sum, coffee) => sum + coffee.peso, 0);
    const randomWeight = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (const coffee of unlockedCoffees) {
      cumulativeWeight += coffee.peso;
      if (randomWeight <= cumulativeWeight) {
        return coffee;
      }
    }
  }

  startCoffeeStorm(duration, interval) {
    this.stormDuration = duration;
    this.stormInterval = interval;
    this.stormTimer = 0;
  }
}