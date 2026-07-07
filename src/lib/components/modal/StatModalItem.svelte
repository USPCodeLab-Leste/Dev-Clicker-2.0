<script>
  import { showInfoModal } from "$lib/stores/infoModal.svelte";

  let { upgrade, owned } = $props();
</script>

{#if owned}
  <div
    class="stats-upgrade"
    onclick={() => showInfoModal(upgrade)}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        showInfoModal(upgrade)
      }
    }}
    role="button"
    tabindex="0"
  >
    <span class="item-name">{upgrade.nome}</span>
    <div class="stats-icon--wrapper">
      <img 
        src={`/icons/${upgrade.icon}`}
        alt={upgrade.nome}
        class="stats-upgrade--icon"
      />
    </div>
  </div>
{/if}

<style>
  .stats-icon--wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    width: 3em;
    border: 5px solid var(--c1);
    border-radius: 3px;
    background: radial-gradient(circle, var(--c3) 0%, var(--c6) 100%);
    cursor: pointer;
    transition: border .2s ease;
    box-shadow: 5px 5px 5px var(--bs);
  }

  .stats-upgrade {
    display: flex;
    flex-direction: column;
    gap: .2em;
    align-items: center;
    justify-content: center;
  }

  .stats-upgrade > .item-name {
    width: 100px;
    text-align: center;
    font-size: .5em;
  }
</style>