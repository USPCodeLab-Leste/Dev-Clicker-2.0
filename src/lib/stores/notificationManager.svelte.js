class NotificationManager {
  estruturas = $state(0);
  upgrades = $state(0);

  addEstrutura(id) {
    this.estruturas++;
  }

  addUpgrade(id) {
    this.upgrades++;
  }

  clearEstruturas() {
    this.estruturas = 0;
  }

  clearUpgrades() {
    this.upgrades = 0;
  }

  clear() {
    this.clearEstruturas();
    this.clearUpgrades();
  }

  get hasEstruturas() {
    return this.estruturas > 0;
  }

  get hasUpgrades() {
    return this.upgrades > 0;
  }
}

export const notificationManager = new NotificationManager();