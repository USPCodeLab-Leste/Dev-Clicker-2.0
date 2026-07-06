<script>
  import { coffeeManager } from "$lib/stores/coffeeManager.svelte";

  let { coffee } = $props();

  function click(){
    coffeeManager.collect(coffee.id);
  }

  function onAnimationEnd(e) {
    if (e.animationName.includes('despawn')) {
      coffeeManager.remove(coffee.id);
    }
  }

</script>

<button
  class="coffee-wrapper"
  style:left="{coffee.x}%"
  style:top="{coffee.y}%"
  style:--duration="{coffee.duration}s"
  onclick={click}
  onanimationend={onAnimationEnd}
  aria-label="Clique para coletar o café"
>
  <div class="coffee">
  </div>
</button>

<style>
  @import  '$lib/styles/bonus.css';
  
  .coffee-wrapper {
    --intro: 4s;
    --duration: 4s;
    position: absolute;
    display: block;
    transform: translate(-50%, -50%);

    animation: spawn var(--intro) ease forwards, despawn var(--duration) ease forwards;
    animation-delay: 0s, calc(var(--intro) + var(--duration));

    transform-origin: center;
  }

  .coffee {
    display: block;
    width: var(--cs);
    height: var(--cs);
    cursor: pointer;
    background-size: var(--cs) var(--cs);
    background-image: url('/icons/coffee.png');
    background-position: 0 0;
    image-rendering: pixelated;

    pointer-events: auto;
    transform-origin: center;
    will-change: transform;
    animation: pulse 2s infinite ease-in-out, tilt 5s infinite;
  }

  /* Animações do Café */
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes tilt {
    0% { rotate: 0deg; }
    17% { rotate: -3deg; }
    34% { rotate: 3deg; }
    51% { rotate: 0deg; }
    68% { rotate: 3deg; }
    85% { rotate: -3deg; }
    100% { rotate: 0deg; }
  }
</style>