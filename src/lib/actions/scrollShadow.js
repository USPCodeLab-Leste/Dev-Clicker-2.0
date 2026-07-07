export function scrollShadow(node) {

  function update() {
    const { scrollTop, scrollHeight, clientHeight } = node;

    let top = 0;
    let bottom = 0;

    if (scrollHeight > clientHeight) {
      const max = scrollHeight - clientHeight;

      top = scrollTop / max;
      bottom = 1 - top;
    }

    node.style.setProperty('--ot', top);
    node.style.setProperty('--ob', bottom);
  }

  update();

  node.addEventListener('scroll', update);

  const resize = new ResizeObserver(update);
  resize.observe(node);

  return {
    destroy() {
      node.removeEventListener('scroll', update);
      resize.disconnect();
    }
  };
}