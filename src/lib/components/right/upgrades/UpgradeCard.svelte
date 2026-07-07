<script>
  import { gameState } from '$lib/game/state/gameState.svelte';
  import { gameEngine } from '$lib/game/engine/GameEngine';
  import { formatarNumero, sumPG } from '$lib/utils/numbers.js';
  import { hideTooltip, showTooltip, tooltip } from '$lib/stores/tooltip.svelte.js';
  import { showInfoModal } from '$lib/stores/infoModal.svelte';

  let {
    upgrade,
  } = $props();

  function mouseEnter(e) {
    showTooltip(upgrade, e.currentTarget, e);
  }

  function mouseLeave() {
    hideTooltip()
  }

  const custo = $derived(upgrade.custo);
</script>

<div
  class="content-item upgrade"
  class:unlocked={gameState.pontos >= custo}
  data-tooltipId={upgrade.id}
  onmousemove={mouseEnter}
  onmouseleave={mouseLeave}
  onclick={() => gameEngine.buyUpgrade(upgrade)}
  onkeypress={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      gameEngine.buyUpgrade(upgrade);
    }
  }}
  tabindex="0"
  role="button"
  aria-label={`Comprar ${upgrade.nome} por ${formatarNumero(custo)} pontos`}
>

  <img
    class="item-icon"
    src={`/icons/${upgrade.icon}`}
    alt={upgrade.nome}
  />

  <div class="item-content">
    <div class="item-text">
      <div class="item-text--wrapper">
        <span class="item-name">
          {upgrade.nome}
        </span>
      </div>

      <div class="cust-wrapper">
        <span
          class="cust coin"
          class:high={custo > gameState.pontos}
          class:low={custo <= gameState.pontos}
        >
          {formatarNumero(custo)}
        </span>
      </div>

    </div>

    <button
        class="info-bttn"
        onclick={(e) => {
          e.stopPropagation();
          showInfoModal(upgrade);
        }}
    >
        INFO
    </button>
  </div>
</div>

<style>
  @import '$lib/styles/shop-item.css';
</style>