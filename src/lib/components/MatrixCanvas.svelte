<script>
  import { matrixManager } from '$lib/stores/matrixManager.svelte';
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    matrixManager.setCanvas(canvas);
  });

</script>

<canvas bind:this={canvas} class="matrix-canvas"></canvas>

<style>
  .matrix-canvas {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -100;
    opacity: 1;
    pointer-events: none;
    transition: opacity .5s ease;
  }
</style>