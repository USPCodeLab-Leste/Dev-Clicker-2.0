<script>
  import { bonusAlertManager } from '$lib/stores/bonusAlertManager.svelte';
  import BonusAlert from './BonusAlert.svelte';

</script>

<div id="alert-container">
  {#each bonusAlertManager.alerts as alert (alert.id)}
    <BonusAlert 
      {alert}
    />
  {/each}
</div>

<style>
  #alert-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 1000;
  }
</style>