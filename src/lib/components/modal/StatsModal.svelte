<script>
  import { upgrades } from "$lib/data/upgrades";
  import { gameState } from "$lib/game/state/gameState.svelte";
  import { gameEngine } from "$lib/game/engine/GameEngine";
  import { hideStatsModal, statsModal } from "$lib/stores/statsModal.svelte";
  import { fade } from "svelte/transition";
  import StatModalItem from "./StatModalItem.svelte";
  import { formatarNumero } from "$lib/utils/numbers";
  import { scrollShadow } from "$lib/actions/scrollShadow";

  function onKeyUp(event) {
    switch (event.key) {
      case 'Escape':
        hideStatsModal()
        break;
    }
  }

</script>

<svelte:window onkeyup={onKeyUp} />

{#if statsModal.visible}
  <div 
    class="stats-modal"
    class:enabled={statsModal.visible}
    transition:fade={{ duration: 150 }}
    onclick={(e) => {
      if (e.target === e.currentTarget) {
        hideStatsModal()
      }
    }}
    onkeyup={onKeyUp}
    role="dialog"
    tabindex="0"
  >
    <div 
      class="stats-modal--content"
    >
      <div class="stats-modal--title">Estatísticas</div>
      <div class="stats">
        {#each Object.entries(gameState.stats) as [key, stat]}
          <div class="stats-wrapper">
            <span>{stat.label}</span>
            <span>{stat.prefix || ''}{stat.format ? formatarNumero(stat.value) : (stat.value).toFixed(stat.decimals || 0)}</span>
          </div>
        {/each}
      </div>
      <div class="stats-upgrades-owned ">
        <header class="stats-upgrades-owned--header">
            <span>Upgrades comprados: </span>
            <span>{Object.keys(gameState.upgrades).length}/{upgrades.length} ({gameEngine.calcUpgradesPercentage()}%)</span>
        </header>
      </div>
      <div 
        class="stats-upgrades--container scroll-shadow"
        use:scrollShadow
      >
        {#each upgrades as upgrade}
          <StatModalItem
            upgrade={upgrade}
            owned={gameState.upgrades[upgrade.id] || false}
          />
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .stats-modal {
    opacity: 0;
    pointer-events: none;
    display: none;
    visibility: hidden;

    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, .8);
    z-index: 100000;
    touch-action: none;
    transition: opacity .2s linear;
  }

  .stats-modal--content {
    max-height: 50vh;
    max-width: 460px;

    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    border: var(--c1b);
    background-color: var(--c3);
    max-width: 500px;
    width: 90vw;
    padding: 1em;
    user-select: text;

    @media (max-width: 800px) {
      max-height: 80vh;
    }
  }

  .stats-modal.enabled {
    pointer-events: auto;
    display: block;
    visibility: visible;
    opacity: 1;
  }

  .stats-modal--title {
    font-size: 1.3em;
    width: 100%;
    padding: .2em;
    border-bottom: 1px solid var(--c1);
  }

  .stats {
    padding: .5em 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .2em;
    border-bottom: 1px solid var(--c1);
  }

  .stats-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: .5em;
    align-items: center;
  }

  .stats-wrapper > span:nth-of-type(1) {
    text-align: left;
  }

  .stats-wrapper > span:nth-of-type(2) {
    font-size: .8em;
    text-align: right;
    color: white;
  }


  .stats-upgrades-owned {
    width: 100%;
    padding: .2em 0;
  }

  .stats-upgrades--container {
    position: relative;
    width: 100%;
    row-gap: .5em; 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
  }
</style>