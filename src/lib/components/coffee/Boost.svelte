<script>
  import { boostSystem } from "$lib/stores/boostSystem.svelte";
  import { showInfoModal } from "$lib/stores/infoModal.svelte";
  import { showTooltip, hideTooltip } from "$lib/stores/tooltip.svelte";

  let { boost } = $props();

  function mouseEnter(e) {
    showTooltip(boost.boost, e.currentTarget, e);
  }

  function mouseLeave() {
    hideTooltip()
  }

</script>

<div
  class="boost cooldown"
  data-tooltipId={boost.id}
  style={`--progress: ${boostSystem.getProgress(boost) * 360}deg;`}
  onmousemove={mouseEnter}
  onmouseleave={mouseLeave}
  ontouchstart={() => showInfoModal({...boost.boost, funcao: boost.message})}
  role="alert"
>
  <img 
    src={`/icons/${boost.boost.icon}`}
    alt={boost.name}
    class="boost-icon"
  />
</div>

<style>
  .boost {
    --time: 5s;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    width: 2.5em;
    border: 5px solid var(--c1);
    border-radius: 3px;
    background: radial-gradient(circle, var(--c3) 0%, var(--c6) 100%);
    cursor: pointer;
    transition: border .2s ease;
    box-shadow: 5px 5px 5px var(--bs);
  }

  .boost-icon {
    aspect-ratio: 1/1;
    width: 80%;
    filter: drop-shadow(2px 2px 2px var(--bs));
  }

  /* Propriedade que serve pra animar o "conic-gradient" (efeito de cooldown) */
  @property --a {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  .boost.cooldown::after {
    opacity: .5;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(transparent 0deg, transparent var(--progress), var(--c1) var(--progress));
    z-index: 100;
  }
</style>
