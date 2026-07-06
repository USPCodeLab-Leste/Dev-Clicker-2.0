class BonusAlertManager {
  alerts = $state([]);

  spawn(coffee, coord, message){
    this.alerts.push({
      id: crypto.randomUUID(),
      duration: 5,
      coffee,
      message,
      x: coord.x,
      y: coord.y
    });
  }

  remove(id){
    this.alerts = this.alerts.filter(c=>c.id !== id);
  }
}

export const bonusAlertManager = new BonusAlertManager();