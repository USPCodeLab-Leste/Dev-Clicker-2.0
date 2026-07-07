<script>
  import { gameEngine } from "$lib/game/engine/GameEngine";
  import { gameState } from "$lib/game/state/gameState.svelte";
  import { hideInfoModal, infoModal } from "$lib/stores/infoModal.svelte";
  import { formatarNumero } from "$lib/utils/numbers";
  import { fade } from "svelte/transition";

  const titles = {
    es: 'Estruturas',
    up: 'Upgrades',
    bn: 'Bônus'
  }

  const itemType = $derived(infoModal.item.id.slice(0, 2));
  const playerItem = $derived.by(() => {
    switch (itemType) {
      case 'es':
        return gameState.estruturas[infoModal.item.id];
      case 'up':
        return gameState.upgrades[infoModal.item.id];
      case 'bn':
        return gameState.coffees[infoModal.item.id];
    }
  });

  function onKeyUp(event) {
    switch (event.key) {
      case 'Escape':
        hideInfoModal()
        break;
    }
  }

</script>

<svelte:window onkeyup={onKeyUp} />

{#if infoModal.visible}
  <div 
    class="info-modal"
    class:enabled={infoModal.visible}
    transition:fade={{ duration: 150 }}
    onclick={(e) => {
      if (e.target === e.currentTarget) {
        hideInfoModal()
      }
    }}
    onkeyup={onKeyUp}
    role="dialog"
    tabindex="0"
  >
    <div class="info-modal--content">
        <div class="info-modal--title">{titles[itemType]}</div>
        <div class="info-modal--wrapper">
          <div class="info-modal--header">
            <img 
              class="info-modal--icon"
              src={`/icons/${infoModal.item.icon}`}
              alt={infoModal.item.nome}
            />
            <div class="info-modal--header-text">
              <span class="info-modal--name">{infoModal.item.nome}</span>
              {#if itemType == 'es'}
                <span class="info-modal--quantidade">Quantidade: {playerItem.quantidade}</span>
              {/if}
            </div>
          </div>
          {#if itemType == 'es'}
            <div class="info-modal--items">
              <ul>
                <li class="info-modal--lps-unico">{`cada ${infoModal.item.nome} gera ${formatarNumero((gameEngine.calcEstruturaLps(infoModal.item)).toFixed(1), true)} LpS`}</li>
                <li class="info-modal--lps-total">{`${playerItem.quantidade} ${playerItem.quantidade > 1 ? infoModal.item.plural : infoModal.item.nome} ${playerItem.quantidade > 1 ? 'estão' : 'está'} gerando ${formatarNumero((gameEngine.calcEstruturaTotalLps(infoModal.item)).toFixed(1), true)} LpS (${gameEngine.calcEstruturaPercentageLps(infoModal.item)}%)`}</li>
                <li class="info-modal--gerado">{`${formatarNumero(Math.floor(playerItem.gerado), true)} linhas geradas até agora`}</li>
              </ul>
            </div>
          {/if}
          {#if itemType != 'es'}
            <span class="info-modal--function">{infoModal.item.funcao}</span>
          {/if}
          <span class="info-modal--description">
            {infoModal.item.descricao}
          </span>
        </div>
        <button 
          class="close-bttn"
          onclick={hideInfoModal}
        >
          Fechar
        </button>
    </div>
  </div>
{/if}

<style>
  .info-modal {
    touch-action: none;
    pointer-events: none;
    display: none;
    visibility: hidden;
    opacity: 0;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200000;
    background-color: var(--bs);
    transition: opacity .2s linear;
  }

  .info-modal.enabled {
    pointer-events: auto;
    display: block;
    visibility: visible;
    opacity: 1;
  }

  .info-modal--content {
    display: flex;
    flex-direction: column;
    gap: .5em;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 450px;
    width: 90dvw;
    max-height: 500px;
    height: 80dvh;
    padding: 0.4em;
    z-index: 10001;

    border-radius: 5px;
    border: var(--c1b);
    background-color: var(--c3);
  }

  .info-modal--title {
    font-size: 1.3em;
    width: 100%;
    padding: .2em;
    border-bottom: 1px solid var(--c1);
  }

  .info-modal--header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5em;
    padding: .2em;
    border-radius: 5px;
    border: var(--c1b);
    width: 100%;
  }

  .info-modal--wrapper {
    display: flex;
    flex-direction: column;
    gap: .5em;
    flex: 1;
  }

  .info-modal--icon {
    aspect-ratio: 1/1;
    width: 80px;
    filter :drop-shadow(5px 5px 2px var(--bs));
  }

  .info-modal--header-text {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-shadow: var(--ts);
  }

  .info-modal--name {
    font-size: 1.5em;
  }

  .close-bttn {
    width: 100%;
    background-color: var(--c5);
    font-size: 1.4em;
    padding: .5em;
    border-radius: 5px;
  }

  .info-modal--function {
    text-align: left;
    margin-bottom: .4em;
  }

  .info-modal--description {
    font-style: italic;
    text-align: right;
    opacity: .6;
    max-width: 350px;
    align-self: flex-end;

    @media (max-width: 800px) {
      font-size: .8em;
      max-width: 280px;
    }
  }

  .info-modal--description {
    line-height: .8em;
  }

  .info-modal--description::before { content: '"'; }
  .info-modal--description::after { content: '"'; }

  .info-modal ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .info-modal li {
    text-align: left;
    font-size: .9em;
    background-color: var(--c2);
    background-size: 50%;
    border-radius: 10px;
  }

  .info-modal li::before {
    content: "• ";
  }
</style>