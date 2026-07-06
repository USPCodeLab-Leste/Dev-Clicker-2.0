<script>
  import { coffeeManager } from '$lib/stores/coffeeManager.svelte';

  import Coffee from './Coffee.svelte';
</script>

<div id="coffee-container">
  {#each coffeeManager.coffees as coffee (coffee.id)}
    <Coffee 
      {coffee}
    />
  {/each}
</div>

<style>
  #coffee-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden; /* garante que cafés não escapem */
    pointer-events: none;
    z-index: 1000;
  }
</style>