<script>
  import { gameState } from '$lib/game/state/gameState.svelte';
  import { gameEngine } from '$lib/game/engine/GameEngine';
  import { formatarNumero, sumPG } from '$lib/utils/numbers.js';
  import { hideTooltip, showTooltip, tooltip } from '$lib/stores/tooltip.svelte.js';

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

<button
  class="content-item upgrade"
  class:unlocked={gameState.pontos >= custo}
  data-tooltipId={upgrade.id}
  onmousemove={mouseEnter}
  onmouseleave={mouseLeave}
  onclick={() => gameEngine.buyUpgrade(upgrade)}
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

    <!-- <button
        class="info-bttn"
        onclick={(e) => {
            e.stopPropagation();
            showMobileTooltip('es', estrutura);
        }}
    >
        INFO
    </button> -->
  </div>
</button>

<style>
  @import '$lib/styles/shop-item.css';
</style>