<script>
  import { scrollShadow } from '$lib/actions/scrollShadow';
  import { gameEngine } from '$lib/game/engine/GameEngine';
  import { gameState } from '$lib/game/state/gameState.svelte';
  import { audioManager } from '$lib/stores/audioManager.svelte';
  import { notificationManager } from '$lib/stores/notificationManager.svelte';

  import StructuresList from './structures/StructuresList.svelte';
  import UpgradesList from './upgrades/UpgradesList.svelte';
  
  let activeTab = $state('Estruturas');

  function changeTab(tab) {
    if (activeTab === tab) return;
    
    notificationManager.clear();
    audioManager.play('tab', .5)
    activeTab = tab;
  }

  function changeBulkMultiplier(multiplier) {
    gameEngine.changeBulkMultiplier(multiplier);
    audioManager.play('tab', .5);
  }
</script>

<div class="container-right">
  <div class="container-right--header">
    <button 
      class="button-header estruturas left"
      class:active={activeTab === 'Estruturas'}
      class:has-notification={notificationManager.hasEstruturas}
      onclick={() => changeTab('Estruturas')}
    >
      <div 
        class="notification"
      ></div>
      <span class="text">Estruturas</span>
    </button>
    <button 
      class="button-header upgrades right"
      class:active={activeTab === 'Upgrades'}
      class:has-notification={notificationManager.hasUpgrades}
      onclick={() => changeTab('Upgrades')}
    >
      <div 
        class="notification"
      ></div>
      <span class="text">Upgrades</span>
    </button>
  </div>
  <div 
    class="items-bulk"
    class:active={activeTab === 'Estruturas'}
  >
    <span>Comprar</span>
    <div class="bulks-wrapper">
      <button 
        data-bulk="1" 
        class="bulk bulk1"
        class:active={gameState.bulkMultiplier === 1}
        onclick={() => changeBulkMultiplier(1)}
      >x1</button>
      <button 
        data-bulk="10" 
        class="bulk bulk10" 
        class:active={gameState.bulkMultiplier === 10}
        onclick={() => changeBulkMultiplier(10)}
      >x10</button>
      <button 
        data-bulk="100" 
        class="bulk bulk100" 
        class:active={gameState.bulkMultiplier === 100}
        onclick={() => changeBulkMultiplier(100)}
      >x100</button>
    </div>
  </div>
  <div 
    class="container-content scroll-shadow"
    use:scrollShadow
  >
    <ul class="content-list">
      {#if activeTab === 'Estruturas'}
        <StructuresList />
      {:else if activeTab === 'Upgrades'}
        <UpgradesList />
      {/if}
    </ul>
  </div>
</div>

<style>
  .container-right {
    display: flex;
    flex-direction: column;
    padding: 1em;
    border-radius: 10px;
    border: var(--c1b);

    flex-basis: 400px;
    background-color: var(--c4);
    max-height: 600px;
    height: 90dvh;
    box-shadow: 5px 5px 10px var(--bs);

    @media (max-width: 800px) {
      border-radius: 0;
      border: none;
      border-top: 3px solid var(--c1);
      width: 100%;
      max-height: 70dvh;
      padding: 1em .4em;
      flex: 1 0 auto;
    }
  }

  /* Quando o efeito de matrix estiver ativo, haverá uma pequena opacidade no fundo */
  :global(body.matrix) .container-right, :global(body.evil) .container-right {
    background-color: color-mix(in srgb, var(--c4) 80%, transparent);
  }

  /* Onde estão os botões para torcar entre abas */
  .container-right--header {
    margin: -1em;
    display: flex;
    flex-direction: row;

    @media (max-width: 800px) {
      margin: -1em -.4em;
    }
  }

  .items-bulk {
    border-radius: 5px 5px 0 0;
    margin-top: 2em;
    background-color: var(--c5);
    padding: .2em;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    display: none;
    visibility: hidden;
  }

  .items-bulk.active {
    display: flex;
    visibility: visible;
  }

  .bulks-wrapper {
    display: flex;
    flex-direction: row;
    gap: .5em;
  }

  .bulk {
    font-size: 1em;
    transition: color .2s ease;
  }

  .bulk.active {
    color: white;
  }

  /* Conteúdo do cotainer da direita */
  .container-content {
    --ob: 1; /* OPACITY BOTTOM */
    --ot: 0; /* OPACITY TOP */
    position: relative;
  }

  .container-content:has(:global(.upgrade)) {
    margin-top: 2em;
  }

  /* Modifica a barra de rolagem */
  .container-content::-webkit-scrollbar { 
    background-color: transparent;
    width: 5px;
  }

  .container-content::-webkit-scrollbar-thumb { 
    background-color: var(--c1);
    border-radius: 10px;
  }

  /* Lista que armazena os upgrades/estruturas */
  .content-list {
    /* opacity: 0; */
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  /* Os botões que ficam para trocar entre a aba de upgrades e de estruturas */
  /* Todos eles, no principio, ficam com essa aparência de "apagados" */
  .button-header {
    position: relative;
    font-size: 1.2em;
    text-transform: uppercase;
    flex-grow: 1;
    padding: 1em;
    color: var(--c2);
    background-color: var(--c5);
    border-bottom: 3px solid black;
    transition: color .2s ease;
  }

  .button-header.left {
    border-radius: 10px 0 0 0;
  }

  .button-header.right {
    border-radius: 0 10px 0 0;
  }

  
  :global(body.matrix) .button-header, :global(body.evil) .button-header {
    background-color: color-mix(in srgb, var(--c5) 80%, transparent);
  }

  /* Quando são ativos, a cor fica igual a do fundo e a fonte tbm fica mais "viva" */
  .button-header.active {
    color: var(--c1);
    background-color: var(--c4);
    border-bottom: none;
  }

  :global(body.matrix) .button-header.active, :global(body.evil) .button-header.active { background-color: transparent; }

  .button-header.left.active { border-right: 3px solid black;} /* Se o botão da esquerda que tá ativo, cria uma bordinha na direita */
  .button-header.right.active { border-left: 3px solid black;} /* Se o botão da direita que tá ativo, cria uma bordinha na esquerda */
  
  .button-header.has-notification:not(.active) .notification {
    opacity: 1;
    animation: bounce 1s;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-15px);}
    60% {transform: translateY(-8px);}
  }
  
  .notification {
    aspect-ratio: 1/1;
    width: .8em;
    border-radius: 50%;
    background-color: #ad0909;
    right: 5px;
    top: 5px;
    position: absolute;
    opacity: 0;
    transition: opacity .2s linear;
  
    @media (max-width: 800px) {
      right: .8em;
      width: 1.2em;
    }
  }

  .notification::after {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: .7em;
    content: '!';

    @media (max-width: 800px) {
      font-size: 1.1em;
    }
  }

</style>