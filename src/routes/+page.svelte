<script>
  import BonusAlertLayer from '$lib/components/coffee/BonusAlertLayer.svelte';
  import BoostLayer from '$lib/components/coffee/BoostLayer.svelte';
  import CoffeeLayer from '$lib/components/coffee/CoffeeLayer.svelte';
  import FloattingTexts from '$lib/components/FloattingTexts.svelte';
  import ContainerLeft from '$lib/components/left/ContainerLeft.svelte';
  import MatrixCanvas from '$lib/components/MatrixCanvas.svelte';
  import CompanyModal from '$lib/components/modal/CompanyModal.svelte';
  import InfoModal from '$lib/components/modal/InfoModal.svelte';
  import StatsModal from '$lib/components/modal/StatsModal.svelte';
  import ContainerRight from '$lib/components/right/ContainerRight.svelte';
  import SideBttns from '$lib/components/SideBttns.svelte';
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
  <CompanyModal />
  <StatsModal />
  <SideBttns />
  <InfoModal />
  <MatrixCanvas />
  <BoostLayer />
  <BonusAlertLayer />
  <CoffeeLayer />
  <FloattingTexts />
  <Tooltip/>
  <ContainerLeft />
  <ContainerRight />
</main>