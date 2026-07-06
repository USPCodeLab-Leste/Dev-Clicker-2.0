<script>
  import { boostSystem } from "$lib/stores/boostSystem.svelte";
  boostSystem
  import Boost from "./Boost.svelte";

</script>

<div class="container-boosts">
  {#each boostSystem.active as boost (boost.id)}
    <Boost {boost} />
  {/each}
</div>

<style>
  .container-boosts {
    display: flex;
    flex-direction: row;
    gap: 1em;
    position: fixed;
    z-index: 1000;
    bottom: 1em;
    left: 50%;
    transform: translateX(-50%);
  }
</style>