export const infoModal = $state({
  visible: false,
  item: null,
})

export function showInfoModal(item) {
  infoModal.visible = true;
  infoModal.item = item;
}

export function hideInfoModal() {
  infoModal.visible = false;
}