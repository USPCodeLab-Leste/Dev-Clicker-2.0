<script>
  import { gameEngine } from '$lib/game/engine/GameEngine';
  import { gameState } from '$lib/game/state/gameState.svelte.js';
  import { formatarNumero } from '$lib/utils/numbers';
</script>

<div class="container-left--header">
  <span class="company-text">{gameState.company || 'Loading...'}</span>
  <span class="ls-text" id="pontos">{formatarNumero((gameState.pontos).toFixed(0), true)} linhas de código</span>
  <span class="lps-persecond">linhas p/ segundo: {formatarNumero(gameEngine.calcLpsTotal())}</span>
</div>

<style>
  .container-left--header {
    text-shadow: var(--ts);
    display: flex;
    flex-direction: column;

    @media (max-width: 800px) {
      width: 90%;
      pointer-events: none;
      position: fixed;
      top: 2em;
      z-index: 50;
    }
  }

  /* Nome da empresa */
  .company-text {
    color: var(--c2);
    font-size: 1.5em;
    transition: color .1s ease, text-shadow .1s ease;
  }

  .company-text:active {
    color: white;
  }

  .ls-text { font-size: 1.5em; }
</style>