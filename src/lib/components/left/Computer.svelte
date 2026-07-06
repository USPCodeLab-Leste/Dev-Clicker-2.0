<script>
  import { gameEngine } from "$lib/game/engine/GameEngine";
  import { gameState } from "$lib/game/state/gameState.svelte.js";
  import { coffeeManager } from "$lib/stores/coffeeManager.svelte";
  import { randomBetween } from "$lib/utils/numbers";
  import CodeEditor from "./CodeEditor.svelte";

  let keyboardHitboxElement;
  
  function onKeyUp(event) {
    const padding = 10
    const rect = keyboardHitboxElement.getBoundingClientRect()
    const coords = {
      x: rect.left + randomBetween(padding, rect.width - padding),
      y: rect.top + randomBetween(padding, rect.height - padding),
    }
    gameEngine.click(coords);
    animarPulinho()

    // DEBUG
    switch (event.key) {
      case 'p':
        gameEngine.addPontos(10000000000);
        break;
      case 'c':
        coffeeManager.spawn();
        break;
    }
  }

  let pulando = $state(false)

  function animarPulinho() {
    pulando = false

    requestAnimationFrame(() => {
      pulando = true
    })
  }

  function onAnimationEnd() {
    pulando = false
  }

</script>

<svelte:window onkeyup={onKeyUp} />

<div class="container-left--computer">
  <div class="hacker"></div>
  <div class="demon"></div>
  <div class="computer computer-back"></div>
  <CodeEditor/>
  <div class="light-glow--container">
      <div class="light-glow"></div>
  </div>
  <div 
    class="tap"
    class:disabled={gameState.stats.totalClicks > 0}
  ></div>
  <div class="computer computer-monitor"></div>
  <button
    bind:this={keyboardHitboxElement}
    class="computer-hitbox" id="click_button"
    aria-label="Teclado"
    onclick={(e) => gameEngine.click({ x: e.clientX, y: e.clientY })}
  ></button>
  <div 
    id="computer-keyboard" 
    class="computer computer-keyboard"
    class:pulinho={pulando}
    onanimationend={onAnimationEnd}
  >
  </div>
</div>

<style>
  
  /* Contém o computador */
  .container-left--computer {
    aspect-ratio: 1/1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    max-height: 400px;
  }

  /* Muda a cor do computador apra um tom de verde */
  :global(body.matrix) .container-left--computer {
    filter: hue-rotate(300deg) contrast(0.95)
  }

  /* Muda a cor do computador apra um tom de verde */
  :global(body.evil) .container-left--computer {
    filter: hue-rotate(140deg) contrast(1.2);
  }

  .computer-monitor { background: url("/images/monitor.webp");}
  .computer-back { background: url("/images/fundo_monitor.webp"); }
  .computer-keyboard { background: url("/images/teclado.webp"); transition: all .1s ease;}

  .hacker, .demon {
    aspect-ratio: 1/1;
    background-size: cover;
    position: absolute;
    z-index: -10;
    width: 95%;
    max-width: 500px;
    bottom: 30%;

    filter: blur(1px);
    pointer-events: none;
    opacity: 0;

    transition: opacity .5s linear;
  }

  .hacker.active, .demon.active {
    opacity: .4;
  }

  .hacker { background-image: url("/images/hacker.webp"); }
  .demon { 
    bottom: 40%;
    background-image: url("/images/demon.webp"); 
  }

  .tap {
    aspect-ratio: 1/1;
    width: 64px;
    background-image: url("/images/tap.png");
    background-size: cover;
    image-rendering: pixelated;

    pointer-events: none;
    position: absolute;
    top: 72%;
    z-index: 10;
    animation: tapAnim 1s ease-in-out infinite;
  }

  .tap.disabled {
    display: none;
    visibility: hidden;
  }

  @keyframes tapAnim {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.05); }
  }

  /* Cada um dos componentes do computador */
  .computer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 0;
    pointer-events: none;
    filter: brightness(1.2);
  }

  .light-glow--container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    pointer-events: none;
    top: 10.7%;
    max-width: 270px;
    width: 63%;
    height: 41.2%;
    pointer-events: none;
    z-index: 5;

    @media (max-width: 900px) {
      height: 39%;
      top: 10%;
    }
    
    @media (max-width: 800px) {
      width: 60%;
      height: 41.2%;
      top: 10.7%;
    }
  }

  .light-glow--container.disabled {
    display: none;
    visibility: hidden;
  }

  .light-glow {
    /* display: none; */
    --times: 2;
    position: absolute;
    max-width: 100vw;
    width: calc(100% * var(--times));
    height: calc(100% * var(--times));
    background: radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(0,255,255,0) 70%);
    filter: blur(40px);
    opacity: 0.7;
    animation: glowPulse 3s ease-in-out infinite;
    mix-blend-mode: screen;
  }

  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.5;
      filter: blur(35px);
    }
    50% {
      opacity: 0.7;
      filter: blur(45px);
    }
  }

  .computer-hitbox {
    position: absolute;
    left: 10%;
    bottom: 0;
    right: 10%;
    top: 75%;
    pointer-events: auto;
    cursor: pointer;
    outline: none;
  }

  /* Deixa levemente maior ao clicar */
  .pulinho { animation: pop .2s ease; }

  
  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
</style>