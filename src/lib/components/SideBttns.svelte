<script>
  import { showStatsModal } from "$lib/stores/statsModal.svelte";
  import Stats from "./svg/Stats.svelte";
</script>

<div class="side-bttns">
  <button 
    class="stats-btn"
    aria-label="Stats"
    onclick={showStatsModal}
  >
    <div class="stats-btn--icon">
      <Stats />
    </div>
  </button>
</div>

<style>
  .side-bttns {
    --icon-size: 52px;
    pointer-events: none;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: .5em;
  }

  .stats-btn {
    pointer-events: all;
    transition: transform .2s ease;
    filter: drop-shadow(5px 5px 5px var(--bs));
  }

  .stats-btn--icon {
    aspect-ratio: 1/1;
    width: var(--icon-size);
    position: relative;
    left: -3px;
    border-radius: 0 5px 5px 0;
    border: var(--c1b);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    background-size: cover;
    background-color: var(--c3);
    cursor: pointer;
    color: var(--c1);
  }
</style>