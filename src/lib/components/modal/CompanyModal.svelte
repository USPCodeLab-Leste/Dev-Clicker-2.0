<script>
  import { gameEngine } from "$lib/game/engine/GameEngine";
  import { gameState } from "$lib/game/state/gameState.svelte";
  import { fade } from "svelte/transition";

  let nickname = $state('')

  function handleSubmit(event) {
    event.preventDefault();

    gameEngine.setNickname(nickname);
  }

</script>

{#if !gameState.company}
  <div 
    class="modal"
    transition:fade={{ duration: 200 }}
  >
    <div class="modal-content">
      <span class="modal-title">Qual será o seu nome DEV?</span>
      <span class="modal-warning">(Será exibido no leaderboard)</span>
      <form class="modal-form" onsubmit={handleSubmit}> 
        <span class="modal-error"></span>
        <input 
          class="modal-input" 
          type="text" 
          autocomplete="nickname" 
          placeholder="Ex: The Dev 3000" 
          maxlength="15"
          minlength="3"
          required
          bind:value={nickname}
        >
        <button class="modal-submit" type="submit">OK</button>
      </form>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, .8);
    z-index: 100000;
    touch-action: none;
    transition: opacity .2s linear;
  }

  .modal-content {
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
    max-width: 450px;
    width: 90vw;
    padding: 1em;
  }

  .modal-title {
    font-size: 1.5em;
    text-align: center;
  }

  .modal-warning {
    max-width: 300px;
    opacity: .5;
    font-size: .8em;
  }

  .modal-form {
    position: relative;
    margin-top: 1.5em;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: .5em;
  }

  .modal-error {
    position: absolute;
    transform: translateY(-100%);
    color: #ce3030;
    font-size: .7em;
  }

  .modal-input {
    background-color: var(--c2);
    border-radius: 5px;
    border: var(--c1b);
    flex-grow: 1;
    font-size: 1em;
    padding: .5em;
    min-width: 0;
    cursor: auto;
    color: white;
  }

  ::placeholder {
    color: white;
    opacity: .5;
  }

  .modal-submit {
    appearance: none;
    border-radius: 5px;
    border: none;
    background-color: var(--c2);
    color: white;
    cursor: pointer;
    font-size: 1em;
    padding: .2em 1em;
    transition: filter .2s ease;
  }

  .modal.disabled {
    display: none;
    pointer-events: none;
    opacity: 0;
  }
</style>