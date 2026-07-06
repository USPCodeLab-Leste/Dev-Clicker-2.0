<script>
  import { fade } from 'svelte/transition';
  import { tooltip } from '$lib/stores/tooltip.svelte.js';
  import { gameState } from '$lib/game/state/gameState.svelte';
  import { formatarNumero } from '$lib/utils/numbers';
  import { gameEngine } from '$lib/game/engine/GameEngine';

  let {
    item,
    anchor
  } = $props();

  let tooltipElement;

  const itemType = $derived(item.id.slice(0, 2));
  const playerItem = $derived.by(() => {
    if (itemType === 'es') {
      return gameState.estruturas[item.id];
    } else if (itemType === 'up') {
      return gameState.upgrades[item.id];
    }
  });

  $effect(() => {
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      tooltipElement.style.top = `${tooltip.mouse.y}px`;
      tooltipElement.style.left = `${rect.left + window.scrollX - 30}px`;
      tooltipElement.style.transform = 'translateX(-100%) translateY(-50%)';
    }
  });


</script>

<div 
  class="tooltip" 
  bind:this={tooltipElement}
  // transition:fade={{ duration: 150 }}
>
  <div class="tooltip-header">
    <div class="tooltip-header--left">
      <img 
        class="tooltip-icon"
        src={`/icons/${item.icon}`}
        alt={item.nome}
      />
      <strong class="tooltip-name">{item.nome}</strong>
    </div>
    <span class="tooltip-price coin">{formatarNumero(item.custo || item.custoBase, true)}</span>
  </div>
  <div class="tooltip-content">
    {#if item.funcao}
      <div class="tooltip-function">
        {item.funcao}
      </div>
    {/if}
    <span class="tooltip-description">
      {item.descricao}
    </span>
  </div>
  {#if playerItem?.quantidade > 0}
    <div class="tooltip-extra">
      <ul>
        <li>cada {item.nome} gera {formatarNumero((gameEngine.calcEstruturaLps(item)).toFixed(1), true)} LpS</li>
        <li>{playerItem.quantidade} {playerItem.quantidade > 1 ? item.plural : item.nome} {playerItem.quantidade > 1 ? 'estão' : 'está'} gerando {formatarNumero((playerItem?.quantidade*item.lps*gameState.lpsMultiplier).toFixed(1), true)} LpS ({(((playerItem?.quantidade*item.lps*gameState.lpsMultiplier).toFixed(1)/(gameState.lpsTotal))*100).toFixed(2)}%)</li>
        <li>{formatarNumero(Math.floor(playerItem.gerado), true)} linhas geradas até agora</li>
      </ul>
    </div>
  {/if}
</div>

<style>
  .tooltip {
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: .5em;
    position: absolute;
    background-color: var(--c3);
    padding: 8px 12px;
    border: var(--c1b);
    border-radius: 5px;
    font-size: 1em;
    z-index: 999;
    pointer-events: none;
    /* opacity: 0;
    transition: opacity 0.2s; */
  }

  .tooltip.bonus {
    width: 250px;
    font-size: .8em;
  }

  .tooltip-header {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    border-bottom: 1px solid var(--c1);
    padding-bottom: 5px;
    text-shadow: var(--ts);
  }

  .tooltip-header.center {
    display: block;
  }

  .tooltip-header--left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  .tooltip-icon {
    aspect-ratio: 1/1;
    filter: drop-shadow(5px 5px 2px var(--bs));
    width: 60px;
  }

  .tooltip-name {
    text-align: left;
    font-weight: bold;
    font-size: 1.2em;
  }

  .tooltip-price {
    font-weight: normal;
    text-align: right;
  }

  .tooltip-header.center .tooltip-name {
    text-align: center;
  }

  .tooltip-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .tooltip-content:has(+ .tooltip-extra:not(.hidden)) {
    border-bottom: 1px solid var(--c1);
  }

  .tooltip-extra.hidden {
    display: none;
    visibility: hidden;
  }

  .tooltip-description {
    font-style: italic;
    text-align: right;
    opacity: .6;
    max-width: 350px;
    align-self: flex-end;
  }

  .tooltip-description {
    line-height: .8em;
  }

  .tooltip-description::before { content: '"'; }
  .tooltip-description::after { content: '"'; }

  .tooltip-function {
    text-align: left;
    margin-bottom: .4em;
  }

  .tooltip ul, .mobile-tooltip ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .tooltip li, .mobile-tooltip li {
    text-align: left;
    font-size: .9em;
    background-color: var(--c2);
    background-size: 50%;
    border-radius: 10px;
  }

  .tooltip li::before, .mobile-tooltip li::before {
    content: "• ";
  }
</style>