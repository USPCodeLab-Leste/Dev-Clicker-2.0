<script>
  import { bonusAlertManager } from "$lib/stores/bonusAlertManager.svelte";

  let { alert } = $props();

  function onAnimationEnd(e) {
    if (e.animationName.includes('fadeOut')) {
      bonusAlertManager.remove(alert.id);
    }
  }

</script>

<div
  class="alert-coffe--wrapper"
  style:left="{alert.x}%"
  style:top="{alert.y}%"
>
  <div 
    class="alert-coffee"

    onanimationend={onAnimationEnd}
  >
    <div class="alert-back"></div> 
    <h2 class="alert-text alert-name">{alert.coffee.nome}</h2>
    <span class="alert-text">{alert.message}</span>
  </div>
</div>

<style>
  @import '$lib/styles/bonus.css';

  .alert-coffe--wrapper {
    --intro: 1s;
    --duration: 2s;
    display: block;
    position: absolute;
    transform: translate(calc(-50% + var(--cs)/2), 0);
  }
  
  .alert-coffee {
    color: rgb(255, 255, 255);
    width: fit-content;
    display: block;
    filter: blur(0);
    
    animation: float var(--intro) ease-out forwards, fadeOut var(--duration) ease forwards;
    animation-delay: 0s, calc(var(--intro) + var(--duration));

    text-align: center;
  }
  
  .alert-back {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 120%;
    background-color: var(--bs); /* fundo escuro com transparência */
    border-radius: 50px;
    filter: blur(10px);
    opacity: .7;
    z-index: 50;
  }


  .alert-text {
    font-size: .9em;
    position: relative;
    z-index: 51;
  }

  .alert-name {
    font-size: 1.4em;
  }
</style>