<script>
  import { gameState } from '$lib/game/state/gameState.svelte';
  import { gameEngine } from '$lib/game/engine/GameEngine';
  import { formatarNumero, sumPG } from '$lib/utils/numbers.js';
  import { hideTooltip, showTooltip, tooltip } from '$lib/stores/tooltip.svelte.js';
  import { infoModal, showInfoModal } from '$lib/stores/infoModal.svelte';
  import InfoModal from '$lib/components/modal/InfoModal.svelte';

  let {
    estrutura,
  } = $props();

  let playerEstrutura = $derived(gameState.estruturas[estrutura.id]);

  function mouseEnter(e) {
    showTooltip(estrutura, e.currentTarget, e);
  }

  function mouseLeave() {
    hideTooltip()
  }

  const custo = $derived(gameEngine.custoTotal(estrutura, gameState.bulkMultiplier));
</script>

<div
  class="content-item estrutura"
  class:hidden={!playerEstrutura?.unlocked}
  class:unlocked={playerEstrutura?.unlocked}
  data-tooltipId={estrutura.id}
  onmousemove={mouseEnter}
  onmouseleave={mouseLeave}
  onclick={() => gameEngine.buyEstrutura(estrutura)}
  onkeypress={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      gameEngine.buyEstrutura(estrutura);
    }
  }}
  tabindex="0"
  role="button"
  aria-label={`Comprar ${estrutura.nome} por ${formatarNumero(custo)} pontos`}
>

  <img
    class="item-icon"
    src={`/icons/${estrutura.icon}`}
    alt={estrutura.nome}
  />

  <div class="item-content">
    <div class="item-text">
      <div class="item-text--wrapper">
        <span
          class="mobile-purchased"
          class:with-value={playerEstrutura?.quantidade > 0}
        >
          {playerEstrutura?.quantidade > 0 ? playerEstrutura.quantidade : ''}
        </span>

        <span class="mobile-name">
          {playerEstrutura?.unlocked
            ? (playerEstrutura?.quantidade > 1
              ? estrutura.plural
              : estrutura.nome)
            : '???'}
        </span>

        <span class="item-name">
          {playerEstrutura?.unlocked ? estrutura.nome : '???'}
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

    <span class="item-purchased">
      {playerEstrutura?.quantidade > 0 ? playerEstrutura.quantidade : ''}
    </span>

    <button
        class="info-bttn"
        onclick={(e) => {
          e.stopPropagation();
          showInfoModal(estrutura);
        }}
    >
        INFO
    </button>
  </div>
</div>

<style>
  @import '$lib/styles/shop-item.css';
</style>