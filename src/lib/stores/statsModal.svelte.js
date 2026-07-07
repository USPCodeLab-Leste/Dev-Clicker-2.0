export const statsModal = $state({
  visible: false,
  item: null,
})

export function showStatsModal(item) {
  statsModal.visible = true;
  statsModal.item = item;
}

export function hideStatsModal() {
  statsModal.visible = false;
}