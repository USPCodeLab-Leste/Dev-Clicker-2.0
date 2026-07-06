<script>
  import { floatingTexts } from '$lib/stores/floatingTexts.svelte.js';
  import { formatarNumero } from '$lib/utils/numbers.js';

  function remove(id) {
    floatingTexts.remove(id);
  }
</script>

<div class="clicks-container">
  {#each floatingTexts.texts as text (text.id)}
    <div
      class="click"
      style:left="{text.x}px"
      style:top="{text.y}px"
      onanimationend={() => remove(text.id)}
    >
      <span>
        +{formatarNumero(text.value.toFixed(1))}
      </span>
  
      {#if text.hasCombo}
        <span class="combo">
          x{text.combo.toFixed(1)}
        </span>
      {/if}
    </div>
  {/each}
</div>

<style>
  .clicks-container {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 15;
  }

  .click {
    --time: 4s;
    position: fixed;
    pointer-events: none;
    transform: translateX(-50%);
    white-space: nowrap;
    animation: float var(--time) linear forwards;
  }

  @keyframes float {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(-500px);
    }
  }

  .combo {
    opacity: .8;
    font-size: .8em;
  }
</style>