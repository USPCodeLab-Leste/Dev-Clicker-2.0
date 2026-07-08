import { audioManager } from "./audioManager.svelte";

export const infoModal = $state({
  visible: false,
  item: null,
})

export function showInfoModal(item) {
  infoModal.visible = true;
  infoModal.item = item;
  audioManager.play('open', .4);
}

export function hideInfoModal() {
  infoModal.visible = false;
  audioManager.play('close', .4)
}