<script>
  import FloattingTexts from '$lib/components/FloattingTexts.svelte';
  import ContainerLeft from '$lib/components/left/ContainerLeft.svelte';
  import ContainerRight from '$lib/components/right/ContainerRight.svelte';
  import Tooltip from '$lib/components/tooltip/Tooltip.svelte';

  import { gameEngine } from '$lib/game/engine/GameEngine.js';
  import { onMount } from 'svelte';

  onMount(() => {
    let lastTime = performance.now();
    let animationId;

    function gameLoop(now) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      gameEngine.tick(delta);

      animationId = requestAnimationFrame(gameLoop);
    }

    animationId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationId);
  })
</script>

<main>
  <FloattingTexts />
  <Tooltip/>
  <ContainerLeft />
  <ContainerRight />
</main>