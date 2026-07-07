<script>
  import UpgradeCard from "./UpgradeCard.svelte";

  import { upgrades } from "$lib/data/upgrades";
  import { gameState } from "$lib/game/state/gameState.svelte";

  let visibleUpgrades = $derived(
    upgrades.filter((upgrade) => {
      return !gameState.upgrades[upgrade.id]?.purchased;
    })
  );

</script>

{#each visibleUpgrades as upgrade (upgrade.id)}
  <UpgradeCard
    {upgrade}
  />
{/each}