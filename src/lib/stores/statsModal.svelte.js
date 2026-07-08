import { audioManager } from "./audioManager.svelte";

export const statsModal = $state({
  visible: false,
  item: null,
})

export function showStatsModal(item) {
  statsModal.visible = true;
  statsModal.item = item;
  audioManager.play('in', .4)
}

export function hideStatsModal() {
  statsModal.visible = false;
  audioManager.play('out', .4)
}