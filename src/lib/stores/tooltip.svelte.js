export const tooltip = $state({
  visible: false,
  item: null,
  anchor: null,
  mouse: {
    x: 0,
    y: 0
  }
})

export function showTooltip(item, anchor, e) {
  tooltip.visible = true;
  tooltip.item = item;
  tooltip.anchor = anchor;
  tooltip.mouse.x = e.clientX;
  tooltip.mouse.y = e.clientY;
}

export function hideTooltip() {
  tooltip.visible = false;
}